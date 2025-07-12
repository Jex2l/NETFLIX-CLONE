import React, { useContext, useState } from "react";
import UserContext from "../Contexts/UserContext";
import config from "../../config.json";
import axios from "axios";
import MessageContext from "../Contexts/MessageContext";

const UserState = (props) => {
  const [loggedin, setLoggedin] = useState(false);
  const [user, setUser] = useState({
    name: "",
    email: "",
    username: "",
    end_date: "",
    subscriber: "",
  });
  const { showMessage } = useContext(MessageContext);
  let data = null;
  const token = localStorage.getItem("token");
  const sendMail = async () => {
    data = {
      message: `Click this link to verify account ${config.mail.url}`,
      user: localStorage.getItem("id"),
    };
    try {
      const res = await axios.post(`${config.api.auth}/sendmail`, data, {
        headers: {
          "Content-Type": "application/json",
          authtoken: `${token}`,
        },
      });
      const resp = res.data;
      console.log(resp);
    } catch (error) {
      console.log(error);
    }
  };
  const verifyAccount = async (key) => {
    try {
      const res = await axios.post(
        `${config.api.auth}/markverified`,
        {
          key: key,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const resp = res.data;
      console.log(resp);
    } catch (error) {
      console.log(error);
    }
  };
  const getUser = async () => {
    try {
      const res = await axios.post(
        `${config.api.auth}/getuser`,
        {},
        {
          headers: {
            "Content-Type": "application/json",
            authtoken: `${token}`,
          },
        }
      );
      const resp = res.data;
      setUser(resp);
    } catch (error) {
      console.log(error);
    }
  };
  const changePasswordFunc = async (password, cpassword) => {
    try {
      const res = await axios.post(
        `${config.api.auth}/changepassword`,
        {
          newpassword: password,
          cnewpassword: cpassword,
        },
        {
          headers: {
            "Content-Type": "application/json",
            authtoken: `${token}`,
          },
        }
      );
      const resp = await res.data;
      showMessage("success", `${resp.msg}`);
      console.log(resp);
    } catch (error) {
      if (error.response.status === 400) {
        showMessage("error", `${error.response.data.msg}`);
      }
      if (error.response.status === 401) {
        showMessage("error", `${error.response.data.msg}`);
      }
    }
  };
  return (
    <>
      <UserContext.Provider
        value={{
          data,
          loggedin,
          setLoggedin,
          token,
          sendMail,
          verifyAccount,
          getUser,
          user,
          changePasswordFunc,
        }}
      >
        {props.children}
      </UserContext.Provider>
    </>
  );
};

export default UserState;
