import React from "react";
import { Link } from "react-router";

const StudentDashboardHome = () => {
  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-2">Student Dashboard</h2>
      <p className="text-gray-600 mb-6">
        Manage your profile, applications, and reviews.
      </p>

      {/* Dashboard Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

        {/* Student Profile */}
        <div className="card bg-base-100 shadow">
          <div className="card-body">
            <h3 className="card-title">My Profile</h3>
            <p>View and update your profile information</p>
            <Link
              to="/dashboard/student-profile"
              className="btn btn-sm btn-primary"
            >
              Open
            </Link>
          </div>
        </div>

        {/* My Applications */}
        <div className="card bg-base-100 shadow">
          <div className="card-body">
            <h3 className="card-title">My Applications</h3>
            <p>Track your scholarship applications</p>
            <Link
              to="/dashboard/my-applications"
              className="btn btn-sm btn-primary"
            >
              View
            </Link>
          </div>
        </div>

        {/* My Reviews */}
        <div className="card bg-base-100 shadow">
          <div className="card-body">
            <h3 className="card-title">My Reviews</h3>
            <p>Manage your scholarship reviews</p>
            <Link
              to="/dashboard/my-reviews"
              className="btn btn-sm btn-primary"
            >
              Manage
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
};

export default StudentDashboardHome;
