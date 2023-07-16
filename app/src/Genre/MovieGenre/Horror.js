import React, { useEffect } from "react";
import Nav from "../../Components/Nav";
import Movienav from "../../Components/Movienav";
import { template } from "../Utils";
import { useSelector, useDispatch } from "react-redux";
import { fetchHorror } from "../../features/MovieSlice";
import '../../Style/Content.css'

function Horror() {
  const dispatch = useDispatch();
  const movie = useSelector((state) => state.movie.horror);
  const img_base_url = "https://image.tmdb.org/t/p/original";
  useEffect(() => {
    dispatch(fetchHorror());
  }, [dispatch]);
  return (
    <div>
      <Nav />
      <Movienav />
      <>{template("horror", movie.result, "movie", img_base_url)}</>
    </div>
  );
}

export default Horror;
