const express = require('express');
const path = require('path');
const app = express();
const cors = require('cors');

let videos = ["6okxuiiHx2w"];

app.use(cors());

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/index.html'));
});

app.get('/add/:id', (req, res) => {
    videos.push(req.params.id);
    res.sendStatus(200);
});

app.get('/songs', (req, res) => {
    res.send(videos);
});

app.listen(5000);