import React, { useEffect } from "react";
import Nav from "../../Components/Nav";
import Movienav from "../../Components/Movienav";
import { template } from "../Utils";
import { useSelector, useDispatch } from "react-redux";
import { fetchDrama } from "../../features/MovieSlice";
import '../../Style/Content.css'

function Drama() {
  const dispatch = useDispatch();
  const movie = useSelector((state) => state.movie.drama);
  const img_base_url = "https://image.tmdb.org/t/p/original";
  useEffect(() => {
    dispatch(fetchDrama());
  }, [dispatch]);
  return (
    <div>
      <Nav />
      <Movienav />
      <>{template("drama", movie.result, "movie", img_base_url)}</>
    </div>
  );
}

export default Drama;
