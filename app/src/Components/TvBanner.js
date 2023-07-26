import React,{useState,useEffect} from 'react'
import axios from "axios";
import { tvRequest } from "./request";
import '../Style/MovieBanner.css'
import { Watchlist } from "./request";

function TvBanner() {
    const [data, setData] = useState("");
    const [watchlist, setWatchlist] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
  const img_base_url = "https://image.tmdb.org/t/p/original";

  useEffect(() => {
    fetchData();
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === data.length - 1 ? 0 : prevIndex + 1
      );
    }, 8000);
    getwatchlist()
    return () => clearInterval(interval);
}, [data.length]);

const fetchData = () => {
  axios
    .get(tvRequest.popularTv)
    .then((res) => {
      setData(res.data.result);
      
    })
    .catch((err) => {
      console.log(err);
    });
};
const getwatchlist = () => {
  const id = localStorage.getItem("userId");
  axios
    .get(`${Watchlist.getWatchlist}/${id}`)
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
  axios
    .patch(`${Watchlist.addWatchlist}/${id}?contentId=${contentid}`)
    .then((res) => {
      if (res.data.status === 200) {
        setWatchlist(res.data.contentResult);
      } else if (res.data.status === 409) {
        axios
          .patch(`${Watchlist.deleteWatchlist}/${id}?contentId=${contentid}`)
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
  return (
    <div
    className="moviebanner"
    style={{
      backgroundImage: currentBanner ? `url(${img_base_url}${currentBanner.backdrop_path})` : ""
    }}
  >
    {currentBanner && (
      <>
    <h1>{currentBanner.title === 'Like Stars on Earth'?'Taare Zameen Par':currentBanner.title||currentBanner.name||currentBanner.original_name}</h1>
    <div className='moviebanner-button'>
      <div><button> <i className="fa fa-play"></i> Play</button></div>
      {watchlist && watchlist.some((data) => data._id === currentBanner._id) ? (
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
    </>)
    }
  </div>
  )
}

export default TvBanner