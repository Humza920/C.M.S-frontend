import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../Components/Navbar";

const Layout = () => {
  const location = useLocation();

  const hideNavbar = location.pathname === "/login" || location.pathname === "/signup";

  return (
    <>
      {!hideNavbar && <Navbar />}
      <Outlet />
    </>
  );
};

export default Layout;
