import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { register, checkAuth } from "../Features/authslice";
import toast from "react-hot-toast";

export default function Signup() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, loading } = useSelector((state) => state.auth);
  const location = useLocation();

  const params = new URLSearchParams(location.search);
  const role = params.get("role") || "Patient";
  const token = params.get("token") || null;
  console.log(role);
  console.log(token);

  const [userName, setUserName] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [cnic, setCnic] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [profileimg, setprofileimg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!profileimg) {
      return toast.error("Please upload a profile image! ❌");
    }

    try {
      const formData = new FormData();
      formData.append("userName", userName);
      formData.append("emailAddress", emailAddress);
      formData.append("password", password);
      formData.append("cnic", cnic);
      formData.append("role", role);
      formData.append("token", token);
      formData.append("profileimg", profileimg); 

      await dispatch(register(formData)).unwrap();

      toast.success("Account created successfully! 🎉", {
        duration: 3000,
        position: "top-right",
      });

      dispatch(checkAuth());
    } catch (error) {
      toast.error(error?.message || "Signup failed! ❌", {
        duration: 4000,
        position: "top-right",
      });
    }
  };

  useEffect(() => {
    if (user) navigate("/");
  }, [user, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4 font-poppins">
      {/* Responsive Card */}
      <div className="bg-white/90 backdrop-blur-md shadow-2xl rounded-3xl flex flex-col lg:flex-row max-w-5xl w-full overflow-hidden">
        {/* Left: Profile Image - Hidden on mobile, visible on lg+ */}
        {/* Left: Profile Image Upload (Visible on lg+) */}
        <div className="lg:w-1/3 bg-gradient-to-br from-blue-500 to-purple-600 flex flex-col items-center justify-center p-6 lg:p-8 hidden lg:flex">
          {/* Image Preview or Default Icon */}
          <div className="w-28 h-28 lg:w-32 lg:h-32 rounded-full bg-white/20 flex items-center justify-center shadow-lg mb-4 overflow-hidden border-2 border-white/30">
            {profileimg ? (
              <img
                src={URL.createObjectURL(profileimg)}
                alt="Profile Preview"
                className="w-full h-full object-cover"
              />
            ) : (
              <span className="text-4xl lg:text-5xl text-white">👤</span>
            )}
          </div>

          {/* Upload Button */}
          <label className="cursor-pointer bg-white/20 hover:bg-white/30 text-white text-sm font-medium px-4 py-2 rounded-full shadow-md transition-all duration-300">
            Upload Image
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => setprofileimg(e.target.files[0])}
            />
          </label>

          {/* Instruction Text */}
          <p className="text-white text-center text-xs lg:text-sm mt-3 opacity-90">
            Choose your profile image
          </p>
        </div>

        {/* Right: Form */}
        <div className="w-full lg:w-2/3 p-6 lg:p-10">
          {/* Header for mobile */}
          {/* Mobile Header with Profile Upload */}
          <div className="lg:hidden text-center mb-6">
            {/* Profile Image Upload Preview */}
            <div className="relative w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-3 shadow-lg overflow-hidden">
              {profileimg ? (
                <img
                  src={URL.createObjectURL(profileimg)}
                  alt="Profile Preview"
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-2xl text-white">👤</span>
              )}

              {/* Upload Button (camera icon style) */}
              <label className="absolute bottom-0 right-0 bg-white/90 text-blue-600 p-1.5 rounded-full shadow-md cursor-pointer hover:bg-white transition">
                📷
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => setprofileimg(e.target.files[0])}
                />
              </label>
            </div>

            <h2 className="text-2xl font-bold text-gray-800 mb-1">
              Create Account
            </h2>
            <p className="text-gray-600 text-sm">Sign up to join HealthCare+</p>
          </div>

          {/* Header for desktop */}
          <div className="hidden lg:block mb-6">
            <h2 className="text-3xl font-bold text-gray-800 mb-2">
              Create Account
            </h2>
            <p className="text-gray-600">
              Sign up to your account and join HealthCare+
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="space-y-4 lg:space-y-6 lg:grid lg:grid-cols-2 lg:gap-6"
          >
            {/* Full Name */}
            <div className="lg:col-span-1">
              <label className="block text-gray-700 font-medium mb-2 text-sm lg:text-base">
                Full Name
              </label>
              <input
                type="text"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                placeholder="John Doe"
                required
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition duration-300 text-sm lg:text-base"
              />
            </div>

            {/* Email */}
            <div className="lg:col-span-1">
              <label className="block text-gray-700 font-medium mb-2 text-sm lg:text-base">
                Email Address
              </label>
              <input
                type="email"
                value={emailAddress}
                onChange={(e) => setEmailAddress(e.target.value)}
                placeholder="email@example.com"
                required
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition duration-300 text-sm lg:text-base"
              />
            </div>

            {/* CNIC */}
            <div className="lg:col-span-1">
              <label className="block text-gray-700 font-medium mb-2 text-sm lg:text-base">
                CNIC Number
              </label>
              <input
                type="text"
                value={cnic}
                onChange={(e) => setCnic(e.target.value)}
                placeholder="12345-1234567-1"
                required
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition duration-300 text-sm lg:text-base"
              />
            </div>

            {/* Password */}
            {/* Password Input */}
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  required
                  className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-xl outline-none focus:border-blue-500 focus:bg-white transition-all duration-300 placeholder-gray-400 text-gray-800 font-medium pr-12"
                />
                {/* Eye Toggle Button (clinic-relevant) */}
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-blue-500 transition-all duration-200 focus:outline-none focus:ring-0"
                >
                  {showPassword ? "👁️" : "🧿"}
                </button>
              </div>
            </div>

            {/* Terms */}
            <div className="lg:col-span-2 flex items-center">
              <label className="flex items-center text-gray-600 cursor-pointer text-xs lg:text-sm">
                <input
                  type="checkbox"
                  className="w-4 h-4 text-blue-500 rounded focus:ring-blue-400"
                />
                <span className="ml-2">I agree to Terms & Conditions</span>
              </label>
            </div>

            {/* Submit */}
            <div className="lg:col-span-2">
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 rounded-xl font-semibold hover:from-blue-600 hover:to-purple-700 transform transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed text-sm lg:text-base"
              >
                {loading ? (
                  <div className="flex items-center justify-center">
                    <div className="w-4 h-4 lg:w-5 lg:h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                    Signing up...
                  </div>
                ) : (
                  "Sign Up"
                )}
              </button>
            </div>

            {/* Login Link */}
            <div className="lg:col-span-2 text-center">
              <p className="text-gray-600 text-xs lg:text-sm">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="text-blue-500 font-semibold hover:text-blue-600 hover:underline"
                >
                  Login
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
