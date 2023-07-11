import React,{useState,useEffect} from 'react'
import {useDispatch, useSelector } from 'react-redux'

function Home() {
  const id = useSelector((state)=>state.app.id)
  const name = useSelector((state)=>state.app.name)

  useEffect(()=>{
    console.log(id)
    console.log(name)
  })
  return (
    <div>Home</div>
  )
}

export default Home