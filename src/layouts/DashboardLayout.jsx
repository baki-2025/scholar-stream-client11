import { NavLink, Outlet } from "react-router";
import useRole from "../hooks/useRole";
import Loading from "../Components/Loading";
import { FcDepartment } from "react-icons/fc";

const DashboardLayout = () => {
  const { role, roleLoading } = useRole();

  if (roleLoading) {
    return <Loading />;
  }

  return (
    <div className="flex min-h-screen">
      <div className="drawer lg:drawer-open">
        <input id="dashboard-drawer" type="checkbox" className="drawer-toggle" />

        {/* ===== Main Content ===== */}
        <div className="drawer-content flex flex-col">
          {/* Navbar */}
          <nav className="navbar bg-base-300">
            <label
              htmlFor="dashboard-drawer"
              className="btn btn-square btn-ghost lg:hidden"
            >
              ☰
            </label>
            <span className="text-lg font-semibold px-4">
              ScholarStream Dashboard
            </span>
          </nav>

          {/* Page Content */}
          <div className="p-4">
            <Outlet />
          </div>
        </div>

        {/* ===== Sidebar ===== */}
        <div className="drawer-side">
          <label
            htmlFor="dashboard-drawer"
            className="drawer-overlay"
          ></label>

          <ul className="menu w-64 min-h-full bg-base-200 p-4">
            {/* Common Links */}
            <li>
              <NavLink to="/"><FcDepartment /> Home</NavLink>
            </li>

            <li>
              <NavLink to="/dashboard/my-profile">👤 My Profile</NavLink>
            </li>

           {/* ===== Admin Menu ===== */}
{role === "admin" && (
  <>
    <li className="menu-title text-3xl text-violet-500 font-bold">Admin</li>
    
    <li>
      <NavLink to="/dashboard/admin/add-scholarship">
        ➕ Add Scholarship
      </NavLink>
    </li>
    <li>
      <NavLink to="/dashboard/admin/manage-scholarships">
        📚 Manage Scholarships
      </NavLink>
    </li>
    <li>
      <NavLink to="/dashboard/admin/manage-users">
        👥 Manage Users
      </NavLink>
    </li>
    <li>
      <NavLink to="/dashboard/admin/analytics">
        📊 Analytics
      </NavLink>
    </li>
  </>
)}

{/* ===== Moderator Menu ===== */}
{role === "moderator" && (
  <>
    <li className="menu-title text-3xl text-green-500 font-bold">Moderator</li>
    

    <li>
      <NavLink to="/dashboard/moderator/manage-applications">
        📝 Manage Applications
      </NavLink>
    </li>
    <li>
      <NavLink to="/dashboard/moderator/all-reviews">
        ⭐ All Reviews
      </NavLink>
    </li>
  </>
)}

{/* ===== Student Menu ===== */}
{role === "student" && (
  <>
    <li className="menu-title text-3xl text-blue-500 font-bold">Student</li>
    
    <li>
      <NavLink to="/dashboard/student/my-applications">
        📄 My Applications
      </NavLink>
    </li>
    <li>
      <NavLink to="/dashboard/student/my-reviews">
        ✍️ My Reviews
      </NavLink>
    </li>
  </>
)}

          </ul>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
