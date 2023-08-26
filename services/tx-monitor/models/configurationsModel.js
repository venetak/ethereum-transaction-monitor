const { rulesConfigurationService } = require('../config/urls');
const axios = require('axios');
const to = require('../../../utilities/awaitTo');

class ConfigurationsModel {
    getAll (secret) {
        // make req to Configurations Service
        return axios.get(`${rulesConfigurationService}/configurations`, {
            headers: { secret },
        });
    }

    async getLast (secret) {
        // make req to Configurations Service
        const [error, response] = await to(axios.get(`${rulesConfigurationService}/configurations?order=desc`, {
            headers: { secret },
        }));

        if (error) return Promise.reject(error);
        return response.data.data[0];
    }
};

module.exports = new ConfigurationsModel();
