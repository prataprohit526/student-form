import React, { useEffect } from "react";
import GoogleAuth from "../Auth/GoogleAuth";
import "./style.css";
function Home() {
  useEffect(() => {
    localStorage.clear();
  }, []);
  return (
    <div className="row vh-100 align-items-center">
      <div className="col-12 home p-5">
        <div className="row text-light">
          <div className="col-7 my-2 h2">Create Quiz for Exam </div>
          <div className="col-7 h5 my-2">
            Teacher can create Quiz , Student can give Quize
          </div>
          <div className="col-10 h3 mt-5 text-success">Login here ..</div>
          <div className="col-4 h5 my-2">
            <GoogleAuth />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
