import React, { useState, useEffect } from "react";
import axios from "axios";
import { subscribitionPlan } from "./request";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import logo from '../flixxit.png'
import "../Style/Subscription.css";


function Subscribe() {
  const [plan, setPlan] = useState([]);
  const [error, setError] = useState("");
  const [key,setKey]=useState('')
  const navigate = useNavigate()
  const name = useSelector((state)=>state.app.name)
  const email = useSelector((state)=>state.app.email)

  useEffect(() => {
    console.log(name,email)
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

  const checkout = (amount,username,useremail)=>{
    axios.get(subscribitionPlan.getkey).then(res=>{
      setKey(res.data.key)
    })

    axios.post(subscribitionPlan.checkOut,{amount}).then((res)=>{
      const id = localStorage.getItem("userId")
      console.log(name,email)
      const options = {
        key, // Enter the Key ID generated from the Dashboard
        amount: res.data.order.amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
        currency: "INR",
        name: "Flixxit",
        description: "Gold Subscription",
        image: logo,
        order_id: res.data.order.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
        callback_url: `${subscribitionPlan.paymentVerification}?userId=${id}`,
        prefill: {
            name: username,
            email: useremail,
            contact: "9000090000"
        },
        
        theme: {
            color: "#e50914"
        }
    };
    var razor = new window.Razorpay(options);
        razor.open();
    }).catch(err=>{
      console.log(err)
    })
    
    
  }
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
          <div className="plan-button"><button onClick={()=>checkout(100,name,email)}>Subscribe for Monthly</button></div>
        </div>
      )}
    </div>
  );
}

export default Subscribe;
