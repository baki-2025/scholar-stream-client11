import { createBrowserRouter } from "react-router";
import MainLayout from "../layouts/MainLayout";
import DashboardLayout from "../layouts/DashboardLayout";
import PrivateRoute from "./PrivateRoute";
import NotFound from "../pages/NotFound/NotFound";
import Home from "../pages/Home/Home/Home";
import AllScholarships from "../pages/All Scholarships/All Scholarships";
import ScholarshipDetails from "../pages/ScholarshipDetails/ScholarshipDetails";
import AuthLayout from "../layouts/AuthLayout";
import Login from "../pages/Auth/Login/Login";
import Register from "../pages/Auth/Register/Register";
import DashboardHome from "../pages/Dashboard/DashboardHome";
import AdminProfile from "../pages/Dashboard/Admin/AdminProfile";
import AddScholarship from "../pages/Dashboard/Admin/AddScholarship";
import ManageScholarships from "../pages/Dashboard/Admin/ManageScholarships";
import ManageUsers from "../pages/Dashboard/Admin/ManageUsers";
import Analytics from "../pages/Dashboard/Admin/Analytics";
import ModeratorProfile from "../pages/Dashboard/Moderator/ModeratorProfile";
import ManageApplications from "../pages/Dashboard/Moderator/ManageApplications";
import AllReviews from "../pages/Dashboard/Moderator/AllReviews";
import StudentProfile from "../pages/Dashboard/Student/StudentProfile";
import MyApplications from "../pages/Dashboard/Student/MyApplications";
import MyReviews from "../pages/Dashboard/Student/MyReviews";

// pages imports omitted for brevity...

export const router = createBrowserRouter([
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
     
    ],
  },
  //   {
  //   path: "/auth",
  //   element: <AuthLayout />,
  //   children: [
  //     { path: "login", element: <Login /> },
  //     { path: "register", element: <Register /> },
  //   ],
  // },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    children: [
      { index: true, element: <DashboardHome /> },

      // Admin
      { path: "admin-profile", element: <AdminProfile /> },
      { path: "add-scholarship", element: <AddScholarship /> },
      { path: "manage-scholarships", element: <ManageScholarships /> },
      { path: "manage-users", element: <ManageUsers /> },
      { path: "analytics", element: <Analytics /> },

      // Moderator
      { path: "moderator-profile", element: <ModeratorProfile /> },
      { path: "manage-applications", element: <ManageApplications /> },
      { path: "all-reviews", element: <AllReviews /> },

      // Student
      { path: "student-profile", element: <StudentProfile /> },
      { path: "my-applications", element: <MyApplications /> },
      { path: "my-reviews", element: <MyReviews /> },
    ],
  },
]);
