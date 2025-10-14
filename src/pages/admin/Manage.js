import React from "react";

export default function Manage() {
  const stats = {
    totalUsers: 248,
    totalRides: 583,
    activeUsers: 187,
  };

  return (
    <div className="page-container">
      <h2>Manage Overview</h2>
      <div className="stats-grid">
        <div className="stat-card">
          <h3>Total Users</h3>
          <p>{stats.totalUsers}</p>
        </div>
        <div className="stat-card">
          <h3>Total Rides</h3>
          <p>{stats.totalRides}</p>
        </div>
        <div className="stat-card">
          <h3>Active Users</h3>
          <p>{stats.activeUsers}</p>
        </div>
      </div>
    </div>
  );
}
