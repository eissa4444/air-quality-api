
module.exports = function getMostPollutedTimeUseCase(airQualityRepository) {
    return async function() {
        try {
            const mostPolluted = await airQualityRepository.findMostPolluted();

            if (!mostPolluted) {
                throw new Error('No data found');
            }

            return {
                ts: mostPolluted.ts,
                aqius: mostPolluted.aqius,
                mainus: mostPolluted.mainus
            };
        } catch (error) {
            console.error('Error in getMostPollutedTimeUseCase:', error);
            throw error;
        }
    };
};
