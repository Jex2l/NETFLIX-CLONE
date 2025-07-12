import axios from "axios";
import React, { useContext, useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import MessageContext from "../../context/Contexts/MessageContext";
import UserContext from "../../context/Contexts/UserContext";
import "../../css/VideoPlayer.css";
import config from "../../config.json";
import FilterContext from "../../context/Contexts/FilterContext";
const VideoPlayer = (props) => {
  const navigate = useNavigate();
  const { showMessage } = useContext(MessageContext);
  const { getUser, user } = useContext(UserContext);
  const { addView } = useContext(FilterContext);
  const { seriesslug } = useParams();
  const ref = useRef();
  useEffect(() => {
    ref.current?.load();
    getUser();
    // eslint-disable-next-line
  }, [props]);
  const [viewCounted, setViewCounted] = useState(false);
  const [currentSeries, setCurrentSeries] = useState(null);
  if (currentSeries !== seriesslug) {
    setViewCounted(false);
    setCurrentSeries(seriesslug);
  }
  const onPlay = () => {
    const token = localStorage.getItem("token");
    const vid = document.getElementById("video-id");
    if (!token) {
      vid.pause();
      showMessage("error", "You have to login first to play the movie");
      navigate("/login");
    } else {
      if (!user.subscriber) {
        vid.pause();
        showMessage("error", "Please subscribe to enjoy movies and tv-series");
        console.log(user.subscriber);
        navigate("/pricing");
      }
      if (!viewCounted) {
        addView(props.id);
        setViewCounted(true);
      }
      let endDate = user.end_date.slice(0, 10);
      let eDate = new Date(endDate);
      let todayDate = new Date();
      if (todayDate > eDate) {
        const endSubscription = async () => {
          const res = await axios.post(
            `${config.api.payment}/marksubscriberfalse`,
            {},
            {
              headers: {
                "Content-Type": "application/json",
                authtoken: `${token}`,
              },
            }
          );
          const resp = res.data;
          if (resp.msg) {
            showMessage("error", `${resp.msg}`);
            navigate("/pricing");
          }
        };
        endSubscription();
      }
    }
  };
  return (
    <>
      <div className="video-player-main">
        <video
          ref={ref}
          poster={props.poster}
          onPlay={onPlay}
          id="video-id"
          controls
          preload="none"
        >
          <source src={props.video} type="video/webm" />
        </video>
      </div>
    </>
  );
};

export default VideoPlayer;
