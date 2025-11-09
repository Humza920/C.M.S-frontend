import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user, loading, role } = useSelector((state) => state.auth);
  const location = useLocation();

  if (loading) return <p>Loading authentication...</p>;

  // ❌ No user logged in
  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // ❌ User exists but doesn't have permission
  if (allowedRoles && !allowedRoles.includes(role)) {
    return <Navigate to="/" replace />;
  }

  // ✅ Authorized user → allow page
  return children;
};

export default ProtectedRoute;
