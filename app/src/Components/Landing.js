import React, { useState, useEffect } from "react";
import Login from "./Login";
import Signup from "./Signup";
import { useSelector } from "react-redux";
import "../App.css";
import {get} from "../Custom/useApi";

function Landing() {
  const [response, setResponse] = useState("");
  const [buttonDisplay, setButtonDisplay] = useState(true);
  const [formDisplay, setFormDisplay] = useState(false);
  const [loginForm, setLoginForm] = useState(true);
  const [signupForm, setSignupForm] = useState(false);
  const [isActiveOne, setIsActiveOne] = useState(false);
  const [isActiveTwo, setIsActiveTwo] = useState(false);

  const message = useSelector((state)=>state.app.message)

  useEffect(() => {
    get("/").then((res) => {
      setResponse(res.data.message1);
    });
  }, []);

  return (
    <div className="landing-container">
      {message?(<div className="expired">{message}</div>):(<></>)}
      <div className="logo">
        <h2>Flᴉxxᴉt</h2>
      </div>
      <div className="showcase">
        <div className="heading">{response}</div>
        <div className="form-component">
          {!buttonDisplay && formDisplay ? (
            <div>
              <div className="toggle-form">
                <div
                  className={isActiveOne ? "activeDiv" : "div1"}
                  onClick={() => {
                    setLoginForm(true);
                    setSignupForm(false);
                    setIsActiveTwo(false);
                    setIsActiveOne(true);
                  }}
                >
                  Login
                </div>
                <div
                  className={isActiveTwo ? "activeDiv" : "div1"}
                  onClick={() => {
                    setLoginForm(false);
                    setSignupForm(true);
                    setIsActiveTwo(true);
                    setIsActiveOne(false);
                  }}
                >
                  Signup
                </div>
              </div>
              {loginForm && !signupForm ? <Login /> : <Signup />}
            </div>
          ) : (
            <div className="registerButton">
              <button
                onClick={() => {
                  setButtonDisplay(false);
                  setFormDisplay(true);
                }}
              >
                Login/Signup
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Landing;
