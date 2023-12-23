const express = require("express");
const path = require("path");
const app = express();
const mongoose = require("mongoose");
const ejsMate = require("ejs-mate");
const Joi = require("joi");
const {albumSchema} = require("./validateSchemas");
const wrapAsync = require("./utils/wrapAsync");
const ExpressError = require("./utils/ExpressError");
const methodOverride = require("method-override");
const Album = require("./models/album");
const Artist = require("./models/artist");

mongoose.connect("mongodb://127.0.0.1:27017/albumList"),
  {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  };

const db = mongoose.connection;
db.on("error", console.error.bind(console, "Error connecting to database"));
db.once("open", () => {
  console.log("Database connected");
});

app.engine("ejs", ejsMate);
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.urlencoded({extended: true}));
app.use(express.json({extended: true}));
app.use(methodOverride("_method"));

const validateAlbum = (req, res, next) => {
  const {error} = albumSchema.validate(req.body);
  if (error) {
    const message = error.details.map((element) => element.message).join(",");
    throw new ExpressError(message, 400);
  } else {
    next();
  }
};

app.get(
  "/albums",
  wrapAsync(async (req, res, next) => {
    const {artist} = req.query;
    if (artist) {
      const albums = await Album.find({artist});
      res.render("albums/index", {albums, artist});
    } else {
      const albums = await Album.find({});
      res.render("albums/index", {albums, artist: "All"});
    }
  })
);

app.get(
  "/artists",
  wrapAsync(async (req, res) => {
    const albums = await Album.find({});
    const artists = [];
    for (a of albums) {
      artists.push(a.artist);
    }

    res.render("artists/index", {artists});
  })
);

const randomAlbum = async (albums) => {
  x = Math.floor(Math.random() * albums.length);
  return albums[x];
};

app.get(
  "/random",
  wrapAsync(async (req, res) => {
    const albums = await Album.find({});
    const album = await randomAlbum(albums);
    album.save();
    res.render("random", {album, randomAlbum});
  })
);

app.get("/albums/new", (req, res) => {
  res.render("albums/new");
});

app.post(
  "/albums",
  validateAlbum,
  wrapAsync(async (req, res, next) => {
    console.log(req.body);
    const newAlbum = new Album(req.body.album);
    await newAlbum.save();
    res.redirect(`albums/${newAlbum._id}`);
  })
);

app.get(
  "/albums/:id",
  wrapAsync(async (req, res, next) => {
    const {id} = req.params;
    const album = await Album.findById(id);
    res.render("albums/details", {album});
  })
);

app.get(
  "/albums/:id/edit",
  wrapAsync(async (req, res, next) => {
    const {id} = req.params;
    const album = await Album.findById(id);
    res.render("albums/edit", {album});
  })
);

app.patch(
  "/albums/:id",
  validateAlbum,
  wrapAsync(async (req, res, next) => {
    const {id} = req.params;
    const album = await Album.findByIdAndUpdate(id, req.body, {
      ...req.body.campground,
    });
    res.redirect(`/albums/${album._id}`);
  })
);

app.delete(
  "/albums/:id",
  wrapAsync(async (req, res, next) => {
    const {id} = req.params;
    const deletedAlbum = await Album.findByIdAndDelete(id);
    res.redirect("/albums");
  })
);

app.all("*", (req, res, next) => {
  next(new ExpressError("Page Not Found", 404));
});

app.use((err, req, res, next) => {
  const {statusCode = 500} = err;
  if (!err.message) err.message = "Something went wrong";
  res.status(statusCode).render("error", {err});
});

app.listen("1200", (req, res) => {
  console.log("Listening on port 1200");
});
