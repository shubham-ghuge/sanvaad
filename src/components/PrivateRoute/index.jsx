import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Route } from "react-router";
import { Header } from "./components/Header";
import { Navbar } from "./components/Navbar";

function PrivateRoute({ path, ...props }) {
  const { loggedInStatus } = useSelector((state) => state.auth);
  return loggedInStatus ? (
    <>
      <Header />
      <Navbar />
      <div className="margin"></div>
      <main>
        <Route path={path} {...props} />
      </main>
    </>
  ) : (
    <Navigate replace to="/" />
  );
}
export { PrivateRoute };
