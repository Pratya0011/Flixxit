import React from 'react';
import './App.css';
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom';
import Landing from './Components/Landing'
import Home from './Components/Home';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path="/" element={<Landing/>}/>
          <Route path='/Home' element={<Home/>}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
