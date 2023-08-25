const ConfigurationModel = require('../models/configurationModel');
const to = require('../../../utilities/awaitTo');
const statusCodes = require('../../../utilities/statusCodes');
const mongoose = require('mongoose');

class ConfigurationsController {
    getAll (req, res) {
        ConfigurationModel.find({})
            .then(res.ok)
            .catch(res.error);
    }

    getOne (req, res) {
        ConfigurationModel.findById(req.params.id)
            .then(res.ok)
            .catch(res.error);
    }

    create (req, res) {
        // TODO: validate rules!
        ConfigurationModel.create({ rules: req.body.rules })
            .then(res.ok)
            .catch(res.error);
    }

    async update (req, res) {
        // TODO: validate id
        const id = req.params.id;
        if (!mongoose.Types.ObjectId.isValid(id)) return res.error('Invalid id!');

        const [error, model] = await to(ConfigurationModel.findById(req.params.id));
        if (error) return res.error(error);
        if (!model) return res.error('No such model!', statusCodes.NotFound);

        model.rules = req.body.rules;

        const [errorSavingModel] = await to(model.save());
        if (errorSavingModel) return res.error(errorSavingModel);

        res.ok(model);
    }

    async delete (req, res) {
        const id = req.params.id;
        // TODO: move to middleware
        if (!mongoose.Types.ObjectId.isValid(id)) return res.error('Invalid id!');

        const [error, model] = await to(ConfigurationModel.findById(id));
        if (error) return res.error(error);
        if (!model) return res.error('No such model!', statusCodes.NotFound);

        const [errorDeletingModel] = await to(ConfigurationModel.findByIdAndDelete(id));
        if (errorDeletingModel) return res.error(errorDeletingModel);

        res.ok();
    }
}

module.exports = new ConfigurationsController();
