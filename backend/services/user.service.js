const userModel = require("../models/user.model");

const userServices = {};
userServices.getCreateUser = async (request, response) => {
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
};

userServices.getListUser = async (request, response) => {
  const playMode = request.query.playMode;
  const users = await userModel
    .find({ playMode: playMode })
    .sort({ playTime: 1 })
    .limit(5);

  try {
    response.json(users);
  } catch (error) {
    response.status(500).send(error);
  }
};

module.exports = userServices;
