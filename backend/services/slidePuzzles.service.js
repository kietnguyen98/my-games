const slidePuzzlesModel = require("../models/slidePuzzles.model");

const slidePuzzlesServices = {};
slidePuzzlesServices.createSlidePuzzlesHighScore = async (
  request,
  response
) => {
  const userName = request.body.userName;
  const playTime = request.body.playTime;

  if (userName && playTime) {
    const matchingHighScore = new slidePuzzlesModel({
      userName,
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

slidePuzzlesServices.getListSlidePuzzlesHighScore = async (
  request,
  response
) => {
  const listSlidePuzzlesHighScore = await slidePuzzlesModel
    .find()
    .sort({ playTime: 1 })
    .limit(5);
  try {
    response.json(listSlidePuzzlesHighScore);
  } catch (error) {
    response.status(500).send(error);
  }
};

module.exports = slidePuzzlesServices;
