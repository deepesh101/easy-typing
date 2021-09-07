const express = require("express");
const cors = require("cors");
const letters = require("./letters");
const generateWord = require("./word");
const app = express();
app.use(express.json());
app.use(express.static("public"));
app.use(cors());

app.get("/", (req, res) => {
    res.sendFile(__dirname+"/index.html");
});

app.get("/request", (req, res) => {
    var {lang, word} = req.query;
    res.send(generateWord(word));
});

app.get("/edit-shorthands", (req, res) => {
    res.sendFile(__dirname+"/shorthands.html");
});

app.listen(3000, () => {
    console.log("Server started at port 3000");
});