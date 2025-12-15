import React from "react";
import { Link } from "react-router";

const ModeratorDashboardHome = () => {
  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-2">Moderator Dashboard</h2>
      <p className="text-gray-600 mb-6">
        Review applications, manage reviews, and maintain scholarship quality.
      </p>

      {/* Dashboard Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

        {/* Moderator Profile */}
        <div className="card bg-base-100 shadow">
          <div className="card-body">
            <h3 className="card-title">My Profile</h3>
            <p>View and update your moderator profile</p>
            <Link
              to="/dashboard/moderator-profile"
              className="btn btn-sm btn-primary"
            >
              Open
            </Link>
          </div>
        </div>

        {/* Manage Applications */}
        <div className="card bg-base-100 shadow">
          <div className="card-body">
            <h3 className="card-title">Manage Applications</h3>
            <p>Approve or reject scholarship applications</p>
            <Link
              to="/dashboard/manage-applications"
              className="btn btn-sm btn-primary"
            >
              Review
            </Link>
          </div>
        </div>

        {/* All Reviews */}
        <div className="card bg-base-100 shadow">
          <div className="card-body">
            <h3 className="card-title">All Reviews</h3>
            <p>View and moderate user reviews</p>
            <Link
              to="/dashboard/all-reviews"
              className="btn btn-sm btn-primary"
            >
              View
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
};

export default ModeratorDashboardHome;
