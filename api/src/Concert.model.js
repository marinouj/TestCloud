const mongoose = require("mongoose");

const concertSchema = new mongoose.Schema({
  title: {
    type: String,
  },
  artist: {
    type: String,
  },
  date: {
    type: Date,
  },
  category: {
    type: String,
  },
  organizerId: {
    type: String,
  },
});

const Concert = mongoose.model("Concert", concertSchema);

module.exports = Concert;
