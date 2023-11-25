
//import './App.css';
import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from './components/Home.js'
import Navbar from './components/Navbar.js'
import Login from './components/Login.js';
import Signup from './components/Signup.js';
import Profile from './components/Profile.js';
import Event from './components/Event.js';
import About from './components/About.js';
import Admin from './components/Admin.js';
import Book from './components/Book.js';
import OrderStatus from './components/OrderStatus.js';
import Dashboard from './components/Dashboard';

function App() {
  const [user, setUser] = useState({});
  useEffect(() => {
    const getUserDetails = async () => {
      const response = await fetch('http://localhost:5000/api/v1/users/showMe', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });
      const data = await response.json();
      setUser(data);
    }
    
    const getTokenCookie = () => {
      const cookies = document.cookie.split('; ');
      for (const cookie of cookies) {
        const [name, value] = cookie.split('=');
        if (name === 'token') {
          getUserDetails();
        }
        // If the "token" cookie is not found
      }
    };
    getTokenCookie();
    
  }, [])
  
  return (
    <div className="App">
      <Router>
        <Navbar user={user} setUser={setUser}/>
        <Routes>
          <Route exact path='/' element={<Home/> }/>
          <Route exact path='/login' element={<Login setUser={setUser} />}/>
          <Route exact path='/profile' element={<Profile user={user}/>}/>
          <Route exact path='/event/:id' element={<Event user={user}/>}/>
          <Route exact path='/book/:id' element={<Book user={user}/>}/>
          <Route exact path='/signup' element={<Signup setUser={setUser} />}/>
          <Route exact path='/about' element={<About/>}/>
          <Route exact path='/admin' element={<Admin/>}/>
          <Route exact path='/bookingstatus/:id' element={<OrderStatus/>}/>
          <Route exact path='/dashboard' element={<Dashboard />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
