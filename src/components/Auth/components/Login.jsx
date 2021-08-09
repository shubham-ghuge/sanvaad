import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  loginUser,
  setMessage,
  setToken,
} from "../../../features/auth/authSlice";
import { Alert } from "../../Alert";
import logo from "../../../assets/logo.svg";

function Login() {
  const dispatch = useDispatch();
  let navigate = useNavigate();
  const { loggedInStatus, loading, message } = useSelector(
    (state) => state.auth
  );
  const [userInput, setUserInput] = useState({ email: "", password: "" });

  function loginFormHandler(event) {
    event.preventDefault();
    dispatch(loginUser(userInput));
  }
  useEffect(() => {
    const { isUserLoggedIn, token } =
      JSON.parse(localStorage.getItem("login")) || {};
    if (isUserLoggedIn) {
      dispatch(setToken(token));
    }
  }, []);

  useEffect(() => {
    if (loggedInStatus) {
      navigate("/feed");
    }
  }, [loggedInStatus]);

  return (
    <div className="auth-form">
      <form onSubmit={(e) => loginFormHandler(e)}>
        {message && (
          <Alert message={message} onClose={() => dispatch(setMessage(null))} />
        )}
        <div className="d-flex ai-center mb-7">
          <img src={logo} className="h-10" alt="logo" />
          <p className="c-white fw-600 ml-4 fsz-3">SANVAAD</p>
        </div>
        <label>
          <span> Email </span>
          <input
            type="email"
            value={userInput.email}
            onChange={(e) =>
              setUserInput((curr) => ({ ...curr, email: e.target.value }))
            }
            placeholder="johndoe@gmail.com"
            required
          />
        </label>
        <label>
          <span>password</span>
          <input
            type="password"
            placeholder="*******"
            value={userInput.password}
            onChange={(e) =>
              setUserInput((curr) => ({ ...curr, password: e.target.value }))
            }
            required
          />
        </label>
        <button type="submit" className="btn-primary mb-4">
          {loading ? "logging in..." : "Login"}
        </button>
        <button
          className="btn-reset c-white mb-4"
          onClick={() =>
            setUserInput({
              email: "indianFarmer@work.india",
              password: "aaaaaa",
            })
          }
        >
          Demo credentials
        </button>
        <p className="d-flex ai-center c-white jc-center">
          new here?
          <Link className="ml-2" to="/register">
            Register Now
          </Link>
        </p>
      </form>
    </div>
  );
}
export { Login };
