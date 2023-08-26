const TransactionsController = require('../controllers/transactionsController');
const action = require('../../../utilities/action');
const auth = require('../middlewares/auth');

module.exports = (app) => {
    app.get('/transactions',               action(auth),              action(TransactionsController.getAll));
    app.post('/configuration',             action(auth),              action(TransactionsController.updateConfiguration));
};
