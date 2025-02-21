async function fetchAlerts() {
    try {
        // Call the backend API to get earthquake alerts for India
        const response = await fetch("http://localhost:5000/api/alerts/");
        const alerts = await response.json();
        displayAlerts(alerts);
    } catch (error) {
        console.error("Error fetching alerts:", error);
    }
}

function displayAlerts(alerts) {
    const alertContainer = document.getElementById("alert-container");
    alertContainer.innerHTML = ""; // Clear previous alerts

    if (alerts.length === 0) {
        alertContainer.innerHTML = "<p>No recent earthquakes in India.</p>";
        return;
    }

    alerts.forEach(alert => {
        // Create a readable message for each alert
        const alertElement = document.createElement("div");
        alertElement.className = "alert-box";

        const message = `
            <strong>Earthquake Alert:</strong><br>
            <em>Location:</em> ${alert.place}<br>
            <em>Magnitude:</em> ${alert.magnitude}<br>
            <em>Time:</em> ${alert.time}<br>
            <em>Depth:</em> ${alert.depth} km<br>
            <em>Coordinates:</em> ${alert.coordinates.latitude}° N, ${alert.coordinates.longitude}° E<br><br>
        `;

        alertElement.innerHTML = message;
        alertContainer.appendChild(alertElement);
    });
}

fetchAlerts();
