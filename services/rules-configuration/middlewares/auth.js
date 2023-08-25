const statusCodes = require('../../../utilities/statusCodes');
const { unauthorized } = require('../../../utilities/errorCodes');
const sha256 = require('crypto-js/sha256');
const secret = require('../config/secret');

module.exports = (req, res, next) => {
    if (req.headers.secret === sha256(secret).toString()) return next();
    return res.error(unauthorized, statusCodes.Unauthorized);
};
