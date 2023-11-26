import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

const Event = (props) => {
  const { id } = useParams();
  const [movie, setMovie] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [showtimes, setShowtimes] = useState([]);
  const [newReview, setNewReview] = useState({
    rating: 5,
    title: '',
    comment: '',
  });
  const [alertMessage, setAlertMessage] = useState(null);

  useEffect(() => {
    const getProduct = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/v1/products/${id}`, {
          method: 'GET',
        });
        const json = await response.json();
        setMovie(json.product);
      } catch (error) {
        console.error('Error fetching product:', error.message);
      }
    };

    getProduct();

    const getReviews = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/v1/products/${id}/reviews`, {
          method: 'GET',
        });
        const json = await response.json();
        setReviews(json.reviews);
      } catch (error) {
        console.error('Error fetching reviews:', error.message);
      }
    };

    getReviews();

    const getShowtimes = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/v1/products/${id}/showtimes`, {
          method: 'GET',
        });
        const json = await response.json();
        setShowtimes(json.showtimes);
      } catch (error) {
        console.error('Error fetching showtimes:', error.message);
      }
    };

    getShowtimes();
  }, [id]);
  const refreshProduct = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/v1/products/${id}`, {
        method: 'GET',
      });
      const json = await response.json();
      setMovie(json.product);
    } catch (error) {
      console.error('Error fetching product:', error.message);
    }
  };
  const handleAddReview = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/v1/reviews', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          product: id,
          rating: newReview.rating,
          title: newReview.title,
          comment: newReview.comment,
        }),
      });

      const json = await response.json();

      if (response.ok) {
        setReviews((prevReviews) => [...prevReviews, json.review]);
        setNewReview({
          rating: 5,
          title: '',
          comment: '',
        });
        setAlertMessage({ type: 'success', message: 'Review added successfully!' });
        refreshProduct();
      } else {
        setAlertMessage({ type: 'danger', message: json.msg });
      }
    } catch (error) {
      console.error('Error adding review:', error.message);
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card mb-5">
            <img src={`http://localhost:5000${movie.image}`} className="card-img-top img-thumbnail d-block mx-auto" style={{ maxWidth: '50%' }} alt={movie.name} />
            <div className="card-body">
              <h5 className="card-title">{movie.name}</h5>
              <p className="card-text">Rating: {movie.averageRating}</p>
              <p className="card-text">
                <strong>Cast:</strong> {movie.cast ? movie.cast.join(', ') : ''}
              </p>
              <p className="card-text">
                <strong>Director:</strong> {movie.director}
              </p>
              <p className="card-text">
                <strong>Description:</strong> {movie.description}
              </p>
              <p className="card-text">
                <strong>Genres:</strong> {movie.genre ? movie.genre.join(', ') : ''}
              </p>
              <p className="card-text">
                <strong>Number of Reviews:</strong> {movie.numOfReviews}
              </p>
              {Object.keys(props.user).length === 0 ? (
                <Link to="/login" className="btn btn-outline-primary">
                  <i className="fa-solid fa-arrow-right-to-bracket mx-1"></i>Login to proceed Forward
                </Link>
              ) : (
                <Link to={`/book/${id}`} className="btn btn-outline-primary mx-1">
                  <i className="fa-solid fa-user mx-1"></i>Book Tickets
                </Link>
              )}
            </div>
            <div className="card-body">
              <div className="mt-4">
                <h5 className="card-title">Reviews</h5>
                {reviews.length > 0 ? (
                  <ul className="list-group">
                    {reviews.map((review, index) => (
                      <li key={index} className="list-group-item">
                        <strong>{review.title}</strong>: {review.comment}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p>No reviews available.</p>
                )}
              </div>
              <div className="mt-4">
                <h5 className="card-title">Show Timings</h5>
                {showtimes.length > 0 ? (
                  <ul className="list-group">
                    {showtimes.map((showtime, index) => (
                      <li key={index} className="list-group-item">
                        <strong>{showtime.startAt}</strong>:{' '}
                        {(new Date(showtime.startDate).toLocaleString()).split(',')[0]} -{' '}
                        {(new Date(showtime.endDate).toLocaleString()).split(',')[0]}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p>No Showtimes available.</p>
                )}
              </div>
              <div className="mt-4">
                <h5 className="card-title">Add a Review</h5>
                {alertMessage && (
                  <div className={`alert alert-${alertMessage.type}`} role="alert">
                    {alertMessage.message}
                  </div>
                )}
                <div className="form-group">
                  <label htmlFor="rating">Rating:</label>
                  <select
                    className="form-control"
                    id="rating"
                    name="rating"
                    value={newReview.rating}
                    onChange={(e) => setNewReview({ ...newReview, rating: e.target.value })}
                  >
                    {[1, 2, 3, 4, 5].map((value) => (
                      <option key={value} value={value}>
                        {value}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="title">Title:</label>
                  <input
                    type="text"
                    className="form-control"
                    id="title"
                    name="title"
                    value={newReview.title}
                    onChange={(e) => setNewReview({ ...newReview, title: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="comment">Comment:</label>
                  <textarea
                    className="form-control"
                    id="comment"
                    name="comment"
                    value={newReview.comment}
                    onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                  ></textarea>
                </div>
                <button className={`${Object.keys(props.user).length === 0 ?'btn btn-primary disabled mt-2':'btn btn-primary mt-2'}`} onClick={handleAddReview}>
                  Add Review
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Event;
