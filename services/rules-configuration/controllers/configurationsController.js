const ConfigurationModel = require('../models/configurationModel');
const TransactionsModel = require('../models/transactionModel');
const to = require('../../../utilities/awaitTo');
const statusCodes = require('../../../utilities/statusCodes');
const { missing_model } = require('../../../utilities/errorCodes');
const secret = require('../config/secret');

class ConfigurationsController {
    getAll (req, res) {
        ConfigurationModel.find({})
            .then(res.ok)
            .catch(res.error);
    }

    async getOne (req, res) {
        const [error, model] = await to(ConfigurationModel.findById(req.params.id));
        if (error) return res.error(error);
        if (!model) return res.error(missing_model, statusCodes.NotFound);

        return res.ok(model);
    }

    create (req, res) {
        // TODO: validate rules!
        ConfigurationModel.create({ rules: req.body.rules })
            .then(res.ok)
            .catch(res.error);
    }

    async update (req, res) {
        const [error, model] = await to(ConfigurationModel.findById(req.params.id));
        if (error) return res.error(error);
        if (!model) return res.error(missing_model, statusCodes.NotFound);

        model.rules = req.body.rules;

        const [errorSavingModel] = await to(model.save());
        if (errorSavingModel) return res.error(errorSavingModel);

        const [errorNotifyingTransactionsService] =
            await to(TransactionsModel.notifyUpdateConfiguration(JSON.stringify(model), secret));

        if (errorNotifyingTransactionsService) return res.error(errorNotifyingTransactionsService);

        res.ok(model);
    }

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
