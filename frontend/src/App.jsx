import { createBrowserRouter , RouterProvider } from "react-router-dom";
import Home from "./Pages/Home";
import Contact from "./Pages/Contact";
import Services from "./Pages/Services";
import OurDoctors from "./Pages/OurDoctors";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import Layout from "./Layouts/Layout";
// import Dashboard from "../pages/Dashboard";
// import ProtectedRoute from "../components/ProtectedRoute";

const router = createBrowserRouter([
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

  // {
  //   path: "/dashboard",
  //   element: (
  //     <ProtectedRoute>
  //       <Dashboard />
  //     </ProtectedRoute>
  //   ),
  // },
]);


function App() {
  return <RouterProvider router={router} />;
}

export default App;
