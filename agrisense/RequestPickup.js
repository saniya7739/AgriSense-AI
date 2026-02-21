function submitPickup() {

    let name = document.getElementById("farmerName").value;
    let crop = document.getElementById("cropName").value;
    let quantity = document.getElementById("quantity").value;
    let village = document.getElementById("village").value;
    let phone = document.getElementById("phone").value;

    if (!name || !crop || !quantity || !village || !phone) {
        alert("Please fill all fields!");
        return;
    }

    let pickupRequests = JSON.parse(localStorage.getItem("pickupRequests")) || [];

    let newRequest = {
        farmerName: name,
        crop: crop,
        quantity: quantity,
        village: village,
        phone: phone,
        date: new Date().toLocaleString()
    };

    pickupRequests.push(newRequest);

    localStorage.setItem("pickupRequests", JSON.stringify(pickupRequests));

    document.getElementById("message").innerText =
        "✅ Pickup request submitted successfully! Logistics team will contact you.";

    document.querySelectorAll("input").forEach(input => input.value = "");
}
