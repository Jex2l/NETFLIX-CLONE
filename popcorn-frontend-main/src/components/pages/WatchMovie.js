import React, { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../../css/WatchMovie.css";
import ModeContext from "../../context/Contexts/ModeContext";
import MovieContext from "../../context/Contexts/MovieContext";
import VideoPlayer from "../components/VideoPlayer";
import MovieWebseriesName from "../components/MovieWebseriesName";
import Suggetions from "../components/Suggetions";
const WatchMovie = () => {
  const { movieslug } = useParams();
  const mode = useContext(ModeContext);
  const movie = useContext(MovieContext);
  const [watchmovie, setWatchmovie] = useState({});
  const [recommend, setRecommend] = useState([]);

  if (movieslug !== watchmovie.slug) {
    movie.getMovie(movieslug, setWatchmovie, setRecommend);
  }

  if (mode.checked === false) {
    document.body.style.backgroundColor = "#131722";
  } else {
    document.body.style.backgroundColor = "#fff";
  }
  const lightStyle = {
    color: "black",
  };
  const darkStyle = {
    color: "white",
  };
  const suggentions = recommend;
  return (
    <>
      <Navbar />
      <div
        className="watch-movie-container"
        style={mode.checked === false ? darkStyle : lightStyle}
      >
        <div className="watch-movie-poster">
          <VideoPlayer
            video={watchmovie.video}
            poster={watchmovie.image}
            id={watchmovie._id}
          />
        </div>
        <MovieWebseriesName
          name={watchmovie.name}
          genre={watchmovie.genre}
          description={watchmovie.description}
          id={watchmovie._id}
        />
        <Suggetions
          items={suggentions}
          genre={watchmovie.genre}
          year={watchmovie.year}
          address={movie.btnAddress}
        />
      </div>
      <Footer />
    </>
  );
};

export default WatchMovie;
