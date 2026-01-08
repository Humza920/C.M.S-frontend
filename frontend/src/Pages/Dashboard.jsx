import { NavLink, Outlet, Navigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { User, CalendarCheck, Users, LogOut } from "lucide-react";
import { useEffect } from "react";
import { fetchDashboardData } from "../Features/dashboardslice";
import { openModal } from "../Features/modalSlice";
import { logout } from "../Features/authslice";

const Dashboard = () => {
  const { user, role } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    dispatch(fetchDashboardData());
    if (role === "Doctor") {
      if (user && !user.userId?.isProfileComplete) {
        dispatch(openModal("completeProfile"));
      }
    }
  }, [user, dispatch, role]);

  if (!user) return null;

  const links = {
    Doctor: [
      {
        path: "/dashboard/appointments",
        label: "Appointments",
        icon: CalendarCheck,
      },
      { path: "/dashboard/history", label: "History", icon: Users },
      { path: "/dashboard/doc-profile", label: "My Profile", icon: User },
    ],
    Staff: [
      {
        path: "/dashboard/manage-doctors",
        label: "Manage Doctors",
        icon: Users,
      },
      {
        path: "/dashboard/manage-patients",
        label: "Manage Patients",
        icon: Users,
      },
      {
        path: "/dashboard/staffappointments",
        label: "Appointments",
        icon: CalendarCheck,
      },
    ],
  };

  const roleLinks = links[role] || [];

  if (location.pathname === "/dashboard") {
    if (role === "Doctor")
      return <Navigate to="/dashboard/appointments" replace />;
    if (role === "Staff")
      return <Navigate to="/dashboard/manage-doctors" replace />;
  }

  return (
    <div className="flex min-h-screen bg-gray-100 flex-col md:flex-row">
      {/* Sidebar */}
      <aside
        className="
          bg-white shadow-lg p-4 md:p-6
          md:w-64 w-full
          md:sticky md:top-0 md:h-screen
          flex md:flex-col gap-4 md:justify-between
          overflow-x-auto md:overflow-visible
        "
      >
        {/* Top Section */}
        <div>
          <div className="mb-4 md:mb-8 hidden md:block">
            <h2 className="text-2xl font-bold text-gray-800">Dashboard</h2>
            <p className="text-gray-500 text-sm mt-1">{role}</p>
          </div>

          {/* Mobile Title */}
          <div className="md:hidden block text-center mb-3">
            <h2 className="text-xl font-semibold">Dashboard – {role}</h2>
          </div>

          <nav className="flex md:flex-col gap-2 md:gap-4">
            {roleLinks.map((link) => {
              const Icon = link.icon;
              return (
                <NavLink
                  key={link.path}
                  to={link.path}
                  className={({ isActive }) =>
                    `flex items-center gap-2 md:gap-3 px-3 py-2 rounded-lg font-medium whitespace-nowrap transition-colors ${
                      isActive
                        ? "bg-blue-100 text-blue-700"
                        : "text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                    }`
                  }
                >
                  <Icon className="w-5 h-5" />
                  {link.label}
                </NavLink>
              );
            })}
          </nav>
        </div>

        {/* Logout Section */}
<div className="pt-5 border-t border-gray-200">
  <button
    onClick={() => dispatch(logout())}
    className="
      group w-full
      flex items-center justify-between
      px-4 py-3.5
      rounded-xl
      text-sm font-semibold
      text-gray-800
      hover:bg-red-50
      hover:text-red-700
      border border-gray-200
      hover:border-red-300
      transition-all duration-250
      focus:outline-none focus:ring-2 focus:ring-red-500/30 focus:border-red-400
    "
  >
    <div className="flex items-center gap-3.5">
      <div className="
        p-2
        rounded-lg
        bg-gray-100
        group-hover:bg-red-100
        group-hover:text-red-600
        transition-colors duration-250
      ">
        <LogOut className="w-4 h-4" />
      </div>
      <span className="tracking-wide">Logout</span>
    </div>
    
    <svg
      className="w-4 h-4 text-gray-500 group-hover:text-red-600 transition-all duration-300 transform group-hover:translate-x-1.5"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M9 5l7 7-7 7"
      />
    </svg>
  </button>
</div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-4 md:p-6">
        <Outlet />
      </main>
    </div>
  );
};

export default Dashboard;
