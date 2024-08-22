const cron = require('node-cron');
const fetchAndSaveAirQualityUseCase = require('../application/useCases/fetchAndSaveAirQualityUseCase');
const IqAirService = require('../infrastructure/services/iqAirService');
const AirQualityRepository = require('../infrastructure/repositories/AirQualityRepository');
const AirQuality = require('../domain/entities/AirQuality');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

// Instantiate the service and repository
const iqAirService = new IqAirService();
const airQualityRepository = new AirQualityRepository();

// Instantiate the use case
const fetchAndSaveAirQuality = fetchAndSaveAirQualityUseCase(iqAirService, airQualityRepository);

// Get the cron pattern from the environment variables
const cronPattern = process.env.CRON_PATTERN;
const lat = process.env.LATITUDE;
const lon = process.env.LONGITUDE;


if (typeof cronPattern !== 'string' || !cronPattern.trim()) {
    throw new Error('Invalid or missing cron pattern in environment variables.');
}

// Set up the cron job
const parisZoneAirQualityJob = cron.schedule(cronPattern, async () => {
    try {
        console.log('Cron job started at:', new Date().toISOString());

        // Fetch the air quality data
        const airQualityData = await iqAirService.fetchAirQuality(lat, lon);

        // Create an AirQuality domain entity
        const airQualityEntity = new AirQuality({
            ts: airQualityData.data.current.pollution.ts,
            aqius: airQualityData.data.current.pollution.aqius,
            mainus: airQualityData.data.current.pollution.mainus,
            aqicn: airQualityData.data.current.pollution.aqicn,
            maincn: airQualityData.data.current.pollution.maincn,
            coordinates: [lon, lat]
        });

        // Save the air quality entity to the repository
        await airQualityRepository.save(airQualityEntity);

        console.log('Air quality data saved successfully:', airQualityEntity);
    } catch (error) {
        console.error('Error in parisZoneAirQualityJob:', error);
    }
});

module.exports = parisZoneAirQualityJob;

