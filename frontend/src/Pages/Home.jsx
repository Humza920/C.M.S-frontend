import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../features/authslice";
import { Calendar, Clock, Users, Award, ArrowRight, User } from "lucide-react";

const Home = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleLogout = () => {
    dispatch(logout());
  };

  console.log(user);
  
  const features = [
    {
      icon: <Calendar className="h-8 w-8" />,
      title: "Easy Appointments",
      description: "Book your appointments online in just a few clicks.",
    },
    {
      icon: <Clock className="h-8 w-8" />,
      title: "24/7 Availability",
      description: "Online booking available anytime, anywhere.",
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: "Expert Doctors",
      description: "Highly qualified and experienced medical professionals.",
    },
    {
      icon: <Award className="h-8 w-8" />,
      title: "Quality Care",
      description: "Committed to providing the best medical care.",
    },
  ];

  return (
    <div className="font-[Poppins] bg-gray-50 text-gray-800 min-h-screen">
      {/* Navbar */}
      <nav className="flex items-center justify-between px-6 py-4 bg-white shadow-md fixed w-full top-0 z-50">
        <Link to="/" className="text-2xl font-bold text-blue-700">
          🏥 MediCare
        </Link>

        {/* Right side */}
        <div className="flex items-center gap-6 relative">
          {user ? (
            <>
              <div
                className="flex items-center gap-2 cursor-pointer"
                onClick={() => setDropdownOpen(!dropdownOpen)}
              >
                <User className="w-6 h-6 text-blue-700" />
                <span className="font-medium">{user?.userName || "Profile"}</span>
              </div>

              {dropdownOpen && (
                <div className="absolute right-0 top-12 bg-white shadow-lg rounded-xl w-48 py-2 border">
                  <Link
                    to="/my-appointments"
                    className="block px-4 py-2 hover:bg-blue-50 transition"
                  >
                    My Appointments
                  </Link>
                  <Link
                    to="/my-case-history"
                    className="block px-4 py-2 hover:bg-blue-50 transition"
                  >
                    My Case History
                  </Link>
                  <Link
                    to="/my-profile"
                    className="block px-4 py-2 hover:bg-blue-50 transition"
                  >
                    My Profile
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-red-600 hover:bg-red-50 transition"
                  >
                    Logout
                  </button>
                </div>
              )}
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="text-gray-700 hover:text-blue-700 font-medium transition"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="bg-blue-600 text-white px-4 py-2 rounded-xl font-semibold hover:bg-blue-700 transition"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-32 px-6 text-center mt-16">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-5xl sm:text-6xl font-bold mb-6 leading-tight">
            Your Health is Our <span className="text-yellow-300">Priority</span>
          </h1>
          <p className="text-lg sm:text-xl mb-10 max-w-2xl mx-auto opacity-90">
            Book appointments with top specialists — Quality healthcare made simple and accessible.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/services"
              className="bg-white text-blue-700 font-semibold px-8 py-3 rounded-xl shadow hover:bg-gray-100 transition-all flex items-center justify-center"
            >
              View Services <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
            <Link
              to="/signup"
              className="border-2 border-white text-white px-8 py-3 rounded-xl font-semibold hover:bg-white hover:text-blue-700 transition-all"
            >
              Book Appointment
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto text-center mb-14">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-gray-900">
            Why Choose <span className="text-blue-600">Our Clinic?</span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            We provide comprehensive healthcare services with a patient-centered approach.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white p-8 rounded-2xl shadow-md hover:shadow-xl transition-all text-center"
            >
              <div className="text-blue-600 mb-4 flex justify-center">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600 text-sm">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-50 text-center">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-gray-900">
            Ready to Take Care of Your <span className="text-blue-600">Health?</span>
          </h2>
          <p className="text-gray-600 mb-8">
            Join thousands of satisfied patients who trust us with their healthcare needs.
          </p>
          <Link
            to="/signup"
            className="bg-blue-600 text-white px-8 py-3 rounded-xl font-semibold hover:bg-blue-700 transition-all inline-flex items-center"
          >
            Get Started Today <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
