import React,{useEffect} from "react";
import GoogleAuth from "../Auth/GoogleAuth";
import "./style.css";
function Home() {
  useEffect(()=>{
    localStorage.clear()
  })
  return (
    <div className="row vh-100 align-items-center">
      <div className="col-12 home p-5">
        <div className="row text-light">
          <div className="col-7 my-2 h3">Fast , Secure and trustable</div>
          <div className="col-7 h5 my-2">
            A handy web app for educators and students for their quizzess .
            Educators can create quizes ans students can give quizzess .
          </div>
          <div className="col-10 h3 mt-5 text-success">
            Login to your account
          </div>
          <div className="col-4 h5 my-2">
            <GoogleAuth />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
