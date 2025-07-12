import React from "react";
import "../../css/Carousel.css";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
const Carousel = (props) => {
  const navigate = useNavigate();
  const goMovies = (e) => {
    e.preventDefault();
    navigate(`/${props.type}/${props.slug}`);
  };
  return (
    <>
      <div className="container-carousel">
        <div
          className="main-carousel"
          style={{
            backgroundImage: `url(${props.item.image})`,
            backgroundSize: "100% 100%",
          }}
        >
          <div className="carousel-header carousel-1">
            <h1>{props.item.name}</h1>
          </div>
          <div className="carousel-movie-genre carousel-1">
            <ul>
              <li className="carousel-genre">{props.item.genre1}</li>
              <li className="carousel-genre carousel-genre-li">
                {props.item.genre2}
              </li>
              <li className="carousel-genre-li">{props.item.year}</li>
            </ul>
          </div>
          <div className="carousel-movie-watch-button carousel-1">
            <Button variant="contained" onClick={goMovies}>
              Watch
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Carousel;
