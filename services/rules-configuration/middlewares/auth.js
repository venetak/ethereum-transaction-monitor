const statusCodes = require('../../../utilities/statusCodes');
const { unauthorized } = require('../../../utilities/errorCodes');
const secret = require('../config/secret');

/**
 * An auth middleware that check if the secret passed in the headers is correct.
 * Will fail if the secret is not set or wrong.
 * @param {Object} req - the request object
 * @param {Object} res - a Response instance wrapping the response object
 * @param {function} next - the next middleware
 */
module.exports = (req, res, next) => {
    if (req.headers.secret === secret) return next();
    return res.error(unauthorized, statusCodes.Unauthorized);
};
