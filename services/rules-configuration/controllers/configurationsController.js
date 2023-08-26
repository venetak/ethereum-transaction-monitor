const ConfigurationModel = require('../models/configurationModel');
const TransactionsModel = require('../models/transactionModel');
const to = require('../../../utilities/awaitTo');
const statusCodes = require('../../../utilities/statusCodes');
const { missing_model } = require('../../../utilities/errorCodes');
const secret = require('../config/secret');

class ConfigurationsController {
    /**
     * Get all entries from the database.
     * Use ascending order by date of creation by default.
     * Reverse the order if there is a query pram that specifies a filter.
     * @param {Object} req - the request object
     * @param {Object} res - a Response instance wrapping the response object
     */
    getAll (req, res) {
        let order = 1;
        if (req.query?.order === 'desc') order = -1;

        ConfigurationModel.find({}).sort({createdAt: order})
            .then(res.ok)
            .catch(res.error);
    }

    /**
     * Get a single database entry.
     * Return an error if there is no entry with the specified id.
     * @param {Object} req - the request object
     * @param {Object} res - a Response instance wrapping the response object
     */
    async getOne (req, res) {
        const [error, model] = await to(ConfigurationModel.findById(req.params.id));
        if (error) return res.error(error);
        if (!model) return res.error(missing_model, statusCodes.NotFound);

        res.ok(model);
    }

    /**
     * Create a new configuration and save it to the database.
     * Relies on mongoose's schema to validate the req.body.
     * @param {Object} req - the request object
     * @param {Object} res - a Response instance wrapping the response object
     */
    create (req, res) {
        ConfigurationModel.create({ rules: req.body.rules })
            .then(res.ok)
            .catch(res.error);
    }

    /**
     * Update a record in the database.
     * Return an error if a record with the specified if does not exist.
     * Notify the Transactions Monitor service for the change using XMLHttpRequest.
     * @param {Object} req - the request object
     * @param {Object} res - a Response instance wrapping the response object
     */
    async update (req, res) {
        const [error, model] = await to(ConfigurationModel.findById(req.params.id));
        if (error) return res.error(error);
        if (!model) return res.error(missing_model, statusCodes.NotFound);

        model.rules = req.body.rules;

        const [errorSavingModel] = await to(model.save());
        if (errorSavingModel) return res.error(errorSavingModel);

        const [errorNotifyingTransactionsService] =
            await to(TransactionsModel.notifyUpdateConfiguration(JSON.stringify(model), secret));

        // don't return response.error because the configuration update we successful
        if (errorNotifyingTransactionsService) console.error(`Failed to notify transaction monitor service, error: ${errorNotifyingTransactionsService}`);

        res.ok(model);
    }

    /**
     * Delete a record from the database.
     * Return an error if model with such id does not exist.
     * @param {Object} req - the request object
     * @param {Object} res - a Response instance wrapping the response object
     */
    async delete (req, res) {
        const id = req.params.id;

        const [error, model] = await to(ConfigurationModel.findById(id));
        if (error) return res.error(error);
        if (!model) return res.error(missing_model, statusCodes.NotFound);

        const [errorDeletingModel] = await to(ConfigurationModel.findByIdAndDelete(id));
        if (errorDeletingModel) return res.error(errorDeletingModel);

        res.ok();
    }
}

module.exports = new ConfigurationsController();
