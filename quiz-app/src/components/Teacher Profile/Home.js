import React, { useEffect, useState } from "react";
import axios from "axios";
import ForbiddenError from "../Alert/ForbiddenError";
import Spinnner from "../Alert/Spinner";
function Home() {
  const [arr, setArr] = useState({});
  const [modalData, setModalData] = useState({});
  useEffect(() => {
    axios
      .post(`${process.env.REACT_APP_BACKENDURL}/quiz/teacher`, {
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
        alert('unable to fetch your items')
      });
      // eslint-disable-next-line
  }, []);
  return (
    <>
    {
      localStorage.getItem('type') && localStorage.getItem('type')==="Teacher"  ? <div className="row justify-content-center align-items-center mt-4">
      {Object.keys(arr).length === 0 ? (
        <Spinnner/>
      ) : (
        <React.Fragment>
          <div className="col-12">
            <div className="h3 text-center">Your Quizes</div>
            {arr.count === 0 ? (
              <div className="col-12">You have not created any quiz </div>
            ) : (
              <div className="col-12">
                <table class="table">
                  <thead>
                    <tr>
                      <th scope="col">Index</th>
                      <th scope="col">Quiz Id</th>
                      <th scope="col">Quiz Title</th>
                      <th scope="col">Details</th>
                    </tr>
                  </thead>
                  <tbody>
                    {arr.data.map((element, index) => (
                      <tr>
                        <th scope="row" key={index}>
                          {index + 1}
                        </th>
                        <td>{element._id}</td>
                        <td>{element.title}</td>
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
                            Details
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                <div
                  class="modal fade"
                  id="responsemodal"
                  tabindex="-1"
                  aria-labelledby="responsemodalLabel"
                  aria-hidden="true"
                >
                  <div class="modal-dialog modal-xl">
                    <div class="modal-content">
                      <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">
                          {Object.keys(modalData).length === 0 ? (
                            <>Quiz Summary</>
                          ) : (
                            <>{modalData.title}</>
                          )}
                        </h5>
                        <button
                          type="button"
                          class="btn-close"
                          data-bs-dismiss="modal"
                          aria-label="Close"
                        ></button>
                      </div>
                      <div class="modal-body">
                        {Object.keys(modalData).length === 0 ? (
                          <>Getting your responses</>
                        ) : (
                          <table class="table">
                            <thead>
                              <tr>
                                <th scope="col">Index</th>
                                <th scope="col">Question</th>
                                <th scope="col">Type</th>
                                <th scope="col">Points</th>
                              </tr>
                            </thead>
                            <tbody>
                              {modalData.questions.map((element, index) => (
                                <tr>
                                  <th scope="row" key={index}>
                                    {index + 1}
                                  </th>
                                  <td>{element.title}</td>
                                  <td>{element.type}</td>
                                  <td>{element.points}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        )}
                      </div>
                      <div class="modal-footer">
                        <button
                          type="button"
                          class="btn btn-secondary"
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
    </div> : <ForbiddenError/>
    }
    </>
  );
}

export default Home;
