const rulesConfigurationServicePort = 3000;
const rulesConfigurationService = `http://localhost:${rulesConfigurationServicePort}`;

module.exports = {
    dbConfig: 'mongodb://localhost:27017/Transactions',
    rulesConfigurationService,
};
