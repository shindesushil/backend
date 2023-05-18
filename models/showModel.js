const mongoose = require("mongoose");

const showSchema = mongoose.Schema(
  {
    show_id: {
      type: String,
      required: true,
      ref: "User",
    },
    theatre_id: {
      type: String,
      required: [true, "Please add the theatre ID"],
    },
    movie_id: {
      type: String,
      required: [true, "Please add the movie ID"],
    },
    time_slot: {
      type: String,
      required: [true, "Please add the time slot"],
    },
    price_per_seat: {
        type: String,
        required: [true, "Please add the price per seat"],
    },
    regular_seat_available: {
        type: String,
        required: [true, "Please add the regular seat available"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Show", showSchema);