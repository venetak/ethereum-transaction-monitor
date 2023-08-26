const secret = require('./config/secret');

module.exports = (req, res, next) => {
    req.headers.secret = secret;
    next();
};
