import React from "react";
import { Outlet } from "react-router";
import { Footer } from "../Footer";

function Auth() {
  return (
    <>
      <Outlet />
      <Footer />
    </>
  );
}
export { Auth };
