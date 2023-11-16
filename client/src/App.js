
//import './App.css';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from './components/Home.js'
import Navbar from './components/Navbar.js'

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar/>
        <Routes>
          <Route exact path='/'element={<Home/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
