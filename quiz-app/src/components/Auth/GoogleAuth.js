import React, { useState } from 'react';
// import { GoogleLogin } from '@leecheuk/react-google-login';
import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { decodeToken } from 'react-jwt';
import './style.css';
import Spinnner from '../Alert/Spinner';

function GoogleAuth() {
  let [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const responseGoogle = async response => {
    setLoading(true);
    try {
      const api_response = await axios.post(
        `${process.env.REACT_APP_BACKENDURL}/authenticate`,
        {
          id_token: response.credential,
        }
      );
      localStorage.setItem('token', api_response.data);
      const data = decodeToken(api_response.data);
      if (api_response.status === 200) {
        if (data.type === 'Teacher') {
          localStorage.setItem('type', 'Teacher');
          navigate('/profile/educator');
        } else {
          localStorage.setItem('type', 'Student');
          navigate('/profile/student');
        }
      } else navigate('/auth/register');
    } catch (error) {
      alert('Login/Signup failed');
      // redirect to home with error
      navigate('/');
    }
    setLoading(false);
  };
  return (
    <>
      {loading ? (
        <Spinnner />
      ) : (
        <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
          <GoogleLogin
            jsSrc="https://apis.google.com/js/api.js"
            render={renderProps => (
              <button
                onClick={renderProps.onClick}
                disabled={renderProps.disabled}
                className="btn btn-dark w-100">
                Google
              </button>
            )}
            // clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
            buttonText="Login"
            onSuccess={responseGoogle}
            onFailure={() => {
              navigate('/');
            }}
            cookiePolicy={'single_host_origin'}
          />
        </GoogleOAuthProvider>
      )}
    </>
  );
}

export default GoogleAuth;
