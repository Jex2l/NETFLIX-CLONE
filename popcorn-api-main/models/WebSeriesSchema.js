const mongoose = require("mongoose");
const { Schema } = mongoose;

const WebSeriesSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  seasons: {
    type: Number,
    required: true,
  },
  genre: {
    type: String,
    required: true,
  },
  year: {
    type: String,
    required: true,
  },
  itemtype: {
    type: String,
    default: "tv-series",
  },
  views: {
    type: Number,
    default: 0,
  },
  industry: {
    type: String,
    required: true,
    default: "hollywood",
  },
  likes: {
    type: Number,
    default: 0,
  },
  description: {
    type: String,
    required: true,
  },
  tags: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
    required: true,
    unique: true,
  },
});

const Webseries = mongoose.model("webseries", WebSeriesSchema);
Webseries.createIndexes();
module.exports = Webseries;
