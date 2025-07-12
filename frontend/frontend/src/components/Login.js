import React, { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const Login = ({ onLoginSuccess }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!username || !password) {
      setMessage("Please enter username and password.");
      return;
    }

    // Try DummyJSON login first
    try {
      const res = await axios.post("https://dummyjson.com/auth/login", {
        username,
        password,
      });

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("customerId", res.data.id);
      onLoginSuccess(res.data.id);
      navigate("/dashboard");
      return;
    } catch (err) {
      console.log("DummyJSON login failed, checking cookies...");
    }

    // Fallback: Check user from cookies
    const usersCookie = Cookies.get("registeredUsers");
    const users = usersCookie ? JSON.parse(usersCookie) : [];

    const foundUser = users.find(
      (user) => user.username === username && user.password === password
    );

    if (foundUser) {
      // Simulate success
      const fakeCustomerId = `local-${username}`;
      localStorage.setItem("customerId", fakeCustomerId);
      onLoginSuccess(fakeCustomerId);
      navigate("/dashboard");
    } else {
      setMessage("Invalid credentials. Try again.");
    }
  };

  return (
    <div className="container d-flex align-items-center justify-content-center min-vh-100">
      <div className="card p-4 shadow" style={{ maxWidth: 400 }}>
        <h3 className="text-center mb-3">Login</h3>

        {message && <div className="alert alert-danger">{message}</div>}

        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <label className="form-label">Username</label>
            <input
              className="form-control"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button className="btn btn-primary w-100" type="submit">
            Login
          </button>
        </form>

        <div className="mt-3 text-center">
          Don’t have an account?{" "}
          <button className="btn btn-link p-0" onClick={() => navigate("/signup")}>
            Sign up here
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
