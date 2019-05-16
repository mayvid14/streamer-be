const express = require('express');
const app = express();
const fs = require('fs');
const path = require('path');
const _ = require('lodash');
const config = JSON.parse(fs.readFileSync('./config.json'));

app.get('/', (req, res) => {
    res.send("hello");
});

app.get('/track', (req, res) => {
    const relPath = _.get(config, "RELATIVE_PATH", ["..", "audio"]);
    const filePath = path.join(__dirname, ...relPath, "aot.mp3");
    const stream = fs.createReadStream(filePath);

    console.log("Sending track");
    res.set('content-type', 'audio/mp3');
    res.set('accept-ranges', 'bytes');
    stream.on("data", chunk => {
        res.write(chunk);
    });

    stream.on("err", () => {
        res.sendStatus(404);
    });

    stream.on("end", () => {
        res.end();
        console.log("Ending track");
    });
});

const port = _.get(config, "PORT", 8080);
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});