const mongoose = require('mongoose');
const types = ['range', 'equality'];

const ConfigurationSchema = new mongoose.Schema({
    rules: [{
        type: { type: String, enum: types },
        name: String,
        value: [{ type: mongoose.Schema.Types.Mixed }],
        // value: [{ type: String }], TODO: decide which one to use
    }],
});

const Configuration = mongoose.model('Configuration', ConfigurationSchema);

module.exports = Configuration;
