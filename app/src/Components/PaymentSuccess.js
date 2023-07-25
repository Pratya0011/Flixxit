import React,{useEffect,useState} from 'react'
import { useLocation, useNavigate } from "react-router-dom";

function PaymentSuccess() {
    const [counter,setCounter]=useState(5)
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const reference = searchParams.get("reference");
    const navigate = useNavigate()

    useEffect(()=>{
        if(counter>0){
            setInterval(()=>{
                setCounter(counter-1)
            },1000)
        }else{
            navigate('/')
        }
    })
  return (
    <div className='subscription-div'>
        <div className='paymentSuccess'>
        <div className='payment-heading'>Payment Successful</div>
        <div>Payment Id:  {reference} </div>
        </div>
        <div className='redirect'>You will be automatically redirected in {counter}sec</div>
    </div>
  )
}

export default PaymentSuccess