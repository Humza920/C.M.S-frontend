import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../Features/authslice";
import { useState, useRef, useEffect } from "react";
import { toast } from "react-hot-toast";
import { Menu, X, User, Calendar, FileText, LogOut, Settings, Heart, Clock, Phone } from "lucide-react";

const Navbar = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const dropdownRef = useRef(null);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      await dispatch(logout()).unwrap();
      setDropdownOpen(false);
      toast.success("Logged out successfully! 👋", {
        duration: 2000,
        position: "top-right",
      });
      setTimeout(() => {
        navigate("/login");
      }, 1000);
    } catch (error) {
      toast.error(error?.message || "Logout failed! ❌");
    }
  };

  return (
    <>
      {/* Main Navbar */}
      <nav className={`fixed w-full  left-0 z-50 transition-all duration-500 ${
        isScrolled 
          ? "bg-white/95 backdrop-blur-xl shadow-lg border-b border-gray-200" 
          : "bg-gradient-to-r from-blue-600 to-blue-800 shadow-xl"
      }`}>
        <div className="max-w-7xl mx-auto px-6 py-3">
          <div className="flex justify-between items-center">
            
            {/* Logo - Simple and Clean */}
            <Link 
              to="/" 
              className="flex items-center gap-3 group"
            >
              <div className={`p-2 rounded-xl transition-all duration-300 ${
                isScrolled 
                  ? "bg-blue-600" 
                  : "bg-white/20"
              }`}>
                <Heart className="w-6 h-6 text-white" />
              </div>
              <div className="flex flex-col">
                <span className={`text-2xl font-bold tracking-tight ${
                  isScrolled ? "text-blue-800" : "text-white"
                }`}>
                  MediCare
                </span>
                <span className={`text-xs font-medium ${
                  isScrolled ? "text-blue-600" : "text-blue-200"
                }`}>
                  Quality Healthcare
                </span>
              </div>
            </Link>

            {/* Desktop Navigation - Centered */}
            <div className="hidden lg:flex items-center gap-10 absolute left-1/2 transform -translate-x-1/2">
              {[
                { path: "/", label: "Home" },
                { path: "/our-doctors", label: "Doctors" },
                { path: "/about", label: "About" },
                { path: "/contact", label: "Contact" }
              ].map((item) => (
                <Link 
                  key={item.path}
                  to={item.path} 
                  className={`font-semibold text-sm transition-all duration-300 hover:scale-105 ${
                    isScrolled 
                      ? "text-gray-700 hover:text-blue-600" 
                      : "text-white hover:text-yellow-300"
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </div>

            {/* Auth Section */}
            <div className="flex items-center gap-3">
              {!user ? (
                <div className="flex items-center gap-3">
                  <Link
                    to="/login"
                    className={`px-5 py-2 font-semibold rounded-lg transition-all duration-300 ${
                      isScrolled
                        ? "bg-blue-600 text-white hover:bg-blue-700"
                        : "bg-white text-blue-700 hover:bg-gray-100"
                    }`}
                  >
                    Login
                  </Link>
                  <Link
                    to="/signup"
                    className={`px-5 py-2 font-semibold rounded-lg transition-all duration-300 ${
                      isScrolled
                        ? "border border-blue-600 text-blue-600 hover:bg-blue-50"
                        : "border border-white text-white hover:bg-white/10"
                    }`}
                  >
                    Sign Up
                  </Link>
                </div>
              ) : (
                <div className="relative" ref={dropdownRef}>
                  <button
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                    className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-300 ${
                      isScrolled
                        ? "bg-gray-100 text-gray-700 hover:bg-gray-200"
                        : "bg-white/10 text-white hover:bg-white/20"
                    }`}
                  >
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-white ${
                      isScrolled ? "bg-blue-600" : "bg-blue-500"
                    }`}>
                      {user.userName?.charAt(0).toUpperCase()}
                    </div>
                    <span className="font-medium max-w-[100px] truncate">{user.userName}</span>
                  </button>

                  {/* Dropdown Menu */}
                  {dropdownOpen && (
                    <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
                      {/* User Info */}
                      <div className="p-4 bg-blue-600 text-white">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center font-bold text-white">
                            {user.userName?.charAt(0).toUpperCase()}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="font-bold truncate">{user.userName}</p>
                            <p className="text-blue-100 text-sm truncate">{user.email}</p>
                          </div>
                        </div>
                      </div>
                      
                      {/* Dropdown Items */}
                      <div className="p-2 space-y-1">
                        {[
                          { icon: User, label: "My Profile", path: "/my-profile" },
                          { icon: Calendar, label: "Appointments", path: "/my-appointments" },
                          { icon: FileText, label: "Medical Records", path: "/medical-records" },
                        ].map((item) => (
                          <Link
                            key={item.label}
                            to={item.path}
                            className="flex items-center gap-3 px-3 py-2 text-gray-700 hover:bg-blue-50 rounded-lg transition-all duration-200"
                            onClick={() => setDropdownOpen(false)}
                          >
                            <item.icon className="w-4 h-4 text-blue-600" />
                            <span className="font-medium">{item.label}</span>
                          </Link>
                        ))}
                        
                        <div className="border-t border-gray-200 my-1"></div>
                        
                        <button
                          onClick={handleLogout}
                          className="flex items-center gap-3 w-full px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200"
                        >
                          <LogOut className="w-4 h-4" />
                          <span className="font-medium">Logout</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Mobile Menu Button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className={`lg:hidden p-2 rounded-lg transition-all duration-300 ${
                  isScrolled
                    ? "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    : "bg-white/10 text-white hover:bg-white/20"
                }`}
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* Mobile Navigation Menu */}
          {mobileMenuOpen && (
            <div className="lg:hidden absolute top-full left-0 w-full bg-white border-t border-gray-200 shadow-lg">
              <div className="px-6 py-6 space-y-4">
                {/* Clinic Info in Mobile */}
                <div className="bg-blue-50 rounded-lg p-3 mb-2 border border-blue-100">
                  <div className="flex items-center gap-2 text-blue-800 mb-1">
                    <Clock className="w-4 h-4" />
                    <span className="font-semibold text-sm">Mon-Sat: 10AM - 8PM</span>
                  </div>
                  <div className="flex items-center gap-2 text-blue-800">
                    <Phone className="w-4 h-4" />
                    <span className="font-semibold text-sm">+1 (555) 123-HELP</span>
                  </div>
                </div>

                {[
                  { path: "/", label: "Home" },
                  { path: "/our-doctors", label: "Doctors" },
                  { path: "/about", label: "About" },
                  { path: "/contact", label: "Contact" }
                ].map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    className="block font-semibold text-gray-700 hover:text-blue-600 transition-all duration-300 py-2 border-b border-gray-100"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                ))}
                
                {!user && (
                  <div className="flex gap-3 pt-4">
                    <Link
                      to="/login"
                      className="flex-1 text-center bg-blue-600 text-white font-semibold py-2 rounded-lg transition-all duration-300"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Login
                    </Link>
                    <Link
                      to="/signup"
                      className="flex-1 text-center border border-blue-600 text-blue-600 font-semibold py-2 rounded-lg transition-all duration-300"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Sign Up
                    </Link>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </nav>
    </>
  );
};

export default Navbar;