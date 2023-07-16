import React, { useEffect } from "react";
import Nav from "../../Components/Nav";
import Movienav from "../../Components/Movienav";
import { template } from "../Utils";
import { useSelector, useDispatch } from "react-redux";
import { fetchComedy } from "../../features/MovieSlice";
import '../../Style/Content.css'

function Comedy() {
  const dispatch = useDispatch();
  const movie = useSelector((state) => state.movie.comedy);
  const img_base_url = "https://image.tmdb.org/t/p/original";
  useEffect(() => {
    dispatch(fetchComedy());
  }, [dispatch]);
  return (
    <div>
      <Nav />
      <Movienav />
      <>{template("comedy", movie.result, "movie", img_base_url)}</>
    </div>
  );
}

export default Comedy;
