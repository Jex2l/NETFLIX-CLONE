import React, { useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Alert } from "@mui/material";
import UserContext from "../../context/Contexts/UserContext";
const Verify = () => {
  let navigate = useNavigate();
  const user = useContext(UserContext);
  const alertStyle = {
    marginTop: "20px",
    padding: "0px 30%",
  };
  const { key } = useParams();
  useEffect(() => {
    if (key !== undefined) {
      user.verifyAccount(key);
      navigate("/");
    }
    // eslint-disable-next-line
  }, []);
  return (
    <>
      <div id="verify-alert" style={alertStyle}>
        <Alert severity="info">
          <strong>Verifing account.....</strong>
        </Alert>
      </div>
    </>
  );
};

export default Verify;
