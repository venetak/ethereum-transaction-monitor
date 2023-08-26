const { Unauthorized } = require('../../../utilities/statusCodes');
const { invalid_id } = require('../../../utilities/errorCodes');
const mongoose = require('mongoose');

/**
 * A middleware that validates if the type parameter is a valid mongoose id.
 * @param {Object} req - the request object
 * @param {Object} res - a Response instance wrapping the response object
 * @param {function} next - the next middleware
 */
module.exports = (req, res, next) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) return res.error(invalid_id, Unauthorized);
    next();
};
