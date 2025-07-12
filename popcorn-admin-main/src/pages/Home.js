import axios from "axios";
import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import config from "../config.json";
import MessageContext from "../context/context/MessageContext";
import "../css/Home.css";
const Home = () => {
  const navigate = useNavigate();
  const { showMessage } = useContext(MessageContext);
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

  return (
    <>
      <Navbar />
      <div className="admin-panel-home">
        <h1>Welcome to the POPCORN Admin Panel</h1>
      </div>
    </>
  );
};

export default Home;
