const ConfigurationsController = require('../controllers/configurationsController');
const action = require('../../../utilities/action');
const validateId = require('../middlewares/validateId');

module.exports = (app) => {
    app.get('/configurations',                                      action(ConfigurationsController.getAll));
    app.get('/configurations/:id',            action(validateId),           action(ConfigurationsController.getOne));

    app.post('/configurations',                                     action(ConfigurationsController.create));

    app.put('/configurations/:id',             action(validateId),          action(ConfigurationsController.update));

    app.delete('/configurations/:id',          action(validateId),          action(ConfigurationsController.delete));
};
