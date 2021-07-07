import React from "react";
import { Route, Routes } from "react-router";
import "./App.css";
import { Auth } from "./components/Auth";
import { Login, Register } from "./components/Auth/components";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Auth />}>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
