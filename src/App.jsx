import React, { useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router";
import "./App.css";
import { Auth } from "./components/Auth";
import { Login, Register } from "./components/Auth/components";
import { Explore } from "./components/Explore";
import { Feed } from "./components/Feed";
import { Notification } from "./components/Notifications";
import { PrivateRoute } from "./components/PrivateRoute";
import { Profile } from "./components/Profile";
import { Post } from "./components/Post";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { logout, setToken } from "./features/auth/authSlice";
import { Error } from "./components/404";

function App() {
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const { loggedInStatus } = useSelector((state) => state.auth);

  axios.interceptors.response.use(undefined, function (error) {
    if (error.response.status === 401) {
      dispatch(logout());
    }
    return Promise.reject(error);
  });

  useEffect(() => {
    const { isUserLoggedIn, token, userName } =
      JSON.parse(localStorage.getItem("login")) || {};
    if (isUserLoggedIn) {
      dispatch(setToken({ token, userName }));
    }
  }, []);

  useEffect(() => {
    if (loggedInStatus) {
      navigate("/feed");
    } else {
      navigate("/");
    }
  }, [loggedInStatus]);

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Auth />}>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>
        <PrivateRoute path="/feed" element={<Feed />} />
        <PrivateRoute path="/notifications" element={<Notification />} />
        <PrivateRoute path="/explore" element={<Explore />} />
        <PrivateRoute path="/profile" element={<Profile />} />
        <PrivateRoute path="/feed/:postId" element={<Post />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </div>
  );
}

export default App;
