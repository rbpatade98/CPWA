import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const handleSignup = (e) => {
    e.preventDefault();

    if (!username || !password) {
      setMessage("Username and password are required.");
      return;
    }

    // Get existing users from cookie
    const usersCookie = Cookies.get("registeredUsers");
    const users = usersCookie ? JSON.parse(usersCookie) : [];

    // Check if username already exists
    const exists = users.find((user) => user.username === username);
    if (exists) {
      setMessage("Username already exists. Please choose another.");
      return;
    }

    // Add new user
    const updatedUsers = [...users, { username, password }];
    Cookies.set("registeredUsers", JSON.stringify(updatedUsers), { expires: 7 });

    setMessage("Signup successful! Redirecting to login...");
    setTimeout(() => navigate("/login"), 2000);
  };

  return (
    <div className="container d-flex align-items-center justify-content-center min-vh-100">
      <div className="card p-4 shadow" style={{ maxWidth: 400 }}>
        <h3 className="text-center mb-3">Create Account</h3>

        {message && (
          <div
            className={`alert ${
              message.startsWith("Signup successful") ? "alert-success" : "alert-danger"
            }`}
          >
            {message}
          </div>
        )}

        <form onSubmit={handleSignup}>
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
            Sign Up
          </button>
        </form>

        <div className="mt-3 text-center">
          Already have an account?{" "}
          <button className="btn btn-link p-0" onClick={() => navigate("/login")}>
            Login here
          </button>
        </div>
      </div>
    </div>
  );
};

export default Signup;
