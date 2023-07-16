import React from "react";
import { NavLink } from "react-router-dom";
import "../Style/Movienav.css";

function Tvnav() {
  return (
    <div className="moviebar-component" id="moviebar-component">
      <div className="moviebar">
        <div className="movie-menu">
          <ul className="links">
            <NavLink
              className={({ isActive }) =>
                isActive ? "activate" : "inactivate"
              }
              to="/Shows"
            >
              <li>All Shows</li>
            </NavLink>
            <NavLink
              className={({ isActive }) => (isActive ? "active" : "inactive")}
              to="/Tv/Crime"
            >
              <li>Crime</li>
            </NavLink>
            <NavLink
              className={({ isActive }) => (isActive ? "active" : "inactive")}
              to="/Tv/Drama"
            >
              <li>Drama</li>
            </NavLink>
            <NavLink
              className={({ isActive }) => (isActive ? "active" : "inactive")}
              to="/Tv/Actionadventure"
            >
              <li>Action & Adventure</li>
            </NavLink>
            <NavLink
              className={({ isActive }) => (isActive ? "active" : "inactive")}
              to="/Tv/Comedy"
            >
              <li>Comedy</li>
            </NavLink>
            <NavLink
              className={({ isActive }) => (isActive ? "active" : "inactive")}
              to="/Tv/Mystery"
            >
              <li>Mystery</li>
            </NavLink>
            <NavLink
              className={({ isActive }) => (isActive ? "active" : "inactive")}
              to="/Tv/Documentary"
            >
              <li>Documentary</li>
            </NavLink>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Tvnav;
