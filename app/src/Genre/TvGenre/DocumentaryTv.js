import React, { useEffect } from "react";
import Nav from "../../Components/Nav";
import { template } from "../Utils";
import { useSelector, useDispatch } from "react-redux";
import { fetchDocumentaryTv } from "../../features/TvSlice";
import '../../Style/Content.css'
import Tvnav from "../../Components/Tvnav";

function DocumentaryTv() {
  const dispatch = useDispatch();
  const tv = useSelector((state) => state.tv.documentary);
  const img_base_url = "https://image.tmdb.org/t/p/original";
  useEffect(() => {
    dispatch(fetchDocumentaryTv());
  }, [dispatch]);
  return (
    <div>
      <Nav />
      <Tvnav/>
      <>{template("documentary", tv.result, "tv", img_base_url)}</>
    </div>
  );
}

export default DocumentaryTv;
