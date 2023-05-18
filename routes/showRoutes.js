const express = require("express");
const router = express.Router();
const {
  getShows,
  createShow,
  getShow,
  updateShow,
  deleteShow,
} = require("../controllers/showController");
const validateToken = require("../middleware/validateTokenHandler");

router.use(validateToken);
router.route("/").get(getShows).post(createShow);
router.route("/:id").get(getShow).put(updateShow).delete(deleteShow);

module.exports = router;