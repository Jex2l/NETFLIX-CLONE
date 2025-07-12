const express = require("express");
const getuser = require("../middleware/getuser");
const Episode = require("../models/EpisodesSchema");
const User = require("../models/UserSchema");
const Webseries = require("../models/WebSeriesSchema");
const app = express();
const router = express.Router();

router.post("/uploadwebseries", getuser, async (req, res) => {
  user_id = req.user.id;
  let user = await User.findById(user_id).select("-password");
  if (!user.admin) {
    return res.status(401).json({ msg: "You are not admin" });
  }
  try {
    if (!req.body.name) {
      return res.status(400).json({ msg: "Name should not be empty" });
    }
    if (!req.body.image) {
      return res.status(400).json({ msg: "Image path should not be empty" });
    }
    if (!req.body.seasons) {
      return res.status(400).json({ msg: "Seasons should not be empty" });
    }
    if (!req.body.genre) {
      return res.status(400).json({ msg: "Genre should not be empty" });
    }
    if (!req.body.year) {
      return res.status(400).json({ msg: "Year should not be empty" });
    }
    if (!req.body.description) {
      return res.status(400).json({ msg: "Description should not be empty" });
    }
    if (!req.body.tags) {
      return res.status(400).json({ msg: "tags should not be empty" });
    }
    if (!req.body.slug) {
      return res.status(400).json({ msg: "slug should not be empty" });
    }
    const web = await Webseries.findOne({ slug: req.body.slug });
    if (web) {
      return res.status(400).json({ msg: "slug is used" });
    }
    const movie = new Webseries({
      name: req.body.name,
      image: req.body.image,
      seasons: req.body.seasons,
      genre: req.body.genre,
      year: req.body.year,
      description: req.body.description,
      tags: req.body.tags,
      slug: req.body.slug,
    });
    movie.save();
    res.json({ msg: "Web Series Uploaded" });
  } catch (error) {
    res.status(400).send(error);
  }
});

router.post("/uploadepisodes", getuser, async (req, res) => {
  user_id = req.user.id;
  let user = await User.findById(user_id).select("-password");
  if (!user.admin) {
    return res.status(401).json({ msg: "You are not admin" });
  }
  try {
    if (!req.body.name) {
      return res.status(400).json({ msg: "Name should not be empty" });
    }
    if (!req.body.seriesname) {
      return res.status(400).json({ msg: "Series Name should not be empty" });
    }
    if (!req.body.image) {
      return res.status(400).json({ msg: "Image path should not be empty" });
    }
    if (!req.body.video) {
      return res.status(400).json({ msg: "Video should not be empty" });
    }
    if (!req.body.season) {
      return res.status(400).json({ msg: "Season should not be empty" });
    }
    if (!req.body.episode) {
      return res.status(400).json({ msg: "Episode should not be empty" });
    }
    if (!req.body.slug) {
      return res.status(400).json({ msg: "slug should not be empty" });
    }
    const slug = req.body.slug;
    const web = await Episode.findOne({ slug: slug });
    if (web) {
      return res.status(400).json({ msg: "slug is used" });
    }

    const movie = new Episode({
      name: req.body.name,
      seriesname: req.body.seriesname,
      image: req.body.image,
      video: req.body.video,
      season: req.body.season,
      episode: req.body.episode,
      slug: req.body.slug,
    });
    movie.save();
    res.json({ msg: "Web Series Episode Uploaded" });
  } catch (error) {
    res.status(400).send(error);
  }
});

router.put("/addseason", getuser, async (req, res) => {
  user_id = req.user.id;
  let user = await User.findById(user_id).select("-password");
  if (!user.admin) {
    return res.status(401).json({ msg: "You are not admin" });
  }
  try {
    const data = req.body;
    if (!data.name) {
      return res.status(400).json({ msg: "Select Web Series" });
    }
    const series = await Webseries.findOne({ name: data.name });
    series instanceof Webseries;
    let seasons = series.seasons;
    series.seasons = seasons + 1;
    await series.save();
    res.json({ msg: "Season added" });
  } catch (error) {
    res.status(400).send(error);
  }
});

router.post("/getallwebseries", (req, res) => {
  try {
    Webseries.find({}, (err, webseries) => {
      if (!err) {
        res.send(webseries);
      } else {
        res.send(err);
      }
    }).sort({ _id: -1 });
  } catch (error) {
    res.send(err);
  }
});

router.post("/getallepisodes", (req, res) => {
  try {
    Episode.find({}, (err, episode) => {
      if (!err) {
        res.send(episode);
      } else {
        res.send(err);
      }
    });
  } catch (error) {
    res.send(err);
  }
});

router.get("/getwebseriesbyslug/:slug", async (req, res) => {
  try {
    const movie = await Webseries.findOne({ slug: req.params.slug });

    if (!movie) {
      return res.status(404).json({ msg: "Web Series not found" });
    }
    res.send(movie);
  } catch (error) {
    res.send(error);
  }
});

router.post("/getepisodes", async (req, res) => {
  try {
    const data = req.body;
    const movie = await Episode.find({
      season: data.season,
      seriesname: data.seriesname,
    });

    if (!movie) {
      return res.status(404).json({ msg: "Web Series not found" });
    }
    res.send(movie);
  } catch (error) {
    res.send(error);
  }
});
router.post("/getepisode", async (req, res) => {
  try {
    const data = req.body;
    const movie = await Episode.findOne({ slug: data.slug });
    if (!movie) {
      return res.status(404).json({ msg: "Web Series not found" });
    }
    res.send(movie);
  } catch (error) {
    res.send(error);
  }
});

module.exports = router;
