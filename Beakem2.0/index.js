const express = require("express");
const app = express();
const path = require("path");
const { v4: uuidv4 } = require("uuid");
const methodOverride = require("method-override");

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

const albums = [
  {
    id: uuidv4(),
    album: "Rumours",
    rate: 10,
  },
  {
    id: uuidv4(),
    album: "The Marhsall Mathers LP",
    rate: 10,
  },
  {
    id: uuidv4(),
    album: "Pet Sounds",
    rate: 9.7,
  },
  {
    id: uuidv4(),
    album: "The Blueprint",
    rate: 9.6,
  },
  {
    id: uuidv4(),
    album: "DAMN",
    rate: 9.4,
  },
  {
    id: uuidv4(),
    album: "A Day At The Races",
    rate: 9.2,
  },
];

app.get("/albums", (req, res) => {
  res.render("albums/index", { albums });
});

app.get("/albums/new", (req, res) => {
  res.render("albums/new");
});

app.post("/albums", (req, res) => {
  const { album, rate } = req.body;
  albums.push({ album, rate, id: uuidv4() });
  res.redirect("/albums");
});

app.get("/albums/:id", (req, res) => {
  const { id } = req.params;
  const album = albums.find((a) => a.id === id);
  res.render("albums/show", { album });
});

app.get("/albums/:id/edit", (req, res) => {
  const { id } = req.params;
  const album = albums.find((a) => a.id === id);
  res.render("albums/edit", { album });
});

app.patch("/albums/:id", (req, res) => {
  const { id } = req.params;
  const newName = req.body.album;
  const oldName = albums.find((a) => a.id === id);
  oldName.album = newName;
  res.redirect("/albums");
});

app.listen(2000, () => {
  console.log("listening on port 2000");
});
