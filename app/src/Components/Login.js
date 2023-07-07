import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const [response, setResponse] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
 
  useEffect(() => {
    axios.get("http://localhost:8080/").then((res) => {
      setResponse(res.data);
    });
  }, []);

  const onSubmitHandler=(e)=>{
    e.preventDefault()
    axios.post("http://localhost:8080/user/login",{
        username,
        password
    }).then(res=>{
        console.log(res)
    }).catch(res=>{
        console.log(res.message)
    })
  }
  return (
    <div>
      <h1>Welcome to Flixxit</h1>
      <p>{response}</p>
      <form onSubmit={onSubmitHandler}>
        <label>Username</label>
        <input
          type="text"
          placeholder="username"
          value={username}
          onChange={(e) => {
            setUsername(e.target.value);
          }}
        />
        <label>Password</label>
        <input
          type="text"
          placeholder="password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <button type="submit">Log In</button>
      </form>
    </div>
  );
}

export default Login;
