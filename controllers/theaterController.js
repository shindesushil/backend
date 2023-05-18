const asyncHandler = require("express-async-handler");
const Theatre = require("../models/theaterModel");
//@desc Get all theatres
//@route GET /api/theatres
//@access private
const getTheatres = asyncHandler(async (req, res) => {
  const theatres = await Theatre.find({ theatre_id: req.user.id });
  res.status(200).json(theatres);
});

//@desc Create New Theatre
//@route POST /api/theatres
//@access private
const createTheatre = asyncHandler(async (req, res) => {
  console.log("The request body is :", req.body);
  const { theatre_id,theatreName,metroLocation,district,numberOfShows,seatingCapacity } = req.body;

  if ( !theatre_id||!theatreName||!metroLocation||!district||!numberOfShows||!seatingCapacity) {
    res.status(400);
    throw new Error("All fields are mandatory !");
  }
  const theatre = await Theatre.create({
    theatre_id:req.user.id,
    theatreName,
    metroLocation,
    district,
    numberOfShows,
    seatingCapacity
  });

  res.status(201).json(theatre);
});

//@desc Get Theatre
//@route GET /api/theatres/:id
//@access private
const getTheatre = asyncHandler(async (req, res) => {
  const theatre = await Theatre.findById(req.params.id);
  if (!theatre) {
    res.status(404);
    throw new Error("Theatre Not Found!!!");
  }
  res.status(200).json(theatre);
});

//@desc Update Theatre
//@route PUT /api/theatres/:id
//@access private
const updateTheatre = asyncHandler(async (req, res) => {
  const theatre = await Theatre.findById(req.params.id);
  if (!theatre) {
    res.status(404);
    throw new Error("Theatre Not Found!!!");
  }

  if (theatre.theatre_id.toString() !== req.theatre.id) {
    res.status(403);
    throw new Error("User don't have permission to update Theatre Details");
  }

  const updatedTheatre = await Theatre.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );

  res.status(200).json(updatedTheatre);
});

//@desc Delete theatre
//@route DELETE /api/theatres/:id
//@access private
const deleteTheatre = asyncHandler(async (req, res) => {
  const theatre = await Theatre.findById(req.params.id);
  if (!theatre) {
    res.status(404);
    throw new Error("Theatre not found");
  }
  if (theatre.theatre_id.toString() !== req.user.id) {
    res.status(403);
    throw new Error("User don't have permission to update Theatres Details");
  }
  await Theatre.deleteOne({ _id: req.params.id });
  res.status(200).json(theatre);
});

module.exports = {
    getTheatres,
    createTheatre,
    getTheatre,
    updateTheatre,
    deleteTheatre

};
