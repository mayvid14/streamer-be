const express = require('express');
const app = express();
const fs = require('fs');
const path = require('path');
const _ = require('lodash');
const cors = require('cors');
const multer = require('multer');
const bodyParser = require('body-parser');
const config = JSON.parse(fs.readFileSync('./config.json'));
const dbFunctions = require("./db/dbFunctions");

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const relPath = file.fieldname === 'audio' ? _.get(config, "RELATIVE_PATH", ["..", "audio"]) : _.get(config, "IMG_PATH", ["..", "image"]);
        console.log("RELPATH "+relPath);
        const dirPath = path.join(__dirname, ...relPath);
        cb(null, dirPath);
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + file.originalname);
    }
});
const upload = multer({ storage });

app.get('/', (req, res) => {
    res.send("hello");
});

const fields = upload.fields([{ name: 'image', maxCount: 1 }, { name: 'audio', maxCount: 1 }]);
app.post('/track', fields, (req, res) => {
    console.log(req.files);
    const audioFile = {
        title: req.body.title,
        artist: req.body.artist,
        url: req.files['audio'][0].path,
        image: req.files['image'][0].path
    };
    dbFunctions.addSong(audioFile, res);
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
});

app.get('/img/:name', (req, res) => {
    const relPath = _.get(config, "IMG_PATH", ["..", "image"]);
    const dirPath = path.join(__dirname, ...relPath, req.params.name);
    res.sendFile(dirPath);
});

const port = _.get(config, "PORT", 8080);
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});