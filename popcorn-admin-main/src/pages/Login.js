import { Button, TextField } from "@mui/material";
import React, { useContext } from "react";
import "../css/Login.css";
import Message from "../components/Message";
import axios from "axios";
import config from "../config.json";
import MessageContext from "../context/context/MessageContext";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const { showMessage } = useContext(MessageContext);
  const navigate = useNavigate();
  const onLogin = async (e) => {
    e.preventDefault();
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    try {
      const res = await axios.post(
        `${config.api.dataserver}/api/auth/adminlogin`,
        {
          email: email,
          password: password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const resp = res.data;
      if (!resp.user.verified) {
        return showMessage(
          "error",
          "You need to verify your account, to verify account try to login on POPCORN."
        );
      }
      if (resp.authtoken) {
        localStorage.setItem("token", resp.authtoken);
        navigate("/");
      }
    } catch (error) {
      console.log(error);
      if (error.response.status === 401) {
        showMessage("error", `${error.response.data.error}`);
      } else {
        showMessage("error", `${error.response.data.errors[0].msg}`);
      }
    }
  };
  return (
    <>
      <div className="login-main">
        <form className="login-container" onSubmit={onLogin}>
          <Message />
          <h1>POPCORN Admin Panel</h1>
          <div className="login-comp">
            <label htmlFor="email">Email</label>
            <br />
            <TextField type="email" id="email" className="input-login" />
          </div>
          <div className="login-comp">
            <label htmlFor="password">Password</label>
            <br />
            <TextField type="password" id="password" className="input-login" />
          </div>
          <div className="login-comp">
            <Button variant="contained" type="submit">
              Login
            </Button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Login;
