const operations = require("./dbOperations");
const _ = require("lodash");

module.exports = {
    getSongs: res => {
        operations.getSongs((err, data) => {
            if (err) {
                console.error(err);
                res.sendStatus(404);
            }
            res.send(data);
        });
    },

    getSongsByTerm: (term, res) => {
        operations.getSongsByTerm(term, (err, data) => {
            if (err) {
                console.error(err);
                res.sendStatus(404);
            }
            const objArray = _.get(data, ["hits","hits"], []);
            const songs = [];
            objArray.forEach(obj => {
                const song = {
                    title: _.get(obj, ["_source","title"], ""),
                    artist: _.get(obj, ["_source","artist"], ""),
                    url: _.get(obj, ["_source","url"], ""),
                    image: _.get(obj, ["_source","image"], ""),
                    id: _.get(obj, "_id", 0)
                };
                songs.push(song);
            });
            res.send(songs);
        });
    },

    addSong: (song, res) => {
        operations.addSong(song, err => {
            if (err) {
                console.error(err);
                res.sendStatus(500);
            }
            res.send({ success: true });
        });
    }
}