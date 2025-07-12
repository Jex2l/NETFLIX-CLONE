import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import MessageContext from "../context/context/MessageContext";
import config from "../config.json";
import {
  Button,
  InputLabel,
  LinearProgress,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { Box } from "@mui/system";
import Message from "../components/Message";
import Navbar from "../components/Navbar";

const AddWebseries = () => {
  const { showMessage } = useContext(MessageContext);
  const [industry, setIndustry] = useState("");
  const [image, setImage] = useState("");
  const [imagePath, setImagePath] = useState("");
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
  const handleChange = (event) => {
    setIndustry(event.target.value);
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
    const name = document.getElementById("web-name").value;
    const imagepath = document.getElementById("image-path").value;
    const seasons = document.getElementById("web-seasons").value;
    const moviegenre = document.getElementById("web-genre").value;
    const movieyear = document.getElementById("web-year").value;
    const moviedesc = document.getElementById("web-desc").value;
    const movietags = document.getElementById("web-tags").value;
    const movieslug = document.getElementById("web-slug").value;

    const data = {
      name: name,
      image: imagepath,
      genre: moviegenre,
      seasons: seasons,
      year: movieyear,
      industry: industry,
      description: moviedesc,
      tags: movietags,
      slug: movieslug,
    };
    try {
      const res = await axios.post(
        `${config.api.dataserver}/api/webseries/uploadwebseries`,
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
    } catch (error) {}
  };
  return (
    <>
      <Navbar />
      <div className="add-movie-main">
        <h1 className="movie-common">Add Web Series</h1>
        <Message />
        <div className="movie-container">
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
              <label htmlFor="movie-input movie-common">Web Series Name</label>
              <br />
              <TextField
                required
                label="Required"
                id="web-name"
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
              <label htmlFor="movie-input movie-common">Web Series Genre</label>
              <br />
              <TextField
                required
                id="web-genre"
                label="Required"
                style={{ marginTop: "10px", width: "100%", padding: "0%" }}
              />
            </div>
            <div className="file-selector movie-common movie-text">
              <label htmlFor="movie-input movie-common">
                Web Series Seasons
              </label>
              <br />
              <TextField
                required
                type="number"
                id="web-seasons"
                label="Required"
                style={{ marginTop: "10px", width: "100%", padding: "0%" }}
              />
            </div>
            <div className="file-selector movie-common movie-text">
              <label htmlFor="movie-input movie-common">Web Series Year</label>
              <br />
              <TextField
                required
                id="web-year"
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
                Web Series Description
              </label>
              <br />
              <textarea
                className="form-control"
                id="web-desc"
                minLength="100"
                rows="5"
                style={{ width: "100%" }}
              ></textarea>
            </div>
            <div className="file-selector movie-common movie-text">
              <label htmlFor="movie-input movie-common">Web Series Tags</label>
              <br />
              <TextField
                required
                id="web-tags"
                label="Required"
                style={{ marginTop: "10px", width: "100%", padding: "0%" }}
              />
              <div className="file-selector movie-common movie-text">
                <label htmlFor="movie-input movie-common">
                  Web Series Slug
                </label>
                <br />
                <TextField
                  required
                  id="web-slug"
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

export default AddWebseries;
