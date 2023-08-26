const { transactionsMonitorService } = require('../config/urls');
const axios = require('axios');

class TransactionsModel {
    notifyUpdateConfiguration (configuration, secret) {
        // make req to Configurations Service
        return axios.post(`${transactionsMonitorService}/configuration`, {
            configuration: configuration,
        },
        {
            headers: { 'secret': secret },
        });
    }
};

module.exports = new TransactionsModel();
