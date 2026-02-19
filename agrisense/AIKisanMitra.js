const DATA = {
  hi: {
    heading: "🧑‍🌾 एआई किसान मित्र",
    sub: "अपने सवालों का जवाब पाएं",
    catL: "🎯 विषय चुनें",
    qL: "❓ प्रश्न चुनें",
    btn: "💡 उत्तर प्राप्त करें"
  },
  en: {
    heading: "🧑‍🌾 AI Kisan Mitra",
    sub: "Get answers to your farming questions",
    catL: "🎯 Select Topic",
    qL: "❓ Select Question",
    btn: "💡 Get Answer"
  },
  bh: {
    heading: "🧑‍🌾 एआई किसान साथी",
    sub: "अपन सवालों का जवाब ले",
    catL: "🎯 विषय चुने",
    qL: "❓ प्रश्न चुने",
    btn: "💡 जवाब पाव"
  },
  mr: {
    heading: "🧑‍🌾 एआय शेतकरी मित्र",
    sub: "आपल्या प्रश्नांची उत्तरे मिळवा",
    catL: "🎯 विषय निवडा",
    qL: "❓ प्रश्न निवडा",
    btn: "💡 उत्तर मिळवा"
  },
  pa: {
    heading: "🧑‍🌾 ਏਆਈ ਕਿਸਾਨ ਮਿਤਰ",
    sub: "ਆਪਣੇ ਸਵਾਲਾਂ ਦੇ ਜਵਾਬ ਪਾਓ",
    catL: "🎯 ਵਿਸ਼ਾ ਚੁਣੋ",
    qL: "❓ ਪ੍ਰਸ਼ਨ ਚੁਣੋ",
    btn: "💡 ਜਵਾਬ ਪਾਓ"
  }
};

const KNOWLEDGE_BASE = {
  "मिट्टी तैयारी": {
    "मिट्टी की जांच कैसे करें?": "मिट्टी जांच के लिए नजदीकी कृषि विभाग में जाएं। आप घर पर भी सरल जांच कर सकते हैं - मिट्टी को पानी में घोलकर रंग देखें।",
    "खेत की गहरी जुताई क्यों जरूरी है?": "गहरी जुताई से मिट्टी भरभरी हो जाती है, जड़ें गहरी जाती हैं और खरपतवार नष्ट होते हैं।"
  },
  "बीज और बुवाई": {
    "अच्छा बीज कैसे चुनें?": "प्रमाणित बीज हमेशा खरीदें। बीज भारी, चमकदार और कीटमुक्त होना चाहिए।",
    "सही बुवाई का समय क्या है?": "फसल के अनुसार समय अलग होता है। खरीफ में जून-जुलाई, रबी में अक्टूबर-नवंबर उपयुक्त है।"
  },
  "सिंचाई प्रबंधन": {
    "ड्रिप सिंचाई के क्या फायदे हैं?": "ड्रिप सिंचाई से पानी बचता है, खरपतवार कम होते हैं और पैदावार 30-40% बढ़ जाती है।",
    "कितनी बार सिंचाई करनी चाहिए?": "यह मिट्टी, मौसम और फसल पर निर्भर करता है। आमतौर पर 7-10 दिन के अंतराल पर सिंचाई करें।"
  },
  "खाद और पोषण": {
    "गोबर की खाद कैसे बनाएं?": "गोबर को 2-3 महीने सड़ाएं। आप कॉम्पोस्ट बनाने के लिए सूखी पत्तियां भी मिला सकते हैं।",
    "जैव खाद के फायदे क्या हैं?": "जैव खाद से मिट्टी की जणन क्षमता बढ़ती है और रासायनिक खाद का इस्तेमाल कम होता है।"
  },
  "रोग प्रबंधन": {
    "फसल के रोग कैसे पहचानें?": "पत्तियों पर धब्बे, पीलापन या सूखापन रोग के लक्षण हैं। नजदीकी कृषि अधिकारी से संपर्क करें।",
    "जैविक कीटनाशक कैसे बनाएं?": "नीम के पत्तों और साबुन को पानी में 2-3 दिन भिगोएं। यह प्राकृतिक कीटनाशक के रूप में काम करता है।"
  }
};

const KNOWLEDGE_BASE_EN = {
  "Soil Preparation": {
    "How to test soil quality?": "Visit agricultural department for soil testing. You can also check at home - dissolve soil in water and check color.",
    "Why is deep plowing important?": "Deep plowing makes soil loose, allows roots to go deeper, and destroys weeds."
  },
  "Seeds and Sowing": {
    "How to choose good seeds?": "Always buy certified seeds. Seeds should be heavy, shiny and pest-free.",
    "What is the right sowing time?": "It depends on the crop. Kharif in June-July, Rabi in October-November is suitable."
  },
  "Irrigation Management": {
    "What are benefits of drip irrigation?": "Drip irrigation saves water, reduces weeds, and increases yield by 30-40%.",
    "How often should I irrigate?": "It depends on soil, weather and crop. Generally irrigate every 7-10 days."
  },
  "Fertilization": {
    "How to make cow manure?": "Let manure decompose for 2-3 months. You can mix dry leaves for better compost.",
    "What are bio-fertilizer benefits?": "Bio-fertilizers improve soil fertility and reduce chemical fertilizer dependency."
  },
  "Disease Management": {
    "How to identify crop diseases?": "Leaf spots, yellowing, or withering are disease symptoms. Contact agricultural officer nearby.",
    "How to make organic pesticide?": "Soak neem leaves and soap in water for 2-3 days. Use as natural pesticide."
  }
};

function loadCategories(lang) {
  const kb = lang === "en" ? KNOWLEDGE_BASE_EN : KNOWLEDGE_BASE;
  const category = document.getElementById("category");
  category.innerHTML = '<option value="">-- Select Topic --</option>';
  
  Object.keys(kb).forEach(cat => {
    const option = document.createElement("option");
    option.value = cat;
    option.textContent = cat;
    category.appendChild(option);
  });
}

function updateQuestions() {
  const langSelect = document.getElementById("lang");
  const lang = langSelect.value;
  const kb = lang === "en" ? KNOWLEDGE_BASE_EN : KNOWLEDGE_BASE;
  const category = document.getElementById("category").value;
  const question = document.getElementById("question");
  
  question.innerHTML = '<option value="">-- Select Question --</option>';
  
  if (category && kb[category]) {
    Object.keys(kb[category]).forEach(q => {
      const option = document.createElement("option");
      option.value = q;
      option.textContent = q;
      question.appendChild(option);
    });
  }
}

function changeLang() {
  const langSelect = document.getElementById("lang");
  const lang = langSelect.value;
  const d = DATA[lang];
  
  document.getElementById("heading").innerText = d.heading;
  document.getElementById("sub").innerText = d.sub;
  document.getElementById("catL").innerText = d.catL;
  document.getElementById("qL").innerText = d.qL;
  document.getElementById("btn").innerText = d.btn;
  
  loadCategories(lang);
  document.getElementById("question").innerHTML = '<option value="">-- Select Question --</option>';
  document.getElementById("answerBox").classList.add("hidden");
}

function getAnswer() {
  const lang = document.getElementById("lang").value;
  const kb = lang === "en" ? KNOWLEDGE_BASE_EN : KNOWLEDGE_BASE;
  const category = document.getElementById("category").value;
  const question = document.getElementById("question").value;
  const answerBox = document.getElementById("answerBox");
  
  if (!category || !question) {
    alert(lang === "en" ? "Please select both category and question" : "कृपया विषय और प्रश्न दोनों चुनें");
    return;
  }
  
  const answer = kb[category][question];
  document.getElementById("ansTitle").innerText = question;
  document.getElementById("ansText").innerText = answer;
  answerBox.classList.remove("hidden");
}

changeLang();
