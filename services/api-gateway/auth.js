const secret = require('./config/secret');

/**
 * Authentication middleware. Sets a secret in the request headers.
 * @param {Object} req - the request object
 * @param {Object} res - the response object
 * @param {function} next - the next middleware
 */
module.exports = (req, res, next) => {
    req.headers.secret = secret;
    next();
};
