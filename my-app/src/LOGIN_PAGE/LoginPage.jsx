import React, { useState } from "react";
import * as userActions from "../actions/UserActions";

export default function LoginPage() {
  const [user, setUser] = useState({
    userinfo: { username: "", password: "" },
  });

  /**Check the data login verification returned and determin if wrong
   * message is needed.
   */
  function handleUser(user, event) {
    if (user.length === 1) {
      console.log(user);
      document.getElementById("wrong_data").classList.add("hidden");
      localStorage.setItem("user", JSON.stringify(user[0]));
      window.location.assign("/mainpage");
    } else {
      console.log("Wrong password");
      document.getElementById("wrong_data").classList.remove("hidden");
    }
  }

  /**Handles typing of user and updating input fields value accordinglly */
  function handleChange(event) {
    const { name, value } = event.target;
    setUser({ ...user, userinfo: { ...user.userinfo, [name]: value } });
  }

  /**When user asks to log in communicate with the db and ask if user
   * with said username and password exists
   */
  function handleSubmit(event) {
    event.preventDefault();
    console.log(user);
    userActions
      .verifyUser(user.userinfo)
      .then((res) => handleUser(res, event))
      .catch((error) => {
        alert("Login failed: " + error);
      });
  }

  return (
    <div class="basic_page flex justify-center items-center">
      <div class="w-full max-w-xs">
        <form onSubmit={handleSubmit} class="form_theme">
          <div class="mb-4">
            <label class="input_field_titles" for="username">
              Username
            </label>
            <input
              name="username"
              label="username"
              class="input_fields"
              type="text"
              onChange={handleChange}
            />
          </div>
          <div class="mb-6">
            <label class="input_field_titles" for="password">
              Password
            </label>
            <input
              name="password"
              label="password"
              class="  input_fields"
              type="password"
              onChange={handleChange}
            />
          </div>
          <div id="wrong_data" class="text-red-500 text-xs hidden mb-3">
            Wrong username or password
          </div>
          <div class="flex items-center justify-between">
            <button class="buttons" type="submit" value="Login">
              Sign In
            </button>
            <a href="/register" class="buttons" type="button">
              Register
            </a>
          </div>
        </form>
      </div>
    </div>
  );
}
