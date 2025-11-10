import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { checkAuth } from "./Features/authslice";
import { fetchDoctorsAll } from "./Features/dashboardslice";
import { Toaster } from "react-hot-toast";

// Layouts & Components
import Layout from "./Layouts/Layout";
import ProtectedRoute from "./components/ProtectedRoute";
import ModalRoute from "./Components/ModalRoute";

// Pages
import Home from "./Pages/Home";
import Contact from "./Pages/Contact";
import About from "./Pages/About";
import OurDoctors from "./Pages/OurDoctors";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import Dashboard from "./Pages/Dashboard";
import MyAppointments from "./Pages/MyAppointments";
import MyCaseHistory from "./Pages/MyCaseHistory";
import MyProfile from "./Pages/MyProfile";
import DoctorAppointments from "./Pages/DoctorAppointment";
import ManageDoctors from "./Pages/ManageDoctors";
import ManagePatients from "./Pages/ManagePatients";
import StaffAppointments from "./Pages/StaffAppointments";
import DoctorProfile from "./Pages/DoctorProfile";


const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      // --- Public Routes ---
      { index: true, element: <Home /> },
      { path: "about", element: <About /> },
      { path: "contact", element: <Contact /> },
      { path: "our-doctors", element: <OurDoctors /> },
      { path: "login", element: <Login /> },
      { path: "signup", element: <Signup /> },

      // --- Patient Routes ---
      {
        path: "my-appointments",
        element: (
          <ProtectedRoute allowedRoles={["Patient"]}>
            <MyAppointments />
          </ProtectedRoute>
        ),
      },
      {
        path: "my-case-history",
        element: (
          <ProtectedRoute allowedRoles={["Patient"]}>
            <MyCaseHistory />
          </ProtectedRoute>
        ),
      },
      {
        path: "my-profile",
        element: (
          <ProtectedRoute allowedRoles={["Patient"]}>
            <MyProfile />
          </ProtectedRoute>
        ),
      },
    ],
  },

  // --- Doctor / Staff Dashboard ---
  {
    path: "/dashboard",
    element: (
      <ProtectedRoute allowedRoles={["Doctor", "Staff"]}>
        <Dashboard />
      </ProtectedRoute>
    ),
    children: [
      // Doctor Pages
      {
        path: "appointments",
        element: (
          <ProtectedRoute allowedRoles={["Doctor"]}>
            <DoctorAppointments />
          </ProtectedRoute>
        ),
      },
      {
        path: "case-history",
        element: (
          <ProtectedRoute allowedRoles={["Doctor"]}>
            <MyCaseHistory />
          </ProtectedRoute>
        ),
      },
            {
        path: "doc-profile",
        element: (
          <ProtectedRoute allowedRoles={["Doctor"]}>
            <DoctorProfile />
          </ProtectedRoute>
        ),
      },

      // Staff Pages
      {
        path: "manage-doctors",
        element: (
          <ProtectedRoute allowedRoles={["Staff"]}>
            <ManageDoctors />
          </ProtectedRoute>
        ),
      },
      {
        path: "manage-patients",
        element: (
          <ProtectedRoute allowedRoles={["Staff"]}>
            <ManagePatients />
          </ProtectedRoute>
        ),
      },
      {
        path: "staffappointments",
        element: (
          <ProtectedRoute allowedRoles={["Staff"]}>
            <StaffAppointments />
          </ProtectedRoute>
        ),
      },
    ],
  },

  // Fallback Route
  { path: "*", element: <Navigate to="/" replace /> },
]);

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkAuth());
    dispatch(fetchDoctorsAll());
  }, [dispatch]);

  return (
    <>
      <RouterProvider router={router} />
      <ModalRoute />
      <Toaster />
    </>
  );
}

export default App;
