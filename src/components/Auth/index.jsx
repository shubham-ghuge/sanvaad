import React from "react";
import { Outlet } from "react-router";
import "./auth.css";

function Auth() {
  return (
    <div className="auth-container">
      <div className="img-gradient"></div>
      <Outlet />
    </div>
  );
}
export { Auth };
