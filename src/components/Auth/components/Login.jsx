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

function Login() {
  const dispatch = useDispatch();
  let navigate = useNavigate();
  const { token, loggedInStatus, loading, message } = useSelector(
    (state) => state.auth
  );
  const [userInput, setUserInput] = useState({ email: "", password: "" });

  function loginFormHandler(event) {
    event.preventDefault();
    dispatch(loginUser(userInput));
  }
  useEffect(() => {
    dispatch(setToken());
  }, []);

  useEffect(() => {
    if (loggedInStatus) {
      axios.defaults.headers.common["Authorization"] = token;
      navigate("/feed");
    }
  }, [loggedInStatus]);

  return (
    <div className="auth-form">
      {message && (
        <Alert message={message} onClose={() => dispatch(setMessage(null))} />
      )}
      <h3 className="title">Login</h3>
      <form onSubmit={(e) => loginFormHandler(e)}>
        <label>
          email
          <input
            type="email"
            value={userInput.email}
            onChange={(e) =>
              setUserInput((curr) => ({ ...curr, email: e.target.value }))
            }
            required
          />
        </label>
        <label>
          password
          <input
            type="password"
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
      </form>
      <p className="d-flex ai-center jc-center">
        new here?
        <Link className="ml-2" to="/register">
          Register Now
        </Link>
      </p>
    </div>
  );
}
export { Login };
