const Product = require("./models/album");
const mongoose = require("mongoose");

mongoose
  .connect("mongodb://127.0.0.1:27017/albumList")
  .then(() => {
    console.log("Mongo connection open");
  })
  .catch((err) => {
    console.log("Something went wrong when connecting to mongo");
    console.log(err);
  });

const seedAlbums = [
  {
    name: "The Dark Side of the Moon",
    rating: 10,
    artist: "Pink Floyd",
  },
  {
    name: "Rumours",
    rating: 10,
    artist: "Fleetwood Mac",
  },
  {
    name: "The Marshall Mathers LP",
    rating: 10,
    artist: "Eminem",
  },
  {
    name: "My Beautiful Dark Twisted Fantasy",
    rating: 10,
    artist: "Kanye West",
  },
  {
    name: "Revolver",
    rating: 10,
    artist: "The Beatles",
  },
  {
    name: "Wish You Were Here",
    rating: 9.8,
    artist: "Pink Floyd",
  },
  {
    name: "Animals",
    rating: 9.3,
    artist: "Pink Floyd",
  },
  {
    name: "Take Care",
    rating: 9.1,
    artist: "Drake",
  },
  {
    name: "4 Your Eyez Only",
    rating: 8.6,
    artist: "J Cole",
  },
  {
    name: "Ctrl",
    rating: 7.8,
    artist: "SZA",
  },
];

Product.insertMany(seedAlbums)
  .then((res) => console.log(res))
  .catch((err) => console.log(err));
