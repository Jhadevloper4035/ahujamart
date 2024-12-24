import React, { Fragment,  useEffect,  useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import firebase from "../../firebase.js";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { createOrUpdateUser } from "../../functions/auth.js"; 
import Tab from "react-bootstrap/Tab";
import Nav from "react-bootstrap/Nav";
import SEO from "../../components/seo.jsx";
import LayoutOne from "../../layouts/LayoutOne.js";
import Breadcrumb from "../../wrappers/breadcrumb/Breadcrumb.js";
import { useDispatch, useSelector } from "react-redux";
import cogoToast from "cogo-toast";
import { setUser } from "../../store/slices/user-slice.js";

const Login = () => {
  let { pathname } = useLocation();
  const [email, setEmail] = useState("navrojjha21@gmail.com");
  const [password, setPassword] = useState("8448520798");

  const auth = getAuth();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    if (user.user.token)  navigate("/");
  }, [user, navigate]);


 
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      const { user } = result;
      const idTokenResult = await user.getIdTokenResult();
      createOrUpdateUser(idTokenResult.token)
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
        })
        .catch((error) => {
          console.error("Error creating or updating user:", error);
        });

      cogoToast.success("Login successfully", { position: "bottom-left" });
      navigate("/");
    } catch (error) {
      if (error.code === "auth/invalid-email") { 
        cogoToast.warn("Invalid email format.", { position: "bottom-left" });
      } else if (error.code === "auth/wrong-password") {
        cogoToast.warn("Incorrect password.", { position: "bottom-left" });
      } else if (error.code === "auth/user-not-found") {
        cogoToast.warn("No user found with this email.", { position: "bottom-left" });
      } else {
        cogoToast.warn("Login failed. Please try again.", { position: "bottom-left" });
      }
    }
  };

  return (
    <Fragment>
      <SEO titleTemplate="Login" description="" />
      <LayoutOne headerTop="visible">
        <Breadcrumb
          pages={[
            { label: "Home", path: process.env.PUBLIC_URL + "/" },
            { label: "Login Register", path: process.env.PUBLIC_URL + pathname },
          ]}
        />

        <div className="login-register-area pt-100 pb-100">
          <div className="container">
            <div className="row">
              <div className="col-lg-7 col-md-12 ms-auto me-auto">
                <div className="login-register-wrapper">
                  <Tab.Container defaultActiveKey="login">
                    <Nav variant="pills" className="login-register-tab-list">
                      <Nav.Item>
                        <Nav.Link eventKey="login">
                          <h4>Login</h4>
                        </Nav.Link>
                      </Nav.Item>
                    </Nav>
                    <Tab.Content>
                      <Tab.Pane eventKey="login">
                        <div className="login-form-container">
                          <div className="login-register-form">
                            <form onSubmit={handleSubmit}>
                              <input
                                type="text"
                                placeholder="Username"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                autoFocus
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
                                  <Link to={process.env.PUBLIC_URL + "/forgot-password"}>
                                    Forgot Password?
                                  </Link>
                                </div>

                                <button type="submit">
                                  <span>Login</span>
                                </button>
                              </div>
                            </form>
                          </div>
                        </div>
                      </Tab.Pane>
                    </Tab.Content>
                  </Tab.Container>
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
