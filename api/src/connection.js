const mongoose = require("mongoose");

const User = require("./User.model");

const connection = "mongodb://mongo:27017/test";

const connectDb = async () => {
  const connect = mongoose.connect(connection);
  const users = await User.find();
  if (users.length === 0) {
    console.log("init admin");
    const u = new User({
      username: "admin",
      password: "admin",
      firstname: "",
      lastname: "",
      email: "",
      role: "Admin",
      confirmed: true,
      notifications: "",
    });
    try {
      await u.save().then(() => console.log("Admin initialised"));
    } catch (error) {
      console.log(error);
    }
  }
  return connect;
};

module.exports = connectDb;
