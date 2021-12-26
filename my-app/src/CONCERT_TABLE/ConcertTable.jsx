import React, { useState } from "react";
import * as actions from "../actions/FavoritesActions";
import * as concertActions from "../actions/ConcertActions";

class ConcertTable extends React.Component {
  state = {
    returnedData: [],
    favoriteConcerts: [],
    loggedInUser: JSON.parse(localStorage.getItem("user")),
    filterData: { title: "", category: "", artist: "" },
    question: {},
  };

  /**
   * Loads concerts and checks for favorites of logged in
   * user when entering the webpage
   */
  componentDidMount() {
    concertActions
      .loadConcerts()
      .then((newData) => {
        this.setState({
          returnedData: newData.map((c) => ({
            ...c,
            date: c.date.split("T")[0],
          })),
        });
      })
      .catch((error) => {
        alert("Loading concerts failed: " + error);
      });
    actions
      .loadFavorites(this.state.loggedInUser._id)
      .then((res) => {
        this.setState({ favoriteConcerts: res.map((a) => a.concertId) });
      })
      .catch((error) => {
        alert("Loading favorites of current user failed: " + error);
      });
  }

  /**
   * Loads concerts and checks for favorites of logged in
   * user when entering the webpage
   */
  componentDidUpdate() {
    if (this.state.question) {
      concertActions
        .filterConcerts(this.state.question)
        .then((newData) => {
          this.setState({
            returnedData: newData.map((c) => ({
              ...c,
              date: c.date.split("T")[0],
            })),
          });
        })
        .catch((error) => {
          alert("Loading concerts failed: " + error);
        });
    } else {
      concertActions
        .loadConcerts()
        .then((newData) => {
          this.setState({
            returnedData: newData.map((c) => ({
              ...c,
              date: c.date.split("T")[0],
            })),
          });
        })
        .catch((error) => {
          alert("Loading concerts failed: " + error);
        });
    }
  }

  /**Create a new favorite entry with id greater by 1 from the current
   * maximum Favorite Id
   */
  addToFavorites = (concertId, userId) => {
    actions
      .addFavotite(concertId, userId)
      .then(() => {
        this.props.subscribe(concertId);
        actions
          .loadFavorites(this.state.loggedInUser._id)
          .then((res) => {
            this.setState({
              favoriteConcerts: res.map((a) => a.concertId),
            });
          })
          .catch((error) => {
            alert("Add to favorites failed: " + error);
          });
      })
      .catch((error) => {
        alert("Add to favorites failed: " + error);
      });
  };

  /**Handles typing of user and updating input fields value accordinglly */
  onChange = (event) => {
    const { name, value } = event.target;
    const f = { ...this.state.filterData, [name]: value };
    this.setState({ filterData: f });
  };

  /**If user clicks on the search button with empty input fields
   * reloads the concerts else searches for those than have the title
   * category and artist the user asked for
   */
  onSearch = (event) => {
    event.preventDefault();
    let tempQuestion = "";
    if (this.state.filterData.title) {
      tempQuestion = { title: this.state.filterData.title };
    }
    if (this.state.filterData.category) {
      tempQuestion = {
        ...tempQuestion,
        artist: this.state.filterData.category,
      };
    }
    if (this.state.filterData.artist) {
      tempQuestion = { ...tempQuestion, artist: this.state.filterData.artist };
    }
    this.setState({ question: tempQuestion });
    if (tempQuestion) {
      concertActions
        .filterConcerts(tempQuestion)
        .then((newData) => {
          this.setState({
            returnedData: newData.map((c) => ({
              ...c,
              date: c.date.split("T")[0],
            })),
          });
        })
        .catch((error) => {
          alert("Loading concerts failed: " + error);
        });
    } else {
      concertActions
        .loadConcerts()
        .then((newData) => {
          this.setState({
            returnedData: newData.map((c) => ({
              ...c,
              date: c.date.split("T")[0],
            })),
          });
        })
        .catch((error) => {
          alert("Loading concerts failed: " + error);
        });
    }
  };

  render() {
    return (
      <>
        <div class="w-full flex justify-center h-9/10 bg-light_gray">
          <div class="flex flex-col w-full text-black ">
            <div class="flex flex-row justify-center mt-8">
              <div class="w-52 px-3 mb-3">
                <label class="input_field_titles" for="grid-last-name">
                  Artist
                </label>
                <input
                  onChange={this.onChange}
                  name="artist"
                  value={this.state.filterData.artist}
                  class="input_fields"
                  type="text"
                />
              </div>
              <div class="w-52 px-3 mb-3">
                <label class="input_field_titles" for="grid-last-name">
                  Title
                </label>
                <input
                  onChange={this.onChange}
                  name="title"
                  value={this.state.filterData.title}
                  class="input_fields"
                  type="text"
                />
              </div>
              <div class="w-52 px-3 mb-3">
                <label class="input_field_titles" for="grid-last-name">
                  Category
                </label>
                <input
                  onChange={this.onChange}
                  name="category"
                  value={this.state.filterData.category}
                  class="input_fields"
                  type="text"
                />
              </div>
              <button class="buttons h-12 mt-4" onClick={this.onSearch}>
                Search
              </button>
            </div>
            <div class="flex justify-center">
              <table class="mt-12 w-1/2 border border-purple h-auto">
                <thead>
                  <tr>
                    <th />
                    <th class="table_outline">Id</th>
                    <th class="table_outline">Title</th>
                    <th class="table_outline">Date</th>
                    <th class="table_outline">Artist name</th>
                    <th class="table_outline">Category</th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.returnedData.map((concert) => {
                    return (
                      <tr class="table_outline" key={concert.ConcertId}>
                        <td class="table_outline">
                          <div class="text-purple text-xl">
                            {this.state.favoriteConcerts.includes(
                              concert._id
                            ) ? (
                              <div>&#9733;</div>
                            ) : (
                              <button
                                class="buttons"
                                onClick={() =>
                                  this.addToFavorites(
                                    concert._id,
                                    this.state.loggedInUser._id
                                  )
                                }
                              >
                                &#9734;
                              </button>
                            )}
                          </div>
                        </td>
                        <td class="table_outline">{concert._id}</td>
                        <td class="table_outline">{concert.title}</td>
                        <td class="table_outline">{concert.date}</td>
                        <td class="table_outline">{concert.artist}</td>
                        <td class="table_outline">{concert.category}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default ConcertTable;
