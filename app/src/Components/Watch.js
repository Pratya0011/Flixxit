import React, { useEffect, useRef, useState } from "react";
import Nav from "./Nav";
import ReactPlayer from "react-player";
import '../Style/Watch.css'
import { videoRoutes, homeRequest} from "./request";
import {  useDispatch } from "react-redux";
// import { useNavigate } from "react-router-dom";
import { fetchRecomended } from "../features/HomeSlice";
import {get} from "../Custom/useApi";
import axios from "axios";


function Watch() {
  const videoRef = useRef(null);
  const contentId = localStorage.getItem("contentId");
  const [videoUrl, setVideoUrl] = useState("");
  const [showSkipButton, setShowSkipButton] = useState(true);
  const [quality, setQuality] = useState("auto");
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [duration, setDuration] = useState(0.0)
  

  // const recomended = useSelector((state) => state.home.recomended);
  // const isloading = useSelector((state) => state.home.loading);

  // const recomendedSectionRef = useRef(null);

  const dispatch = useDispatch();
  // const img_base_url = "https://image.tmdb.org/t/p/original";
  // const navigate = useNavigate();
  useEffect(() => {

    const getData = () => {
        const contentId = localStorage.getItem("contentId");
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
          `${videoRoutes.fetchVideo}/${contentId}`,
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
    getData()
    fetchVideo();
  }, [contentId, dispatch]);

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

    </div>
  );
}

export default Watch;
