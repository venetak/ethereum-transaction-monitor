const transactionsMonitorServicePort = 9444;
const transactionsMonitorService = `http://localhost:${transactionsMonitorServicePort}`;

module.exports = {
    dbConfig: 'mongodb://localhost:27017/RuleConfiguration',
    transactionsMonitorService,
};
