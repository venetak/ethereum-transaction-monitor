const constructLocalhostURL = (port) => `http://localhost:${port}`;

const rulesConfigurationServicePort = 3000;
const transactionsServicePort = 9000;

module.exports = {
    rulesConfigurationService: constructLocalhostURL(rulesConfigurationServicePort),
    transactionsService: constructLocalhostURL(transactionsServicePort),
};
