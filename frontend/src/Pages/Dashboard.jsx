import { NavLink, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { User, ClipboardList, CalendarCheck, Users } from "lucide-react";

const Dashboard = () => {
  const { user, role } = useSelector((state) => state.auth);

  if (!user) return null; // agar user login nahi hai toh kuch nahi dikhayega

  // --- Role-based links ---
  const links = {
    Doctor: [
      { path: "/dashboard/patients", label: "My Patients", icon: Users },
      { path: "/dashboard/appointments", label: "Appointments", icon: CalendarCheck },
      { path: "/dashboard/my-profile", label: "My Profile", icon: User },
    ],
    Staff: [
      { path: "/dashboard/manage-doctors", label: "Manage Doctors", icon: Users },
      { path: "/dashboard/manage-patients", label: "Manage Patients", icon: Users },
      { path: "/dashboard/appointments", label: "Appointments", icon: CalendarCheck },
    ],
  };

  const roleLinks = links[role] || [];

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-lg p-6 sticky top-0 h-screen">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800">Dashboard</h2>
          <p className="text-gray-500 text-sm mt-1">{role}</p>
        </div>

        <nav className="flex flex-col gap-4">
          {roleLinks.map((link) => {
            const Icon = link.icon;
            return (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-2 rounded-lg font-medium transition-colors ${
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
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">
        <Outlet />
      </main>
    </div>
  );
};

export default Dashboard;
