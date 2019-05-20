const audio = require("./audioSchema");

module.exports = {
    getSongs: cb => {
        audio.search({ match_all: {} }, {
            sort: [{
                title: { order: 'asc' }
            }]
        }, cb);
    },

    addSong: (obj, cb) => {
        const song = new audio(obj);
        song.save(cb);
    }
};