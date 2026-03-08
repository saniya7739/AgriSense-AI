/*
  policy-parser.js
  Simulated PDF policy parser and preview helper for AgriSense Compliance module.

  Features:
  - PolicyParser class
  - loadPolicy(policyId)
  - extractRules(policyText)
  - getSection(sectionNumber)
  - highlightViolation(ruleId, violation)
  - renderPreview(containerId, options)
  - nextPage(), prevPage(), goToPage(page)
*/
(function (global) {
  "use strict";

  class PolicyParser {
    constructor(options) {
      const opts = options || {};

      this.policies = this._buildPolicies();
      this.currentPolicyId = opts.defaultPolicyId || "pm-kisan";
      this.currentPage = 1;
      this.lastHighlightedRuleId = null;
      this.lastViolationPayload = null;

      this.previewConfig = {
        basePath: opts.basePath || "assets/pdf-preview",
        pageCount: {
          "pm-kisan": 3,
          pmfby: 3,
          fertilizer: 3
        }
      };

      this._validateCurrentPolicy();
    }

    // ----------------------------
    // Core APIs
    // ----------------------------

    // loadPolicy(policyId): returns full policy text and metadata.
    loadPolicy(policyId) {
      const id = this._normalizePolicyId(policyId || this.currentPolicyId);
      const policy = this.policies[id];

      if (!policy) {
        throw new Error("Policy not found: " + policyId);
      }

      this.currentPolicyId = id;
      this.currentPage = 1;

      return {
        policy_id: id,
        title: policy.title,
        text: policy.fullText,
        sections: policy.sections.slice(),
        page_count: this.previewConfig.pageCount[id] || 1
      };
    }

    // extractRules(policyText): converts policy text into rule objects.
    extractRules(policyText) {
      const text = String(policyText || "");
      const lines = text.split(/\r?\n/);
      const rules = [];

      lines.forEach((line) => {
        const trimmed = line.trim();

        // Rule line format convention in sample text:
        // RULE:<rule_id>|<severity>|<title>|<condition>
        if (trimmed.startsWith("RULE:")) {
          const payload = trimmed.replace("RULE:", "");
          const parts = payload.split("|");
          if (parts.length >= 4) {
            rules.push({
              rule_id: parts[0].trim(),
              severity: parts[1].trim().toLowerCase(),
              title: parts[2].trim(),
              condition: parts.slice(3).join("|").trim()
            });
          }
        }
      });

      return rules;
    }

    // getSection(sectionNumber): fetch section for current policy.
    getSection(sectionNumber) {
      const policy = this.policies[this.currentPolicyId];
      if (!policy) return null;

      const key = Number(sectionNumber);
      const section = policy.sections.find((s) => s.number === key);
      return section ? Object.assign({}, section) : null;
    }

    // highlightViolation(ruleId, violation): maps violation to policy context.
    highlightViolation(ruleId, violation) {
      const policy = this.policies[this.currentPolicyId];
      if (!policy) return null;

      const rid = String(ruleId || "").trim();
      const rule = policy.rules.find((r) => r.rule_id === rid) || null;

      this.lastHighlightedRuleId = rid || null;
      this.lastViolationPayload = violation || null;

      if (!rule) {
        return {
          found: false,
          message: "Rule not found in selected policy",
          highlighted_section: null,
          rule: null,
          violation: violation || null
        };
      }

      const section = policy.sections.find((s) => s.number === rule.section_number) || null;

      return {
        found: true,
        message: "Rule highlighted",
        highlighted_section: section,
        rule: rule,
        violation: violation || null
      };
    }

    // ----------------------------
    // Preview + page navigation
    // ----------------------------

    // Renders a simulated PDF preview card into target container.
    // options: { policyId, page, highlightedRuleId }
    renderPreview(containerId, options) {
      const target = document.getElementById(containerId);
      if (!target) return;

      const opts = options || {};
      const policyId = this._normalizePolicyId(opts.policyId || this.currentPolicyId);
      const pageCount = this.previewConfig.pageCount[policyId] || 1;

      if (policyId !== this.currentPolicyId) {
        this.currentPolicyId = policyId;
      }

      const page = this._clampPage(opts.page || this.currentPage, pageCount);
      this.currentPage = page;

      const highlightedRuleId = opts.highlightedRuleId || this.lastHighlightedRuleId || "";
      const policy = this.policies[policyId];

      const imgSrc = this._previewImagePath(policyId, page);
      const pageSections = policy.sections.filter((s) => s.page === page);

      const sectionsHtml = pageSections
        .map((s) => {
          const hasHighlight = highlightedRuleId && s.rule_ids.includes(highlightedRuleId);
          return `
            <div class="pp-section ${hasHighlight ? "pp-highlight" : ""}">
              <div class="pp-sec-head">Section ${s.number}: ${s.heading}</div>
              <div class="pp-sec-body">${this._escapeHtml(s.text)}</div>
            </div>
          `;
        })
        .join("");

      target.innerHTML = `
        <div class="pp-wrap">
          <div class="pp-top">
            <div>
              <strong>${this._escapeHtml(policy.title)}</strong>
              <div class="pp-meta">Page ${page} of ${pageCount}</div>
            </div>
            <div class="pp-nav">
              <button type="button" data-pp-action="prev">&#8249;</button>
              <button type="button" data-pp-action="next">&#8250;</button>
            </div>
          </div>

          <div class="pp-preview">
            <img src="${imgSrc}" alt="${this._escapeHtml(policy.title)} - page ${page}" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';" />
            <div class="pp-fallback" style="display:none;">PDF Preview (Simulated)</div>
          </div>

          <div class="pp-sections">
            ${sectionsHtml || "<div class='pp-section'>No section content on this page.</div>"}
          </div>
        </div>
      `;

      this._attachPreviewEvents(target, pageCount);
      this._ensurePreviewStyles();
    }

    nextPage() {
      const max = this.previewConfig.pageCount[this.currentPolicyId] || 1;
      this.currentPage = this._clampPage(this.currentPage + 1, max);
      return this.currentPage;
    }

    prevPage() {
      const max = this.previewConfig.pageCount[this.currentPolicyId] || 1;
      this.currentPage = this._clampPage(this.currentPage - 1, max);
      return this.currentPage;
    }

    goToPage(page) {
      const max = this.previewConfig.pageCount[this.currentPolicyId] || 1;
      this.currentPage = this._clampPage(page, max);
      return this.currentPage;
    }

    // ----------------------------
    // Internal helpers
    // ----------------------------

    _buildPolicies() {
      const pmKisanSections = [
        {
          number: 1,
          page: 1,
          heading: "Eligibility",
          rule_ids: ["PMK-001", "PMK-002"],
          text:
            "Beneficiary farmer must satisfy land and income eligibility conditions as notified by competent authority."
        },
        {
          number: 2,
          page: 2,
          heading: "Claim Limits",
          rule_ids: ["PMK-003", "PMK-004"],
          text:
            "Claims under PM-KISAN are limited by installment amount and maximum claim frequency in one financial year."
        },
        {
          number: 3,
          page: 3,
          heading: "Fraud and Recovery",
          rule_ids: ["PMK-005"],
          text:
            "Duplicate or fraudulent subsidy claims are recoverable with applicable penal interest."
        }
      ];

      const pmfbySections = [
        {
          number: 1,
          page: 1,
          heading: "Intimation Timeline",
          rule_ids: ["PMF-001"],
          text:
            "Loss intimation must be filed within prescribed timeline from date of crop loss event."
        },
        {
          number: 2,
          page: 2,
          heading: "Documentation",
          rule_ids: ["PMF-002"],
          text:
            "Supporting evidence must include event details, crop, location, and date with traceable records."
        },
        {
          number: 3,
          page: 3,
          heading: "Review and Escalation",
          rule_ids: ["PMF-003"],
          text:
            "Delayed or inconsistent claims may be flagged for additional verification and audit review."
        }
      ];

      const fertilizerSections = [
        {
          number: 1,
          page: 1,
          heading: "Purchase Limits",
          rule_ids: ["FER-001", "FER-002", "FER-003"],
          text:
            "Nutrient purchase quantity must be proportionate to landholding and seasonal recommendations."
        },
        {
          number: 2,
          page: 2,
          heading: "Distribution Controls",
          rule_ids: ["FER-004"],
          text:
            "Transactions crossing threshold should be reviewed for diversion, stock hoarding, and misuse."
        },
        {
          number: 3,
          page: 3,
          heading: "Compliance Action",
          rule_ids: ["FER-005"],
          text:
            "Repeated threshold breaches can trigger subsidy hold and compliance notice generation."
        }
      ];

      const pmKisanText = [
        "PM-KISAN Guidelines",
        "Section 1: Eligibility",
        "RULE:PMK-001|high|Land Size Eligibility|Farm size must be within notified beneficiary threshold.",
        "RULE:PMK-002|medium|Income Eligibility|Annual income must be below prescribed cap for eligibility.",
        "Section 2: Claim Limits",
        "RULE:PMK-003|high|Installment Limit|Each claim amount must not exceed notified installment amount.",
        "RULE:PMK-004|medium|Annual Claim Frequency|Claims per year should not exceed allowed installments.",
        "Section 3: Fraud and Recovery",
        "RULE:PMK-005|high|Duplicate Claim Prohibition|Duplicate claims are treated as subsidy fraud and recoverable."
      ].join("\n");

      const pmfbyText = [
        "PMFBY Insurance Rules",
        "Section 1: Intimation Timeline",
        "RULE:PMF-001|medium|Timely Reporting|Insurance claims must be reported within 3 days of event.",
        "Section 2: Documentation",
        "RULE:PMF-002|low|Mandatory Evidence|Claims should contain verifiable date, crop, and location evidence.",
        "Section 3: Escalation",
        "RULE:PMF-003|medium|Delayed Escalation|Delayed claims must be escalated for manual compliance review."
      ].join("\n");

      const fertilizerText = [
        "Fertilizer Subsidy Policy",
        "Section 1: Purchase Limits",
        "RULE:FER-001|high|Urea Threshold|Urea purchase should not exceed the policy threshold.",
        "RULE:FER-002|medium|DAP Threshold|DAP purchase should remain under district and crop norm.",
        "RULE:FER-003|low|Potash Threshold|Potash purchase beyond norm should be flagged.",
        "Section 2: Distribution Controls",
        "RULE:FER-004|medium|High Volume Monitoring|Unusual fertilizer volumes require verification.",
        "Section 3: Compliance Action",
        "RULE:FER-005|medium|Repeat Breach Action|Repeated excess purchases may trigger notices."
      ].join("\n");

      return {
        "pm-kisan": {
          id: "pm-kisan",
          title: "PM-KISAN Guidelines",
          fullText: pmKisanText,
          sections: pmKisanSections,
          rules: this._extractRulesInternal(pmKisanText, pmKisanSections)
        },
        pmfby: {
          id: "pmfby",
          title: "PMFBY Insurance Rules",
          fullText: pmfbyText,
          sections: pmfbySections,
          rules: this._extractRulesInternal(pmfbyText, pmfbySections)
        },
        fertilizer: {
          id: "fertilizer",
          title: "Fertilizer Subsidy Policy",
          fullText: fertilizerText,
          sections: fertilizerSections,
          rules: this._extractRulesInternal(fertilizerText, fertilizerSections)
        }
      };
    }

    _extractRulesInternal(policyText, sections) {
      const extracted = this.extractRules(policyText);
      return extracted.map((rule) => {
        const section = sections.find((s) => s.rule_ids.includes(rule.rule_id));
        return Object.assign({}, rule, {
          section_number: section ? section.number : null,
          page: section ? section.page : 1
        });
      });
    }

    _normalizePolicyId(policyId) {
      const id = String(policyId || "").trim().toLowerCase();
      if (!id) return "pm-kisan";
      if (id === "pmkisan") return "pm-kisan";
      return id;
    }

    _validateCurrentPolicy() {
      const id = this._normalizePolicyId(this.currentPolicyId);
      if (!this.policies[id]) {
        this.currentPolicyId = "pm-kisan";
      } else {
        this.currentPolicyId = id;
      }
    }

    _previewImagePath(policyId, page) {
      // Example naming convention, actual files can be added later.
      // pm-kisan-page-1.png, pmfby-page-1.png, fertilizer-page-1.png
      return `${this.previewConfig.basePath}/${policyId}-page-${page}.png`;
    }

    _clampPage(page, max) {
      const n = Number(page) || 1;
      if (n < 1) return 1;
      if (n > max) return max;
      return n;
    }

    _attachPreviewEvents(container, pageCount) {
      const prevBtn = container.querySelector('[data-pp-action="prev"]');
      const nextBtn = container.querySelector('[data-pp-action="next"]');

      if (prevBtn) {
        prevBtn.addEventListener("click", () => {
          this.prevPage();
          this.renderPreview(container.id, {
            policyId: this.currentPolicyId,
            page: this.currentPage,
            highlightedRuleId: this.lastHighlightedRuleId
          });
        });
      }

      if (nextBtn) {
        nextBtn.addEventListener("click", () => {
          this.nextPage();
          this.renderPreview(container.id, {
            policyId: this.currentPolicyId,
            page: this.currentPage,
            highlightedRuleId: this.lastHighlightedRuleId
          });
        });
      }

      // Disable navigation buttons at boundaries.
      if (prevBtn) prevBtn.disabled = this.currentPage <= 1;
      if (nextBtn) nextBtn.disabled = this.currentPage >= pageCount;
    }

    _ensurePreviewStyles() {
      const styleId = "policy-parser-preview-styles";
      if (document.getElementById(styleId)) return;

      const style = document.createElement("style");
      style.id = styleId;
      style.textContent = `
        .pp-wrap{border:1px solid #e2e2e2;border-radius:12px;padding:12px;background:#fff;display:flex;flex-direction:column;gap:10px}
        .pp-top{display:flex;justify-content:space-between;align-items:center;gap:10px}
        .pp-meta{font-size:12px;color:#5f6f61;margin-top:2px}
        .pp-nav{display:flex;gap:6px}
        .pp-nav button{border:none;background:#2e7d32;color:#fff;border-radius:8px;padding:6px 10px;cursor:pointer}
        .pp-nav button:disabled{opacity:0.4;cursor:not-allowed}
        .pp-preview{height:180px;border-radius:10px;overflow:hidden;background:#edf3ed;display:flex;align-items:center;justify-content:center}
        .pp-preview img{width:100%;height:100%;object-fit:cover}
        .pp-fallback{width:100%;height:100%;display:flex;align-items:center;justify-content:center;color:#2e7d32;font-weight:700}
        .pp-sections{display:flex;flex-direction:column;gap:8px}
        .pp-section{border:1px solid #e8e8e8;border-radius:10px;padding:8px;background:#fafafa}
        .pp-section.pp-highlight{border-color:#ef6c00;background:#fff3e0;box-shadow:0 0 0 1px #ef6c00 inset}
        .pp-sec-head{font-weight:700;color:#1b5e20;margin-bottom:4px}
        .pp-sec-body{font-size:13px;line-height:1.4;color:#2c3d2f}
      `;
      document.head.appendChild(style);
    }

    _escapeHtml(text) {
      return String(text)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#39;");
    }
  }

  global.AgriSenseCompliance = global.AgriSenseCompliance || {};
  global.AgriSenseCompliance.PolicyParser = PolicyParser;
  global.AgriSenseCompliance.parser = new PolicyParser();
})(window);
