import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import axios from "axios";
import "../Style/Nav.css";

function Nav() {
  const [search, setSearch] = useState("");
  const [role, setRole] = useState("");
  const id = useSelector((state) => state.app.id);

  useEffect(() => {
    getUser();
  });

  const getUser = () => {
    axios
      .get(`http://localhost:8080/admin/getUser/${id}`)
      .then((res) => {
        setRole(res.data.user.role);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="navbar-component">
      <div className="navbar">
        <div className="right-menu">
          <div id="logo">
            <h2>Flᴉxxᴉt</h2>
          </div>
          <ul className="links">
            {role === "admin" ? (
              <NavLink
                className={({ isActive }) => (isActive ? "active" : "inactive")}
                to="/Dashboard"
              >
                <li>Dashboard</li>
              </NavLink>
            ) : (
              <></>
            )}
            <NavLink
              className={({ isActive }) => (isActive ? "active" : "inactive")}
              to="/Home"
            >
              <li>Home</li>
            </NavLink>
            <NavLink
              className={({ isActive }) => (isActive? "active" : "inactive")}
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
          </ul>

          <div className="search-container">
            <input
              type="text"
              className={`search-input ${search}`}
              placeholder="Search"
            />
            <i
              className="fas fa-search search-icon"
              onClick={() => setSearch(search === "active" ? "" : "active")}
            ></i>
          </div>
          <div className="profole-icon">
            <i className="fa fa-user" aria-hidden="true"></i>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Nav;
