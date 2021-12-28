import React from "react";
import PropTypes from "prop-types";
import * as actions from "../actions/UserActions";

const ConcertForm = (props) => {
  /**If the concert given at the props has a concert id
   * it means that a concert is inserted to get updated
   * else the organizer wants to add a new concert
   */
  const onSubmit = async (event) => {
    event.preventDefault();
    if (props.concert._id) {
      actions
        .updateConcert(props.concert)
        .then((res) => {
          document.querySelector(".concert_form").classList.add("hidden");
        })
        .catch((error) => {
          alert("Register failed: " + error);
        });
    } else {
      actions
        .addConcert(props.concert)
        .then((res) => {
          document.querySelector(".concert_form").classList.add("hidden");
        })
        .catch((error) => {
          alert("Register failed: " + error);
        });
    }
  };
  /**Cancel button closes the form */
  const onCancel = (event) => {
    event.preventDefault();
    document.querySelector(".concert_form").classList.add("hidden");
  };

  return (
    <div class="w-full h-9/10 flex justify-center z-10 backdrop-filter backdrop-blur-sm">
      <form class="w-full max-w-lg h-96 mt-16 form_theme">
        <div class="flex flex-wrap -mx-3 mb-6">
          <div class="w-full md:w-1/2 px-3 mb-3">
            <label class="input_field_titles" for="grid-first-name">
              Title
            </label>
            <input
              onChange={props.onChange}
              name="title"
              value={props.concert.title}
              class="input_fields"
              type="text"
            />
          </div>
          <div class="w-full md:w-1/2 px-3 mb-3">
            <label class="input_field_titles" for="grid-last-name">
              Artist
            </label>
            <input
              onChange={props.onChange}
              name="artist"
              value={props.concert.artist}
              class="input_fields"
              type="text"
            />
          </div>
        </div>
        <div class="flex flex-wrap -mx-3 mb-6">
          <div class="w-full px-3">
            <label class="input_field_titles" for="grid-username">
              Category
            </label>
            <input
              onChange={props.onChange}
              name="category"
              value={props.concert.category}
              class="block input_fields focus:border-gray-500"
              type="text"
            />
          </div>
        </div>
        <div class="flex flex-wrap -mx-3 mb-6">
          <div class="w-full px-3">
            <label class="input_field_titles" for="grid-password">
              Date
            </label>
            <input
              onChange={props.onChange}
              name="date"
              value={props.concert.date}
              class="block input_fields"
              type="date"
            />
          </div>
        </div>
        <div class="flex flex-wrap -mx-3 mb-2">
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

ConcertForm.propTypes = {
  concert: PropTypes.object.isRequired,
  errors: PropTypes.object,
};

export default ConcertForm;
