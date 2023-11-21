const express = require("express");
const path = require("path");
const app = express();
const mongoose = require("mongoose");
const methodOverride = require("method-override");

const Album = require("./models/album");

mongoose
  .connect("mongodb://127.0.0.1:27017/farmStand")
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
app.use(methodOverride("_method"));

// async function order(a, b) {
//   const albums = await Album.find({});
//   const orderAlbums = [];
//   if (a.rating < b.rating) {
//     orderAlbums.append(b.rating);
//   } else {
//     orderAlbums.append(b.rating);
//   }
//   return orderAlbums;
// }

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
  const newAlbum = new Album(req.body);
  await newAlbum.save();
  res.redirect(`albums/${newAlbum._id}`);
});

app.get("/albums/:id", async (req, res) => {
  const { id } = req.params;
  const album = await Album.findById(id);
  res.render("albums/details", { album });
});

app.listen("1200", (req, res) => {
  console.log("Listening on port 1200");
});
