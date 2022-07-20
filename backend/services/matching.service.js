const matchingModel = require("../models/matching.model");

const matchingServices = {};
matchingServices.createMatchingHighScore = async (request, response) => {
  const userName = request.body.userName;
  const playMode = request.body.playMode;
  const playTime = request.body.playTime;

  if (userName && playMode && playTime) {
    const matchingHighScore = new matchingModel({
      userName,
      playMode,
      playTime,
    });

    try {
      await matchingHighScore.save();
      response.json(matchingHighScore);
    } catch (error) {
      console.log(error);
      response.status(400).send(error);
    }
  } else {
    response.status(400).send("missing data field !");
  }
};

matchingServices.getListMatchingHighScore = async (request, response) => {
  const playMode = request.query.playMode;
  const listMatchingHighScore = await matchingModel
    .find({ playMode: playMode })
    .sort({ playTime: 1 })
    .limit(5);

  try {
    response.json(listMatchingHighScore);
  } catch (error) {
    response.status(500).send(error);
  }
};

module.exports = matchingServices;
