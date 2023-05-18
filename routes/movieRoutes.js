const express = require("express");

const {
  getMovies,
  createMovie,
  getMovie,
  updateMovie,
  deleteMovie,
} = require("../controllers/movieController");

const validateToken = require("../middleware/validateTokenHandler");

const router = express.Router();

// router.use(validateToken);
router.get("/", getMovies)
// router.route("/").post(createMovie);
router.post("/", createMovie)
router.route("/:id").get(getMovie).put(updateMovie).delete(deleteMovie);

module.exports = router;