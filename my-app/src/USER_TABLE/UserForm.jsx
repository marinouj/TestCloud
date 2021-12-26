import React from "react";
import PropTypes from "prop-types";
import * as userActions from "../actions/UserActions";

const UserForm = (props) => {
  /**Submits the updated user data and closes the form if no
   * errors come up
   */
  const onSubmit = async (event) => {
    event.preventDefault();
    userActions
      .updateUser(props.user)
      .then((res) => {
        console.log(res);
        document.querySelector(".user_form").classList.add("hidden");
      })
      .catch((error) => {
        alert("Register failed: " + error);
      });
  };

  /**Cancel button closes the form */
  const onCancel = (event) => {
    event.preventDefault();
    document.querySelector(".user_form").classList.add("hidden");
  };

  return (
    <div class="w-full h-9/10 flex justify-center z-10 backdrop-filter backdrop-blur-sm">
      <form class="w-full h-96 mt-16 max-w-lg form_theme" onSubmit={onSubmit}>
        <div class="flex flex-wrap -mx-3 mb-6">
          <div class="w-full md:w-1/2 px-3 mb-3">
            <label class="input_field_titles" for="grid-first-name">
              First Name
            </label>
            <input
              onChange={props.onChange}
              name="firstname"
              value={props.user.firstname}
              class="input_fields"
              type="text"
            />
          </div>
          <div class="w-full md:w-1/2 px-3 mb-3">
            <label class="input_field_titles" for="grid-last-name">
              Last Name
            </label>
            <input
              onChange={props.onChange}
              name="lastname"
              value={props.user.lastname}
              class="input_fields"
              type="text"
            />
          </div>
        </div>
        <div class="flex flex-wrap -mx-3 mb-6">
          <div class="w-full px-3">
            <label class="input_field_titles" for="grid-username">
              Username
            </label>
            <input
              onChange={props.onChange}
              name="username"
              value={props.user.username}
              class="block input_fields focus:border-gray-500"
              type="text"
            />
          </div>
        </div>
        <div class="flex flex-wrap -mx-3 mb-2">
          <div class="w-full md:w-1/2 px-3 mb-6 ">
            <label class="input_field_titles" for="grid-email">
              Email
            </label>
            <input
              onChange={props.onChange}
              name="email"
              value={props.user.email}
              class="input_fields"
              type="text"
            />
          </div>
          <div class="w-full md:w-1/2 px-3 mb-6 ">
            <label class="input_field_titles" for="grid-role">
              Role
            </label>
            <div class="relative">
              <select
                onChange={props.onChange}
                name="role"
                value={props.user.role}
                class="input_fields"
              >
                <option>Pick a role</option>
                <option>Admin</option>
                <option>Event Organizer</option>
                <option>User</option>
              </select>
              <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg
                  class="fill-current h-4 w-4"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                </svg>
              </div>
            </div>
          </div>
          <div class="flex items-center justify-between px-3 mb-6 w-full">
            <button class="buttons" onClick={onCancel}>
              Cancel
            </button>
            <button type="submit" class="buttons" onClick={onSubmit}>
              Submit
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

UserForm.propTypes = {
  user: PropTypes.object.isRequired,
  errors: PropTypes.object,
};

export default UserForm;
