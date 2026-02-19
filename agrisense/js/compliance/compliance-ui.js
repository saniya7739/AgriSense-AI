/*
  compliance-ui.js
  Compliance dashboard renderer aligned with AgriSense judge demo layout.
*/
(function (global) {
  "use strict";

  const UI_I18N = {
    en: {
      title: "Data Policy Compliance",
      subtitle: "Policy monitoring and violation analytics",
      compliance_rate: "Compliance Rate",
      total_violations: "Total Violations",
      total_penalty: "Total Financial Penalty",
      policy_documents: "Policy Documents",
      active_violations: "Active Violations",
      district_wise: "Violations by District",
      language: "Language",
      severity: "Severity",
      all: "All",
      high: "High",
      medium: "Medium",
      low: "Low",
      type: "Type",
      filter: "Filter",
      last_updated: "Last Updated",
      amount: "Amount",
      violation_details: "Violation Details",
      penalty: "Penalty",
      recommendation: "Recommendation",
      open_policy: "Open Policy",
      no_data: "No violations found for selected filter",
      total_district_note: "Total {districts} districts with {count} violations"
    },
    hi: {
      title: "अनुपालन डैशबोर्ड",
      subtitle: "नीति निगरानी और उल्लंघन विश्लेषण",
      compliance_rate: "अनुपालन दर",
      total_violations: "कुल उल्लंघन",
      total_penalty: "कुल वित्तीय दंड",
      policy_documents: "नीति दस्तावेज",
      active_violations: "सक्रिय उल्लंघन",
      district_wise: "जिला वार उल्लंघन",
      language: "भाषा",
      severity: "गंभीरता",
      all: "सभी",
      high: "उच्च",
      medium: "मध्यम",
      low: "निम्न",
      type: "प्रकार",
      filter: "फ़िल्टर",
      last_updated: "अंतिम अपडेट",
      amount: "राशि",
      violation_details: "उल्लंघन विवरण",
      penalty: "दंड",
      recommendation: "सुझाव",
      open_policy: "नीति खोले",
      no_data: "चयनित फ़िल्टर के लिए कोई उल्लंघन नहीं मिला",
      total_district_note: "कुल {districts} जिलों में {count} उल्लंघन"
    },
    mr: {
      title: "डेटा पॉलिसी अनुपालन",
      subtitle: "धोरण देखरेख आणि उल्लंघन विश्लेषण",
      compliance_rate: "अनुपालन दर",
      total_violations: "एकूण उल्लंघन",
      total_penalty: "एकूण आर्थिक दंड",
      policy_documents: "धोरण कागदपत्रे",
      active_violations: "सक्रिय उल्लंघन",
      district_wise: "जिल्हानिहाय उल्लंघन",
      language: "भाषा",
      severity: "तीव्रता",
      all: "सर्व",
      high: "उच्च",
      medium: "मध्यम",
      low: "कमी",
      type: "प्रकार",
      filter: "फिल्टर",
      last_updated: "शेवटचे अपडेट",
      amount: "रक्कम",
      violation_details: "उल्लंघन तपशील",
      penalty: "दंड",
      recommendation: "शिफारस",
      open_policy: "धोरण उघडा",
      no_data: "निवडलेल्या फिल्टरसाठी उल्लंघन आढळले नाही",
      total_district_note: "एकूण {districts} जिल्ह्यांत {count} उल्लंघन"
    }
  };

  class ComplianceUI {
    constructor(agent, options) {
      this.agent = agent;
      this.options = Object.assign({ containerId: "complianceDashboard", language: "hi", severityFilter: "all" }, options || {});
      this.language = this.options.language;
      this.severityFilter = this.options.severityFilter;
      this.typeFilter = "";
      this.container = null;
      this.lastScan = null;
      this.lastRows = [];

      this.policyDocs = [
        { id: "pm-kisan", title: "PM-KISAN Eligibility Rules", rules: 12, version: "2024", path: "assets/pdf-preview/policy-page-1.png" },
        { id: "pmfby", title: "PMFBY Claim Timeline Rules", rules: 8, version: "2024", path: "assets/pdf-preview/policy-page-2.png" },
        { id: "fertilizer", title: "Fertilizer Subsidy Controls", rules: 6, version: "2024", path: "assets/pdf-preview/policy-page-3.png" }
      ];
    }

    init(containerId) {
      if (containerId) this.options.containerId = containerId;
      this.container = document.getElementById(this.options.containerId);
      if (!this.container) return;
      this._ensureStyles();
      this.refresh();
    }

    setLanguage(lang) {
      this.language = UI_I18N[lang] ? lang : "en";
      this.refresh();
    }

    setSeverityFilter(level) {
      this.severityFilter = level || "all";
      this.refresh();
    }

    setTypeFilter(type) {
      this.typeFilter = type || "";
      this.refresh();
    }

    refresh() {
      if (!this.container || !this.agent) return;
      if (typeof this.agent.refresh === "function") this.agent.refresh();

      const scan = this.agent.scanAllTransactions();
      const stats = this.agent.getStatistics(scan);
      const rows = this._buildViolationRows(scan);

      const filtered = rows.filter((r) => {
        const okSeverity = this.severityFilter === "all" || r.severity === this.severityFilter;
        const okType = !this.typeFilter || r.simple_type === this.typeFilter;
        return okSeverity && okType;
      });

      this.lastScan = scan;
      this.lastRows = filtered;

      this.container.innerHTML = this._renderLayout(stats, filtered, scan.scanned_at, scan);
      this._bindEvents();
    }

    _t(key) {
      const d = UI_I18N[this.language] || UI_I18N.en;
      return d[key] || key;
    }

    _renderLayout(stats, rows, scannedAt, scan) {
      const allRows = this._buildViolationRows(scan);
      const totalPenalty = allRows.reduce((sum, x) => sum + Number((x.penalty && x.penalty.total_recoverable) || 0), 0);
      const byDistrict = this._buildDistrictTotals(stats);
      const totalDistricts = Object.keys(byDistrict).length;
      const totalViolations = stats.violation_transactions || 0;
      const note = this._t("total_district_note").replace("{districts}", totalDistricts).replace("{count}", totalViolations);

      return `
      <div class="compliance-dashboard">
        <div class="dashboard-header">
          <div>
            <h1><i class="fas fa-shield-alt"></i> ${this._t("title")}</h1>
            <p class="subtitle">${this._t("subtitle")}</p>
          </div>
          <div class="audit-section">
            <button type="button" class="audit-btn" onclick="generateAuditReport()">📊 Generate Audit Report</button>
            <button type="button" class="audit-btn secondary" onclick="downloadCompliancePDF()">📥 Download PDF</button>
          </div>
        </div>

        <div class="stats-row">
          <div class="stat-card">
            <div class="stat-value">${stats.compliance_rate_percent}%</div>
            <div class="stat-label">${this._t("compliance_rate")}</div>
            <div class="stat-trend">⬆️ +5% from last month</div>
          </div>

          <div class="stat-card warning">
            <div class="stat-value">${totalViolations}</div>
            <div class="stat-label">${this._t("total_violations")}</div>
            <div class="stat-trend">⬇️ -12 from last month</div>
          </div>

          <div class="stat-card penalty">
            <div class="stat-value">${this._formatRupee(totalPenalty)}</div>
            <div class="stat-label">${this._t("total_penalty")}</div>
            <div class="stat-trend">💰 Recoverable amount</div>
          </div>
        </div>

        <div class="dashboard-grid">
          <div class="grid-item policies-section">
            <h3><i class="fas fa-file-pdf"></i> ${this._t("policy_documents")}</h3>
            <div class="pdf-upload-section">
              <h3>📄 Upload Policy PDF</h3>
              <input type="file" accept=".pdf" id="pdfUpload">
              <button type="button" onclick="parsePDF()">Extract Rules</button>
              <div id="extractedRules" class="rules-preview"></div>
            </div>
            <div class="policy-list">${this._renderPolicyCards()}</div>
          </div>

          <div class="grid-item violations-section">
            <div class="section-header">
              <h3><i class="fas fa-exclamation-triangle"></i> ${this._t("active_violations")} (${rows.length})</h3>
              <span class="update-time">${this._t("last_updated")}: ${new Date(scannedAt).toLocaleString()}</span>
            </div>

            <div class="filters-bar">
              <select class="filter-select" id="languageFilter">
                <option value="">${this._t("language")}</option>
                <option value="hi" ${this.language === "hi" ? "selected" : ""}>हिन्दी</option>
                <option value="en" ${this.language === "en" ? "selected" : ""}>English</option>
                <option value="mr" ${this.language === "mr" ? "selected" : ""}>मराठी</option>
              </select>

              <select class="filter-select" id="severityFilter">
                <option value="">${this._t("severity")}</option>
                <option value="high" ${this.severityFilter === "high" ? "selected" : ""}>${this._t("high")}</option>
                <option value="medium" ${this.severityFilter === "medium" ? "selected" : ""}>${this._t("medium")}</option>
                <option value="low" ${this.severityFilter === "low" ? "selected" : ""}>${this._t("low")}</option>
              </select>

              <select class="filter-select" id="typeFilter">
                <option value="">${this._t("all")}</option>
                <option value="subsidy" ${this.typeFilter === "subsidy" ? "selected" : ""}>Subsidy</option>
                <option value="insurance" ${this.typeFilter === "insurance" ? "selected" : ""}>Insurance</option>
                <option value="fertilizer" ${this.typeFilter === "fertilizer" ? "selected" : ""}>Fertilizer</option>
              </select>

              <button class="filter-btn" id="applyFiltersBtn"><i class="fas fa-filter"></i> ${this._t("filter")}</button>
            </div>

            <div class="violations-list" id="violationsList">${this._renderViolations(rows)}</div>
          </div>

          <div class="grid-item district-section">
            <h3><i class="fas fa-map-marker-alt"></i> ${this._t("district_wise")}</h3>
            <div class="district-stats">${this._renderDistrictRows(byDistrict)}</div>
            <div class="district-note"><i class="fas fa-info-circle"></i> ${note}</div>
          </div>
        </div>
      </div>`;
    }

    _renderPolicyCards() {
      return this.policyDocs.map((p) => `
        <div class="policy-card" data-policy-id="${p.id}">
          <div class="policy-icon">📄</div>
          <div class="policy-details">
            <h4>${p.title}</h4>
            <p>Version ${p.version} • ${p.rules} rules</p>
          </div>
          <button class="view-btn" onclick="viewPolicy('${p.id}')">${this._t("open_policy")} →</button>
        </div>`).join("");
    }

    _renderViolations(rows) {
      if (!rows.length) return `<div class="no-data">${this._t("no_data")}</div>`;

      return rows.map((r) => {
        const priClass = r.severity === "high" ? "high-priority" : r.severity === "medium" ? "medium-priority" : "low-priority";
        return `
        <div class="violation-item ${priClass}" data-violation-id="${r.violation_id}">
          <div class="violation-header" onclick="toggleViolation('${r.violation_id}')">
            <span class="priority-indicator"></span>
            <span class="farmer-name">${r.farmer_name}</span>
            <span class="farmer-id">${r.farmer_id}</span>
            <span class="district">${r.district}</span>
            <span class="amount">${this._t("amount")}: ${this._formatRupee(r.amount)}</span>
            <span class="expand-icon">▼</span>
          </div>

          <div class="violation-details hidden" id="details-${r.violation_id}">
            <div class="detail-section">
              <h5>📋 ${this._t("violation_details")}</h5>
              <p><strong>Type:</strong> ${r.code}</p>
              <p><strong>Rule:</strong> ${r.policy_name}</p>
              <p><strong>Actual:</strong> ${this._safeText(JSON.stringify(r.evidence))}</p>
              <p><strong>Evidence:</strong> ${this._safeText(JSON.stringify(r.evidence))}</p>
            </div>

            <div class="detail-section">
              <h5>⚖️ ${this._t("penalty")}</h5>
              <p>Total recovery: ${this._formatRupee((r.penalty && r.penalty.total_recoverable) || 0)}</p>
            </div>

            <div class="detail-section">
              <h5>📝 ${this._t("recommendation")}</h5>
              <p>${r.justification}</p>
              <button class="action-btn" onclick="generateNotice('${r.farmer_id}','${r.violation_id}')"><i class="fas fa-file-pdf"></i> Generate Notice</button>
              <button class="action-btn" onclick="markResolved('${r.violation_id}')"><i class="fas fa-check"></i> Mark Resolved</button>
            </div>

            <div class="review-actions">
              <button class="review-btn" type="button" onclick="markReviewed('${r.farmer_id}','${r.violation_id}')">👤 Mark Reviewed</button>
              <button class="escalate-btn" type="button" onclick="escalate('${r.farmer_id}','${r.violation_id}')">⚠️ Escalate to Officer</button>
            </div>

            <div class="remediation-section">
              <h5>💡 सुझाव (Remediation)</h5>
              <p>• Visit Tehsildar office with land records</p>
              <p>• Apply for correction within 7 days</p>
              <p>• Penalty can be reduced to 12% if paid early</p>
              <button type="button" onclick="showStepByStepGuide('${r.violation_id}')">📋 Step-by-Step Guide</button>
            </div>
          </div>
        </div>`;
      }).join("");
    }

    _renderDistrictRows(byDistrict) {
      const rows = Object.keys(byDistrict || {}).map((k) => ({ district: k, count: byDistrict[k].violations || 0 }));
      if (!rows.length) return "<div class='no-data'>No district data</div>";
      const max = Math.max.apply(null, rows.map((x) => x.count)) || 1;

      return rows.map((x) => {
        const width = Math.max(8, Math.round((x.count / max) * 100));
        return `
        <div class="district-row">
          <span class="district-name">${x.district}</span>
          <div class="progress-bar"><div class="progress-fill" style="width:${width}%"></div></div>
          <span class="district-count">${x.count}</span>
        </div>`;
      }).join("");
    }

    _buildViolationRows(scan) {
      const farmerMap = this._getFarmerMap();
      const out = [];

      (scan.results || []).forEach((entry) => {
        const tx = this.agent.txById && this.agent.txById[entry.transaction_id] ? this.agent.txById[entry.transaction_id] : null;

        (entry.violations || []).forEach((v, idx) => {
          const violationId = `${entry.transaction_id}::${v.code || "unknown"}::${idx}`;
          const simpleType = tx && tx.transaction_type === "subsidy_claim" ? "subsidy"
            : tx && tx.transaction_type === "insurance_claim" ? "insurance"
            : tx && tx.transaction_type === "fertilizer_purchase" ? "fertilizer"
            : "other";

          out.push({
            violation_id: violationId,
            farmer_id: entry.farmer_id,
            farmer_name: farmerMap[entry.farmer_id] ? farmerMap[entry.farmer_id].name : "Unknown Farmer",
            district: entry.district || "Unknown",
            amount: tx && tx.amount ? tx.amount : 0,
            severity: (v.severity || "low").toLowerCase(),
            code: v.code || "unknown",
            policy_name: v.policy_name || "Policy",
            evidence: v.evidence || {},
            penalty: v.penalty || {},
            justification: v.justification || "Policy mismatch",
            simple_type: simpleType
          });
        });
      });

      const rank = { high: 1, medium: 2, low: 3 };
      out.sort((a, b) => (rank[a.severity] || 9) - (rank[b.severity] || 9));
      return out;
    }

    _buildDistrictTotals(stats) {
      const totals = {};
      const source = stats && stats.totals_by_district ? stats.totals_by_district : {};
      const constants = global.AgriSenseCompliance && global.AgriSenseCompliance.data && global.AgriSenseCompliance.data.constants;
      const allDistricts = constants && Array.isArray(constants.districts)
        ? constants.districts
        : ["Pune", "Satara", "Sangli", "Nashik", "Kolhapur"];

      allDistricts.forEach((d) => {
        totals[d] = { total: 0, compliant: 0, violations: 0 };
      });

      Object.keys(source).forEach((d) => {
        totals[d] = Object.assign({ total: 0, compliant: 0, violations: 0 }, source[d]);
      });

      return totals;
    }

    _getFarmerMap() {
      const dataApi = global.AgriSenseCompliance && global.AgriSenseCompliance.data;
      const farmers = dataApi && dataApi.getAllFarmers ? dataApi.getAllFarmers() : [];
      const map = {};
      farmers.forEach((f) => { map[f.farmer_id] = f; });
      return map;
    }

    _bindEvents() {
      const lang = this.container.querySelector("#languageFilter");
      const sev = this.container.querySelector("#severityFilter");
      const type = this.container.querySelector("#typeFilter");
      const apply = this.container.querySelector("#applyFiltersBtn");

      if (apply) {
        apply.addEventListener("click", () => {
          if (typeof global.applyFilters === "function") {
            global.applyFilters();
            return;
          }

          const nextLang = lang && lang.value ? lang.value : this.language;
          const nextSev = sev && sev.value ? sev.value : "all";
          const nextType = type && type.value ? type.value : "";

          this.language = UI_I18N[nextLang] ? nextLang : this.language;
          this.severityFilter = nextSev;
          this.typeFilter = nextType;
          this.refresh();
        });
      }
    }

    _formatRupee(v) {
      return new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(Number(v || 0));
    }

    _safeText(t) {
      return String(t).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
    }

    _ensureStyles() {
      if (document.getElementById("compliance-ui-layout-style")) return;
      const style = document.createElement("style");
      style.id = "compliance-ui-layout-style";
      style.textContent = `
        .dashboard-header{margin-bottom:10px;display:flex;align-items:flex-start;justify-content:space-between;gap:10px;flex-wrap:wrap}.dashboard-header h1{font-size:26px;color:#1b5e20;display:flex;gap:8px;align-items:center}.subtitle{color:#64756a}
        .audit-section{display:flex;gap:8px;flex-wrap:wrap}.audit-btn{border:none;background:#2e7d32;color:#fff;padding:8px 10px;border-radius:8px;cursor:pointer;font-size:12px;font-weight:700}.audit-btn.secondary{background:#1565c0}
        .stats-row{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:12px;margin:10px 0}
        .stat-card{background:#fff;border:1px solid #dbe8dd;border-radius:12px;padding:12px;box-shadow:0 6px 18px rgba(0,0,0,.08)}
        .stat-card.warning .stat-value{color:#c62828}.stat-card.penalty .stat-value{color:#8b0000}
        .stat-value{font-size:26px;font-weight:900;color:#1b5e20}.stat-label{font-weight:700;color:#39523d}.stat-trend{font-size:12px;color:#6f7f71;margin-top:4px}
        .dashboard-grid{display:grid;grid-template-columns:1.1fr 1.8fr 1fr;gap:12px}
        .grid-item{background:#fff;border:1px solid #dbe8dd;border-radius:12px;padding:12px;box-shadow:0 6px 18px rgba(0,0,0,.08)}
        .grid-item h3{margin:0 0 10px;color:#1b5e20;display:flex;gap:8px;align-items:center}
        .pdf-upload-section{border:1px dashed #b9d3bc;background:#f6fbf7;padding:10px;border-radius:10px;margin-bottom:10px;display:flex;flex-direction:column;gap:8px}.pdf-upload-section h3{margin:0;font-size:14px;color:#1b5e20}.pdf-upload-section input{font-size:12px}.pdf-upload-section button{border:none;background:#2e7d32;color:#fff;border-radius:8px;padding:7px 9px;cursor:pointer;font-size:12px;font-weight:700}.rules-preview{font-size:12px;color:#3a523f;background:#fff;border:1px solid #dbe8dd;border-radius:8px;padding:8px;min-height:32px}
        .policy-list{display:flex;flex-direction:column;gap:8px}
        .policy-card{display:grid;grid-template-columns:auto 1fr auto;gap:8px;align-items:center;padding:10px;border:1px solid #e4ece5;border-radius:10px;background:#f9fcf9}
        .policy-details h4{margin:0;font-size:13px}.policy-details p{margin:2px 0 0;font-size:12px;color:#5b6f5f}.view-btn{border:none;background:#2e7d32;color:#fff;padding:7px 9px;border-radius:8px;cursor:pointer;font-size:12px;font-weight:700}
        .section-header{display:flex;justify-content:space-between;gap:8px;align-items:flex-start;flex-wrap:wrap}.update-time{font-size:12px;color:#6f7f71}
        .filters-bar{display:flex;gap:8px;flex-wrap:wrap;margin:8px 0}.filter-select{padding:8px;border:1px solid #cfe0d1;border-radius:8px;background:#fff}.filter-btn{border:none;background:#2e7d32;color:#fff;padding:8px 10px;border-radius:8px;cursor:pointer;font-weight:700}
        .violations-list{display:flex;flex-direction:column;gap:8px;max-height:520px;overflow:auto}
        .violation-item{border:1px solid #e7ece8;border-radius:10px;background:#fbfbfb}.violation-header{display:grid;grid-template-columns:10px 1.2fr .9fr .9fr 1fr auto;gap:8px;align-items:center;padding:10px;cursor:pointer}
        .high-priority{border-left:4px solid #c62828}.medium-priority{border-left:4px solid #ef6c00}.low-priority{border-left:4px solid #f9a825}
        .priority-indicator{width:8px;height:8px;border-radius:50%;background:#c62828}.medium-priority .priority-indicator{background:#ef6c00}.low-priority .priority-indicator{background:#f9a825}
        .farmer-name{font-weight:800}.farmer-id,.district,.amount{font-size:12px;color:#4f6252}.expand-icon{font-size:12px;color:#5d6e5f}
        .violation-details{padding:10px 12px;border-top:1px dashed #dce5de;background:#fff}.detail-section{margin-bottom:10px}.detail-section h5{margin:0 0 4px;color:#2f4a34}.detail-section p{margin:3px 0;font-size:13px}
        .action-btn{border:none;background:#2e7d32;color:#fff;padding:8px 10px;border-radius:8px;cursor:pointer;margin-right:8px;margin-top:6px;font-size:12px;font-weight:700}
        .review-actions{display:flex;gap:8px;flex-wrap:wrap;margin:8px 0}.review-btn,.escalate-btn{border:none;border-radius:8px;padding:8px 10px;cursor:pointer;font-size:12px;font-weight:700}.review-btn{background:#1565c0;color:#fff}.escalate-btn{background:#ef6c00;color:#fff}
        .remediation-section{margin-top:8px;padding:8px;border:1px solid #ffe0a3;background:#fff8e1;border-radius:8px}.remediation-section h5{margin:0 0 6px;color:#7d5e00}.remediation-section p{margin:4px 0;font-size:12px;color:#6d4c00}.remediation-section button{margin-top:6px;border:none;background:#8d6e63;color:#fff;border-radius:8px;padding:7px 9px;cursor:pointer;font-size:12px;font-weight:700}
        .district-stats{display:flex;flex-direction:column;gap:8px}.district-row{display:grid;grid-template-columns:80px 1fr 28px;gap:8px;align-items:center}.district-name{font-size:12px;font-weight:700;color:#3a523f}.progress-bar{height:10px;border-radius:999px;background:#eaf2eb;overflow:hidden}.progress-fill{height:100%;background:linear-gradient(90deg,#f9a825,#ef6c00,#c62828)}.district-count{font-size:12px;font-weight:800;text-align:right}
        .district-note{margin-top:10px;padding:8px;border-radius:8px;background:#f1f7f1;font-size:12px;color:#4b5e4f}
        .hidden{display:none!important}
        .no-data{padding:10px;background:#fff8e1;border:1px solid #ffe0a3;border-radius:8px;color:#7d5e00;font-size:13px}
        @media (max-width:1100px){.dashboard-grid{grid-template-columns:1fr}.stats-row{grid-template-columns:1fr}}
      `;
      document.head.appendChild(style);
    }
  }

  global.AgriSenseCompliance = global.AgriSenseCompliance || {};
  global.AgriSenseCompliance.ComplianceUI = ComplianceUI;
  global.AgriSenseCompliance.ui = global.AgriSenseCompliance.ui || {};
})(window);
