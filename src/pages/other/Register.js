import React, { Fragment, useEffect, useState } from "react";
import {  useLocation, useNavigate } from "react-router-dom";
import firebase from "../../firebase.js";
import { getAuth, sendSignInLinkToEmail } from "firebase/auth";
import SEO from "../../components/seo.jsx";
import LayoutOne from "../../layouts/LayoutOne.js";
import Breadcrumb from "../../wrappers/breadcrumb/Breadcrumb.js";
import { useSelector } from "react-redux";
import cogoToast from "cogo-toast";

const Login = () => {

  let { pathname } = useLocation();
  const [email, setEmail] = useState("navrojjha21@gmail.com");

  const auth = getAuth();
  const { user } = useSelector((state) => ({ ...state }));
  const navigate = useNavigate();

  useEffect(() => {
    if (user.user.token) navigate("/");
  }, [user, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const config = {
      url: process.env.REACT_APP_REGISTER_REDIRECT_URL,
      handleCodeInApp: true,
    };
    await sendSignInLinkToEmail(auth, email, config);
    cogoToast.success("email Send Sucesfully ", {position: "bottom-left"});
    window.localStorage.setItem("emailForRegistration", email);
  };

  return (
    <Fragment>
      <SEO titleTemplate="Register" description="" />


      <LayoutOne headerTop="visible">
        <Breadcrumb
          pages={[
            { label: "Home", path: process.env.PUBLIC_URL + "/" },
            {
              label: " Register",
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
                  <h3 style={ { textAlign :"center", marginBottom : "30px"}}>Register </h3> 
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
                          <div className="login-toggle-btn">
                            <input type="checkbox" />
                            <label className="ml-10">Remember me</label>
                          </div>

                          <button type="submit">
                            <span>Register</span>
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

export default Login;
