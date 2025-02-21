document.addEventListener("DOMContentLoaded", () => {
    const map = L.map("map").setView([20.5793, 78.9629], 5);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "Map data &copy; <a href='https://www.openstreetmap.org/'>OpenStreetMap</a> contributors"
    }).addTo(map);

    // ✅ Fix Fetch Request URL
    fetch("/api/disasters")
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(disasters => {
            console.log("Disasters Data:", disasters);  // ✅ Debugging Line
            disasters.forEach(disaster => {
                const lat = parseFloat(disaster.lat);
                const lng = parseFloat(disaster.lng);

                if (isNaN(lat) || isNaN(lng)) {
                    console.error("Invalid latitude or longitude:", disaster);
                    return;
                }

                const myIcon = L.divIcon({
                    html: `<i class="fas fa-exclamation-triangle" style="color: red; font-size: 20px;"></i>`,
                    iconSize: [24, 24],
                    className: "my-custom-icon"
                });

                L.marker([lat, lng], { icon: myIcon })
                    .addTo(map)
                    .bindPopup(`<b>${disaster.type}</b>`);
            });
        })
        .catch(error => {
            console.error("Error fetching disaster data:", error);
            alert("Error loading map data. Please try again later.");
        });

    // ✅ Fix Fullscreen Button
    const fullscreenButton = document.getElementById("fullscreen-button");

    fullscreenButton.addEventListener("click", () => {
        const mapContainer = document.getElementById("map");
        if (document.fullscreenElement) {
            document.exitFullscreen();
        } else {
            mapContainer.requestFullscreen();
        }
    });

    document.addEventListener("fullscreenchange", () => {
        fullscreenButton.textContent = document.fullscreenElement ? "Exit Fullscreen" : "Go Fullscreen";
    });
});
