import React, { useState, useEffect, useRef } from "react";
import Nav from "./Nav";
import Movienav from "./Movienav";
import MovieBanner from "./MovieBanner";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchTopRated,
  fetchPopular,
  fetchAction,
  fetchAdventure,
  fetchComedy,
  fetchCrime,
  fetchDocumentary,
  fetchDrama,
  fetchHorror,
  fetchRomance,
  fetchThriller,
} from "../features/MovieSlice";
import "../Style/Home.css";

function Movies() {
  const toprated = useSelector((state) => state.movie.topratedmovies);
  const popular = useSelector((state) => state.movie.popularmovies);
  const action = useSelector((state) => state.movie.action);
  const adventure = useSelector((state) => state.movie.adventure);
  const thriller = useSelector((state) => state.movie.thriller);
  const crime = useSelector((state) => state.movie.crime);
  const comedy = useSelector((state) => state.movie.comedy);
  const horror = useSelector((state) => state.movie.horror);
  const romance = useSelector((state) => state.movie.romance);
  const documentary = useSelector((state) => state.movie.documentary);
  const drama = useSelector((state) => state.movie.drama);
  const dispatch = useDispatch();
  const img_base_url = "https://image.tmdb.org/t/p/original";
  const topratedSectionRef = useRef(null);
  const popularSectionRef = useRef(null);
  const thrillerSectionRef = useRef(null);
  const crimeSectionRef = useRef(null);
  const dramaSectionRef = useRef(null);
  const documentarySectionRef = useRef(null);

  useEffect(() => {
    dispatch(fetchTopRated());
    dispatch(fetchPopular());
    dispatch(fetchAction());
    dispatch(fetchAdventure());
    dispatch(fetchComedy());
    dispatch(fetchCrime());
    dispatch(fetchDocumentary());
    dispatch(fetchHorror());
    dispatch(fetchRomance());
    dispatch(fetchThriller());
    dispatch(fetchDrama());
  }, [dispatch]);

  const scrollLefttoprated = (e) => {
    topratedSectionRef.current.scrollLeft -= 200; // Adjust the scroll distance as needed
    topratedSectionRef.current.style.scrollBehavior = "smooth";
  };

  const scrollRighttoprated = (e) => {
    topratedSectionRef.current.scrollLeft += 200; // Adjust the scroll distance as needed
    topratedSectionRef.current.style.scrollBehavior = "smooth";
  };
  const scrollLeftPopular = (e) => {
    popularSectionRef.current.scrollLeft -= 200; // Adjust the scroll distance as needed
    popularSectionRef.current.style.scrollBehavior = "smooth";
  };
  const scrollRightPopular = (e) => {
    popularSectionRef.current.scrollLeft += 200; // Adjust the scroll distance as needed
    popularSectionRef.current.style.scrollBehavior = "smooth";
  };
  const scrollLeftthriller = (e) => {
    thrillerSectionRef.current.scrollLeft -= 200; // Adjust the scroll distance as needed
    thrillerSectionRef.current.style.scrollBehavior = "smooth";
  };
  const scrollRightthriller = (e) => {
    thrillerSectionRef.current.scrollLeft += 200; // Adjust the scroll distance as needed
    thrillerSectionRef.current.style.scrollBehavior = "smooth";
  };
  const scrollLeftcrime = (e) => {
    crimeSectionRef.current.scrollLeft -= 200; // Adjust the scroll distance as needed
    crimeSectionRef.current.style.scrollBehavior = "smooth";
  };
  const scrollRightcrime = (e) => {
    crimeSectionRef.current.scrollLeft += 200; // Adjust the scroll distance as needed
    crimeSectionRef.current.style.scrollBehavior = "smooth";
  };
  const scrollLeftdrama = (e) => {
    dramaSectionRef.current.scrollLeft -= 200; // Adjust the scroll distance as needed
    dramaSectionRef.current.style.scrollBehavior = "smooth";
  };
  const scrollRightdrama = (e) => {
    dramaSectionRef.current.scrollLeft += 200; // Adjust the scroll distance as needed
    dramaSectionRef.current.style.scrollBehavior = "smooth";
  };
  const scrollLeftdocumentary = (e) => {
    documentarySectionRef.current.scrollLeft -= 200; // Adjust the scroll distance as needed
    documentarySectionRef.current.style.scrollBehavior = "smooth";
  };
  const scrollRightdocumentary = (e) => {
    documentarySectionRef.current.scrollLeft += 200; // Adjust the scroll distance as needed
    documentarySectionRef.current.style.scrollBehavior = "smooth";
  };
  return (
    <div>
      <Nav />
      <Movienav />
      <MovieBanner />
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
          <div
            className="scroll-arrow right-arrow"
            onClick={scrollRighttoprated}
          >
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
          <div
            className="scroll-arrow right-arrow"
            onClick={scrollRightPopular}
          >
            <span className="arrow-icon">
              <i className="fa fa-angle-right"></i>
            </span>
          </div>
        </div>
      )}
      <div className="heading">Thriller</div>
      {thriller && thriller.result && (
        <div className="section-container">
          <div className="scroll-arrow left-arrow" onClick={scrollLeftthriller}>
            <span className="arrow-icon">
              <i className="fa fa-angle-left"></i>
            </span>
          </div>

          <div className="row" ref={thrillerSectionRef}>
            {thriller.result.slice(0, 10).map((item, index) => (
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
            onClick={scrollRightthriller}
          >
            <span className="arrow-icon">
              <i className="fa fa-angle-right"></i>
            </span>
          </div>
        </div>
      )}
      <div className="heading">Crime</div>
      {crime && crime.result && (
        <div className="section-container">
          <div className="scroll-arrow left-arrow" onClick={scrollLeftcrime}>
            <span className="arrow-icon">
              <i className="fa fa-angle-left"></i>
            </span>
          </div>

          <div className="row" ref={crimeSectionRef}>
            {crime.result.slice(9, 19).map((item, index) => (
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
          <div className="scroll-arrow right-arrow" onClick={scrollRightcrime}>
            <span className="arrow-icon">
              <i className="fa fa-angle-right"></i>
            </span>
          </div>
        </div>
      )}
      <div className="heading">Drama</div>
      {drama && drama.result && (
        <div className="section-container">
          <div className="scroll-arrow left-arrow" onClick={scrollLeftdrama}>
            <span className="arrow-icon">
              <i className="fa fa-angle-left"></i>
            </span>
          </div>

          <div className="row" ref={dramaSectionRef}>
            {drama.result.slice(11, 21).map((item, index) => (
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
          <div className="scroll-arrow right-arrow" onClick={scrollRightdrama}>
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
            onClick={scrollLeftdocumentary}
          >
            <span className="arrow-icon">
              <i className="fa fa-angle-left"></i>
            </span>
          </div>

          <div className="row" ref={documentarySectionRef}>
            {documentary.result.slice(0, 10).map((item, index) => (
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
            onClick={scrollRightdocumentary}
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

export default Movies;
