import React, { useContext, useState } from "react";
import FilterContext from "../Contexts/FilterContext";
import axios from "axios";
import config from "../../config.json";
import LoadingContext from "../Contexts/LoadingContext";

const FilterStates = (props) => {
  const [watchmovie, setWatchmovie] = useState({});
  const [likes, setLikes] = useState(0);
  const [liked, setLiked] = useState(false);
  const [favorite, setFavorite] = useState(false);
  const { setProgress } = useContext(LoadingContext);
  const filterMovies = async (genre, setItems) => {
    console.log(genre);
    try {
      const res = await axios.post(
        `${config.api.filter}/getitems/${genre}`,
        {},
        {
          headers: {
            "Content-Type": "application/json",
          },
          onDownloadProgress: (progressEvent) => {
            setProgress(
              parseInt(
                Math.round((progressEvent.loaded * 100) / progressEvent.total)
              )
            );
          },
        }
      );
      const resp = await res.data;
      setItems(resp);
    } catch (error) {
      console.log(error);
    }
  };
  const searchMovies = async (query) => {
    try {
      const res = await axios.post(
        `${config.api.filter}/search/${query}`,
        {},
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const resp = await res.data;
      setWatchmovie(resp);
    } catch (error) {
      console.log(error);
    }
  };
  const addLikes = async (id) => {
    try {
      const res = await axios.post(
        `${config.api.filter}/addlike/${id}`,
        {},
        {
          headers: {
            "Content-Type": "application/json",
            authtoken: `${localStorage.getItem("token")}`,
          },
        }
      );
      const resp = await res.data;
      console.log(resp);
    } catch (error) {
      console.log(error);
    }
  };
  const getLikes = async (slug) => {
    try {
      const res = await axios.post(
        `${config.api.filter}/getlikes/${slug}`,
        {},
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const resp = await res.data;
      setLikes(resp.likes);
    } catch (error) {
      console.log(error);
    }
  };
  const checkLike = async (id) => {
    try {
      const res = await axios.post(
        `${config.api.filter}/checklike/${id}`,
        {},
        {
          headers: {
            "Content-Type": "application/json",
            authtoken: `${localStorage.getItem("token")}`,
          },
        }
      );
      const resp = await res.data;
      setLiked(resp.liked);
    } catch (error) {
      console.log(error);
    }
  };
  const userLiked = async (setItems) => {
    try {
      const res = await axios.post(
        `${config.api.filter}/userliked`,
        {},
        {
          headers: {
            "Content-Type": "application/json",
            authtoken: `${localStorage.getItem("token")}`,
          },
        }
      );
      const resp = await res.data;
      setItems(resp);
    } catch (error) {
      console.log(error);
    }
  };
  const userFavorite = async (setItems) => {
    try {
      const res = await axios.post(
        `${config.api.filter}/userfavorite`,
        {},
        {
          headers: {
            "Content-Type": "application/json",
            authtoken: `${localStorage.getItem("token")}`,
          },
        }
      );
      const resp = await res.data;
      setItems(resp);
    } catch (error) {
      console.log(error);
    }
  };
  const checkFavorite = async (id) => {
    try {
      const res = await axios.post(
        `${config.api.filter}/checkfavorite/${id}`,
        {},
        {
          headers: {
            "Content-Type": "application/json",
            authtoken: `${localStorage.getItem("token")}`,
          },
        }
      );
      const resp = await res.data;
      setFavorite(resp.liked);
    } catch (error) {
      console.log(error);
    }
  };
  const addFavorite = async (id) => {
    try {
      const res = await axios.post(
        `${config.api.filter}/addfavorite/${id}`,
        {},
        {
          headers: {
            "Content-Type": "application/json",
            authtoken: `${localStorage.getItem("token")}`,
          },
        }
      );
      const resp = await res.data;
      console.log(resp);
    } catch (error) {
      console.log(error);
    }
  };
  const addView = async (id) => {
    try {
      const res = await axios.post(
        `${config.api.filter}/addview/${id}`,
        {},
        {
          headers: {
            "Content-Type": "application/json",
            authtoken: `${localStorage.getItem("token")}`,
          },
        }
      );
      const resp = res.data;
      console.log(resp);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <FilterContext.Provider
      value={{
        filterMovies,
        searchMovies,
        watchmovie,
        addLikes,
        getLikes,
        likes,
        liked,
        userLiked,
        checkLike,
        userFavorite,
        checkFavorite,
        favorite,
        addFavorite,
        addView,
      }}
    >
      {props.children}
    </FilterContext.Provider>
  );
};

export default FilterStates;
