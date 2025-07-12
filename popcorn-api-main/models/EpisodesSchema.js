const mongoose = require("mongoose");
const { Schema } = mongoose;

const EpisodesSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  seriesname: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  video: {
    type: String,
    required: true,
  },
  season: {
    type: Number,
    required: true,
  },
  episode: {
    type: Number,
    required: true,
  },
  slug: {
    type: String,
    required: true,
    unique: true,
  },
});

const Episode = mongoose.model("episodes", EpisodesSchema);
Episode.createIndexes();
module.exports = Episode;
