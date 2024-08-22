// tests/getAirQualityUseCase.test.js
const getAirQualityUseCase = require('../src/application/useCases/getAirQualityUseCase');

describe('getAirQualityUseCase', () => {
    it('should fetch and return air quality data in the correct format', async () => {
        const mockIqAirService = {
            fetchAirQuality: jest.fn().mockResolvedValue({
                data: {
                    current: {
                        pollution: {
                            ts: "2024-08-21T00:00:00.000Z",
                            aqius: 155,
                            mainus: "p2",
                            aqicn: 100,
                            maincn: "pm10"
                        }
                    }
                }
            })
        };

        const useCase = getAirQualityUseCase(mockIqAirService);
        const result = await useCase(48.856613, 2.352222);

        expect(mockIqAirService.fetchAirQuality).toHaveBeenCalledWith(48.856613, 2.352222);
        expect(result).toEqual({
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

    it('should throw an error if fetching air quality data fails', async () => {
        const mockIqAirService = {
            fetchAirQuality: jest.fn().mockRejectedValue(new Error('API Error'))
        };

        const useCase = getAirQualityUseCase(mockIqAirService);

        await expect(useCase(48.856613, 2.352222)).rejects.toThrow('API Error');
    });
});
