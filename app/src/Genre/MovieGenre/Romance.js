import React, { useState, useEffect } from "react";
import Nav from "../../Components/Nav";
import Movienav from "../../Components/Movienav";
import { template } from "../Utils";
import { useSelector, useDispatch } from "react-redux";
import { fetchRomance } from "../../features/MovieSlice";
import "../../Style/Content.css";
import { Watchlist } from "../../Components/request";
import { clickHandler } from "../../Components/Utils";
import { useNavigate } from "react-router-dom";
import useApi from "../../Custom/useApi";

function Romance() {
  const dispatch = useDispatch();
  const [watchlist, setWatchlist] = useState([]);
  const {get, patch} = useApi()
  const movie = useSelector((state) => state.movie.romance);
  const loading = useSelector((state) => state.movie.loading);
  const img_base_url = "https://image.tmdb.org/t/p/original";
  const navigate = useNavigate()
  useEffect(() => {
    dispatch(fetchRomance());
    getwatchlist();
  }, [dispatch]);
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
  return (
    <div>
      <Nav />
      <Movienav />
      <>
        {template(
          "romance",
          movie.result,
          "movie",
          img_base_url,
          loading,
          watchlist,
          toggleWatchlist,
          clickHandler,
          navigate
        )}
      </>
    </div>
  );
}

export default Romance;
