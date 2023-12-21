const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Album = require("./album");

const artistSchema = new Schema({
  name: String,
  genre: String,
  albums: [
    {
      type: Schema.Types.ObjectId,
      ref: "Album",
    },
  ],
});

const Artist = mongoose.model("Artist", artistSchema);

module.exports = Artist;
