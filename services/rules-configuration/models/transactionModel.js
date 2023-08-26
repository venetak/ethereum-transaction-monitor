const { transactionsMonitorService } = require('../config/urls');
const axios = require('axios');

/**
 * TransactionsModel
 * Used to handle communication with the Transactions Monitor service.
 */
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
