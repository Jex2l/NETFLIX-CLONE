import React, { useContext, useState } from "react";
import WebSeriesContext from "../Contexts/WebSeriesContext";
import axios from "axios";
import config from "../../config.json";
import LoadingContext from "../Contexts/LoadingContext";
const WebSeriesStates = (props) => {
  let items_m = [];
  let episodes_w = [];
  const [episodes, setEpisodes] = useState(episodes_w);
  const [items, setItems] = useState(items_m);
  const { setProgress } = useContext(LoadingContext);
  const getAllWebSeries = async () => {
    try {
      const res = await axios.post(
        `${config.api.webseries}/getallwebseries`,
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
  const getAllWebEpisodes = async () => {
    try {
      const res = await axios.post(
        `${config.api.webseries}/getallepisodes`,
        {},
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const resp = await res.data;
      setEpisodes(resp);
    } catch (error) {}
  };

  const getWebseries = async (slug, setWatchmovie) => {
    try {
      setProgress(30);
      const res = await axios.get(
        `${config.api.webseries}/getwebseriesbyslug/${slug}`,
        {},
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setProgress(60);
      const resp = res.data;
      setWatchmovie(resp);
      setProgress(100);
      // console.log(resp)
    } catch (error) {
      console.log(error);
    }
  };
  const getEpisodes = async (season, seriesname, setEp) => {
    try {
      const res = await axios.post(
        `${config.api.webseries}/getepisodes`,
        {
          season: season,
          seriesname: seriesname,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const resp = res.data;
      setEp(resp);
      // console.log(resp)
    } catch (error) {
      console.log(error);
    }
  };

  const getSeasonEpisodes = async (slug, setWatchmovie) => {
    const data = {
      slug: slug,
    };
    try {
      const res = await axios.post(`${config.api.webseries}/getepisode`, data, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      const resp = await res.data;
      setWatchmovie(resp);
    } catch (error) {
      console.log(error);
    }
  };
  const type = "TV-Series";
  const btnAddress = "/tv-series";
  return (
    <WebSeriesContext.Provider
      value={{
        items,
        type,
        btnAddress,
        episodes,
        getAllWebSeries,
        getAllWebEpisodes,
        getWebseries,
        getEpisodes,
        getSeasonEpisodes,
      }}
    >
      {props.children}
    </WebSeriesContext.Provider>
  );
};

export default WebSeriesStates;
