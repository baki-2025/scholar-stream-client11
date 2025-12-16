
import Loading from '../../Components/Loading';
import useRole from '../../hooks/useRole';
import AdminDashboard from './Admin/AdminDashboard';

import ModeratorDashboardHome from './Moderator/ModeratorDashboard';
import StudentDashboardHome from './Student/StudentDashboardHome';

const DashboardHome = () => {
    const { role, roleLoading } = useRole();

    if (roleLoading) {
        return <Loading />;
    }

    if (role === 'admin') {
        return <AdminDashboard />;
    } else if (role === 'moderator') {  // corrected
        return <ModeratorDashboardHome />;
    } else {
        return <StudentDashboardHome />;
    }
};

export default DashboardHome;
