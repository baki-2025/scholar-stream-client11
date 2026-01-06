import { Outlet } from "react-router";

const AdminDashboard = () => {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Admin Dashboard</h2>
      <Outlet />
    </div>
  );
};

export default AdminDashboard;
