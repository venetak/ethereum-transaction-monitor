const mongoose = require('mongoose');
const { dbAddress } = require('./config/config');

module.exports = mongoose.connect(dbAddress);
