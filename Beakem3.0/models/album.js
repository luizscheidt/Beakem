const mongoose = require("mongoose");

const albumSchema = new mongoose.Schema({
  name: String,
  rating: Number,
  artist: String,
});

const Album = mongoose.model("Album", albumSchema);

module.exports = Album;
