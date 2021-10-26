import React from "react";
import { ReactComponent as Settings } from "../../Images/settings.svg";
import { ReactComponent as User } from "../../Images/user.svg";
import { ReactComponent as Water } from "../../Images/water.svg";
import { ReactComponent as Feed } from "../../Images/feed.svg";
import "./../styles/pages.css";

export const Navbar = ({ page, setPage }) => {
  return (
    <div className="app">
      <button
        onClick={() => {
          setPage("main");
        }}
        className="btn btn-light"
      >
        {/* main page */}
        <Water />
      </button>
      <button
        onClick={() => {
          setPage("feed");
        }}
        className="btn btn-light"
      >
        {/* feed */}
        <Feed />
      </button>
      <button
        onClick={() => {
          setPage("profile");
        }}
        className="btn btn-light"
      >
        {/* profile page */}
        <User />
      </button>
      <button
        onClick={() => {
          setPage("config");
        }}
        className="btn btn-light"
      >
        {/* config page */}
        <Settings />
      </button>
    </div>
  );
};
