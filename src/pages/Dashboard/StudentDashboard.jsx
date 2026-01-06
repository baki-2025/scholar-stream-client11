import { Outlet } from "react-router";

const StudentDashboard = () => {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Student Dashboard</h2>
      <Outlet />
    </div>
  );
};

export default StudentDashboard;
