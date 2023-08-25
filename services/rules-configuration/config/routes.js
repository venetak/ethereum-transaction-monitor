const ConfigurationsController = require('../controllers/configurationsController');
const action = require('../../../utilities/action');

module.exports = (app) => {
    app.get('/configurations',                             action(ConfigurationsController.getAll));
    app.get('/configurations/:id',                         action(ConfigurationsController.getOne));

    app.post('/configurations',                            action(ConfigurationsController.create));

    app.put('/configurations/:id',                         action(ConfigurationsController.update));

    app.delete('/configurations/:id',                      action(ConfigurationsController.delete));
};
