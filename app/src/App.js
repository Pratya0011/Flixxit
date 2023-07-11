import React, { useState,useEffect } from "react";
import axios from "axios";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landing from "./Components/Landing";
import Home from "./Components/Home";
import Footer from "./Components/Footer";

function App() {
  const [state,setState] = useState(false)
  const [message,setMessage] = useState('')
  
  useEffect(() => {
    authenticate()
  });
  const authenticate=()=>{
    let accessToken = localStorage.getItem("accessToken");
    let refreshToken = localStorage.getItem("refreshToken");
      const headers = {
        'access':accessToken,
        'refresh':refreshToken,
      };
      if(!accessToken || !refreshToken){
        setState(false)
        setMessage('Please Login')
      }else{
      axios
        .post("http://localhost:8080/user/authenticate",{}, { headers })
        .then((res) => {
          console.log(res)
        }).catch(err=>{
          console.log(err)
        });
      }
  }
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path="/" element={<Landing />} />
          <Route path="/Home" element={<Home />}></Route>
        </Routes>
      </Router>
      <Footer />
    </div>
  );
}

export default App;
