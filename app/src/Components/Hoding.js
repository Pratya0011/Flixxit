import React,{useState,useEffect} from 'react'
import axios from "axios";
import { homeRequest } from "./request";
import '../Style/Hoding.css'


function Hoding() {
    const [data, setData] = useState("");
    const [currentIndex, setCurrentIndex] = useState(0);
  const img_base_url = "https://image.tmdb.org/t/p/original";
  
  useEffect(() => {
      fetchData();
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) =>
          prevIndex === data.length - 1 ? 0 : prevIndex + 1
        );
      }, 8000);
      return () => clearInterval(interval);
  }, [data.length]);
  
  const fetchData = () => {
    axios
      .get(homeRequest.popularFlixxit)
      .then((res) => {
        setData(res.data.result);
        
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const currentBanner = data[currentIndex];
  return (
    <div
    className="banner"
    style={{
      backgroundImage: currentBanner ? `url(${img_base_url}${currentBanner.backdrop_path})` : ""
    }}
  >
    {currentBanner && (
      <>
    <h1>{currentBanner.title||currentBanner.name||currentBanner.original_name}</h1>
    <div className='banner-button'>
      <div><button> <i className="fa fa-play"></i> Play</button></div>
      <div className='plus'>+</div>
    </div>
    </>)
    }
  </div>
  )
}

export default Hoding