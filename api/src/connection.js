const mongoose = require("mongoose");

const User = require("./User.model");

var argv = require("optimist").argv;

// configuration =================

const connection = "mongodb://127.0.0.1:27017/";

const connectDb = () => {
  return mongoose.connect("mongodb://" + argv.be_ip + ":80/my_database");
};

module.exports = connectDb;
