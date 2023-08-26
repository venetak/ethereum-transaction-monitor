const ConfigurationsController = require('../controllers/configurationsController');
const action = require('../../../utilities/action');
const auth = require('../middlewares/auth');

module.exports = (app) => {
    app.post('/configuration',             action(auth),              action(ConfigurationsController.updateConfiguration));
};
