import { PICKUP_TEXT } from './RequestPickupTranslations.js';

function getLang() {
    return localStorage.getItem('selectedLanguage') || 'hi';
}

function setMessage(type, title, body, meta = "") {
    const message = document.getElementById("message");
    message.className = `message-box ${type === "success" ? "is-success" : "is-error"}`;
    message.innerHTML = `
        <span class="message-title">${title}</span>
        <div>${body}</div>
        ${meta ? `<div>${meta}</div>` : ""}
    `;
}

function clearMessage() {
    const message = document.getElementById("message");
    message.className = "message-box";
    message.innerHTML = "";
}

function changeLang() {
    const lang = getLang();
    const t = PICKUP_TEXT[lang];

    document.documentElement.lang = lang;
    document.getElementById("pageTitle").innerText = t.title;
    document.getElementById("pageSubtitle").innerText = t.subtitle;
    document.getElementById("progressText").innerText = t.progress;
    document.getElementById("backBtnText").innerText = t.back;
    document.getElementById("farmerNameLabel").innerText = t.farmerNameLabel;
    document.getElementById("cropNameLabel").innerText = t.cropNameLabel;
    document.getElementById("quantityLabel").innerText = t.quantityLabel;
    document.getElementById("unitLabel").innerText = t.unitLabel;
    document.getElementById("stateLabel").innerText = t.stateLabel;
    document.getElementById("villageLabel").innerText = t.villageLabel;
    document.getElementById("pincodeLabel").innerText = t.pincodeLabel;
    document.getElementById("phoneLabel").innerText = t.phoneLabel;
    document.getElementById("termsText").innerText = t.terms;
    document.getElementById("submitBtn").innerText = t.submit;
    document.getElementById("summaryBadge").innerText = t.summaryBadge;
    document.getElementById("summaryTitle").innerText = t.summaryTitle;
    document.getElementById("summaryStep1").innerText = t.summaryStep1;
    document.getElementById("summaryStep2").innerText = t.summaryStep2;
    document.getElementById("summaryStep3").innerText = t.summaryStep3;
    document.getElementById("tipsTitle").innerText = t.tipsTitle;
    document.getElementById("tipsBody").innerText = t.tipsBody;

    document.getElementById("farmerName").placeholder = t.farmerNamePlaceholder;
    document.getElementById("cropName").placeholder = t.cropNamePlaceholder;
    document.getElementById("quantity").placeholder = t.quantityPlaceholder;
    document.getElementById("state").placeholder = t.statePlaceholder;
    document.getElementById("village").placeholder = t.villagePlaceholder;
    document.getElementById("pincode").placeholder = t.pincodePlaceholder;
    document.getElementById("phone").placeholder = t.phonePlaceholder;
    document.querySelector("#quantityUnit option[value='']").innerText = t.unitPlaceholder;

}

// Listen for language change event
window.addEventListener('languageChanged', function(event) {
    changeLang();
});

function validatePickupForm(t) {
    const name = document.getElementById("farmerName").value.trim();
    const crop = document.getElementById("cropName").value.trim();
    const quantityRaw = document.getElementById("quantity").value.trim();
    const quantityUnit = document.getElementById("quantityUnit").value;
    const state = document.getElementById("state").value.trim();
    const village = document.getElementById("village").value.trim();
    const pincode = document.getElementById("pincode").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const termsAccepted = document.getElementById("terms").checked;

    if (!name || !crop || !quantityRaw || !quantityUnit || !state || !village || !pincode || !phone) {
        return { valid: false, message: t.fillAll };
    }

    const quantity = Number(quantityRaw);
    if (!Number.isFinite(quantity) || quantity <= 0) {
        return { valid: false, message: t.positiveQty };
    }

    if (!/^\d{6}$/.test(pincode)) {
        return { valid: false, message: t.pincodeError };
    }

    const phoneDigits = phone.replace(/\D/g, "");
    if (phoneDigits.length < 10) {
        return { valid: false, message: t.phoneError };
    }

    if (!termsAccepted) {
        return { valid: false, message: t.termsError };
    }

    return {
        valid: true,
        data: {
            farmerName: name,
            crop,
            quantity,
            quantityUnit,
            state,
            village,
            pincode,
            phone,
            date: new Date().toLocaleString()
        }
    };
}

function submitPickup(event) {
    event.preventDefault();

    const lang = getLang();
    const t = PICKUP_TEXT[lang];
    const validation = validatePickupForm(t);

    if (!validation.valid) {
        setMessage("error", t.errorTitle, validation.message);
        return;
    }

    const pickupRequests = JSON.parse(localStorage.getItem("pickupRequests")) || [];
    pickupRequests.push(validation.data);
    localStorage.setItem("pickupRequests", JSON.stringify(pickupRequests));

    setMessage("success", t.successTitle, t.successBody, t.successMeta);
    document.getElementById("pickupForm").reset();
    changeLang();
}

document.addEventListener("DOMContentLoaded", () => {
    // Language change is now handled by the language selector component
    document.getElementById("pickupForm").addEventListener("submit", submitPickup);
    document.getElementById("pickupForm").addEventListener("input", clearMessage);
    document.getElementById("terms").addEventListener("change", clearMessage);
});
