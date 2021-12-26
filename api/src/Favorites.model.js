const mongoose = require("mongoose");

const favoritesSchema = new mongoose.Schema({
  userId: {
    type: String,
  },
  concertId: {
    type: String,
  },
});

const Favorites = mongoose.model("Favorites", favoritesSchema);

module.exports = Favorites;
