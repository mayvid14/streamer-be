const express = require('express');
const app = express();
const fs = require('fs');
const path = require('path');
const _ = require('lodash');
const cors = require('cors');
const config = JSON.parse(fs.readFileSync('./config.json'));
const dbFunctions = require("./db/dbFunctions");

app.use(cors());

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

app.get('/track/def', (req, res) => {
    console.log("Returning default track");
    res.json({
        title: "Eren's Berserker theme",
        artist: "Attack on Titan",
        url: "http://localhost:8080/track",
        id: "1",
        image: "../../assets/images/aot.jpg"
    });
});

app.get('/tracks', (req, res) => {
    dbFunctions.getSongs(res);
})

const port = _.get(config, "PORT", 8080);
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});