import React from "react";
import Navbar from "./Navbar";
import { Routes, Route } from "react-router-dom";
import QuizSet from "./QuizSet";
import Quiz from "./Quiz";
import Home from "./Home";


function Profile() {
  return (
    <div className="row justify-content-center align-items-center">
    <div className="col-12 h-25">
      <Navbar />
    </div>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/quiz/list" element={<QuizSet />} />
      <Route path="/quiz/begin/:id" element={<Quiz />} />
    </Routes>
  </div>
  );
}

export default Profile;
