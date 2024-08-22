exports.getAirQuality = (getAirQualityUseCase) => {
    return async (req, res) => {
        const { lat, lon } = req.query;
        try {
            const result = await getAirQualityUseCase(lat, lon);
            res.json(result);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Failed to fetch air quality data' });
        }
    };
};

exports.getMostPollutedTime = (getMostPollutedTimeUseCase) => {
    return async (req, res) => {
        try {
            const result = await getMostPollutedTimeUseCase();
            if (!result) {
                return res.status(404).json({ message: 'No data found.' });
            }
            res.status(200).json(result);
        } catch (error) {
            console.error('Error while fetching the most polluted time:', error);
            res.status(500).json({ error: 'Failed to fetch most polluted time' });
        }
    };
};


