import React, { useEffect } from "react";
import Nav from "../../Components/Nav";
import { template } from "../Utils";
import { useSelector, useDispatch } from "react-redux";
import { fetchDramaTv } from "../../features/TvSlice";
import '../../Style/Content.css'
import Tvnav from "../../Components/Tvnav";

function DramaTv() {
  const dispatch = useDispatch();
  const tv = useSelector((state) => state.tv.drama);
  const img_base_url = "https://image.tmdb.org/t/p/original";
  useEffect(() => {
    dispatch(fetchDramaTv());
  }, [dispatch]);
  return (
    <div>
      <Nav />
      <Tvnav/>
      <>{template("drama", tv.result, "tv", img_base_url)}</>
    </div>
  );
}

export default DramaTv;
