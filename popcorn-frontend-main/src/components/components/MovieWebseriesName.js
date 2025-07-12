import React, { useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import FilterContext from "../../context/Contexts/FilterContext";
import MessageContext from "../../context/Contexts/MessageContext";
import ModeContext from "../../context/Contexts/ModeContext";
import UserContext from "../../context/Contexts/UserContext";
import "../../css/MovieWebseriesName.css";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";
import PlaylistAddCheckIcon from "@mui/icons-material/PlaylistAddCheck";
const MovieWebseriesName = (props) => {
  const darkStyle_2 = {
    backgroundColor: "#1c212e",
  };
  const lightStyle_2 = {
    backgroundColor: "#eeeff0",
  };
  const { movieslug, seriesslug } = useParams();
  const mode = useContext(ModeContext);
  const { showMessage } = useContext(MessageContext);
  const { getUser } = useContext(UserContext);
  const {
    addLikes,
    getLikes,
    likes,
    checkLike,
    liked,
    addFavorite,
    checkFavorite,
    favorite,
  } = useContext(FilterContext);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const likeItem = async () => {
    console.log(props.id);
    if (!token) {
      showMessage("error", "You have to login to like a movie or webseries");
      navigate("/login");
    } else {
      getUser();
      addLikes(props.id);
    }
  };
  const favoriteItem = async () => {
    console.log(props.id);
    if (!token) {
      showMessage(
        "error",
        "You have to login to add in favorites a movie or webseries"
      );
      navigate("/login");
    } else {
      getUser();
      addFavorite(props.id);
    }
  };
  if (movieslug) {
    getLikes(movieslug);
    checkLike(props.id);
    checkFavorite(props.id);
    let ele = document.getElementById("likes");
    let ele2 = document.getElementById("fav");
    if (ele) {
      if (liked) {
        ele.style.color = "#24baef";
      } else {
        ele.style.color = "";
      }
    }
    if (ele2) {
      if (favorite) {
        ele2.style.color = "#24baef";
      } else {
        ele2.style.color = "";
      }
    }
  }
  if (seriesslug) {
    getLikes(seriesslug);
    if (token) {
      checkLike(props.id);
      checkFavorite(props.id);
    }
    let ele = document.getElementById("likes");
    let ele2 = document.getElementById("fav");
    if (ele) {
      if (liked) {
        ele.style.color = "#24baef";
      } else {
        ele.style.color = "";
      }
    }
    if (ele2) {
      if (favorite) {
        ele2.style.color = "#24baef";
      } else {
        ele2.style.color = "";
      }
    }
  }
  return (
    <>
      <div
        className="watch-movie-name-container"
        style={mode.checked === false ? darkStyle_2 : lightStyle_2}
      >
        <div className="watch-movie-name">
          <div className="watch-movie-name-name">
            <h1>{props.name}</h1>
          </div>
          <div className="watch-movie-genre">{props.genre}</div>
        </div>
        <div className="watch-movie-name name-right-side">
          <div className="watch-movie-likes">
            <i
              onClick={likeItem}
              className="fa-solid fa-thumbs-up fa-2xl"
              id="likes"
              style={{ cursor: "pointer" }}
            ></i>
            <br />
            &nbsp;&nbsp;{likes}
          </div>
          <div className="watch-movie-likes add-favorite">
            <p>
              {!favorite ? (
                <PlaylistAddIcon
                  id="fav"
                  style={{ cursor: "pointer" }}
                  onClick={favoriteItem}
                />
              ) : (
                <PlaylistAddCheckIcon
                  id="fav"
                  style={{ cursor: "pointer" }}
                  onClick={favoriteItem}
                />
              )}
            </p>
          </div>
        </div>
      </div>
      <div
        className="watch-movie-description watchmovie-c"
        style={mode.checked === false ? darkStyle_2 : lightStyle_2}
      >
        <p className="movie-description">{props.description}</p>
      </div>
    </>
  );
};

export default MovieWebseriesName;
