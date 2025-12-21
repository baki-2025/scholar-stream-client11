import { createBrowserRouter } from "react-router";
import MainLayout from "../layouts/MainLayout";
import DashboardLayout from "../layouts/DashboardLayout";
import PrivateRoute from "./PrivateRoute";


import NotFound from "../pages/NotFound/NotFound";
import Home from "../pages/Home/Home/Home";
import AllScholarships from "../pages/AllScholarships/AllScholarships";
import ScholarshipDetails from "../pages/ScholarshipDetails/ScholarshipDetails";
import Login from "../pages/Auth/Login/Login";
import Register from "../pages/Auth/Register/Register";
import Checkout from "../pages/Payment/Checkout";
import PaymentSuccess from "../pages/Payment/PaymentSuccess";
import PaymentFailed from "../pages/Payment/PaymentFailed";
import DashboardHome from "../pages/Dashboard/DashboardHome";
import AdminDashboard from "../pages/Dashboard/AdminDashboard";

import StudentDashboard from "../pages/Dashboard/StudentDashboard";
import ModeratorDashboard from "../pages/Dashboard/ModeratorDashboard ";
import AdminRoute from "./AdminRoute";
import ModeratorRoute from "./ModeratorRoute";
import StudentRoute from "./StudentRoute";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <NotFound />,
    children: [
      { index: true, element: <Home /> },
      { path: "/scholarships", element: <AllScholarships /> },
      { path: "/scholarships/:id", element: <ScholarshipDetails /> },
      { path: "/login", element: <Login /> },
      { path: "/register", element: <Register /> },
      {
        path: "/checkout/:id",
        element: (
          <PrivateRoute>
            <Checkout />
          </PrivateRoute>
        ),
      },
      { path: "/payment/success", element: <PaymentSuccess /> },
      { path: "/payment/failed", element: <PaymentFailed /> },
    ],
  },
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
      {
        path: "admin",
        element: (
          <AdminRoute>
            <AdminDashboard />
          </AdminRoute>
        ),
      },
      {
        path: "moderator",
        element: (
          <ModeratorRoute>
            <ModeratorDashboard />
          </ModeratorRoute>
        ),
      },
      {
        path: "student",
        element: (
          <StudentRoute>
            <StudentDashboard />
          </StudentRoute>
        ),
      },
    ],
  },
]);

export default router;
