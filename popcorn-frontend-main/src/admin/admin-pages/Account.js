import React, { useContext, useEffect } from "react";
import ModeContext from "../../context/Contexts/ModeContext";
import AdminNavbar from "../admin_component/AdminNavbar";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import "../../css/Account.css";
import UserContext from "../../context/Contexts/UserContext";
import MessageContext from "../../context/Contexts/MessageContext";
import { useNavigate } from "react-router-dom";
import AlertComp from "../../components/components/AlertComp";
const Account = () => {
  const navigate = useNavigate();
  const mode = useContext(ModeContext);
  const { getUser, user } = useContext(UserContext);
  const { showMessage, message, messageType } = useContext(MessageContext);
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
    color: "black",
    backgroundColor: "white",
    boxShadow: "#131722 4px 5px 20px 5px",
  };
  return (
    <>
      <AdminNavbar />
      {message === null ? null : (
        <AlertComp type={messageType} message={message} />
      )}
      <div className="profile-main">
        <div className="profile-container">
          <Card
            sx={{ minWidth: 275 }}
            className="profile-card"
            style={mode.checked === false ? darkStyle : lightStyle}
          >
            <CardContent>
              {user.subscriber ? (
                <>
                  <Typography
                    variant="h5"
                    component="div"
                    className="profile-content"
                  >
                    <h3>
                      Subscription - {user.amount === 499 ? "Pro" : "Premium"}
                    </h3>
                  </Typography>
                  <Typography
                    variant="h5"
                    component="div"
                    className="profile-content"
                  >
                    <h3>Subscription Ends - {user.end_date.slice(0, 10)}</h3>
                  </Typography>
                </>
              ) : null}
              <Typography
                variant="h5"
                component="div"
                className="profile-content"
              >
                <h3>Name - {user.name}</h3>
              </Typography>
              <Typography
                variant="h5"
                component="div"
                className="profile-content"
              >
                <h3>Username - {user.username}</h3>
              </Typography>
              <Typography
                variant="h5"
                component="div"
                className="profile-content"
              >
                <h3>Email - {user.email}</h3>
              </Typography>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
};

export default Account;
