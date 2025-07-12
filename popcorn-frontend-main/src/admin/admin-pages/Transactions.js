import { Card, CardContent, Typography } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import AdminNavbar from "../admin_component/AdminNavbar";
import ModeContext from "../../context/Contexts/ModeContext";
import "../../css/Transactions.css";
import axios from "axios";
import config from "../../config.json";

const Transactions = () => {
  const mode = useContext(ModeContext);
  if (mode.checked === false) {
    document.body.style.backgroundColor = "#131722";
  } else {
    document.body.style.backgroundColor = "#fff";
  }
  const lightStyle = {
    color: "black",
    backgroundColor: "white",
    boxShadow: "gray 4px 5px 20px 5px",
  };
  const darkStyle = {
    color: "black",
    backgroundColor: "white",
    boxShadow: "#131722 4px 5px 20px 5px",
  };
  const lightStyle2 = {
    color: "black",
    textAlign: "center",
    marginTop: "10px",
  };
  const darkStyle2 = {
    color: "white",
    textAlign: "center",
    marginTop: "10px",
  };
  const [transactions, setTransactions] = useState([]);
  useEffect(() => {
    const getTransactions = async () => {
      const res = await axios.post(
        `${config.api.payment}/gettransactions`,
        {},
        {
          headers: {
            "Content-Type": "application/json",
            authtoken: `${localStorage.getItem("token")}`,
          },
        }
      );
      const resp = res.data;
      setTransactions(resp);
    };
    getTransactions();
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <AdminNavbar />
      {transactions.length === 0 ? (
        <h1 style={mode.checked === false ? darkStyle2 : lightStyle2}>
          No transaction found
        </h1>
      ) : null}
      <div className="transactions-main">
        <div className="transactions-container">
          {transactions.map((item, key) => (
            <Card
              sx={{ minWidth: 275 }}
              className="transaction-card"
              style={mode.checked === false ? darkStyle : lightStyle}
              key={key}
            >
              <CardContent>
                <Typography
                  variant="h5"
                  component="div"
                  className="transaction-content"
                >
                  <h6>Payment Id - {item.payment_id}</h6>
                </Typography>
                <Typography
                  variant="h5"
                  component="div"
                  className="transaction-content"
                >
                  <h6>Order Id - {item.order_id}</h6>
                </Typography>
                <Typography
                  variant="h5"
                  component="div"
                  className="transaction-content"
                >
                  <h6>Amount - {item.amount}</h6>
                </Typography>
                <Typography
                  variant="h5"
                  component="div"
                  className="transaction-content"
                >
                  <h6>Date - {item.date.slice(0, 10)}</h6>
                </Typography>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </>
  );
};

export default Transactions;
