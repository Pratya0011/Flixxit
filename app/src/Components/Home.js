import React, { useState, useEffect, useRef } from "react";
import Nav from "./Nav";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchDocumentary,
  fetchPopular,
  fetchTopRated,
  fetchTopten,
} from "../features/HomeSlice";
import Hoding from "./Hoding.js";
import "../Style/Home.css";

function Home() {
  const toprated = useSelector((state) => state.home.toprated);
  const popular = useSelector((state) => state.home.popular);
  const topten = useSelector((state) => state.home.topten);
  const documentary = useSelector((state) => state.home.documentary);
  const dispatch = useDispatch();
  const img_base_url = "https://image.tmdb.org/t/p/original";
  const sectionRef = useRef(null);
  const documentarySectionRef = useRef(null);
  const popularSectionRef = useRef(null);
  const topratedSectionRef = useRef(null)

  useEffect(() => {
    dispatch(fetchTopRated());
    dispatch(fetchPopular());
    dispatch(fetchTopten());
    dispatch(fetchDocumentary());
  }, [dispatch]);

  const scrollLeftDocumentary = (e) => {
    documentarySectionRef.current.scrollLeft -= 200; // Adjust the scroll distance as needed
    documentarySectionRef.current.style.scrollBehavior = "smooth";
  };

  const scrollRightDocumentary = (e) => {
    documentarySectionRef.current.scrollLeft += 200; // Adjust the scroll distance as needed
    documentarySectionRef.current.style.scrollBehavior = "smooth";
  };
  const scrollLeftTopten = (e) => {
    sectionRef.current.scrollLeft -= 200; // Adjust the scroll distance as needed
    sectionRef.current.style.scrollBehavior = "smooth";
  };

  const scrollRightTopten = (e) => {
    sectionRef.current.scrollLeft += 200; // Adjust the scroll distance as needed
    sectionRef.current.style.scrollBehavior = "smooth";
  };
  const scrollLeftPopular = (e) => {
    popularSectionRef.current.scrollLeft -= 200; // Adjust the scroll distance as needed
    popularSectionRef.current.style.scrollBehavior = "smooth";
  };

  const scrollRightPopular = (e) => {
    popularSectionRef.current.scrollLeft += 200; // Adjust the scroll distance as needed
    popularSectionRef.current.style.scrollBehavior = "smooth";
  };
  const scrollLefttoprated = (e) => {
    topratedSectionRef.current.scrollLeft -= 200; // Adjust the scroll distance as needed
    topratedSectionRef.current.style.scrollBehavior = "smooth";
  };

  const scrollRighttoprated = (e) => {
    topratedSectionRef.current.scrollLeft += 200; // Adjust the scroll distance as needed
    topratedSectionRef.current.style.scrollBehavior = "smooth";
  };
  return (
    <div>
      <Nav />
      <Hoding />
      <div className="heading">Top Rated</div>
      {toprated && toprated.result && (
        <div className="section-container">
          <div className="scroll-arrow left-arrow" onClick={scrollLefttoprated}>
            <span className="arrow-icon">
              <i className="fa fa-angle-left"></i>
            </span>
          </div>

          <div className="row" ref={topratedSectionRef}>
            {toprated.result.map((item, index) => (
              <div key={index}>
                <div
                  className="row-div"
                  style={{
                    backgroundImage: item
                      ? `url(${img_base_url}${item.poster_path})`
                      : "",
                  }}
                ></div>
                <p>{item.name || item.title || item.original_name}</p>
              </div>
            ))}
          </div>
          <div className="scroll-arrow right-arrow" onClick={scrollRighttoprated}>
            <span className="arrow-icon">
              <i className="fa fa-angle-right"></i>
            </span>
          </div>
        </div>
      )}
      <div className="heading">Popular</div>
      {popular && popular.result && (
        <div className="section-container">
          <div className="scroll-arrow left-arrow" onClick={scrollLeftPopular}>
            <span className="arrow-icon">
              <i className="fa fa-angle-left"></i>
            </span>
          </div>

          <div className="row" ref={popularSectionRef}>
            {popular.result.map((item, index) => (
              <div key={index}>
                <div
                  className="row-div"
                  style={{
                    backgroundImage: item
                      ? `url(${img_base_url}${item.poster_path})`
                      : "",
                  }}
                ></div>
                <p>{item.name || item.title || item.original_name}</p>
              </div>
            ))}
          </div>
          <div className="scroll-arrow right-arrow" onClick={scrollRightPopular}>
            <span className="arrow-icon">
              <i className="fa fa-angle-right"></i>
            </span>
          </div>
        </div>
      )}
      <div className="heading">Top Ten</div>
      {topten && topten.result && (
        <div className="section-container">
          <div className="scroll-arrow left-arrow" onClick={scrollLeftTopten}>
            <span className="arrow-icon">
              <i className="fa fa-angle-left"></i>
            </span>
          </div>

          <div className="row" ref={sectionRef}>
            {topten.result.map((item, index) => (
              <div key={index}>
                <div
                  className="row-div"
                  style={{
                    backgroundImage: item
                      ? `url(${img_base_url}${item.poster_path})`
                      : "",
                  }}
                ></div>
                <p>{item.name || item.title || item.original_name}</p>
              </div>
            ))}
          </div>
          <div className="scroll-arrow right-arrow" onClick={scrollRightTopten}>
            <span className="arrow-icon">
              <i className="fa fa-angle-right"></i>
            </span>
          </div>
        </div>
      )}
      <div className="heading">Documentary</div>
      {documentary && documentary.result && (
        <div className="section-container">
          <div
            className="scroll-arrow left-arrow"
            onClick={scrollLeftDocumentary}
          >
            <span className="arrow-icon">
              {" "}
              <i className="fa fa-angle-left"></i>{" "}
            </span>
          </div>

          <div className="row" ref={documentarySectionRef}>
            {documentary.result.map((item, index) => (
              <div key={index}>
                <div
                  className="row-div"
                  style={{
                    backgroundImage: item
                      ? `url(${img_base_url}${item.poster_path})`
                      : "",
                  }}
                ></div>
                <p>{item.name || item.title || item.original_name}</p>
              </div>
            ))}
          </div>
          <div
            className="scroll-arrow right-arrow"
            onClick={scrollRightDocumentary}
          >
            <span className="arrow-icon">
              <i className="fa fa-angle-right"></i>
            </span>
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;
