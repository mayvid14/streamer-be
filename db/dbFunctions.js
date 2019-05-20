const operations = require("./dbOperations");

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