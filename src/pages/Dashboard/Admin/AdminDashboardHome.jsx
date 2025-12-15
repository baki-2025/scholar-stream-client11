import React from "react";
import { Link } from "react-router";

const AdminDashboardHome = () => {
  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-2">Admin Dashboard</h2>
      <p className="text-gray-600 mb-6">
        Control users, scholarships, applications, and analytics from here.
      </p>

      {/* Dashboard Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        
        {/* Admin Profile */}
        <div className="card bg-base-100 shadow">
          <div className="card-body">
            <h3 className="card-title">My Profile</h3>
            <p>View and update admin profile</p>
            <Link
              to="/dashboard/admin-profile"
              className="btn btn-sm btn-primary"
            >
              Open
            </Link>
          </div>
        </div>

        {/* Add Scholarship */}
        <div className="card bg-base-100 shadow">
          <div className="card-body">
            <h3 className="card-title">Add Scholarship</h3>
            <p>Create a new scholarship</p>
            <Link
              to="/dashboard/add-scholarship"
              className="btn btn-sm btn-primary"
            >
              Add
            </Link>
          </div>
        </div>

        {/* Manage Scholarships */}
        <div className="card bg-base-100 shadow">
          <div className="card-body">
            <h3 className="card-title">Manage Scholarships</h3>
            <p>Edit or delete scholarships</p>
            <Link
              to="/dashboard/manage-scholarships"
              className="btn btn-sm btn-primary"
            >
              Manage
            </Link>
          </div>
        </div>

        {/* Manage Users */}
        <div className="card bg-base-100 shadow">
          <div className="card-body">
            <h3 className="card-title">Manage Users</h3>
            <p>Control user roles & access</p>
            <Link
              to="/dashboard/manage-users"
              className="btn btn-sm btn-primary"
            >
              Manage
            </Link>
          </div>
        </div>

        {/* Analytics */}
        <div className="card bg-base-100 shadow">
          <div className="card-body">
            <h3 className="card-title">Analytics</h3>
            <p>View system statistics</p>
            <Link
              to="/dashboard/analytics"
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

export default AdminDashboardHome;
