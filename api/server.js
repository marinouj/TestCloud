const Db = require("./db/dbOperation"),
  express = require("express"),
  cors = require("cors"),
  authSystem = require("./login");

const jwt = require("jsonwebtoken");
const url = require("url");

const app = express();
//var router = express.Router();
const PubSubManager = require("./pubsub");
const pubSubManager = new PubSubManager();
const enableWs = require("express-ws")(app);
const User = require("./src/User.model");
const connectDb = require("./src/connection");

const PORT = 8080;

app.use(express.json());
app.use(express.urlencoded());
app.use(cors());
/**  User related server actions */
app.post("/login", async (req, res) => {
  console.log("server log in");
  console.log(req.body.name, req.body.password);
  const result = await Db.verifyUser(req.body.name, req.body.password);
  res.json(result);
});

app.get("/users", async (req, res) => {
  const users = await User.find();
  res.json("Users");
});

app.post("/createUser", async (req, res) => {
  const result = await Db.createUser(req.body);
  res.json(result);
});

app.post("/addNotification", async (req, res) => {
  const result = await Db.addNotifications(req.body.id, req.body.not);
  res.json(result);
});

app.post("/getUser", async (req, res) => {
  const result = await Db.getUser(req.body.id);
  res.json(result);
});

app.get("/loadUsers", async (req, res) => {
  const result = await Db.getUsers();
  console.log(result);
  res.json(result);
});

app.post("/updateUser", async (req, res) => {
  const result = await Db.updateUser(req.body.user);
  res.json(result);
});

app.post("/confirmUser", async (req, res) => {
  const result = await Db.confirmUser(req.body.id);
  res.json(result);
});

app.post("/deleteUser", async (req, res) => {
  const result = await Db.deleteUser(req.body.id);
  res.json(result);
});

/**  Concert related server actions */
app.post("/loadConcerts", async (req, res) => {
  const result = await Db.getConcerts();
  res.json(result);
});

app.post("/filterConcerts", async (req, res) => {
  const result = await Db.filterConcerts(req.body.filter);
  res.json(result);
});

app.post("/loadOrgConcerts", async (req, res) => {
  const result = await Db.getOrgConcerts(req.body.uid);
  res.json(result);
});

app.post("/addConcert", async (req, res) => {
  const result = await Db.addConcert(req.body);
  res.json(result);
});

app.post("/updateConcert", async (req, res) => {
  const result = await Db.updateConcert(req.body);
  res.json(result);
});

app.post("/deleteConcert", async (req, res) => {
  const result = await Db.deleteConcert(req.body.cid);
  res.json(result);
});

/**  Favorites related server actions */
app.post("/addFavorite", async (req, res) => {
  const result = await Db.addFavorite(req.body.cid, req.body.uid);
  res.json(result);
});

app.post("/loadFavorites", async (req, res) => {
  const result = await Db.getFavorites(req.body.id);
  res.json(result);
});

app.post("/loadFavoritesByConcert", async (req, res) => {
  const result = await Db.getFavoritesByConcert(req.body.id);
  res.json(result);
});

// app.post("/loadAllFavorites", async (req, res) => {
//   const result = await Db.getAllFavorites();
//   res.json(result.recordset);
// });

app.post("/deleteFavorite", async (req, res) => {
  const result = await Db.deleteFavorite(req.body.id);
  res.json(result);
});

/** pub/sub */

app.ws("/echo1", (ws, req) => {
  console.log(`Connection request `);
  ws.on("message", (data) => {
    console.log("data: " + data);
    const json = JSON.parse(data);
    const request = json.request;
    const message = json.message;
    const channel = json.channel;
    const uid = json.uid;

    switch (request) {
      case "PUBLISH":
        pubSubManager.publish(ws, channel, message);
        break;
      case "SUBSCRIBE":
        pubSubManager.subscribe(ws, channel, uid);
        break;
    }
  });
  ws.on("close", () => {
    console.log("Stopping client connection.");
  });
});

/**Authentication */

app.get("/auth", async (req, res) => {
  const r = await authSystem.fetchUserToken(
    req.query.username,
    req.query.password
  );
  res.send(r);
});

app.ws("/sentMessage", (ws, req) => {
  authSystem.sentMessage(ws, req);
});

app.listen(PORT, function () {
  console.log(`Listening on ${PORT}`);

  connectDb().then(() => {
    console.log("MongoDb connected");
  });
});
