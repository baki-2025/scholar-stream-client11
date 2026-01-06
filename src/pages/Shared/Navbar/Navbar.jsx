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
      navigate("/login")
    } catch (error) {
      console.error(error);
    }
  };

  const links = (
  <>
    <li><NavLink to="/" className='text-2xl text-sky-300 font-semibold'>Home</NavLink></li>
    <li><NavLink to="/scholarships"className='text-2xl text-green-300 font-semibold'>All Scholarships</NavLink></li>
    

    {user && (
      <>
        <li><NavLink to="/dashboard" className="text-2xl text-violet-400 font-semibold">Dashboard</NavLink></li>
      </>
    )}

    
  </>
);


  return (
    <div className="navbar bg-base-100 shadow-md px-4">
      {/* LEFT */}
      <div className="navbar-start">
        
        <Link to="/" className="btn text-2xl text-red-200 font-semibold">
        <FcDepartment />
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
          <button onClick={handleLogout} className="btn text-2xl text-violet-400 font-semibold">
            Logout
          </button>
        ) : (
          <>
            <Link to="/login" className="btn text-2xl text-violet-400 font-semibold">Login</Link>
            <Link to="/register" className="btn text-2xl text-violet-400 font-semibold">Register</Link>
          </>
        )}

        <Link to="/scholarships" className="btn text-2xl text-yellow-400 font-semibold">
          Apply Now
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
