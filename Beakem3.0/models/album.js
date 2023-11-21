const mongoose = require("mongoose");

const albumSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
  },
  artist: {
    type: String,
  },
});

const Album = mongoose.model("Album", albumSchema);

module.exports = Album;
