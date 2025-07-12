import React, { useContext, useEffect } from "react";
import Grid from "@mui/material/Grid";
import Carouselitems from "../components/Carouselitems";
import Card from "../components/Card";
import Footer from "../components/Footer";
import Sidebar from "../components/Sidebar";
import MovieContext from "../../context/Contexts/MovieContext";
import WebSeriesContext from "../../context/Contexts/WebSeriesContext";
import ModeContext from "../../context/Contexts/ModeContext";
import "../../css/Home.css";
import LoadingContext from "../../context/Contexts/LoadingContext";
import Navbar from "../components/Navbar";

const Home = () => {
  const movie = useContext(MovieContext);
  const webseries = useContext(WebSeriesContext);
  const mode = useContext(ModeContext);
  const { setProgress } = useContext(LoadingContext);
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
  useEffect(() => {
    setProgress(30);
    movie.getAllMovies();
    setProgress(50);
    webseries.getAllWebSeries();
    setProgress(70);
    webseries.getAllWebEpisodes();
    setProgress(100);
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <Navbar />
      <Grid container spacing={0}>
        <Grid xs={2.5} item={true}>
          <Sidebar />
        </Grid>
        <Grid sm={12} xs={12} md={12} lg={9} item={true}>
          <Carouselitems />
          <h2
            className="web-series-header"
            style={mode.checked === false ? darkStyle : lightStyle}
          >
            Movies <hr />
          </h2>
          <div className="movies-main">
            {movie.items.slice(0, 8).map((item, key) => (
              <Card
                image={item.image}
                genre={item.genre}
                year={item.year}
                address={movie.btnAddress}
                slug={item.slug}
                name={item.name}
                key={key}
              />
            ))}
          </div>
          <h2
            className="web-series-header"
            style={mode.checked === false ? darkStyle : lightStyle}
          >
            TV-Series <hr />
          </h2>
          <div className="movies-main">
            {webseries.items.slice(0, 8).map((item, key) => (
              <Card
                image={item.image}
                genre={item.genre}
                year={item.year}
                address={webseries.btnAddress}
                slug={item.slug}
                name={item.name}
                key={key}
              />
            ))}
          </div>
        </Grid>
      </Grid>
      <Footer />
    </>
  );
};

export default Home;
