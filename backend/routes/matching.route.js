const express = require("express");
const app = express();
const matchingServices = require("../services/matching.service");

app.post("/add-high-score", matchingServices.createMatchingHighScore);
app.get("/list-high-score", matchingServices.getListMatchingHighScore);

module.exports = app;
