import { createBrowserRouter } from "react-router";

// layouts
import MainLayout from "../layouts/MainLayout";
import DashboardLayout from "../layouts/DashboardLayout";

// route guards
import PrivateRoute from "./PrivateRoute";
import RoleRoute from "./RoleRoute";

// public pages
import Home from "../pages/Home/Home/Home";
import AllScholarships from "../pages/AllScholarships/AllScholarships";
import ScholarshipDetails from "../pages/ScholarshipDetails/ScholarshipDetails";
import Login from "../pages/Auth/Login/Login";
import Register from "../pages/Auth/Register/Register";
import NotFound from "../pages/NotFound/NotFound";

// payment
import Checkout from "../pages/Payment/Checkout";
import PaymentSuccess from "../pages/Payment/PaymentSuccess";
import PaymentFailed from "../pages/Payment/PaymentFailed";

// dashboard common
import DashboardHome from "../pages/dashboard/DashboardHome";

// admin
import AdminProfile from "../pages/Dashboard/Admin/AdminProfile";
import AddScholarship from "../pages/Dashboard/Admin/AddScholarship";
import ManageScholarships from "../pages/Dashboard/Admin/ManageScholarships";
import ManageUsers from "../pages/Dashboard/Admin/ManageUsers";
import Analytics from "../pages/Dashboard/Admin/Analytics";

// moderator
import ModeratorProfile from "../pages/Dashboard/Moderator/ModeratorProfile";
import ManageApplications from "../pages/Dashboard/Moderator/ManageApplications";
import AllReviews from "../pages/Dashboard/Moderator/AllReviews";

// student
import StudentProfile from "../pages/Dashboard/Student/StudentProfile";
import MyApplications from "../pages/Dashboard/Student/MyApplications";
import MyReviews from "../pages/Dashboard/Student/MyReviews";

export const router = createBrowserRouter([
  // ================= MAIN LAYOUT =================
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <NotFound />,
    children: [
      { index: true, element: <Home /> },
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
      { path: "scholarships", element: <AllScholarships /> },
      { path: "scholarships/:id", element: <ScholarshipDetails /> },

      // payment (private)
      {
        path: "checkout/:id",
        element: (
          <PrivateRoute>
            <Checkout />
          </PrivateRoute>
        ),
      },
      {
        path: "payment-success",
        element: (
          <PrivateRoute>
            <PaymentSuccess />
          </PrivateRoute>
        ),
      },
      {
        path: "payment-failed",
        element: (
          <PrivateRoute>
            <PaymentFailed />
          </PrivateRoute>
        ),
      },
    ],
  },

  // ================= DASHBOARD LAYOUT =================
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    children: [
      { index: true, element: <DashboardHome /> },

      // -------- ADMIN --------
      {
        element: <RoleRoute allowedRoles={["admin"]} />,
        children: [
          { path: "admin-profile", element: <AdminProfile /> },
          { path: "add-scholarship", element: <AddScholarship /> },
          { path: "manage-scholarships", element: <ManageScholarships /> },
          { path: "manage-users", element: <ManageUsers /> },
          { path: "analytics", element: <Analytics /> },
        ],
      },

      // -------- MODERATOR --------
      {
        element: <RoleRoute allowedRoles={["moderator"]} />,
        children: [
          { path: "moderator-profile", element: <ModeratorProfile /> },
          { path: "manage-applications", element: <ManageApplications /> },
          { path: "all-reviews", element: <AllReviews /> },
        ],
      },

      // -------- STUDENT --------
      {
        element: <RoleRoute allowedRoles={["user"]} />,
        children: [
          { path: "student-profile", element: <StudentProfile /> },
          { path: "my-applications", element: <MyApplications /> },
          { path: "my-reviews", element: <MyReviews /> },
        ],
      },
    ],
  },
]);
