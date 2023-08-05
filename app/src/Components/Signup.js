import React, { useState} from "react";
import axios from "axios";
import { signup } from "./request";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import '../App.css'

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [cpassword, setCpassword] = useState("")
  const [type, setType] = useState('password')
  const [error, setError] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();
    password === cpassword ?(axios
      .post(signup.signUpUrl, {
        name: name,
        email: email,
        username: username,
        password: password,
        role: "user",
      })
      .then((res) => {
        if (res.data.status === 200) {
          toast.success(res.data.message);
          setTimeout(()=>{
            window.location.reload();
          },3000)
        } else {
          toast.success(res.data.message);
        }
      })
      .catch((error) => {
        error?alert("Request failed"):<></>;
      })):setError('Password donot match')
  };
  const toggleType=()=>{
    type === 'password'?setType('text'):setType('password')
  }
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
          required
        />
        <label>Email:</label>
        <input
          type="email"
          placeholder="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          required
        />
        <label>Usrname:</label>
        <input
          type="text"
          placeholder="username"
          value={username}
          onChange={(e) => {
            setUsername(e.target.value);
          }}
          required
        />
        <div className="view-toggle">
        <label>Password:</label>
        <input
          type={type}
          placeholder="password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          required
        />
        <div className="eye" onClick={toggleType}><i className="fa fa-eye" aria-hidden="true"></i></div>
        </div>
        <label>C.Password:</label>
        <input
          type="text"
          placeholder="password"
          value={cpassword}
          onChange={(e) => {
            setCpassword(e.target.value);
          }}
          required
        />
        
        <button type="submit">Submit</button>
      </form>
      <ToastContainer position="top-center"autoClose={3000}theme="dark" hideProgressBar />
      </div>
      <p>{error}</p>
    </div>
  );
}

export default Signup;
