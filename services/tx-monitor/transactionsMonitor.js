const { ethers } = require('ethers');
const events = require('./events');
const configurationsModel = require('./models/configurationsModel');
const to = require('../../utilities/awaitTo');
const secret = require('./config/secret');

const transactionValidator = require('./transactionValidator');
const TransactionModel = require('./models/transactionModel');

class TransactionsMonitor {
    constructor () {
        events.on('configuration-change', config => this.rulesConfiguration = config);

        // Configuring the connection to an Ethereum node
        const network = process.env.ETHEREUM_NETWORK;
        this.provider = new ethers.providers.InfuraWebSocketProvider(
            network,
            process.env.INFURA_API_KEY
        );
    }

    set rulesConfiguration (value) {
        this._rulesConfiguration = value;
    }

    get rulesConfiguration () {
        return this._rulesConfiguration;
    }

    async getAndSetupConfig () {
        const [errorGettingConfig, config] = await to(configurationsModel.getLast(secret));
        if (errorGettingConfig) return console.error(`Failed to get configuration - ${errorGettingConfig}`);
        this.rulesConfiguration = config;
    }

    async monitorTransactions () {
        await this.getAndSetupConfig();

        // Creating a signing account from a private key
        // const signer = new ethers.Wallet(process.env.SIGNER_PRIVATE_KEY, provider);

        this.provider.on('block', (blockNumber) => {
            this.provider.getBlock(blockNumber).then(block => {
                this.provider.getTransaction(block.transactions[0]).then(tx => {
                    if (transactionValidator.hasMatch(tx, this.rulesConfiguration)) {
                        new TransactionModel(tx).save();
                        
                    }
                    console.log(tx);
                });
            });
            console.log('===================pending', blockNumber);
        });
    }
}

require('dotenv').config();

module.exports = TransactionsMonitor;
