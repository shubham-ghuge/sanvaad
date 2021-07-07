import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Route } from "react-router";
import { NavLink } from "react-router-dom";

function PrivateRoute({ path, ...props }) {
  const { loggedInStatus } = useSelector((state) => state.auth);
  return loggedInStatus ? (
    <>
      <nav>
        <NavLink to="/feed">Feed</NavLink>||{" "}
        <NavLink to="/profile">profile</NavLink>||{" "}
        <NavLink to="/posts">Your posts</NavLink>||{" "}
        <NavLink to="/explore">Explore</NavLink>||{" "}
        <NavLink to="/notifications">notifications</NavLink>
      </nav>
      <Route path={path} {...props} />
    </>
  ) : (
    <Navigate replace to="/" />
  );
}
export { PrivateRoute };
