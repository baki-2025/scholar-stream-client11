import { NavLink } from "react-router"; // <- use react-router-dom for v5
import useAuth from "../hooks/useAuth";

const Sidebar = () => {
  const { user, role } = useAuth(); // role = admin | moderator | student

  return (
    <div className="w-64 bg-base-200 p-5 min-h-screen">
      <h2 className="text-xl font-bold mb-4">Dashboard</h2>

      {role === "admin" && (
        <>
          <NavLink 
            to="/dashboard/admin-profile" 
            activeClassName="text-blue-500 font-semibold"
            className="block mb-2"
          >
            My Profile
          </NavLink>
          <NavLink 
            to="/dashboard/add-scholarship" 
            activeClassName="text-blue-500 font-semibold"
            className="block mb-2"
          >
            Add Scholarship
          </NavLink>
          <NavLink 
            to="/dashboard/manage-scholarships" 
            activeClassName="text-blue-500 font-semibold"
            className="block mb-2"
          >
            Manage Scholarships
          </NavLink>
          <NavLink 
            to="/dashboard/manage-users" 
            activeClassName="text-blue-500 font-semibold"
            className="block mb-2"
          >
            Manage Users
          </NavLink>
          <NavLink 
            to="/dashboard/analytics" 
            activeClassName="text-blue-500 font-semibold"
            className="block mb-2"
          >
            Analytics
          </NavLink>
        </>
      )}

      {role === "moderator" && (
        <>
          <NavLink 
            to="/dashboard/moderator-profile" 
            activeClassName="text-blue-500 font-semibold"
            className="block mb-2"
          >
            My Profile
          </NavLink>
          <NavLink 
            to="/dashboard/manage-applications" 
            activeClassName="text-blue-500 font-semibold"
            className="block mb-2"
          >
            Manage Applied Applications
          </NavLink>
          <NavLink 
            to="/dashboard/all-reviews" 
            activeClassName="text-blue-500 font-semibold"
            className="block mb-2"
          >
            All Reviews
          </NavLink>
        </>
      )}

      {role === "student" && (
        <>
          <NavLink 
            to="/dashboard/student-profile" 
            activeClassName="text-blue-500 font-semibold"
            className="block mb-2"
          >
            My Profile
          </NavLink>
          <NavLink 
            to="/dashboard/my-applications" 
            activeClassName="text-blue-500 font-semibold"
            className="block mb-2"
          >
            My Applications
          </NavLink>
          <NavLink 
            to="/dashboard/my-reviews" 
            activeClassName="text-blue-500 font-semibold"
            className="block mb-2"
          >
            My Reviews
          </NavLink>
        </>
      )}
    </div>
  );
};

export default Sidebar;
