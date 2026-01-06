import { Outlet } from "react-router";

const ModeratorDashboard = () => {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Moderator Dashboard</h2>
      <Outlet />
    </div>
  );
};

export default ModeratorDashboard;
