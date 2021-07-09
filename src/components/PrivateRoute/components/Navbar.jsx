import React from "react";
import { NavLink } from "react-router-dom";
import { HiOutlineHome } from "react-icons/hi";
import { FaFeather } from "react-icons/fa";
import { MdExplore } from "react-icons/md";
import { RiUserSettingsLine } from "react-icons/ri";

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
      <NavLink to="/posts">
        <FaFeather className="icon" />
        <span>posts</span>
      </NavLink>
      <NavLink to="/profile">
        <RiUserSettingsLine className="icon" />
        <span>profile</span>
      </NavLink>
    </nav>
  );
}
export { Navbar };
