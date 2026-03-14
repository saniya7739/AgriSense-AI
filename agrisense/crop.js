// Crop recommendation system using LanguageConfig
const CROP_KEY_MAP = {
  Rice: "rice",
  Cotton: "cotton",
  Sugarcane: "sugarcane",
  Soybean: "soybean",
  Maize: "maize",
  Millet: "millet",
  Wheat: "wheat",
  Chickpea: "chickpea",
  Mustard: "mustard",
  Vegetables: "vegetables",
  Fodder: "fodder",
  Pulses: "pulses",
  Barley: "barley",
  Gram: "gram",
  Bajra: "bajra",
  Groundnut: "groundnut",
  Watermelon: "watermelon",
  Onion: "onion",
  Tomato: "tomato"
};

const CROP_RULES = {
  "Black Soil": {
    Kharif: { High: ["Rice", "Cotton", "Sugarcane"], Medium: ["Soybean", "Maize"], Low: ["Millet"] },
    Rabi: { Medium: ["Wheat", "Chickpea"], Low: ["Mustard"] },
    Zaid: { High: ["Vegetables"], Medium: ["Fodder"] }
  },
  "Loamy Soil": {
    Kharif: { High: ["Rice", "Maize"], Medium: ["Pulses"], Low: ["Millet"] },
    Rabi: { Medium: ["Wheat", "Barley"], Low: ["Gram"] },
    Zaid: { Medium: ["Vegetables"] }
  },
  "Sandy Soil": {
    Kharif: { Medium: ["Bajra", "Groundnut"], Low: ["Millet"] },
    Rabi: { Low: ["Mustard", "Gram"] },
    Zaid: { Medium: ["Watermelon"] }
  }
};

function loadOptions() {
  const soil = document.getElementById("soil");
  const season = document.getElementById("season");
  const water = document.getElementById("water");

  soil.innerHTML = "";
  season.innerHTML = "";
  water.innerHTML = "";

  // Use LanguageConfig for translations
  soil.innerHTML += `<option>${LanguageConfig.t('crop.soil.black')}</option>`;
  soil.innerHTML += `<option>${LanguageConfig.t('crop.soil.loamy')}</option>`;
  soil.innerHTML += `<option>${LanguageConfig.t('crop.soil.sandy')}</option>`;

  season.innerHTML += `<option>${LanguageConfig.t('crop.season.kharif')}</option>`;
  season.innerHTML += `<option>${LanguageConfig.t('crop.season.rabi')}</option>`;
  season.innerHTML += `<option>${LanguageConfig.t('crop.season.zaid')}</option>`;

  water.innerHTML += `<option>${LanguageConfig.t('crop.water.low')}</option>`;
  water.innerHTML += `<option>${LanguageConfig.t('crop.water.medium')}</option>`;
  water.innerHTML += `<option>${LanguageConfig.t('crop.water.high')}</option>`;
}

function normalizeSoil(value) {
  if (["काली मिट्टी", "काली माटी", "काळी माती", "ਕਾਲੀ ਮਿੱਟੀ", "Black Soil"].includes(value)) {
    return "Black Soil";
  }
  if (["दोमट मिट्टी", "दोमट माटी", "दोमट माती", "ਦੋਮਟ ਮਿੱਟੀ", "Loamy Soil"].includes(value)) {
    return "Loamy Soil";
  }
  return "Sandy Soil";
}

function normalizeSeason(value) {
  if (["खरीफ", "खरीप", "ਖਰੀਫ", "Kharif"].includes(value)) {
    return "Kharif";
  }
  if (["रबी", "रब्बी", "ਰੱਬੀ", "Rabi"].includes(value)) {
    return "Rabi";
  }
  return "Zaid";
}

function normalizeWater(value) {
  if (["अधिक", "ज्यादा", "जास्त", "ਵੱਧ", "High"].includes(value)) {
    return "High";
  }
  if (["मध्यम", "ਦਰਮਿਆਨਾ", "Medium"].includes(value)) {
    return "Medium";
  }
  return "Low";
}

function translateCropName(crop, lang) {
  const key = CROP_KEY_MAP[crop] || crop.toLowerCase();
  return CROP_NAMES[key]?.[lang] || CROP_NAMES[key]?.en || crop;
}

function recommend() {
  const l = document.getElementById("lang").value;
  const soilVal = normalizeSoil(document.getElementById("soil").value);
  const seasonVal = normalizeSeason(document.getElementById("season").value);
  const waterVal = normalizeWater(document.getElementById("water").value);
  const result = document.getElementById("result");
  const crops = CROP_RULES[soilVal]?.[seasonVal]?.[waterVal];

  if (!crops) {
    result.innerText = DATA[l].noData;
    return;
  }

  const translatedCrops = crops.map((crop) => translateCropName(crop, l));
  result.innerText = DATA[l].result + translatedCrops.join(", ");
}

changeLang();
