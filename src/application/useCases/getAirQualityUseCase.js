
module.exports = function getAirQualityUseCase(iqAirService) {
    return async function(lat, lon) {
        try {
            const airQualityData = await iqAirService.fetchAirQuality(lat, lon);

            const result = {
                Result: {
                    pollution: {
                        ts: airQualityData.data.current.pollution.ts,
                        aqius: airQualityData.data.current.pollution.aqius,
                        mainus: airQualityData.data.current.pollution.mainus,
                        aqicn: airQualityData.data.current.pollution.aqicn,
                        maincn: airQualityData.data.current.pollution.maincn,
                    }
                }
            };

            return result;
        } catch (error) {
            console.error('Error in getAirQualityUseCase:', error);
            throw error;
        }
    };
};
