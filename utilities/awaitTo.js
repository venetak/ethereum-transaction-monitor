module.exports = (promise) => {
    return new Promise(resolve => {
        promise
            .then((data) => resolve([null, data]))
            .catch((error) => resolve([error, null]));
    });
};
