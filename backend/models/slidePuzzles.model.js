const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const slidePuzzlesSchema = new Schema(
  {
    userName: {
      type: String,
      required: true,
    },
    playTime: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const SlidePuzzles = mongoose.model("SlidePuzzles", slidePuzzlesSchema);

module.exports = SlidePuzzles;
