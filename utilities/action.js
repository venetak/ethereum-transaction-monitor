const Response = require('./response');

module.exports = (action) => {
    return (req, res) => {
        console.log(req.method, req.url);
        action(req, new Response(res));
    };
};
