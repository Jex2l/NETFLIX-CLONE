import React, { useContext } from "react";
import "../../css/SuggetionsCard.css";
import ModeContext from "../../context/Contexts/ModeContext";
import { Link } from "react-router-dom";
const SuggetionsCard = (props) => {
  const mode = useContext(ModeContext);
  const lightStyle = {
    color: "black",
  };
  const darkStyle = {
    color: "white",
  };
  return (
    <>
      <div className="suggetion-card-container">
        <div
          className="suggetion-card-main"
          style={mode.checked === false ? darkStyle : lightStyle}
        >
          <div className="suggetion-card-poster">
            <img src={props.image} alt="" />
          </div>
          <div className="suggetion-card-content">
            <div className="suggetion-card-genre">
              <p>
                {props.genre}, {props.year}
              </p>
            </div>
            <div className="suggetion-card-name">
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

export default SuggetionsCard;
