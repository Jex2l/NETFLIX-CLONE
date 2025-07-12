import React from "react";
import { Link } from "react-router-dom";
import "../../css/SeasonButton.css";
const SeasonButton = (props) => {
  return (
    <>
      <div className="season-button-main">
        <Link
          to={`${props.address}/${props.slug}/season-${props.season}`}
          className="season-button-link"
        >
          SEASON {props.season}
        </Link>
      </div>
    </>
  );
};

export default SeasonButton;
