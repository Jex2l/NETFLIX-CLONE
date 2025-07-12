import { Button } from "@mui/material";
import axios from "axios";
import React, { useContext, useEffect } from "react";
import Message from "../components/Message";
import Navbar from "../components/Navbar";
import "../css/ChangeCarousel.css";
import config from "../config.json";
import MessageContext from "../context/context/MessageContext";
import { useNavigate } from "react-router-dom";
const ChangeCarousel = () => {
  const { showMessage } = useContext(MessageContext);
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      showMessage("error", "Please login with valid credentials");
    } else {
      const verify = async () => {
        try {
          const res = await axios.post(
            `${config.api.dataserver}/api/auth/adminverify`,
            {},
            {
              headers: {
                "Content-Type": "application/json",
                authtoken: `${token}`,
              },
            }
          );
          const resp = res.data;
          if (!resp.admin) {
            showMessage("error", "Please login with correct credentials.");
            navigate("/login");
          }
        } catch (error) {
          console.log(error);
          if (error.response.status === 401) {
            showMessage("error", `${error.response.data.error}`);
          } else {
            showMessage("error", `${error.response.data.msg}`);
          }
          navigate("/login");
        }
      };
      verify();
    }
    // eslint-disable-next-line
  }, []);
  const getAllWebSeries = async () => {
    try {
      const res = await axios.post(
        `${config.api.dataserver}/api/webseries/getallwebseries`,
        {},
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const resp = await res.data;
      for (let index = 0; index < resp.length; index++) {
        const element = resp[index];
        const para = document.createElement("option");
        para.value = element._id;
        para.innerText = element.name;
        document.getElementById("select-webseries").appendChild(para);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const getAllMovies = async () => {
    try {
      const res = await axios.post(
        `${config.api.dataserver}/api/movies/getallmovies`,
        {},
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const resp = await res.data;
      for (let index = 0; index < resp.length; index++) {
        const element = resp[index];
        const para = document.createElement("option");
        para.value = element._id;
        para.innerText = element.name;
        document.getElementById("select-movie").appendChild(para);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const getCarouselItems = async () => {
    try {
      const res = await axios.post(
        `${config.api.dataserver}/api/carousel/getitems`,
        {},
        {
          headers: {
            "Content-type": "application/json",
          },
        }
      );
      const resp = await res.data;
      for (let index = 0; index < resp.length; index++) {
        const element = resp[index];
        const para = document.createElement("option");
        para.value = element._id;
        para.innerText = element.name;
        document.getElementById("delete-item").appendChild(para);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const addMovie = async (e) => {
    e.preventDefault();
    const id = document.getElementById("select-movie").value;
    try {
      const res = await axios.post(
        `${config.api.dataserver}/api/carousel/addmovie/${id}`,
        {},
        {
          headers: {
            "Content-type": "application/json",
            authtoken: `${localStorage.getItem("token")}`,
          },
        }
      );
      const resp = res.data;
      showMessage("success", `${resp.msg}`);
    } catch (error) {
      showMessage("error", `${error.response.data.msg}`);
    }
  };
  const addWebseries = async (e) => {
    e.preventDefault();
    const id = document.getElementById("select-webseries").value;
    try {
      const res = await axios.post(
        `${config.api.dataserver}/api/carousel/addwebseries/${id}`,
        {},
        {
          headers: {
            "Content-type": "application/json",
            authtoken: `${localStorage.getItem("token")}`,
          },
        }
      );
      const resp = res.data;
      showMessage("success", `${resp.msg}`);
    } catch (error) {
      showMessage("error", `${error.response.data.msg}`);
    }
  };
  const deleteItem = async (e) => {
    e.preventDefault();
    const id = document.getElementById("delete-item").value;
    try {
      const res = await axios.delete(
        `${config.api.dataserver}/api/carousel/deleteitem/${id}`,
        {
          headers: {
            "Content-type": "application/json",
            authtoken: `${localStorage.getItem("token")}`,
          },
        }
      );
      const resp = res.data;
      showMessage("success", `${resp.msg}`);
    } catch (error) {
      showMessage("error", `${error.response.data.msg}`);
      console.log(error);
    }
  };
  return (
    <>
      <Navbar />
      <Message />
      <div className="change-carousel-container">
        <div className="change-carousel-main">
          <h1>Change Carousel</h1>
          <form className="add-movie-form carousel-form" onSubmit={addMovie}>
            <h2>Add Movie</h2>
            <div className="form-item">
              <select
                className="select-webseries-season"
                id="select-movie"
                aria-label="Default select example"
                required
              >
                <option defaultValue>Select Movie</option>
              </select>
            </div>
            <div className="form-item form-item-1">
              <Button size="small" type="submit" variant="contained">
                Add Movie
              </Button>
              <Button size="small" onClick={getAllMovies} variant="contained">
                Load Movies
              </Button>
            </div>
          </form>
          <form
            className="add-webseries-form carousel-form"
            onSubmit={addWebseries}
          >
            <h2>Add Webseries</h2>
            <div className="form-item">
              <select
                className="select-webseries-season"
                id="select-webseries"
                aria-label="Default select example"
                required
              >
                <option defaultValue>Select Webseries</option>
              </select>
            </div>
            <div className="form-item form-item-1">
              <Button size="small" type="submit" variant="contained">
                Add Webseries
              </Button>
              <Button
                size="small"
                onClick={getAllWebSeries}
                variant="contained"
              >
                Load Webseries
              </Button>
            </div>
          </form>
          <form
            className="delete-item-form carousel-form"
            onSubmit={deleteItem}
          >
            <h2>Delete Item</h2>
            <div className="form-item">
              <select
                className="select-webseries-season"
                id="delete-item"
                aria-label="Default select example"
                required
              >
                <option defaultValue>Select Item</option>
              </select>
            </div>
            <div className="form-item form-item-1">
              <Button size="small" type="submit" variant="contained">
                Delete Item
              </Button>
              <Button
                size="small"
                onClick={getCarouselItems}
                variant="contained"
              >
                Load Items
              </Button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default ChangeCarousel;
