const DATA = {
  hi:{
    heading:"🌱 फसल चयन",
    sub:"खेती की जानकारी भरें",
    soilL:"🌍 मिट्टी का प्रकार",
    seasonL:"🌦 मौसम",
    waterL:"💧 पानी उपलब्धता",
    btn:"🌾 फसल सुझाव",
    soil:["काली मिट्टी","दोमट मिट्टी","रेतीली मिट्टी"],
    season:["खरीफ","रबी","जायद"],
    water:["कम","मध्यम","अधिक"],
    result:"✅ सुझाई गई फसलें: ",
    back:"वापस"
  },
  en:{
    heading:"🌱 Crop Selection",
    sub:"Enter farming details",
    soilL:"🌍 Soil Type",
    seasonL:"🌦 Season",
    waterL:"💧 Water Availability",
    btn:"🌾 Recommend Crops",
    soil:["Black Soil","Loamy Soil","Sandy Soil"],
    season:["Kharif","Rabi","Zaid"],
    water:["Low","Medium","High"],
    result:"✅ Recommended Crops: ",
    back:"Back"
  },
  bh:{
    heading:"🌱 फसल चुने",
    sub:"खेती जानकारी भरीं",
    soilL:"🌍 माटी के प्रकार",
    seasonL:"🌦 मौसम",
    waterL:"💧 पानी उपलब्धता",
    btn:"🌾 फसल बताईं",
    soil:["काली माटी","दोमट माटी","रेती माटी"],
    season:["खरीफ","रबी","जायद"],
    water:["कम","मध्यम","ज्यादा"],
    result:"✅ सुझावल फसल: ",
    back:"लौटिन"
  },
  mr:{
    heading:"🌱 पीक निवड",
    sub:"शेती माहिती भरा",
    soilL:"🌍 मातीचा प्रकार",
    seasonL:"🌦 हंगाम",
    waterL:"💧 पाणी उपलब्धता",
    btn:"🌾 पीक सुचवा",
    soil:["काळी माती","दोमट माती","वाळूची माती"],
    season:["खरीप","रब्बी","जायद"],
    water:["कमी","मध्यम","जास्त"],
    result:"✅ शिफारस पिके: ",
    back:"परत"
  },
  pa:{
    heading:"🌱 ਫਸਲ ਚੋਣ",
    sub:"ਖੇਤੀ ਜਾਣਕਾਰੀ ਭਰੋ",
    soilL:"🌍 ਮਿੱਟੀ ਦੀ ਕਿਸਮ",
    seasonL:"🌦 ਮੌਸਮ",
    waterL:"💧 ਪਾਣੀ ਉਪਲਬਧਤਾ",
    btn:"🌾 ਫਸਲ ਸੁਝਾਅ",
    soil:["ਕਾਲੀ ਮਿੱਟੀ","ਦੋਮਟ ਮਿੱਟੀ","ਰੇਤੀਲੀ ਮਿੱਟੀ"],
    season:["ਖਰੀਫ","ਰੱਬੀ","ਜ਼ਾਇਦ"],
    water:["ਘੱਟ","ਦਰਮਿਆਨਾ","ਵੱਧ"],
    result:"✅ ਸਿਫਾਰਸ਼ੀ ਫਸਲਾਂ: ",
    back:"ਵਾਪਸ"
  }
};

/* 🌾 REAL CROP RULE ENGINE */
const CROP_RULES = {
  "Black Soil":{
    "Kharif":{"High":["Rice","Cotton","Sugarcane"],"Medium":["Soybean","Maize"],"Low":["Millet"]},
    "Rabi":{"Medium":["Wheat","Chickpea"],"Low":["Mustard"]},
    "Zaid":{"High":["Vegetables"],"Medium":["Fodder"]}
  },
  "Loamy Soil":{
    "Kharif":{"High":["Rice","Maize"],"Medium":["Pulses"],"Low":["Millet"]},
    "Rabi":{"Medium":["Wheat","Barley"],"Low":["Gram"]},
    "Zaid":{"Medium":["Vegetables"]}
  },
  "Sandy Soil":{
    "Kharif":{"Medium":["Bajra","Groundnut"],"Low":["Millet"]},
    "Rabi":{"Low":["Mustard","Gram"]},
    "Zaid":{"Medium":["Watermelon"]}
  }
};

function loadOptions(lang){
  const soil = document.getElementById("soil");
  const season = document.getElementById("season");
  const water = document.getElementById("water");
  
  soil.innerHTML="";
  season.innerHTML="";
  water.innerHTML="";
  DATA[lang].soil.forEach(v=>soil.innerHTML+=`<option>${v}</option>`);
  DATA[lang].season.forEach(v=>season.innerHTML+=`<option>${v}</option>`);
  DATA[lang].water.forEach(v=>water.innerHTML+=`<option>${v}</option>`);
}

function changeLang(){
  const lang = document.getElementById("lang");
  const l = lang.value;
  
  document.getElementById("heading").innerText = DATA[l].heading;
  document.getElementById("sub").innerText = DATA[l].sub;
  document.getElementById("soilL").innerText = DATA[l].soilL;
  document.getElementById("seasonL").innerText = DATA[l].seasonL;
  document.getElementById("waterL").innerText = DATA[l].waterL;
  document.getElementById("btn").innerText = DATA[l].btn;
  document.getElementById("backBtn").innerText = `← ${DATA[l].back}`;
  loadOptions(l);
  document.getElementById("result").innerText = "";
}

/* 🔍 REAL RECOMMENDATION */
function recommend(){
  const lang = document.getElementById("lang");
  const l = lang.value;
  const soil = document.getElementById("soil");
  const season = document.getElementById("season");
  const water = document.getElementById("water");
  const result = document.getElementById("result");

  const soilVal=soil.value.includes("काली")||soil.value.includes("Black")?"Black Soil":
                soil.value.includes("दोमट")||soil.value.includes("Loamy")?"Loamy Soil":"Sandy Soil";

  const seasonVal=season.value.includes("खरी")||season.value.includes("Khar")?"Kharif":
                  season.value.includes("रबी")||season.value.includes("Rab")?"Rabi":"Zaid";

  const waterVal=water.value.includes("अधिक")||water.value.includes("High")?"High":
                 water.value.includes("मध्यम")||water.value.includes("Medium")?"Medium":"Low";

  const crops=CROP_RULES[soilVal]?.[seasonVal]?.[waterVal];

  if(crops){
    result.innerText=DATA[l].result + crops.join(", ");
  }else{
    result.innerText="⚠️ इस संयोजन के लिए जानकारी उपलब्ध नहीं";
  }
}

changeLang();
