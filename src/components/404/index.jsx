import React from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/logo.svg";

function Error() {
  return (
    <div className="flex-column jc-center ai-center h-80">
      <img src={logo} alt="logo" className="h-10 mb-4" />
      <p className="c-primary fw-600">ERROR 404</p>
      <h2 className="fsz-3 c-white">This Page Does Not Exist</h2>
      <Link className="mt-4 btn-primary" to="/">Go back Home</Link>
    </div>
  );
}
export { Error };
