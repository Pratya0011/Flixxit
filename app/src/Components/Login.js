import React from "react";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {useDispatch} from 'react-redux'
import '../App.css'
import { setEmail, setId,setName } from "../features/AppSlice";
import { signup } from "./request";


function Login() {
  
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [type, setType] = useState('password')
  const navigate = useNavigate()

  
  const onSubmitHandler=(e)=>{
    e.preventDefault()
    axios.post(signup.loginUrl,{
        username,
        password
    }).then(res=>{
      if(res.data.status === 200){
        localStorage.setItem('accessToken',res.data.accessToken)
        localStorage.setItem('refreshToken',res.data.refreshToken)
        localStorage.setItem('userId',res.data.id)
        localStorage.setItem('name',res.data.name)
        localStorage.setItem('email',res.data.email)
        window.location.reload()
        navigate('/')
      }else if(res.data.status === 403){
          setError(res.data.message)
        }else{
          setError(res.data.message)
        }
    }).catch(err=>{
        setError("Request failed")
    })
  }
  const toggleType=()=>{
    type === 'password'?setType('text'):setType('password')
  }
  return (
    <div className="login-component">
      <div className="login">
      <form onSubmit={onSubmitHandler}>
        <label>Username</label>
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
        <label>Password</label>
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
        <button type="submit">Log In</button>
      </form>
      </div>
      <p>{error}</p>
    </div>
  );
}

export default Login;
