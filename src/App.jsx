import React from "react";
import { Route, Routes, useNavigate } from "react-router";
import "./App.css";
import { Auth } from "./components/Auth";
import { Login, Register } from "./components/Auth/components";
import { Explore } from "./components/Explore";
import { Feed } from "./components/Feed";
import { Notification } from "./components/Notifications";
import { PrivateRoute } from "./components/PrivateRoute";
import { Profile } from "./components/Profile";
import { UserPosts } from "./components/userPosts";
import { Post } from "./components/Post";
import axios from "axios";
import { useDispatch } from "react-redux";
import { logout } from "./features/auth/authSlice";

function App() {
  let navigate = useNavigate();
  const dispatch = useDispatch();
  axios.interceptors.response.use(undefined, function (error) {
    if (error.response.status === 401) {
      dispatch(logout());
      navigate("/");
    }
    return Promise.reject(error);
  });

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Auth />}>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <PrivateRoute path="/feed" element={<Feed />} />
          <PrivateRoute path="/notifications" element={<Notification />} />
          <PrivateRoute path="/explore" element={<Explore />} />
          <PrivateRoute path="/profile" element={<Profile />} />
          <PrivateRoute path="/posts" element={<UserPosts />} />
          <PrivateRoute path="/feed/:postId" element={<Post />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
