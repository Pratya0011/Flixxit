import React from "react";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import '../App.css'
import { signup } from "./request";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {post} from "../Custom/useApi";


function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [newPassword, setNewPassword] = useState("")
  const [type, setType] = useState('password')
  const [forgot, setForgot] = useState(false)
  const [login, setLogin] = useState(true)
  const [connecting, setConnecting] = useState(false);
  const navigate = useNavigate()

  
  const onSubmitHandler=(e)=>{
    e.preventDefault()
    setConnecting(true)
        toast.info('Establishing Connection please wait')
    post(signup.loginUrl,{
        username,
        password
    }).then(res=>{
      if(res.data.status === 200){
        localStorage.setItem('accessToken',res.data.accessToken)
        localStorage.setItem('refreshToken',res.data.refreshToken)
        localStorage.setItem('userId',res.data.id)
        localStorage.setItem('name',res.data.name)
        localStorage.setItem('email',res.data.email)
        toast.success('Login Success');
        setTimeout(()=>{
          window.location.reload()
        },2000)
        navigate('/')
      }else if(res.data.status === 403){
          setError(res.data.message)
        }else{
          setError(res.data.message)
        }
    }).catch(err=>{
        setError("Request failed")
    }).finally(()=>{
      setConnecting(false)
    })
  }
  const onPasswordChange = (e)=>{
    e.preventDefault()
    if(password !== newPassword){
      setError('Passord donot match')
    }else{
    post(signup.fogotPassword,{
        username,
        newPassword
    }).then((res)=>{
      if(res.data.status === 200){
        toast.success('Password changed!');
        setTimeout(()=>{
          window.location.reload()
        },2000)
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
  }
  const toggleType=()=>{
    type === 'password'?setType('text'):setType('password')
  }
  return (
    <div className="login-component">
      {login && (
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
        <ToastContainer position="top-center"autoClose={2000}theme="light"progressStyle={{ background: "#e50914" }}/>
        <div onClick={()=>{
          setLogin(false)
          setForgot(true)
        }} className="passwordToggle">Forgot Password</div>
        </div>
      )}
      {forgot && (
        <div className="login">
        <form onSubmit={onPasswordChange}>
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
          <div className="view-toggle">
          <label>Re-Enter</label>
          <input
            type={type}
            placeholder="confirm-password"
            value={newPassword}
            onChange={(e) => {
              setNewPassword(e.target.value);
            }}
            required
          />
          <div className="eye" onClick={toggleType}><i className="fa fa-eye" aria-hidden="true"></i></div>
          </div>
          <button type="submit">Submit</button>
        </form>
        <ToastContainer position="top-center"autoClose={2000}theme="light"progressStyle={{ background: "#e50914" }}/>
        <div onClick={()=>{
          setLogin(true)
          setForgot(false)
        }} className="passwordToggle">Login</div>
        </div>
      )}
      <p>{error}</p>
    </div>
  );
}

export default Login;
