import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Menu from "./COMMON/Menu";
import Header from "./COMMON/Header";
import LoginPage from "./LOGIN_PAGE/LoginPage";
import ManageRegister from "./REGISTER/ManageRegister";
import PageNotFound from "./COMMON/PageNotFound";
import MainPage from "./COMMON/MainPage";
import ConcertTable from "./CONCERT_TABLE/ConcertTable";
import OrganizerConcerts from "./ORGANISER_CONCERTS/OrganizerConcerts";
import UserTable from "./USER_TABLE/UserTable";
import FavoritesTable from "./FAVORITES_PAGE/FavoritesTable";
import { Popup } from "@progress/kendo-react-popup";

export default function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [admin, setAdmin] = useState(false);
  const [organizer, setOrganizer] = useState(false);
  const [simpleUser, setSimpleUser] = useState(false);
  const [message, setMessage] = useState("lalalala");
  const [show, setShow] = useState(true);
  const anchor = React.useRef(null);

  const subscribe = (cid) => {
    var uid = JSON.parse(localStorage.getItem("user"))._id;
    var host = window.document.location.host.replace(/:.*/, "");
    var ws = new WebSocket("ws://" + host + ":8080/echo1");

    ws.onopen = function () {
      ws.send(
        JSON.stringify({
          request: "SUBSCRIBE",
          message: "",
          channel: cid,
          uid: uid,
        })
      );
      ws.onmessage = function (event) {
        var data = JSON.parse(event.data);
        console.log(data);
        setMessage(data.message);
        document.querySelector(".notification").classList.remove("hidden");
      };
    };
  };
  useEffect(() => {
    const loggedInUser = localStorage.getItem("user");
    if (localStorage.getItem("user")) {
      const foundUser = JSON.parse(loggedInUser);
      if (foundUser) {
        setLoggedIn(true);
        if (foundUser.role === "Admin") {
          setAdmin(true);
          setOrganizer(false);
          setSimpleUser(false);
        } else if (foundUser.role === "Event Organizer") {
          setOrganizer(true);
          setAdmin(false);
          setSimpleUser(false);
        } else {
          setAdmin(false);
          setOrganizer(false);
          setSimpleUser(true);
        }
      } else {
        setAdmin(false);
        setOrganizer(false);
        setSimpleUser(false);
        setLoggedIn(false);
      }
    } else {
      setAdmin(true);
      setOrganizer(true);
      setSimpleUser(true);
      setLoggedIn(true);
    }
  });
  return (
    <BrowserRouter class="h-screen">
      <div class="container-fluid h-screen">
        <Header
          class="h-1/10 w-screen"
          loggedIn={loggedIn}
          setLoggedIn={setLoggedIn}
        />
        <div class="fixed z-30 hidden mobile-menu h-full w-full">
          <Menu />
        </div>
        <Popup
          anchor={anchor.current}
          show={show}
          popupClass={
            "notification px-20 hidden py-12 m-20 bg-white rounded-2xl space-y-8"
          }
        >
          <div>{message}</div>
          <div class="w-16 ">
            <button
              class="buttons"
              onClick={() => {
                document.querySelector(".notification").classList.add("hidden");
              }}
            >
              Ok
            </button>
          </div>
        </Popup>

        <Routes class="h-4/5 w-screen">
          <Route exact path="/" element={<LoginPage />} />
          <Route path="/register" element={<ManageRegister />} />
          <Route path="/mainpage" element={<MainPage />} />
          <Route
            path="/concerts"
            element={
              loggedIn ? <ConcertTable subscribe={subscribe} /> : <MainPage />
            }
          />
          <Route
            path="/myconcerts"
            element={organizer ? <OrganizerConcerts /> : <MainPage />}
          />
          <Route path="/users" element={admin ? <UserTable /> : <MainPage />} />

          <Route path="/favorites" element={<FavoritesTable />} />
          <Route element={<PageNotFound />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
