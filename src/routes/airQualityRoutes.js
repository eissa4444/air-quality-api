const express = require('express');

module.exports = ({ getMostPollutedTime, getAirQuality }) => {
    const router = express.Router();

    const airQualityController = require('../controllers/airQualityController');

    router.get('/air-quality', airQualityController.getAirQuality(getAirQuality));

    router.get('/most-polluted', airQualityController.getMostPollutedTime(getMostPollutedTime));

    return router;
};




