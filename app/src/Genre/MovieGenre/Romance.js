import React, { useEffect } from "react";
import Nav from "../../Components/Nav";
import Movienav from "../../Components/Movienav";
import { template } from "../Utils";
import { useSelector, useDispatch } from "react-redux";
import { fetchRomance } from "../../features/MovieSlice";
import '../../Style/Content.css'

function Romance() {
  const dispatch = useDispatch();
  const movie = useSelector((state) => state.movie.romance);
  const img_base_url = "https://image.tmdb.org/t/p/original";
  useEffect(() => {
    dispatch(fetchRomance());
  }, [dispatch]);
  return (
    <div>
      <Nav />
      <Movienav />
      <>{template("romance", movie.result, "movie", img_base_url)}</>
    </div>
  );
}

export default Romance;
