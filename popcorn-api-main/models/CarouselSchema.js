const mongoose = require("mongoose");
const { Schema } = mongoose;

const CarouselSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  genre1: {
    type: String,
    required: true,
  },
  genre2: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  year: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
    required: true,
    unique: true,
  },
});

const Carousel = mongoose.model("carousel", CarouselSchema);
Carousel.createIndexes();
module.exports = Carousel;
