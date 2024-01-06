import React, { useState, useEffect, useRef } from "react";
import Nav from "./Nav";
import TvBanner from "./TvBanner";
import Tvnav from "./Tvnav";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchTopRated,
  fetchPopular,
  fetchCrimeTv,
  fetchDocumentaryTv,
  fetchDramaTv,
} from "../features/TvSlice";
import "../Style/Home.css";
import { Watchlist } from "./request";
import { clickHandler } from "./Utils";
import {get, patch} from "../Custom/useApi";

function Shows() {
  const [watchlist, setWatchlist] = useState([]);
  const toprated = useSelector((state) => state.tv.topratedtv);
  const popular = useSelector((state) => state.tv.populartv);
  const crime = useSelector((state) => state.tv.crime);
  const documentary = useSelector((state) => state.tv.documentary);
  const drama = useSelector((state) => state.tv.drama);
  const loading = useSelector((state)=>state.tv.loading)

  const dispatch = useDispatch();
  const img_base_url = "https://image.tmdb.org/t/p/original";
  const navigate = useNavigate()

  const topratedSectionRef = useRef(null);
  const popularSectionRef = useRef(null);
  const crimeSectionRef = useRef(null);
  const dramaSectionRef = useRef(null);
  const documentarySectionRef = useRef(null);

  useEffect(() => {
    dispatch(fetchTopRated());
    dispatch(fetchPopular());
    dispatch(fetchCrimeTv());
    dispatch(fetchDocumentaryTv());
    dispatch(fetchDramaTv());
    getwatchlist();
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
  const getwatchlist = () => {
    const id = localStorage.getItem("userId");
    get(`${Watchlist.getWatchlist}/${id}`)
      .then((res) => {
        setWatchlist(res.data.contentResult);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const toggleWatchlist = (contentid) => {
    const id = localStorage.getItem("userId");
    const queryParam = new URLSearchParams({ contentId: contentid });
    patch(`${Watchlist.addWatchlist}/${id}`, {}, { params: queryParam })
      .then((res) => {
        if (res.data.status === 200) {
          setWatchlist(res.data.contentResult);
        } else if (res.data.status === 409) {
          patch(`${Watchlist.deleteWatchlist}/${id}`, {}, {
              params: queryParam,
            })
            .then((res) => {
              setWatchlist(res.data.contentResult);
            })
            .catch((err) => {
              console.log(err);
            });
        } else {
          alert("Something went wrong");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="component">
      <Nav />
      <Tvnav />
      <TvBanner />
      <div className="heading">Top Rated</div>
      {loading?(<div className="spinner-div">
        <div className="spinner"></div></div>
      ):(toprated && toprated.result && (
        <div className="section-container">
          <div className="scroll-arrow left-arrow" onClick={scrollLefttoprated}>
            <span className="arrow-icon">
              <i className="fa fa-angle-left"></i>
            </span>
          </div>

          <div className="row" ref={topratedSectionRef}>
            {toprated.result.map((item, index) => (
              <div key={index} >
                <div
                  className="row-div"
                  style={{
                    backgroundImage: item
                      ? `url(${img_base_url}${item.poster_path})`
                      : "",
                  }}
                >
                  <div className="row-content">
                      <div className="row-item">
                        <p className="title" onClick={()=>{clickHandler(item._id, navigate)}}>
                          {(
                            item.name ||
                            item.title ||
                            item.original_name
                          ).slice(0, 10) + "..."}
                        </p>
                        <p className="date">{item.release_date.slice(0, 4)}</p>
                      </div>
                      {watchlist && watchlist.some((data) => data._id === item._id) ? (
                        <div
                          className="plus"
                          onClick={() => {
                            toggleWatchlist(item._id);
                          }}
                        >
                          ✓
                        </div>
                      ) : (
                        <div
                          className="plus"
                          onClick={() => {
                            toggleWatchlist(item._id);
                          }}
                        >
                          +
                        </div>
                      )}
                    </div>
                </div>
                <p onClick={()=>{clickHandler(item._id, navigate)}}>{item.name || item.title || item.original_name}</p>
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
      ))}
      <div className="heading">Popular</div>
      {loading?(<div className="spinner-div">
        <div className="spinner"></div></div>
      ):(popular && popular.result && (
        <div className="section-container">
          <div className="scroll-arrow left-arrow" onClick={scrollLeftPopular}>
            <span className="arrow-icon">
              <i className="fa fa-angle-left"></i>
            </span>
          </div>

          <div className="row" ref={popularSectionRef}>
            {popular.result.map((item, index) => (
              <div key={index} >
                <div
                  className="row-div"
                  style={{
                    backgroundImage: item
                      ? `url(${img_base_url}${item.poster_path})`
                      : "",
                  }}
                >
                  <div className="row-content">
                      <div className="row-item">
                        <p className="title" onClick={()=>{clickHandler(item._id, navigate)}}>
                          {(
                            item.name ||
                            item.title ||
                            item.original_name
                          ).slice(0, 10) + "..."}
                        </p>
                        <p className="date">{item.release_date.slice(0, 4)}</p>
                      </div>
                      {watchlist && watchlist.some((data) => data._id === item._id) ? (
                        <div
                          className="plus"
                          onClick={() => {
                            toggleWatchlist(item._id);
                          }}
                        >
                          ✓
                        </div>
                      ) : (
                        <div
                          className="plus"
                          onClick={() => {
                            toggleWatchlist(item._id);
                          }}
                        >
                          +
                        </div>
                      )}
                    </div>
                </div>
                <p onClick={()=>{clickHandler(item._id, navigate)}}>{item.name || item.title || item.original_name}</p>
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
      ))}
      <div className="heading">Crime</div>
      {loading?(<div className="spinner-div">
        <div className="spinner"></div></div>
      ):(crime && crime.result && (
        <div className="section-container">
          <div className="scroll-arrow left-arrow" onClick={scrollLeftcrime}>
            <span className="arrow-icon">
              <i className="fa fa-angle-left"></i>
            </span>
          </div>

          <div className="row" ref={crimeSectionRef}>
            {crime.result.slice(0,10).map((item, index) => (
              <div key={index} >
                <div
                  className="row-div"
                  style={{
                    backgroundImage: item
                      ? `url(${img_base_url}${item.poster_path})`
                      : "",
                  }}
                >
                  <div className="row-content">
                      <div className="row-item">
                        <p className="title" onClick={()=>{clickHandler(item._id, navigate)}}>
                          {(
                            item.name ||
                            item.title ||
                            item.original_name
                          ).slice(0, 10) + "..."}
                        </p>
                        <p className="date">{item.release_date.slice(0, 4)}</p>
                      </div>
                      {watchlist && watchlist.some((data) => data._id === item._id) ? (
                        <div
                          className="plus"
                          onClick={() => {
                            toggleWatchlist(item._id);
                          }}
                        >
                          ✓
                        </div>
                      ) : (
                        <div
                          className="plus"
                          onClick={() => {
                            toggleWatchlist(item._id);
                          }}
                        >
                          +
                        </div>
                      )}
                    </div>
                </div>
                <p onClick={()=>{clickHandler(item._id, navigate)}}>{item.name || item.title || item.original_name}</p>
              </div>
            ))}
          </div>
          <div className="scroll-arrow right-arrow" onClick={scrollRightcrime}>
            <span className="arrow-icon">
              <i className="fa fa-angle-right"></i>
            </span>
          </div>
        </div>
      ))}
      <div className="heading">Drama</div>
      {loading?(<div className="spinner-div">
        <div className="spinner"></div></div>
      ):(drama && drama.result && (
        <div className="section-container">
          <div className="scroll-arrow left-arrow" onClick={scrollLeftdrama}>
            <span className="arrow-icon">
              <i className="fa fa-angle-left"></i>
            </span>
          </div>

          <div className="row" ref={dramaSectionRef}>
            {drama.result.slice(0,10).map((item, index) => (
              <div key={index} >
                <div
                  className="row-div"
                  style={{
                    backgroundImage: item
                      ? `url(${img_base_url}${item.poster_path})`
                      : "",
                  }}
                >
                  <div className="row-content">
                      <div className="row-item">
                        <p className="title" onClick={()=>{clickHandler(item._id, navigate)}}>
                          {(
                            item.name ||
                            item.title ||
                            item.original_name
                          ).slice(0, 10) + "..."}
                        </p>
                        <p className="date">{item.release_date.slice(0, 4)}</p>
                      </div>
                      {watchlist && watchlist.some((data) => data._id === item._id) ? (
                        <div
                          className="plus"
                          onClick={() => {
                            toggleWatchlist(item._id);
                          }}
                        >
                          ✓
                        </div>
                      ) : (
                        <div
                          className="plus"
                          onClick={() => {
                            toggleWatchlist(item._id);
                          }}
                        >
                          +
                        </div>
                      )}
                    </div>
                </div>
                <p onClick={()=>{clickHandler(item._id, navigate)}}>{item.name || item.title || item.original_name}</p>
              </div>
            ))}
          </div>
          <div className="scroll-arrow right-arrow" onClick={scrollRightdrama}>
            <span className="arrow-icon">
              <i className="fa fa-angle-right"></i>
            </span>
          </div>
        </div>
      ))}
      <div className="heading">Documentary</div>
      {loading?(<div className="spinner-div">
        <div className="spinner"></div></div>
      ):(documentary && documentary.result && (
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
              <div key={index} >
                <div
                  className="row-div"
                  style={{
                    backgroundImage: item
                      ? `url(${img_base_url}${item.poster_path})`
                      : "",
                  }}
                >
                  <div className="row-content">
                      <div className="row-item">
                        <p className="title" onClick={()=>{clickHandler(item._id, navigate)}}>
                          {(
                            item.name ||
                            item.title ||
                            item.original_name
                          ).slice(0, 10) + "..."}
                        </p>
                        {item.release_date && <p className="date">{item.release_date.slice(0, 4)}</p>}
                      </div>
                      {watchlist && watchlist.some((data) => data._id === item._id) ? (
                        <div
                          className="plus"
                          onClick={() => {
                            toggleWatchlist(item._id);
                          }}
                        >
                          ✓
                        </div>
                      ) : (
                        <div
                          className="plus"
                          onClick={() => {
                            toggleWatchlist(item._id);
                          }}
                        >
                          +
                        </div>
                      )}
                    </div>
                </div>
                <p onClick={()=>{clickHandler(item._id, navigate)}}>{item.name || item.title || item.original_name}</p>
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
      ))}
    </div>
  );
}

export default Shows;
