import React from "react";
import Navbar from "./Navbar";
import { Routes, Route } from "react-router-dom";
import Quiz from "../Quiz/Quiz";
import Home from "./Home";
import ForbiddenError from "../Alert/ForbiddenError";
function Profile() {
  return (
    <>
    {
      localStorage.getItem('token') ? <div className="row justify-content-center align-items-center">
      <div className="col-12 h-25">
        <Navbar />
      </div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="quiz/create" element={<Quiz />} />
      </Routes>
    </div> : <ForbiddenError/>
    }
    </>
  );
}

export default Profile;
