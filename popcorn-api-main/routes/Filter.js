const express = require("express");
const getuser = require("../middleware/getuser");
const FavoriteItem = require("../models/FavoriteSchema");
const LikedItems = require("../models/LikedItems");
const Movies = require("../models/MoviesSchema");
const User = require("../models/UserSchema");
const Webseries = require("../models/WebSeriesSchema");
const app = express();
const router = express.Router();

router.post("/getitems/:genre", async (req, res) => {
  try {
    if (req.params.genre === "movies") {
      Movies.find({}, {}, (err, movies) => {
        if (!err) {
          res.send(movies);
        } else {
          res.send(err);
        }
      }).sort({ _id: -1 });
    }
    if (req.params.genre === "tv-series") {
      Webseries.find({}, {}, (err, movies) => {
        if (!err) {
          res.send(movies);
        } else {
          res.send(err);
        }
      }).sort({ _id: -1 });
    }
    if (
      req.params.genre !== "movies" &&
      req.params.genre !== "tv-series" &&
      req.params.genre !== "hollywood" &&
      req.params.genre !== "bollywood" &&
      req.params.genre !== "most-liked" &&
      req.params.genre !== "most-viewed"
    ) {
      const movie = await Movies.find({
        genre: { $regex: req.params.genre, $options: "i" },
      });
      const webseries = await Webseries.find({
        genre: { $regex: req.params.genre, $options: "i" },
      });
      let items = [];
      movie.map((item) => items.push(item));
      webseries.map((item) => items.push(item));
      res.send(items);
    }
    if (req.params.genre === "most-viewed") {
      const movie = await Movies.find({});
      const webseries = await Webseries.find({});
      let items = [];
      movie.map((item) => items.push(item));
      webseries.map((item) => items.push(item));
      function compare(a, b) {
        if (a.views < b.views) {
          return 1;
        }
        if (a.views > b.views) {
          return -1;
        }
        return 0;
      }
      items.sort(compare);
      res.send(items);
    }
    if (req.params.genre === "most-liked") {
      const movie = await Movies.find({});
      const webseries = await Webseries.find({});
      let items = [];
      movie.map((item) => items.push(item));
      webseries.map((item) => items.push(item));
      // sort by likes
      function compare(a, b) {
        if (a.likes < b.likes) {
          return 1;
        }
        if (a.likes > b.likes) {
          return -1;
        }
        return 0;
      }
      items.sort(compare);
      res.send(items);
    }
  } catch (error) {
    res.send(error);
  }
});
router.post("/search/:query", async (req, res) => {
  try {
    if (!req.params.query) {
      return res.json({ msg: `Search value should not be empty` });
    }
    let result = await Movies.findOne({
      tags: { $regex: req.params.query, $options: "i" },
    });
    if (!result) {
      result = await Webseries.findOne({
        tags: { $regex: req.params.query, $options: "i" },
      });
    }
    if (!result) {
      return res.json({
        msg: `Search result for "${req.params.query}" not found`,
      });
    }
    res.send(result);
  } catch (error) {
    res.send(error);
  }
});
router.post("/getlikes/:slug", async (req, res) => {
  try {
    if (!req.params.slug) {
      return res.status(404).json({ msg: "Slug not found" });
    }
    const movie = await Movies.findOne({ slug: req.params.slug });
    if (movie) {
      const movie_likes = movie.likes;
      return res.json({ likes: movie_likes });
    } else {
      const webseries = await Webseries.findOne({ slug: req.params.slug });
      if (!webseries) {
        return res.status(404).send("Movie not found");
      }
      const webseries_likes = webseries.likes;
      return res.json({ likes: webseries_likes });
    }
  } catch (error) {
    res.send(error);
  }
});

router.post("/checklike/:id", getuser, async (req, res) => {
  try {
    if (!req.params.id) {
      return res.status(404).json({ msg: "Id not found" });
    }
    const user_id = req.user.id;
    const user = await User.findById(user_id);
    const likedItem = await LikedItems.findOne({
      liked_by: user._id,
      item_id: req.params.id,
    });
    if (likedItem) {
      return res.json({ liked: true });
    } else {
      return res.json({ liked: false });
    }
  } catch (error) {
    res.send(error);
  }
});

router.post("/userliked", getuser, async (req, res) => {
  try {
    const user_id = req.user.id;
    const user = await User.findById(user_id);
    const likedMovies = await LikedItems.find({
      liked_by: user._id,
    });
    const movie = await Movies.find({
      _id: likedMovies.map((item) => item.item_id),
    });
    const webseries = await Webseries.find({
      _id: likedMovies.map((item) => item.item_id),
    });
    let items = [];
    movie.map((item) => items.push(item));
    webseries.map((item) => items.push(item));
    res.json(items);
  } catch (error) {
    res.send(error);
  }
});
router.post("/addlike/:id", getuser, async (req, res) => {
  try {
    const user_id = req.user.id;
    const user = await User.findById(user_id);
    if (!req.params.id) {
      return res.status(400).send("Please enter movie id");
    }
    const movie = await Movies.findById(req.params.id);
    console.log(true);
    if (movie) {
      const prevItem = await LikedItems.findOne({
        item_id: movie._id,
        liked_by: user._id,
      });
      if (prevItem) {
        await LikedItems.deleteOne({ item_id: movie._id, liked_by: user._id });
        movie instanceof Movies;
        movie.likes = movie.likes - 1;
        movie.save();
        return res.json({ msg: "Like Removed" });
      }
      movie instanceof Movies;
      movie.likes = movie.likes + 1;
      movie.save();
      const newItem = await LikedItems.create({
        item_id: movie._id,
        liked_by: user._id,
      });
      newItem.save();
      res.json({ liked: true });
    } else {
      console.log(true);
      const webseries = await Webseries.findById(req.params.id);
      if (!webseries) {
        return res.status(404).send("Movie not found");
      }
      const prevItem = await LikedItems.findOne({
        item_id: webseries._id,
        liked_by: user._id,
      });
      if (prevItem) {
        await LikedItems.deleteOne({
          item_id: webseries._id,
          liked_by: user._id,
        });
        webseries instanceof Webseries;
        webseries.likes = webseries.likes - 1;
        webseries.save();
        return res.json({ msg: "Like Removed" });
      }
      webseries instanceof Webseries;
      webseries.likes = webseries.likes + 1;
      webseries.save();
      const newItem = await LikedItems.create({
        item_id: webseries._id,
        liked_by: user._id,
      });
      newItem.save();
      res.json({ liked: true });
    }
  } catch (error) {
    res.send(error);
  }
});
router.post("/addfavorite/:id", getuser, async (req, res) => {
  try {
    const user_id = req.user.id;
    const user = await User.findById(user_id);
    if (!req.params.id) {
      return res.status(400).send("Please enter movie id");
    }
    const movie = await Movies.findById(req.params.id);
    console.log(true);
    if (movie) {
      const prevItem = await FavoriteItem.findOne({
        item_id: movie._id,
        favorite_of: user._id,
      });
      if (prevItem) {
        await FavoriteItem.deleteOne({
          item_id: movie._id,
          favorite_of: user._id,
        });
        movie instanceof Movies;
        movie.favorites = movie.favorites - 1;
        movie.save();
        return res.json({ msg: "Favorite Removed" });
      }
      movie instanceof Movies;
      movie.favorites = movie.favorites + 1;
      movie.save();
      const newItem = await FavoriteItem.create({
        item_id: movie._id,
        favorite_of: user._id,
      });
      newItem.save();
      res.json({ liked: true });
    } else {
      const webseries = await Webseries.findById(req.params.id);
      if (!webseries) {
        return res.status(404).send("Movie not found");
      }
      const prevItem = await FavoriteItem.findOne({
        item_id: webseries._id,
        favorite_of: user._id,
      });
      if (prevItem) {
        await FavoriteItem.deleteOne({
          item_id: webseries._id,
          favorite_of: user._id,
        });
        webseries instanceof Webseries;
        webseries.favorites = webseries.favorites - 1;
        webseries.save();
        return res.json({ msg: "Removed" });
      }
      webseries instanceof Webseries;
      webseries.favorites = webseries.favorites + 1;
      webseries.save();
      const newItem = await LikedItems.create({
        item_id: webseries._id,
        favorite_of: user._id,
      });
      newItem.save();
      res.json({ liked: true });
    }
  } catch (error) {
    res.send(error);
  }
});

router.post("/userfavorite", getuser, async (req, res) => {
  try {
    const user_id = req.user.id;
    const user = await User.findById(user_id);
    const likedMovies = await FavoriteItem.find({
      favorite_of: user._id,
    });
    const movie = await Movies.find({
      _id: likedMovies.map((item) => item.item_id),
    });
    const webseries = await Webseries.find({
      _id: likedMovies.map((item) => item.item_id),
    });
    let items = [];
    movie.map((item) => items.push(item));
    webseries.map((item) => items.push(item));
    res.json(items);
  } catch (error) {
    res.send(error);
  }
});

router.post("/checkfavorite/:id", getuser, async (req, res) => {
  try {
    if (!req.params.id) {
      return res.status(404).json({ msg: "Id not found" });
    }
    const user_id = req.user.id;
    const user = await User.findById(user_id);
    const likedItem = await FavoriteItem.findOne({
      favorite_of: user._id,
      item_id: req.params.id,
    });
    if (likedItem) {
      return res.json({ liked: true });
    } else {
      return res.json({ liked: false });
    }
  } catch (error) {
    res.send(error);
  }
});
router.post("/addview/:id", getuser, async (req, res) => {
  try {
    if (!req.params.id) {
      return res.status(404).json({ msg: "Id not found" });
    }
    const movie = await Movies.findById(req.params.id);
    if (!movie) {
      const webseries = await Webseries.findById(req.params.id);
      if (!webseries) {
        return res.status(404).send("Movie not found");
      }
      webseries instanceof Webseries;
      webseries.views = webseries.views + 1;
      webseries.save();
      return res.send("View added");
    }
    movie instanceof Movies;
    movie.views = movie.views + 1;
    movie.save();
    res.send("view added");
  } catch (error) {
    res.send(error);
  }
});

module.exports = router;
