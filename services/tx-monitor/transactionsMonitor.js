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

/**
 * TransactionsMonitor
 * Used to monitor Ethereum transactions.
 * Uses ethers - https://docs.ethers.org/v5/ to listen to block event.
 * On block event (when a block is solved) - gets all transactions and check if any of them
 * matches the rules defined in the configuration - if yes - saves them in the DB.
 */
class TransactionsMonitor {
    constructor () {
        // subscribe to configuration-change event
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

    /**
     * Get the last rules configuration that was
     * saved in the database and set it as a member
     */
    async getAndSetupConfig () {
        const [errorGettingConfig, config] = await to(configurationsModel.getLast(secret));
        if (errorGettingConfig) return errorLog('get', 'configuration', '', errorGettingConfig);
        this.rulesConfiguration = config;
    }

    /**
     * Event handler for the block event.
     * @param {number} blockNumber - the number of the block that was solved.
     */
    async onBlock (blockNumber) {
        // get the block object from the blockNumber
        const [errorGettingBlock, block] = await to(this.provider.getBlock(blockNumber));
        if (errorGettingBlock) return errorLog('get', 'block', blockNumber, errorGettingBlock);
        
        // loop all transactions and perform a check against the rules of the
        // current configuration
        block.transactions.forEach(async (transactionHash) => {
            // get the actual transaction object; block.transactions contains only the hashes!
            const [errorGettingTransaction, transaction] = await to(this.provider.getTransaction(transactionHash));
            if (errorGettingTransaction) return errorLog('get', 'transaction', transactionHash, errorGettingTransaction);

            if (transactionValidator.hasMatch(transaction, this.rulesConfiguration)) {
                // save the matched transaction to the database
                // save the configuration id to enable filtering by config
                const [errorSavingTransaction] = await to(new TransactionModel({ ...transaction, configId: this.rulesConfiguration._id }).save());
                if (errorSavingTransaction) errorLog('save', 'transaction', transactionHash, errorSavingTransaction);
            }
        });
    }

    async monitorTransactions () {
        await this.getAndSetupConfig();

        // Creating a signing account from a private key
        // Use if you want to test with transaction to private address (the wallet).
        // const signer = new ethers.Wallet(process.env.SIGNER_PRIVATE_KEY, provider);

        this.provider.on('block', this.onBlock);
    }
}

require('dotenv').config();

module.exports = TransactionsMonitor;
