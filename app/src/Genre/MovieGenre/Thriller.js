import React, {useState, useEffect } from "react";
import Nav from "../../Components/Nav";
import Movienav from "../../Components/Movienav";
import { template } from "../Utils";
import { useSelector, useDispatch } from "react-redux";
import { fetchThriller } from "../../features/MovieSlice";
import "../../Style/Content.css";
import axios from "axios";
import { Watchlist } from "../../Components/request";

function Thriller() {
  const dispatch = useDispatch();
  const [watchlist, setWatchlist] = useState([]);
  const movie = useSelector((state) => state.movie.thriller);
  const loading = useSelector((state) => state.movie.loading);
  const img_base_url = "https://image.tmdb.org/t/p/original";
  useEffect(() => {
    dispatch(fetchThriller());
    getwatchlist()
  }, [dispatch]);
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
    const queryParam = new URLSearchParams({ contentId: contentid });
    axios
      .patch(`${Watchlist.addWatchlist}/${id}`, null, { params: queryParam })
      .then((res) => {
        if (res.data.status === 200) {
          setWatchlist(res.data.contentResult);
        } else if (res.data.status === 409) {
          axios
            .patch(`${Watchlist.deleteWatchlist}/${id}`, null, {
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
          "thriller",
          movie.result,
          "movie",
          img_base_url,
          loading,
          watchlist,
          toggleWatchlist
        )}
      </>
    </div>
  );
}

export default Thriller;
