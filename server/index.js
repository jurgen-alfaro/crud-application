const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");

// IMPORTANT
// It is not recommended using mysql, use mysql2 instead.
// See reason why: https://stackoverflow.com/questions/50093144/mysql-8-0-client-does-not-support-authentication-protocol-requested-by-server
const mysql = require("mysql");

const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "123456",
  database: "db_crudapp",
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

// Routes
app.get("/api/get", (req, res) => {
  const q = "SELECT * FROM movie_reviews";
  db.query(q, (err, result) => {
    if (err) console.log(err);
    res.send(result);
  });
});

app.post("/api/insert", (req, res) => {
  const movieName = req.body.movieName;
  const movieReview = req.body.movieReview;

  const q = "INSERT INTO movie_reviews (movieName, movieReview) VALUES (?, ?)";
  db.query(q, [movieName, movieReview], (err, result) => {
    console.log(result);
  });
});

app.delete("/api/delete/:movie", (req, res) => {
  const movie = req.params.movie;
  const q = "DELETE FROM movie_reviews WHERE movieName = ?";
  db.query(q, movie, (err, result) => {
    if (err) console.log(err);
    res.send(result);
  });
});

app.put("/api/update", (req, res) => {
  const movieName = req.body.movieName;
  const movieReview = req.body.movieReview;
  const q = "UPDATE movie_reviews SET movieReview = ? WHERE movieName = ?";

  db.query(q, [movieReview, movieName], (err, result) => {
    if (err) console.log(err);
    res.send(result);
  });
});

app.listen(3001, () => console.log("Server running on port 3001"));
