import { Navigate } from "react-router";
import useRole from "../hooks/useRole";
import Loading from "../Components/Loading";

const StudentRoute = ({ children }) => {
  const { role, roleLoading } = useRole();

  if (roleLoading) return <Loading />;

  if (role !== "student") {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};

export default StudentRoute;
