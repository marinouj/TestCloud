/**Responsible for contacting the server
 * and returning all the favorites of the
 * user specified by the id
 */
export const loadFavorites = async (id) => {
  const newData = await fetch("http://34.64.219.179:8080/loadFavorites", {
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
 * and returning all the favorites of the
 * user specified by the id
 */
export const loadFavoritesByConcert = async (id) => {
  const newData = await fetch(
    "http://34.64.219.179:8080/loadFavoritesByConcert",
    {
      method: "POST",
      body: JSON.stringify({ id: id }),
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    }
  ).then((res) => res.json());
  return newData;
};

/**Responsible for contacting the server
 * and returning all the favorites
 */
export const loadAllFavorites = async () => {
  const newData = await fetch("http://34.64.219.179:8080/loadAllFavorites", {
    method: "POST",
    body: JSON.stringify({}),
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  }).then((res) => res.json());
  return newData;
};

/**Responsible for contacting the server
 * to add a song to a user's favorites
 */
export const addFavotite = async (cid, uid) => {
  const newData = await fetch("http://34.64.219.179:8080/addFavorite", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({ cid: cid, uid: uid }),
  }).then((res) => res.json());

  return newData;
};

/**Responsible for contacting the server
 * and deleting a specific song from a users
 * favorites list
 */
export const deleteFavotite = async (id) => {
  const newData = await fetch("http://34.64.219.179:8080/deleteFavorite", {
    method: "POST",
    body: JSON.stringify({ id: id }),
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  }).then((res) => res.json());

  return newData;
};

// module.exports = {
//   loadFavorites,
//   loadFavoritesByConcert,
//   loadAllFavorites,
//   addFavotite,
//   deleteFavotite,
// };
