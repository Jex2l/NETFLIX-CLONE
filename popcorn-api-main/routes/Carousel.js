const express = require("express");
const getuser = require("../middleware/getuser");
const Carousel = require("../models/CarouselSchema");
const Movies = require("../models/MoviesSchema");
const User = require("../models/UserSchema");
const Webseries = require("../models/WebSeriesSchema");

const app = express();
const router = express.Router();

// POST method route
router.post("/addmovie/:id", getuser, async (req, res) => {
  user_id = req.user.id;
  let user = await User.findById(user_id).select("-password");
  if (!user.admin) {
    return res.status(401).json({ msg: "You are not admin" });
  }
  try {
    const movie = await Movies.findOne({ _id: req.params.id });
    if (!movie) {
      return res.status(404).json({ msg: "Movie not found" });
    }
    const genreArr = movie.genre.split(", ");
    let genre1 = genreArr[0];
    let genre2 = genreArr[1];

    const item = await Carousel.findOne({ slug: movie.slug });
    if (item) {
      return res.status(400).json({ msg: "Movie already added in carousel" });
    }
    const newMovie = new Carousel({
      name: movie.name,
      image: movie.image,
      genre1: genre1,
      genre2: genre2,
      year: movie.year,
      type: "movies",
      slug: movie.slug,
    });
    newMovie.save();
    res.json({ msg: "Carousel Updated" });
  } catch (error) {
    res.status(400).send(error);
  }
});

router.post("/addwebseries/:id", getuser, async (req, res) => {
  user_id = req.user.id;
  let user = await User.findById(user_id).select("-password");
  if (!user.admin) {
    return res.status(401).json({ msg: "You are not admin" });
  }
  try {
    const movie = await Webseries.findOne({ _id: req.params.id });
    if (!movie) {
      return res.status(404).json({ msg: "webseries not found" });
    }
    const genreArr = movie.genre.split(", ");
    let genre1 = genreArr[0];
    let genre2 = genreArr[1];
    const item = await Carousel.findOne({ slug: movie.slug });
    if (item) {
      return res.status(401).json({ msg: "Slug already in use" });
    }
    const newMovie = new Carousel({
      name: movie.name,
      image: movie.image,
      genre1: genre1,
      genre2: genre2,
      year: movie.year,
      type: "tv-series",
      slug: movie.slug,
    });
    newMovie.save();
    res.json({ msg: "Carousel Updated" });
  } catch (error) {
    res.status(400).send(error);
  }
});

router.post("/getitems", async (req, res) => {
  try {
    Carousel.find({}, {}, (err, movies) => {
      if (!err) {
        res.send(movies);
      } else {
        res.send(err);
      }
    }).sort({ _id: -1 });
  } catch (error) {
    res.send(error);
  }
});

router.delete("/deleteitem/:id", getuser, async (req, res) => {
  user_id = req.user.id;
  let user = await User.findById(user_id).select("-password");
  if (!user.admin) {
    return res.status(401).json({ msg: "You are not admin" });
  }
  try {
    const item = await Carousel.findById(req.params.id);
    if (!item) {
      return res.status(404).json({ msg: "Item not found" });
    }
    await Carousel.deleteOne({ _id: req.params.id });
    return res.json({ msg: "Item deleted" });
  } catch (error) {
    res.status(400).send(error);
  }
});

module.exports = router;
