import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ModeContext from "../../context/Contexts/ModeContext";
import WebSeriesContext from "../../context/Contexts/WebSeriesContext";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import SuggetionsCard from "../components/SuggetionsCard";
import "../../css/SeriesDesc.css";
import MovieWebseriesName from "../components/MovieWebseriesName";
import LoadingContext from "../../context/Contexts/LoadingContext";
const SeriesDesc = () => {
  // getting parameters fron url
  const { seriesslug } = useParams();

  // Using contexts
  const mode = useContext(ModeContext);
  const webseries = useContext(WebSeriesContext);
  const { setProgress } = useContext(LoadingContext);
  const [watchmovie, setWatchmovie] = useState({});
  const [clickedSeason, setClickedSeason] = useState(true);
  useEffect(() => {
    webseries.getWebseries(seriesslug, setWatchmovie);
    // eslint-disable-next-line
  }, []);
  if (mode.checked === false) {
    document.body.style.backgroundColor = "#131722";
  } else {
    document.body.style.backgroundColor = "#fff";
  }

  // styles for lite and dark mode
  const lightStyle = {
    color: "black",
  };
  const darkStyle = {
    color: "white",
  };

  // webseries seasons
  const numberOfItems = watchmovie.seasons;

  // getting episodes
  const [ep, setEp] = useState([]);

  if (clickedSeason) {
    webseries.getEpisodes(1, watchmovie.name, setEp);
  }
  const changeSeason = (seasonNo) => {
    const link = `${webseries.btnAddress}/${seriesslug}/season-${seasonNo}`;
    console.log(link);
    setProgress(50);
    webseries.getEpisodes(seasonNo, watchmovie.name, setEp);
    setClickedSeason(false);
    console.log(ep);
    setProgress(100);
  };
  return (
    <>
      <Navbar />
      <div
        className="watch-movie-container"
        style={mode.checked === false ? darkStyle : lightStyle}
      >
        <div className="watch-movie-poster">
          <img src={watchmovie.image} alt="" />
        </div>
        <MovieWebseriesName
          name={watchmovie.name}
          genre={watchmovie.genre}
          description={watchmovie.description}
          id={watchmovie._id}
        />
        <div className="web-series">
          <div className="web-series-seasons">
            {numberOfItems > 0 ? (
              [...Array(numberOfItems).keys()].map((key) => (
                <input
                  key={key}
                  className="season-button"
                  onClick={() => changeSeason(key + 1)}
                  type="submit"
                  value={`SEASON ${key + 1}`}
                />
              ))
            ) : (
              <input
                className="season-button"
                onClick={() => changeSeason(1)}
                type="submit"
                value={`SEASON ${1}`}
              />
            )}
          </div>
          <div className="web-series-seasons-card">
            {Object.keys(ep).length !== 0
              ? ep.map((item, key) => (
                  <SuggetionsCard
                    key={key}
                    genre={`S${
                      item.season > 9 ? item.season : "0" + item.season
                    }`}
                    year={`E${
                      item.episode > 9 ? item.episode : "0" + item.episode
                    }`}
                    image={item.image}
                    name={item.name}
                    slug={item.slug}
                    address={`${
                      webseries.btnAddress
                    }/${seriesslug}/${`season-${item.season}`}`}
                  />
                ))
              : null}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default SeriesDesc;
