
//import './App.css';

import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

import Home from './components/Home.js'
import Navbar from './components/Navbar.js'
import Footer from './components/Footer.js'
import Login from './components/Login.js';
import Signup from './components/Signup.js';

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar/>
        <Routes>
          <Route path='/'element={<Home/>}/>
          <Route path='/login'element={<Login/>}/>
          <Route path='/signup'element={<Signup/>}/>
        </Routes>
        <Footer/>
      </Router>
    </div>
  );
}

export default App;
