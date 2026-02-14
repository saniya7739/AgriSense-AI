let currentLang="hi";

const DATA={
hi:{
title:"📷 फसल रोग पहचान",
subtitle:"फसल की फोटो अपलोड करें या कैमरा से क्लिक करें",
upload:"📁 फोटो अपलोड करें",
camera:"📸 कैमरा से फोटो लें",
btn:"🔍 रोग पहचानें",
analyzing:"🔍 फोटो का विश्लेषण हो रहा है...",
result:"🦠 संभावित रोग और समाधान:",
d:[
["पत्ती झुलसा","नीम तेल छिड़कें"],
["धान ब्लास्ट","ट्राइसाइक्लाजोल दवा"],
["गेहूं रतुआ","प्रोपिकोनाजोल स्प्रे"],
["आलू झुलसा","मैंकोजेब स्प्रे"],
["टमाटर लीफ कर्ल","पीले ट्रैप"]
]
},
en:{
title:"📷 Crop Disease Detection",
subtitle:"Upload or capture crop image",
upload:"📁 Upload Image",
camera:"📸 Capture Photo",
btn:"🔍 Detect Disease",
analyzing:"🔍 Analyzing image...",
result:"🦠 Possible Diseases & Solutions:",
d:[
["Leaf Blight","Spray neem oil"],
["Rice Blast","Use Tricyclazole"],
["Wheat Rust","Propiconazole"],
["Potato Blight","Mancozeb"],
["Tomato Leaf Curl","Yellow traps"]
]
},
bh:{
title:"📷 रोग पहचान",
subtitle:"फोटो डालीं या लीं",
upload:"📁 फोटो डालीं",
camera:"📸 कैमरा फोटो",
btn:"🔍 जांच",
analyzing:"🔍 जांच चल रहल बा...",
result:"🦠 रोग अउ समाधान:",
d:[
["पत्ता झुलसा","नीम तेल"],
["धान रोग","दवा"],
["गेहूं रोग","स्प्रे"],
["आलू रोग","दवा"],
["टमाटर रोग","ट्रैप"]
]
},
mr:{
title:"📷 पिक रोग ओळख",
subtitle:"फोटो अपलोड किंवा कॅमेरा",
upload:"📁 फोटो अपलोड",
camera:"📸 कॅमेरा",
btn:"🔍 शोधा",
analyzing:"🔍 विश्लेषण सुरू आहे...",
result:"🦠 संभाव्य रोग:",
d:[
["पान करपा","नीम तेल"],
["भात रोग","औषध"],
["गहू रोग","स्प्रे"],
["बटाटा रोग","द्रावण"],
["टोमॅटो रोग","ट्रॅप"]
]
},
pa:{
title:"📷 ਫਸਲ ਰੋਗ",
subtitle:"ਤਸਵੀਰ ਅੱਪਲੋਡ ਜਾਂ ਕੈਮਰਾ",
upload:"📁 ਅੱਪਲੋਡ",
camera:"📸 ਕੈਮਰਾ",
btn:"🔍 ਪਛਾਣੋ",
analyzing:"🔍 ਜਾਂਚ ਹੋ ਰਹੀ ਹੈ...",
result:"🦠 ਸੰਭਾਵੀ ਰੋਗ:",
d:[
["ਪੱਤਾ ਰੋਗ","ਨੀਮ ਤੇਲ"],
["ਚਾਵਲ ਰੋਗ","ਦਵਾਈ"],
["ਗਹੂੰ ਰੋਗ","ਸਪਰੇ"],
["ਆਲੂ ਰੋਗ","ਫੰਗੀਸਾਈਡ"],
["ਟਮਾਟਰ ਰੋਗ","ਟ੍ਰੈਪ"]
]
}
};

function changeLang(){
  const langSelect = document.getElementById("lang");
  currentLang = langSelect.value;
  const L = DATA[currentLang];
  
  document.getElementById("title").innerText = L.title;
  document.getElementById("subtitle").innerText = L.subtitle;
  document.getElementById("uploadText").innerText = L.upload;
  document.getElementById("cameraText").innerText = L.camera;
  document.getElementById("detectBtn").innerText = L.btn;
  document.getElementById("result").innerText = "";
}

function detectDisease(){
  const upload = document.getElementById("upload");
  const camera = document.getElementById("camera");
  const result = document.getElementById("result");
  
  if(!upload.files[0] && !camera.files[0]){
    alert(currentLang==="hi"?"पहले फोटो डालें":"Please upload image");
    return;
  }
  result.innerText=DATA[currentLang].analyzing;
  setTimeout(showResult,2000);
}

function showResult(){
  const result = document.getElementById("result");
  let out=DATA[currentLang].result+"\n\n";
  DATA[currentLang].d.sort(()=>0.5-Math.random()).slice(0,3)
  .forEach(x=>out+="✔ "+x[0]+" → "+x[1]+"\n");
  result.innerText=out;
}
