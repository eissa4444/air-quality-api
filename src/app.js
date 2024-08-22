const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const airQualityRoutes = require('./routes/airQualityRoutes');
const parisZoneAirQualityJob = require('./jobs/parisZoneAirQualityJob');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./config/swagger');

const AirQualityRepository = require('./infrastructure/repositories/AirQualityRepository');
const getMostPollutedTimeUseCase = require('./application/useCases/getMostPollutedTimeUseCase');
const IqAirService = require('./infrastructure/services/iqAirService');
const getAirQualityUseCase = require('./application/useCases/getAirQualityUseCase');


dotenv.config();

const app = express();
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log('MongoDB connection error:', err));

// Instantiate services and repositories
const airQualityRepository = new AirQualityRepository();
const iqAirService = new IqAirService();

// Instantiate use cases
const getMostPollutedTime = getMostPollutedTimeUseCase(airQualityRepository);
const getAirQuality = getAirQualityUseCase(iqAirService);

// Pass dependencies to routes
app.use('/api', airQualityRoutes({ getMostPollutedTime, getAirQuality }));

// Swagger setup
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Start the cron job
parisZoneAirQualityJob.start();

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
