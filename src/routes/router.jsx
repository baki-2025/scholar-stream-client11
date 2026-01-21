import { createBrowserRouter } from "react-router";
import MainLayout from "../layouts/MainLayout";
import DashboardLayout from "../layouts/DashboardLayout";
import PrivateRoute from "./PrivateRoute";
import AdminRoute from "./AdminRoute";
import ModeratorRoute from "./ModeratorRoute";
import StudentRoute from "./StudentRoute";
import NotFound from "../pages/NotFound/NotFound";
import Home from "../pages/Home/Home/Home";
import AllScholarships from "../pages/AllScholarships/AllScholarships";
import Login from "../pages/Auth/Login/Login";
import Register from "../pages/Auth/Register/Register";
import PaymentFailed from "../pages/Payment/PaymentFailed";
import DashboardHome from "../pages/Dashboard/DashboardHome";
import AdminDashboard from "../pages/Dashboard/AdminDashboard";
import StudentDashboard from "../pages/Dashboard/StudentDashboard";

// Admin pages
import AddScholarship from "../pages/Dashboard/Admin/AddScholarship";
import ManageScholarships from "../pages/Dashboard/Admin/ManageScholarships";
import ManageUsers from "../pages/Dashboard/Admin/ManageUsers";
import Analytics from "../pages/Dashboard/Admin/Analytics";

// Moderator pages
import ManageApplications from "../pages/Dashboard/Moderator/ManageApplications";
import AllReviews from "../pages/Dashboard/Moderator/AllReviews";

// Student pages
import MyApplications from "../pages/Dashboard/Student/MyApplications";
import MyReviews from "../pages/Dashboard/Student/MyReviews";
import MyProfile from "../pages/Dashboard/MyProfile";
import ModeratorDashboard from "../pages/Dashboard/ModeratorDashboard ";
import ScholarshipDetails from "../pages/ScholarshipDetails/ScholarshipDetails";
import PaymentSuccess from "../pages/Payment/PaymentSuccess";
import Payment from "../pages/Payment/Payment";



export const router = createBrowserRouter([
  // ===== PUBLIC PAGES =====
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <NotFound />,
    children: [
      { index: true, element: <Home /> },
      { path: "scholarships", element: <AllScholarships /> },
      { path: "scholarshipDetails/:id", element: <ScholarshipDetails /> },
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },

      {
  path: "payment/:scholarshipId/:applicationId",
  element: (
    <PrivateRoute>
      <Payment />
    </PrivateRoute>
  ),
},

    ],
  },

  // ===== STRIPE CALLBACK ROUTES (TOP LEVEL) =====
  {
    path: "/payment-success",
    element: <PaymentSuccess />,
  },
  {
    path: "/payment-failed",
    element: <PaymentFailed />,
  },

  // ===== DASHBOARD =====
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    errorElement: <NotFound />,
    children: [
      { index: true, element: <DashboardHome /> },
      { path: "my-profile", element: <MyProfile /> },

      {
        path: "admin",
        element: (
          <AdminRoute>
            <AdminDashboard />
          </AdminRoute>
        ),
        children: [
          { path: "add-scholarship", element: <AddScholarship /> },
          { path: "manage-scholarships", element: <ManageScholarships /> },
          { path: "manage-users", element: <ManageUsers /> },
          { path: "analytics", element: <Analytics /> },
        ],
      },

      {
        path: "moderator",
        element: (
          <ModeratorRoute>
            <ModeratorDashboard />
          </ModeratorRoute>
        ),
        children: [
          { path: "manage-applications", element: <ManageApplications /> },
          { path: "all-reviews", element: <AllReviews /> },
        ],
      },

      {
        path: "student",
        element: (
          <StudentRoute>
            <StudentDashboard />
          </StudentRoute>
        ),
        children: [
          { path: "my-applications", element: <MyApplications /> },
          { path: "my-reviews", element: <MyReviews /> },
        ],
      },
    ],
  },
]);


export default router;
