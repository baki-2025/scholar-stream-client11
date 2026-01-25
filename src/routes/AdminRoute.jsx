import { Navigate } from "react-router";
import useRole from "../hooks/useRole";
import Loading from "../Components/Loading";

const AdminRoute = ({ children }) => {
  const { role, roleLoading } = useRole();
console.log(role)
  if (roleLoading) return <Loading />;

  if (role !== "admin") {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};

export default AdminRoute;
