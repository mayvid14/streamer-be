const express = require('express');
const app = express();
const fs = require('fs');
const _ = require('lodash');
const config = JSON.parse(fs.readFileSync('./config.json'));

app.get('/', (req, res) => {
    res.send("hello");
});

const port = _.get(config, "PORT", 8080);
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});