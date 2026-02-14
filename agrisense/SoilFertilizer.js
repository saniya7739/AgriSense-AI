const DATA = {
  hi: {
    heading: "🧪 मिट्टी एवं उर्वरक",
    sub: "अपनी मिट्टी के अनुसार उर्वरक जानें",
    soilL: "🌍 मिट्टी का प्रकार",
    cropL: "🌾 फसल का नाम",
    btn: "📊 सुझाव प्राप्त करें",
    fertL: "🥗 आवश्यक पोषक तत्व",
    doseL: "💊 खुराक (प्रति हेक्टेयर)",
    soils: ["काली मिट्टी", "दोमट मिट्टी", "रेतीली मिट्टी", "मटियार मिट्टी"],
    crops: ["गेहूं", "धान", "मक्का", "कपास", "सोयाबीन"]
  },
  en: {
    heading: "🧪 Soil & Fertilizer",
    sub: "Know fertilizer based on your soil type",
    soilL: "🌍 Soil Type",
    cropL: "🌾 Crop Name",
    btn: "📊 Get Recommendation",
    fertL: "🥗 Required Nutrients",
    doseL: "💊 Dose (per hectare)",
    soils: ["Black Soil", "Loamy Soil", "Sandy Soil", "Clayey Soil"],
    crops: ["Wheat", "Rice", "Maize", "Cotton", "Soybean"]
  },
  bh: {
    heading: "🧪 माटी अउ खाद",
    sub: "अपन माटी के हिसाब से खाद जानव",
    soilL: "🌍 माटी का प्रकार",
    cropL: "🌾 फसल का नाम",
    btn: "📊 सुझाव पाव",
    fertL: "🥗 आवश्यक खाद",
    doseL: "💊 मात्रा",
    soils: ["काली माटी", "दोमट माटी", "रेती माटी"],
    crops: ["गेहूं", "धान", "मक्का"]
  },
  mr: {
    heading: "🧪 माती व खत",
    sub: "आपल्या माती प्रकारानुसार खत जाणा",
    soilL: "🌍 माती प्रकार",
    cropL: "🌾 शेती नाव",
    btn: "📊 सल्ला मिळवा",
    fertL: "🥗 आवश्यक पोषक",
    doseL: "💊 मात्रा",
    soils: ["काळी माती", "दोमट माती", "वाळूची माती"],
    crops: ["गहू", "भात", "मक्का"]
  },
  pa: {
    heading: "🧪 ਮਿੱਟੀ ਤੇ ਖਾਦ",
    sub: "ਆਪਣੀ ਮਿੱਟੀ ਦੇ ਅਨੁਸਾਰ ਖਾਦ ਜਾਣੋ",
    soilL: "🌍 ਮਿੱਟੀ ਕਿਸਮ",
    cropL: "🌾 ਫਸਲ ਨਾਮ",
    btn: "📊 ਸਲਾਹ ਪਾਓ",
    fertL: "🥗 ਜ਼ਰੂਰੀ ਖਾਦ",
    doseL: "💊 ਖੁਰਾਕ",
    soils: ["ਕਾਲੀ ਮਿੱਟੀ", "ਦੋਮਟ ਮਿੱਟੀ", "ਰੇਤੀਲੀ ਮਿੱਟੀ"],
    crops: ["ਕਣਕ", "ਚਾਵਲ", "ਮੱਕੀ"]
  }
};

const SOIL_FERTILIZER = {
  "Black Soil": {
    "Wheat": { nutrients: ["Nitrogen: 120 kg/ha", "Phosphorus: 60 kg/ha", "Potassium: 40 kg/ha"], fertilizer: "DAP 100kg + Urea 250kg" },
    "Rice": { nutrients: ["Nitrogen: 100 kg/ha", "Phosphorus: 50 kg/ha", "Potassium: 40 kg/ha"], fertilizer: "DAP 80kg + Urea 200kg" },
    "Maize": { nutrients: ["Nitrogen: 150 kg/ha", "Phosphorus: 60 kg/ha", "Potassium: 40 kg/ha"], fertilizer: "DAP 120kg + Urea 300kg" },
    "Cotton": { nutrients: ["Nitrogen: 120 kg/ha", "Phosphorus: 40 kg/ha", "Potassium: 40 kg/ha"], fertilizer: "DAP 80kg + Urea 250kg" },
    "Soybean": { nutrients: ["Nitrogen: 20 kg/ha", "Phosphorus: 60 kg/ha", "Potassium: 40 kg/ha"], fertilizer: "DAP 100kg" }
  },
  "Loamy Soil": {
    "Wheat": { nutrients: ["Nitrogen: 100 kg/ha", "Phosphorus: 80 kg/ha", "Potassium: 50 kg/ha"], fertilizer: "DAP 120kg + Urea 200kg" },
    "Rice": { nutrients: ["Nitrogen: 80 kg/ha", "Phosphorus: 60 kg/ha", "Potassium: 50 kg/ha"], fertilizer: "DAP 100kg + Urea 180kg" },
    "Maize": { nutrients: ["Nitrogen: 120 kg/ha", "Phosphorus: 80 kg/ha", "Potassium: 50 kg/ha"], fertilizer: "DAP 140kg + Urea 250kg" },
    "Cotton": { nutrients: ["Nitrogen: 100 kg/ha", "Phosphorus: 60 kg/ha", "Potassium: 50 kg/ha"], fertilizer: "DAP 100kg + Urea 200kg" },
    "Soybean": { nutrients: ["Nitrogen: 0 kg/ha", "Phosphorus: 80 kg/ha", "Potassium: 50 kg/ha"], fertilizer: "DAP 120kg" }
  },
  "Sandy Soil": {
    "Wheat": { nutrients: ["Nitrogen: 140 kg/ha", "Phosphorus: 80 kg/ha", "Potassium: 60 kg/ha"], fertilizer: "DAP 140kg + Urea 300kg + MOP 50kg" },
    "Rice": { nutrients: ["Nitrogen: 120 kg/ha", "Phosphorus: 70 kg/ha", "Potassium: 60 kg/ha"], fertilizer: "DAP 120kg + Urea 250kg" },
    "Maize": { nutrients: ["Nitrogen: 160 kg/ha", "Phosphorus: 80 kg/ha", "Potassium: 60 kg/ha"], fertilizer: "DAP 140kg + Urea 350kg + MOP 50kg" },
    "Cotton": { nutrients: ["Nitrogen: 140 kg/ha", "Phosphorus: 70 kg/ha", "Potassium: 60 kg/ha"], fertilizer: "DAP 120kg + Urea 280kg" },
    "Soybean": { nutrients: ["Nitrogen: 40 kg/ha", "Phosphorus: 80 kg/ha", "Potassium: 60 kg/ha"], fertilizer: "DAP 120kg + MOP 50kg" }
  },
  "Clayey Soil": {
    "Wheat": { nutrients: ["Nitrogen: 110 kg/ha", "Phosphorus: 70 kg/ha", "Potassium: 50 kg/ha"], fertilizer: "DAP 100kg + Urea 220kg" },
    "Rice": { nutrients: ["Nitrogen: 90 kg/ha", "Phosphorus: 60 kg/ha", "Potassium: 50 kg/ha"], fertilizer: "DAP 90kg + Urea 200kg" },
    "Maize": { nutrients: ["Nitrogen: 130 kg/ha", "Phosphorus: 70 kg/ha", "Potassium: 50 kg/ha"], fertilizer: "DAP 120kg + Urea 280kg" },
    "Cotton": { nutrients: ["Nitrogen: 110 kg/ha", "Phosphorus: 50 kg/ha", "Potassium: 50 kg/ha"], fertilizer: "DAP 90kg + Urea 230kg" },
    "Soybean": { nutrients: ["Nitrogen: 30 kg/ha", "Phosphorus: 70 kg/ha", "Potassium: 50 kg/ha"], fertilizer: "DAP 110kg" }
  }
};

function loadOptions(lang) {
  const d = DATA[lang];
  const soilType = document.getElementById("soilType");
  const crop = document.getElementById("crop");
  
  soilType.innerHTML = "";
  crop.innerHTML = "";
  
  d.soils.forEach(s => {
    const opt = document.createElement("option");
    opt.value = s;
    opt.textContent = s;
    soilType.appendChild(opt);
  });
  
  d.crops.forEach(c => {
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
  document.getElementById("soilL").innerText = d.soilL;
  document.getElementById("cropL").innerText = d.cropL;
  document.getElementById("btn").innerText = d.btn;
  document.getElementById("fertL").innerText = d.fertL;
  document.getElementById("doseL").innerText = d.doseL;
  
  loadOptions(lang);
  document.getElementById("resultBox").classList.add("hidden");
}

function updateSoilInfo() {
  updateFertilizer();
}

function updateFertilizer() {
  // Dynamic update when selections change
}

function getRecommendation() {
  const soil = document.getElementById("soilType").value;
  const crop = document.getElementById("crop").value;
  const lang = document.getElementById("lang").value;
  
  if (!soil || !crop) return;
  
  const soilData = SOIL_FERTILIZER[soil];
  if (!soilData || !soilData[crop]) {
    alert(lang === "en" ? "No data available" : "कोई डेटा उपलब्ध नहीं");
    return;
  }
  
  const data = soilData[crop];
  document.getElementById("resultBox").classList.remove("hidden");
  document.getElementById("resTitle").innerText = `${crop} (${soil})`;
  
  const fertList = document.getElementById("fertList");
  fertList.innerHTML = "";
  data.nutrients.forEach(n => {
    const li = document.createElement("li");
    li.textContent = n;
    fertList.appendChild(li);
  });
  
  document.getElementById("doseInfo").innerHTML = `<p><strong>${data.fertilizer}</strong></p>`;
}

changeLang();
