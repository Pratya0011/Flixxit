import React, { useState, useEffect } from "react";
import Nav from "./Nav";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchDocumentary,
  fetchPopular,
  fetchTopRated,
  fetchTopten,
} from "../features/HomeSlice";
import Hoding from "./Hoding.js";
import '../Style/Home.css'

function Home() {
  const toprated = useSelector((state) => state.home.toprated);
  const popular = useSelector((state) => state.home.popular);
  const topten = useSelector((state) => state.home.topten);
  const documentary = useSelector((state) => state.home.documentary);
  const dispatch = useDispatch();
  const img_base_url = "https://image.tmdb.org/t/p/original";

  useEffect(() => {
    dispatch(fetchTopRated());
    dispatch(fetchPopular());
    dispatch(fetchTopten());
    dispatch(fetchDocumentary());
  }, [dispatch]);

  return (
    <div>
      <Nav />
      <Hoding />
      <h1>Top Rated</h1>
      {toprated && toprated.result && (
        <div className="row">
        {toprated.result.map((item, index) => (
          <div key={index}>
            <div className="toprated"
              style={{
                backgroundImage: item
                  ? `url(${img_base_url}${item.poster_path})`
                  : "",
              }}
            ></div>
          </div>
        ))}
        
      </div>
      )}
      <h1>Popular</h1>
      {popular && popular.result && (
        <div className="row">
        {popular.result.map((item, index) => (
          <div key={index}>
            <div className="toprated"
              style={{
                backgroundImage: item
                  ? `url(${img_base_url}${item.poster_path})`
                  : "",
              }}
            ></div>
          </div>
        ))}
        
      </div>
      )}
      <h1>Top Ten</h1>
      {topten && topten.result && (
        <div className="row">
        {topten.result.map((item, index) => (
          <div key={index}>
            <div className="toprated"
              style={{
                backgroundImage: item
                  ? `url(${img_base_url}${item.poster_path})`
                  : "",
              }}
            ></div>
          </div>
        ))}
        
      </div>
      )}
    </div>
  );
}

export default Home;
