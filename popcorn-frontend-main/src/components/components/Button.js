import React, { useContext } from "react";
import { Link } from "react-router-dom";
import "../../css/Button.css";
import ModeContext from "../../context/Contexts/ModeContext";
const Button = (props) => {
  const mode = useContext(ModeContext);
  const lightStyle = {
    color: "black",
    border: "1px solid black",
  };
  const darkStyle = {
    color: "white",
    border: "1px solid white",
  };
  return (
    <div className="button-main">
      <Link
        className="btn"
        id="btn-id"
        style={mode.checked === false ? darkStyle : lightStyle}
        to={`${props.address}`}
      >
        {props.name}
      </Link>
    </div>
  );
};

export default Button;
