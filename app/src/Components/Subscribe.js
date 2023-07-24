import React, { useState, useEffect } from "react";
import axios from "axios";
import { subscribitionPlan } from "./request";
import { useNavigate } from "react-router-dom";
import "../Style/Subscription.css";

function Subscribe() {
  const [plan, setPlan] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate()
  useEffect(() => {
    axios
      .get(subscribitionPlan.getAllSubsPlans)
      .then((res) => {
        if (res.data.status === 200) {
          setPlan(res.data.plan);
        } else {
          setError(res.data.message);
        }
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);
  return (
    <div className="subscription-div">
      <div id="logo">
        <h2>Flᴉxxᴉt</h2>
      </div>
      <div className="back" onClick={()=>{
        navigate('/')
      }}>
      <i className="fa-solid fa-arrow-left"></i>
      </div>
      {error?(
        <div>{error}</div>
      ):(
        <div className="plan-div">
          <div className="plan-heading">Subscribe to Flixxit</div>
          <p>Choose your plan.</p>
          <div>
            {plan.map((item,index)=>(
              <div key={index} className="plan-item">
                <div className="item-1">{item.planName}</div>
                <div className="item-2">
                <div >{item.duration}</div>
                <div className="item-3">Watch videos and more...</div>
                </div>
                <div className="item-4">₹ {item.price}</div>
              </div>
            ))}
          </div>
          <div className="plan-button"><button>Subscribe for Monthly</button></div>
        </div>
      )}
    </div>
  );
}

export default Subscribe;
