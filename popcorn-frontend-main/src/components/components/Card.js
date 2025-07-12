import React, { useContext } from "react";
import "../../css/Card.css";
import ModeContext from "../../context/Contexts/ModeContext";
import { Link } from "react-router-dom";
const Card = (props) => {
  const mode = useContext(ModeContext);
  const lightStyle = {
    color: "black",
  };
  const darkStyle = {
    color: "white",
  };
  return (
    <>
      <div className="card-container">
        <div
          className="card-main"
          style={mode.checked === false ? darkStyle : lightStyle}
        >
          <div className="card-poster">
            <img src={props.image} alt="" />
          </div>
          <div className="card-content">
            <div className="card-genre">
              <p>
                {props.genre}, {props.year}
              </p>
            </div>
            <div className="card-name">
              <Link
                style={mode.checked === false ? darkStyle : lightStyle}
                className="card-link"
                to={`${props.address}/${props.slug}`}
              >
                <h3>{props.name}</h3>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Card;
