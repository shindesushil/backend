const asyncHandler = require('express-async-handler')
const v4 = require('uuid').v4

const Ticket = require('../models/ticketModel')

//@desc Create New Ticket
//@route POST /api/ticket
//@access private
const createTicket = asyncHandler(async (req, res) => {
    console.log("The request body is :", req.body);
    const { showID, userID, numberOfSeats, totalAmount } = req.body;
    if ( !showID || !userID || !numberOfSeats || !totalAmount) {
      res.status(400);
      throw new Error("All fields are mandatory !");
    }
    const ticket = await Ticket.create({
      ticketID: v4(),
      showID,
      userID,
      numberOfSeats,
      totalAmount
    });
    res.status(201).json(ticket);
});


//@desc Get tickets
//@route GET /api/ticket/:id
//@access private
const getTickets = asyncHandler(async (req, res) => {
    // console.log('User ID: ', req.params.id);
    const ticket = await Ticket.find({userID: req.params.id});
    if (!ticket) {
      res.status(404);
      throw new Error("Tickets not found");
    }
    res.status(200).json(ticket);
  });


module.exports = {
    createTicket,
    getTickets
}
