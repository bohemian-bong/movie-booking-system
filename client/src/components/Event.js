import React from 'react';
import { Link } from 'react-router-dom'

const Event = (props) => {
  // Sample movie data
  const movie = props.event;
  console.log(movie)
  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card">
            <img src={movie.image} className="card-img-top" alt={movie.name} />
            <div className="card-body">
              <h5 className="card-title">{movie.name}</h5>
              <p className="card-text">Rating: {movie.avgRating}</p>
              <p className="card-text">
                {/* <strong>Cast:</strong> {movie.cast.join(', ')} */}
              </p>
              <p className="card-text">
                <strong>Director:</strong> {movie.director}
              </p>
              <p className="card-text">
                <strong>Description:</strong> {movie.description}
              </p>
              <p className="card-text">
                {/* <strong>Genres:</strong> {movie.genre.join(', ')} */}
              </p>
              {Object.keys(props.user).length === 0 ? (
                // If user is empty, show Login button
                <button className="btn btn-outline-primary disabled"><i className="fa-solid fa-arrow-right-to-bracket mx-1"></i>Login to proceed Forward</button>
              ) : (
                // If user is not empty, show Logout button
                <div>
                  <Link to="/" className="btn btn-outline-primary mx-1"><i className="fa-solid fa-user mx-1"></i>Book Tickets</Link>
                 
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Event;
