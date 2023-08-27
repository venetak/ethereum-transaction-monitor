function isJSON (data) {
    try {
        JSON.parse(data);
        return true;
    } catch {
        return false;
    }
};

module.exports = {
    isJSON,
};
