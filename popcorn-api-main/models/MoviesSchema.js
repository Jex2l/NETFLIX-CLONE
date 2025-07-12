const mongoose = require("mongoose");
const { Schema } = mongoose;

const MovieSchema = new Schema({
  name: {
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
  genre: {
    type: String,
    required: true,
  },
  year: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  tags: {
    type: String,
    required: true,
  },
  itemtype: {
    type: String,
    default: "movies",
  },
  industry: {
    type: String,
  },
  likes: {
    type: Number,
    default: 0,
  },
  views: {
    type: Number,
    default: 0,
  },
  slug: {
    type: String,
    required: true,
    unique: true,
  },
});

const Movies = mongoose.model("movies", MovieSchema);
Movies.createIndexes();
module.exports = Movies;
