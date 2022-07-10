const express = require("express");
const app = express();
const userServices = require("../services/user.service");

app.post("/add-user", userServices.getCreateUser);
app.get("/users", userServices.getListUser);

module.exports = app;
