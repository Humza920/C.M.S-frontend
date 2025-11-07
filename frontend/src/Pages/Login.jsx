import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../features/authslice";

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, loading } = useSelector((state) => state.auth);

  const [emailAddress, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login({ emailAddress, password }));
  };

  // 👇 Redirect when login successful
  useEffect(() => {
    if (user) {
      navigate("/"); // redirect to home
    }
  }, [user, navigate]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-50 font-poppins">
        <p className="text-gray-600 text-lg animate-pulse">
          Checking authentication...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-50 to-blue-100 font-poppins">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md transform transition-all hover:scale-[1.02] duration-300">
        <h2 className="text-3xl font-semibold text-center text-gray-800 mb-2">
          Welcome Back 👋
        </h2>
        <p className="text-center text-gray-500 mb-6">
          Login to access your dashboard
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Email Input */}
          <div>
            <label className="block text-gray-600 font-medium mb-1">
              Email Address
            </label>
            <input
              type="email"
              value={emailAddress}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition"
            />
          </div>

          {/* Password Input */}
          <div>
            <label className="block text-gray-600 font-medium mb-1">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-lg font-medium hover:bg-blue-600 transition-all duration-300"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        {/* Footer */}
        <p className="text-center text-gray-500 mt-6 text-sm">
          Don’t have an account?{" "}
          <Link
            to="/signup"
            className="text-blue-500 font-medium hover:underline"
          >
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}
