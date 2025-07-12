import React, { useContext, useState } from "react";
import Footer from "../components/Footer";
import MovieWebseriesName from "../components/MovieWebseriesName";
import Navbar from "../components/Navbar";
import VideoPlayer from "../components/VideoPlayer";
import ModeContext from "../../context/Contexts/ModeContext";
import WebSeriesContext from "../../context/Contexts/WebSeriesContext";
import { useParams } from "react-router-dom";
import SuggetionsCard from "../components/SuggetionsCard";
import "../../css/WatchWebSeries.css";
import LoadingContext from "../../context/Contexts/LoadingContext";
const WatchWebSeries = () => {
  const { episodename, seriesslug } = useParams();
  const mode = useContext(ModeContext);
  const webseries = useContext(WebSeriesContext);
  const [watchWebSeries, setWatchWebSeries] = useState({});
  const [watchseries, setWatchseries] = useState({});
  const [ep, setEp] = useState([]);
  const { setProgress } = useContext(LoadingContext);
  if (episodename !== watchWebSeries.slug) {
    setProgress(20);
    webseries.getWebseries(seriesslug, setWatchseries);
    setProgress(60);
    webseries.getSeasonEpisodes(episodename, setWatchWebSeries);
    setProgress(100);
  }
  if (ep.length === 0) {
    webseries.getEpisodes(
      watchWebSeries.season,
      watchWebSeries.seriesname,
      setEp
    );
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
  return (
    <>
      <Navbar />
      <div
        className="watch-movie-container"
        style={mode.checked === false ? darkStyle : lightStyle}
      >
        <div className="watch-movie-poster">
          <VideoPlayer
            video={watchWebSeries.video}
            poster={watchWebSeries.image}
            id={watchseries._id}
          />
        </div>
        <MovieWebseriesName
          name={watchWebSeries.name}
          genre={watchseries.genre}
          description={watchseries.description}
          id={watchseries._id}
        />
        <div className="watch-web-season-btn">
          <input
            className="season-button"
            type="submit"
            value={`SEASON ${watchseries.seasons}`}
            disabled
          />
        </div>
        <div className="web-series-seasons-card">
          {Object.keys(ep).length !== 0
            ? ep.map((item, key) => (
                <SuggetionsCard
                  key={key}
                  genre={`S0${item.season}`}
                  year={`E0${item.episode}`}
                  image={item.image}
                  name={item.name}
                  slug={item.slug}
                  address={`${
                    webseries.btnAddress
                  }/${seriesslug}/${`season-${watchseries.seasons}`}`}
                />
              ))
            : null}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default WatchWebSeries;
