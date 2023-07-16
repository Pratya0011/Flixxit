import React, { useEffect } from "react";
import Nav from "../../Components/Nav";
import Movienav from "../../Components/Movienav";
import { template } from "../Utils";
import { useSelector, useDispatch } from "react-redux";
import { fetchCrime } from "../../features/MovieSlice";
import '../../Style/Content.css'

function Crime() {
  const dispatch = useDispatch();
  const movie = useSelector((state) => state.movie.crime);
  const img_base_url = "https://image.tmdb.org/t/p/original";
  useEffect(() => {
    dispatch(fetchCrime());
  }, [dispatch]);
  return (
    <div>
      <Nav />
      <Movienav />
      <>{template("crime", movie.result, "movie", img_base_url)}</>
    </div>
  );
}

export default Crime;
