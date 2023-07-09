import React, { useState, useEffect } from "react";
import axios from "axios";
import Login from "./Login";
import Signup from "./Signup";

function Landing() {
  const [response, setResponse] = useState("");
  const [buttonDisplay, setButtonDisplay] = useState(true);
  const [formDisplay, setFormDisplay] = useState(false);
  const [loginForm, setLoginForm] = useState(true);
  const [signupForm, setSignupForm] = useState(false);

  useEffect(() => {
    axios.get("http://localhost:8080/").then((res) => {
      setResponse(res.data);
    });
  }, []);

  return (
    <div>
      <h1>{response}</h1>
      <div>
        {!buttonDisplay && formDisplay ? (
          <div>
            <div>
              <span
                onClick={() => {
                  setLoginForm(true);
                  setSignupForm(false);
                }}
              >
                Login
              </span>
              <span
                onClick={() => {
                  setLoginForm(false);
                  setSignupForm(true);
                }}
              >
                Signup
              </span>
            </div>
            {loginForm && !signupForm ? <Login /> : <Signup />}
          </div>
        ) : (
          <button
            onClick={() => {
              setButtonDisplay(false);
              setFormDisplay(true);
            }}
          >
            Login/Signup
          </button>
        )}
      </div>
    </div>
  );
}

export default Landing;
