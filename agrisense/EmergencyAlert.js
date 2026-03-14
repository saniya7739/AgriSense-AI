const ALERTS = {
  hi: [
    {
      level: "गंभीर",
      title: "टिड्डी दल चेतावनी",
      desc: "राजस्थान और उत्तर प्रदेश में टिड्डी दल की सूचना मिली है।",
      action: "कीटनाशक का छिड़काव करें और पास के किसानों को सूचित करें।"
    },
    {
      level: "मध्यम",
      title: "मौसम परिवर्तन",
      desc: "आने वाले 3 दिनों में भारी बारिश की संभावना है।",
      action: "खेतों से जल निकास की व्यवस्था करें।"
    },
    {
      level: "कम",
      title: "कीट संक्रमण",
      desc: "शूट बोरर कीट की संभावना बढ़ गई है।",
      action: "नीम का तेल का छिड़काव करें।"
    }
  ],
  en: [
    {
      level: "Critical",
      title: "Locust Swarm Warning",
      desc: "Locust swarm spotted in Rajasthan and Uttar Pradesh.",
      action: "Spray insecticide and notify nearby farmers."
    },
    {
      level: "Moderate",
      title: "Weather Change",
      desc: "Heavy rainfall expected in next 3 days.",
      action: "Arrange water drainage from fields."
    },
    {
      level: "Low",
      title: "Pest Infestation",
      desc: "Risk of shoot borer pest increased.",
      action: "Apply neem oil spray."
    }
  ],
  bh: [
    {
      level: "गंभीर",
      title: "टिड्डी दल चेतावनी",
      desc: "राजस्थान में टिड्डी की खबर मिली।",
      action: "कीटनाशक छिड़क के."
    }
  ],
  mr: [
    {
      level: "गंभीर",
      title: "टिड्डी दल सावधानी",
      desc: "राजस्थानमध्ये टिड्डी दलाची सूचना।",
      action: "कीटनाशक फवारा करा."
    }
  ],
  pa: [
    {
      level: "ਗੰਭੀਰ",
      title: "ਟिੱਡੀ ਦਲ ਚेਤਾਵਨੀ",
      desc: "ਰਾਜਸਥਾਨ ਵਿੱਚ ਟਿੱਡੀ ਦਲ ਦੀ ਮੌਜੂਦਗੀ।",
      action: "ਕੀਟਨਾਸ਼ਕ ਛਿੜਕੇ."
    }
  ]
};

const TEXTS = {
  hi: {
    heading: "🚨 आपातकालीन अलर्ट",
    sub: "महत्वपूर्ण खेती संबंधी चेतावनियाँ",
    reportTitle: "⚠️ समस्या की रिपोर्ट करें",
    problemL: "समस्या का प्रकार:",
    descL: "विवरण:",
    reportBtn: "📤 रिपोर्ट भेजें",
    problems: ["कीट संक्रमण", "रोग", "मौसम समस्या", "जल संकट", "अन्य"],
    success: "रिपोर्ट सफलतापूर्वक भेजी गई!",
    back: "वापस"
  },
  en: {
    heading: "🚨 Emergency Alert",
    sub: "Important farming warnings",
    reportTitle: "⚠️ Report a Problem",
    problemL: "Problem Type:",
    descL: "Description:",
    reportBtn: "📤 Send Report",
    problems: ["Pest", "Disease", "Weather Issue", "Water Crisis", "Other"],
    success: "Report sent successfully!",
    back: "Back"
  },
  bh: {
    heading: "🚨 आपातकालीन अलर्ट",
    sub: "महत्वपूर्ण खेती चेतावनी",
    reportTitle: "⚠️ समस्या की रिपोर्ट",
    problemL: "समस्या:",
    descL: "विवरण:",
    reportBtn: "📤 भेजव",
    problems: ["कीट", "रोग", "मौसम", "पानी", "अन्य"],
    success: "रिपोर्ट भेजा गया!",
    back: "लौटिन"
  },
  mr: {
    heading: "🚨 आपत्कालीन सूचना",
    sub: "महत्वाचे शेती सावधानी",
    reportTitle: "⚠️ समस्या नोंद करा",
    problemL: "समस्या प्रकार:",
    descL: "तपशील:",
    reportBtn: "📤 पाठवा",
    problems: ["कीट", "रोग", "हवामान", "पाणी", "इतर"],
    success: "नोंद केली गेली!",
    back: "परत"
  },
  pa: {
    heading: "🚨 ਐਮਰਜੈਂਸੀ ਅਲਰਟ",
    sub: "ਗਰਜ਼องद ਖੇਤੀ ਸਾਵਧਾਨੀਆਂ",
    reportTitle: "⚠️ ਸਮੱਸਿਆ ਰਿਪੋਰਟ ਕਰੋ",
    problemL: "ਸਮੱਸਿਆ ਕਿਸਮ:",
    descL: "ਵਿਸਥਾਰ:",
    reportBtn: "📤 ਭੇਜੋ",
    problems: ["ਕੀੜਾ", "ਬਿਮਾਰੀ", "ਮੌਸਮ", "ਪਾਣੀ", "ਹੋਰ"],
    success: "ਰਿਪੋਰਟ ਭੇਜੀ ਗਈ!",
    back: "ਵਾਪਸ"
  }
};

function loadAlerts(lang) {
  const alertsList = document.getElementById("alertsList");
  alertsList.innerHTML = "";
  
  const alerts = ALERTS[lang] || ALERTS.en;
  
  alerts.forEach(alert => {
    const card = document.createElement("div");
    card.className = `alert-card alert-${alert.level.toLowerCase()}`;
    card.innerHTML = `
      <div class="alert-header">
        <span class="level">${alert.level}</span>
        <h3>${alert.title}</h3>
      </div>
      <div class="alert-body">
        <p><strong>📝 विवरण:</strong> ${alert.desc}</p>
        <p><strong>✅ कार्रवाई:</strong> ${alert.action}</p>
      </div>
    `;
    alertsList.appendChild(card);
  });
}

function loadProblems(lang) {
  const problem = document.getElementById("problem");
  problem.innerHTML = '<option value="">-- Select --</option>';
  
  const texts = TEXTS[lang];
  texts.problems.forEach(p => {
    const opt = document.createElement("option");
    opt.value = p;
    opt.textContent = p;
    problem.appendChild(opt);
  });
}

function changeLang() {
  const lang = localStorage.getItem('selectedLanguage') || 'hi';
  const texts = TEXTS[lang];
  
  document.querySelector("h1").innerText = texts.heading;
  document.querySelector("p").innerText = texts.sub;
  document.getElementById("reportTitle").innerText = texts.reportTitle;
  document.getElementById("problemL").innerText = texts.problemL;
  document.getElementById("descL").innerText = texts.descL;
  document.getElementById("reportBtn").innerText = texts.reportBtn;
  document.getElementById("backBtn").innerText = `← ${texts.back}`;
  
  loadAlerts(lang);
  loadProblems(lang);
}

function submitReport() {
  const lang = localStorage.getItem('selectedLanguage') || 'hi';
  const problem = document.getElementById("problem").value;
  const description = document.getElementById("description").value;
  
  if (!problem || !description) {
    alert(lang === "en" ? "Please fill all fields" : "कृपया सभी क्षेत्र भरें");
    return;
  }
  
  alert(TEXTS[lang].success);
  document.getElementById("problem").value = "";
  document.getElementById("description").value = "";
}

// Listen for language change event
window.addEventListener('languageChanged', function(event) {
    changeLang();
});

changeLang();
