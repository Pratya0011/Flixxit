import React, { useEffect } from "react";
import Nav from "../../Components/Nav";
import { template } from "../Utils";
import { useSelector, useDispatch } from "react-redux";
import { fetchActionadventure } from "../../features/TvSlice";
import '../../Style/Content.css'
import Tvnav from "../../Components/Tvnav";

function ActionaventureTv() {
  const dispatch = useDispatch();
  const tv = useSelector((state) => state.tv.actionadventure);
  const img_base_url = "https://image.tmdb.org/t/p/original";
  useEffect(() => {
    dispatch(fetchActionadventure());
  }, [dispatch]);
  return (
    <div>
      <Nav />
      <Tvnav/>
      <>{template("action & Adventure", tv.result, "tv", img_base_url)}</>
    </div>
  );
}

export default ActionaventureTv;
