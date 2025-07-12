import {
  Button,
  Card,
  CardContent,
  TextField,
  Typography,
} from "@mui/material";
import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AlertComp from "../../components/components/AlertComp";
import MessageContext from "../../context/Contexts/MessageContext";
import ModeContext from "../../context/Contexts/ModeContext";
import UserContext from "../../context/Contexts/UserContext";
import AdminNavbar from "../admin_component/AdminNavbar";

const ChangePassword = () => {
  const navigate = useNavigate();
  const mode = useContext(ModeContext);
  const { getUser, user, changePasswordFunc } = useContext(UserContext);
  const message = useContext(MessageContext);
  const { showMessage } = useContext(MessageContext);
  if (mode.checked === false) {
    document.body.style.backgroundColor = "#131722";
  } else {
    document.body.style.backgroundColor = "#fff";
  }

  // console.log(user)
  const token = localStorage.getItem("token");
  useEffect(() => {
    if (!token) {
      showMessage("error", "You need to login");
      navigate("/login");
    }
    if (user === null) {
      showMessage("error", "Token is invalid");
      navigate("/login");
    }
    getUser();
    // eslint-disable-next-line
  }, []);
  const lightStyle = {
    color: "black",
    backgroundColor: "white",
    boxShadow: "gray 4px 5px 20px 5px",
  };
  const darkStyle = {
    color: "white",
    backgroundColor: "black",
  };
  const submit = () => {
    const pass = document.getElementById("pass").value;
    const cpass = document.getElementById("cpass").value;
    changePasswordFunc(pass, cpass);
  };
  return (
    <>
      <AdminNavbar />
      {message.message === null ? null : (
        <AlertComp type={message.messageType} message={message.message} />
      )}
      <div className="profile-main">
        <div className="profile-container">
          <Card
            sx={{ minWidth: 275 }}
            className="profile-card"
            style={mode.checked === false ? darkStyle : lightStyle}
          >
            <CardContent>
              <Typography
                variant="h5"
                component="div"
                className="profile-content"
              >
                <label htmlFor="pass">New Password</label>
                <TextField
                  fullWidth
                  type="password"
                  className="profile-input"
                  id="pass"
                />
              </Typography>
              <Typography
                variant="h5"
                component="div"
                className="profile-content"
              >
                <label htmlFor="cpass">Confirm New Password</label>
                <TextField
                  type="password"
                  fullWidth
                  className="profile-input"
                  id="cpass"
                />
              </Typography>
              <Typography
                variant="h5"
                component="div"
                className="profile-content"
              >
                <Button onClick={submit} variant="contained">
                  Submit
                </Button>
              </Typography>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
};

export default ChangePassword;
