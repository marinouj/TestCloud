const mongoose = require("mongoose");

const User = require("./User.model");

const connection = "mongodb://mongo:27017/test";

const connectDb = async () => {
  const connect = mongoose.connect(connection);
  const users = await User.find();
  if (users.length === 0) {
    console.log("init admin");
  }
  return connect;
};

module.exports = connectDb;
