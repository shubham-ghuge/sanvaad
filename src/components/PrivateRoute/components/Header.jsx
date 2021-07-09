import React from "react";
import logo from "../../../assets/logo.svg";
import { IoNotificationsSharp } from "react-icons/io5";
import { NavLink } from "react-router-dom";

function Header() {
  return (
    <header>
      <div className="logo-container">
        <img src={logo} alt="logo" />
        <span>sanvaad</span>
      </div>
      <NavLink to="/notifications" className="notification">
        <div className="badge"></div>
        <IoNotificationsSharp className="icon" />
      </NavLink>
    </header>
  );
}
export { Header };
