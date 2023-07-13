import React from "react";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {useDispatch} from 'react-redux'
import '../App.css'
import { setId,setName } from "../features/AppSlice";


function Login() {
  
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("")
  const navigate = useNavigate()
  const dispatch = useDispatch()
  
  const onSubmitHandler=(e)=>{
    e.preventDefault()
    axios.post("http://localhost:8080/user/login",{
        username,
        password
    }).then(res=>{
      if(res.data.status === 200){
        dispatch(setId(res.data.id))
        dispatch(setName(res.data.name))
        localStorage.setItem('accessToken',res.data.accessToken)
        localStorage.setItem('refreshToken',res.data.refreshToken)
        localStorage.setItem('userId',res.data.id)
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
      <p>{error}</p>
    </div>
  );
}

export default Login;
