import { useState, useEffect } from "react";
import "./App.css";
import Axios from "axios";

function App() {
  const [movieName, setMovieName] = useState("");
  const [review, setReview] = useState("");
  const [movieReviewList, setMovieReviewList] = useState([]);
  const [newReview, setNewReview] = useState("");

  useEffect(() => {
    Axios.get("http://localhost:3001/api/get").then((res) => {
      setMovieReviewList(res.data);
    });
  }, [movieReviewList]);

  const submitReview = () => {
    Axios.post("http://localhost:3001/api/insert", {
      movieName: movieName,
      movieReview: review,
    });

    setMovieReviewList([...movieReviewList], {
      movieName: movieName,
      movieReview: review,
    });
  };

  const deleteReview = (movie) => {
    Axios.delete(`http://localhost:3001/api/delete/${movie}`);
  };

  const updateReview = (movie) => {
    Axios.put("http://localhost:3001/api/update", {
      movieName: movie,
      movieReview: newReview,
    });

    setNewReview("");
  };

  return (
    <div className='App'>
      <h1>CRUD Application</h1>
      <div className='form'>
        <label htmlFor='movieName'>Movie Name:</label>
        <input
          type='text'
          name='movieName'
          onChange={(e) => setMovieName(e.target.value)}
        />
        <label htmlFor='review'>Review</label>
        <input
          type='text'
          name='review'
          onChange={(e) => setReview(e.target.value)}
        />
        <button type='button' onClick={submitReview}>
          Submit
        </button>
      </div>

      {movieReviewList.map((item, index) => {
        return (
          <div key={index} className='card'>
            <h1>{item.movieName}</h1>
            <p>{item.movieReview}</p>

            <button
              type='button'
              onClick={() => {
                deleteReview(item.movieName);
              }}
            >
              Delete
            </button>
            <input type='text' onChange={(e) => setNewReview(e.target.value)} />
            <button
              type='button'
              onClick={() => {
                updateReview(item.movieName);
              }}
            >
              Update
            </button>
          </div>
        );
      })}
    </div>
  );
}

export default App;
