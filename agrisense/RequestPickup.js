const PICKUP_TEXT = {
    hi: {
        title: "Crop Pickup Request",
        back: "वापस",
        farmerName: "Farmer Name",
        cropName: "Crop Name",
        quantity: "Quantity",
        unit: "Select Unit",
        state: "State",
        village: "Village",
        pincode: "Pincode (6 digits)",
        phone: "Phone Number",
        submit: "फसल भेजने का अनुरोध करें",
        fillAll: "कृपया सभी फ़ील्ड भरें!",
        positiveQty: "मात्रा सकारात्मक संख्या होनी चाहिए।",
        pincodeError: "पिनकोड 6 अंकों का होना चाहिए।",
        success: "पिकअप अनुरोध सफलतापूर्वक सबमिट हुआ! लॉजिस्टिक्स टीम आपसे संपर्क करेगी।"
    },
    en: {
        title: "Crop Pickup Request",
        back: "Back",
        farmerName: "Farmer Name",
        cropName: "Crop Name",
        quantity: "Quantity",
        unit: "Select Unit",
        state: "State",
        village: "Village",
        pincode: "Pincode (6 digits)",
        phone: "Phone Number",
        submit: "Request to send the grains.",
        fillAll: "Please fill all fields!",
        positiveQty: "Quantity must be a positive number.",
        pincodeError: "Pincode must be exactly 6 digits.",
        success: "Pickup request submitted successfully! Logistics team will contact you."
    },
    bh: {
        title: "फसल पिकअप अनुरोध",
        back: "वापसी",
        farmerName: "किसान के नाम",
        cropName: "फसल के नाम",
        quantity: "मात्रा",
        unit: "यूनिट चुनीं",
        state: "राज्य",
        village: "गाँव",
        pincode: "पिनकोड (6 अंक)",
        phone: "मोबाइल नंबर",
        submit: "फसल भेजे के अनुरोध करीं",
        fillAll: "कृपया सब फील्ड भरीं।",
        positiveQty: "मात्रा सकारात्मक नंबर होखे के चाहीं।",
        pincodeError: "पिनकोड 6 अंक के होखे के चाहीं।",
        success: "पिकअप अनुरोध सफलता से भेज दिहल गइल। लॉजिस्टिक्स टीम संपर्क करी।"
    },
    mr: {
        title: "पीक पिकअप विनंती",
        back: "मागे",
        farmerName: "शेतकरी नाव",
        cropName: "पीक नाव",
        quantity: "प्रमाण",
        unit: "युनिट निवडा",
        state: "राज्य",
        village: "गाव",
        pincode: "पिनकोड (6 अंक)",
        phone: "मोबाइल नंबर",
        submit: "धान्य पाठवण्याची विनंती करा",
        fillAll: "कृपया सर्व फील्ड भरा.",
        positiveQty: "प्रमाण धनात्मक संख्या असावी.",
        pincodeError: "पिनकोड 6 अंकी असावा.",
        success: "पिकअप विनंती यशस्वीरित्या सबमिट झाली. लॉजिस्टिक्स टीम संपर्क करेल."
    },
    pa: {
        title: "ਫਸਲ ਪਿਕਅੱਪ ਬੇਨਤੀ",
        back: "ਵਾਪਸ",
        farmerName: "ਕਿਸਾਨ ਦਾ ਨਾਮ",
        cropName: "ਫਸਲ ਦਾ ਨਾਮ",
        quantity: "ਮਾਤਰਾ",
        unit: "ਯੂਨਿਟ ਚੁਣੋ",
        state: "ਰਾਜ",
        village: "ਪਿੰਡ",
        pincode: "ਪਿੰਨਕੋਡ (6 ਅੰਕ)",
        phone: "ਫੋਨ ਨੰਬਰ",
        submit: "ਫਸਲ ਭੇਜਣ ਦੀ ਬੇਨਤੀ ਕਰੋ",
        fillAll: "ਕਿਰਪਾ ਕਰਕੇ ਸਾਰੇ ਫੀਲਡ ਭਰੋ।",
        positiveQty: "ਮਾਤਰਾ ਸਕਾਰਾਤਮਕ ਅੰਕ ਹੋਣੀ ਚਾਹੀਦੀ ਹੈ।",
        pincodeError: "ਪਿੰਨਕੋਡ 6 ਅੰਕਾਂ ਦਾ ਹੋਣਾ ਚਾਹੀਦਾ ਹੈ।",
        success: "ਪਿਕਅੱਪ ਬੇਨਤੀ ਸਫਲਤਾਪੂਰਵਕ ਭੇਜ ਦਿੱਤੀ ਗਈ ਹੈ। ਲੌਜਿਸਟਿਕਸ ਟੀਮ ਸੰਪਰਕ ਕਰੇਗੀ।"
    }
};

function getLang() {
    const langEl = document.getElementById("lang");
    return (langEl && PICKUP_TEXT[langEl.value]) ? langEl.value : "hi";
}

function changeLang() {
    const lang = getLang();
    const t = PICKUP_TEXT[lang];

    document.getElementById("pageTitle").innerText = t.title;
    document.getElementById("backBtn").innerText = t.back;
    document.getElementById("farmerName").placeholder = t.farmerName;
    document.getElementById("cropName").placeholder = t.cropName;
    document.getElementById("quantity").placeholder = t.quantity;
    document.getElementById("state").placeholder = t.state;
    document.getElementById("village").placeholder = t.village;
    document.getElementById("pincode").placeholder = t.pincode;
    document.getElementById("phone").placeholder = t.phone;
    document.getElementById("submitBtn").innerText = t.submit;
    document.querySelector("#quantityUnit option[value='']").innerText = t.unit;
}

function submitPickup() {
    const lang = getLang();
    const t = PICKUP_TEXT[lang];

    const name = document.getElementById("farmerName").value.trim();
    const crop = document.getElementById("cropName").value.trim();
    const quantityRaw = document.getElementById("quantity").value;
    const quantityUnit = document.getElementById("quantityUnit").value;
    const state = document.getElementById("state").value.trim();
    const village = document.getElementById("village").value.trim();
    const pincode = document.getElementById("pincode").value.trim();
    const phone = document.getElementById("phone").value.trim();

    if (!name || !crop || !quantityRaw || !quantityUnit || !state || !village || !pincode || !phone) {
        alert(t.fillAll);
        return;
    }

    const quantity = Number(quantityRaw);
    if (!Number.isFinite(quantity) || quantity <= 0) {
        alert(t.positiveQty);
        return;
    }

    if (!/^\d{6}$/.test(pincode)) {
        alert(t.pincodeError);
        return;
    }

    const pickupRequests = JSON.parse(localStorage.getItem("pickupRequests")) || [];
    const newRequest = {
        farmerName: name,
        crop: crop,
        quantity: quantity,
        quantityUnit: quantityUnit,
        state: state,
        village: village,
        pincode: pincode,
        phone: phone,
        date: new Date().toLocaleString()
    };

    pickupRequests.push(newRequest);
    localStorage.setItem("pickupRequests", JSON.stringify(pickupRequests));

    document.getElementById("message").innerText = t.success;
    document.querySelectorAll("input").forEach((input) => {
        input.value = "";
    });
    document.getElementById("quantityUnit").value = "";
}

document.addEventListener("DOMContentLoaded", function () {
    changeLang();
});
