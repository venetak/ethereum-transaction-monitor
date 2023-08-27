const express = require('express');
const httpProxy = require('express-http-proxy');
const app = express();
var cors = require('cors');

app.use(cors());

const port = 9444;

const { rulesConfigurationServiceRoutes } = require('./config/routes');
const { rulesConfigurationService } = require('./config/urls');

const { transactionsServiceRoutes } = require('./config/routes');
const { transactionsService } = require('./config/urls');

const rulesConfigurationServiceProxy = httpProxy(rulesConfigurationService);
rulesConfigurationServiceRoutes(app, rulesConfigurationServiceProxy);

const transactionsServiceProxy = httpProxy(transactionsService);
transactionsServiceRoutes(app, transactionsServiceProxy);

app.listen(port, () => {
    console.log(`API Gateway listening at http://localhost:${port}`);
});
