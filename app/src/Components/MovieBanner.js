import React, { useState, useEffect } from "react";
import { movieRequest, historyRoutes } from "./request";
import "../Style/MovieBanner.css";
import { Watchlist } from "./request";
import { useNavigate } from "react-router-dom";
import { getuser } from "./request";
import {get, patch} from "../Custom/useApi";

function MovieBanner() {
  const [data, setData] = useState("");
  const [watchlist, setWatchlist] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const img_base_url = "https://image.tmdb.org/t/p/original";
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === data.length - 1 ? 0 : prevIndex + 1
      );
    }, 8000);
    getwatchlist();
    return () => clearInterval(interval);
  }, [data.length]);

  const fetchData = () => {
    get(movieRequest.popularMovies)
      .then((res) => {
        setData(res.data.result);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const getwatchlist = () => {
    const id = localStorage.getItem("userId");
    get(`${Watchlist.getWatchlist}/${id}`)
      .then((res) => {
        setWatchlist(res.data.contentResult);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const toggleWatchlist = (contentid) => {
    console.log(contentid);
    const id = localStorage.getItem("userId");
    const queryParam = new URLSearchParams({ contentId: contentid });
    patch(`${Watchlist.addWatchlist}/${id}`, {}, { params: queryParam })
      .then((res) => {
        if (res.data.status === 200) {
          setWatchlist(res.data.contentResult);
        } else if (res.data.status === 409) {
          patch(`${Watchlist.deleteWatchlist}/${id}`, {}, {
              params: queryParam,
            })
            .then((res) => {
              setWatchlist(res.data.contentResult);
            })
            .catch((err) => {
              console.log(err);
            });
        } else {
          alert("Something went wrong");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const currentBanner = data[currentIndex];

  const playvideo = (contentid) => {
    const id = localStorage.getItem("userId");
    watchlist && watchlist.some((data) => data._id === contentid)
      ? get(`${getuser.getUserById}/${id}`).then((res) => {
          if (res.data.user.subscription.subscriptionStatus) {
            localStorage.setItem("watchlistId", contentid);
            addHistory(id,contentid)
            navigate("/watchplaylist");
          } else {
            navigate("/subscribe");
          }
        })
      : get(`${getuser.getUserById}/${id}`).then((res) => {
          if (res.data.user.subscription.subscriptionStatus) {
            localStorage.setItem("contentId", contentid);
            addHistory(id,contentid)
            navigate("/watch");
          } else {
            navigate("/subscribe");
          }
        });
  };
  const addHistory = (id, contentId)=>{
    patch(`${historyRoutes.addHistory}/${id}?contentId=${contentId}`).then((res)=>{
      if(res.data.status === 200){
        console.log('added to history')
      }else{
        console.log('not added')
      }
    }).catch(err=>{
      throw err
    })
  }
  return (
    <div
      className="moviebanner"
      style={{
        backgroundImage: currentBanner
          ? `url(${img_base_url}${currentBanner.backdrop_path})`
          : "",
      }}
    >
      {currentBanner && (
        <>
          <h1>
            {currentBanner.title === "Like Stars on Earth"
              ? "Taare Zameen Par"
              : currentBanner.title ||
                currentBanner.name ||
                currentBanner.original_name}
          </h1>
          <div className="moviebanner-button">
            <div>
              <button
                onClick={() => {
                  playvideo(currentBanner._id);
                }}
              >
                {" "}
                <i className="fa fa-play"></i> Play
              </button>
            </div>
            {watchlist &&
            watchlist.some((data) => data._id === currentBanner._id) ? (
              <div
                className="plus"
                onClick={() => {
                  toggleWatchlist(currentBanner._id);
                }}
              >
                ✓
              </div>
            ) : (
              <div
                className="plus"
                onClick={() => {
                  toggleWatchlist(currentBanner._id);
                }}
              >
                +
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default MovieBanner;
