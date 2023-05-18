const asyncHandler = require("express-async-handler");
const v4 = require("uuid").v4
const Movie = require("../models/movieModel");
//@desc Get all movies
//@route GET /api/movies
//@access private
const getMovies = asyncHandler(async (req, res) => {
  // res.status(200).json({msg: "test"});
  console.log('In get Movies');
  const movies = await Movie.find();
  res.status(200).json(movies);
});

//@desc Create New movie
//@route POST /api/movies
//@access private
const createMovie = asyncHandler(async (req, res) => {
  console.log("The request body is :", req.body);
  const { movieName,language,duration, thumbnail } = req.body;
  if ( !movieName || !language || !duration || !thumbnail) {
    res.status(400);
    throw new Error("All fields are mandatory !");
  }
  const movie = await Movie.create({
    movie_id: v4(),
    movieName,
    language,
    duration,
    thumbnail
  });

  res.status(201).json(movie);
});

//@desc Get movie
//@route GET /api/movies/:id
//@access private
const getMovie = asyncHandler(async (req, res) => {
  console.log('Movie ID: ', req.params.id);
  const movie = await Movie.findOne({movie_id: req.params.id});
  if (!movie) {
    res.status(404);
    throw new Error("Movie not found");
  }
  res.status(200).json(movie);
});

//@desc Update movie
//@route PUT /api/movies/:id
//@access private
const updateMovie = asyncHandler(async (req, res) => {
  const movie = await Movie.findById(req.params.id);
  if (!movie) {
    res.status(404);
    throw new Error("Movie not found");
  }

  // if (movie.movie_id.toString() !== req.user.id) {
  //   res.status(403);
  //   throw new Error("User don't have permission to update other movies");
  // }

  const updatedMovie = await Movie.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );

  res.status(200).json(updatedMovie);
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

//@desc Delete movie
//@route DELETE /api/movies/:id
//@access private
const deleteMovie = asyncHandler(async (req, res) => {
  const movie = await Movie.findById(req.params.id);
  if (!movie) {
    res.status(404);
    throw new Error("Contact not found");
  }
  // if (movie.movie_id.toString() !== req.user.id) {
  //   res.status(403);
  //   throw new Error("User don't have permission to update other Movie Details");
  // }
  await Movie.deleteOne({ _id: req.params.id });
  res.status(200).json(movie);
});

module.exports = {
  getMovies,
  createMovie,
  getMovie,
  updateMovie,
  deleteMovie,
};