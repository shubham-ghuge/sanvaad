import React from "react";
import { Route, Routes } from "react-router";
import "./App.css";
import { Auth } from "./components/Auth";
import { Login, Register } from "./components/Auth/components";
import { Feed } from "./components/Feed";
import { Notification } from "./components/Notifications";
import { PrivateRoute } from "./components/PrivateRoute";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Auth />}>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <PrivateRoute path="/feed" element={<Feed />} />
          <PrivateRoute path="/notifications" element={<Notification />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
