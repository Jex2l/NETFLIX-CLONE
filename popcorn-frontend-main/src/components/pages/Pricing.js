import React, { useContext, useEffect } from "react";
import "../../css/Pricing.css";
import Navbar from "../components/Navbar";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea, CardActions } from "@mui/material";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import ModeContext from "../../context/Contexts/ModeContext";
import MessageContext from "../../context/Contexts/MessageContext";
import axios from "axios";
import config from "../../config.json";
import { useNavigate } from "react-router-dom";
import UserContext from "../../context/Contexts/UserContext";
import AlertComp from "../components/AlertComp";
const Pricing = () => {
  const mode = useContext(ModeContext);
  const { showMessage, message, messageType } = useContext(MessageContext);
  const navigate = useNavigate();
  if (mode.checked === false) {
    document.body.style.backgroundColor = "#131722";
  } else {
    document.body.style.backgroundColor = "#fff";
  }
  const loadScript = (src) => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  };
  useEffect(() => {
    loadScript("https://checkout.razorpay.com/v1/checkout.js");
  }, []);
  const { getUser, user } = useContext(UserContext);
  const token = localStorage.getItem("token");
  const displayRazorpay = async (amount) => {
    // console.log(amount);
    if (!token) {
      navigate("/login");
      return showMessage("error", "You need to login to buy plan");
    }
    getUser();
    const data = {
      amt: amount * 100,
    };
    const res = await axios.post(`${config.api.payment}/pay`, data, {
      headers: {
        "Content-Type": "application/json",
        authtoken: `${token}`,
      },
    });
    const resp = res.data;
    let options = {
      key: config.payment.key,
      amount: resp.amount * 100,
      currency: resp.currency,
      order_id: resp.id,
      handler: async function (response) {
        const resv = await axios.post(
          `${config.api.payment}/verify`,
          {
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_order_id: response.razorpay_order_id,
            razorpay_signature: response.razorpay_signature,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const respv = await resv.data;
        if (respv.signatureIsValid) {
          const resadd = await axios.post(
            `${config.api.payment}/addTransaction`,
            {
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_order_id: response.razorpay_order_id,
              razorpay_signature: response.razorpay_signature,
              amt: amount,
            },
            {
              headers: {
                "Content-Type": "application/json",
                authtoken: `${token}`,
              },
            }
          );
          const respadd = await resadd.data;
          if (respadd.msg) {
            showMessage("success", `${respadd.msg}`);
            navigate("/account");
          }
          if (respadd.error) {
            showMessage("error", `${respadd.error}`);
            navigate("/account");
          }
        }
      },
      prefill: {
        name: user.name,
        email: user.email,
      },
      theme: {
        color: "#3399cc",
      },
    };
    const pay = new window.Razorpay(options);
    pay.open();
  };
  return (
    <>
      <Navbar />
      {message === null ? null : (
        <AlertComp type={messageType} message={message} />
      )}
      <div className="pricing-main">
        <div className="pricing-container">
          <Card sx={{ maxWidth: 300 }} className="pricing-card">
            <CardActionArea>
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Pro
                </Typography>
                <Typography variant="body2">
                  Full HD Contents
                  <br />
                  <br />
                  No Ads
                  <br />
                  <br />
                  6 Month
                  <br />
                  <br />
                </Typography>
              </CardContent>
            </CardActionArea>
            <CardActions>
              <Button
                onClick={() => displayRazorpay(499)}
                size="small"
                color="primary"
              >
                Buy at <CurrencyRupeeIcon fontSize="small" /> 499
              </Button>
            </CardActions>
          </Card>
          <Card sx={{ maxWidth: 300 }} className="pricing-card">
            <CardActionArea>
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Premium
                </Typography>
                <Typography variant="body2">
                  Full HD Contents
                  <br />
                  <br />
                  No Ads
                  <br />
                  <br />
                  12 Month
                  <br />
                  <br />
                </Typography>
              </CardContent>
            </CardActionArea>
            <CardActions>
              <Button
                onClick={() => displayRazorpay(999)}
                size="small"
                color="primary"
              >
                Buy at <CurrencyRupeeIcon fontSize="small" /> 999
              </Button>
            </CardActions>
          </Card>
        </div>
      </div>
    </>
  );
};

export default Pricing;
