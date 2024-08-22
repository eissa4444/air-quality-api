const AirQuality = require('../../domain/entities/AirQuality');

module.exports = function fetchAndSaveAirQualityUseCase(iqAirService, airQualityRepository) {
    return async function(lat, lon) {

        const airQualityData = await iqAirService.fetchAirQuality(lat, lon);

        const airQualityEntity = new AirQuality({
            ts: airQualityData.data.current.pollution.ts,
            aqius: airQualityData.data.current.pollution.aqius,
            mainus: airQualityData.data.current.pollution.mainus,
            aqicn: airQualityData.data.current.pollution.aqicn,
            maincn: airQualityData.data.current.pollution.maincn,
            coordinates: [lon, lat]
        });


        await airQualityRepository.save(airQualityEntity);

        return airQualityEntity;
    };
};
