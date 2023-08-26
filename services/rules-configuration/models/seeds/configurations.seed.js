const process = require('process');
require('../../db');

const ConfigurationModel = require('../configurationModel');

/**
 * Default setup for a configuration object.
 * Helpful for development/testing purposes.
 */
const config = new ConfigurationModel({
    rules: [
        {
            type: 'range',
            propName: 'gasLimit',
            values: ['0', '1000000000000'],
        },
        {
            type: 'range',
            propName: 'value',
            values: ['1000', '1000000000000'],
        },
        {
            type: 'equality',
            propName: 'from',
            values: ['0x5FDFA49a292796724B745682f4055f3a8F0142b7', '0x5FDFA49a292796724B745682f4055f3a8F0142b7'],
        }
    ],
});

config.save().then(() => {
    console.log('Done!');
    process.exit();
}).catch(console.error);
