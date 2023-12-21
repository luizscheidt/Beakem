const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const albumSchema = new Schema({
  name: String,
  rating: Number,
  artist: String,
});

const Album = mongoose.model("Album", albumSchema);

module.exports = Album;
