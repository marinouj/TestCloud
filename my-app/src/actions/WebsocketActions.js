// Initialize the variable to be used for the WebSocket. It gets declared here because it
// needs to be global rather than local to allow any existing connection to be closed if
// the user logs in again.
var ws;
var getUser = false;
var user = {
  _id: "",
  username: "",
  role: "",
};
// Take the entered username and password and attempt to authenticate them. If the
// response indicates an error, provide the error message.
export const getJwtAuth = async (username, password) => {
  const res = await fetch(
    "/auth?username=" + username + "&password=" + password
  )
    .then((response) => response.text())
    .then((response) => {
      if (response.includes("Error")) {
        console.log("Error");
      } else {
        //errorMessageSpan.innerHTML = "";
        console.log("User Found");
        openWsConnection(response);
        return "Success";
      }
    })
    .catch((err) => console.log(err));
  return res;
};

// Send the message entered by the user. First, however, ensure that the user is logged
// in and that the message field is not empty.
export const getUserData = () => {
  if (ws) {
    localStorage.setItem("user", JSON.stringify(user));
    //getUser = true;
    //ws.send("GetUserData");
  } else {
    getUser = false;
    console.log("Error: You must log in to send a message.");
    localStorage.setItem("user", JSON.stringify(null));
  }
};

// Send the message entered by the user. First, however, ensure that the user is logged
// in and that the message field is not empty.
export const sendWsMessage = (message) => {
  getUser = false;
  if (ws) {
    if (message != "") {
      ws.send(message);
    } else {
      console.log("Error: Message content cannot be empty.");
    }
  } else {
    console.log("Error: You must log in to send a message.");
    localStorage.setItem("user", JSON.stringify(null));
  }
};

// Open the WebSocket connection using the JWT.
export const openWsConnection = (jwtAuth) => {
  if (ws) {
    console.log("Closing");
    ws.close();
  }

  var host = window.document.location.host.replace(/:.*/, "");
  ws = new WebSocket("ws://" + host + ":8080/sentMessage?token=" + jwtAuth);

  ws.onopen = (event) => {
    console.log("WebSocket connection established.");
    ws.send("GetUserData");
    getUser = true;
  };

  ws.onmessage = (event) => {
    console.log("WebSocket message received");

    if (event.data.includes("Error")) {
      //errorMessageSpan.innerHTML = event.data;
      console.log("Error");
    } else {
      if (getUser) {
        [user._id, user.username, user.role] = event.data.split(",");
        localStorage.setItem("user", JSON.stringify(user));
      }
      console.log("Sucess: " + event.data);
    }
  };

  ws.onerror = (event) => {
    console.log("WebSocket error received: ", event);
  };

  ws.onclose = (event) => {
    console.log("WebSocket connection closed.");
    localStorage.setItem("user", JSON.stringify(null));
  };
};
