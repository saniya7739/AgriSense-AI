/* 🌦 Weather Advice System with Multilingual Support */

const WEATHER_DATA = {
  hi: {
    heading: "🌦 मौसम सलाह",
    sub: "अपने खेत के लिए मौसम की जानकारी प्राप्त करें",
    locL: "📍 अपना जिला चुनें",
    btn: "🌤 मौसम जानकारी प्राप्त करें",
    adviceTitle: "💡 खेती की सलाह",
    noDataMsg: "कृपया पहले एक जिला चुनें",
    back: "वापस",
    temp: "तापमान",
    humidity: "नमी",
    wind: "हवा की गति",
    rain: "वर्षा की संभावना",
    districts: [
      "राजस्थान - आगरा",
      "राजस्थान - अलवर",
      "राजस्थान - बीकानेर",
      "राजस्थान - जयपुर",
      "उत्तर प्रदेश - बिजनौर",
      "उत्तर प्रदेश - मेरठ",
      "उत्तर प्रदेश - कानपुर",
      "महाराष्ट्र - अहमदनगर",
      "महाराष्ट्र - नासिक",
      "पंजाब - लुधियाना",
      "पंजाब - अमृतसर"
    ],
    advice: {
      hot: [
        "सिंचाई की आवृत्ति बढ़ाएं",
        "फसलों को सूरज से बचाएं",
        "मल्च का उपयोग करें",
        "सुबह-शाम पानी दें"
      ],
      cool: [
        "ठंड सहनशील फसलें लगाएं",
        "पाला से सावधान रहें",
        "कम सिंचाई करें",
        "जल निकासी सुनिश्चित करें"
      ],
      rainy: [
        "जल भराव से बचें",
        "कवकनाशी दवा का छिड़काव करें",
        "फसलों की निगरानी करें",
        "जल निकास चैनल साफ रखें"
      ],
      humid: [
        "बीमारियों से सावधान रहें",
        "हवा का प्रवाह बढ़ाएं",
        "दवा का नियमित छिड़काव करें",
        "पत्तियों को सूखा रखें"
      ],
      dry: [
        "नियमित सिंचाई करें",
        "जैव पदार्थ मिलाएं",
        "ड्रिप सिंचाई अपनाएं",
        "मल्चिंग जरूर करें"
      ]
    },
    warning: {
      extreme_heat: "अत्यधिक गर्मी! खेत में नमी बनाए रखें और फसलों को सूरज से बचाएं।",
      severe_frost: "कड़ा पाला! पाले से बचाव के उपाय करें।",
      heavy_rain: "भारी बारिश की आशंका! खेत से अतिरिक्त पानी निकालें।",
      high_humidity: "उच्च नमी! कवकीय रोगों का खतरा बढ़ गया है।"
    }
  },
  en: {
    heading: "🌦 Weather Advice",
    sub: "Get weather information for your farm",
    locL: "📍 Select your district",
    btn: "🌤 Get Weather Information",
    adviceTitle: "💡 Farming Tips",
    noDataMsg: "Please select a district first",
    back: "Back",
    temp: "Temperature",
    humidity: "Humidity",
    wind: "Wind Speed",
    rain: "Rainfall",
    districts: [
      "Rajasthan - Agra",
      "Rajasthan - Alwar",
      "Rajasthan - Bikaner",
      "Rajasthan - Jaipur",
      "Uttar Pradesh - Bijnor",
      "Uttar Pradesh - Meerut",
      "Uttar Pradesh - Kanpur",
      "Maharashtra - Ahmednagar",
      "Maharashtra - Nashik",
      "Punjab - Ludhiana",
      "Punjab - Amritsar"
    ],
    advice: {
      hot: [
        "Increase irrigation frequency",
        "Protect crops from excessive sun",
        "Use mulching",
        "Water in early morning and evening"
      ],
      cool: [
        "Plant cold-tolerant crops",
        "Beware of frost",
        "Reduce watering",
        "Ensure proper drainage"
      ],
      rainy: [
        "Avoid waterlogging",
        "Apply fungicide spray",
        "Monitor crops closely",
        "Keep drainage channels clean"
      ],
      humid: [
        "Beware of diseases",
        "Improve air circulation",
        "Apply regular fungicide",
        "Keep leaves dry"
      ],
      dry: [
        "Maintain regular irrigation",
        "Add organic matter",
        "Use drip irrigation",
        "Apply mulch"
      ]
    },
    warning: {
      extreme_heat: "Extreme heat! Keep soil moist and protect crops from sun.",
      severe_frost: "Severe frost warning! Take frost protection measures.",
      heavy_rain: "Heavy rain expected! Drain excess water from fields.",
      high_humidity: "High humidity! Risk of fungal diseases increased."
    }
  },
  bh: {
    heading: "🌦 मौसम सलाह",
    sub: "अपन खेत के लिए मौसम जानकारी ले",
    locL: "📍 अपन जिला चुने",
    btn: "🌤 मौसम जानकारी ले",
    adviceTitle: "💡 खेती की सलाह",
    noDataMsg: "पहले एक जिला चुन ले",
    back: "लौटिन",
    temp: "तापमान",
    humidity: "नमी",
    wind: "हवा की गति",
    rain: "बारिश",
    districts: [
      "राजस्थान - आगरा",
      "उत्तर प्रदेश - मेरठ",
      "उत्तर प्रदेश - बिहार",
      "महाराष्ट्र - पुणे"
    ],
    advice: {
      hot: [
        "पानी की मात्रा बढ़ाव",
        "धूप से रक्षा करव",
        "मल्च लगाव",
        "सुबह शाम पानी दें"
      ],
      cool: ["ठंड के फसल लगाव"],
      rainy: ["खेत से पानी निकाले"],
      humid: ["दवा का छिड़काव करव"],
      dry: ["नियमित सिंचाई करव"]
    },
    warning: {
      extreme_heat: "बहुत गर्मी! खेत में नमी रखव।",
      severe_frost: "कड़ी ठंड आवे वाली बा।",
      heavy_rain: "भारी बारिश आ सकती बा।",
      high_humidity: "नमी बहुत बड़ गई बा।"
    }
  },
  mr: {
    heading: "🌦 हवामान सल्ला",
    sub: "आपल्या शेतासाठी हवामान माहिती मिळवा",
    locL: "📍 आपलं जिल्हा निवडा",
    btn: "🌤 हवामान माहिती मिळवा",
    adviceTitle: "💡 शेती सल्ला",
    noDataMsg: "कृपया प्रथम जिल्हा निवडा",
    back: "परत",
    temp: "तापमान",
    humidity: "आर्द्रता",
    wind: "वाऱ्याचा वेग",
    rain: "पाऊस",
    districts: [
      "महाराष्ट्र - अहमदनगर",
      "महाराष्ट्र - नासिक",
      "महाराष्ट्र - पुणे"
    ],
    advice: {
      hot: ["पाणी वाढवा", "धूपातून संरक्षण करा"],
      cool: ["थंड सहन करणारी पिके लावा"],
      rainy: ["शेतातून पाणी काढा"],
      humid: ["बीजविषाणू फवारा करा"],
      dry: ["नियमित सिंचन करा"]
    },
    warning: {
      extreme_heat: "अत्यधिक उष्णता! माती ओलची ठेवा।",
      severe_frost: "कठोर दाट! संरक्षण उपाय करा।",
      heavy_rain: "मोठ्या पावसाची शक्यता।",
      high_humidity: "उच्च आर्द्रता! रोग विषाक्त धोका।"
    }
  },
  pa: {
    heading: "🌦 ਮੌਸਮ ਸਲਾਹ",
    sub: "ਆਪਣੀ ਖੇਤ ਲਈ ਮੌਸਮ ਜਾਣਕਾਰੀ ਪ੍ਰਾਪਤ ਕਰੋ",
    locL: "📍 ਆਪਨਾ ਜ਼ਿਲ੍ਹਾ ਚੁਣੋ",
    btn: "🌤 ਮੌਸਮ ਜਾਣਕਾਰੀ ਪ੍ਰਾਪਤ ਕਰੋ",
    adviceTitle: "💡 ਖੇਤੀ ਸੁਝ",
    noDataMsg: "ਕਿਰਪਾ ਕਰ ਕੇ ਪਹਿਲਾਂ ਇੱਕ ਜ਼ਿਲ੍ਹਾ ਚੁਣੋ",
    back: "ਵਾਪਸ",
    temp: "ਤਾਪਮਾਨ",
    humidity: "ਨਮੀ",
    wind: "ਹਵਾ ਦੀ ਗਤੀ",
    rain: "ਮੀਂਹ",
    districts: [
      "Punjab - Ludhiana",
      "Punjab - Amritsar",
      "Punjab - Jalandhar"
    ],
    advice: {
      hot: ["ਸਿੰਚਾਈ ਵਧਾਓ", "ਧੂਪ ਤੋਂ ਬਚਾਓ"],
      cool: ["ਠੰਡ ਸਹਨਸ਼ੀਲ ਫਸਲਾਂ"],
      rainy: ["ਜ਼ਮੀਨ ਤੋਂ ਪਾਣੀ ਕੱਢੋ"],
      humid: ["ਰੋਗ ਨਾਸ਼ਕ ਦਵਾਈ ਛਿੜਕੋ"],
      dry: ["ਨਿਯਮਿਤ ਸਿੰਚਾਈ"]
    },
    warning: {
      extreme_heat: "ਬਹੁਤ ਗਰਮ! ਜ਼ਮੀਨ ਨਮ ਰੱਖੋ।",
      severe_frost: "ਸਖ਼ਤ ਠੰਢ! ਸੁਰੱਖਿਆ ਦੇ ਕਦਮ ਚੁੱਕੋ।",
      heavy_rain: "ਭਾਰੀ ਮੀਂਹ ਦੀ ਸੰਭਾਵਨਾ।",
      high_humidity: "ਉੱਚ ਨਮੀ! ਬਿਮਾਰੀ ਦਾ ਖ਼ਤਰਾ।"
    }
  }
};

/* 🌍 Weather Simulation Data by District */
const DISTRICT_WEATHER = {
  "Agra": { temp: 32, humidity: 55, wind: 12, rain: 20 },
  "Alwar": { temp: 30, humidity: 50, wind: 10, rain: 15 },
  "Bikaner": { temp: 38, humidity: 35, wind: 18, rain: 5 },
  "Jaipur": { temp: 31, humidity: 48, wind: 11, rain: 18 },
  "Bijnor": { temp: 28, humidity: 65, wind: 8, rain: 35 },
  "Meerut": { temp: 27, humidity: 62, wind: 9, rain: 38 },
  "Kanpur": { temp: 29, humidity: 60, wind: 10, rain: 32 },
  "Ahmednagar": { temp: 33, humidity: 52, wind: 12, rain: 25 },
  "Nashik": { temp: 28, humidity: 58, wind: 10, rain: 40 },
  "Ludhiana": { temp: 24, humidity: 68, wind: 7, rain: 45 },
  "Amritsar": { temp: 23, humidity: 70, wind: 8, rain: 48 }
};

function loadDistricts(lang) {
  const locations = document.getElementById("location");
  locations.innerHTML = "<option value=''>Select District</option>";

  const canonicalDistricts = Object.keys(DISTRICT_WEATHER);
  const localizedDistricts = WEATHER_DATA[lang].districts || [];
  const fallbackDistricts = WEATHER_DATA.en.districts || [];

  canonicalDistricts.forEach((districtName, idx) => {
    const option = document.createElement("option");
    option.value = districtName;
    option.textContent = localizedDistricts[idx] || fallbackDistricts[idx] || districtName;
    locations.appendChild(option);
  });
}

function changeLang() {
  const langSelect = document.getElementById("lang");
  const lang = langSelect.value;
  const data = WEATHER_DATA[lang];
  
  document.getElementById("heading").innerText = data.heading;
  document.getElementById("sub").innerText = data.sub;
  document.getElementById("locL").innerText = data.locL;
  document.getElementById("btn").innerText = data.btn;
  document.getElementById("adviceTitle").innerText = data.adviceTitle;
  document.getElementById("noDataMsg").innerText = data.noDataMsg;
  document.getElementById("backBtn").innerText = `← ${data.back}`;
  
  loadDistricts(lang);
  document.getElementById("weatherResult").classList.add("hidden");
  document.getElementById("noData").classList.add("hidden");
}

function getWeather() {
  const lang = document.getElementById("lang").value;
  const location = document.getElementById("location").value;
  
  if (!location) {
    document.getElementById("noData").classList.remove("hidden");
    document.getElementById("weatherResult").classList.add("hidden");
    return;
  }
  
  const districtName = location;
  const weatherData = DISTRICT_WEATHER[districtName] ? { ...DISTRICT_WEATHER[districtName] } : {
    temp: 28,
    humidity: 55,
    wind: 10,
    rain: 25
  };
  
  // Add some variation
  const variation = (Math.random() - 0.5) * 6;
  weatherData.temp = Math.round(weatherData.temp + variation);
  
  const selectedOption = document.getElementById("location").selectedOptions[0];
  const displayLocation = selectedOption ? selectedOption.textContent : districtName;
  displayWeather(displayLocation, weatherData, lang);
}

function displayWeather(location, weather, lang) {
  const data = WEATHER_DATA[lang];
  document.getElementById("noData").classList.add("hidden");
  document.getElementById("weatherResult").classList.remove("hidden");
  
  // Display location name
  document.getElementById("locName").innerText = location;
  
  // Display weather info
  document.getElementById("tempDisplay").innerText = weather.temp + "°C";
  document.getElementById("humidityDisplay").innerText = weather.humidity + "%";
  document.getElementById("windDisplay").innerText = weather.wind + " km/h";
  document.getElementById("rainDisplay").innerText = weather.rain + "%";
  
  // Generate advice
  let adviceCategory = "hot";
  if (weather.temp < 10) adviceCategory = "cool";
  else if (weather.rain > 70) adviceCategory = "rainy";
  else if (weather.humidity > 75) adviceCategory = "humid";
  else if (weather.humidity < 30) adviceCategory = "dry";
  
  const adviceList = document.getElementById("adviceList");
  adviceList.innerHTML = "";
  
  const adviceItems = data.advice[adviceCategory] || data.advice.hot;
  adviceItems.forEach(advice => {
    const li = document.createElement("li");
    li.textContent = advice;
    adviceList.appendChild(li);
  });
  
  // Show warnings if needed
  const warningBox = document.getElementById("warning");
  const warningText = document.getElementById("warningText");
  
  warningBox.classList.add("hidden");
  
  if (weather.temp > 40) {
    warningBox.classList.remove("hidden");
    warningText.innerText = data.warning.extreme_heat;
  } else if (weather.temp < 5) {
    warningBox.classList.remove("hidden");
    warningText.innerText = data.warning.severe_frost;
  } else if (weather.rain > 80) {
    warningBox.classList.remove("hidden");
    warningText.innerText = data.warning.heavy_rain;
  } else if (weather.humidity > 85) {
    warningBox.classList.remove("hidden");
    warningText.innerText = data.warning.high_humidity;
  }
}

// Initialize
changeLang();
