import React,{ useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";
import Nav from './Nav'
import "../Style/Search.css";
import { clickHandler } from "./Utils";
import { Watchlist } from "./request";
import {get, patch} from '../Custom/useApi';


function WatchlistComponent() {
  const [loading, setLoading] = useState(true)
  const img_base_url = "https://image.tmdb.org/t/p/original";
  const navigate = useNavigate();
  const [watchlist,setWatchlist]=useState([])
  const [newWatchlist, setNewWatchlist]= useState([])

  useEffect(()=>{
    const getwatchlist=()=>{
      const id = localStorage.getItem("userId")
      get(`${Watchlist.getWatchlist}/${id}`).then((res)=>{
        setWatchlist(res.data.contentResult)
        setLoading(false)
      }).catch(err=>{
        console.log(err)
        setLoading(true)
      })
      }
      getwatchlist()
  },[newWatchlist])

  const deleteWatchlist = (contentId)=>{
    const id = localStorage.getItem("userId")
    patch(`${Watchlist.deleteWatchlist}/${id}?contentId=${contentId}`).then(res=>{
      setNewWatchlist(res.data.contentResult)
    }).catch(err=>{
      throw err
    })
  }
  return (
    <div className="search-component">
      <Nav/>
      <div className="search-div">
      <div className="coloum">
      {loading ? (
            <div className="spinner-div">
              <div className="spinner"></div>
            </div>
          ) : watchlist && watchlist.length > 0 ? (
            watchlist.map((item, index) => (
              <div
                key={index}
                className="coloum-container"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="coloum-div">
                  <img
                    src={img_base_url + item.poster_path}
                    alt={item.name || item.title}
                  />
                  <div className="row-content">
                    <div className="row-item">
                      <p
                        className="title"
                        onClick={() => {
                          clickHandler(item._id, navigate);
                        }}
                      >
                        {(item.name || item.title || item.original_name).slice(
                          0,
                          10
                        ) + "..."}
                      </p>
                    </div>
                    <div className="date" onClick={()=>{deleteWatchlist(item._id)}}><i class="fa fa-trash" aria-hidden="true"></i></div>
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
            ))
          ) : (
            <div>No content found</div>
          )}
          </div>
          </div>
    </div>
  )
}

export default WatchlistComponent