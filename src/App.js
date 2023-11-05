import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import MainPage from "./components/MainPage";
import Register from "./components/Register";
import Login from "./components/Login.js";
import ActivityDetail from "./components/ActivityDetail";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/activity/:id" element={<ActivityDetail/>} />
      </Routes>
    </Router>
  );
}

export default App;
