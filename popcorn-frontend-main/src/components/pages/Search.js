import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import Footer from "../components/Footer";
import Grid from "@mui/material/Grid";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import Card from "../components/Card";
import ModeContext from "../../context/Contexts/ModeContext";
import FilterContext from "../../context/Contexts/FilterContext";
const Search = () => {
  const mode = useContext(ModeContext);
  const { searchquery } = useParams();

  const { watchmovie } = useContext(FilterContext);
  const lightStyle = {
    color: "black",
  };
  const darkStyle = {
    color: "white",
  };
  if (mode.checked === false) {
    document.body.style.backgroundColor = "#131722";
  } else {
    document.body.style.backgroundColor = "#fff";
  }
  return (
    <>
      <Navbar />
      <Grid container spacing={0}>
        <Grid item={true} xs={2.5}>
          <Sidebar />
        </Grid>
        <Grid sm={12} xs={12} md={12} lg={9} item={true}>
          {watchmovie.msg ? (
            <h2
              className="web-series-header"
              style={mode.checked === false ? darkStyle : lightStyle}
            >
              {watchmovie.msg}
            </h2>
          ) : (
            <>
              <h2
                className="web-series-header"
                style={mode.checked === false ? darkStyle : lightStyle}
              >
                {`Search results for "${searchquery}"`} <hr />
              </h2>
              <div className="movies-main">
                <Card
                  image={watchmovie.image}
                  genre={watchmovie.genre}
                  year={watchmovie.year}
                  address={`/${watchmovie.itemtype}`}
                  slug={watchmovie.slug}
                  name={watchmovie.name}
                  key={1}
                />
              </div>
            </>
          )}
        </Grid>
      </Grid>
      <Footer />
    </>
  );
};

export default Search;
