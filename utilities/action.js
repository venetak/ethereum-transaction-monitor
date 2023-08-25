const Response = require('./response');

module.exports = (action) => {
    return (req, res, next) => {
        action(req, new Response(res), next);
    };
};
