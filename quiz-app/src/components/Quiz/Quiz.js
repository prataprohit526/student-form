import React from "react";
import { useNavigate } from "react-router-dom";
import { Formik, Field, Form, FieldArray, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import ValidationError from "../Alert/ValidationError";

import ForbiddenError from "../Alert/ForbiddenError";

function CreateQuiz() {
  const navigate = useNavigate()
  const questionSchema = { title: "", type: "mcq", points: "1", options: [""] };
  const questionValidationSchema = Yup.object().shape({
    title: Yup.string().required("title required"),
    points: Yup.string().required("must be graded"),
  });
  const validationSchema = Yup.object().shape({
    title: Yup.string().required("Quiz title required"),
    duration: Yup.string().required("duration Required"),
    questions: Yup.array(questionValidationSchema),
  });
  return (
    <>
    {
      localStorage.getItem('type') && localStorage.getItem('type')==="Teacher"  ? <div className="row justify-content-center align-items-center">
      <div className="col-10">
        <div className="row">
          <div className="col-12 text-center border-bottom h3 my-5 p-1">
            Enter Quiz Details:
          </div>
          <div className="col-12 mt-3">
            <Formik
              initialValues={{
                title: "",
                duration: "1",
                questions: [questionSchema],
              }}
              validationSchema={validationSchema}
              onSubmit={async (values) => {
                const res = window.confirm("Are you sure to submit the form");
                if (res) {
                  try {
                    await axios.post(
                      `${process.env.REACT_APP_BACKENDURL}/quiz/create`,
                      {
                        token: localStorage.getItem("token"),
                        values,
                      }
                    );
                    window.alert("Quiz successfully created");
                    navigate('/profile/educator')
                  } catch (error) {
                    window.alert("Some error occured");
                  }
                }
              }}
            >
              <Form>
                <div className="row">
                  <div className="col-8">
                    <div className="input-group mb-3">
                      <span className="input-group-text">Title</span>
                      <Field
                        type="text"
                        className="form-control"
                        placeholder="Quiz Title"
                        name="title"
                      />
                    </div>
                    <ErrorMessage name="title" component={ValidationError} />
                  </div>
                  <div className="col">
                    <div className="input-group mb-3">
                      <span className="input-group-text">Time</span>
                      <Field
                        type="number"
                        className="form-control"
                        placeholder="duration in miinutes"
                        name="duration"
                        min="1"
                      />
                    </div>
                    <ErrorMessage name="duration" component={ValidationError} />
                  </div>
                </div>

                <FieldArray name="questions">
                  {(props) => {
                    const { form, push, remove } = props;
                    const { values } = form;
                    const { questions } = values;
                    return (
                      <div>
                        {questions.map((question, index) => (
                          <div className=" row border p-3 my-2" key={index}>
                            <div className="col-12">
                              <div className="row">
                                <div className="col">
                                  <div className="input-group mb-3">
                                    <span className="input-group-text">
                                      Question {index + 1}
                                    </span>
                                    <Field
                                      type="text"
                                      className="form-control"
                                      placeholder={question.title}
                                      name={`questions[${index}].title`}
                                    />
                                  </div>
                                  <ErrorMessage
                                    name={`questions[${index}].title`}
                                    component={ValidationError}
                                  />
                                </div>
                                <div className="col-2">
                                  <div className="input-group mb-3">
                                    <span className="input-group-text">
                                      Type
                                    </span>

                                    <Field
                                      as="select"
                                      className="form-select"
                                      name={`questions[${index}].type`}
                                    >
                                      <option value="mcq">MCQ</option>
                                      <option value="sat">SAT</option>
                                    </Field>
                                  </div>
                                </div>
                                <div className="col-2">
                                  <div className="input-group mb-3">
                                    <span className="input-group-text">
                                      Points
                                    </span>
                                    <Field
                                      className="form-control"
                                      type="text"
                                      name={`questions[${index}].points`}
                                      min="1"
                                    />
                                  </div>
                                  <ErrorMessage
                                    name={`questions[${index}].points`}
                                    component={ValidationError}
                                  />
                                </div>
                              </div>
                            </div>

                            <FieldArray name={`questions[${index}].options`}>
                              {(props) => {
                                const {
                                  form,
                                  push: pushOption,
                                  remove: removeOption,
                                } = props;
                                const { values } = form;
                                const { questions } = values;
                                const { type, options } = questions[index];
                                return (
                                  <div className="col-12">
                                    {type === "mcq" ? (
                                      <div className="row">
                                        <div className="col-12">
                                          {options.map(
                                            (option, optionIndex) => (
                                              <div className="row">
                                                <div
                                                  className="input-group mb-3 col-12"
                                                  key={optionIndex}
                                                >
                                                  <span className="input-group-text">
                                                    Option {optionIndex + 1}
                                                  </span>
                                                  <Field
                                                    type="text"
                                                    className="form-control"
                                                    placeholder={option}
                                                    name={`questions[${index}].options[${optionIndex}]`}
                                                  />

                                                  <span className="d-inline-block mx-1">
                                                    <button
                                                      className="btn btn-success"
                                                      type="button"
                                                      onClick={() =>
                                                        pushOption("")
                                                      }
                                                    >
                                                      +
                                                    </button>
                                                  </span>
                                                  <span className="d-inline-block mx-1">
                                                    <button
                                                      className="btn btn-danger"
                                                      type="button"
                                                      onClick={() =>
                                                        removeOption(
                                                          optionIndex
                                                        )
                                                      }
                                                    >
                                                      -
                                                    </button>
                                                  </span>
                                                </div>
                                                <ErrorMessage
                                                  name={`questions[${index}].options[${optionIndex}]`}
                                                  component={ValidationError}
                                                />
                                              </div>
                                            )
                                          )}
                                          <div className="col-12 my-2">
                                            <button
                                              className="btn btn-warning"
                                              type="button"
                                              onClick={() => {
                                                options.sort();
                                                const temp_ques =
                                                  questions[index];
                                                remove(index);
                                                temp_ques.options = options;
                                                push(temp_ques);
                                              }}
                                            >
                                              Sort Options
                                            </button>
                                          </div>
                                        </div>
                                      </div>
                                    ) : null}
                                  </div>
                                );
                              }}
                            </FieldArray>
                            <div className="input-group mb-3">
                              {questions.length > 1 ? (
                                <span className="d-inline-block mx-1">
                                  <button
                                    className="btn btn-danger"
                                    type="button"
                                    onClick={() => remove(index)}
                                  >
                                    Delete
                                  </button>
                                </span>
                              ) : null}
                              <span className="d-inline-block mx-1">
                                <button
                                  className="btn btn-primary"
                                  type="button"
                                  onClick={() => push(questionSchema)}
                                >
                                  Add question
                                </button>
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    );
                  }}
                </FieldArray>
                <button className="btn btn-success" type="submit">
                  Submit
                </button>
              </Form>
            </Formik>
          </div>
        </div>
      </div>
    </div> :  <ForbiddenError/>
    }
    </>
  );
}

export default CreateQuiz;
