// import { useEffect } from "react";
// import { useNavigate } from "react-router";
// import useRole from "../../hooks/useRole";
// import Loading from "../../Components/Loading";

// const DashboardHome = () => {
//   const { role, roleLoading } = useRole();
//   const navigate = useNavigate();

//   useEffect(() => {
//     if (!roleLoading) {
//       if (role === "admin") {
//         navigate("/dashboard/admin", { replace: true });
//       } else if (role === "moderator") {
//         navigate("/dashboard/moderator", { replace: true });
//       } else if (role === "student") {
//         navigate("/dashboard/student", { replace: true });
//       }
//     }
//   }, [role, roleLoading, navigate]);

//   if (roleLoading) {
//     return <Loading />;
//   }

//   return null;
// };

// export default DashboardHome;





import { Navigate } from "react-router";
import useRole from "../../hooks/useRole";
import Loading from "../../Components/Loading";

const DashboardHome = () => {
  const { role, roleLoading } = useRole();

  if (roleLoading) return <Loading />;

  if (role === "admin") return <Navigate to="/dashboard/admin" replace />;
  if (role === "moderator") return <Navigate to="/dashboard/moderator" replace />;
  if (role === "student") return <Navigate to="/dashboard/student" replace />;

  return null;
};

export default DashboardHome;
