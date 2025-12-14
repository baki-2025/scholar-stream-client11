import { NavLink } from "react-router";
import useAuth from "../hooks/useAuth";

const Sidebar = () => {
  const { user, role } = useAuth(); // role = admin | moderator | student

  return (
    <div className="w-64 bg-base-200 p-5">
      <h2 className="text-xl font-bold mb-4">Dashboard</h2>

      {role === "admin" && (
        <>
          <NavLink to="/dashboard/admin-profile">My Profile</NavLink>
          <NavLink to="/dashboard/add-scholarship">Add Scholarship</NavLink>
          <NavLink to="/dashboard/manage-scholarships">Manage Scholarships</NavLink>
          <NavLink to="/dashboard/manage-users">Manage Users</NavLink>
          <NavLink to="/dashboard/analytics">Analytics</NavLink>
        </>
      )}

      {role === "moderator" && (
        <>
          <NavLink to="/dashboard/moderator-profile">My Profile</NavLink>
          <NavLink to="/dashboard/manage-applications">Manage Applications</NavLink>
          <NavLink to="/dashboard/all-reviews">All Reviews</NavLink>
        </>
      )}

      {role === "student" && (
        <>
          <NavLink to="/dashboard/student-profile">My Profile</NavLink>
          <NavLink to="/dashboard/my-applications">My Applications</NavLink>
          <NavLink to="/dashboard/my-reviews">My Reviews</NavLink>
        </>
      )}
    </div>
  );
};

export default Sidebar;
