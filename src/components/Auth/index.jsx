import React from "react";
import { Outlet } from "react-router";

function Auth() {
  return (
    <>
      {/* <div className="img-gradient"></div> */}
      <Outlet />
    </>
  );
}
export { Auth };
