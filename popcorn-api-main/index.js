const express = require("express");
const connect = require("./db");
const cors = require("cors");
const config = require("./config.json");
connect();
const app = express();


const host = config.server.host;
const port = config.server.port;

app.use(cors());
app.use(express.json());

app.get("/", async (req, res)=> {
  res.send("POPCORN API IS RUNNING")
})

app.use("/api/auth", require("./routes/UserAuth"));
app.use("/api/movies", require("./routes/Movies"));
app.use("/api/webseries", require("./routes/WebSeries"));
app.use("/api/carousel", require("./routes/Carousel"));
app.use("/api/filter", require("./routes/Filter"));
app.use("/api/payment", require("./routes/Payment.js"));

app.listen(port, () => {
  console.log(`App is running on ${host}:${port}`);
});
