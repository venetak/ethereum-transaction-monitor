const { Unauthorized } = require('../../../utilities/statusCodes');
const { invalid_id } = require('../../../utilities/errorCodes');
const mongoose = require('mongoose');

module.exports = (req, res, next) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) return res.error(invalid_id, Unauthorized);
    next();
};
