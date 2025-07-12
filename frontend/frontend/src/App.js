import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Dashboard from "./components/Dashboard";

const App = () => {
  const [customerId, setCustomerId] = useState(localStorage.getItem("customerId"));

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            customerId ? <Navigate to="/dashboard" /> : <Login onLoginSuccess={setCustomerId} />
          }
        />
        <Route path="/login" element={<Login onLoginSuccess={setCustomerId} />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/dashboard"
          element={
            customerId ? (
              <Dashboard customerId={customerId} />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
};

export default App;
