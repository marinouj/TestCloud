import React from "react";
import RegisterForm from "./RegisterForm";
import * as userActions from "../actions/UserActions";

class ManageRegister extends React.Component {
  state = {
    user: {
      id: "",
      name: "",
      surname: "",
      username: "",
      password: "",
      email: "",
      role: "",
    },
  };

  updateInfo = (event) => {
    const { name, value } = event.target;
    const user = { ...this.state.user, [name]: value };
    this.setState({ user });
  };

  handleSubmit = async (event) => {
    event.preventDefault();
    userActions
      .createUser(this.state.user)
      .then((res) => {
        console.log(res);
        window.location.assign("../");
      })
      .catch((error) => {
        alert("Register failed: " + error);
      });
  };

  render() {
    return (
      <RegisterForm
        user={this.state.user}
        onSubmit={this.handleSubmit}
        onChange={this.updateInfo}
      />
    );
  }
}

export default ManageRegister;
