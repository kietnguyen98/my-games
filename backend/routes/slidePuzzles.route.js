const express = require("express");
const app = express();
const slidePuzzlesServices = require("../services/slidePuzzles.service");

app.post("/add-high-score", slidePuzzlesServices.createSlidePuzzlesHighScore);
app.get("/list-high-score", slidePuzzlesServices.getListSlidePuzzlesHighScore);

module.exports = app;
