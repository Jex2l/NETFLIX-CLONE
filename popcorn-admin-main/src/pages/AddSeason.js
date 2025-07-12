import axios from "axios";
import React, { useContext } from "react";
import Message from "../components/Message";
import Navbar from "../components/Navbar";
import MessageContext from "../context/context/MessageContext";
import config from "../config.json";
import { Button } from "@mui/material";
import "../css/AddSeason.css";
const AddSeason = () => {
  const { showMessage } = useContext(MessageContext);
  const onSubmitData = async (e) => {
    e.preventDefault();
    const seriesname = document.getElementById("select-webseries").value;
    const res = await axios.put(
      `${config.api.dataserver}/api/webseries/addseason`,
      {
        name: seriesname,
      },
      {
        headers: {
          "Content-Type": "application/json",
          authtoken: `${localStorage.getItem("token")}`,
        },
      }
    );
    const resp = await res.data;
    showMessage("success", `${resp.msg}`);
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
      <Message />
      <div className="add-season-main">
        <form
          onSubmit={onSubmitData}
          encType="multipart/form-data"
          method="post"
          className="mt-5"
        >
          <div className="mb-3">
            <select
              className="select-webseries-season"
              id="select-webseries"
              aria-label="Default select example"
              required
            >
              <option defaultValue>Webseries Name</option>
            </select>
          </div>
          <div className="mb-3 add-season-btns">
            <div className="season-add-btn">
              <Button
                size="small"
                className="season-add-btn"
                variant="contained"
                type="submit"
              >
                Submit
              </Button>
            </div>
            <div className="season-add-btn">
              <Button
                size="small"
                className="season-add-btn"
                variant="contained"
                onClick={getAllWebSeries}
              >
                Load Web Series
              </Button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default AddSeason;
