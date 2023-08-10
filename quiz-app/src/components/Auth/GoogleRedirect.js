import React,{useState} from "react";
import axios from "axios";
import { decodeToken } from "react-jwt";
import { useNavigate } from "react-router-dom";
import { Formik, Field, ErrorMessage, Form } from "formik";
import * as Yup from "yup";
import ValidationError from "../Alert/ValidationError";
import './style.css'
import ForbiddenError from "../Alert/ForbiddenError";
import Spinnner from "../Alert/Spinner";

function GoogleRedirect() {

  const navigate = useNavigate();
  const [loading,setLoading] = useState(false)
  const roleTypes = ["Teacher", "Student"];
  const validationSchema = Yup.object().shape({
    type: Yup.string().required("role is required"),
  });
  return (

      <div className="row vh-100 align-items-center">

         {
          localStorage.getItem('token') ?  <div className="col-12 redirect p-5"> <div className="row text-light">
          <div className="col-7 my-2 h3">Registration Form</div>
          <div className="col-7 h5 my-2">
            Your details have already been fetched from google . Please selece
            your role to continue.
          </div>
          <div className="col-7">
            <Formik
              initialValues={{
                type: "",
              }}
              validationSchema={validationSchema}
              onSubmit={async (values) => {
                setLoading(true)
                try {
                  const api_response = await axios.post(
                    `${process.env.REACT_APP_BACKENDURL}/authenticate/register`,
                    {
                      token: localStorage.getItem("token"),
                      values
                    }
                  );
                  localStorage.removeItem("token");
                  localStorage.setItem("token", api_response.data);
                  const data = decodeToken(api_response.data);
                  if (data.type === "Teacher") {
                    localStorage.setItem('type','Teacher')
                    navigate("/profile/educator");
                  }
                  else {
                    localStorage.setItem('type','Student')
                    navigate("/profile/student");
                  }
                } catch (error) {
                  alert("Login/Signup failed");
                  navigate("/");
                }
                setLoading(false)
              }}
            >
              <Form>
                <Field name="type">
                  {({ field }) => {
                    return roleTypes.map((type, index) => (
                      <div className="form-check my-2" key={index}>
                        <input
                          className="form-check-input"
                          type="radio"
                          id={type}
                          {...field}
                          value={type}
                        />
                        <label className="form-check-label" htmlFor={type}>
                          {type}
                        </label>
                      </div>
                    ));
                  }}
                </Field>
                <ErrorMessage name="type" component={ValidationError} />
                {
                  loading ? <Spinnner/> : <button className="btn btn-primary" type="submit">
                  Submit
                </button>
                }

              </Form>
            </Formik>
          </div>
        </div> </div>: <ForbiddenError/>
         }

      </div>

  );
}

export default GoogleRedirect;
