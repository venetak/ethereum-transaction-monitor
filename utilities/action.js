const Response = require('./response');

module.exports = (action) => {
    return (req, res, next) => {
        console.log(req.method, req.url);
        action(req, new Response(res), next);
    };
};
