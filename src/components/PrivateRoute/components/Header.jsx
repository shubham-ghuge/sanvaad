import React from "react";
import { Link } from "react-router-dom";
import logo from "../../../assets/logo.svg";

function Header() {
  return (
    <header>
      <Link to="/feed">
        <span>
          <img src={logo} alt="logo" />
        </span>
        sanvaad
      </Link>
    </header>
  );
}
export { Header };
