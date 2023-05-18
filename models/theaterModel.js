const mongoose = require("mongoose");

const theatreSchema = mongoose.Schema(
  {
    theatre_id: {
      type: String,
      required: true,
      ref: "User",
    },
    theatreName: {
      type: String,
      required: [true, "Please add the Theatre name"],
    },
    metroLocation: {
      type: String,
      required: [true, "Please add the Metro location name"],
    },
    district: {
      type: String,
      required: [true, "Please add the district"],
    },
    numberOfShows: {
      type: Number,
      required: [true, "Please add the number of shows"],
    },
    seatingCapacity: {
      type: Number,
      required: [true, "Please add the Seating Capacity"]
    },
    image:{
      type: String,
      require: [true, "Please Provide Theater Image"]
    }
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Theatre", theatreSchema);