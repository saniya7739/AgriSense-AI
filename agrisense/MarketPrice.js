const DATA = {
  hi: {
    heading: "🏪 मंडी मूल्य",
    sub: "फसलों के वर्तमान मंडी मूल्य जानें",
    cropL: "🌾 फसल चुनें",
    priceL: "वर्तमान मूल्य:",
    highL: "उच्चतम:",
    lowL: "न्यूनतम:",
    avgL: "औसत:",
    updateMsg: "अंतिम अपडेट: आज",
    crops: ["गेहूं", "धान", "मक्का", "कपास", "सोयाबीन", "प्याज", "आलू", "टमाटर"]
  },
  en: {
    heading: "🏪 Market Price",
    sub: "Check current market prices of crops",
    cropL: "🌾 Select Crop",
    priceL: "Current Price:",
    highL: "Highest:",
    lowL: "Lowest:",
    avgL: "Average:",
    updateMsg: "Last Updated: Today",
    crops: ["Wheat", "Rice", "Maize", "Cotton", "Soybean", "Onion", "Potato", "Tomato"]
  },
  bh: {
    heading: "🏪 मंडी भाव",
    sub: "फसलों के भाव जानव",
    cropL: "🌾 फसल चुने",
    priceL: "वर्तमान भाव:",
    highL: "ऊंचा:",
    lowL: "कम:",
    avgL: "औसत:",
    updateMsg: "अंतिम अपडेट: आज",
    crops: ["गेहूं", "धान", "मक्का", "कपास"]
  },
  mr: {
    heading: "🏪 बाजार भाव",
    sub: "पिकांचे वर्तमान बाजार भाव जाणा",
    cropL: "🌾 शेती निवडा",
    priceL: "सद्य भाव:",
    highL: "सर्वोच्च:",
    lowL: "सर्वनिम्न:",
    avgL: "सरासरी:",
    updateMsg: "शेवटचा अपडेट: आज",
    crops: ["गहू", "भात", "मक्का", "कपास"]
  },
  pa: {
    heading: "🏪 ਮੰਡੀ ਭਾਅ",
    sub: "ਫਸਲਾਂ ਦੇ ਮੌਜੂਦਾ ਮੰਡੀ ਭਾਅ ਜਾਣੋ",
    cropL: "🌾 ਫਸਲ ਚੁਣੋ",
    priceL: "ਮੌਜੂਦਾ ਭਾਅ:",
    highL: "ਸਰਵਉਚ:",
    lowL: "ਸਰਵਨਿਮ:",
    avgL: "ਔਸਤ:",
    updateMsg: "ਆਖਰੀ ਅਪਡੇਟ: ਅੱਜ",
    crops: ["ਕਣਕ", "ਚਾਵਲ", "ਮੱਕੀ", "ਪੇਜ"]
  }
};

const MARKET_PRICES = {
  "Wheat": { current: 2200, high: 2250, low: 2100, avg: 2175 },
  "Rice": { current: 4500, high: 4800, low: 4200, avg: 4500 },
  "Maize": { current: 1950, high: 2050, low: 1850, avg: 1950 },
  "Cotton": { current: 5800, high: 6000, low: 5600, avg: 5800 },
  "Soybean": { current: 4100, high: 4300, low: 3900, avg: 4100 },
  "Onion": { current: 1800, high: 2000, low: 1600, avg: 1800 },
  "Potato": { current: 1500, high: 1700, low: 1300, avg: 1500 },
  "Tomato": { current: 2000, high: 2500, low: 1500, avg: 2000 }
};

function loadCrops(lang) {
  const crop = document.getElementById("crop");
  crop.innerHTML = '<option value="">-- Select --</option>';
  
  DATA[lang].crops.forEach(c => {
    const opt = document.createElement("option");
    opt.value = c;
    opt.textContent = c;
    crop.appendChild(opt);
  });
}

function changeLang() {
  const langSelect = document.getElementById("lang");
  const lang = langSelect.value;
  const d = DATA[lang];
  
  document.getElementById("heading").innerText = d.heading;
  document.getElementById("sub").innerText = d.sub;
  document.getElementById("cropL").innerText = d.cropL;
  document.getElementById("priceL").innerText = d.priceL;
  document.getElementById("highL").innerText = d.highL;
  document.getElementById("lowL").innerText = d.lowL;
  document.getElementById("avgL").innerText = d.avgL;
  document.getElementById("updateMsg").innerText = d.updateMsg;
  
  loadCrops(lang);
  document.getElementById("priceBox").classList.add("hidden");
}

function getPrice() {
  const crop = document.getElementById("crop").value;
  
  if (!crop) {
    document.getElementById("priceBox").classList.add("hidden");
    return;
  }
  
  const prices = MARKET_PRICES[crop];
  
  if (prices) {
    document.getElementById("currentPrice").innerText = "₹ " + prices.current + "/quintal";
    document.getElementById("highPrice").innerText = "₹ " + prices.high;
    document.getElementById("lowPrice").innerText = "₹ " + prices.low;
    document.getElementById("avgPrice").innerText = "₹ " + prices.avg;
    
    document.getElementById("priceBox").classList.remove("hidden");
  }
}

changeLang();
