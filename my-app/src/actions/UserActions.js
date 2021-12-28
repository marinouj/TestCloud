/**Responsible for contacting the server
 * and returning all the avaliable concerts
 */
export const loadConcerts = async () => {
  const newData = await fetch("http://localhost:8080/loadConcerts", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  }).then((res) => res.json());
  return newData;
};

/**Responsible for contacting the server
 * and returning all the concerts to whitch the
 * passed in filter values (title, category, artist)
 * apply
 */
export const filterConcerts = async (filter) => {
  const newData = await fetch("http://localhost:8080/filterConcerts", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({ filter }),
  }).then((res) => res.json());
  return newData;
};

/**Responsible for contacting the server
 * and returning all the concerts a specific
 * organizer is hosting
 */
export const loadOrgConcerts = async (uid) => {
  const newData = await fetch("http://localhost:8080/loadOrgConcerts", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({ uid: uid }),
  }).then((res) => res.json());
  return newData;
};

/**Responsible for contacting the server
 * and adding the passed in concert
 */
export const addConcert = async (concert) => {
  const newData = await fetch("http://localhost:8080/addConcert", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({ ...concert }),
  }).then((res) => res.json());
  console.log(newData[0]);
  return newData;
};

/**Responsible for contacting the server
 * and updating the values of a specific concert
 * (concertId and organizer can not be updated)
 */
export const updateConcert = async (concert) => {
  const newData = await fetch("http://localhost:8080/updateConcert", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({ ...concert }),
  }).then((res) => res.json());
  console.log(newData[0]);
  return newData;
};

/**Responsible for contacting the server
 * and deleting a concert determined by its ID
 */
export const deleteConcert = async (cid) => {
  const newData = await fetch("http://localhost:8080/deleteConcert", {
    method: "POST",
    body: JSON.stringify({ cid: cid }),
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  }).then((res) => res.json());
  return newData;
};

/**Cancel concert, dent out notification to
 * those that have it in favorites that it is
 * canceled */
export const cancelConcert = async (cid, title) => {
  var host = window.document.location.host.replace(/:.*/, "");
  console.log(host);
  var ws = new WebSocket("ws://" + host + ":8080/echo1");
  ws.onopen = function () {
    ws.send(
      JSON.stringify({
        request: "PUBLISH",
        message: title + " concert is canceled",
        channel: cid,
      })
    );
    ws.close();
  };
};

/**Responsible for contacting the server
 * and deleting a concert determined by its ID
 */
export const notifyUsers = async (id, notification) => {
  const newData = await fetch("http://localhost:8080/addNotification", {
    method: "POST",
    body: JSON.stringify({ id: id, not: notification }),
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  }).then((res) => res.json());
  return newData;
};

/**Responsible for contacting the server
 * and returning all the avaliable concerts
 */
export const loadConcerts = async () => {
  const newData = await fetch("http://localhost:8080/loadConcerts", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  }).then((res) => res.json());
  return newData;
};

/**Responsible for contacting the server
 * and returning all the concerts to whitch the
 * passed in filter values (title, category, artist)
 * apply
 */
export const filterConcerts = async (filter) => {
  const newData = await fetch("http://localhost:8080/filterConcerts", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({ filter }),
  }).then((res) => res.json());
  return newData;
};

/**Responsible for contacting the server
 * and returning all the concerts a specific
 * organizer is hosting
 */
export const loadOrgConcerts = async (uid) => {
  const newData = await fetch("http://localhost:8080/loadOrgConcerts", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({ uid: uid }),
  }).then((res) => res.json());
  return newData;
};

/**Responsible for contacting the server
 * and adding the passed in concert
 */
export const addConcert = async (concert) => {
  const newData = await fetch("http://localhost:8080/addConcert", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({ ...concert }),
  }).then((res) => res.json());
  console.log(newData[0]);
  return newData;
};

/**Responsible for contacting the server
 * and updating the values of a specific concert
 * (concertId and organizer can not be updated)
 */
export const updateConcert = async (concert) => {
  const newData = await fetch("http://localhost:8080/updateConcert", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({ ...concert }),
  }).then((res) => res.json());
  console.log(newData[0]);
  return newData;
};

/**Responsible for contacting the server
 * and deleting a concert determined by its ID
 */
export const deleteConcert = async (cid) => {
  const newData = await fetch("http://localhost:8080/deleteConcert", {
    method: "POST",
    body: JSON.stringify({ cid: cid }),
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  }).then((res) => res.json());
  return newData;
};

/**Cancel concert, dent out notification to
 * those that have it in favorites that it is
 * canceled */
export const cancelConcert = async (cid, title) => {
  var host = window.document.location.host.replace(/:.*/, "");
  console.log(host);
  var ws = new WebSocket("ws://" + host + ":8080/echo1");
  ws.onopen = function () {
    ws.send(
      JSON.stringify({
        request: "PUBLISH",
        message: title + " concert is canceled",
        channel: cid,
      })
    );
    ws.close();
  };
};

/**Responsible for contacting the server
 * and deleting a concert determined by its ID
 */
export const notifyUsers = async (id, notification) => {
  const newData = await fetch("http://localhost:8080/addNotification", {
    method: "POST",
    body: JSON.stringify({ id: id, not: notification }),
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  }).then((res) => res.json());
  return newData;
};
