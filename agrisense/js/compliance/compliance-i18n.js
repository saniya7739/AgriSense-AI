/*
  compliance-i18n.js
  Translation dictionary for Compliance UI and agent outputs.
*/
(function (global) {
  "use strict";

  const dictionary = {
    en: {
      // Dashboard
      compliance_agent: "Compliance Agent",
      compliance_rate: "Compliance Rate",
      violating_farmers: "Violating Farmers",
      total_penalty: "Total Penalty",
      active_policies: "Active Policies",
      policy_documents: "Policy Documents",
      violations_by_district: "Violations by District",
      active_violations: "Active Violations",
      all_types: "All Types",
      high_priority: "High Priority",
      medium_priority: "Medium Priority",
      low_priority: "Low Priority",

      // Violation types
      subsidy_limit_exceeded: "Subsidy Limit Exceeded",
      late_reporting: "Late Reporting",
      excess_fertilizer: "Excess Fertilizer",
      duplicate_claim: "Duplicate Claim",
      price_manipulation: "Price Manipulation",

      // UI elements
      violation_explanation: "Violation Explanation",
      evidence: "Evidence",
      penalty: "Penalty",
      recommendation: "Recommendation",
      view_details: "View Details",
      mark_resolved: "Mark Resolved",
      generate_notice: "Generate Notice",

      // Severity
      high: "High",
      medium: "Medium",
      low: "Low"
    },

    hi: {
      // Dashboard
      compliance_agent: "अनुपालन डैशबोर्ड",
      compliance_rate: "अनुपालन दर",
      violating_farmers: "उल्लंघन करने वाले किसान",
      total_penalty: "कुल दंड",
      active_policies: "सक्रिय नीतियां",
      policy_documents: "नीति दस्तावेज",
      violations_by_district: "जिला | उल्लंघन",
      active_violations: "सक्रिय उल्लंघन",
      all_types: "सभी प्रकार",
      high_priority: "उच्च प्राथमिकता",
      medium_priority: "मध्यम प्राथमिकता",
      low_priority: "निम्न प्राथमिकता",

      // Violation types
      subsidy_limit_exceeded: "सब्सिडी सीमा से अधिक",
      late_reporting: "देर से रिपोर्टिंग",
      excess_fertilizer: "अधिक उर्वरक उपयोग",
      duplicate_claim: "डुप्लिकेट दावा",
      price_manipulation: "मूल्य हेरफेर",

      // UI elements
      violation_explanation: "उल्लंघन की व्याख्या",
      evidence: "साक्ष्य",
      penalty: "दंड",
      recommendation: "सिफारिश",
      view_details: "विवरण देखें",
      mark_resolved: "समाधान के रूप में चिह्नित करें",
      generate_notice: "नोटिस जनरेट करें",

      // Severity
      high: "उच्च",
      medium: "मध्यम",
      low: "निम्न"
    },

    mr: {
      // Dashboard
      compliance_agent: "अनुपालन एजंट",
      compliance_rate: "अनुपालन दर",
      violating_farmers: "उल्लंघन करणारे शेतकरी",
      total_penalty: "एकूण दंड",
      active_policies: "सक्रिय धोरणे",
      policy_documents: "धोरण कागदपत्रे",
      violations_by_district: "जिल्हानिहाय उल्लंघन",
      active_violations: "सक्रिय उल्लंघन",
      all_types: "सर्व प्रकार",
      high_priority: "उच्च प्राधान्य",
      medium_priority: "मध्यम प्राधान्य",
      low_priority: "कमी प्राधान्य",

      // Violation types
      subsidy_limit_exceeded: "अनुदान मर्यादा ओलांडली",
      late_reporting: "उशिरा नोंदवणी",
      excess_fertilizer: "अतिरिक्त खत वापर",
      duplicate_claim: "डुप्लिकेट दावा",
      price_manipulation: "किंमत फेरफार",

      // UI elements
      violation_explanation: "उल्लंघन स्पष्टीकरण",
      evidence: "पुरावा",
      penalty: "दंड",
      recommendation: "शिफारस",
      view_details: "तपशील पहा",
      mark_resolved: "निराकरण म्हणून चिन्हांकित करा",
      generate_notice: "नोटीस तयार करा",

      // Severity
      high: "उच्च",
      medium: "मध्यम",
      low: "कमी"
    }
  };

  function t(lang, key) {
    const selected = dictionary[lang] || dictionary.en;
    return selected[key] || dictionary.en[key] || key;
  }

  global.AgriSenseCompliance = global.AgriSenseCompliance || {};
  global.AgriSenseCompliance.i18n = {
    dictionary: dictionary,
    t: t
  };
})(window);
