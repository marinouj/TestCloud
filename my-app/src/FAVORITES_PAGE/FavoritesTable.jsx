import React, { useState, useEffect } from "react";
import * as actions from "../actions/UserActions";
import * as concertActions from "../actions/ConcertActions";

/** Deletes favorite where FavoriteId=id */
const deleteFavorite = (id) => {
  console.log(id);
  actions
    .deleteFavotite(id)
    .then((newData) => console.log(newData))
    .catch((error) => {
      alert("Loading failed: " + error);
    });
};

const FavoritesTable = () => {
  const [returnedData, setReturnedData] = useState([]);
  const loggedInUser = JSON.parse(localStorage.getItem("user"));
  const [concerts, setConcerts] = useState([]);

  /** Constantly reloads the logged in user's favorites */
  useEffect(() => {
    actions
      .loadFavorites(loggedInUser._id)
      .then((newData) => {
        setReturnedData(newData);
        concertActions
          .loadConcerts()
          .then((res) => {
            setConcerts(res);
          })
          .catch((error) => {
            alert("Loadinf failed" + error);
          });
      })
      .catch((error) => {
        alert("Loading failed: " + error);
      });
  });

  return (
    <div class="w-full h-9/10 bg-light_gray">
      <div class="flex justify-center w-full text-black ">
        <table class="mt-20 w-1/2 border border-purple h-auto">
          <thead>
            <tr>
              <th class="table_outline">Id</th>
              <th class="table_outline">ConcertId</th>
              <th class="table_outline">Delete</th>
            </tr>
          </thead>
          <tbody>
            {returnedData.map((concert) => {
              return (
                <tr class="table_outline" key={concert._id}>
                  <td class="table_outline">{concert._id}</td>
                  <td class="table_outline">
                    {concerts.find((obj) => obj._id === concert.concertId)
                      ? concerts.find((obj) => obj._id === concert.concertId)
                          .title
                      : "Not Found"}
                  </td>
                  <td class="table_outline">
                    <button
                      class="buttons"
                      onClick={() => deleteFavorite(concert._id)}
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
};

export default FavoritesTable;
