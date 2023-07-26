import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Nav from "./Nav";
import "../Style/Search.css";

function Search() {
  const selector = useSelector((state) => state.app.search);
  const searchName = useSelector((state) => state.app.searchName);
  const loading = useSelector((state) => state.app.loading);
  const img_base_url = "https://image.tmdb.org/t/p/original";
  return (
    <div className="search-component">
      <Nav />
      <div className="search-div">
        <div className="search-heading">
          Showing results for <span>"{searchName}"</span>
        </div>
        <div className="coloum">
          {loading ? (
            <div className="spinner-div">
              <div className="spinner"></div>
            </div>
          ) : selector.length > 0 ? (
            selector.map((item, index) => (
              <div
                key={index}
                className="coloum-container"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="coloum-div">
                  <img
                    src={img_base_url + item.poster_path}
                    style={{ height: "30vh", width: "12vw" }}
                    alt={item.name || item.title}
                  />
                  <div className="row-content">
                    <div className="row-item">
                      <p className="title">
                        {(item.name || item.title || item.original_name).slice(
                          0,
                          10
                        ) + "..."}
                      </p>
                    </div>
                    <div className="date">{item.release_date.slice(0, 4)}</div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div>No content found</div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Search;