import React, { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import Footer from "../components/Footer";
import Grid from "@mui/material/Grid";
import Navbar from "../components/Navbar";
import Card from "../components/Card";
import ModeContext from "../../context/Contexts/ModeContext";
import FilterContext from "../../context/Contexts/FilterContext";
import Sidebar from "../components/Sidebar";
const Filter = () => {
  const mode = useContext(ModeContext);
  const { filterMovies } = useContext(FilterContext);
  const { genre } = useParams();
  const [prevGenre, setPrevGenre] = useState(null);
  const lightStyle = {
    color: "black",
  };
  const darkStyle = {
    color: "white",
  };
  let splitGenreArray = genre.split("-");
  let genreType = "";
  for (let i = 0; i < splitGenreArray.length; i++) {
    const element =
      splitGenreArray[i].charAt(0).toUpperCase() + splitGenreArray[i].slice(1);
    genreType = genreType + " " + element;
  }
  const [items, setItems] = useState([]);

  if (genre !== prevGenre) {
    filterMovies(genre, setItems);
    setPrevGenre(genre);
  }
  if (mode.checked === false) {
    document.body.style.backgroundColor = "#131722";
  } else {
    document.body.style.backgroundColor = "#fff";
  }
  return (
    <>
      <Navbar />
      <Grid container spacing={0}>
        <Grid xs={2.5} item={true}>
          <Sidebar />
        </Grid>
        <Grid sm={12} xs={12} md={12} lg={9} item={true}>
          <h2
            className="web-series-header"
            style={mode.checked === false ? darkStyle : lightStyle}
          >
            {genreType} <hr />
          </h2>
          <div className="movies-main">
            {items.map((item, key) => (
              <Card
                image={item.image}
                genre={item.genre}
                year={item.year}
                address={`/${item.itemtype}`}
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

export default Filter;
