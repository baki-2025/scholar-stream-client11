import React from "react";
import { Link, NavLink, useNavigate } from "react-router";
import useAuth from "../../../hooks/useAuth";

const Navbar = () => {
  const { user, logOut } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logOut();
      navigate("/login"); // ✅ redirect after logout
    } catch (error) {
      console.error(error);
    }
  };

  const links = (
  <>
    <li><NavLink to="/">Home</NavLink></li>
    <li><NavLink to="/scholarships">All Scholarships</NavLink></li>
    <li><NavLink to="scholarships/:id">Scholarship Details</NavLink></li>

    {user && (
      <>
        <li><NavLink to="/dashboard">Dashboard</NavLink></li>
      </>
    )}

    <li><NavLink to="/stories">Success Stories</NavLink></li>
    <li><NavLink to="/contact">Contact Us</NavLink></li>
  </>
);


  return (
    <div className="navbar bg-base-100 shadow-md px-4">
      {/* LEFT */}
      <div className="navbar-start">
        <Link to="/" className="btn btn-ghost text-xl font-bold">
          ScholarStream
        </Link>
      </div>

      {/* CENTER */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{links}</ul>
      </div>

      {/* RIGHT */}
      <div className="navbar-end gap-2">
        {user ? (
          <button onClick={handleLogout} className="btn btn-outline">
            Logout
          </button>
        ) : (
          <>
            <Link to="/login" className="btn btn-outline">Login</Link>
            <Link to="/register" className="btn btn-outline">Register</Link>
          </>
        )}

        <Link to="/scholarships" className="btn btn-secondary text-white">
          Apply Now
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
