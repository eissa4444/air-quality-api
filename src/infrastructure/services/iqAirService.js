
const axios = require('axios');

class IqAirService {
    async fetchAirQuality(lat, lon) {
        const url = `${process.env.IQAIR_BASE_URL}/nearest_city?lat=${lat}&lon=${lon}&key=${process.env.IQAIR_API_KEY}`;
        try {
            const response = await axios.get(url);
            return response.data;
        } catch (error) {
            console.error('Error fetching air quality data:', error);
            throw error;
        }
    }
}

module.exports = IqAirService;
