import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../Features/authslice";
import { useState, useRef, useEffect } from "react";
import { toast } from "react-hot-toast";

const Navbar = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const dropdownRef = useRef(null);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
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

    toast.success("Logged out successfully! See you soon!", {
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


  const handleProfileClick = () => {
    setDropdownOpen(false);
    toast.success("Navigating to your profile");
  };

  const handleAppointmentsClick = () => {
    setDropdownOpen(false);
    toast.loading("Loading your appointments...", { duration: 1000 });
  };

  return (
    <nav className={`fixed w-full top-0 left-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? "bg-white/95 backdrop-blur-lg shadow-xl border-b border-blue-100/50" 
        : "bg-gradient-to-r from-blue-600 to-purple-700 shadow-lg"
    }`}>
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          {/* Logo with enhanced design */}
          <Link 
            to="/" 
            className="flex items-center gap-2 group"
          >
            <div className={`p-2 rounded-xl transition-all duration-300 group-hover:scale-110 ${
              isScrolled 
                ? "bg-blue-600 text-white" 
                : "bg-white/20 text-white"
            }`}>
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
              </svg>
            </div>
            <span className={`text-2xl font-bold transition-all duration-300 ${
              isScrolled ? "text-blue-600" : "text-white"
            }`}>
              HealthCare<span className="text-green-400">+</span>
            </span>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center gap-8">
            <Link 
              to="/" 
              className={`font-medium transition-all duration-300 hover:scale-105 ${
                isScrolled 
                  ? "text-gray-700 hover:text-blue-600" 
                  : "text-white/90 hover:text-white"
              }`}
            >
              Home
            </Link>
            <Link 
              to="/our-doctors" 
              className={`font-medium transition-all duration-300 hover:scale-105 ${
                isScrolled 
                  ? "text-gray-700 hover:text-blue-600" 
                  : "text-white/90 hover:text-white"
              }`}
            >
              Our Doctors
            </Link>
            <Link 
              to="/services" 
              className={`font-medium transition-all duration-300 hover:scale-105 ${
                isScrolled 
                  ? "text-gray-700 hover:text-blue-600" 
                  : "text-white/90 hover:text-white"
              }`}
            >
              Services
            </Link>
            <Link 
              to="/contact" 
              className={`font-medium transition-all duration-300 hover:scale-105 ${
                isScrolled 
                  ? "text-gray-700 hover:text-blue-600" 
                  : "text-white/90 hover:text-white"
              }`}
            >
              Contact
            </Link>
          </div>

          {/* Auth Section */}
          <div className="flex items-center gap-4">
            {!user ? (
              <div className="flex items-center gap-3">
                <Link
                  to="/login"
                  className={`px-5 py-2.5 font-medium rounded-xl transition-all duration-300 hover:scale-105 ${
                    isScrolled
                      ? "bg-blue-600 text-white hover:bg-blue-700 shadow-lg shadow-blue-500/25"
                      : "bg-white/20 text-white hover:bg-white/30 backdrop-blur-sm border border-white/30"
                  }`}
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className={`px-5 py-2.5 font-medium rounded-xl transition-all duration-300 hover:scale-105 ${
                    isScrolled
                      ? "border-2 border-blue-600 text-blue-600 hover:bg-blue-50"
                      : "bg-white text-blue-600 hover:bg-blue-50 border-2 border-white"
                  }`}
                >
                  Sign Up
                </Link>
              </div>
            ) : (
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className={`flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all duration-300 hover:scale-105 ${
                    isScrolled
                      ? "bg-white text-gray-700 shadow-lg hover:shadow-xl border border-gray-100"
                      : "bg-white/20 text-white backdrop-blur-sm border border-white/30 hover:bg-white/30"
                  }`}
                >
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center font-semibold ${
                    isScrolled 
                      ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white" 
                      : "bg-white text-blue-600"
                  }`}>
                    {user.userName?.charAt(0).toUpperCase()}
                  </div>
                  <span className="font-medium">{user.userName}</span>
                  <svg 
                    className={`w-4 h-4 transition-transform duration-300 ${dropdownOpen ? 'rotate-180' : ''}`}
                    fill="currentColor" 
                    viewBox="0 0 20 20"
                  >
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>

                {/* Enhanced Dropdown */}
                {dropdownOpen && (
                  <div className="absolute right-0 mt-3 w-64 bg-white/95 backdrop-blur-lg rounded-2xl shadow-2xl border border-gray-100/50 overflow-hidden animate-in fade-in-0 zoom-in-95 duration-200">
                    {/* User Info Header */}
                    <div className="p-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center font-semibold">
                          {user.userName?.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <p className="font-semibold">{user.userName}</p>
                          <p className="text-white/80 text-sm">{user.email}</p>
                        </div>
                      </div>
                    </div>
                    
                    {/* Dropdown Items */}
                    <div className="p-2">
                      <Link
                        to="/my-appointments"
                        className="flex items-center gap-3 px-3 py-3 text-gray-700 hover:bg-blue-50 rounded-xl transition-all duration-200 group"
                        onClick={handleAppointmentsClick}
                      >
                        <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <span>My Appointments</span>
                      </Link>
                      
                      <Link
                        to="/my-case-history"
                        className="flex items-center gap-3 px-3 py-3 text-gray-700 hover:bg-blue-50 rounded-xl transition-all duration-200 group"
                        onClick={() => setDropdownOpen(false)}
                      >
                        <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        <span>My Case History</span>
                      </Link>
                      
                      <Link
                        to="/my-profile"
                        className="flex items-center gap-3 px-3 py-3 text-gray-700 hover:bg-blue-50 rounded-xl transition-all duration-200 group"
                        onClick={handleProfileClick}
                      >
                        <svg className="w-5 h-5 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                        <span>My Profile</span>
                      </Link>
                      
                      <div className="border-t border-gray-100 my-2"></div>
                      
                      <button
                        onClick={handleLogout}
                        className="flex items-center gap-3 w-full px-3 py-3 text-red-600 hover:bg-red-50 rounded-xl transition-all duration-200 group"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                        </svg>
                        <span>Logout</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden flex justify-center mt-4 pb-2">
          <div className="flex items-center gap-6">
            <Link to="/" className={`text-sm font-medium ${isScrolled ? 'text-gray-700' : 'text-white/90'}`}>Home</Link>
            <Link to="/our-doctors" className={`text-sm font-medium ${isScrolled ? 'text-gray-700' : 'text-white/90'}`}>Doctors</Link>
            <Link to="/services" className={`text-sm font-medium ${isScrolled ? 'text-gray-700' : 'text-white/90'}`}>Services</Link>
            <Link to="/contact" className={`text-sm font-medium ${isScrolled ? 'text-gray-700' : 'text-white/90'}`}>Contact</Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;