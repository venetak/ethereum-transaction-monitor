const TransactionsMonitor = require('./transactionsMonitor');

const transactionMonitor = new TransactionsMonitor();

const express = require('express');
const session = require('express-session');

const SESSION_AGE = 365 * 24 * 60 * 60 * 1000;
const app = express();

app.use(session({
  secret: 'keyboard cat',
  resave: false,
  name: 'api-session-key',
  saveUninitialized: true,
  cookie: { maxAge: SESSION_AGE },
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const port = 9000;

require('./config/routes')(app);
require('./db');

transactionMonitor.monitorTransactions();

app.listen(port, () => {
    console.log(`Transactions Service listening at http://localhost:${port}`);
});
