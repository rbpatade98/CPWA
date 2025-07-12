import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="container text-center mt-5">
      <h1>Welcome to Customer Portal</h1>
      <p className="lead">Please login or signup to continue.</p>
      <Link to="/login" className="btn btn-primary me-2">Login</Link>
      <Link to="/signup" className="btn btn-secondary">Signup</Link>
    </div>
  );
};

export default Home;
