import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../css/Login.css";
import ModeContext from "../../context/Contexts/ModeContext";
import axios from "axios";
import config from "../../config.json";
import MessageContext from "../../context/Contexts/MessageContext";
import AlertComp from "../components/AlertComp";
import UserContext from "../../context/Contexts/UserContext";
import LoadingContext from "../../context/Contexts/LoadingContext";
const Login = () => {
  const mode = useContext(ModeContext);
  const message = useContext(MessageContext);
  const { setLoggedin, sendMail } = useContext(UserContext);
  const { setProgress } = useContext(LoadingContext);
  const navigate = useNavigate();
  const lightStyle = {
    backgroundColor: "#f6f7f9",
    color: "black",
  };
  const darkStyle = {
    backgroundColor: "#131722",
    color: "white",
  };

  const backDark = {
    color: "white",
  };
  const backLight = {
    color: "black",
  };
  // const inputLight = {
  //   border: "1px solid black",
  //   backgroundColor: "white",
  // };
  // const inputDark = {
  //   border: "1px solid white",
  //   backgroundColor: "white",
  // };

  if (mode.checked === false) {
    document.body.style.backgroundColor = "#131722";
  } else {
    document.body.style.backgroundColor = "#fff";
  }

  const [credeintials, setCredeintials] = useState({ email: "", password: "" });
  const onChange = (e) => {
    setCredeintials({ ...credeintials, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/");
    }
    // eslint-disable-next-line
  }, []);

  const onLogin = async (e) => {
    e.preventDefault();
    const data = {
      email: credeintials.email,
      password: credeintials.password,
    };
    try {
      const res = await axios.post(`${config.api.auth}/login`, data, {
        headers: {
          "Content-Type": "application/json",
        },
        onUploadProgress: (progressEvent) => {
          setProgress(
            parseInt(
              Math.round((progressEvent.loaded * 100) / progressEvent.total)
            )
          );
        },
      });
      const resp = res.data;
      console.log(resp);
      if (resp.user.verified) {
        navigate("/");
        localStorage.setItem("token", resp.authtoken);
        setLoggedin(true);
      } else {
        localStorage.setItem("token", resp.authtoken);
        localStorage.setItem("key", resp.user.authkey);
        localStorage.setItem("id", resp.userid);
        sendMail();
        message.showMessage(
          "error",
          "Your account is not verified, please check mail to verify."
        );
      }
    } catch (error) {
      if (error.response.data.error) {
        message.showMessage("error", `${error.response.data.error}`);
      } else {
        message.showMessage("error", `${error.response.data.errors[0].msg}`);
      }
    }
  };
  const onSignup = async (e) => {
    e.preventDefault();
    const name = document.getElementById("signup-name").value;
    const email = document.getElementById("signup-email").value;
    const username = document.getElementById("signup-username").value;
    const password = document.getElementById("signup-password").value;
    const cpassword = document.getElementById("signup-password-confirm").value;
    const data = {
      name: name,
      email: email,
      username: username,
      password: password,
      passwordConfirm: cpassword,
    };
    try {
      const res = await axios.post(`${config.api.auth}/signup`, data, {
        headers: {
          "Content-Type": "application/json",
        },
        onUploadProgress: (progressEvent) => {
          setProgress(
            parseInt(
              Math.round((progressEvent.loaded * 100) / progressEvent.total)
            )
          );
        },
      });
      const resp = res.data;
      console.log(resp);
      localStorage.setItem("token", resp.authtoken);
      localStorage.setItem("key", resp.authkey);
      localStorage.setItem("id", resp.userid);
      sendMail();
      if (resp.authtoken && resp.authkey) {
        message.showMessage(
          "success",
          "We have sent you a verification email, Please verify your account."
        );
      }
    } catch (error) {
      if (error.response.data.error) {
        message.showMessage("error", `${error.response.data.error}`);
      } else {
        message.showMessage("error", `${error.response.data.errors[0].msg}`);
      }
    }
  };
  return (
    <>
      {/* <div className="login-main">
        {message.message === null ? null : (
          <AlertComp type={message.messageType} message={message.message} />
        )}
        <form
          onSubmit={onLogin}
          className="login-frame"
          style={mode.checked === false ? darkStyle : lightStyle}
        >
          <h1>Login</h1>
          <div className="login-component-1 login-component">
            <label>Email</label>
            <br />
            <input
              type="text"
              onChange={onChange}
              id="login-email"
              name="email"
              style={mode.checked === false ? inputDark : inputLight}
            />
          </div>
          <div className="login-component-2 login-component">
            <label>Password</label>
            <br />
            <input
              type="password"
              id="login-password"
              name="password"
              onChange={onChange}
              style={mode.checked === false ? inputDark : inputLight}
            />
          </div>
          <div className="login-component-3 login-component">
            <button className="login-btn">Login</button>
            <Link
              to="/forget-password"
              style={mode.checked === false ? darkStyle : lightStyle}
              className="login-forget-password"
            >
              Forget Password
            </Link>
          </div>
          <hr className="login-divider" />
          <div className="login-component-4 login-component">
            <h4>Or Signin With</h4>
            <div className="social-login">
              <ul>
                <li className="login-facebook">
                  <i className="fa-brands fa-facebook fa-xl"></i>
                </li>
                <li className="login-instagram">
                  <i className="fa-brands fa-instagram fa-xl"></i>
                </li>
                <li className="login-twitter">
                  <i className="fa-brands fa-twitter fa-xl"></i>
                </li>
              </ul>
            </div>
          </div>
        </form>
        <Link
          to="/"
          className="back-login"
          style={mode.checked === false ? backDark : backLight}
        >
          <i className="fa-solid fa-arrow-left"></i>&nbsp;&nbsp;&nbsp;Back
        </Link>
      </div> */}
      {message.message === null ? null : (
        <AlertComp type={message.messageType} message={message.message} />
      )}
      <div
        className="signup-container"
        style={mode.checked === false ? darkStyle : lightStyle}
      >
        <div
          className="signup-main"
          style={mode.checked === false ? darkStyle : lightStyle}
        >
          <input type="checkbox" id="chk" aria-hidden="true" />

          <div className="signup">
            <form onSubmit={onLogin}>
              <label
                className="signup-label"
                htmlFor="chk"
                aria-hidden="true"
                style={mode.checked === false ? darkStyle : lightStyle}
              >
                Login
              </label>
              <input
                className="signup-input"
                type="email"
                name="email"
                placeholder="Email"
                onChange={onChange}
                required
              />
              <input
                type="password"
                name="password"
                className="signup-input"
                placeholder="Password"
                onChange={onChange}
                required
              />
              <button type="submit" className="signup-button">
                Login
              </button>
            </form>
          </div>

          <div
            className="login"
            style={mode.checked === false ? lightStyle : darkStyle}
          >
            <form onSubmit={onSignup}>
              <label
                className="signup-label"
                htmlFor="chk"
                aria-hidden="true"
                style={mode.checked === false ? backLight : backDark}
              >
                Sign Up
              </label>
              <input
                className="signup-input"
                type="text"
                id="signup-name"
                placeholder="Name"
                required
              />
              <input
                className="signup-input"
                type="text"
                id="signup-username"
                placeholder="User name"
                required
              />
              <input
                className="signup-input"
                type="email"
                id="signup-email"
                placeholder="Email"
                required
              />
              <input
                type="password"
                className="signup-input"
                id="signup-password"
                placeholder="Password"
                required
              />
              <input
                type="password"
                className="signup-input"
                id="signup-password-confirm"
                placeholder="Confirm Password"
                required
              />
              <button type="submit" className="signup-button">
                Sign up
              </button>
            </form>
          </div>
        </div>
      </div>
      <div className="back-login-div">
        <Link
          to="/"
          className="back-login"
          style={mode.checked === false ? backDark : backLight}
        >
          <i className="fa-solid fa-arrow-left"></i>&nbsp;&nbsp;&nbsp;Back
        </Link>
      </div>
    </>
  );
};

export default Login;
