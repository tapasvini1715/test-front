import React from "react";
import { Link } from "react-router-dom";

export default function Dashboard() {
  return (
    <div className="page-container">
      <h2>User Dashboard</h2>
      <div className="dashboard-links">
        <Link to="/user/profile">Profile</Link>
        <Link to="/user/book-ride">Book a Ride</Link>
        <Link to="/user/about">About</Link>
        <Link to="/user/previous-rides">Previous Rides</Link>
      </div>
    </div>
  );
}
