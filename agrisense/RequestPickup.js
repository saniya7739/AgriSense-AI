const PICKUP_TEXT = {
    hi: {
        title: "Crop Pickup Request",
        back: "Wapas",
        farmerName: "Farmer Name",
        cropName: "Crop Name",
        quantity: "Quantity",
        unit: "Select Unit",
        state: "State",
        village: "Village",
        pincode: "Pincode (6 digits)",
        phone: "Phone Number",
        submit: "एग्रीसेंस वेबसाइट फीचर में अनाज भेजने का अनुरोध करें।",
        fillAll: "Please fill all fields!",
        positiveQty: "Quantity must be a positive number.",
        pincodeError: "Pincode must be exactly 6 digits.",
        success: "Pickup request submitted successfully! Logistics team will contact you."
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
        title: "Crop Pickup Request",
        back: "Lautin",
        farmerName: "Kisan Naam",
        cropName: "Fasal Naam",
        quantity: "Matra",
        unit: "Unit Chunain",
        state: "Rajya",
        village: "Gaon",
        pincode: "Pincode (6 ank)",
        phone: "Mobile Number",
        submit: "एग्रीसेंस वेबसाइट फीचर में अनाज भेजे के निहोरा करीं।",
        fillAll: "Kripya sab field bhari.",
        positiveQty: "Matra positive number hona chahi.",
        pincodeError: "Pincode 6 ank ka hona chahi.",
        success: "Pickup request safalta se bhej diya gaya."
    },
    mr: {
        title: "Crop Pickup Request",
        back: "Parat",
        farmerName: "Shetkari Nav",
        cropName: "Pik Nav",
        quantity: "Praman",
        unit: "Unit Nivad",
        state: "Rajya",
        village: "Gaav",
        pincode: "Pincode (6 anki)",
        phone: "Mobile Number",
        submit: "अ‍ॅग्रीसेन्स संकेतस्थळ फीचरमध्ये धान्य पाठविण्याची विनंती.",
        fillAll: "Kripaya sarv fields bhara.",
        positiveQty: "Praman positive number asne avashyak aahe.",
        pincodeError: "Pincode 6 anki asava.",
        success: "Pickup request yashasvi pane submit jhala."
    },
    pa: {
        title: "Crop Pickup Request",
        back: "Wapas",
        farmerName: "Kisan Naam",
        cropName: "Fasal Naam",
        quantity: "Matra",
        unit: "Unit Chuno",
        state: "Rajya",
        village: "Pind",
        pincode: "Pincode (6 ank)",
        phone: "Phone Number",
        submit: "ਐਗਰੀਸੈਂਸ ਵੈੱਬਸਾਈਟ ਫੀਚਰ ਵਿੱਚ ਅਨਾਜ ਭੇਜਣ ਦੀ ਬੇਨਤੀ ਕਰੋ।",
        fillAll: "Kirpa karke saare field bharo.",
        positiveQty: "Quantity positive number honi chahidi hai.",
        pincodeError: "Pincode 6 ank da hona chahida hai.",
        success: "Pickup request safalta naal bheji gayi."
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
