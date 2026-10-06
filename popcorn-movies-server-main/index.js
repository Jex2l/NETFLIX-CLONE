require("dotenv").config();
const express = require("express");
const cors = require("cors");
const multer = require("multer");
const app = express();
const PORT = process.env.PORT || 8000;
// Public base URL this server's uploaded files are reachable at - defaults to
// localhost for local dev, override with FILE_SERVER_BASE_URL in production.
const BASE_URL = process.env.FILE_SERVER_BASE_URL || `http://localhost:${PORT}`;

app.use("", express.static("videos"));
app.use("", express.static("images"));
app.use(cors());

const storageImage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "images/");
  },
  filename: function (req, file, cb) {
    let fileExeArr = file.originalname.split(".");
    let extension = fileExeArr[fileExeArr.length - 1];
    cb(null, Date.now() + `.${extension}`);
  },
});
const uploadImage = multer({ storage: storageImage });

const storageMovie = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "videos/");
  },
  filename: function (req, file, cb) {
    let fileExeArr = file.originalname.split(".");
    let extension = fileExeArr[fileExeArr.length - 1];
    cb(null, Date.now() + `.${extension}`);
  },
});
const uploadMovie = multer({ storage: storageMovie });

app.get("/", (req, res) => {
  res.send("POPCORN DATA SERVER IS RUNNING");
})

app.post("/uploadimage", uploadImage.single("file"), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ msg: "No file found" });
  }
  res.set('Access-Control-Allow-Origin', '*');
  res.json({
    filePath: `${BASE_URL}/${req.file.filename}`,
    fileName: req.file.filename,
    msg: "Image uploaded",
  });
});

app.post("/uploadmovie", uploadMovie.single("file"), function (req, res) {
  if (!req.file) {
    return res.status(400).json({ msg: "No file found" });
  }
  res.set('Access-Control-Allow-Origin', '*');
  res.json({
    filePath: `${BASE_URL}/${req.file.filename}`,
    fileName: req.file.filename,
    msg: "Video uploaded",
  });
});

app.listen(PORT, () => console.log(`Server listening on port: ${PORT}`));
