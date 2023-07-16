import React, { useEffect } from "react";
import Nav from "../../Components/Nav";
import Movienav from "../../Components/Movienav";
import { template } from "../Utils";
import { useSelector, useDispatch } from "react-redux";
import { fetchAdventure } from "../../features/MovieSlice";
import '../../Style/Content.css'

function Adventure() {
  const dispatch = useDispatch();
  const movie = useSelector((state) => state.movie.adventure);
  const img_base_url = "https://image.tmdb.org/t/p/original";
  useEffect(() => {
    dispatch(fetchAdventure());
  }, [dispatch]);
  return (
    <div>
      <Nav />
      <Movienav />
      <>{template("adventure", movie.result, "movie", img_base_url)}</>
    </div>
  );
}

export default Adventure;
