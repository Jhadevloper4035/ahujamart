import React, { Fragment, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import SEO from "../../components/seo.jsx";
import LayoutOne from "../../layouts/LayoutOne.js";
import Breadcrumb from "../../wrappers/breadcrumb/Breadcrumb.js";
import {  useSelector } from "react-redux";
import cogoToast from "cogo-toast";
import firebase from "../../firebase.js";


const ForgotPassword = () => {
    let { pathname } = useLocation();
    const [email, setEmail] = useState("");
    const auth = getAuth();

// if user is login then redirect to home page 
const {user} = useSelector( (state) => ({...state}))

const navigate = useNavigate();

useEffect(() => {
  if (user.user.token)  navigate("/");
}, [user, navigate]);

 
const handleSubmit = async (e) => {
    e.preventDefault();
    try {

        const config = {
            url: process.env.REACT_APP_RESET_PASSWORD_URL,
            handleCodeInApp: true,
          };
        await sendPasswordResetEmail(auth,  email , config);
        setEmail('');
        cogoToast.success("Password reset email sent successfully!", { position: "bottom-left" });
      } catch (error) {
        cogoToast.success("invalid request !", { position: "bottom-left" });
      }
    
  };







  return (
    <Fragment>
      <SEO titleTemplate="Register Complete" description="" />

      <LayoutOne headerTop="visible">
        <Breadcrumb
          pages={[
            { label: "Home", path: process.env.PUBLIC_URL + "/" },
            {
              label: " Register Complete",
              path: process.env.PUBLIC_URL + pathname,
            },
          ]}
        />

        <div className="login-register-area pt-100 pb-100">
          <div className="container">
            <div className="row">
              <div className="col-lg-7 col-md-12 ms-auto me-auto">
                <div className="login-register-wrapper">
                  <div className="login-form-container">
                    <h3 style={{ textAlign: "center", marginBottom: "30px" }}>Forgot Password </h3>
                    <div className="login-register-form">
                      <form onSubmit={handleSubmit}>
                        <input
                          type="text"
                          placeholder="Username"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          autoFocus
                        />
                        <div className="button-box">
                          <button type="submit">
                            <span>Forget password </span>
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </LayoutOne>
    </Fragment>
  );
};

export default  ForgotPassword ;
