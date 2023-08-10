import React from "react";
import { decodeToken } from "react-jwt";
import { NavLink, Link } from "react-router-dom";
import "./style.css";
function Sidebar() {
  const data = decodeToken(localStorage.getItem("token"));

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark sticky-top">
      <div className="container-fluid">
        <Link className="navbar-brand" to="dashboard">
          <img
            className="profile-image"
            referrerPolicy="no-referrer"
            src={data.picture}
            alt="profile"
          />
          <span className="d-inline-block mx-2">{data.given_name}</span>
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <NavLink
                className="nav-link text-light d-inline-block mx-2"
                aria-current="page"
                to="/profile/student"
              >
                Home
              </NavLink>
              <NavLink
                className="nav-link text-light d-inline-block mx-2"
                aria-current="page"
                to="/profile/student/quiz/list"
              >
                Quizes
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                className="nav-link text-ligth d-inline-block mx-2"
                onClick={() => {
                  localStorage.removeItem("token");
                }}
                aria-current="page"
                to="/"
              >
                Logout
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Sidebar;
