import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import Nav from "./Nav";
import ReactPlayer from "react-player";
import '../Style/Watch.css'
import { videoRoutes, homeRequest, Watchlist } from "./request";
import {  useDispatch } from "react-redux";
// import { useNavigate } from "react-router-dom";
import { fetchRecomended } from "../features/HomeSlice";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {get} from "../Custom/useApi";

function WatchPlaylist() {
  const videoRef = useRef(null);
  const contentId = localStorage.getItem("contentId");
  const [videoUrl, setVideoUrl] = useState("");
  const [showSkipButton, setShowSkipButton] = useState(true);
  const [quality, setQuality] = useState("auto");
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [duration, setDuration] = useState(0.0);
  const [curentId, setCurentId] = useState(localStorage.getItem("watchlistId"))
  const [watchlist, setWatchlist] = useState([]);
  

  // const recomended = useSelector((state) => state.home.recomended);
  // const isloading = useSelector((state) => state.home.loading);
  

  // const recomendedSectionRef = useRef(null);

  const dispatch = useDispatch();
  // const img_base_url = "https://image.tmdb.org/t/p/original";
  // const navigate = useNavigate();
  useEffect(() => {

    const getData = () => {
        const contentId = localStorage.getItem("watchlistId");
        get(`${homeRequest.getTitle}?contentId=${contentId}`)
          .then((res) => {
            if (res.data.status === 200) {
              setData(res.data.result);
              dispatch(
                fetchRecomended(
                  res.data.result[0].genre_ids[
                    Math.floor(
                      Math.random() * res.data.result[0].genre_ids.length
                    )
                  ]
                )
              );
            } else {
              setData([]);
            }
          })
          .catch((err) => {
            console.log(err);
          });
      };


    const fetchVideo = async () => {
      try {
        const response = await axios.get(
          `${videoRoutes.fetchVideo}/${curentId}`,
          {
            responseType: "blob",
            headers: {
              Range: "bytes=0-",
            },
          }
        );

        const blob = new Blob([response.data]);
        const videoUrl = URL.createObjectURL(blob);

        setVideoUrl(videoUrl);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching video:", error);
        setLoading(false);
      }
    };
    getData();
    getwatchlist();
    fetchVideo();
  }, [contentId, dispatch,curentId]);
  const getwatchlist = () => {
    const id = localStorage.getItem("userId");
    get(`${Watchlist.getWatchlist}/${id}`)
      .then((res) => {
        if(res.data.contentResult){
          const watchlistId = res.data.contentResult.map((item)=>{
            return item._id;
          })
          setWatchlist(watchlistId)
        }
        
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleSkipIntro = () => {
    videoRef.current.seekTo(10); 
    setShowSkipButton(false); 
  };
  const qualityOptions = [
    { value: "auto", label: "Auto" },
    { value: "720", label: "720p" }, 
  ];

  const handleDuration = (duration) => {
    setDuration(Math.floor(duration/60));
  };
  const handleQualityChange = (selectedQuality) => {
    setQuality(selectedQuality);
    const currentTime = videoRef.current.getCurrentTime();
    const skipTime = 35; 
    setShowSkipButton(currentTime < skipTime?true:false);
  };
  const handleVideoEnd = () => {
    const index = watchlist.indexOf(curentId)
    if(index< watchlist.length-1){
      setCurentId(watchlist[index+1])
      localStorage.setItem("watchlistId", watchlist[index+1])
      setShowSkipButton(false)
      setLoading(true)
      setDuration(0)
    }else{
      localStorage.setItem("watchlistId", watchlist[watchlist.length-1])
      setShowSkipButton(false)
      toast.success('Played the last content in the watchlist, autoplay stopped')
    }
  };
  const handlePlayInstance= () =>{
    setShowSkipButton(true)
  }
  return (
    <div className="player-cpmponent">
      <Nav />
      <div className="player-div">
      {loading ? (
          <div className="spinner-container">
          <div className="spinner"></div></div> 
        ) : (
          videoUrl && (
            <div>
              <ReactPlayer
                url={videoUrl}
                ref={videoRef}
                playing={true}
                controls={true}
                width="100%"
                height="75vh"
                quality={quality}
                onDuration={handleDuration}
                onPlay={handlePlayInstance}
                onEnded={handleVideoEnd}
                config={{
                  file: {
                    attributes: {
                      controlsList: "nodownload", 
                    },
                  },
                }}
              />
              
              {showSkipButton && (
                <div className="skipIntro"><button onClick={handleSkipIntro}>Skip Intro</button></div>
              )}
              <div className="quality">
                {qualityOptions.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => {
                        handleQualityChange(option.value)
                    }}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>
          )
        )}
      </div>
      {data && data.length>0 && (
            <div className="titles">
              <h1>
                {data[0].title === "Like Stars on Earth"
                  ? "Taare Zameen Par"
                  : data[0].title || data[0].name || data[0].original_name}
              </h1>
              <p className="type">
                <span>U/A</span>
                <span>Hindi</span>
                <span>{data[0].media_type.toUpperCase()}</span>
              </p>
              <p className="type">
                <span>Duration:</span>
                <span>{duration} min</span>
              </p>

              <div className="overview">{data[0].overview}</div>
              <div className="banner-button">
              </div>
            </div>
          )}
<ToastContainer position="top-center"autoClose={3000}theme="dark" hideProgressBar />
    </div>
  )
}

export default WatchPlaylist