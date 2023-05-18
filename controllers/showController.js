const asyncHandler = require("express-async-handler");
const Show = require("../models/showModel");
//@desc Get all shows
//@route GET /api/shows
//@access private
const getShows = asyncHandler(async (req, res) => {
  const shows = await Show.find({ show_id: req.user.id });
  res.status(200).json(shows);
});

//@desc Create New show
//@route POST /api/shows
//@access private
const createShow = asyncHandler(async (req, res) => {
  console.log("The request body is :", req.body);
  const { show_id,theatre_id,movie_id,time_slot,price_per_seat,regular_seat_available  } = req.body;
  if (!show_id || !theatre_id || !movie_id||!time_slot || !price_per_seat || !regular_seat_available) {
    res.status(400);
    throw new Error("All fields are mandatory !");
  }
  const show = await Show.create({
    show_id:req.user.id,
    theatre_id,
    movie_id,
    time_slot,
    price_per_seat,
    regular_seat_available 
  });

  res.status(201).json(show);
});

//@desc Get show
//@route GET /api/shows/:id
//@access private
const getShow = asyncHandler(async (req, res) => {
  const show = await Show.findById(req.params.id);
  if (!show) {
    res.status(404);
    throw new Error("Show not found");
  }
  res.status(200).json(show);
});

//@desc Update show
//@route PUT /api/shows/:id
//@access private
const updateShow = asyncHandler(async (req, res) => {
  const show = await Show.findById(req.params.id);
  if (!show) {
    res.status(404);
    throw new Error("Show not found");
  }

  if (show.show_id.toString() !== req.user.id) {
    res.status(403);
    throw new Error("User don't have permission to update other Show Details");
  }

  const updatedShow = await Show.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );

  res.status(200).json(updatedShow);
});


// const updateContact = asyncHandler(async (req, res) => {
//   const contact = await Contact.findById(req.params.id);
//   if (!contact) {
//     res.status(404);
//     throw new Error("Contact not found");
//   }

//   if (contact.user_id.toString() !== req.user.id) {
//     res.status(403);
//     throw new Error("User don't have permission to update other user contacts");
//   }

//   const updatedContact = await Contact.findByIdAndUpdate(
//     req.params.id,
//     req.body,
//     { new: true }
//   );

//   res.status(200).json(updatedContact);
// });

//@desc Delete show
//@route DELETE /api/shows/:id
//@access private
const deleteShow = asyncHandler(async (req, res) => {
  const show = await Show.findById(req.params.id);
  if (!show) {
    res.status(404);
    throw new Error("Show not found");
  }
  if (show.show_id.toString() !== req.user.id) {
    res.status(403);
    throw new Error("User don't have permission to update other Show Details");
  }
  await Show.deleteOne({ _id: req.params.id });
  res.status(200).json(show);
});

module.exports = {
  getShows,
  createShow,
  getShow,
  updateShow,
  deleteShow,
};