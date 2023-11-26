// Login.js
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Login = (props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/api/v1/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
        credentials: 'include',
      });

      if (response.ok) {
        const data = await response.json();
        // Redirect to the home page after successful login
        props.setUser(data);
        if (data.user.role === 'admin')
          props.setAdmin(1);
        else
          props.setAdmin(0)
        navigate('/', { replace: true });
      } else {
        const data = await response.json();
        setError(data.msg); // Set error message for display
      }
    } catch (error) {
      console.error('Login failed:', error.msg);
      setError('An unexpected error occurred.'); // Set error message for display
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h2 className="card-title text-center">Login</h2>
              {error && <div className="alert alert-danger" role="alert">{error}</div>}
              <form onSubmit={handleLogin}>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Email
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">
                    Password
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <button type="submit" className="btn btn-primary">
                  Login
                </button>
                <p className="mt-3 text-center">
                  New User? <Link to="/signup">Signup</Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
