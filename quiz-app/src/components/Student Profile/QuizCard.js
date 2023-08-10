import React from "react";
import image from "../../images/home.jpg";
import { useNavigate } from "react-router-dom";

function QuizCard({ quiz }) {
  const navigate = useNavigate();
  const takeQuiz = () => {
    const res = window.confirm("Do you want to begin the quiz?");
    if (res) {
      navigate(`/profile/student/quiz/begin/${quiz._id}`);
    }
  };
  return (
    <div className="card col-3 mx-2">
      <img src={image} className="card-img-top" alt="..." />
      <div className="card-body">
        <h5 className="card-title">{quiz.title}</h5>
      </div>
      <ul className="list-group list-group-flush">
        <li className="list-group-item">
          <h6>
            Quiz id
            <span className="badge bg-secondary d-inline-block ms-2">
              {quiz._id}
            </span>
          </h6>
        </li>
        <li className="list-group-item">
          <h6>
            Duration
            <span className="badge bg-secondary d-inline-block ms-2">
              {quiz.duration}
            </span>
          </h6>
        </li>

        <li className="list-group-item">
          <button className="btn btn-success" onClick={takeQuiz}>
            Take Quiz
          </button>
        </li>
      </ul>
    </div>
  );
}

export default QuizCard;
