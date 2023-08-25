const express = require('express');
const session = require('express-session');
const { resolve, join } = require('path');


const SESSION_AGE = 365 * 24 * 60 * 60 * 1000;
const app = express();

app.use(session({
  secret: 'keyboard cat',
  resave: false,
  name: 'api-session-key',
  saveUninitialized: true,
  cookie: { maxAge: SESSION_AGE },
}));

// app.use('/configurations', express.static(resolve(join(__dirname, '../admin'))))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const port = 3000;

require('./config/routes')(app);
require('./db');

app.listen(port, () => {
  console.log(`Rules Configurations app listening at http://localhost:${port}`);
});
