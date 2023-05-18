const mongoose = require("mongoose");

const movieSchema = mongoose.Schema(
  {
    movie_id: {
      type: String,
      required: true,
      ref: "User",
    },
    movieName: {
      type: String,
      required: [true, "Please add the Movie name"],
    },
    language: {
      type: String,
      required: [true, "Please add the Movie language"],
    },
    duration: {
      type: String,
      required: [true, "Please add the Movie Duration"],
    },
    thumbnail: {
      type: String,
      required: [true, "Please provide thumbnail"]
    }
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Movie", movieSchema);