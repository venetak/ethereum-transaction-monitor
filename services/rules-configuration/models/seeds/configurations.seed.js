const process = require('process');
require('../../db');

const ConfigurationModel = require('../configurationModel');

const config = new ConfigurationModel({
    rules: [
        {
            type: 'range',
            name: 'confirmations',
            value: ['0', '20'],
        },
        {
            type: 'range',
            name: 'gasLimit',
            value: ['0', '20'],
        },
        {
            type: 'range',
            name: 'value',
            value: [0, 20],
        },
        {
            type: 'equality',
            name: 'from',
            value: ['0x5FDFA49a292796724B745682f4055f3a8F0142b7', '0x5FDFA49a292796724B745682f4055f3a8F0142b7'],
        }
    ],
});

config.save().then(() => {
    console.log('Done!');
    process.exit();
}).catch(console.error);
