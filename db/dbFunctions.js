const operations = require("./dbOperations");

module.exports = {
    getSongs: res => operations.getSongs().then(data => {
        res.send(data);
    }, err => {
        res.sendStatus(404);
    })
}