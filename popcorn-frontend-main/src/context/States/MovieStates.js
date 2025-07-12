import React, { useState } from "react";
import MovieContext from "../Contexts/MovieContext";
import axios from "axios";
import config from "../../config.json";
const MovieStates = (props) => {
  let items_m = [];
  const [items, setItems] = useState(items_m);
  const getAllMovies = async () => {
    try {
      const res = await axios.post(
        `${config.api.movies}/getallmovies`,
        {},
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const resp = await res.data;
      setItems(resp);
    } catch (error) {}
  };

  const getMovie = async (slug, setWatchmovie, setRecommend) => {
    try {
      const res = await axios.get(
        `${config.api.movies}/getmoviebyslug/${slug}`,
        {},
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const resp = await res.data;
      setWatchmovie(resp);
      const res2 = await axios.post(
        `${config.api.movies}/getrecommendation`,
        {
          genre: resp.genre,
          id: resp._id,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const resp2 = res2.data;
      setRecommend(resp2);
    } catch (error) {
      console.log(error);
    }
  };

  const type = "Movies";
  const btnAddress = "/movies";
  return (
    <MovieContext.Provider
      value={{
        items,
        type,
        btnAddress,
        getAllMovies,
        getMovie,
      }}
    >
      {props.children}
    </MovieContext.Provider>
  );
};

export default MovieStates;
