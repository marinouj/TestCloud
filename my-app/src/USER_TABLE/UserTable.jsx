import React from "react";
import UserForm from "./UserForm";
import * as userActions from "../actions/UserActions";

const deleteUser = (id) => {
  console.log(id);
  userActions
    .deleteUser(id)
    .then((newData) => console.log(newData))
    .catch((error) => {
      alert("Loading failed: " + error);
    });
};

const confirmUser = (id) => {
  console.log(id);
  userActions
    .confirmUser(id)
    .then((newData) => console.log(newData))
    .catch((error) => {
      alert("Loading failed: " + error);
    });
};

class UserTable extends React.Component {
  state = { returnedData: [], currentUser: {} };

  /**Handles typing of user and updating input fields value accordinglly */
  onChange = (event) => {
    const { name, value } = event.target;
    const tempUser = { ...this.state.currentUser, [name]: value };
    this.setState({ currentUser: tempUser });
  };

  /**Loads users when page loads */
  componentDidMount() {
    userActions
      .loadUsers()
      .then((newData) => {
        this.setState({ returnedData: newData });
      })
      .catch((error) => {
        alert("Loading failed: " + error);
      });
  }

  /**Updates users table when data change */
  componentDidUpdate() {
    userActions
      .loadUsers()
      .then((newData) => {
        this.setState({ returnedData: newData });
      })
      .catch((error) => {
        alert("Loading failed: " + error);
      });
  }
  render() {
    return (
      <div class="w-full h-9/10 bg-light_gray">
        <div class="user_form fixed z-30 hidden h-full w-full">
          <UserForm user={this.state.currentUser} onChange={this.onChange} />
        </div>
        <div class="flex justify-center w-full text-black ">
          <table class="mt-20 w-1/2 border border-purple h-auto">
            <thead>
              <tr>
                <th />
                <th class="table_outline">Id</th>
                <th class="table_outline">Name</th>
                <th class="table_outline">Surname</th>
                <th class="table_outline">Username</th>
                <th class="table_outline">Email</th>
                <th class="table_outline">Role</th>
                <th class="table_outline">Confirmed</th>
                <th class="table_outline">Delete</th>
              </tr>
            </thead>
            <tbody>
              {this.state.returnedData.map((user) => {
                return (
                  <tr class="table_outline" key={user._id}>
                    <td class="table_outline">
                      <button
                        class="buttons"
                        onClick={() => {
                          this.setState({ currentUser: user });
                          document
                            .querySelector(".user_form")
                            .classList.remove("hidden");
                        }}
                      >
                        Edit
                      </button>
                    </td>
                    <td class="table_outline">{user._id}</td>
                    <td class="table_outline">{user.firstname}</td>
                    <td class="table_outline">{user.lastname}</td>
                    <td class="table_outline">{user.username}</td>
                    <td class="table_outline">{user.email}</td>
                    <td class="table_outline">{user.role}</td>
                    <td class="table_outline">
                      {user.confirmed ? (
                        "Confirmed"
                      ) : (
                        <button
                          class="buttons"
                          onClick={() => confirmUser(user._id)}
                        >
                          confirm
                        </button>
                      )}
                    </td>
                    <td class="table_outline">
                      <button
                        class="buttons"
                        onClick={() => deleteUser(user._id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default UserTable;
