import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landing from "./Components/Landing";
import Footer from "./Components/Footer";
import Home from './Components/Home'
import Movies from "./Components/Movies"
import Shows from "./Components/Shows"

function App() {
  const [state, setState] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    authenticate();
  });
  const authenticate = () => {
    let accessToken = localStorage.getItem("accessToken");
    let refreshToken = localStorage.getItem("refreshToken");
    const headers = {
      access: accessToken,
      refresh: refreshToken,
    };
    if (!accessToken || !refreshToken) {
      setState(false);
    } else {
      axios
        .post("http://localhost:8080/user/authenticate", {}, { headers })
        .then((res) => {
          if (res.data.status === 200) {
            setState(true);
          } else {
            setState(false);
            setMessage(res.data.message);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path="/" element={state ? <Home /> : <Landing />} />
          <Route path='/Home' element={<Home/>}></Route>
          <Route path="/Movies" element={<Movies/>}></Route>
          <Route path="/Shows" element={<Shows/>}></Route>
        </Routes>
      </Router>
      <Footer />
    </div>
  );
}

export default App;
