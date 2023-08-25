const process = require('process');
require('../../db');

const ConfigurationModel = require('../configurationModel');

const config = new ConfigurationModel({
    rules: [
        {
            name: 'confirmations',
            range: [0, 20],
        },
        {
            name: 'gasLimit',
            range: [0, 20],
        },
        {
            name: 'value',
            range: [0, 20],
        }
    ],
});

config.save().then(() => {
    console.log('Done!');
    process.exit();
}).catch(console.error);
