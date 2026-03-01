import React from "react";
import { Link, NavLink, useNavigate } from "react-router";
import useAuth from "../../../hooks/useAuth";
import { FcDepartment } from "react-icons/fc";

const Navbar = () => {
  const { user, logOut } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logOut();
      navigate("/login");
    } catch (error) {
      console.error(error);
    }
  };

  const links = (
    <>
      <li>
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? "text-primary text-2xl font-bold" : "font-semibold text-2xl"
          }
        >
          Home
        </NavLink>
      </li>

      <li>
        <NavLink
          to="/scholarships"
          className={({ isActive }) =>
            isActive ? "text-primary text-2xl font-bold" : "font-semibold text-2xl"
          }
        >
          All Scholarships
        </NavLink>
      </li>

      {user && (
        <li>
          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              isActive ? "text-primary text-2xl font-bold" : "font-semibold text-2xl"
            }
          >
            Dashboard
          </NavLink>
        </li>
      )}
    </>
  );

  return (
    <div className="navbar bg-base-100 shadow-md px-4 md:px-6 lg:px-8">

      {/* LEFT */}
      <div className="navbar-start">

        {/* Mobile Menu */}
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>

          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
          >
            {links}
          </ul>
        </div>

        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-2 text-lg sm:text-xl md:text-2xl font-bold"
        >
          <FcDepartment className="text-2xl sm:text-3xl" />
          ScholarStream
        </Link>
      </div>

      {/* CENTER - Desktop */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 gap-4">
          {links}
        </ul>
      </div>

      {/* RIGHT */}
      <div className="navbar-end gap-2 flex-wrap">

        {user ? (
          <button
            onClick={handleLogout}
            className="btn btn-error text-2xl btn-sm sm:btn-md"
          >
            Logout
          </button>
        ) : (
          <>
            <Link
              to="/login"
              className="btn btn-success text-2xl btn-sm sm:btn-md"
            >
              Login
            </Link>

            <Link
              to="/register"
              className="btn btn-warning text-2xl btn-sm sm:btn-md"
            >
              Register
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
