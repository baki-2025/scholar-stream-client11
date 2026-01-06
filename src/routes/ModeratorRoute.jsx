import { Navigate } from "react-router";
import useRole from "../hooks/useRole";
import Loading from "../Components/Loading";

const ModeratorRoute = ({ children }) => {
  const { role, roleLoading } = useRole();

  if (roleLoading) return <Loading />;

  if (role !== "moderator") {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};

export default ModeratorRoute;
