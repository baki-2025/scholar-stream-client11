import React from "react";
import useAuth from "../../hooks/useAuth";

const DashboardHome = () => {
  const { user } = useAuth();

  return (
    <div className="p-6">
      {/* Welcome */}
      <div className="bg-primary text-black rounded-xl p-6 mb-6 shadow">
        <h2 className="text-2xl font-bold">
          Welcome, {user?.displayName || "User"} 👋
        </h2>
        <p className="mt-2">
          Manage your scholarships, applications, and profile from here.
        </p>
      </div>

      {/* Quick Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Profile */}
        <div className="card bg-base-100 shadow">
          <div className="card-body">
            <h3 className="card-title">Profile</h3>
            <p>View and update your personal information</p>
          </div>
        </div>

        {/* Applications */}
        <div className="card bg-base-100 shadow">
          <div className="card-body">
            <h3 className="card-title">Applications</h3>
            <p>Track your scholarship application status</p>
          </div>
        </div>

        {/* Scholarships */}
        <div className="card bg-base-100 shadow">
          <div className="card-body">
            <h3 className="card-title">Scholarships</h3>
            <p>Explore and apply for available scholarships</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;
