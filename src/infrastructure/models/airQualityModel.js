const mongoose = require('mongoose');

const airQualitySchema = new mongoose.Schema({
    ts: { type: String, required: true },
    aqius: { type: Number, required: true },
    mainus: { type: String, required: true },
    aqicn: { type: Number, required: true },
    maincn: { type: String, required: true },
    location: {
        type: { type: String, default: 'Point' },
        coordinates: [Number], // Longitude and Latitude
    },
});

// Create the model
const AirQualityModel = mongoose.model('AirQuality', airQualitySchema);

module.exports = AirQualityModel;
