import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../Components/Navbar";
import { useSelector } from "react-redux";

const Layout = () => {
  const location = useLocation();
  const { role } = useSelector((state) => state.auth);
  
  // Hide navbar on login/signup pages OR if user is Doctor
  const hideNavbar = 
    location.pathname === "/login" || 
    location.pathname === "/signup" || 
    role === "Doctor";

  return (
    <>
      {!hideNavbar && <Navbar />}
      <Outlet />
    </>
  );
};

export default Layout;