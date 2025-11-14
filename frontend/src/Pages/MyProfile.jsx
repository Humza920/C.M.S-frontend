import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Award,
  Stethoscope,
  Clock,
  Heart,
  Shield,
  Star,
  Edit,
} from "lucide-react";
import { openModal } from "../Features/modalSlice";
import { logout } from "../Features/authslice";

const MyProfile = () => {
  const { user, loading } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  function handleUpdateProfile() {
    dispatch(openModal("completeProfile"));
  }
  function handleLogout() {
    dispatch(logout());
  }
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-blue-600 font-medium text-lg">
            Loading your profile...
          </p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center bg-white rounded-2xl shadow-lg p-8 max-w-md">
          <User className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-gray-800 mb-2">
            Profile Not Found
          </h3>
          <p className="text-gray-600 mb-6">
            Please login to view your profile
          </p>
          <button
            onClick={() => navigate("/login")}
            className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition-colors"
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  const base = user.userId || {};





  // Patient Profile
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 pt-20 pb-10">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header Section */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-3">
            Patient Profile
          </h1>
          <p className="text-gray-600 text-lg">Your personal health profile</p>
        </div>

        {/* Profile Card */}
        <div className="bg-white rounded-3xl shadow-xl border border-gray-200 overflow-hidden mb-8">
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 h-32 relative">
            <div className="absolute -bottom-16 left-8">
              <div className="relative">
                <img
                  src={
                    user.profileImg ||
                    "https://cdn-icons-png.flaticon.com/512/847/847969.png"
                  }
                  alt="Profile"
                  className="w-32 h-32 rounded-2xl object-cover border-4 border-white shadow-lg"
                />
                <div className="absolute -bottom-2 -right-2 bg-blue-500 text-white p-1.5 rounded-full shadow-lg">
                  <User className="w-4 h-4" />
                </div>
              </div>
            </div>
          </div>

          <div className="pt-20 pb-8 px-8">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
              <div className="mb-6 lg:mb-0">
                <h2 className="text-3xl font-bold text-gray-900 mb-2">
                  {base.userName || "Unnamed"}
                </h2>
                <p className="text-blue-600 font-semibold text-lg mb-3">
                  Patient
                </p>

                <div className="flex flex-wrap gap-4 text-gray-600">
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-blue-500" />
                    <span>{base.emailAddress}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-blue-500" />
                    <span>{user.phoneNumber || "N/A"}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-red-500" />
                    <span>{user.address || "N/A"}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <span className="bg-green-100 text-blue-700 px-4 py-2 rounded-full font-semibold text-sm">
                  {base.role}
                </span>
                <button
                  className="bg-blue-600 text-white px-4 py-2 rounded-xl font-semibold hover:bg-blue-700 transition-colors flex items-center gap-2"
                  onClick={handleUpdateProfile}
                >
                  <Edit className="w-4 h-4" />
                  Edit Profile
                </button>
                                  <button
                    className="bg-red-600 text-white px-4 py-2 rounded-xl font-semibold hover:bg-red-700 transition-colors flex items-center gap-2"
                    onClick={handleLogout}
                  >
                    <Edit className="w-4 h-4" />
                    Logout
                  </button>
              </div>
            </div>
          </div>
        </div>

        {/* Health Information */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Personal Info */}
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <User className="w-5 h-5 text-blue-600" />
                Personal Information
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex items-center gap-4 p-4 bg-blue-50 rounded-xl">
                  <User className="w-8 h-8 text-blue-600" />
                  <div>
                    <p className="text-sm text-gray-600">Age</p>
                    <p className="font-semibold text-gray-900">
                      {user.age || "N/A"} years
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-4 bg-green-50 rounded-xl">
                  <Heart className="w-8 h-8 text-green-600" />
                  <div>
                    <p className="text-sm text-gray-600">Gender</p>
                    <p className="font-semibold text-gray-900">
                      {user.gender || "N/A"}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-4 bg-red-50 rounded-xl">
                  <Heart className="w-8 h-8 text-red-600" />
                  <div>
                    <p className="text-sm text-gray-600">Blood Group</p>
                    <p className="font-semibold text-gray-900">
                      {user.bloodGroup || "N/A"}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-4 bg-purple-50 rounded-xl">
                  <MapPin className="w-8 h-8 text-purple-600" />
                  <div>
                    <p className="text-sm text-gray-600">CNIC</p>
                    <p className="font-semibold text-gray-900">
                      {base.cnic || "N/A"}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Medical History */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <Heart className="w-5 h-5 text-blue-600" />
                Medical Information
              </h3>

              <div className="space-y-6">
                <div>
                  <p className="text-sm text-gray-600 mb-2 font-medium">
                    Medical History
                  </p>
                  <div className="bg-gray-50 p-4 rounded-xl">
                    <p className="text-gray-900">
                      {user.medicalHistory || "No significant medical history"}
                    </p>
                  </div>
                </div>

                <div>
                  <p className="text-sm text-gray-600 mb-2 font-medium">
                    Allergies
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {Array.isArray(user.allergies) &&
                    user.allergies.length > 0 ? (
                      user.allergies.map((allergy, index) => (
                        <span
                          key={index}
                          className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm font-medium"
                        >
                          {allergy}
                        </span>
                      ))
                    ) : (
                      <span className="text-gray-500">No known allergies</span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Contact & Address */}
          <div className="space-y-8">
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <MapPin className="w-5 h-5 text-blue-600" />
                Address & Contact
              </h3>

              <div className="space-y-4">
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                  <MapPin className="w-5 h-5 text-gray-600" />
                  <div>
                    <p className="text-sm text-gray-600">Address</p>
                    <p className="font-semibold text-gray-900">
                      {user.address || "N/A"}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                  <Phone className="w-5 h-5 text-gray-600" />
                  <div>
                    <p className="text-sm text-gray-600">Emergency Contact</p>
                    <p className="font-semibold text-gray-900">
                      {user.emergencyContact?.phone || "N/A"}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Health Status */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Shield className="w-5 h-5 text-blue-600" />
                Health Status
              </h3>
              <div className="bg-green-50 border border-green-200 rounded-xl p-4 text-center">
                <p className="text-green-800 font-semibold">Active Patient</p>
                <p className="text-green-600 text-sm">Profile Complete</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
