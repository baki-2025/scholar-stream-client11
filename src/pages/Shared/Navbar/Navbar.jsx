// import React from "react";
// import { Link, NavLink } from "react-router";
// import useAuth from "../../../hooks/useAuth";

// const Navbar = () => {
//   const { user, logout } = useAuth();

//   const handleLogout = () => {
//     logout();
//   };

//   const links = (
//     <>
//       <li>
//         <NavLink to="/">Home</NavLink>
//       </li>

//       <li>
//         <NavLink to="/scholarships">All Scholarships</NavLink>
//       </li>

//       {user && (
//         <>
//           <li>
//             <NavLink to="/dashboard">Dashboard</NavLink>
//           </li>
//           <li>
//             <NavLink to="/dashboard/my-applications">
//               My Applications
//             </NavLink>
//           </li>
//         </>
//       )}

//       <li>
//         <NavLink to="/stories">Success Stories</NavLink>
//       </li>

//       <li>
//         <NavLink to="/contact">Contact Us</NavLink>
//       </li>
//     </>
//   );

//   return (
//     <div className="navbar bg-base-100 shadow-md px-4">
//       {/* LEFT */}
//       <div className="navbar-start">
//         <div className="dropdown">
//           <label tabIndex={0} className="btn btn-ghost lg:hidden">
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               className="h-5 w-5"
//               fill="none"
//               viewBox="0 0 24 24"
//               stroke="currentColor"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth="2"
//                 d="M4 6h16M4 12h16M4 18h16"
//               />
//             </svg>
//           </label>

//           <ul
//             tabIndex={0}
//             className="menu menu-sm dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52 z-10"
//           >
//             {links}
//           </ul>
//         </div>

//         <Link to="/" className="btn btn-ghost text-xl font-bold">
//           ScholarStream
//         </Link>
//       </div>

//       {/* CENTER */}
//       <div className="navbar-center hidden lg:flex">
//         <ul className="menu menu-horizontal px-1">{links}</ul>
//       </div>

//       {/* RIGHT */}
//       <div className="navbar-end gap-2">
//         {user ? (
//           <button onClick={handleLogout} className="btn btn-outline">
//             Logout
//           </button>
//         ) : (
//           <>
//             <Link to="/login" className="btn btn-outline">
//               Login
//             </Link>
//             <Link to="/register" className="btn btn-outline">
//               Register
//             </Link>
//           </>
//         )}

//         <Link to="/scholarships" className="btn btn-primary text-black">
//           Apply Now
//         </Link>
//       </div>
//     </div>
//   );
// };

// export default Navbar;




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

      {user && (
        <>
          <li><NavLink to="/dashboard">Dashboard</NavLink></li>
          <li>
            <NavLink to="/dashboard/my-applications">
              My Applications
            </NavLink>
          </li>
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

        <Link to="/scholarships" className="btn btn-primary text-black">
          Apply Now
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
