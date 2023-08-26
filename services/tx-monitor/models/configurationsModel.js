const { rulesConfigurationService } = require('../config/urls');
const axios = require('axios');

class ConfigurationsModel {
    getAll (secret) {
        // make req to Configurations Service
        return axios.get(`${rulesConfigurationService}/configurations`, {
            headers: { secret },
        });
    }
};

module.exports = new ConfigurationsModel();
