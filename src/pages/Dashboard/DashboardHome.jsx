import useRole from "../../hooks/useRole";
import AdminDashboard from "./AdminDashboard";
import ModeratorDashboard from "./ModeratorDashboard ";
import StudentDashboard from "./StudentDashboard";

const DashboardHome = () => {
    const { role, roleLoading } = useRole();

    if (roleLoading) {
        return <Loading />;
    }

    switch (role) {
        case 'admin':
            return <AdminDashboard />;
        case 'moderator':
            return <ModeratorDashboard />;
        default:
            return <StudentDashboard />;
    }
};

export default DashboardHome;
