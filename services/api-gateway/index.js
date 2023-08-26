const express = require('express');
const httpProxy = require('express-http-proxy');
const app = express();

const { rulesConfigurationServiceRoutes } = require('./config/routes');
const { rulesConfigurationService } = require('./config/urls');

const port = 9444;

const rulesConfigurationServiceProxy = httpProxy(rulesConfigurationService);
rulesConfigurationServiceRoutes(app, rulesConfigurationServiceProxy);

app.listen(port, () => {
    console.log(`API Gateway listening at http://localhost:${port}`);
});
