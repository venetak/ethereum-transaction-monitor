const to = require('../../../utilities/awaitTo');
const statusCodes = require('../../../utilities/statusCodes');
const events = require('../events');

class ConfigurationsController {
    async update (req, res) {
        // pass whole config or only the id?
        events.emit('update-configuration', req.body);

        // handle errors? - validate body and return err if invalid?
        res.ok();
    }
}

module.exports = new TransactionsController();
