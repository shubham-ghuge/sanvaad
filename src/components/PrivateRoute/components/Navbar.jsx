import React from "react";
import { NavLink } from "react-router-dom";
import { HiOutlineHome } from "react-icons/hi";
import { MdExplore } from "react-icons/md";
import { RiUserSettingsLine } from "react-icons/ri";
import { IoNotificationsSharp } from "react-icons/io5";

function Navbar() {
  return (
    <nav className="navbar">
      <NavLink to="/feed">
        <HiOutlineHome className="icon" />
        <span>feed</span>
      </NavLink>
      <NavLink to="/explore">
        <MdExplore className="icon" />
        <span>explore</span>
      </NavLink>
      <NavLink to="/notifications">
        <IoNotificationsSharp className="icon" />
        <span>Notifications</span>
      </NavLink>
      <NavLink to="/profile">
        <RiUserSettingsLine className="icon" />
        <span>profile</span>
      </NavLink>
    </nav>
  );
}
export { Navbar };
