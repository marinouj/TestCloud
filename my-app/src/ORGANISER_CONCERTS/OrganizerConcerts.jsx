import React from "react";
import * as actions from "../actions/UserActions";
import ConcertForm from "./ConcertForm";

/** Executes delete of the concert the uder asked for
 *  identifing it by its id
 */
const deleteConcert = (cid) => {
  actions
    .deleteConcert(cid)
    .then((newData) => console.log(newData))
    .catch((error) => {
      alert("Loading failed: " + error);
    });
};

/** Sents out concert is sanceled notification
 * every time it is clicked
 */
const cancelConcert = (cid, title) => {
  actions
    .cancelConcert(cid, title)
    .then()
    .catch((error) => {
      alert("Loading failed: " + error);
    });

  actions
    .loadFavoritesByConcert(cid)
    .then((users) => {
      users.map((u) => {
        actions
          .getUser(u.userId)
          .then((res) => {
            actions
              .notifyUsers(
                u.userId,
                "Concert " + title + " canceled, " + res[0].notifications
              )
              .then()
              .catch((error) => {
                alert("Loading failed: " + error);
              });
          })
          .catch((error) => {
            alert("Loading favorites of current user failed: " + error);
          });
      });
    })
    .catch((error) => {
      alert("Loading failed: " + error);
    });
};

class OrganizerConcerts extends React.Component {
  state = {
    returnedData: [],
    loggedInUser: JSON.parse(localStorage.getItem("user")),
    concert: {
      _id: "",
      title: "",
      artist: "",
      category: "",
      date: "",
      organizerId: "",
    },
  };

  /**Handles typing of user and updating input fields value accordinglly */
  onChange = (event) => {
    const { name, value } = event.target;
    const c = { ...this.state.concert, [name]: value };
    this.setState({ concert: c });
  };

  /**Loads concerts of logged in organizer when page loads*/
  componentDidMount() {
    actions
      .loadOrgConcerts(this.state.loggedInUser._id)
      .then((newData) => {
        this.setState({
          returnedData: newData.map((c) => ({
            ...c,
            date: c.date.split("T")[0],
          })),
        });
      })
      .catch((error) => {
        alert("Loaading failed: " + error);
      });
  }

  /**Updates concerts of logged in organizer when data update*/
  componentDidUpdate() {
    actions
      .loadOrgConcerts(this.state.loggedInUser._id)
      .then((newData) =>
        this.setState({
          returnedData: newData.map((c) => ({
            ...c,
            date: c.date.split("T")[0],
          })),
        })
      )
      .catch((error) => {
        alert("Loaading failed: " + error);
      });
  }
  /** if user ckicks the add button passes an empty concert to the form else
   * passes the concert data of the one user asked to edit
   */
  addConcert = (concert, add) => {
    if (add) {
      console.log(this.state);
      const loggedInUser = JSON.parse(localStorage.getItem("user"));
      this.setState({
        concert: {
          _id: "",
          title: "",
          artist: "",
          category: "",
          date: "",
          organizerId: loggedInUser._id,
        },
      });
    } else {
      this.setState({ concert: concert });
      console.log(concert);
    }
    document.querySelector(".concert_form").classList.remove("hidden");
  };

  render() {
    return (
      <>
        <div class="w-full h-9/10 bg-light_gray">
          <div class="concert_form fixed z-30 hidden h-full w-full">
            <ConcertForm
              concert={this.state.concert}
              onChange={this.onChange}
            />
          </div>
          <div class="flex justify-center w-full text-black ">
            <button
              class="buttons h-12 mt-4"
              onClick={() => {
                this.addConcert(this.state.concert, true);
              }}
            >
              Add concert
            </button>
            <table class="mt-20 w-1/2 border border-purple h-auto">
              <thead>
                <tr>
                  <th />
                  <th class="table_outline">Id</th>
                  <th class="table_outline">Title</th>
                  <th class="table_outline">Date</th>
                  <th class="table_outline">Artist name</th>
                  <th class="table_outline">Category</th>
                  <th />
                  <th />
                </tr>
              </thead>
              <tbody>
                {this.state.returnedData.map((concert) => {
                  return (
                    <tr class="table_outline" key={concert.ConcertId}>
                      <td class="table_outline">
                        <button
                          class="buttons"
                          onClick={() => {
                            //setConcert(concert);
                            this.addConcert(concert, false);
                          }}
                        >
                          Edit
                        </button>
                      </td>
                      <td class="table_outline">{concert._id}</td>
                      <td class="table_outline">{concert.title}</td>
                      <td class="table_outline">{concert.date}</td>
                      <td class="table_outline">{concert.artist}</td>
                      <td class="table_outline">{concert.category}</td>
                      <td class="table_outline">
                        <button
                          class="buttons"
                          onClick={() => deleteConcert(concert._id)}
                        >
                          Delete
                        </button>
                      </td>
                      <td class="table_outline">
                        <button
                          class="buttons"
                          onClick={() =>
                            cancelConcert(concert._id, concert.title)
                          }
                        >
                          Cancel
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </>
    );
  }
}

export default OrganizerConcerts;
