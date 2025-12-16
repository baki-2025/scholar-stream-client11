import { Outlet, Link } from "react-router";

const ModeratorDashboard = () => {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <div className="w-64 bg-base-200 p-4 flex flex-col gap-4">
        <h2 className="text-2xl font-bold mb-4">Moderator Dashboard</h2>
        <Link to="/moderator/manage-applications" className="btn btn-outline w-full">
          Manage Applications
        </Link>
        <Link to="/moderator/manage-reviews" className="btn btn-outline w-full">
          Manage Reviews
        </Link>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6 bg-base-100">
        <Outlet />
      </div>
    </div>
  );
};

export default ModeratorDashboard;
