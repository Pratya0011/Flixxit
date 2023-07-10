import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import '../App.css'

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:8080/user/signup", {
        name: name,
        email: email,
        username: username,
        password: password,
        role: "user",
      })
      .then((res) => {
        if (res.data.status === 200) {
          alert(res.data.message);
          window.location.reload();
        } else {
          alert(res.data.message);
        }
      })
      .catch((error) => {
        alert("Request failed");
      });
  };
  return (
    <div className="signup-component">
      <div className="signup">
      <form onSubmit={submitHandler}>
        <label>Name:</label>
        <input
          type="text"
          placeholder="name"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
        <label>Email:</label>
        <input
          type="email"
          placeholder="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <label>Usrname:</label>
        <input
          type="text"
          placeholder="username"
          value={username}
          onChange={(e) => {
            setUsername(e.target.value);
          }}
        />
        <label>Password:</label>
        <input
          type="password"
          placeholder="password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <button type="submit">Submit</button>
      </form>
      </div>
    </div>
  );
}

export default Signup;
