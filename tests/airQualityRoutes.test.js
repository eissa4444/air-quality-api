// tests/airQualityRoutes.test.js
const request = require('supertest');
const express = require('express');
const airQualityRoutes = require('../src/routes/airQualityRoutes');

jest.setTimeout(10000);

describe('Air Quality Routes', () => {
    let app;

    beforeEach(() => {
        // Create a fresh instance of the app for each test
        app = express();
        app.use(express.json());
    });

    it('should return air quality data for a specific location', async () => {
        const mockGetAirQuality = jest.fn().mockResolvedValue({
            Result: {
                pollution: {
                    ts: "2024-08-21T00:00:00.000Z",
                    aqius: 155,
                    mainus: "p2",
                    aqicn: 100,
                    maincn: "pm10"
                }
            }
        });

        const router = airQualityRoutes({ getAirQuality: mockGetAirQuality, getMostPollutedTime: jest.fn() });
        app.use('/api', router);

        const res = await request(app).get('/api/air-quality?lat=48.856613&lon=2.352222');
        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual({
            Result: {
                pollution: {
                    ts: "2024-08-21T00:00:00.000Z",
                    aqius: 155,
                    mainus: "p2",
                    aqicn: 100,
                    maincn: "pm10"
                }
            }
        });
    });

    it('should return the most polluted time and AQI when data is available', async () => {
        const mockGetMostPollutedTime = jest.fn().mockResolvedValue({
            ts: "2024-08-21T00:00:00.000Z",
            aqius: 155,
            mainus: "p2"
        });

        const router = airQualityRoutes({ getAirQuality: jest.fn(), getMostPollutedTime: mockGetMostPollutedTime });
        app.use('/api', router);

        const res = await request(app).get('/api/most-polluted');
        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual({
            ts: "2024-08-21T00:00:00.000Z",
            aqius: 155,
            mainus: "p2"
        });
    });

    it('should return 404 if no data is found for the most polluted time', async () => {
        const mockGetMostPollutedTime = jest.fn().mockResolvedValue(null);

        const router = airQualityRoutes({ getAirQuality: jest.fn(), getMostPollutedTime: mockGetMostPollutedTime });
        app.use('/api', router);

        const res = await request(app).get('/api/most-polluted');
        expect(res.statusCode).toBe(404);
        expect(res.body).toEqual({ message: 'No data found.' });
    });

    it('should return 500 if there is a server error for the most polluted time', async () => {
        const mockGetMostPollutedTime = jest.fn().mockRejectedValue(new Error('Server error'));

        const router = airQualityRoutes({ getAirQuality: jest.fn(), getMostPollutedTime: mockGetMostPollutedTime });
        app.use('/api', router);

        const res = await request(app).get('/api/most-polluted');
        expect(res.statusCode).toBe(500);
        expect(res.body).toEqual({ error: 'Failed to fetch most polluted time' });
    });
});
