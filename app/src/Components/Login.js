import React from "react";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";



function Login() {
  
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("")
  const navigate = useNavigate()
  
  const onSubmitHandler=(e)=>{
    e.preventDefault()
    axios.post("http://localhost:8080/user/login",{
        username,
        password
    }).then(res=>{
      if(res.data.status === 200){
        navigate('/Home')
      }else if(res.data.status === 403){
          setError(res.data.message)
        }else{
          setError(res.data.message)
        }
    }).catch(err=>{
        setError("Request failed")
    })
  }
  return (
    <div>
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
      <p>{error}</p>
    </div>
  );
}

export default Login;
