const express = require("express");
const router = express.Router();
const {
  getTheatres,
  createTheatre,
  getTheatre,
  updateTheatre,
  deleteTheatre
} = require("../controllers/theaterController");
const validateToken = require("../middleware/validateTokenHandler");

router.use(validateToken);
router.route("/").get(getTheatres).post(createTheatre);
router.route("/:id").get(getTheatre).put(updateTheatre).delete(deleteTheatre);



module.exports = router;