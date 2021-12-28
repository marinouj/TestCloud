/**Each function in this file is responsible to excecute the action of a
 * function in the actions files. The functions in here communicate with the
 * database and execute the querys
 */

const connectDb = require("../src/connection");
const jwt = require("jsonwebtoken");
const User = require("../src/User.model");
const Concert = require("../src/Concert.model");
const Favorites = require("../src/Favorites.model");

/** User Operations */
const getUsers = async () => {
  try {
    const users = await User.find();
    return users;
  } catch (error) {
    return error;
  }
};

const verifyUser = async (name, password) => {
  try {
    const u = await User.find({ username: name, password: password });
    console.log(u);
    return u;
  } catch (error) {
    console.log(error);
  }
};

const createUser = async (user) => {
  const u = new User({
    username: user.username,
    password: user.password,
    firstname: user.name,
    lastname: user.lastname,
    email: user.email,
    role: user.role,
    confirmed: false,
    notifications: "",
  });
  console.log(u);
  try {
    await u.save().then(() => console.log("User created"));
    return "User Created";
  } catch (error) {
    console.log(error);
  }
};

const updateUser = async (user) => {
  try {
    await User.update(
      { _id: user._id },
      {
        $set: {
          username: user.username,
          firstname: user.firstname,
          lastname: user.lastname,
          email: user.email,
          role: user.role,
        },
      }
    );
    return "Updated user!";
  } catch (error) {
    console.log(error);
  }
};

const addNotifications = async (uid, notification) => {
  try {
    await User.update(
      { _id: uid },
      {
        $set: {
          notifications: notification,
        },
      }
    );
    return "Notified user!";
  } catch (error) {
    console.log(error);
  }
};

const getUser = async (uid) => {
  try {
    const u = await User.find({ _id: uid });
    return u;
  } catch (error) {
    console.log(error);
  }
};

const confirmUser = async (id) => {
  try {
    await User.update({ _id: id }, { $set: { confirmed: true } });
    return "Confirmed user";
  } catch (error) {
    return error;
  }
};

const deleteUser = async (id) => {
  try {
    await User.deleteOne({ _id: id });
    return "Deleted successfully";
  } catch (error) {
    return error;
  }
};
/** Concert Operations */
const getConcerts = async () => {
  try {
    const concerts = await Concert.find();
    return concerts;
  } catch (error) {
    return error;
  }
};

const filterConcerts = async (filter) => {
  try {
    const concerts = await Concert.find(filter);
    return concerts;
  } catch (error) {
    return error;
  }
};

const getOrgConcerts = async (uid) => {
  try {
    const concerts = await Concert.find({ organizerId: uid });

    return concerts;
  } catch (error) {
    return error;
  }
};

const addConcert = async (concert) => {
  const c = new Concert({
    title: concert.title,
    artist: concert.artist,
    date: concert.date,
    category: concert.category,
    organizerId: concert.organizerId,
  });
  console.log(c);
  try {
    await c.save().then();
    return "Concert created";
  } catch (error) {
    console.log(error);
  }
};

const updateConcert = async (concert) => {
  try {
    await Concert.update(
      { _id: concert._id },
      {
        $set: {
          title: concert.title,
          artist: concert.artist,
          date: concert.date,
          category: concert.category,
        },
      }
    );
    return "Updated Concert";
  } catch (error) {
    console.log(error);
  }
};

const deleteConcert = async (cid) => {
  try {
    await Concert.deleteOne({ _id: cid });
    return res;
  } catch (error) {
    return error;
  }
};

/** Favorite Operations */
const getFavorites = async (id) => {
  try {
    const concerts = await Favorites.find({ userId: id });
    return concerts;
  } catch (error) {
    return error;
  }
};

const getFavoritesByConcert = async (id) => {
  try {
    const concerts = await Favorites.find({ concertId: id });
    return concerts;
  } catch (error) {
    return error;
  }
};

const addFavorite = async (cid, uid) => {
  console.log(uid, cid);
  const favorite = new Favorites({
    userId: uid,
    concertId: cid,
  });
  try {
    await favorite.save().then();
    return "Favorite created";
  } catch (error) {
    console.log(error);
  }
};

const deleteFavorite = async (id) => {
  try {
    await Favorites.deleteOne({ _id: id });
    return "Favorite deleted successfully";
  } catch (error) {
    return error;
  }
};

/** Authenticator */

module.exports = {
  getUsers,
  createUser,
  verifyUser,
  updateUser,
  addNotifications,
  getUser,
  confirmUser,
  deleteUser,
  getConcerts,
  filterConcerts,
  getOrgConcerts,
  addConcert,
  updateConcert,
  deleteConcert,
  getFavorites,
  getFavoritesByConcert,
  addFavorite,
  deleteFavorite,
};
