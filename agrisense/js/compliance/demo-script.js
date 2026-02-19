/*
  demo-script.js
  Judge-focused demo script for Compliance Agent.

  What it does:
  1) Shows 3 prominent violation cards on page load
  2) Provides a guided "Tour" across 3 compliance scenarios
  3) Speaks Hindi explanation for each scenario
  4) Generates notice summary in printable PDF format (via browser print dialog)
  5) Calculates total penalties detected and shows ₹ amount

  Usage:
  - Include this script after compliance-data.js + compliance-agent.js
  - Optional: place a container with id="complianceDemoMount"
    If absent, it auto-injects near top of page.
*/
(function (global) {
  "use strict";

  const NS = (global.AgriSenseCompliance = global.AgriSenseCompliance || {});

  const STEP_META = {
    subsidy: {
      title: "Subsidy Violation (Land Records)",
      icon: "fa-file-signature",
      hindi:
        "यह किसान भूमि सीमा से ऊपर है और फिर भी सब्सिडी दावा किया गया है। भूमि रिकॉर्ड और पात्रता नियम के आधार पर उल्लंघन चिन्हित हुआ है।"
    },
    insurance: {
      title: "Late Insurance Claim (Calendar Check)",
      icon: "fa-calendar-days",
      hindi:
        "बीमा दावा निर्धारित समय सीमा के बाद दर्ज हुआ है। कैलेंडर टाइमलाइन के अनुसार यह विलंबित रिपोर्टिंग उल्लंघन है।"
    },
    fertilizer: {
      title: "Excess Fertilizer (Purchase History)",
      icon: "fa-bag-shopping",
      hindi:
        "उर्वरक खरीद सीमा से अधिक पाई गई है। खरीद इतिहास के आधार पर यूरिया उपयोग नीति सीमा पार कर चुका है।"
    }
  };

  const STATE = {
    agent: null,
    scan: null,
    featured: [],
    tourIndex: 0
  };

  function getAgent() {
    if (NS.agent) return NS.agent;
    if (NS.ComplianceAgent) {
      NS.agent = new NS.ComplianceAgent();
      return NS.agent;
    }
    return null;
  }

  function flattenViolations(scan) {
    const rows = [];
    (scan.results || []).forEach((entry) => {
      (entry.violations || []).forEach((v, idx) => {
        rows.push({
          violation_id: entry.transaction_id + "::" + (v.code || "unknown") + "::" + idx,
          transaction_id: entry.transaction_id,
          farmer_id: entry.farmer_id,
          district: entry.district || "Unknown",
          severity: (v.severity || "low").toLowerCase(),
          code: v.code || "unknown",
          policy_name: v.policy_name || "Policy",
          evidence: v.evidence || {},
          penalty: v.penalty || {},
          justification: v.justification || "",
          transaction_type: v.transaction_type || "unknown"
        });
      });
    });
    return rows;
  }

  function pickFeatured(violations) {
    function firstByCode(code) {
      return violations.find((v) => v.code === code) || null;
    }

    const subsidy =
      firstByCode("subsidy_limit_exceeded") ||
      firstByCode("claim_amount_exceeded") ||
      firstByCode("duplicate_claims");

    const insurance = firstByCode("late_reporting");
    const fertilizer = firstByCode("excess_fertilizer");

    return [
      { key: "subsidy", violation: subsidy },
      { key: "insurance", violation: insurance },
      { key: "fertilizer", violation: fertilizer }
    ];
  }

  function formatInr(value) {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0
    }).format(Number(value || 0));
  }

  function totalPenalty(violations) {
    return violations.reduce((sum, row) => {
      return sum + Number((row.penalty && row.penalty.total_recoverable) || 0);
    }, 0);
  }

  function ensureStyles() {
    if (document.getElementById("cmp-demo-style")) return;
    const style = document.createElement("style");
    style.id = "cmp-demo-style";
    style.textContent = `
      .cmp-demo-wrap{
        max-width:980px;
        margin:16px auto 8px;
        background:#ffffff;
        border:1px solid #d8e8da;
        border-radius:16px;
        box-shadow:0 10px 24px rgba(0,0,0,0.10);
        padding:14px;
      }
      .cmp-demo-head{
        display:flex;
        justify-content:space-between;
        gap:10px;
        align-items:center;
        flex-wrap:wrap;
        margin-bottom:10px;
      }
      .cmp-demo-title{
        font-size:18px;
        font-weight:800;
        color:#1b5e20;
      }
      .cmp-demo-penalty{
        color:#8b0000;
        font-weight:800;
      }
      .cmp-demo-actions{
        display:flex;
        gap:8px;
        flex-wrap:wrap;
      }
      .cmp-demo-btn{
        border:none;
        border-radius:10px;
        padding:9px 12px;
        cursor:pointer;
        font-weight:700;
      }
      .cmp-demo-btn.tour{background:#2e7d32;color:#fff;}
      .cmp-demo-btn.tour:hover{background:#1b5e20;}
      .cmp-demo-cards{
        display:grid;
        grid-template-columns:repeat(3,minmax(0,1fr));
        gap:10px;
      }
      .cmp-demo-card{
        border:1px solid #e0e6e0;
        border-radius:12px;
        padding:10px;
        background:#f8fbf8;
        transition:transform .2s ease, box-shadow .2s ease, border-color .2s ease;
      }
      .cmp-demo-card.active{
        border-color:#ef6c00;
        box-shadow:0 0 0 2px rgba(239,108,0,.2) inset;
        transform:translateY(-2px);
      }
      .cmp-demo-card h4{
        font-size:14px;
        margin:0 0 6px;
        color:#234f2a;
      }
      .cmp-demo-meta{
        font-size:12px;
        color:#455a47;
        margin:2px 0;
      }
      .cmp-demo-code{
        display:inline-block;
        margin-top:6px;
        border-radius:999px;
        padding:3px 7px;
        font-size:11px;
        font-weight:700;
        background:#ffe8e8;
        color:#8b0000;
      }
      .cmp-demo-card-actions{
        margin-top:8px;
        display:flex;
        gap:6px;
        flex-wrap:wrap;
      }
      .cmp-mini-btn{
        border:none;
        border-radius:8px;
        padding:6px 8px;
        font-size:12px;
        font-weight:700;
        cursor:pointer;
        background:#2e7d32;
        color:#fff;
      }
      .cmp-mini-btn.secondary{
        background:#1565c0;
      }
      .cmp-tour-tip{
        margin-top:10px;
        border-radius:10px;
        background:#fff8e1;
        border:1px solid #ffecb3;
        color:#6d4c00;
        padding:10px 12px;
        font-size:13px;
        display:none;
      }
      .cmp-tour-tip.show{display:block; animation:cmpTourFade .25s ease;}
      @keyframes cmpTourFade{
        from{opacity:0; transform:translateY(4px);}
        to{opacity:1; transform:translateY(0);}
      }
      @media (max-width:800px){
        .cmp-demo-cards{grid-template-columns:1fr;}
      }
    `;
    document.head.appendChild(style);
  }

  function createMount() {
    let mount = document.getElementById("complianceDemoMount");
    if (mount) return mount;

    mount = document.createElement("div");
    mount.id = "complianceDemoMount";
    const features = document.querySelector(".features");
    if (features && features.parentNode) {
      features.parentNode.insertBefore(mount, features);
    } else {
      document.body.insertBefore(mount, document.body.firstChild);
    }
    return mount;
  }

  function render() {
    ensureStyles();
    const mount = createMount();

    const allViolations = flattenViolations(STATE.scan);
    const total = totalPenalty(allViolations);

    const cardsHtml = STATE.featured
      .map(function (item, idx) {
        const meta = STEP_META[item.key];
        const v = item.violation;
        if (!v) {
          return `
            <div class="cmp-demo-card" id="cmpDemoCard${idx}">
              <h4><i class="fas ${meta.icon}"></i> ${meta.title}</h4>
              <div class="cmp-demo-meta">No live case found in current dataset.</div>
            </div>
          `;
        }

        return `
          <div class="cmp-demo-card" id="cmpDemoCard${idx}" data-step="${item.key}">
            <h4><i class="fas ${meta.icon}"></i> ${meta.title}</h4>
            <div class="cmp-demo-meta"><strong>Farmer:</strong> ${v.farmer_id}</div>
            <div class="cmp-demo-meta"><strong>District:</strong> ${v.district}</div>
            <div class="cmp-demo-meta"><strong>Policy:</strong> ${v.policy_name}</div>
            <div class="cmp-demo-meta"><strong>Penalty:</strong> ${formatInr((v.penalty && v.penalty.total_recoverable) || 0)}</div>
            <span class="cmp-demo-code">${v.code}</span>
            <div class="cmp-demo-card-actions">
              <button class="cmp-mini-btn" type="button" onclick="AgriSenseCompliance.demoScript.speakViolation('${item.key}')">Hindi Voice</button>
              <button class="cmp-mini-btn secondary" type="button" onclick="AgriSenseCompliance.demoScript.generateNoticePdf('${item.key}')">Generate Notice</button>
            </div>
          </div>
        `;
      })
      .join("");

    mount.innerHTML = `
      <section class="cmp-demo-wrap">
        <div class="cmp-demo-head">
          <div>
            <div class="cmp-demo-title">Compliance Demo Highlights</div>
            <div class="cmp-demo-penalty">Total penalties detected: ${formatInr(total)}</div>
          </div>
          <div class="cmp-demo-actions">
            <button class="cmp-demo-btn tour" type="button" onclick="AgriSenseCompliance.demoScript.startTour()">Start Tour</button>
          </div>
        </div>
        <div class="cmp-demo-cards">${cardsHtml}</div>
        <div class="cmp-tour-tip" id="cmpTourTip"></div>
      </section>
    `;
  }

  function highlightStep(index) {
    for (let i = 0; i < 3; i++) {
      const card = document.getElementById("cmpDemoCard" + i);
      if (card) card.classList.remove("active");
    }
    const active = document.getElementById("cmpDemoCard" + index);
    if (active) {
      active.classList.add("active");
      active.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }

  function startTour() {
    STATE.tourIndex = 0;
    showTourStep();
  }

  function showTourStep() {
    const order = ["subsidy", "insurance", "fertilizer"];
    const idx = STATE.tourIndex;
    const key = order[idx];
    const tip = document.getElementById("cmpTourTip");
    const meta = STEP_META[key];

    highlightStep(idx);
    if (tip) {
      const nextLabel = idx < 2 ? "Next" : "Finish";
      tip.classList.add("show");
      tip.innerHTML = `
        <strong>Step ${idx + 1}:</strong> ${meta.title}<br>
        ${meta.hindi}
        <div style="margin-top:8px;display:flex;gap:8px;flex-wrap:wrap;">
          <button class="cmp-mini-btn" type="button" onclick="AgriSenseCompliance.demoScript.speakViolation('${key}')">Play Hindi Voice</button>
          <button class="cmp-mini-btn secondary" type="button" onclick="AgriSenseCompliance.demoScript.nextTourStep()">${nextLabel}</button>
        </div>
      `;
    }
  }

  function nextTourStep() {
    if (STATE.tourIndex >= 2) {
      const tip = document.getElementById("cmpTourTip");
      if (tip) {
        tip.innerHTML = "<strong>Tour complete:</strong> All 3 core policy violations demonstrated successfully.";
      }
      return;
    }
    STATE.tourIndex += 1;
    showTourStep();
  }

  function speakViolation(stepKey) {
    const meta = STEP_META[stepKey];
    if (!meta) return;
    if (!("speechSynthesis" in window)) {
      alert("Speech synthesis not supported.");
      return;
    }
    const utter = new SpeechSynthesisUtterance(meta.hindi);
    utter.lang = "hi-IN";
    utter.rate = 1;
    utter.pitch = 1;
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utter);
  }

  function getViolationByStep(stepKey) {
    const item = STATE.featured.find((x) => x.key === stepKey);
    return item ? item.violation : null;
  }

  function generateNoticePdf(stepKey) {
    const violation = getViolationByStep(stepKey);
    const meta = STEP_META[stepKey];
    if (!violation || !meta) {
      alert("No violation data available for this demo step.");
      return;
    }

    const now = new Date();
    const penalty = (violation.penalty && violation.penalty.total_recoverable) || 0;
    const evidence = violation.evidence || {};

    const html = `
      <!doctype html>
      <html>
      <head>
        <meta charset="UTF-8">
        <title>Compliance Notice</title>
        <style>
          body{font-family:Arial,sans-serif;padding:24px;color:#1f2e21;}
          h1{color:#1b5e20;margin:0 0 10px;}
          .box{border:1px solid #d8e4d9;border-radius:10px;padding:12px;margin:10px 0;}
          .k{font-weight:700;}
        </style>
      </head>
      <body>
        <h1>AgriSense Compliance Notice</h1>
        <div>Date: ${now.toLocaleString()}</div>
        <div class="box">
          <div><span class="k">Case:</span> ${meta.title}</div>
          <div><span class="k">Violation ID:</span> ${violation.violation_id}</div>
          <div><span class="k">Farmer ID:</span> ${violation.farmer_id}</div>
          <div><span class="k">District:</span> ${violation.district}</div>
          <div><span class="k">Rule:</span> ${violation.code}</div>
          <div><span class="k">Policy:</span> ${violation.policy_name}</div>
          <div><span class="k">Penalty:</span> ${formatInr(penalty)}</div>
        </div>
        <div class="box">
          <div class="k">Evidence</div>
          <pre>${JSON.stringify(evidence, null, 2)}</pre>
        </div>
        <div class="box">
          <div class="k">Explanation</div>
          <div>${violation.justification}</div>
        </div>
        <p>Use browser Print -> Save as PDF for final notice document.</p>
      </body>
      </html>
    `;

    const w = window.open("", "_blank");
    if (!w) {
      alert("Popup blocked. Please allow popups to generate notice.");
      return;
    }
    w.document.open();
    w.document.write(html);
    w.document.close();
    w.focus();
    setTimeout(function () {
      w.print();
    }, 250);
  }

  function init() {
    const agent = getAgent();
    if (!agent || typeof agent.scanAllTransactions !== "function") return;

    STATE.agent = agent;
    STATE.scan = agent.scanAllTransactions();
    STATE.featured = pickFeatured(flattenViolations(STATE.scan));
    render();
  }

  NS.demoScript = {
    init: init,
    startTour: startTour,
    nextTourStep: nextTourStep,
    speakViolation: speakViolation,
    generateNoticePdf: generateNoticePdf
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})(window);
