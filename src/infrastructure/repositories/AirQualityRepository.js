const AirQualityModel = require('../models/airQualityModel');

class AirQualityRepository {
    async save(airQualityEntity) {
        const airQualityDoc = new AirQualityModel({
            ts: airQualityEntity.ts,
            aqius: airQualityEntity.aqius,
            mainus: airQualityEntity.mainus,
            aqicn: airQualityEntity.aqicn,
            maincn: airQualityEntity.maincn,
            location: {
                coordinates: airQualityEntity.coordinates,
            }
        });
        await airQualityDoc.save();
        return airQualityDoc;
    }

    async findMostPolluted() {
        return AirQualityModel.findOne().sort('-aqius').exec();
    }
}

module.exports = AirQualityRepository;
