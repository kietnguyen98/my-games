const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const matchingSchema = new Schema(
  {
    userName: {
      type: String,
      required: true,
    },
    playMode: {
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

const Matching = mongoose.model("Matching", matchingSchema);

module.exports = Matching;
