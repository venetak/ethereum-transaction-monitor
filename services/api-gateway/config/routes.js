const rulesConfigurationServiceRoutes = (app, proxy) => {
    app.get('/configurations',                          proxy);
    app.get('/configurations/:id',                      proxy);

    app.post('/configurations',                         proxy);

    app.put('/configurations/:id',                      proxy);

    app.delete('/configurations/:id',                   proxy);
};

module.exports = {
    rulesConfigurationServiceRoutes,
};
