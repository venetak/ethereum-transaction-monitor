const statusCodes = require('../../../utilities/statusCodes');
const { unauthorized } = require('../../../utilities/errorCodes');
const secret = require('../config/secret');

module.exports = (req, res, next) => {
    if (req.headers.secret === secret) return next();
    return res.error(unauthorized, statusCodes.Unauthorized);
};
