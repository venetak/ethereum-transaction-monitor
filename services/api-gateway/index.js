const express = require('express');
const httpProxy = require('express-http-proxy');
const app = express();

const { rulesConfigurationServiceRoutes } = require('./config/routes');
const { rulesConfigurationServiceURL } = require('./config/urls');

const port = 9444;

const rulesConfigurationServiceProxy = httpProxy(rulesConfigurationServiceURL);
rulesConfigurationServiceRoutes(app, rulesConfigurationServiceProxy);

app.listen(port, () => {
    console.log(`API Gateway listening at http://localhost:${port}`);
});
