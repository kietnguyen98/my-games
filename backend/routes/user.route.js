const express = require("express");
const app = express();
const userModel = require("../models/user.model");

app.post("/add-user", async (request, response) => {
  const userName = request.body.userName;
  const playMode = request.body.playMode;
  const playTime = request.body.playTime;

  if (userName && playMode && playTime) {
    const user = new userModel({
      userName,
      playMode,
      playTime,
    });

    try {
      await user.save();
      response.json(user);
    } catch (error) {
      console.log(error);
      response.status(400).send(error);
    }
  } else {
    response.status(400).send("missing data field !");
  }
});

app.get("/users", async (request, response) => {
  const users = await userModel.find({}).sort({ playTime: 1 }).limit(5);

  try {
    response.json(users);
  } catch (error) {
    response.status(500).send(error);
  }
});

module.exports = app;
