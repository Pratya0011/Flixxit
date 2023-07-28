import React, { useState, useEffect, useRef } from "react";
import { homeRequest, Watchlist, commentsRequest, getuser } from "./request";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import Nav from "./Nav";
import "../Style/Titleview.css";
import "../Style/Home.css";
import { fetchRecomended } from "../features/HomeSlice";

function TitleView() {
  const [data, setData] = useState([]);
  const [watchlist, setWatchlist] = useState([]);
  const [like, setLike] = useState("");
  const [dislike, setDislike] = useState("");
  const [review, setReview] = useState("");
  const [comments, setComments] = useState([]);
  const [commentCount, setCommentCount] = useState(0);
  const [rerender, setRerender] = useState(false);

  const recomended = useSelector((state) => state.home.recomended);
  const loading = useSelector((state) => state.home.loading);

  const recomendedSectionRef = useRef(null);

  const dispatch = useDispatch();
  const img_base_url = "https://image.tmdb.org/t/p/original";
  const navigate = useNavigate();
  useEffect(() => {
    const getData = () => {
      const contentId = localStorage.getItem("contentId");
      axios
        .get(`${homeRequest.getTitle}?contentId=${contentId}`)
        .then((res) => {
          if (res.data.status === 200) {
            setData(res.data.result);
            dispatch(
              fetchRecomended(
                res.data.result[0].genre_ids[
                  Math.floor(
                    Math.random() * res.data.result[0].genre_ids.length
                  )
                ]
              )
            );
          } else {
            setData([]);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    };

    getData();
    getwatchlist();
    getComments();
  }, [dispatch, rerender]);
  const clickHandler = (contentId, navigate) => {
    if (!contentId) {
      return;
    } else {
      localStorage.setItem("contentId", contentId);
      rerender ? setRerender(false) : setRerender(true);
    }
  };

  const getwatchlist = () => {
    const id = localStorage.getItem("userId");
    axios
      .get(`${Watchlist.getWatchlist}/${id}`)
      .then((res) => {
        setWatchlist(res.data.contentResult);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const getComments = () => {
    const contentid = localStorage.getItem("contentId");
    axios
      .get(`${commentsRequest.getComments}/${contentid}`)
      .then((res) => {
        setComments(res.data.comments);
        setCommentCount(res.data.commentCount);
      })
      .catch((err) => {
        throw err;
      });
  };
  const postComment = () => {
    const contentid = localStorage.getItem("contentId");
    const name = localStorage.getItem("name");
    axios
      .post(`${commentsRequest.postComments}/${contentid}`, {
        name: name,
        comment: review,
      })
      .then((res) => {
        console.log(`Your review has been submitted successfully!`);
        rerender ? setRerender(false) : setRerender(true);

      })
      .catch((err) => {
        throw err;
      });
  };
  const toggleWatchlist = (contentid) => {
    const id = localStorage.getItem("userId");
    const queryParam = new URLSearchParams({ contentId: contentid });
    axios
      .patch(`${Watchlist.addWatchlist}/${id}`, null, { params: queryParam })
      .then((res) => {
        if (res.data.status === 200) {
          setWatchlist(res.data.contentResult);
        } else if (res.data.status === 409) {
          axios
            .patch(`${Watchlist.deleteWatchlist}/${id}`, null, {
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

  const playvideo = (contentid) => {
    const id = localStorage.getItem("userId");
    watchlist && watchlist.some((data) => data._id === contentid)
      ? axios.get(`${getuser.getUserById}/${id}`).then((res) => {
          if (res.data.user.subsciption.subscriptionStatus) {
            localStorage.setItem("watchlistId", contentid);
            navigate("/watchplaylist");
          } else {
            navigate("/subscribe");
          }
        })
      : axios.get(`${getuser.getUserById}/${id}`).then((res) => {
          if (res.data.user.subsciption.subscriptionStatus) {
            localStorage.setItem("contentId", contentid);
            navigate("/watch");
          } else {
            navigate("/subscribe");
          }
        });
  };

  const scrollLeftrecomended = (e) => {
    recomendedSectionRef.current.scrollLeft -= 200; // Adjust the scroll distance as needed
    recomendedSectionRef.current.style.scrollBehavior = "smooth";
  };
  const scrollRightrecomended = (e) => {
    recomendedSectionRef.current.scrollLeft += 200; // Adjust the scroll distance as needed
    recomendedSectionRef.current.style.scrollBehavior = "smooth";
  };
  return (
    <div className="titleview-component">
      <Nav />
      {data.length > 0 ? (
        <div
          className="title-banner"
          style={{
            backgroundImage: data
              ? `url(${img_base_url}${data[0].backdrop_path})`
              : "",
          }}
        >
          {data && (
            <>
              <h1>
                {data[0].title === "Like Stars on Earth"
                  ? "Taare Zameen Par"
                  : data[0].title || data[0].name || data[0].original_name}
              </h1>
              <p className="type">
                <span>U/A</span>
                <span>Hindi</span>
              </p>
              <div className="overview">{data[0].overview}</div>
              <div className="banner-button">
                <div>
                  <button
                    onClick={() => {
                      playvideo(data[0]._id);
                    }}
                  >
                    {" "}
                    <i className="fa fa-play"></i> Play
                  </button>
                </div>
                {watchlist &&
                watchlist.some((item) => item._id === data[0]._id) ? (
                  <div
                    className="plus"
                    onClick={() => {
                      toggleWatchlist(data[0]._id);
                    }}
                  >
                    ✓
                  </div>
                ) : (
                  <div
                    className="plus"
                    onClick={() => {
                      toggleWatchlist(data[0]._id);
                    }}
                  >
                    +
                  </div>
                )}
                <div
                  className={`plus ${like}`}
                  onClick={() => {
                    like === "like" ? setLike("") : setLike("like");
                  }}
                >
                  <i className="fa fa-thumbs-up" aria-hidden="true"></i>
                </div>
                <div
                  className={`plus ${dislike}`}
                  onClick={() => {
                    dislike === "like" ? setDislike("") : setDislike("like");
                  }}
                >
                  <i className="fa-solid fa-thumbs-down"></i>
                </div>
              </div>
            </>
          )}
        </div>
      ) : (
        <div>No data available</div>
      )}
      {recomended.result && recomended.result.length > 0 ? (
        <div className="recomended">
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
                          <div className="row-item">
                            <p
                              className="title"
                              onClick={() => {
                                clickHandler(item._id, navigate);
                              }}
                            >
                              {(
                                item.name ||
                                item.title ||
                                item.original_name
                              ).slice(0, 10) + "..."}
                            </p>
                            <p className="date">
                              {item.release_date.slice(0, 4)}
                            </p>
                          </div>
                          {watchlist &&
                          watchlist.some((data) => data._id === item._id) ? (
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
                      <p
                        onClick={() => {
                          clickHandler(item._id, navigate);
                        }}
                      >
                        {item.name || item.title || item.original_name}
                      </p>
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
        </div>
      ) : (
        <></>
      )}
      <div>
        <div className="review-div">
          <div className="heading">Reviews</div>
          <div className="commentcount">Comments({commentCount})</div>
          <div className="textarea">
            <textarea
              placeholder="Add your review"
              value={review}
              onChange={(e) => {
                setReview(e.target.value);
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  if (review) {
                    postComment();
                    setReview("");
                  } else {
                    alert("Please enter some text");
                  }
                }
              }}
            />
          </div>
          <div className="comment-wrapper">
            {comments && comments.length > 0 && comments[0].length > 0 ? (
              <div>
                {comments[0].map((item, index) => (
                  <div key={index} className="comment-div">
                    <div className="name">{item.name}</div>
                    <div className="comment">{item.comment}</div>
                  </div>
                ))}
              </div>
            ) : (
              <div>No reviews yet! Be the first to add a comment...</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default TitleView;
