const TransactionModel = require('../models/transactionModel');
const to = require('../../../utilities/awaitTo');
const statusCodes = require('../../../utilities/statusCodes');
const { missing_transaction } = require('../../../utilities/errorCodes');
const events = require('../events');

class TransactionsController {
    getAll (req, res) {
        TransactionModel.find({})
            .then(res.ok)
            .catch(res.error);
    }

    async getOne (req, res) {
        const [error, model] = await to(TransactionModel.findById(req.params.id));
        if (error) return res.error(error);
        if (!model) return res.error(missing_transaction, statusCodes.NotFound);

        return res.ok(model);
    }

    create (req, res) {
        // TODO: validate!
        // Do we need an endpoint for this? - should it be handled internally?
        TransactionModel.create(req.body)
            .then(res.ok)
            .catch(res.error);
    }

    updateConfiguration (req, res) {
        // TODO: import the monitor singleton and set its config directly?
        // pass whole config or only the id?
        events.emit('configuration-change', req.body);

        // handle errors? - validate body and return err if invalid?
        res.ok();
    }
}

module.exports = new TransactionsController();
