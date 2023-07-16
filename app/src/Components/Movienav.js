import React from "react";
import { NavLink } from "react-router-dom";
import "../Style/Movienav.css";

function Movienav() {
  return (
    <div className="moviebar-component" id="moviebar-component">
      <div className="moviebar">
        <div className="movie-menu">
          <ul className="links">
            <NavLink
              className={({ isActive }) =>
                isActive ? "activate" : "inactivate"
              }
              to="/Movies"
            >
              <li>All Movies</li>
            </NavLink>
            <NavLink
              className={({ isActive }) => (isActive ? "active" : "inactive")}
              to="/Movies/Thriller"
            >
              <li>Thriller</li>
            </NavLink>
            <NavLink
              className={({ isActive }) => (isActive ? "active" : "inactive")}
              to="/Movies/Crime"
            >
              <li>Crime</li>
            </NavLink>
            <NavLink
              className={({ isActive }) => (isActive ? "active" : "inactive")}
              to="/Movies/Drama"
            >
              <li>Drama</li>
            </NavLink>
            <NavLink
              className={({ isActive }) => (isActive ? "active" : "inactive")}
              to="/Movies/Action"
            >
              <li>Action</li>
            </NavLink>
            <NavLink
              className={({ isActive }) => (isActive ? "active" : "inactive")}
              to="/Movies/Adventure"
            >
              <li>Adventure</li>
            </NavLink>
            <NavLink
              className={({ isActive }) => (isActive ? "active" : "inactive")}
              to="/Movies/Comedy"
            >
              <li>Comedy</li>
            </NavLink>
            <NavLink
              className={({ isActive }) => (isActive ? "active" : "inactive")}
              to="/Movies/Horror"
            >
              <li>Horror</li>
            </NavLink>
            <NavLink
              className={({ isActive }) => (isActive ? "active" : "inactive")}
              to="/Movies/Romance"
            >
              <li>Romance</li>
            </NavLink>
            <NavLink
              className={({ isActive }) => (isActive ? "active" : "inactive")}
              to="/Movies/Documentary"
            >
              <li>Documentary</li>
            </NavLink>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Movienav;
