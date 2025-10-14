import React from "react";
import { Link } from "react-router-dom";
import UserNavbar from "../../components/UserNavbar";

export default function Dashboard() {
  return (
    <>
      <UserNavbar />
      <div className="mr-section container">
        <h2 className="mr-page-title">User Dashboard</h2>

        <div className="mr-grid">
          <Link to="/user/profile" className="mr-card mr-btn">Profile</Link>
          <Link to="/user/book-ride" className="mr-card mr-btn">Book a Ride</Link>
          <Link to="/user/about" className="mr-card mr-btn">About</Link>
          <Link to="/user/previous-rides" className="mr-card mr-btn">Previous Rides</Link>
        </div>
      </div>
    </>
  );
}
