import React, { useEffect, useState, useRef } from "react";
import ProfileOptions from "./ProfileOptions";
import { useSelector,useDispatch } from "react-redux";
import { NavLink,useNavigate } from "react-router-dom";
import "../Style/Nav.css";
import { fetchSearch, setSeachName } from "../features/AppSlice";
import { subscribitionPlan } from "./request";
import { getuser } from "./request";
import {get, patch} from "../Custom/useApi";

function Nav() {
  const [search, setSearch] = useState("");
  const [role, setRole] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [value, setValue] = useState('')
  const [showProfileOptions, setShowProfileOptions] = useState(false);
  const id = useSelector((state) => state.app.id);
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const profileIconRef = useRef(null);

  useEffect(() => {
    const getUser = () => {
      get(`${getuser.getUserById}/${id}`)
        .then((res) => {
          setRole(res.data.user.role);
         let currentDate = new Date()
         if(currentDate < new Date(res.data.user.payment.expiredDate)){
          setSubscribed(res.data.user.subscription.subscriptionStatus)
         }else{
          patch(`${subscribitionPlan.updatePaymentStatus}/${id}`).then((res)=>{
            setSubscribed(res.data.user.subscription.subscriptionStatus)
          }).catch(err=>{
            console.log("Error in patch request:", err);
          })
         }
        })
        .catch((err) => {
          console.log("Error in get request:", err);
        });
    };
    getUser()
    const handleScroll = () => {
      if (window.scrollY > 160) {
        document.getElementById("navbar-component").classList.add("dark");
      } else {
        document.getElementById("navbar-component").classList.remove("dark");
      }
    };

    window.addEventListener("scroll", handleScroll);

    const handleOutsideClick = (event) => {
      if (
        profileIconRef.current &&
        !profileIconRef.current.contains(event.target)
      ) {
        setShowProfileOptions(false);
      }
    };

    document.addEventListener("click", handleOutsideClick);


    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("click", handleOutsideClick);
    };
  },[id]);

  const toggleProfileOptions = () => {
    setShowProfileOptions(!showProfileOptions);
  };



  return (
    <div className="navbar-component" id="navbar-component">
      <div className="navbar">
        <div className="right-menu">
          <div id="logo">
            <h2>Flᴉxxᴉt</h2>
          </div>
          <ul className="links">
            <NavLink
              className={({ isActive }) => (isActive ? "active" : "inactive")}
              to="/"
            >
              <li>Home</li>
            </NavLink>
            <NavLink
              className={({ isActive }) => (isActive ? "active" : "inactive")}
              to="/Movies"
            >
              <li>Movies</li>
            </NavLink>
            <NavLink
              className={({ isActive }) => (isActive ? "active" : "inactive")}
              to="/Shows"
            >
              <li>Tv Shows</li>
            </NavLink>
            {role === "admin" ? (
              <NavLink
                className={({ isActive }) => (isActive ? "active" : "inactive")}
                to="/Dashboard/overview"
              >
                <li>Dashboard</li>
              </NavLink>
            ) : (
              <></>
            )}
          </ul>

          <div className="search-container">
            <input
              type="text"
              className={`search-input ${search}`}
              placeholder="Search"
              value={value}
              onChange={(e) => {
                setValue(e.target.value)
              }}
              onKeyDown={(e)=>{
                if(e.key === "Enter"){
                  dispatch(fetchSearch(value))
                  dispatch(setSeachName(value))
                navigate('/search')
                }
              }}
            />
            <i
              className="fas fa-search search-icon"
              onClick={() => setSearch(search === "active" ? "" : "active")}
            ></i>
          </div>
          {!subscribed ? (
            <div className="subscribe-div">
              <button onClick={() => navigate("/subscribe")}>SUBSCRIBE</button>
            </div>
          ) : (
            <></>
          )}
          <div className="profole-icon" onClick={toggleProfileOptions} ref={profileIconRef}>
            <i className="fa fa-user" aria-hidden="true"></i>
          </div>
        </div>
      </div>
      <ProfileOptions showProfileOptions={showProfileOptions}  />
    </div>
  );
}

export default Nav;
