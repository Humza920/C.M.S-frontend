import { useSelector , useDispatch} from "react-redux";
import { useNavigate } from "react-router-dom";
import {logout} from "../Features/authslice";
import { User, Mail, Phone, MapPin, Calendar, Award, Stethoscope, Clock, Heart, Shield, Star, Edit } from 'lucide-react';
import { openModal } from "../Features/modalSlice";

const DoctorProfile = () => {
  const { user, loading , role } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const base = user.userId || {};
  const profileData = base.role === "Doctor" ? user : user;

  function handleEditProfile() {
    dispatch(openModal("completeProfile"))
  }

  function handleLogout() {
    dispatch(logout())
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-blue-600 font-medium text-lg">Loading your profile...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center bg-white rounded-2xl shadow-lg p-8 max-w-md">
          <User className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-gray-800 mb-2">Profile Not Found</h3>
          <p className="text-gray-600 mb-6">Please login to view your profile</p>
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


  if (role === "Doctor") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 pt-20 pb-10">
        <div className="max-w-6xl mx-auto px-4">
          {/* Header Section */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-3">Doctor Profile</h1>
            <p className="text-gray-600 text-lg">Your professional medical profile</p>
          </div>

          {/* Profile Card */}
          <div className="bg-white rounded-3xl shadow-xl border border-gray-200 overflow-hidden mb-8">
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 h-32 relative">
              <div className="absolute -bottom-16 left-8">
                <div className="relative">
                  <img
                    src={profileData.profileImg || "https://cdn-icons-png.flaticon.com/512/847/847969.png"}
                    alt="Profile"
                    className="w-32 h-32 rounded-2xl object-cover border-4 border-white shadow-lg"
                  />
                  <div className="absolute -bottom-2 -right-2 bg-green-500 text-white p-1.5 rounded-full shadow-lg">
                    <Shield className="w-4 h-4" />
                  </div>
                </div>
              </div>
            </div>
            
            <div className="pt-20 pb-8 px-8">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                <div className="mb-6 lg:mb-0">
                  <h2 className="text-3xl font-bold text-gray-900 mb-2">
                    Dr. {base.userName || "Unnamed"}
                  </h2>
                  <p className="text-blue-600 font-semibold text-lg mb-3">{profileData.specialization || "Medical Specialist"}</p>
                  
                  <div className="flex flex-wrap gap-4 text-gray-600">
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4 text-blue-500" />
                      <span>{base.emailAddress}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Award className="w-4 h-4 text-green-500" />
                      <span>{profileData.qualification || "Qualified Professional"}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Star className="w-4 h-4 text-yellow-500" />
                      <span>{profileData.experience || 0} years experience</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <span className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full font-semibold text-sm">
                    {base.role}
                  </span>
                  <button className="bg-blue-600 text-white px-4 py-2 rounded-xl font-semibold hover:bg-blue-700 transition-colors flex items-center gap-2" onClick={handleEditProfile}>
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

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                  <Stethoscope className="w-5 h-5 text-blue-600" />
                  Professional Details
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex items-center gap-4 p-4 bg-blue-50 rounded-xl">
                    <Award className="w-8 h-8 text-blue-600" />
                    <div>
                      <p className="text-sm text-gray-600">Qualification</p>
                      <p className="font-semibold text-gray-900">{profileData.qualification || "N/A"}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 p-4 bg-green-50 rounded-xl">
                    <Stethoscope className="w-8 h-8 text-green-600" />
                    <div>
                      <p className="text-sm text-gray-600">Specialization</p>
                      <p className="font-semibold text-gray-900">{profileData.specialization || "N/A"}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 p-4 bg-purple-50 rounded-xl">
                    <Calendar className="w-8 h-8 text-purple-600" />
                    <div>
                      <p className="text-sm text-gray-600">Experience</p>
                      <p className="font-semibold text-gray-900">{profileData.experience || 0} years</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 p-4 bg-amber-50 rounded-xl">
                    <Star className="w-8 h-8 text-amber-600" />
                    <div>
                      <p className="text-sm text-gray-600">Consultation Fee</p>
                      <p className="font-semibold text-gray-900">₹{profileData.fees || 0}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                  <Clock className="w-5 h-5 text-blue-600" />
                  Availability
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <p className="text-sm text-gray-600 mb-3 font-medium">Available Days</p>
                    <div className="flex flex-wrap gap-2">
                      {Array.isArray(profileData.availableDays) && profileData.availableDays.length > 0 ? (
                        profileData.availableDays.map((day, index) => (
                          <span key={index} className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                            {day}
                          </span>
                        ))
                      ) : (
                        <span className="text-gray-500">Not specified</span>
                      )}
                    </div>
                  </div>

                  <div>
                    <p className="text-sm text-gray-600 mb-3 font-medium">Available Time</p>
                    <div className="bg-blue-50 p-3 rounded-xl">
                      <p className="font-semibold text-gray-900">
                        {profileData.availableTime?.start || "N/A"} - {profileData.availableTime?.end || "N/A"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="space-y-8">
              <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                  <User className="w-5 h-5 text-blue-600" />
                  Personal Information
                </h3>
                
                <div className="space-y-4">
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                    <User className="w-5 h-5 text-gray-600" />
                    <div>
                      <p className="text-sm text-gray-600">Gender</p>
                      <p className="font-semibold text-gray-900">{profileData.gender || "N/A"}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                    <Phone className="w-5 h-5 text-gray-600" />
                    <div>
                      <p className="text-sm text-gray-600">Phone</p>
                      <p className="font-semibold text-gray-900">{profileData.phoneNumber || "N/A"}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                    <MapPin className="w-5 h-5 text-gray-600" />
                    <div>
                      <p className="text-sm text-gray-600">Location</p>
                      <p className="font-semibold text-gray-900">{profileData.location?.country || "N/A"}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <Heart className="w-5 h-5 text-blue-600" />
                  About
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  {profileData.about || "No description provided"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  


};

export default DoctorProfile;