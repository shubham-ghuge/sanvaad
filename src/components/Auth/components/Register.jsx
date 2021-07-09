import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { registerUser, setMessage } from "../../../features/auth/authSlice";
import { Alert } from "../../Alert";

function Register() {
  const dispatch = useDispatch();
  let navigate = useNavigate();
  const [userInput, setUserInput] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const { message, success, loading } = useSelector((state) => state.auth);

  function registerFormHandler(event) {
    event.preventDefault();
    const checkValidations =
      userInput.name.length >= 4 &&
      userInput.password.length >= 6 &&
      userInput.password === userInput.confirmPassword;
    if (checkValidations) {
      dispatch(
        registerUser({
          name: userInput.name,
          email: userInput.email,
          password: userInput.password,
        })
      );
    }
  }

  useEffect(() => {
    if (success) {
      return setTimeout(() => navigate("/"), 3000);
    }
  }, [success]);

  return (
    <div className="auth-form">
      <form onSubmit={(e) => registerFormHandler(e)}>
        <div className="d-flex ai-center mb-7">
          <img src="../src/assets/logo.svg" className="h-10" alt="logo" />
          <p className="c-white fw-600 ml-4 fsz-3">SANVAAD</p>
        </div>
        {message && (
          <Alert message={message} onClose={() => dispatch(setMessage(null))} />
        )}
        <label>
          <span>name</span>
          <input
            type="text"
            placeholder="john doe"
            value={userInput.name}
            onChange={(e) =>
              setUserInput((curr) => ({ ...curr, name: e.target.value }))
            }
            required
          />
          {userInput.name.length !== 0 && userInput.name.length < 4 && (
            <span className="c-danger text-sm">name must be 4 characters</span>
          )}
        </label>
        <label>
          <span>email</span>
          <input
            type="email"
            placeholder="john@google.co"
            value={userInput.email}
            onChange={(e) =>
              setUserInput((curr) => ({ ...curr, email: e.target.value }))
            }
            required
          />
        </label>
        <label>
          <span>password</span>

          <input
            type="password"
            placeholder="enter password"
            value={userInput.password}
            onChange={(e) =>
              setUserInput((curr) => ({ ...curr, password: e.target.value }))
            }
            required
          />
          {userInput.password.length !== 0 && userInput.password.length < 6 && (
            <span className="c-danger text-sm">
              password must be 6 characters
            </span>
          )}
        </label>
        <label>
          <span>confirm password</span>
          <input
            type="password"
            placeholder="verify password"
            value={userInput.confirmPassword}
            onChange={(e) =>
              setUserInput((curr) => ({
                ...curr,
                confirmPassword: e.target.value,
              }))
            }
            required
          />
          {userInput.confirmPassword.length !== 0 &&
            userInput.password !== userInput.confirmPassword && (
              <span className="c-danger text-sm">password doesn't match</span>
            )}
        </label>

        <button type="submit" className="btn-primary mb-4">
          {loading ? "signing in..." : "Register"}
        </button>
        <p className="d-flex c-white ai-center">
          Already Have an account?{" "}
          <Link className="ml-2" to="/">
            Log in
          </Link>
        </p>
      </form>
    </div>
  );
}
export { Register };
