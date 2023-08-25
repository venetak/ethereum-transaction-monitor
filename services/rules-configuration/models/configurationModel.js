const mongoose = require('mongoose');

const ConfigurationSchema = new mongoose.Schema({
    rules: [{ name: String, range: [Number] }],
});

const Configuration = mongoose.model('Configuration', ConfigurationSchema);

module.exports = Configuration;
