var moment = require('moment');

var generateMessage = (from, text) => {
    return {
        from,
        text,
        createdAt: moment().valueOf()
    };
};

var generateLocationMessage = (from, latidude, longitude) => {
    return {
        from,
        url: `https://www.google.com/maps?q=${latidude},${longitude}`,
        createdAt: moment().valueOf()
    };
};

module.exports = {
    generateMessage, 
    generateLocationMessage
};