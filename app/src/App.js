import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useDispatch } from "react-redux";
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
import Subscribe from "./Components/Subscribe";
import Search from "./Components/Search";
import PaymentSuccess from "./Components/PaymentSuccess";
import TitleView from "./Components/TitleView";
import Watch from "./Components/Watch";
import WatchPlaylist from "./Components/WatchPlaylist"
import WatchlistComponent from "./Components/WatchlistComponent";
import Profile from "./Components/Profile";
import Overview from "./Components/Overview";
import History from "./Components/History";
import { setMessage } from "./features/AppSlice";
import {post} from "./Custom/useApi"
import SubscribedUserList from "./Components/SubscribedUserList";

function App() {
  const [state, setState] = useState(false);

  const dispatch = useDispatch()

  useEffect(() => {
    const authenticate = () => {
      let accessToken = localStorage.getItem("accessToken");
      let refreshToken = localStorage.getItem("refreshToken");
      if (!accessToken && !refreshToken) {
        setState(false);
      } else {
        post("/user/authenticate")
          .then((res) => {
            if (res.data.status === 200) {
              localStorage.setItem("accessToken", res.data.accessToken);
              setState(true);
            } else {
              setState(false);
              dispatch(setMessage(res.data.message))
            }
          })
          .catch((err) => {
            console.log(err);
          });
        
      }
    };
    authenticate();
  },[state, dispatch]);
 
  return (
    <div className="App">
      
      <Router>
        <Routes>
          <Route exact path="/" element={state ? <Home /> : <Landing />} />
          <Route path="/Movies" element={state ? <Movies /> : <Landing />}></Route>
          <Route path="/Movies/Thriller" element={state ? <Thriller /> : <Landing />}></Route>
          <Route path="/Movies/Crime" element={state ? <Crime /> : <Landing />}></Route>
          <Route path="/Movies/Drama" element={state ? <Drama /> : <Landing />}></Route>
          <Route path="/Movies/Action" element={state ? <Action /> : <Landing />}></Route>
          <Route path="/Movies/Adventure" element={state ? <Adventure /> : <Landing />}></Route>
          <Route path="/Movies/Comedy" element={state ? <Comedy /> : <Landing />}></Route>
          <Route path="/Movies/Horror" element={state ? <Horror /> : <Landing />}></Route>
          <Route path="/Movies/Romance" element={state ? <Romance /> : <Landing />}></Route>
          <Route path="/Movies/Documentary" element={state ? <Documentary /> : <Landing />}></Route>
          <Route path="/Shows" element={state ? <Shows /> : <Landing />}></Route>
          <Route path="/Tv/Crime" element={state ? <CrimeTv /> : <Landing />}></Route>
          <Route path="/Tv/Drama" element={state ? <DramaTv /> : <Landing />}></Route>
          <Route path="/Tv/Actionadventure" element={state ? <ActionadventuteTv /> : <Landing />}></Route>
          <Route path="/Tv/Comedy" element={state ? <ComedyTv /> : <Landing />}></Route>
          <Route path="/Tv/Mystery" element={state ? <MysteryTv /> : <Landing />}></Route>
          <Route path="/Tv/Documentary" element={state ? <DocumentaryTv /> : <Landing />}></Route>
          <Route path="/Dashboard" element={state ? <Dashboard /> : <Landing />}>
          <Route path="overview" element={<Overview/>}></Route>
          <Route path="subscribeduserlist" element={<SubscribedUserList/>}></Route>
          </Route>
          <Route path='/subscribe' element={state ? <Subscribe /> : <Landing />}></Route>
          <Route path="/search" element={state ? <Search/> : <Landing />}></Route>
          <Route path="/paymentsuccess" element={state ? <PaymentSuccess/> : <Landing />}></Route>
          <Route path="/title" element={state ? <TitleView/> : <Landing />}></Route>
          <Route path="/watch" element={state ? <Watch/> : <Landing />}></Route>
          <Route path="/watchplaylist" element={state ? <WatchPlaylist/> : <Landing />}></Route>
          <Route path="/watchlistcomponent" element={state ? <WatchlistComponent/> : <Landing />}></Route>
          <Route path="/profile" element={state ? <Profile/> : <Landing />}></Route>
          <Route path="/history" element={state ? <History/> : <Landing />}></Route>
        </Routes>
      </Router>
      <Footer />
    </div>
  );
}

export default App;
