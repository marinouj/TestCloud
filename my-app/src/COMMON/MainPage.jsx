import React, { useState, useEffect } from "react";
import * as actions from "../actions/UserActions";

/**
 *  This file contains the main page (refeared as index.php)
 */
const MainPage = () => {
  const [notifications, setNotifications] = useState("");

  useEffect(() => {
    console.log(JSON.parse(localStorage.getItem("user")));
    if (JSON.parse(localStorage.getItem("user"))) {
      actions
        .getUser(JSON.parse(localStorage.getItem("user"))._id)
        .then((res) => {
          setNotifications(res[0].notifications);
        })
        .catch((error) => {
          alert("Loading favorites of current user failed: " + error);
        });
    }
  });

  return (
    <div class="bg-gray flex justify-center h-9/10 w-full text-white">
      <div class="mt-20 w-80 h-132 overflow-y-auto">
        <div class="text-4xl text-center">Notification Center</div>
        <div class="text-center pt-4">
          {notifications.split(",").map((str) => (
            <p class="py-2">
              {str}
              <br />
              <br />
              <hr class="bg-purple text-purple" />
            </p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MainPage;
