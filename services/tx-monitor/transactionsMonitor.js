const { ethers } = require('ethers');
const events = require('./events');
const configurationsModel = require('./models/configurationsModel');
const to = require('../../utilities/awaitTo');
const secret = require('./config/secret');

const transactionValidator = require('./transactionValidator');
const TransactionModel = require('./models/transactionModel');

const errorLog = (operation, subject, identifier, error) => {
    console.error(`Failed to ${operation} ${subject} - ${identifier}, error: ${error}`);
};

class TransactionsMonitor {
    constructor () {
        events.on('configuration-change', data => {
            this.rulesConfiguration = JSON.parse(data.configuration);
            console.log(`Received configuration-change event, rulesConfiguration changed! - new value: ${data.configuration}`);
        });

        this.onBlock = this.onBlock.bind(this);

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
        if (errorGettingConfig) return errorLog('get', 'configuration', '', errorGettingConfig);
        this.rulesConfiguration = config;
    }

    async onBlock (blockNumber) {
        const [errorGettingBlock, block] = await to(this.provider.getBlock(blockNumber));
        if (errorGettingBlock) return errorLog('get', 'block', blockNumber, errorGettingBlock);
        
        block.transactions.forEach(async (transactionHash) => {
            const [errorGettingTransaction, transaction] = await to(this.provider.getTransaction(transactionHash));
            if (errorGettingTransaction) return errorLog('get', 'transaction', transactionHash, errorGettingTransaction);

            if (transactionValidator.hasMatch(transaction, this.rulesConfiguration)) {
                const [errorSavingTransaction] = await to(new TransactionModel({ ...transaction, configId: this.rulesConfiguration._id }).save());
                if (errorSavingTransaction) errorLog('save', 'transaction', transactionHash, errorSavingTransaction);
            }
        });
    }

    async monitorTransactions () {
        await this.getAndSetupConfig();

        // Creating a signing account from a private key
        // const signer = new ethers.Wallet(process.env.SIGNER_PRIVATE_KEY, provider);

        this.provider.on('block', this.onBlock);
    }
}

require('dotenv').config();

module.exports = TransactionsMonitor;
