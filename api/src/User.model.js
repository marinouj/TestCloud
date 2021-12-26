const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
  },
  password: {
    type: String,
  },
  firstname: {
    type: String,
  },
  lastname: {
    type: String,
  },
  email: {
    type: String,
  },
  role: {
    type: String,
  },
  confirmed: {
    type: Boolean,
  },
  notifications: {
    type: String,
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
