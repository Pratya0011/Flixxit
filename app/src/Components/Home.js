import React, { useState, useEffect, useRef } from "react";
import Nav from "./Nav";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  fetchDocumentary,
  fetchPopular,
  fetchRecomended,
  fetchTopRated,
  fetchTopten,
} from "../features/HomeSlice";
import Hoding from "./Hoding.js";
import "../Style/Home.css";
import { Watchlist } from "./request";
import { clickHandler } from "./Utils";
import {get, patch} from "../Custom/useApi.js";

function Home() {
  const [watchlist, setWatchlist] = useState([]);
  const toprated = useSelector((state) => state.home.toprated);
  const popular = useSelector((state) => state.home.popular);
  const topten = useSelector((state) => state.home.topten);
  const documentary = useSelector((state) => state.home.documentary);
  const recomended = useSelector((state)=>state.home.recomended)
  const loading = useSelector((state) => state.home.loading);

  const dispatch = useDispatch();
  const img_base_url = "https://image.tmdb.org/t/p/original";
  const navigate = useNavigate()
   
  const sectionRef = useRef(null);
  const documentarySectionRef = useRef(null);
  const popularSectionRef = useRef(null);
  const topratedSectionRef = useRef(null);
  const recomendedSectionRef = useRef(null)

  useEffect(() => {
    dispatch(fetchTopRated());
    dispatch(fetchPopular());
    dispatch(fetchTopten());
    dispatch(fetchDocumentary());
    dispatch(fetchRecomended(localStorage.getItem('genre')||' '))
    getwatchlist();
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
  const scrollLeftrecomended = (e) => {
    recomendedSectionRef.current.scrollLeft -= 200; // Adjust the scroll distance as needed
    recomendedSectionRef.current.style.scrollBehavior = "smooth";
  };
  const scrollRightrecomended = (e) => {
    recomendedSectionRef.current.scrollLeft += 200; // Adjust the scroll distance as needed
    recomendedSectionRef.current.style.scrollBehavior = "smooth";
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
      <Hoding />
      {recomended.result && recomended.result.length>0? (
        <div>
      <div className="heading">Recomended for you</div>
      {loading ? (
        <div className="spinner-div">
          <div className="spinner"></div>
        </div>
      ) : (
        recomended &&
        recomended.result && (
          <div className="section-container">
            <div
              className="scroll-arrow left-arrow"
              onClick={scrollLeftrecomended}
            >
              <span className="arrow-icon">
                <i className="fa fa-angle-left"></i>
              </span>
            </div>

            <div className="row" ref={recomendedSectionRef}>
              {recomended.result.map((item, index) => (
                <div key={index}>
                  <div
                    className="row-div"
                    style={{
                      backgroundImage: item
                        ? `url(${img_base_url}${item.poster_path})`
                        : "",
                    }}
                  >
                    <div className="row-content">
                      <div className="row-item" onClick={()=>{clickHandler(item._id, navigate)}}>
                        <p className="title">
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
              onClick={scrollRightrecomended}
            >
              <span className="arrow-icon">
                <i className="fa fa-angle-right"></i>
              </span>
            </div>
          </div>
        )
      )}
      </div>):(<></>)}
      <div className="heading">Top Rated</div>
      {loading ? (
        <div className="spinner-div">
          <div className="spinner"></div>
        </div>
      ) : (
        toprated &&
        toprated.result && (
          <div className="section-container">
            <div
              className="scroll-arrow left-arrow"
              onClick={scrollLefttoprated}
            >
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
                      <div className="row-item" onClick={()=>{clickHandler(item._id, navigate)}}>
                        <p className="title">
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
        )
      )}
      <div className="heading">Popular</div>
      {loading ? (
        <div className="spinner-div">
          <div className="spinner"></div>
        </div>
      ) : (
        popular &&
        popular.result && (
          <div className="section-container">
            <div
              className="scroll-arrow left-arrow"
              onClick={scrollLeftPopular}
            >
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
                      <div className="row-item" onClick={()=>{clickHandler(item._id, navigate)}}>
                        <p className="title">
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
        )
      )}
      <div className="heading">Top Ten</div>
      {loading ? (
        <div className="spinner-div">
          <div className="spinner"></div>
        </div>
      ) : (
        topten &&
        topten.result && (
          <div className="section-container">
            <div className="scroll-arrow left-arrow" onClick={scrollLeftTopten}>
              <span className="arrow-icon">
                <i className="fa fa-angle-left"></i>
              </span>
            </div>

            <div className="row" ref={sectionRef}>
              {topten.result.map((item, index) => (
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
                      <div className="row-item" onClick={()=>{clickHandler(item._id, navigate)}}>
                        <p className="title">
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
                  <p>{item.name || item.title || item.original_name}</p>
                </div>
              ))}
            </div>
            <div
              className="scroll-arrow right-arrow"
              onClick={scrollRightTopten}
            >
              <span className="arrow-icon">
                <i className="fa fa-angle-right"></i>
              </span>
            </div>
          </div>
        )
      )}
      <div className="heading">Documentary</div>
      {loading ? (
        <div className="spinner-div">
          <div className="spinner"></div>
        </div>
      ) : (
        documentary &&
        documentary.result && (
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
                      <div className="row-item" onClick={()=>{clickHandler(item._id, navigate)}}>
                        <p className="title">
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
        )
      )}
    </div>
  );
}

export default Home;
