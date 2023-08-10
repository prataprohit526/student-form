import React, { useEffect, useState } from "react";
import axios from "axios";
import ForbiddenError from "../Alert/ForbiddenError";
import Spinnner from "../Alert/Spinner";


function Home() {
  const [arr, setArr] = useState({});
  const [modalData, setModalData] = useState({});
  useEffect(() => {
    axios
      .post(`${process.env.REACT_APP_BACKENDURL}/quiz/student`, {
        token: localStorage.getItem("token"),
      })
      .then((res) => {
        if (res.data.length === 0) {
          setArr({ ...arr, count: 0 });
        } else {
          setArr({ ...arr, count: res.data.length, data: res.data });
        }
      })
      .catch((error) => {
        console.log(error);
        alert('Error fetching data try again...')
      });
      // eslint-disable-next-line
  }, []);
  return (
    <>
    {
      localStorage.getItem('type') && localStorage.getItem('type')==="Student"  ? <div className="row justify-content-center align-items-center mt-4">
      {Object.keys(arr).length === 0 ? (
        <Spinnner/>
      ) : (
        <React.Fragment>
          <div className="col-12">
            <div className="h3 text-center">Quiz Summary</div>
            {arr.count === 0 ? (
              <div className="col-12">You have not attempted any quiz </div>
            ) : (
              <div className="col-12">
                <table className="table">
                  <thead>
                    <tr>
                      <th scope="col">Index</th>
                      <th scope="col">Quiz Id</th>
                      <th scope="col">Quiz Title</th>
                      <th scope="col">View Response</th>
                    </tr>
                  </thead>
                  <tbody>
                    {arr.data.map((element, index) => (
                      <tr key={index}>
                        <th scope="row" >
                          {index + 1}
                        </th>
                        <td>{element.quiz_id}</td>
                        <td>{element.quiz_name}</td>
                        <td>
                          <button
                            className="btn btn-warning"
                            type="button"
                            value={index}
                            data-bs-toggle="modal"
                            data-bs-target="#responsemodal"
                            onClick={(e) => {
                              setModalData(arr.data[Number(e.target.value)]);
                              console.log(modalData);
                            }}
                          >
                            View Response
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                <div
                  className="modal fade"
                  id="responsemodal"
                  tabIndex="-1"
                  aria-labelledby="responsemodalLabel"
                  aria-hidden="true"
                >
                  <div className="modal-dialog modal-xl">
                    <div className="modal-content">
                      <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">
                          {Object.keys(modalData).length === 0 ? (
                            <>Quiz Summary</>
                          ) : (
                            <>{modalData.quiz_name}</>
                          )}
                        </h5>
                        <button
                          type="button"
                          className="btn-close"
                          data-bs-dismiss="modal"
                          aria-label="Close"
                        ></button>
                      </div>
                      <div className="modal-body">
                        {Object.keys(modalData).length === 0 ? (
                          <>Getting your responses</>
                        ) : (
                          <table className="table">
                            <thead>
                              <tr>
                                <th scope="col">Index</th>
                                <th scope="col">Question</th>
                                <th scope="col">Your response</th>
                              </tr>
                            </thead>
                            <tbody>
                              {modalData.responses.map((element, index) => (
                                <tr>
                                  <th scope="row" key={index}>
                                    {index + 1}
                                  </th>
                                  <td>{element.question}</td>
                                  <td>{element.answer}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        )}
                      </div>
                      <div className="modal-footer">
                        <button
                          type="button"
                          className="btn btn-secondary"
                          data-bs-dismiss="modal"
                        >
                          Close
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </React.Fragment>
      )}
    </div> :  <ForbiddenError/>
    }
    </>
  );
}

export default Home;
