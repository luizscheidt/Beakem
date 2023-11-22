const express = require("express");
const path = require("path");
const app = express();
const mongoose = require("mongoose");
const methodOverride = require("method-override");

const Album = require("./models/album");

mongoose
  .connect("mongodb://127.0.0.1:27017/albumList")
  .then(() => {
    console.log("Mongo connection open");
  })
  .catch((err) => {
    console.log("Something went wrong when connecting to mongo");
    console.log(err);
  });

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true }));
app.use(express.json({ extended: true }));
app.use(methodOverride("_method"));

app.get("/albums", async (req, res) => {
  const { artist } = req.query;
  if (artist) {
    const albums = await Album.find({ artist });
    res.render("albums/index", { albums, artist });
  } else {
    const albums = await Album.find({});
    res.render("albums/index", { albums, artist: "All" });
  }
});

app.get("/albums/new", (req, res) => {
  res.render("albums/new");
});

app.post("/albums", async (req, res) => {
  console.log(req.body);
  const newAlbum = new Album(req.body);
  await newAlbum.save();
  res.redirect(`albums/${newAlbum._id}`);
});

app.get("/albums/:id", async (req, res) => {
  const { id } = req.params;
  const album = await Album.findById(id);
  res.render("albums/details", { album });
});

app.get("/albums/:id/edit", async (req, res) => {
  const { id } = req.params;
  const album = await Album.findById(id);
  res.render("albums/edit", { album });
});

app.patch("/albums/:id", async (req, res) => {
  const { id } = req.params;
  const album = await Album.findByIdAndUpdate(id, req.body, {
    runValidators: true,
  });
  res.redirect(`/albums/${album._id}`);
});

app.delete("/albums/:id", async (req, res) => {
  const { id } = req.params;
  const deletedAlbum = await Album.findByIdAndDelete(id);
  res.redirect("/albums");
});

app.listen("1200", (req, res) => {
  console.log("Listening on port 1200");
});
