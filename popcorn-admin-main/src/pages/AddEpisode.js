import React, { useContext, useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import "../css/Addmovie.css";
import Box from "@mui/material/Box";
import axios from "axios";
import config from "../config.json";
import { Button, InputLabel, LinearProgress, TextField } from "@mui/material";
import MessageContext from "../context/context/MessageContext";
import Message from "../components/Message";
import { useNavigate } from "react-router-dom";
const AddEpisode = () => {
  const { showMessage } = useContext(MessageContext);
  const [movieProgress, setMovieProgress] = useState(0);
  const [imageProgress, setImageProgress] = useState(0);

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
            showMessage("error", "Please login with correct credentials");
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

  const [file, setFile] = useState("");
  const [uploadfile, setUploadfile] = useState("");
  const [image, setImage] = useState("");
  const [imagePath, setImagePath] = useState("");
  const onChangeMovie = (e) => {
    setFile(e.target.files[0]);
  };
  const onSubmitMovie = async (e) => {
    e.preventDefault();
    getAllWebSeries();
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await axios.post(
        `${config.api.fileServer}/uploadmovie`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          onUploadProgress: (progressEvent) => {
            setMovieProgress(
              parseInt(
                Math.round((progressEvent.loaded * 100) / progressEvent.total)
              )
            );
          },
        }
      );

      const { filePath, msg } = res.data;
      setUploadfile(filePath);
      showMessage("success", `${msg}`);
    } catch (error) {
      if (error.response.status === 500) {
        console.log("Server error");
      } else {
        console.log(error.response.data.msg);
      }
    }
  };
  const onChangeImage = (e) => {
    setImage(e.target.files[0]);
  };
  const onSubmitImage = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", image);

    try {
      const res = await axios.post(
        `${config.api.fileServer}/uploadimage`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          onUploadProgress: (progressEvent) => {
            setImageProgress(
              parseInt(
                Math.round((progressEvent.loaded * 100) / progressEvent.total)
              )
            );
          },
        }
      );

      const { filePath, msg } = res.data;
      setImagePath(filePath);
      showMessage("success", `${msg}`);
    } catch (error) {
      if (error.response.status === 500) {
        console.log("Server error");
      } else {
        console.log(error.response.data.msg);
      }
    }
  };

  const onSubmitData = async (e) => {
    e.preventDefault();
    const name = document.getElementById("ep-name").value;
    const seriesname = document.getElementById("select-webseries").value;
    const imagepath = document.getElementById("image-path").value;
    const video = document.getElementById("ep-path").value;
    const episode = document.getElementById("web-ep").value;
    const season = document.getElementById("web-season").value;
    const slug = document.getElementById("ep-slug").value;

    const data = {
      name: name,
      seriesname: seriesname,
      image: imagepath,
      video: video,
      season: season,
      episode: episode,
      slug: slug,
    };
    try {
      const res = await axios.post(
        `${config.api.dataserver}/api/webseries/uploadepisodes`,
        data,
        {
          headers: {
            "Content-Type": "application/json",
            authtoken: `${localStorage.getItem("token")}`,
          },
        }
      );
      const { msg } = res.data;
      showMessage("success", `${msg}`);
    } catch (error) {
      console.log(error);
    }
  };
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
        para.value = element.name;
        para.innerText = element.name;
        document.getElementById("select-webseries").appendChild(para);
        console.log(element);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <Navbar />
      <div className="add-movie-main">
        <h1 className="movie-common">Add Episode</h1>
        <Message />
        <div className="movie-container">
          <form className="file-selector movie-common" onSubmit={onSubmitMovie}>
            <label htmlFor="movie-input ">Select Episode</label>
            <br />
            <input
              type="file"
              id="movie-input"
              onChange={onChangeMovie}
              className="input-movie"
            />
            <Box sx={{ width: "100%", marginTop: "5px" }}>
              <LinearProgress variant="determinate" value={movieProgress} />
            </Box>
            <Button
              variant="contained"
              size="small"
              type="submit"
              style={{ marginTop: "10px" }}
            >
              Upload
            </Button>
          </form>
          <form className="file-selector movie-common" onSubmit={onSubmitImage}>
            <label htmlFor="movie-input movie-common">Select Image</label>
            <br />
            <input
              type="file"
              id="movie-input"
              onChange={onChangeImage}
              className="input-movie"
            />
            <Box sx={{ width: "100%", marginTop: "5px" }}>
              <LinearProgress variant="determinate" value={imageProgress} />
            </Box>
            <Button
              variant="contained"
              size="small"
              type="submit"
              style={{ marginTop: "10px" }}
            >
              Upload
            </Button>
          </form>
          <form onSubmit={onSubmitData}>
            <div className="file-selector movie-common movie-text">
              <label htmlFor="movie-input movie-common">Episode Name</label>
              <br />
              <TextField
                required
                label="Required"
                id="ep-name"
                style={{ marginTop: "10px", width: "100%", padding: "0%" }}
              />
            </div>
            <div className="file-selector movie-common movie-text">
              <label htmlFor="movie-input movie-common">Episode Path</label>
              <br />
              <TextField
                required
                disabled
                value={uploadfile}
                id="ep-path"
                style={{ marginTop: "10px", width: "100%", padding: "0%" }}
              />
            </div>
            <div className="file-selector movie-common movie-text">
              <label htmlFor="movie-input movie-common">Image Path</label>
              <br />
              <TextField
                required
                disabled
                value={imagePath}
                id="image-path"
                style={{ marginTop: "10px", width: "100%", padding: "0%" }}
              />
            </div>
            <div className="file-selector movie-common movie-text">
              <InputLabel id="demo-simple-select-label">
                Select Web Series
              </InputLabel>
              <div className="file-selector movie-common movie-text">
                <select
                  className="file-selector movie-common movie-text select-web"
                  id="select-webseries"
                  aria-label="Default select example"
                  required
                >
                  <option defaultValue>Webseries Name</option>
                </select>
              </div>
            </div>
            <div className="file-selector movie-common movie-text">
              <label htmlFor="movie-input movie-common">
                Web Series Season
              </label>
              <br />
              <TextField
                required
                type="number"
                id="web-season"
                label="Required"
                style={{ marginTop: "10px", width: "100%", padding: "0%" }}
              />
            </div>
            <div className="file-selector movie-common movie-text">
              <label htmlFor="movie-input movie-common">
                Web Series Episode
              </label>
              <br />
              <TextField
                required
                type="number"
                id="web-ep"
                label="Required"
                style={{ marginTop: "10px", width: "100%", padding: "0%" }}
              />
            </div>
            <div className="file-selector movie-common movie-text">
              <label htmlFor="movie-input movie-common">Episode Slug</label>
              <br />
              <TextField
                required
                id="ep-slug"
                label="Required"
                style={{ marginTop: "10px", width: "100%", padding: "0%" }}
              />
            </div>

            <Button
              variant="contained"
              size="small"
              type="submit"
              style={{ marginTop: "10px" }}
            >
              Submit
            </Button>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddEpisode;
