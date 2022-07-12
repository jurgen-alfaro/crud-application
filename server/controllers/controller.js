const db = require("../config/db");

// Routes
const getMovieReviews = async (req, res) => {
  const q = "SELECT * FROM movie_reviews";
  await db.query(q, (err, result) => {
    if (err) console.log(err);
    res.send(result);
  });
};

const insertMovieReview = async (req, res) => {
  const movieName = req.body.movieName;
  const movieReview = req.body.movieReview;

  const q = "INSERT INTO movie_reviews (movieName, movieReview) VALUES (?, ?)";
  await db.query(q, [movieName, movieReview], (err, result) => {
    console.log(result);
  });
};

const deleteMovieReview = async (req, res) => {
  const movie = req.params.movie;
  const q = "DELETE FROM movie_reviews WHERE movieName = ?";
  await db.query(q, movie, (err, result) => {
    if (err) console.log(err);
    res.send(result);
  });
};

const updateMovieReview = async (req, res) => {
  const movieName = req.body.movieName;
  const movieReview = req.body.movieReview;
  const q = "UPDATE movie_reviews SET movieReview = ? WHERE movieName = ?";

  await db.query(q, [movieReview, movieName], (err, result) => {
    if (err) console.log(err);
    res.send(result);
  });
};

module.exports = {
  getMovieReviews,
  insertMovieReview,
  deleteMovieReview,
  updateMovieReview,
};
