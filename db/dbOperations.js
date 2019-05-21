const audio = require("./audioSchema");

module.exports = {
    getSongs: cb => {
        audio.search({ match_all: {} }, cb);
    },

    getSongsByTerm: (term, cb) => {
        audio.search({
            "multi_match": {
                "fields": ["title", "artist"],
                "query": (term),
                "type": "phrase_prefix"
            }
        }, cb);
    },

    addSong: (obj, cb) => {
        const song = new audio(obj);
        song.save(cb);
    }
};