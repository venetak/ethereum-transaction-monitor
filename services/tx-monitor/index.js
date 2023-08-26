require('./db');
const TransactionsMonitor = require('./transactionsMonitor');
const configurationsModel = require('./models/configurationsModel');
const to = require('../../utilities/awaitTo');

const secret = require('./config/secret');
const sha256 = require('crypto-js/sha256');

async function main () {
    const [error, config] = await to(configurationsModel.getAll(sha256(secret).toString()));

    if (error) console.log(error);
    if (config) console.log(config.data);
}

main();
// create a config with the Rules Service's address
// make request to the Rules Service
// 




