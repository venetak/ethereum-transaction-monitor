const mongoose = require('mongoose');
const { dbConfig } = require('./config/urls');

module.exports = mongoose.connect(dbConfig);
