import React, { useContext, useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import "../css/Addmovie.css";
import Box from "@mui/material/Box";
import axios from "axios";
import config from "../config.json";
import {
  Button,
  InputLabel,
  LinearProgress,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import MessageContext from "../context/context/MessageContext";
import Message from "../components/Message";
import { useNavigate } from "react-router-dom";
const AddMovie = () => {
  const { showMessage } = useContext(MessageContext);
  const [movieProgress, setMovieProgress] = useState(0);
  const [imageProgress, setImageProgress] = useState(0);

  const [industry, setIndustry] = useState("");
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
  const handleChange = (event) => {
    setIndustry(event.target.value);
  };

  const [file, setFile] = useState("");
  const [uploadfile, setUploadfile] = useState("");
  const [image, setImage] = useState("");
  const [imagePath, setImagePath] = useState("");
  const onChangeMovie = (e) => {
    setFile(e.target.files[0]);
  };
  const onSubmitMovie = async (e) => {
    e.preventDefault();
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
    const name = document.getElementById("movie-name").value;
    const imagepath = document.getElementById("image-path").value;
    const moviepath = document.getElementById("movie-path").value;
    const moviegenre = document.getElementById("movie-genre").value;
    const movieyear = document.getElementById("movie-year").value;
    const moviedesc = document.getElementById("movie-desc").value;
    const movietags = document.getElementById("movie-tags").value;
    const movieslug = document.getElementById("movie-slug").value;

    const data = {
      name: name,
      image: imagepath,
      video: moviepath,
      genre: moviegenre,
      year: movieyear,
      description: moviedesc,
      tags: movietags,
      slug: movieslug,
      industry: industry,
    };
    try {
      const res = await axios.post(
        `${config.api.dataserver}/api/movies/uploadmovie`,
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
      if (error.response.status === 401) {
        showMessage("error", `${error.response.data.error}`);
      }
      if (error.response.status === 400) {
        showMessage("error", `${error.response.data.msg}`);
      }
    }
  };
  return (
    <>
      <Navbar />
      <div className="add-movie-main">
        <h1 className="movie-common">Add Movie</h1>
        <Message />
        <div className="movie-container">
          <form className="file-selector movie-common" onSubmit={onSubmitMovie}>
            <label htmlFor="movie-input ">Select Movie</label>
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
              <label htmlFor="movie-input movie-common">Movie Name</label>
              <br />
              <TextField
                required
                label="Required"
                id="movie-name"
                style={{ marginTop: "10px", width: "100%", padding: "0%" }}
              />
            </div>
            <div className="file-selector movie-common movie-text">
              <label htmlFor="movie-input movie-common">Movie Path</label>
              <br />
              <TextField
                required
                disabled
                value={uploadfile}
                id="movie-path"
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
              <label htmlFor="movie-input movie-common">Movie Genre</label>
              <br />
              <TextField
                required
                id="movie-genre"
                label="Required"
                style={{ marginTop: "10px", width: "100%", padding: "0%" }}
              />
            </div>
            <div className="file-selector movie-common movie-text">
              <label htmlFor="movie-input movie-common">Movie Year</label>
              <br />
              <TextField
                required
                id="movie-year"
                label="Required"
                style={{ marginTop: "10px", width: "100%", padding: "0%" }}
              />
            </div>
            <div className="file-selector movie-common movie-text">
              <InputLabel id="demo-simple-select-label">
                Select Industry
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={industry}
                label="industry"
                onChange={handleChange}
                fullWidth
              >
                <MenuItem value={"hollywood"}>Hollywood</MenuItem>
                <MenuItem value={"bollywood"}>Bollywood</MenuItem>
              </Select>
            </div>
            <div className="file-selector movie-common movie-text">
              <label htmlFor="formName" className="form-label">
                Movie Description
              </label>
              <br />
              <textarea
                className="form-control"
                id="movie-desc"
                minLength="100"
                rows="5"
                style={{ width: "100%" }}
              ></textarea>
            </div>
            <div className="file-selector movie-common movie-text">
              <label htmlFor="movie-input movie-common">Movie Tags</label>
              <br />
              <TextField
                required
                id="movie-tags"
                label="Required"
                style={{ marginTop: "10px", width: "100%", padding: "0%" }}
              />
              <div className="file-selector movie-common movie-text">
                <label htmlFor="movie-input movie-common">Movie Slug</label>
                <br />
                <TextField
                  required
                  id="movie-slug"
                  label="Required"
                  style={{ marginTop: "10px", width: "100%", padding: "0%" }}
                />
              </div>
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

export default AddMovie;
