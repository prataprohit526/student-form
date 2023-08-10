import React, { useEffect, useState } from "react";
import axios from "axios";
import QuizCard from "./QuizCard";
import { v4 as uuidv4 } from "uuid";

import ForbiddenError from "../Alert/ForbiddenError";
function QuizSet() {
  const [quizes, setQuizes] = useState([]);
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BACKENDURL}/quiz`)
      .then((res) => {
        setQuizes(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <>
    {
      localStorage.getItem('type') && localStorage.getItem('type')==="Student" ? <div className="col-12 mt-5">
      <div className="row justify-content-evenly align-items-center">
        {quizes.map((quiz) => (
          <QuizCard key={uuidv4()} quiz={quiz} />
        ))}
      </div>
    </div> : <ForbiddenError/>
    }
    </>
  );
}

export default QuizSet;
