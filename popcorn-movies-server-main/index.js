const express = require("express");
// const fileUplod = require("express-fileupload");
const cors = require("cors");
const multer = require("multer");
const app = express();
const PORT = 8000;
app.use("", express.static("videos"));
app.use("", express.static("images"));
app.use(cors());

// Code for upload image using multer
const storageImage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "images/");
  },
  filename: function (req, file, cb) {
    let fileExeArr = file.originalname.split(".");
    let extension = fileExeArr[fileExeArr.length - 1];
    cb(null, Date.now() + `.${extension}`);
  },
  fileFilter: function (req, file, cb) {
    if (file === null) {
      return cb(new Error("File cannot be empty."));
    }
  },
});
const uploadImage = multer({ storage: storageImage });

// Code for upload image using multer
const storageMovie = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "videos/");
  },
  filename: function (req, file, cb) {
    let fileExeArr = file.originalname.split(".");
    let extension = fileExeArr[fileExeArr.length - 1];
    cb(null, Date.now() + `.${extension}`);
  },
  fileFilter: function (req, file, cb) {
    if (file === null) {
      return cb(new Error("File cannot be empty."));
    }
  },
});
const uploadMovie = multer({ storage: storageMovie });

app.get("/", (req, res) => {
  res.send("POPCORN DATA SERVER IS RUNNING");
})

app.post("/uploadimage", uploadImage.single("file"), async (req, res) => {
  if (req.file === null) {
    res.status(400).json({ msg: "No file found" });
  }
  res.set('Access-Control-Allow-Origin', '*');
  res.json({
    filePath: `http://popcorndataserver.movizrate.cloud/${req.file.filename}`,
    fileName: req.file.filename,
    msg: "Image uploaded",
  });
});

app.post("/uploadmovie", uploadMovie.single("file"), function (req, res) {
  if (req.file === null) {
    res.status(400).json({ msg: "No file found" });
  }
  res.set('Access-Control-Allow-Origin', '*');
  res.json({
    filePath: `http://popcorndataserver.movizrate.cloud/${req.file.filename}`,
    fileName: req.file.filename,
    msg: "Video uploaded",
  });
});

app.listen(PORT, () => console.log(`Server listening on port: ${PORT}`));
