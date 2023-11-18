
//import './App.css';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from './components/Home.js'
import Navbar from './components/Navbar.js'
import Login from './components/Login.js';

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar/>
        <Routes>
          <Route exact path='/' element={<Home/>}/>
          <Route exact path='/login' element={<Login/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
