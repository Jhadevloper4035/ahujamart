import React, { Fragment, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getAuth, signInWithEmailLink, updatePassword } from "firebase/auth";
import SEO from "../../components/seo.jsx";
import LayoutOne from "../../layouts/LayoutOne.js";
import Breadcrumb from "../../wrappers/breadcrumb/Breadcrumb.js";
import { useDispatch } from "react-redux";
import cogoToast from "cogo-toast";
import firebase from "../../firebase.js";
import { createOrUpdateUser } from "../../functions/auth.js";
import { setUser } from "../../store/slices/user-slice.js";

const RegisterComplete = () => {
  let { pathname } = useLocation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const auth = getAuth();
  const dispatch = useDispatch();

  useEffect(() => {
    const storedEmail = window.localStorage.getItem("emailForRegistration");
    if (storedEmail) {
      setEmail(storedEmail);
    } else {
      navigate('/'); // Redirect to the homepage if email is not found
    }
  }, [navigate]);
  

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      cogoToast.warn("Email and password are required", {
        position: "bottom-left",
      });
      return;
    }

    if (password.length < 8) {
      cogoToast.warn("Password must be at least 8 characters", {
        position: "bottom-left",
      });
      return;
    }

  
    try {
      const result = await signInWithEmailLink(
        auth,
        email,
        window.location.href
      );


      if (result.user.emailVerified) {

      window.localStorage.removeItem("emailForRegistration");
        await updatePassword(result.user, password);
        const idTokenResult = await result.user.getIdToken();

        createOrUpdateUser(idTokenResult)
          .then((res) => {
            dispatch(
              setUser({
                name: res.data.name,
                email: res.data.email,
                token: idTokenResult.token,
                role: res.data.role,
                _id: res.data._id,
              })
            );
            navigate("/");
          })
          .catch((error) => {
            console.error("Error updating user:", error);
          });
      }
    } catch (error) {
      cogoToast.warn("Failed to login", { position: "bottom-left" });
      console.log("Error:", error.message);
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
                    <h3 style={{ textAlign: "center", marginBottom: "30px" }}>
                      Register Complete
                    </h3>
                    <div className="login-register-form">
                      <form onSubmit={handleSubmit}>

                        <input
                          type="text"
                          placeholder="Username"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          autoFocus
                          disabled  
                        />

                        <input
                          type="password" 
                          placeholder="Password"
                          value={password} 
                          onChange={(e) => setPassword(e.target.value)}
                        />

                        <div className="button-box">
                          <div className="login-toggle-btn">
                            <input type="checkbox" />
                            <label className="ml-10">Remember me</label>
                          </div>

                          <button type="submit">
                            <span>Register Complete</span>
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

export default RegisterComplete;
