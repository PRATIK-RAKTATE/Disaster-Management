document.addEventListener('DOMContentLoaded', () => {
    const map = L.map('map').setView([20.5793, 78.9629], 5);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
    }).addTo(map);

    fetch('/api/disasters')
        .then(response => response.json())
        .then(disasters => {
            disasters.forEach(disaster => {
                const lat = parseFloat(disaster.lat);
                const lng = parseFloat(disaster.lng);

                if (isNaN(lat) || isNaN(lng)) {
                    console.error("Invalid latitude or longitude:", disaster);
                    return;
                }

                const myIcon = L.divIcon({
                    html: `<i class="fas fa-exclamation-triangle" style="color: yellow; font-size: 24px;"></i>`, // Font Awesome icon
                    iconSize: [24, 24],
                    className: 'my-custom-icon'
                });

                L.marker([lat, lng], { icon: myIcon }).addTo(map).bindPopup(`<b>${disaster.type}</b>`);
            });
        })
        .catch(error => {
            console.error("Error fetching disaster data:", error);
            alert("Error loading map data. Please try again later.");
        });
}); 

// for fullscreen button
document.addEventListener('DOMContentLoaded', () => {
    // ... (Your existing map initialization and marker code)

    const fullscreenButton = document.getElementById('fullscreen-button');

    fullscreenButton.addEventListener('click', () => {
        if (document.fullscreenElement) { // Check if already in fullscreen
            document.exitFullscreen(); // Exit fullscreen
        } else {
            const mapContainer = document.getElementById('map'); // Get map container
            mapContainer.requestFullscreen(); // Go fullscreen
        }
    });

    // Optional: Add event listener for fullscreen change to update button text
    document.addEventListener('fullscreenchange', () => {
        if (document.fullscreenElement) {
            fullscreenButton.textContent = 'Exit Fullscreen';
        } else {
            fullscreenButton.textContent = 'Go Fullscreen';
        }
    });

});