const TransactionModel = require('../models/transactionModel');
const to = require('../../../utilities/awaitTo');
const statusCodes = require('../../../utilities/statusCodes');
const { missing_transaction } = require('../../../utilities/errorCodes');
const events = require('../events');

class TransactionsController {
    /**
     * Get all transactions from the database.
     * @param {Object} req - the request object
     * @param {Object} res - a Response instance wrapping the response object
     */
    getAll (req, res) {
        TransactionModel.find({})
            .then(res.ok)
            .catch(res.error);
    }

    /**
     * Create a transaction entry in the database.
     * Relies on the mongoose schema to validate req.body.
     * @param {Object} req - the request object
     * @param {Object} res - a Response instance wrapping the response object
     */
    create (req, res) {
        TransactionModel.create(req.body)
            .then(res.ok)
            .catch(res.error);
    }

    /**
     * Emit a configuration-change event notifying all subscribers.
     * This is triggered in a response to an HTTP req from the Rules Configuration service.
     * @param {Object} req - the request object
     * @param {Object} res - a Response instance wrapping the response object
     */
    updateConfiguration (req, res) {
        events.emit('configuration-change', req.body);
        res.ok();
    }
}

module.exports = new TransactionsController();
