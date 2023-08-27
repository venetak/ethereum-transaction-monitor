const { ethers } = require('ethers');
const events = require('./events');
const configurationsModel = require('./models/configurationsModel');
const to = require('../../utilities/awaitTo');
const secret = require('./config/secret');
const { isJSON } = require('../../utilities/json');

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
            const config = data.configuration;
            if (isJSON(config)) {
                this.rulesConfiguration = JSON.parse(config);
            } else {
                this.rulesConfiguration = config;
            }

            console.log(`Received configuration-change event, rulesConfiguration changed! - new value: ${JSON.stringify(config)}`);
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
     * @returns {boolean} - true if the setup was successful, false if not
     */
    async setupConfig () {
        const [errorGettingConfig, config] = await to(configurationsModel.getLast(secret));
        if (errorGettingConfig) {
            errorLog('get', 'configuration', '', errorGettingConfig);
            return false;
        }
        this.rulesConfiguration = config;
        return true;
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
        const txes = [block.transactions[0]];
        txes.forEach(async (transactionHash) => {
            // get the actual transaction object; block.transactions contains only the hashes!
            const [errorGettingTransaction, transaction] = await to(this.provider.getTransaction(transactionHash));
            if (errorGettingTransaction) return errorLog('get', 'transaction', transactionHash, errorGettingTransaction);

            if (transactionValidator.hasMatch(transaction, this.rulesConfiguration)) {
                // save the matched transaction to the database
                // save the configuration id to enable filtering by config
                console.log(`Matched TX ------------ ${transactionHash}`);
                const [errorSavingTransaction] = await to(new TransactionModel({ ...transaction, configId: this.rulesConfiguration._id }).save());
                if (errorSavingTransaction) errorLog('save', 'transaction', transactionHash, errorSavingTransaction);
            }
        });
    }

    async monitorTransactions () {
        const success = await this.setupConfig();
        if (!success) return;

        // Creating a signing account from a private key
        // Use if you want to test with transaction to private address (the wallet).
        // const signer = new ethers.Wallet(process.env.SIGNER_PRIVATE_KEY, provider);

        this.provider.on('block', this.onBlock);
    }
}

require('dotenv').config();

module.exports = TransactionsMonitor;
