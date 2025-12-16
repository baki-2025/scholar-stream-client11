
import Loading from '../../Components/Loading';
import useRole from '../../hooks/useRole';
import AdminDashboardHome from './Admin/AdminDashboardHome';
import ModeratorDashboardHome from './Moderator/ModeratorDashboardHome';
import StudentDashboardHome from './Student/StudentDashboardHome';

const DashboardHome = () => {
    const { role, roleLoading } = useRole();

    if (roleLoading) {
        return <Loading />;
    }

    if (role === 'admin') {
        return <AdminDashboardHome />;
    } else if (role === 'moderator') {  // corrected
        return <ModeratorDashboardHome />;
    } else {
        return <StudentDashboardHome />;
    }
};

export default DashboardHome;
