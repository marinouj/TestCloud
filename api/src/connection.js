const mongoose = require("mongoose");

const User = require("./User.model");

const connection = "mongodb://127.0.0.1:27017/";

const connectDb = () => {
  return mongoose.connect(connection);
};

module.exports = connectDb;
