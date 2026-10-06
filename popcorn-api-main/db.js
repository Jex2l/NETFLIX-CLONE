require("dotenv").config();
const mongoose = require("mongoose");

const MongoURI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/popcorn";

const connect = () => {
  mongoose
    .connect(MongoURI)
    .then(() => console.log("Connected to mongo successfully"))
    .catch((err) => console.error("Failed to connect to mongo:", err.message));
};

module.exports = connect;
