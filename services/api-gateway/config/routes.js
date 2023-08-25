const auth = require('../auth');

const rulesConfigurationServiceRoutes = (app, proxy) => {
    app.get('/configurations',                auth,          proxy);
    app.get('/configurations/:id',            auth,          proxy);

    app.post('/configurations',               auth,          proxy);

    app.put('/configurations/:id',            auth,          proxy);

    app.delete('/configurations/:id',         auth,          proxy);
};

module.exports = {
    rulesConfigurationServiceRoutes,
};
