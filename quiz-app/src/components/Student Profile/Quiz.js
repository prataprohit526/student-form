import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Formik, Field, Form } from "formik";
import axios from "axios";


import { useNavigate } from "react-router-dom";
import ForbiddenError from "../Alert/ForbiddenError";
import Spinnner from "../Alert/Spinner";

function Quiz() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [quiz, setQuiz] = useState({});
  const [valueObj, setvalueObj] = useState([]);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BACKENDURL}/quiz/${id}`)
      .then((res) => {
        setQuiz(res.data);
        let ans = [];
        res.data.questions.forEach((question) => {
          let temp = {};
          temp.question = question.title;
          temp.answer = "";
          ans.push(temp);
        });
        setvalueObj(ans);
      })
      .catch((error) => {
        console.log(error);
      });
    // eslint-disable-next-line
  }, []);

  return (
    <>
    {
      localStorage.getItem('type') && localStorage.getItem('type')==="Student" ? <div className="row justify-content-center align-items-center mt-5">
      <div className="col-12">
        {Object.keys(quiz).length === 0 ? (
          <Spinnner/>
        ) : (
          <Formik
            initialValues={{
              responses: valueObj,
            }}
            onSubmit={async (values) => {
              const res = window.confirm(
                "You will not be able to change response later"
              );
              if (res) {
                try {
                  values.quiz_name = quiz.title;
                  await axios.post(
                    `${process.env.REACT_APP_BACKENDURL}/quiz/${quiz._id}/submit`,
                    {
                      token: localStorage.getItem("token"),
                      values,
                    }
                  );
                  alert("Your responses have been successfully recorded");
                  navigate(-1);
                } catch (error) {
                  alert("quiz submission failed , try again");
                }
              }
            }}
          >
            <Form>
              {
                <div className="row justify-content-center align-items-center">
                  <div className="col-5 h3 text-center">
                    Grade - {quiz.duration}
                  </div>
                  <div className="col-5 h3  ">Quiz - {quiz.title}</div>
                  <div className="col-2">
                    <button className="btn btn-success" type="submit">
                      Submit
                    </button>
                  </div>
                  <div className="col-8 mt-5  p-3 ">
                    {quiz.questions.map((question, index) => {
                      if (question.type === "sat") {
                        return (
                          <div className="row my-4 p-3 border" key={index}>
                            <label
                              className="h5"
                              htmlFor={`responses[${index}].answer`}
                            >
                              Question {index + 1} - {question.title}
                            </label>
                            <div className="input-group">
                              <Field
                                className="form-control"
                                aria-label="With textarea"
                                as="textarea"
                                id={`responses[${index}].answer`}
                                name={`responses[${index}].answer`}
                              />
                            </div>
                          </div>
                        );
                      }
                      return (
                        <div className="row my-4 p-3 border" key={index}>
                          <label className="h5">
                            Question {index + 1} - {question.title}
                          </label>
                          <Field name={`responses[${index}].answer`}>
                            {({ field }) => {
                              return question.options.map((option) => (
                                <div className="form-check">
                                  <input
                                    className="form-check-input"
                                    type="radio"
                                    id={option}
                                    {...field}
                                    value={option}
                                  />
                                  <label
                                    className="form-check-label"
                                    htmlFor={option}
                                  >
                                    {option}
                                  </label>
                                </div>
                              ));
                            }}
                          </Field>
                        </div>
                      );
                    })}
                  </div>
                </div>
              }
            </Form>
          </Formik>
        )}
      </div>
    </div> : <ForbiddenError/>
    }
    </>
  );
}

export default Quiz;
