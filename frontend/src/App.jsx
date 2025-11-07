import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./Pages/Home";
import Contact from "./Pages/Contact";
import Services from "./Pages/Services";
import OurDoctors from "./Pages/OurDoctors";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import Layout from "./Layouts/Layout";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { checkAuth } from "./features/authslice";
import ProtectedRoute from "./components/ProtectedRoute";
import Dashboard from "./Pages/Dashboard";

const patientRouter = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: "services", element: <Services /> },
      { path: "contact", element: <Contact /> },
      { path: "our-doctors", element: <OurDoctors /> },
      { path: "login", element: <Login /> },
      { path: "signup", element: <Signup /> },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <ProtectedRoute>
        <Dashboard />
      </ProtectedRoute>
    ),
  },
]);

const doctorStaffRouter = createBrowserRouter([
  {
    path: "/dashboard",
    element: (
      <ProtectedRoute>
        <Dashboard />
      </ProtectedRoute>
    ),
  },
]);

function App() {
  const dispatch = useDispatch();
  const { user, loading, role } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  if (loading) return <p>Loading authentication...</p>;

  if (role === "Doctor" || role === "Staff") {
    return <RouterProvider router={doctorStaffRouter} />;
  }

  // Default: Patient routes
  return <RouterProvider router={patientRouter} />;
}

export default App;
