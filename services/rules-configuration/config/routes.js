const ConfigurationsController = require('../controllers/configurationsController');
const action = require('../../../utilities/action');
const validateId = require('../middlewares/validateId');
const auth = require('../middlewares/auth');

module.exports = (app) => {
    app.get('/configurations',             action(auth),                             action(ConfigurationsController.getAll));
    app.get('/configurations/:id',         action(auth),      action(validateId),           action(ConfigurationsController.getOne));

    app.post('/configurations',            action(auth),                        action(ConfigurationsController.create));

    app.put('/configurations/:id',         action(auth),      action(validateId),          action(ConfigurationsController.update));

    app.delete('/configurations/:id',       action(auth),      action(validateId),          action(ConfigurationsController.delete));
};
