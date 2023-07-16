import React, { useEffect } from "react";
import Nav from "../../Components/Nav";
import { template } from "../Utils";
import { useSelector, useDispatch } from "react-redux";
import { fetchCrimeTv } from "../../features/TvSlice";
import '../../Style/Content.css'
import Tvnav from "../../Components/Tvnav";

function CrimeTv() {
  const dispatch = useDispatch();
  const tv = useSelector((state) => state.tv.crime);
  const img_base_url = "https://image.tmdb.org/t/p/original";
  useEffect(() => {
    dispatch(fetchCrimeTv());
  }, [dispatch]);
  return (
    <div>
      <Nav />
      <Tvnav/>
      <>{template("crime", tv.result, "tv", img_base_url)}</>
    </div>
  );
}

export default CrimeTv;
