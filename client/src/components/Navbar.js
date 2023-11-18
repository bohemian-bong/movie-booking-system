import React from "react";
import { Link } from 'react-router-dom'

export default function Navbar(props) {
  const handleClick = ()=>{
    props.setUser({});
  }
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">Cinemate</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                    <li className="nav-item">
                    <Link className="nav-link" aria-current="page" to="/">Home</Link>
                    </li>
                    <li className="nav-item">
                    <Link className="nav-link" to="/about">About</Link>
                    </li>
                </ul>
                <form className="d-flex">
                {Object.keys(props.user).length === 0 ? (
                // If user is empty, show Login button
                <Link to="/login" className="btn btn-outline-primary"><i className="fa-solid fa-arrow-right-to-bracket mx-1"></i>Login</Link>
              ) : (
                // If user is not empty, show Logout button
                <div>
                  <Link to="/profile" className="btn btn-outline-primary mx-1"><i className="fa-solid fa-user mx-1"></i>{props.user.user.name}</Link>
                  <button className="btn btn-outline-primary mx-1"><i className="fa-solid fa-right-from-bracket mx-1" onClick={handleClick}></i>Logout</button>
                </div>
              )}
                </form>
                </div>
            </div>
        </nav>

    </>
  );
}
