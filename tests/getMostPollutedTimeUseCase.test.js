// tests/getMostPollutedTimeUseCase.test.js
const getMostPollutedTimeUseCase = require('../src/application/useCases/getMostPollutedTimeUseCase');

describe('getMostPollutedTimeUseCase', () => {
    it('should return the most polluted time and AQI when data is available', async () => {
        const mockAirQualityRepository = {
            findMostPolluted: jest.fn().mockResolvedValue({
                ts: "2024-08-21T00:00:00.000Z",
                aqius: 155,
                mainus: "p2"
            })
        };

        const useCase = getMostPollutedTimeUseCase(mockAirQualityRepository);
        const result = await useCase();

        expect(result).toEqual({
            ts: "2024-08-21T00:00:00.000Z",
            aqius: 155,
            mainus: "p2"
        });
    });

    it('should throw an error if no data is found', async () => {
        const mockAirQualityRepository = {
            findMostPolluted: jest.fn().mockResolvedValue(null)
        };

        const useCase = getMostPollutedTimeUseCase(mockAirQualityRepository);

        await expect(useCase()).rejects.toThrow('No data found');
    });

    it('should throw an error if there is a database issue', async () => {
        const mockAirQualityRepository = {
            findMostPolluted: jest.fn().mockRejectedValue(new Error('Database error'))
        };

        const useCase = getMostPollutedTimeUseCase(mockAirQualityRepository);

        await expect(useCase()).rejects.toThrow('Database error');
    });
});
