const SCHEMES = {
  hi: [
    {
      name: "प्रधानमंत्री किसान सम्मान निधि",
      desc: "किसानों को प्रति वर्ष ₹6000 की आर्थिक सहायता",
      benefits: "सीधे खाते में राशि स्थानांतरण",
      link: "pmkisan.gov.in"
    },
    {
      name: "प्रधानमंत्री फसल बीमा योजना",
      desc: "फसल की क्षति पर बीमा कवर प्रदान करती है",
      benefits: "प्राकृतिक आपदाओं से सुरक्षा",
      link: "pmfby.gov.in"
    },
    {
      name: "सॉयल हेल्थ कार्ड योजना",
      desc: "मिट्टी की जांच करके पोषक तत्वों की जानकारी",
      benefits: "निःशुल्क मिट्टी परीक्षण",
      link: "soilhealth.dac.gov.in"
    },
    {
      name: "किसान क्रेडिट कार्ड योजना",
      desc: "किसानों को कम ब्याज पर कर्ज सुविधा",
      benefits: "साधारण ब्याज दरें",
      link: "nabard.org"
    },
    {
      name: "प्रधानमंत्री कृषि सिंचाई योजना",
      desc: "खेतों में सिंचाई सुविधाओं का विकास",
      benefits: "पानी की बचत और उत्पादन वृद्धि",
      link: "pmksy.gov.in"
    }
  ],
  en: [
    {
      name: "PM Kisan Samman Nidhi",
      desc: "Provides ₹6000 annual financial support to farmers",
      benefits: "Direct transfer to bank account",
      link: "pmkisan.gov.in"
    },
    {
      name: "PM Fasal Bima Yojana",
      desc: "Provides crop insurance against losses",
      benefits: "Protection from natural calamities",
      link: "pmfby.gov.in"
    },
    {
      name: "Soil Health Card Scheme",
      desc: "Soil testing to know nutrient levels",
      benefits: "Free soil testing",
      link: "soilhealth.dac.gov.in"
    },
    {
      name: "Kisan Credit Card",
      desc: "Low-interest credit facility for farmers",
      benefits: "Affordable interest rates",
      link: "nabard.org"
    },
    {
      name: "PM Krishi Sinchayee Yojana",
      desc: "Development of irrigation facilities",
      benefits: "Water conservation and increased yield",
      link: "pmksy.gov.in"
    }
  ],
  bh: [
    {
      name: "प्रधानमंत्री किसान सम्मान निधि",
      desc: "किसानों को ₹6000 सालाना मदद",
      benefits: "सीधे खाते में रुपइया",
      link: "pmkisan.gov.in"
    },
    {
      name: "प्रधानमंत्री फसल बीमा योजना",
      desc: "फसल टूटने पर बीमा सहायता",
      benefits: "प्राकृतिक आपदा से रक्षा",
      link: "pmfby.gov.in"
    }
  ],
  mr: [
    {
      name: "पीएम किसान सम्मान निधी",
      desc: "शेतकर्यांना वार्षिक ₹6000 आर्थिक मदत",
      benefits: "थेट खात्यात रक्कम हस्तांतरण",
      link: "pmkisan.gov.in"
    },
    {
      name: "पीएम फसल विमा योजना",
      desc: "फसल नुकसानीविरुद्ध विमा कव्हर",
      benefits: "नैसर्गिक आपत्तीपासून सुरक्षा",
      link: "pmfby.gov.in"
    }
  ],
  pa: [
    {
      name: "ਪੀਐਮ ਕਿਸਾਨ ਸਮ੃דध ਨਿਧੀ",
      desc: "ਕਿਸਾਨਾਂ ਨੂੰ ਸਾਲਾਨਾ ₹6000 ਵਿੱਤੀ ਮਦਦ",
      benefits: "ਸਿੱਧੀ ਖਾਤੇ ਵਿੱਚ ਰਕਮ",
      link: "pmkisan.gov.in"
    },
    {
      name: "ਪੀਐਮ ਫਸਲ ਬੀਮਾ ਯੋਜਨਾ",
      desc: "ਫਸਲ ਨੁਕਸਾਨ ਪ੍ਰਤਿ ਬੀਮਾ ਕਵਰ",
      benefits: "ਕੁਦਰਤੀ ਆਫ਼ਤਾਂ ਤੋਂ ਸੁਰੱਖਿਆ",
      link: "pmfby.gov.in"
    }
  ]
};

const TEXTS = {
  hi: {
    heading: "🏛 सरकारी योजनाएँ",
    sub: "किसानों के लिए लाभकारी योजनाओं की जानकारी"
  },
  en: {
    heading: "🏛 Government Schemes",
    sub: "Information on beneficial schemes for farmers"
  },
  bh: {
    heading: "🏛 सरकारी योजना",
    sub: "किसानों के लिए लाभकारी योजनाओं की जानकारी"
  },
  mr: {
    heading: "🏛 सरकारी योजना",
    sub: "शेतकर्यांसाठी लाभकारी योजनांची माहिती"
  },
  pa: {
    heading: "🏛 ਸਰਕਾਰੀ ਯੋਜਨਾਵਾਂ",
    sub: "ਕਿਸਾਨਾਂ ਲਈ ਲਾਭਕਾਰੀ ਯੋਜਨਾਵਾਂ ਬਾਰੇ ਜਾਣਕਾਰੀ"
  }
};

function loadSchemes(lang) {
  const schemesList = document.getElementById("schemesList");
  schemesList.innerHTML = "";
  
  const schemes = SCHEMES[lang] || SCHEMES.en;
  
  schemes.forEach(scheme => {
    const card = document.createElement("div");
    card.className = "scheme-card";
    card.innerHTML = `
      <div class="scheme-header">
        <h3>${scheme.name}</h3>
      </div>
      <div class="scheme-body">
        <p><strong>📖 विवरण:</strong> ${scheme.desc}</p>
        <p><strong>✅ लाभ:</strong> ${scheme.benefits}</p>
        <p><strong>🔗 वेबसाइट:</strong> <a href="https://${scheme.link}" target="_blank">${scheme.link}</a></p>
      </div>
    `;
    schemesList.appendChild(card);
  });
}

function changeLang() {
  const langSelect = document.getElementById("lang");
  const lang = langSelect.value;
  const texts = TEXTS[lang];
  
  document.querySelector("h1").innerText = texts.heading;
  document.querySelector("p").innerText = texts.sub;
  
  loadSchemes(lang);
}

changeLang();
