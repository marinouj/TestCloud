/**Responsible for contacting the server
 * and returning all the users
 */
export const loadUsers = async () => {
  const newData = await fetch("http://34.64.219.179:8080/loadUsers", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  }).then((res) => res.json());
  return newData;
};

/**Responsible for contacting the server
 * and confirming the login data a user
 * provided are accepted
 */
export const verifyUser = async (user) => {
  console.log(user);
  const newData = await fetch("http://34.64.219.179:8080/login", {
    method: "POST",
    body: JSON.stringify({ name: user.username, password: user.password }),
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  }).then((res) => res.json());
  console.log(newData);
  return newData;
};

/**Responsible to get users notifications/info
 */
export const getUser = async (id) => {
  const newData = await fetch("http://34.64.219.179:8080/getUser", {
    method: "POST",
    body: JSON.stringify({ id: id }),
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  }).then((res) => res.json());
  return newData;
};

/**Responsible for contacting the server
 * and adding a user
 */
export const createUser = async (user) => {
  await fetch("http://34.64.219.179:8080/createUser", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({ ...user }),
  }).then((res) => res.json());
  return;
};

/**Responsible for contacting the server
 * and confirming a user registration
 */
export const confirmUser = async (id) => {
  const newData = await fetch("http://34.64.219.179:8080/confirmUser", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({ id: id }),
  }).then((res) => res.json());
  return newData;
};

/**Responsible for contacting the server
 * and updating a user
 */
export const updateUser = async (user) => {
  const newData = await fetch("http://34.64.219.179:8080/updateUser", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({ user: user }),
  }).then((res) => res.json());
  return newData;
};

/**Responsible for contacting the server
 * and deleting a user
 */
export const deleteUser = async (id) => {
  const newData = await fetch("http://34.64.219.179:8080/deleteUser", {
    method: "POST",
    body: JSON.stringify({ id: id }),
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  }).then((res) => res.json());
  return newData;
};
