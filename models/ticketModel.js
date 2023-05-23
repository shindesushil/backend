const mongoose = require("mongoose");

const ticketSchema = mongoose.Schema(
  {
    showID: {
      type: String,
      required: [true, "Show not selected"],
    },
    userID: {
      type: String,
      required: [true, "User not selected"],
    },
    numberOfSeats: {
      type: Number,
      required: [true, "Specify number of seats"],
    },
    totalAmount: {
        type: String,
        required: [true, "Specify number of seats"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Ticket", ticketSchema);