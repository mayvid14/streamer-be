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
    },

    initialize: () => {
        console.log("Syncing elasticsearch and mongodb");
        const stream = audio.synchronize();
        let count = 0;
        stream.on('data', function (err, doc) {
            count++;
        });
        stream.on('close', function () {
            console.log('indexed ' + count + ' songs!');
        });
        stream.on('error', function (err) {
            console.log(err);
        });
    }
};