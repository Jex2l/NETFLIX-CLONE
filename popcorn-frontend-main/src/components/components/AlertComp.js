import { Alert } from "@mui/material";
import React from "react";

const AlertComp = (props) => {
  return (
    <>
      <div className="alert-box" style={{ paddingBottom: "10px" }}>
        <Alert severity={`${props.type}`}>{props.message}</Alert>
      </div>
    </>
  );
};

export default AlertComp;
