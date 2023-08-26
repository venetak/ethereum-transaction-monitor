const sha256 = require('crypto-js/sha256');

module.exports = sha256('password').toString();
