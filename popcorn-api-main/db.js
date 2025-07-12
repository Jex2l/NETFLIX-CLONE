const mongoose = require("mongoose");

const MongoURI = "mongodb://172.17.0.1:27017/popcorn";

const connect = () => {
  mongoose.connect(MongoURI, () => {
    console.log("Connected to mongo successfully");
  });
};

if (!connect) {
  console.log("Not connected to mongo");
}

module.exports = connect;
