import React, { useEffect } from "react";
import Nav from "../../Components/Nav";
import { template } from "../Utils";
import { useSelector, useDispatch } from "react-redux";
import { fetchComedyTv } from "../../features/TvSlice";
import '../../Style/Content.css'
import Tvnav from "../../Components/Tvnav";

function ComedyTv() {
  const dispatch = useDispatch();
  const tv = useSelector((state) => state.tv.comedy);
  const img_base_url = "https://image.tmdb.org/t/p/original";
  useEffect(() => {
    dispatch(fetchComedyTv());
  }, [dispatch]);
  return (
    <div>
      <Nav />
      <Tvnav/>
      <>{template("comedy", tv.result, "tv", img_base_url)}</>
    </div>
  );
}

export default ComedyTv;
