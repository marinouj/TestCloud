const jwt = require("jsonwebtoken"),
  url = require("url"),
  User = require("./src/User.model"),
  jwtSecret = "secret";
var userId;
var userRole;
var wsClients = [];

const fetchUserToken = async (name, password) => {
  try {
    const u = await User.find({ username: name, password: password });
    userId = u[0]._id;
    userRole = u[0].role;
    if (u[0]) {
      const j = jwt.sign(
        {
          sub: u._id,
          username: name,
        },
        jwtSecret,
        { expiresIn: 900 } // Expire the token after 15 minutes.
      );
      return j;
    }
    return "User not found";
  } catch {
    return "Error: No matching user credentials found.";
  }
};

const sentMessage = (ws, req) => {
  var token = url.parse(req.url, true).query.token;

  var wsUsername = "";
  jwt.verify(token, jwtSecret, (err, decoded) => {
    if (err) {
      ws.close();
    } else {
      wsClients[token] = ws;
      wsUsername = decoded.username;
    }
  });

  ws.on("message", (data) => {
    console.log("Message: " + data);
    if (data === "GetUserData") {
      for (const [token, client] of Object.entries(wsClients)) {
        jwt.verify(token, jwtSecret, (err, decoded) => {
          if (err) {
            console.log("Invalid token");
            client.send(
              "Error: Your token is no longer valid. Please reauthenticate."
            );
            client.close();
          } else {
            client.send(userId + "," + wsUsername + "," + userRole);
          }
        });
      }
      return;
    }
    for (const [token, client] of Object.entries(wsClients)) {
      jwt.verify(token, jwtSecret, (err, decoded) => {
        if (err) {
          console.log("Invalid token");
          client.send(
            "Error: Your token is no longer valid. Please reauthenticate."
          );
          client.close();
        } else {
          client.send(wsUsername + ": " + data);
        }
      });
    }
  });
};

module.exports = { fetchUserToken, sentMessage };
