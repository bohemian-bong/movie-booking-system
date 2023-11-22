import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom'

const Event = (props) => {
  // Sample movie data
  const { id } = useParams();
  const [movie, setmovie] = useState([]);
  const [reviews, setreviews] = useState([]);
  const [showtimes, setshowtimes] = useState([]);
    useEffect(()=>{
        
        const getProduct = async ()=>{
            const response = await fetch(`http://localhost:5000/api/v1/products/${id}`, {
                method: "GET"
            });
            const json = await response.json();
            setmovie(json.product);
        }
        getProduct();
        const getReviews = async ()=>{
            const response = await fetch(`http://localhost:5000/api/v1/products/${id}/reviews`, {
                method: "GET"
            });
            const json = await response.json();
            setreviews(json.reviews)
        }
        getReviews();
        const showTimes = async ()=>{
            const response = await fetch(`http://localhost:5000/api/v1/products/${id}/showtimes`, {
                method: "GET"
            });
            const json = await response.json();
            setshowtimes(json.showtimes)
        }
        showTimes();
    },[id])
  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card mb-5">
            <img src={movie.image} className="card-img-top" alt={movie.name} />
            <div className="card-body">
              <h5 className="card-title">{movie.name}</h5>
              <p className="card-text">Rating: {movie.averageRating}</p>
              <p className="card-text">
                <strong>Cast:</strong> {movie.cast? movie.cast.join(', '):""}
              </p>
              <p className="card-text">
                <strong>Director:</strong> {movie.director}
              </p>
              <p className="card-text">
                <strong>Description:</strong> {movie.description}
              </p>
              <p className="card-text">
                <strong>Genres:</strong> {movie.genre? movie.genre.join(', '):""}
              </p>
              <p className="card-text">
                <strong>Number of Reviews:</strong> {movie.numOfReviews}
              </p>
              {Object.keys(props.user).length === 0 ? (
                // If user is empty, show Login button
                <Link to="/login" className="btn btn-outline-primary"><i className="fa-solid fa-arrow-right-to-bracket mx-1"></i>Login to proceed Forward</Link>
              ) : (
                // If user is not empty, show Logout button

                  <Link to={`/book/${id}`} className="btn btn-outline-primary mx-1"><i className="fa-solid fa-user mx-1"></i>Book Tickets</Link>
                 
                
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
                {reviews.length > 0 ? (
                  <ul className="list-group">
                    {showtimes.map((showtime, index) => (
                      <li key={index} className="list-group-item">
                        <strong>{showtime.startAt}</strong>: {(new Date(showtime.startDate).toLocaleString()).split(',')[0]} - {(new Date(showtime.endDate).toLocaleString()).split(',')[0]}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p>No Showtimes available.</p>
                )}
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Event;
