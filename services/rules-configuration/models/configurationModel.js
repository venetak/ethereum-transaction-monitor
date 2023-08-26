const mongoose = require('mongoose');
const types = ['range', 'equality'];

const ConfigurationSchema = new mongoose.Schema({
    rules: [{
        type: { type: String, enum: types },
        propName: String,
        values: [{ type: mongoose.Schema.Types.Mixed }],
        // value: [{ type: String }], TODO: decide which one to use
    }],
}, { timestamps: true });

const Configuration = mongoose.model('Configuration', ConfigurationSchema);

module.exports = Configuration;
