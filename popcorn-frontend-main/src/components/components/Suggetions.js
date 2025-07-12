import React from "react";
import SuggetionsCard from "./SuggetionsCard";
import "../../css/Suggetions.css";
const Suggetions = (props) => {
  return (
    <>
      <div className="watch-movie-suggentions">
        <h2>You may also like : </h2>
        <div className="suggetions-container">
          {Object.keys(props.items).length !== 0
            ? props.items.map((item, key) => (
                <SuggetionsCard
                  key={key}
                  items={props.suggentions}
                  genre={props.genre}
                  image={item.image}
                  name={item.name}
                  slug={item.slug}
                  year={props.year}
                  address={props.address}
                />
              ))
            : null}
        </div>
      </div>
    </>
  );
};

export default Suggetions;
