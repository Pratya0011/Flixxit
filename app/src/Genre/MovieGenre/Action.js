import React, { useEffect } from "react";
import Nav from "../../Components/Nav";
import Movienav from "../../Components/Movienav";
import { template } from "../Utils";
import { useSelector, useDispatch } from "react-redux";
import { fetchAction } from "../../features/MovieSlice";
import '../../Style/Content.css'

function Action() {
  const dispatch = useDispatch();
  const movie = useSelector((state) => state.movie.action);
  const loading = useSelector((state)=>state.movie.loading)
  const img_base_url = "https://image.tmdb.org/t/p/original";
  useEffect(() => {
    dispatch(fetchAction());
  }, [dispatch]);
  return (
    <div>
      <Nav />
      <Movienav />
      <>{template("action", movie.result, "movie", img_base_url,loading)}</>
    </div>
  );
}

export default Action;
