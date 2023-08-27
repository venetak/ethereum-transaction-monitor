const { rulesConfigurationService } = require('../config/urls');
const axios = require('axios');
const to = require('../../../utilities/awaitTo');

/**
 * ConfigurationsModel
 * Used to handle communication with the Rules Configuration service
 */
class ConfigurationsModel {
    /**
     * Get all configurations.
     * @param {string} secret - the authentication secret.
     * @returns {Promise} - a Promise that resolves with the result from the XMLHttpRequest.
     */
    getAll (secret) {
        // make req to Configurations Service
        return axios.get(`${rulesConfigurationService}/configurations`, {
            headers: { secret },
        });
    }

    /**
     * Get the last entry added to the database.
     * @param {string} secret - the authentication secret.
     * @returns {Promise} - a Promise that will resolve with the result from the request.
     */
    async getLast (secret) {
        // make req to Configurations Service
        const [error, response] = await to(axios.get(`${rulesConfigurationService}/configurations?order=desc`, {
            headers: { secret },
        }));

        if (error) return Promise.reject(error);
        // axios also wraps the response in data...
        return response.data.data[0];
    }
};

module.exports = new ConfigurationsModel();
