const express = require("express");
const router = express.Router();
const {
  getMovieReviews,
  insertMovieReview,
  deleteMovieReview,
  updateMovieReview,
} = require("../controllers/controller");

router.route("/get").get(getMovieReviews);
router.route("/insert").post(insertMovieReview);
router.route("/delete/:movie").delete(deleteMovieReview);
router.route("/update").put(updateMovieReview);

module.exports = router;
