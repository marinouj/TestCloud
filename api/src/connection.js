const mongoose = require("mongoose");

const User = require("./User.model");

const connection = "mongodb://mongo:27017/test";

const connectDb = () => {
  const connect = mongoose.connect(connection);
  console.log("connecting");
  return connect;
};

module.exports = connectDb;
