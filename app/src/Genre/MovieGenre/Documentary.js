import React, { useEffect } from "react";
import Nav from "../../Components/Nav";
import Movienav from "../../Components/Movienav";
import { template } from "../Utils";
import { useSelector, useDispatch } from "react-redux";
import { fetchDocumentary } from "../../features/MovieSlice";
import '../../Style/Content.css'

function Documentary() {
  const dispatch = useDispatch();
  const movie = useSelector((state) => state.movie.documentary);
  const img_base_url = "https://image.tmdb.org/t/p/original";
  useEffect(() => {
    dispatch(fetchDocumentary());
  }, [dispatch]);
  return (
    <div>
      <Nav />
      <Movienav />
      <>{template("documentary", movie.result, "movie", img_base_url)}</>
    </div>
  );
}

export default Documentary;
