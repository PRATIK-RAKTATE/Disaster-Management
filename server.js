import express from "express";
import fetch from "node-fetch";
import cors from "cors";

const app = express();
app.use(cors());
const PORT = 5000;

// Define the bounding box coordinates for India
const indiaBoundingBox = {
    minLat: 6.8,  // Southernmost point of India
    maxLat: 37.5, // Northernmost point of India
    minLon: 68.7, // Westernmost point of India
    maxLon: 97.4  // Easternmost point of India
};

// API Endpoint to fetch earthquake alerts for India
app.get("/api/alerts/", async (req, res) => {
    try {
        // Fetch data from USGS API with bounding box filter for India
        const response = await fetch(
            `https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/2.5_day.geojson?lat=${indiaBoundingBox.minLat}&lon=${indiaBoundingBox.minLon}&maxlat=${indiaBoundingBox.maxLat}&maxlon=${indiaBoundingBox.maxLon}`
        );
        const data = await response.json();

        // Format the data into a more human-readable format
        const formattedAlerts = data.features.map(eq => {
            const place = eq.properties.place;
            const magnitude = eq.properties.mag;
            const time = new Date(eq.properties.time).toLocaleString();
            const coords = eq.geometry.coordinates;
            const depth = coords[2]; // Depth is the 3rd value in coordinates

            return {
                place: place,
                magnitude: magnitude,
                time: time,
                depth: depth,
                coordinates: {
                    latitude: coords[1],
                    longitude: coords[0]
                }
            };
        });

        res.json(formattedAlerts);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch earthquake alerts for India" });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
