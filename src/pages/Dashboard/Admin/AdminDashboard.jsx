import { Outlet, Link } from "react-router";

const AdminDashboard = () => {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <div className="w-64 bg-base-200 p-4 flex flex-col gap-4">
        <h2 className="text-2xl font-bold mb-4">Admin Dashboard</h2>
        <Link to="/dashboard/add-scholarship" className="btn btn-outline w-full">Add Scholarship</Link>
        <Link to="/dashboard/manage-scholarships" className="btn btn-outline w-full">Manage Scholarships</Link>
        <Link to="/dashboard/manage-users" className="btn btn-outline w-full">Manage Users</Link>
        <Link to="/dashboard/analytics" className="btn btn-outline w-full">Analytics</Link>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6 bg-base-100">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminDashboard;
