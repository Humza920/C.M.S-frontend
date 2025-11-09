import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { checkAuth } from "./Features/authslice";
import { fetchDoctorsAll } from "./Features/dashboardslice";
import { Toaster } from 'react-hot-toast';
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

// ✅ Single Router Setup (All routes managed here)
const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      // Public routes
      { index: true, element: <Home /> },
      { path: "about", element: <About /> },
      { path: "contact", element: <Contact /> },
      { path: "our-doctors", element: <OurDoctors /> },
      { path: "login", element: <Login /> },
      { path: "signup", element: <Signup /> },

      // Patient routes
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
          <ProtectedRoute allowedRoles={["Patient", "Doctor", "Staff"]}>
            <MyProfile />
          </ProtectedRoute>
        ),
      },
    ],
  },

  // Doctor / Staff Dashboard routes
  {
    path: "/dashboard",
    element: (
      <ProtectedRoute allowedRoles={["Doctor", "Staff"]}>
        <Dashboard />
      </ProtectedRoute>
    ),
    children: [
      { path: "appointments", element: <DoctorAppointments /> },
      {
        path: "my-profile",
        element: (
          <ProtectedRoute allowedRoles={["Doctor", "Staff"]}>
            <MyProfile />
          </ProtectedRoute>
        ),
      },
      // 👇 future dashboard pages add karna yahan simple hoga
      // { path: "reports", element: <ReportsPage /> },
      // { path: "patients", element: <DoctorPatients /> },
    ],
  },

  // Fallback route (invalid URLs → redirect to home)
  { path: "*", element: <Navigate to="/" replace /> },
]);

function App() {
  const dispatch = useDispatch();
  const { user, loading } = useSelector((state) => state.auth);

  // ✅ Check user authentication on app load
  useEffect(() => {
    dispatch(checkAuth());
    dispatch(fetchDoctorsAll())
  }, []);

  // ✅ Fetch doctors after authentication
  // useEffect(() => {
  //   if (user) dispatch(fetchDoctorsAll());
  // }, [user, dispatch]);

  // if (loading) return <p>Loading authentication...</p>;

  return (
    <>
      <RouterProvider router={router} />
      <ModalRoute />
      <Toaster />
    </>
  );
}

export default App;
