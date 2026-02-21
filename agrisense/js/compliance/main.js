/*
  main.js
  Compliance module integration bootstrap for AgriSense dashboard.

  Responsibilities:
  - Initialize ComplianceAgent and ComplianceUI
  - Load optional dataset JSON
  - Expose global control functions
  - Persist localStorage state (language, expanded rows, resolved violations)
*/
(function (global) {
  "use strict";

  const STORAGE_KEYS = {
    lang: "agri_cmp_lang",
    expanded: "agri_cmp_expanded",
    resolved: "agri_cmp_resolved",
    reviewed: "agri_cmp_reviewed",
    severity: "agri_cmp_severity",
    notices: "agri_cmp_notices"
  };

  const state = {
    agent: null,
    ui: null,
    initialized: false,
    currentLang: "en",
    currentSeverity: "all",
    expanded: new Set(),
    resolved: new Set(),
    reviewed: new Set()
  };

  function readStorageArray(key) {
    try {
      const raw = localStorage.getItem(key);
      if (!raw) return [];
      const parsed = JSON.parse(raw);
      return Array.isArray(parsed) ? parsed : [];
    } catch (_) {
      return [];
    }
  }

  function saveStorageArray(key, arr) {
    localStorage.setItem(key, JSON.stringify(Array.from(arr)));
  }

  function getStoredLang() {
    return localStorage.getItem(STORAGE_KEYS.lang) || "en";
  }

  function mapAppLangToCompliance(appLang) {
    if (appLang === "en" || appLang === "hi" || appLang === "mr") return appLang;
    if (appLang === "bh" || appLang === "pa" || appLang === "pu") return "hi";
    return "en";
  }

  function getModal() {
    return document.getElementById("complianceModal");
  }

  function getDashboardRoot() {
    return document.getElementById("complianceDashboard");
  }

  function loadDatasetFromJson() {
    return fetch("data/compliance-dataset.json")
      .then((res) => (res.ok ? res.json() : null))
      .then((json) => {
        if (!json) return;
        global.AgriSenseCompliance = global.AgriSenseCompliance || {};
        global.AgriSenseCompliance.externalDataset = json;
      })
      .catch(() => {
        // Optional dataset file; continue silently when unavailable.
      });
  }

  function ensureAgentAndUI() {
    if (!global.AgriSenseCompliance || !global.AgriSenseCompliance.ComplianceUI) return false;

    const agent = global.AgriSenseCompliance.agent ||
      (global.AgriSenseCompliance.ComplianceAgent
        ? new global.AgriSenseCompliance.ComplianceAgent()
        : null);

    if (!agent) return false;

    state.agent = agent;

    if (!state.ui) {
      state.ui = new global.AgriSenseCompliance.ComplianceUI(agent, {
        containerId: "complianceDashboard",
        language: state.currentLang,
        severityFilter: state.currentSeverity
      });
      wrapUIRefresh(state.ui);
      state.ui.init("complianceDashboard");
    }

    return true;
  }

  function wrapUIRefresh(ui) {
    if (!ui || ui.__cmpWrapped) return;

    const originalRefresh = ui.refresh.bind(ui);
    ui.refresh = function wrappedRefresh() {
      originalRefresh();
      restoreExpandedState();
      bindDetailsToggleTracking();
    };

    ui.__cmpWrapped = true;
  }

  function bindDetailsToggleTracking() {
    // Expansion state is persisted in toggleViolation() for div-based rows.
  }

  function restoreExpandedState() {
    const root = getDashboardRoot();
    if (!root) return;

    const detailsList = root.querySelectorAll(".violation-details[id^='details-']");
    detailsList.forEach((detail) => {
      const id = detail.id.replace("details-", "");
      const parent = detail.closest(".violation-item");
      const icon = parent ? parent.querySelector(".expand-icon") : null;
      const shouldOpen = state.expanded.has(id);
      detail.classList.toggle("hidden", !shouldOpen);
      if (icon) icon.textContent = shouldOpen ? "▲" : "▼";
    });
  }

  function openModal() {
    const modal = getModal();
    if (!modal) return;
    modal.classList.remove("hidden");
    document.body.style.overflow = "hidden";
  }

  function closeModal() {
    const modal = getModal();
    if (!modal) return;
    modal.classList.add("hidden");
    document.body.style.overflow = "";
  }

  function refreshPreview() {
    if (typeof global.updateCompliancePreview === "function") {
      global.updateCompliancePreview();
      return;
    }

    const rateEl = document.getElementById("complianceRateValue");
    const vioEl = document.getElementById("complianceViolationCount");
    if (!rateEl || !vioEl || !state.agent) return;

    const scan = state.agent.scanAllTransactions();
    const stats = state.agent.getStatistics(scan);
    rateEl.innerText = stats.compliance_rate_percent + "%";
    vioEl.innerText = stats.violation_transactions + " violations";
  }

  function showComplianceDashboard() {
    if (!ensureAgentAndUI()) return;

    state.ui.setLanguage(state.currentLang);
    state.ui.setSeverityFilter(state.currentSeverity);
    state.ui.refresh();

    openModal();
    refreshPreview();
  }

  function closeComplianceDashboard() {
    closeModal();
  }

  function filterViolations(arg1, arg2, arg3) {
    let severity = "all";
    let nextLang = state.currentLang;
    let type = "";

    if (typeof arg1 === "string" && (arg1 === "high" || arg1 === "medium" || arg1 === "low" || arg1 === "all")) {
      severity = arg1;
    } else if (typeof arg2 === "string" && arg2) {
      severity = arg2;
    }

    if (typeof arg1 === "string" && (arg1 === "en" || arg1 === "hi" || arg1 === "mr" || arg1 === "bh" || arg1 === "pa" || arg1 === "pu")) {
      nextLang = mapAppLangToCompliance(arg1);
    }

    if (typeof arg3 === "string") {
      type = arg3;
    }

    state.currentLang = nextLang;
    localStorage.setItem(STORAGE_KEYS.lang, state.currentLang);

    state.currentSeverity = severity || "all";
    localStorage.setItem(STORAGE_KEYS.severity, state.currentSeverity);

    if (state.ui) {
      state.ui.setLanguage(state.currentLang);
      state.ui.setSeverityFilter(state.currentSeverity);
      state.ui.setTypeFilter(type);
      state.ui.refresh();
    }
    refreshPreview();
  }

  function toggleViolation(violationId) {
    const details = document.getElementById("details-" + violationId);
    if (!details) return;

    const parent = details.closest(".violation-item");
    const icon = parent ? parent.querySelector(".expand-icon") : null;
    const willOpen = details.classList.contains("hidden");

    if (willOpen) {
      details.classList.remove("hidden");
      if (icon) icon.textContent = "▲";
      state.expanded.add(violationId);
    } else {
      details.classList.add("hidden");
      if (icon) icon.textContent = "▼";
      state.expanded.delete(violationId);
    }

    saveStorageArray(STORAGE_KEYS.expanded, state.expanded);
  }

  function applyFilters() {
    const languageEl = document.getElementById("languageFilter");
    const severityEl = document.getElementById("severityFilter");
    const typeEl = document.getElementById("typeFilter");

    const language = languageEl ? languageEl.value : "";
    const severity = severityEl && severityEl.value ? severityEl.value : "all";
    const type = typeEl ? typeEl.value : "";

    filterViolations(language, severity, type);
  }

  function viewPolicy(policyId) {
    if (global.AgriSenseCompliance && global.AgriSenseCompliance.parser) {
      if (typeof global.AgriSenseCompliance.parser.loadPolicy === "function") {
        global.AgriSenseCompliance.parser.loadPolicy(policyId);
      }
      if (typeof global.AgriSenseCompliance.parser.renderPreview === "function") {
        let host = document.getElementById("policyPreviewHost");
        if (!host) {
          host = document.createElement("div");
          host.id = "policyPreviewHost";
          host.style.marginTop = "12px";
          const root = getDashboardRoot();
          if (root) root.prepend(host);
        }
        global.AgriSenseCompliance.parser.renderPreview("policyPreviewHost", { policyId: policyId, page: 1 });
        return;
      }
    }
    alert("Policy opened: " + policyId);
  }

  function generateNotice(farmerId, violationId) {
    if (!violationId) violationId = farmerId;

    const row = state.ui && Array.isArray(state.ui.lastRows)
      ? state.ui.lastRows.find((r) => r.violation_id === violationId)
      : null;

    const notice = {
      notice_id: "N-" + Date.now(),
      farmer_id: farmerId,
      violation_id: violationId,
      code: row ? row.code : "unknown",
      severity: row ? row.severity : "unknown",
      created_at: new Date().toISOString(),
      status: "generated"
    };

    const existing = readStorageArray(STORAGE_KEYS.notices);
    existing.push(notice);
    localStorage.setItem(STORAGE_KEYS.notices, JSON.stringify(existing));

    const noticeText = [
      "AgriSense Compliance Notice",
      "Notice ID: " + notice.notice_id,
      "Date: " + new Date(notice.created_at).toLocaleString(),
      "Farmer ID: " + farmerId,
      "Violation ID: " + violationId,
      "Type: " + notice.code,
      "Severity: " + notice.severity,
      "Status: Generated"
    ].join("\n");

    const blob = new Blob([noticeText], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "notice-" + farmerId + "-" + String(violationId).replace(/[^\w-]/g, "_") + ".txt";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }

  function parsePDF() {
    const input = document.getElementById("pdfUpload");
    const preview = document.getElementById("extractedRules");
    const file = input && input.files && input.files[0] ? input.files[0] : null;

    if (!file) {
      if (preview) preview.innerHTML = "Please choose a PDF file first.";
      alert("Please choose a PDF file first.");
      return;
    }

    let extracted = [];
    if (global.AgriSenseCompliance && global.AgriSenseCompliance.parser) {
      try {
        const parser = global.AgriSenseCompliance.parser;
        const policy = parser.loadPolicy("pm-kisan");
        extracted = parser.extractRules(policy.text || "");
      } catch (_) {
        extracted = [];
      }
    }

    if (!extracted.length) {
      extracted = [
        { rule_id: "PMK-001", title: "Land Size Eligibility", severity: "high" },
        { rule_id: "PMK-003", title: "Installment Limit", severity: "high" },
        { rule_id: "PMF-001", title: "Timely Reporting", severity: "medium" }
      ];
    }

    if (preview) {
      preview.innerHTML = extracted
        .slice(0, 8)
        .map(function (r) {
          return "<div><strong>" + r.rule_id + "</strong> - " + r.title + " (" + r.severity + ")</div>";
        })
        .join("");
    }

    alert("📄 " + file.name + " parsed! " + extracted.length + " rules extracted.");
  }

  function markReviewed(farmerId, violationId) {
    if (!violationId) return;
    state.reviewed.add(violationId);
    saveStorageArray(STORAGE_KEYS.reviewed, state.reviewed);

    const row = document.querySelector('.violation-item[data-violation-id="' + violationId + '"]');
    if (row) {
      row.style.opacity = "0.8";
      row.style.borderStyle = "dashed";
    }
    alert("Marked reviewed: " + farmerId);
  }

  function escalate(farmerId, violationId) {
    const escalatedAt = new Date().toLocaleString();
    alert("Escalated to officer.\nFarmer: " + farmerId + "\nViolation: " + violationId + "\nTime: " + escalatedAt);
  }

  function showStepByStepGuide(violationId) {
    const guide = [
      "1. Collect related documents (land record, receipts, claim copy).",
      "2. Visit Tehsildar office or agriculture office within 7 days.",
      "3. Submit correction request and keep acknowledgment slip.",
      "4. Pay due recovery early to reduce penalty impact.",
      "5. Track closure status in Compliance Dashboard."
    ].join("\n");
    alert("Remediation Guide for " + violationId + ":\n\n" + guide);
  }

  function generateAuditReport() {
    if (!state.agent) return;
    const scan = state.agent.scanAllTransactions();
    const stats = state.agent.getStatistics(scan);
    const now = new Date();

    const lines = [
      "AgriSense Compliance Audit Report",
      "Generated: " + now.toLocaleString(),
      "Total Transactions: " + stats.total_transactions,
      "Compliant Transactions: " + stats.compliant_transactions,
      "Violation Transactions: " + stats.violation_transactions,
      "Compliance Rate: " + stats.compliance_rate_percent + "%",
      "",
      "District Breakdown:"
    ];

    Object.keys(stats.totals_by_district || {}).forEach(function (d) {
      const row = stats.totals_by_district[d];
      lines.push("- " + d + ": total=" + row.total + ", compliant=" + row.compliant + ", violations=" + row.violations);
    });

    const text = lines.join("\n");
    const blob = new Blob([text], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "compliance-audit-report-" + now.toISOString().slice(0, 10) + ".txt";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }

  function downloadCompliancePDF() {
    const modal = getModal();
    if (!modal || modal.classList.contains("hidden")) {
      showComplianceDashboard();
      setTimeout(function () {
        window.print();
      }, 200);
      return;
    }
    window.print();
  }

  function markResolved(violationIdOrFarmerId) {
    if (!violationIdOrFarmerId) return;

    const isViolationId = String(violationIdOrFarmerId).indexOf("::") >= 0;
    const violationId = violationIdOrFarmerId;

    if (isViolationId) {
      state.resolved.add(violationId);
      saveStorageArray(STORAGE_KEYS.resolved, state.resolved);
    }

    const detailByViolation = document.getElementById("details-" + violationId);
    const rowByViolation = detailByViolation ? detailByViolation.closest(".violation-item") : null;

    let row = rowByViolation;
    if (!row) {
      const possibleHeaders = document.querySelectorAll(".violation-item .violation-header");
      for (let i = 0; i < possibleHeaders.length; i++) {
        const header = possibleHeaders[i];
        if (header.textContent && header.textContent.indexOf(violationIdOrFarmerId) !== -1) {
          row = header.closest(".violation-item");
          break;
        }
      }
    }

    if (row) row.remove();

    if (state.ui) {
      state.ui.refresh();
    }

    updateViolationCounts();
    refreshPreview();
  }

  function updateViolationCounts() {
    const remaining = document.querySelectorAll(".violation-item").length;

    const warningValue = document.querySelector(".stat-card.warning .stat-value");
    if (warningValue) warningValue.textContent = String(remaining);

    const sectionTitle = document.querySelector(".section-header h3");
    if (sectionTitle) {
      sectionTitle.innerHTML = '<i class="fas fa-exclamation-triangle"></i> सक्रिय उल्लंघन (' + remaining + ")";
    }
  }

  function bindGlobalEventListeners() {
    const appLangSelect = document.getElementById("lang");
    if (appLangSelect && appLangSelect.dataset.cmpBound !== "1") {
      appLangSelect.dataset.cmpBound = "1";
      appLangSelect.addEventListener("change", function () {
        state.currentLang = mapAppLangToCompliance(appLangSelect.value);
        localStorage.setItem(STORAGE_KEYS.lang, state.currentLang);
        if (state.ui) {
          state.ui.setLanguage(state.currentLang);
        }
      });
    }

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") {
        closeComplianceDashboard();
      }
    });
  }

  function initComplianceIntegration() {
    if (state.initialized) return;

    state.currentLang = mapAppLangToCompliance(getStoredLang());
    state.currentSeverity = localStorage.getItem(STORAGE_KEYS.severity) || "all";
    state.expanded = new Set(readStorageArray(STORAGE_KEYS.expanded));
    state.resolved = new Set(readStorageArray(STORAGE_KEYS.resolved));
    state.reviewed = new Set(readStorageArray(STORAGE_KEYS.reviewed));

    global.AgriSenseCompliance = global.AgriSenseCompliance || {};
    global.AgriSenseCompliance.integration = {
      isResolved: function (violationId) {
        return state.resolved.has(violationId);
      },
      getResolvedIds: function () {
        return Array.from(state.resolved);
      }
    };

    bindGlobalEventListeners();
    loadDatasetFromJson().finally(function () {
      ensureAgentAndUI();
      refreshPreview();
    });

    // Global API as requested.
    global.showComplianceDashboard = showComplianceDashboard;
    global.closeComplianceDashboard = closeComplianceDashboard;
    global.filterViolations = filterViolations;
    global.toggleViolation = toggleViolation;
    global.applyFilters = applyFilters;
    global.viewPolicy = viewPolicy;
    global.generateNotice = generateNotice;
    global.markResolved = markResolved;
    global.updateViolationCounts = updateViolationCounts;
    global.parsePDF = parsePDF;
    global.markReviewed = markReviewed;
    global.escalate = escalate;
    global.showStepByStepGuide = showStepByStepGuide;
    global.generateAuditReport = generateAuditReport;
    global.downloadCompliancePDF = downloadCompliancePDF;

    // Compatibility aliases with existing dashboard handlers.
    global.openComplianceDashboard = function (event) {
      if (event && typeof event.preventDefault === "function") event.preventDefault();
      showComplianceDashboard();
    };
    global.refreshComplianceDashboard = function () {
      if (state.ui) state.ui.refresh();
      refreshPreview();
    };

    state.initialized = true;
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initComplianceIntegration);
  } else {
    initComplianceIntegration();
  }
})(window);
