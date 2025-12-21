import { Outlet, Link } from "react-router";

const StudentDashboard = () => {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <div className="w-64 bg-base-200 p-4 flex flex-col gap-4">
        <h2 className="text-2xl font-bold mb-4">Student Dashboard</h2>
        <Link to="/student/my-profile" className="btn btn-outline w-full">My Profile</Link>
        <Link to="/student/my-applications" className="btn btn-outline w-full">My Applications</Link>
        <Link to="/student/my-reviews" className="btn btn-outline w-full">My Reviews</Link>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6 bg-base-100">
        <Outlet />
      </div>
    </div>
  );
};

export default StudentDashboard;
