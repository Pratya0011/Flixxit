import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landing from "./Components/Landing";
import Footer from "./Components/Footer";
import Home from "./Components/Home";
import Movies from "./Components/Movies";
import Shows from "./Components/Shows";
import Dashboard from "./Components/Dashboard";
import Thriller from "./Genre/MovieGenre/Thriller";
import Crime from "./Genre/MovieGenre/Crime";
import Drama from "./Genre/MovieGenre/Drama";
import Action from "./Genre/MovieGenre/Action"
import Adventure from "./Genre/MovieGenre/Adventure"
import Comedy from "./Genre/MovieGenre/Comedy";
import Horror from "./Genre/MovieGenre/Horror";
import Romance from "./Genre/MovieGenre/Romance";
import Documentary from "./Genre/MovieGenre/Documentary";
import CrimeTv from "./Genre/TvGenre/CrimeTv";
import DramaTv from "./Genre/TvGenre/DramaTv";
import ActionadventuteTv from "./Genre/TvGenre/ActionadventuteTv";
import ComedyTv from "./Genre/TvGenre/ComedyTv";
import MysteryTv from "./Genre/TvGenre/MysteryTv";
import DocumentaryTv from "./Genre/TvGenre/DocumentaryTv";

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
    if (!accessToken && !refreshToken) {
      setState(false);
    } else {
      axios
        .post("http://localhost:8080/user/authenticate", {}, { headers })
        .then((res) => {
          if (res.data.status === 200) {
            setState(true);
            localStorage.setItem("accessToken", res.data.accessToken);
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
      <div className="spinner"></div>
      <Router>
        <Routes>
          <Route exact path="/" element={state ? <Home /> : <Landing />} />
          <Route path="/Movies" element={<Movies />}></Route>
          <Route path="/Movies/Thriller" element={<Thriller />}></Route>
          <Route path="/Movies/Crime" element={<Crime />}></Route>
          <Route path="/Movies/Drama" element={<Drama />}></Route>
          <Route path="/Movies/Action" element={<Action />}></Route>
          <Route path="/Movies/Adventure" element={<Adventure />}></Route>
          <Route path="/Movies/Comedy" element={<Comedy />}></Route>
          <Route path="/Movies/Horror" element={<Horror />}></Route>
          <Route path="/Movies/Romance" element={<Romance />}></Route>
          <Route path="/Movies/Documentary" element={<Documentary />}></Route>
          <Route path="/Shows" element={<Shows />}></Route>
          <Route path="/Tv/Crime" element={<CrimeTv/>}></Route>
          <Route path="/Tv/Drama" element={<DramaTv/>}></Route>
          <Route path="/Tv/Actionadventure" element={<ActionadventuteTv/>}></Route>
          <Route path="/Tv/Comedy" element={<ComedyTv/>}></Route>
          <Route path="/Tv/Mystery" element={<MysteryTv/>}></Route>
          <Route path="/Tv/Documentary" element={<DocumentaryTv/>}></Route>
          <Route path="/Dashboard" element={<Dashboard />}></Route>
        </Routes>
      </Router>
      <Footer />
    </div>
  );
}

export default App;
