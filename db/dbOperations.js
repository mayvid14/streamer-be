const audio = require("./audioSchema");

module.exports = {
    getSongs: () => audio.find().exec()
};