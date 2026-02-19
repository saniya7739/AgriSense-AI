/*
  compliance-agent.js
  Rule engine for AgriSense compliance monitoring.

  Features:
  - ComplianceAgent class with dataset loading
  - checkCompliance(transaction, farmer)
  - Rule checks: PM-KISAN, PMFBY, fertilizer limits, anti-fraud duplicates
  - Evidence capture for each violation
  - Severity and explainable justifications
  - Penalty calculation (24% interest for subsidy fraud)
  - Portfolio scan and analytics/statistics
*/
(function (global) {
  "use strict";

  class ComplianceAgent {
    constructor(options) {
      const opts = options || {};
      this.ns = global.AgriSenseCompliance || {};
      this.dataApi = opts.dataApi || this.ns.data || null;

      this.policies = {
        pmKisan: {
          scheme: "PM-KISAN",
          maxFarmSizeHa: 2.0,
          maxIncome: 500000,
          maxClaimAmount: 2000,
          maxClaimsPerYear: 3
        },
        pmfby: {
          scheme: "PMFBY",
          maxReportingDelayDays: 3
        },
        fertilizer: {
          maxUreaBags: 50,
          maxDapBags: 30,
          maxPotashBags: 25
        },
        penalty: {
          subsidyFraudInterestRate: 0.24
        }
      };

      this.refresh();
    }

    // Reload all snapshots from compliance-data.js.
    refresh() {
      this.farmers = this._safeReadArray(this.dataApi && this.dataApi.getAllFarmers ? this.dataApi.getAllFarmers() : []);
      this.transactions = this._safeReadArray(this.dataApi && this.dataApi.getAllTransactions ? this.dataApi.getAllTransactions() : []);

      this.farmerById = this.farmers.reduce((acc, farmer) => {
        acc[farmer.farmer_id] = farmer;
        return acc;
      }, {});

      this.txById = this.transactions.reduce((acc, tx) => {
        acc[tx.transaction_id] = tx;
        return acc;
      }, {});

      this.index = this._buildTransactionIndex(this.transactions);
      return this;
    }

    // Main single-transaction compliance check.
    checkCompliance(transaction, farmer) {
      const tx = this._normalizeTransaction(transaction);
      const resolvedFarmer = farmer || this.farmerById[tx.farmer_id] || null;

      const violations = [];

      this._evaluatePMKisanRules(tx, resolvedFarmer, violations);
      this._evaluatePMFBYRules(tx, resolvedFarmer, violations);
      this._evaluateFertilizerRules(tx, resolvedFarmer, violations);
      this._evaluateMarketRules(tx, resolvedFarmer, violations);
      this._evaluateAntiFraudRules(tx, resolvedFarmer, violations);

      const result = {
        transaction_id: tx.transaction_id,
        farmer_id: tx.farmer_id,
        district: tx.district || (resolvedFarmer ? resolvedFarmer.district : null),
        is_compliant: violations.length === 0,
        violation_count: violations.length,
        severity: this._overallSeverity(violations),
        violations: violations,
        explanation: this.generateExplanation({ transaction: tx, farmer: resolvedFarmer, violations: violations })
      };

      return result;
    }

    // Scan full dataset transaction-by-transaction.
    scanAllTransactions() {
      const results = this.transactions.map((tx) => this.checkCompliance(tx));

      const compliantCount = results.filter((r) => r.is_compliant).length;
      const violationCount = results.length - compliantCount;

      return {
        scanned_at: new Date().toISOString(),
        total_transactions: results.length,
        compliant_transactions: compliantCount,
        violation_transactions: violationCount,
        compliance_rate_percent: this._toPercent(compliantCount, results.length),
        results: results
      };
    }

    // Public analytics summary with district and rule-level metrics.
    getStatistics(scanResult) {
      const source = scanResult && Array.isArray(scanResult.results)
        ? scanResult.results
        : this.scanAllTransactions().results;

      const totalsByDistrict = {};
      const violationsByCode = {};
      const severityBreakdown = { high: 0, medium: 0, low: 0 };
      const typeBreakdown = {};

      source.forEach((row) => {
        const district = row.district || "Unknown";
        if (!totalsByDistrict[district]) {
          totalsByDistrict[district] = { total: 0, compliant: 0, violations: 0 };
        }

        totalsByDistrict[district].total += 1;
        if (row.is_compliant) {
          totalsByDistrict[district].compliant += 1;
        } else {
          totalsByDistrict[district].violations += 1;
        }

        (row.violations || []).forEach((v) => {
          const code = v.code || "unknown";
          const sev = (v.severity || "low").toLowerCase();
          const txType = v.transaction_type || "unknown";

          violationsByCode[code] = (violationsByCode[code] || 0) + 1;
          typeBreakdown[txType] = (typeBreakdown[txType] || 0) + 1;

          if (severityBreakdown[sev] !== undefined) {
            severityBreakdown[sev] += 1;
          }
        });
      });

      const total = source.length;
      const compliant = source.filter((r) => r.is_compliant).length;

      return {
        total_transactions: total,
        compliant_transactions: compliant,
        violation_transactions: total - compliant,
        compliance_rate_percent: this._toPercent(compliant, total),
        totals_by_district: totalsByDistrict,
        violations_by_code: violationsByCode,
        severity_breakdown: severityBreakdown,
        transaction_type_violation_breakdown: typeBreakdown
      };
    }

    // Backward-compatible simple checker entry for older UI integrations.
    evaluateCompliance(input) {
      if (input && input.transaction_id) {
        return this.checkCompliance(input);
      }
      return this.scanAllTransactions();
    }

    // ----------------------------
    // Rule Evaluations
    // ----------------------------
    _evaluatePMKisanRules(tx, farmer, violations) {
      if (tx.transaction_type !== "subsidy_claim" || tx.scheme !== this.policies.pmKisan.scheme) {
        return;
      }

      const policy = this.policies.pmKisan;
      const year = this._getYear(tx.date);
      const farmerTxInYear = this._getTransactionsByFarmerAndYear(tx.farmer_id, year)
        .filter((x) => x.transaction_type === "subsidy_claim" && x.scheme === policy.scheme);

      if (farmer && Number(farmer.farm_size) > policy.maxFarmSizeHa) {
        violations.push(this._buildViolation({
          code: "subsidy_limit_exceeded",
          severity: "high",
          transaction: tx,
          farmer: farmer,
          policy_name: "PM-KISAN Farm Size Eligibility",
          evidence: {
            farm_size: farmer.farm_size,
            max_allowed: policy.maxFarmSizeHa,
            claim_amount: tx.amount,
            scheme: tx.scheme
          },
          justification:
            "Farmer land holding exceeds PM-KISAN policy threshold for this compliance scenario."
        }));
      }

      if (farmer && Number(farmer.annual_income) > policy.maxIncome) {
        violations.push(this._buildViolation({
          code: "income_eligibility_failed",
          severity: "medium",
          transaction: tx,
          farmer: farmer,
          policy_name: "PM-KISAN Income Eligibility",
          evidence: {
            annual_income: farmer.annual_income,
            max_allowed: policy.maxIncome,
            is_taxpayer: !!farmer.is_taxpayer
          },
          justification:
            "Farmer annual income exceeds configured PM-KISAN eligibility cap."
        }));
      }

      if (Number(tx.amount) > policy.maxClaimAmount) {
        violations.push(this._buildViolation({
          code: "claim_amount_exceeded",
          severity: "high",
          transaction: tx,
          farmer: farmer,
          policy_name: "PM-KISAN Claim Amount Limit",
          evidence: {
            claim_amount: tx.amount,
            max_allowed: policy.maxClaimAmount,
            installment: tx.metadata && tx.metadata.installment
          },
          justification:
            "Claim amount exceeds PM-KISAN per-installment amount limit."
        }));
      }

      if (farmerTxInYear.length > policy.maxClaimsPerYear) {
        violations.push(this._buildViolation({
          code: "claim_frequency_exceeded",
          severity: "medium",
          transaction: tx,
          farmer: farmer,
          policy_name: "PM-KISAN Annual Claim Limit",
          evidence: {
            claims_in_year: farmerTxInYear.length,
            max_allowed: policy.maxClaimsPerYear,
            year: year
          },
          justification:
            "Number of PM-KISAN claims exceeds annual allowable claim frequency."
        }));
      }
    }

    _evaluatePMFBYRules(tx, farmer, violations) {
      if (tx.transaction_type !== "insurance_claim" || tx.scheme !== this.policies.pmfby.scheme) {
        return;
      }

      const policy = this.policies.pmfby;
      const delay = Number(tx.metadata && tx.metadata.report_delay_days);

      if (delay > policy.maxReportingDelayDays) {
        violations.push(this._buildViolation({
          code: "late_reporting",
          severity: "medium",
          transaction: tx,
          farmer: farmer,
          policy_name: "PMFBY Reporting Timeline",
          evidence: {
            report_delay_days: delay,
            max_allowed: policy.maxReportingDelayDays,
            event_date: tx.metadata && tx.metadata.event_date,
            reported_date: tx.date
          },
          justification:
            "Insurance claim was filed beyond PMFBY allowed reporting window."
        }));
      }
    }

    _evaluateFertilizerRules(tx, farmer, violations) {
      if (tx.transaction_type !== "fertilizer_purchase") {
        return;
      }

      const policy = this.policies.fertilizer;
      const urea = Number(tx.metadata && tx.metadata.urea_bags) || 0;
      const dap = Number(tx.metadata && tx.metadata.dap_bags) || 0;
      const potash = Number(tx.metadata && tx.metadata.potash_bags) || 0;

      if (urea > policy.maxUreaBags) {
        violations.push(this._buildViolation({
          code: "excess_fertilizer",
          severity: "high",
          transaction: tx,
          farmer: farmer,
          policy_name: "Fertilizer Subsidy - Urea Cap",
          evidence: {
            nutrient: "urea",
            purchased_bags: urea,
            max_allowed: policy.maxUreaBags,
            district: tx.district
          },
          justification:
            "Urea bags purchased exceed subsidy monitoring threshold."
        }));
      }

      if (dap > policy.maxDapBags) {
        violations.push(this._buildViolation({
          code: "dap_limit_exceeded",
          severity: "medium",
          transaction: tx,
          farmer: farmer,
          policy_name: "Fertilizer Subsidy - DAP Cap",
          evidence: {
            nutrient: "dap",
            purchased_bags: dap,
            max_allowed: policy.maxDapBags
          },
          justification:
            "DAP bags purchased exceed configured threshold."
        }));
      }

      if (potash > policy.maxPotashBags) {
        violations.push(this._buildViolation({
          code: "potash_limit_exceeded",
          severity: "low",
          transaction: tx,
          farmer: farmer,
          policy_name: "Fertilizer Subsidy - Potash Cap",
          evidence: {
            nutrient: "potash",
            purchased_bags: potash,
            max_allowed: policy.maxPotashBags
          },
          justification:
            "Potash bags purchased are above configured threshold."
        }));
      }
    }

    _evaluateAntiFraudRules(tx, farmer, violations) {
      const year = this._getYear(tx.date);
      const sameYearTxs = this._getTransactionsByFarmerAndYear(tx.farmer_id, year);

      // Rule: explicit duplicate reference marker.
      if (tx.metadata && tx.metadata.duplicate_of) {
        violations.push(this._buildViolation({
          code: "duplicate_claims",
          severity: "high",
          transaction: tx,
          farmer: farmer,
          policy_name: "Anti-Fraud Duplicate Detection",
          evidence: {
            duplicate_of: tx.metadata.duplicate_of,
            current_transaction: tx.transaction_id,
            scheme: tx.scheme,
            year: year
          },
          justification:
            "Claim is explicitly linked as duplicate of an earlier transaction."
        }));
      }

      // Rule: same farmer + scheme + installment + amount pattern reused.
      if (tx.transaction_type === "subsidy_claim" && tx.scheme === "PM-KISAN") {
        const installment = tx.metadata && tx.metadata.installment;
        const similar = sameYearTxs.filter((x) =>
          x.transaction_id !== tx.transaction_id &&
          x.transaction_type === "subsidy_claim" &&
          x.scheme === tx.scheme &&
          Number(x.amount) === Number(tx.amount) &&
          (x.metadata && x.metadata.installment) === installment
        );

        if (similar.length > 0) {
          violations.push(this._buildViolation({
            code: "duplicate_claims",
            severity: "high",
            transaction: tx,
            farmer: farmer,
            policy_name: "Anti-Fraud Duplicate Pattern",
            evidence: {
              suspicious_matches: similar.map((x) => x.transaction_id),
              repeated_installment: installment,
              repeated_amount: tx.amount
            },
            justification:
              "Multiple claims with same installment and amount pattern found in same year."
          }));
        }
      }
    }

    _evaluateMarketRules(tx, farmer, violations) {
      if (tx.transaction_type !== "crop_sale") return;

      const msp = Number(tx.metadata && tx.metadata.msp_per_quintal) || 0;
      const salePrice = Number(tx.metadata && tx.metadata.sale_price_per_quintal) || 0;
      const crop = tx.metadata && tx.metadata.crop ? tx.metadata.crop : "Unknown";

      if (msp > 0 && salePrice > 0 && salePrice < msp) {
        const gapPercent = this._toPercent(msp - salePrice, msp);
        const severity = gapPercent >= 20 ? "high" : gapPercent >= 10 ? "medium" : "low";

        violations.push(this._buildViolation({
          code: "price_manipulation",
          severity: severity,
          transaction: tx,
          farmer: farmer,
          policy_name: "Market Fair-Price Monitoring",
          evidence: {
            crop: crop,
            sale_price_per_quintal: salePrice,
            msp_per_quintal: msp,
            below_msp_by_percent: gapPercent
          },
          justification:
            "Recorded crop sale price is below MSP reference, requiring market compliance review."
        }));
      }
    }

    // ----------------------------
    // Explanation + Penalty
    // ----------------------------
    generateExplanation(payload) {
      const tx = payload.transaction;
      const farmer = payload.farmer;
      const violations = payload.violations || [];

      if (violations.length === 0) {
        return "No compliance breach detected. Transaction aligns with configured policy checks.";
      }

      const header = [
        "Compliance review identified " + violations.length + " issue(s).",
        "Transaction: " + tx.transaction_id + " (" + tx.transaction_type + ")",
        "Farmer: " + (farmer ? farmer.name + " / " + farmer.farmer_id : tx.farmer_id)
      ].join(" ");

      const details = violations.map((v, idx) => {
        const evidenceParts = Object.keys(v.evidence || {}).map((k) => k + "=" + JSON.stringify(v.evidence[k]));
        const penaltyPart = v.penalty && v.penalty.total_recoverable > 0
          ? " Penalty: recoverable=" + v.penalty.total_recoverable + ", interest=" + v.penalty.interest_amount + "."
          : "";

        return (
          (idx + 1) + ". [" + (v.severity || "low").toUpperCase() + "] " +
          v.policy_name + " failed (" + v.code + "). " +
          v.justification + " Evidence: " + evidenceParts.join(", ") + "." + penaltyPart
        );
      }).join(" ");

      return header + " " + details;
    }

    _buildViolation(input) {
      const code = input.code;
      const tx = input.transaction;
      const penalty = this._calculatePenalty(code, tx);

      return {
        code: code,
        severity: (input.severity || "low").toLowerCase(),
        policy_name: input.policy_name,
        transaction_id: tx.transaction_id,
        transaction_type: tx.transaction_type,
        farmer_id: tx.farmer_id,
        evidence: input.evidence || {},
        justification: input.justification || "Policy mismatch detected.",
        penalty: penalty
      };
    }

    _calculatePenalty(code, tx) {
      const fraudulentSubsidyCodes = {
        subsidy_limit_exceeded: true,
        duplicate_claims: true,
        claim_amount_exceeded: true,
        claim_frequency_exceeded: true
      };

      if (tx.transaction_type === "subsidy_claim" && fraudulentSubsidyCodes[code]) {
        const principal = Number(tx.amount) || 0;
        const rate = this.policies.penalty.subsidyFraudInterestRate;
        const interest = this._round2(principal * rate);

        return {
          principal_amount: principal,
          interest_rate: rate,
          interest_amount: interest,
          total_recoverable: this._round2(principal + interest),
          rule: "24% annual interest on subsidy fraud recovery"
        };
      }

      return {
        principal_amount: 0,
        interest_rate: 0,
        interest_amount: 0,
        total_recoverable: 0,
        rule: "No monetary penalty"
      };
    }

    // ----------------------------
    // Internal utils
    // ----------------------------
    _safeReadArray(arr) {
      return Array.isArray(arr) ? arr.slice() : [];
    }

    _normalizeTransaction(tx) {
      if (!tx || typeof tx !== "object") {
        throw new Error("Invalid transaction object");
      }
      return {
        transaction_id: tx.transaction_id || "unknown",
        transaction_type: tx.transaction_type || "unknown",
        scheme: tx.scheme || null,
        farmer_id: tx.farmer_id || null,
        district: tx.district || null,
        date: tx.date || null,
        amount: Number(tx.amount) || 0,
        metadata: tx.metadata || {}
      };
    }

    _buildTransactionIndex(txs) {
      const idx = {};
      txs.forEach((tx) => {
        const year = this._getYear(tx.date);
        const farmerId = tx.farmer_id || "unknown";
        const key = farmerId + "::" + year;
        if (!idx[key]) idx[key] = [];
        idx[key].push(tx);
      });
      return idx;
    }

    _getYear(dateStr) {
      if (!dateStr) return "unknown";
      const d = new Date(dateStr);
      if (Number.isNaN(d.getTime())) return "unknown";
      return String(d.getFullYear());
    }

    _getTransactionsByFarmerAndYear(farmerId, year) {
      const key = String(farmerId) + "::" + String(year);
      return this.index[key] ? this.index[key].slice() : [];
    }

    _overallSeverity(violations) {
      if (!violations || violations.length === 0) return "none";
      if (violations.some((v) => v.severity === "high")) return "high";
      if (violations.some((v) => v.severity === "medium")) return "medium";
      return "low";
    }

    _toPercent(numerator, denominator) {
      if (!denominator) return 0;
      return Number(((numerator / denominator) * 100).toFixed(2));
    }

    _round2(num) {
      return Number((Number(num) || 0).toFixed(2));
    }
  }

  global.AgriSenseCompliance = global.AgriSenseCompliance || {};
  global.AgriSenseCompliance.ComplianceAgent = ComplianceAgent;
  global.AgriSenseCompliance.agent = new ComplianceAgent();
})(window);
