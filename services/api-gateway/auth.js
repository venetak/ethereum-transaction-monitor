const secret = require('./config/secret');
const sha256 = require('crypto-js/sha256');

module.exports = (req, res, next) => {
    req.headers.secret = sha256(secret).toString();
    next();
};
