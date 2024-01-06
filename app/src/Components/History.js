import React, { useState, useEffect } from "react";
import { historyRoutes} from "./request";
import Nav from "./Nav";
import { clickHandler } from "./Utils";
import { useNavigate } from "react-router-dom";
import '../Style/History.css'
import { get } from "../Custom/useApi";

function History() {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const img_base_url = "https://image.tmdb.org/t/p/original";
  const navigate = useNavigate()
  useEffect(() => {
    getHistory()
  }, []);
  const getHistory = () => {
    const id = localStorage.getItem("userId");
   get(`${historyRoutes.getHistory}/${id}`)
      .then((res) => {
        setHistory(res.data.contentResult);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(true);
      });
  };
  return <div className="history-component">
    <Nav/>
      <div className="history-container">
        <div className="history-heading">Content Consumed</div>
      <div className="history-div">
      {loading ? (
            <div className="spinner-div">
              <div className="spinner"></div>
            </div>
          ) :history && history.length > 0 ? (
            history.map((item,index)=>(
                <div key={index} className="history-content" onClick={()=>{clickHandler(item._id, navigate)}}>
                    <div>
                    <img
                    src={img_base_url + item.poster_path}
                   
                    alt={item.name || item.title}
                  />
                    </div>
                    <div className="history-title">
                        <div>{item.name || item.title || item.original_name}</div>
                        <div>{item.release_date.slice(0, 4)}</div>
                    </div>
                </div>
            ))
          ): (<div>No content found</div>)}
  </div>
  </div>
  </div>
}

export default History;
