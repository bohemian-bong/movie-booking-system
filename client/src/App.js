
//import './App.css';
import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from './components/Home.js'
import Navbar from './components/Navbar.js'
import Login from './components/Login.js';
import Signup from './components/Signup.js';
import Profile from './components/Profile.js';
import Event from './components/Event.js';
import About from './components/About.js';


function App() {
  const [user, setUser] = useState({})
  const [event, setEvent] = useState({})
  return (
    <div className="App">
      <Router>
        <Navbar user={user} setUser={setUser}/>
        <Routes>
          <Route exact path='/' element={<Home setEvent={setEvent}/> }/>
          <Route exact path='/login' element={<Login setUser={setUser} />}/>
          <Route exact path='/profile' element={<Profile user={user}/>}/>
          <Route exact path='/event' element={<Event event={event} user={user}/>}/>
          <Route exact path='/signup' element={<Signup setUser={setUser} />}/>
          <Route exact path='/about' element={<About/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
