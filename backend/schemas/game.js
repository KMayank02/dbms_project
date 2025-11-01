const mongoose = require("mongoose");

const game = new mongoose.Schema(
  {
    img_url: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    platform: {
      type: String,
      required: true,
    },
    studio: {
      type: String,
      required: true,
    },
    release_year: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("game", game);
