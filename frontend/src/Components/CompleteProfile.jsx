import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { checkAuth, updateProfile } from "../Features/authslice";
import { closeModal } from "../Features/modalSlice";
import {
  User,
  Phone,
  Heart,
  AlertTriangle,
  Upload,
  X,
  Stethoscope,
  Shield,
  Calendar,
  DollarSign,
  MapPin,
  GraduationCap,
  BriefcaseMedical,
  Clock,
  Droplets,
  Home,
  Ambulance,
} from "lucide-react";

export default function CompleteProfile() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const role = user?.userId?.role;
  console.log(role);

  // --- Common fields ---
  const [gender, setGender] = useState("Other");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [profileImg, setProfileImg] = useState("");
  const [previewImg , setPreviewImg] = useState("")

  // --- Patient fields ---
  const [age, setAge] = useState("");
  const [medicalHistory, setMedicalHistory] = useState("");
  const [allergies, setAllergies] = useState("");
  const [emergencyPhone, setEmergencyPhone] = useState("");
  const [bloodGroup, setBloodGroup] = useState("");
  const [address, setAddress] = useState("");

  // --- Doctor fields ---
  const [specialization, setSpecialization] = useState("");
  const [qualification, setQualification] = useState("");
  const [experience, setExperience] = useState(0);
  const [about, setAbout] = useState("");
  const [fees, setFees] = useState(0);
  const [availableDays, setAvailableDays] = useState("");
  const [availableTime, setAvailableTime] = useState(""); // "17:00-20:00"
  const [location, setLocation] = useState("");

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImg(file);
      setPreviewImg(URL.createObjectURL(file)); // live preview
    }
  };

  // --- Pre-fill user data ---
  useEffect(() => {
    if (!user) return;

    setGender(user.gender || "Other");
    setPhoneNumber(user.phoneNumber || "");
    setProfileImg(user.profileImg || "");

    if (role === "Doctor") {
      setSpecialization(user.specialization || "");
      setQualification(user.qualification || "");
      setExperience(user.experience || 0);
      setAbout(user.about || "No description provided");
      setFees(user.fees || 0);
      setAvailableDays(user.availableDays?.join(", ") || "");
      setAvailableTime(
        user.availableTime
          ? `${user.availableTime.start}-${user.availableTime.end}`
          : ""
      );
      setLocation(user.location?.country || "");
    } else {
      setAge(user.age || "");
      setMedicalHistory(user.medicalHistory || "");
      setAllergies(user.allergies?.join(", ") || "");
      setEmergencyPhone(user.emergencyContact?.phone || "");
      setBloodGroup(user.bloodGroup || "");
      setAddress(user.address || "");
    }
  }, [user, role]);

  console.log(JSON.stringify({ phone: emergencyPhone }));
  

  const handleSubmit = async (e) => {
  e.preventDefault();

  const formData = new FormData();

  // 🔹 Common fields
  formData.append("gender", gender);
  formData.append("phoneNumber", phoneNumber);

  if (profileImg) {
    formData.append("profileimg", profileImg); // actual file append ho rahi hai
  }

  if (role === "Doctor") {
    formData.append("specialization", specialization);
    formData.append("qualification", qualification);
    formData.append("experience", experience);
    formData.append("about", about);
    formData.append("fees", fees);

    // Convert availableDays to JSON string
    formData.append(
      "availableDays",
      JSON.stringify(
        availableDays
          .split(",")
          .map((d) => d.trim())
          .filter((d) => d)
      )
    );

    // Convert availableTime to JSON
    const [start, end] = availableTime.split("-");
    formData.append(
      "availableTime",
      JSON.stringify({
        start: start?.trim() || "",
        end: end?.trim() || "",
      })
    );

    // location as JSON
    formData.append("location", JSON.stringify({ country: location }));
  } else {
    formData.append("age", age);
    formData.append("medicalHistory", medicalHistory);
    formData.append(
      "allergies",
      JSON.stringify(
        allergies
          .split(",")
          .map((a) => a.trim())
          .filter((a) => a)
      )
    );
    formData.append(
      "emergencyContact",
      JSON.stringify({ phone: emergencyPhone })
    );
    formData.append("bloodGroup", bloodGroup);
    formData.append("address", address);
  }

  try {
    await dispatch(updateProfile(formData)).unwrap();
    dispatch(checkAuth());
    dispatch(closeModal());
  } catch (err) {
    console.error(err);
  }
};



  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
      <div className="absolute inset-0 bg-black/30 backdrop-blur-sm pointer-events-none"></div>
      <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-4xl max-h-[95vh] overflow-y-auto z-10">
        {/* Enhanced Header */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-8 rounded-t-3xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-white/20 rounded-2xl backdrop-blur-sm">
                {role === "Doctor" ? (
                  <Stethoscope className="h-8 w-8 text-white" />
                ) : (
                  <User className="h-8 w-8 text-white" />
                )}
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white">
                  Complete Your {role === "Doctor" ? "Doctor" : "Patient"}{" "}
                  Profile
                </h2>
                <p className="text-blue-100 text-sm mt-1">
                  {role === "Doctor"
                    ? "Set up your professional profile to start accepting patients"
                    : "Complete your profile for personalized healthcare experience"}
                </p>
              </div>
            </div>
            <button
              onClick={() => dispatch(closeModal())}
              className="p-2 hover:bg-white/20 rounded-xl transition-all duration-200 hover:scale-110"
            >
              <X className="h-6 w-6 text-white" />
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-8">
          {/* Enhanced Profile Image Section */}
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-100">
            <div className="flex items-center space-x-6">
              <div className="relative">
                <div className="w-24 h-24 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-2xl flex items-center justify-center overflow-hidden border-4 border-white shadow-xl">
                  {profileImg ? (
                    <img
                      src={previewImg || user.profileImg}
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <User className="h-10 w-10 text-blue-500" />
                  )}
                </div>
                <label className="absolute -bottom-2 -right-2 bg-blue-600 text-white p-2 rounded-full cursor-pointer hover:bg-blue-700 transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-110">
                  <Upload className="h-4 w-4" />
                  <input
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={handleImageChange}
                  />
                </label>
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-gray-800 text-lg">
                  Profile Photo
                </h3>
                <p className="text-gray-600 text-sm mt-1">
                  Upload a professional photo for better identification and
                  trust
                </p>
                <div className="flex items-center space-x-2 mt-2">
                  <Shield className="h-4 w-4 text-blue-500" />
                  <span className="text-xs text-gray-500">
                    Secure and private
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Common Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="flex items-center space-x-2 text-sm font-semibold text-gray-700">
                <User className="h-4 w-4 text-blue-500" />
                <span>Gender</span>
              </label>
              <select
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-white"
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="flex items-center space-x-2 text-sm font-semibold text-gray-700">
                <Phone className="h-4 w-4 text-blue-500" />
                <span>Phone Number</span>
              </label>
              <input
                type="tel"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                placeholder="+1 234 567 8900"
              />
            </div>
          </div>

          {/* Role-specific Fields */}
          {role === "Doctor" ? (
            <div className="space-y-6">
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-100">
                <h3 className="font-bold text-gray-800 text-lg mb-4 flex items-center space-x-2">
                  <BriefcaseMedical className="h-5 w-5 text-blue-600" />
                  <span>Professional Information</span>
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="flex items-center space-x-2 text-sm font-semibold text-gray-700">
                      <Stethoscope className="h-4 w-4 text-blue-500" />
                      <span>Specialization</span>
                    </label>
                    <input
                      type="text"
                      value={specialization}
                      onChange={(e) => setSpecialization(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                      placeholder="Cardiology, Neurology, etc."
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="flex items-center space-x-2 text-sm font-semibold text-gray-700">
                      <GraduationCap className="h-4 w-4 text-blue-500" />
                      <span>Qualification</span>
                    </label>
                    <input
                      type="text"
                      value={qualification}
                      onChange={(e) => setQualification(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                      placeholder="MD, MBBS, PhD, etc."
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="flex items-center space-x-2 text-sm font-semibold text-gray-700">
                      <Calendar className="h-4 w-4 text-blue-500" />
                      <span>Experience (Years)</span>
                    </label>
                    <input
                      type="number"
                      value={experience}
                      onChange={(e) => setExperience(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                      min="0"
                      max="50"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="flex items-center space-x-2 text-sm font-semibold text-gray-700">
                      <DollarSign className="h-4 w-4 text-blue-500" />
                      <span>Consultation Fees ($)</span>
                    </label>
                    <input
                      type="number"
                      value={fees}
                      onChange={(e) => setFees(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                      min="0"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="flex items-center space-x-2 text-sm font-semibold text-gray-700">
                    <Calendar className="h-4 w-4 text-blue-500" />
                    <span>Available Days</span>
                  </label>
                  <input
                    type="text"
                    value={availableDays}
                    readOnly
                    onChange={(e) => setAvailableDays(e.target.value)}
                    placeholder="Monday, Wednesday, Friday"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                  />
                </div>

                <div className="space-y-2">
                  <label className="flex items-center space-x-2 text-sm font-semibold text-gray-700">
                    <Clock className="h-4 w-4 text-blue-500" />
                    <span>Available Time</span>
                  </label>
                  <input
                    type="text"
                    value={availableTime}
                    readOnly
                    onChange={(e) => setAvailableTime(e.target.value)}
                    placeholder="17:00-20:00"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="flex items-center space-x-2 text-sm font-semibold text-gray-700">
                  <MapPin className="h-4 w-4 text-blue-500" />
                  <span>Location (Country)</span>
                </label>
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                  placeholder="United States"
                />
              </div>

              <div className="space-y-2">
                <label className="flex items-center space-x-2 text-sm font-semibold text-gray-700">
                  <User className="h-4 w-4 text-blue-500" />
                  <span>About Yourself</span>
                </label>
                <textarea
                  value={about}
                  onChange={(e) => setAbout(e.target.value)}
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 resize-none"
                  placeholder="Tell patients about your expertise, approach, and experience..."
                />
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Patient Health Information */}
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-100">
                <h3 className="font-bold text-gray-800 text-lg mb-4 flex items-center space-x-2">
                  <Heart className="h-5 w-5 text-blue-600" />
                  <span>Health Information</span>
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="flex items-center space-x-2 text-sm font-semibold text-gray-700">
                      <Calendar className="h-4 w-4 text-blue-500" />
                      <span>Age</span>
                    </label>
                    <input
                      type="number"
                      value={age}
                      onChange={(e) => setAge(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                      placeholder="Enter your age"
                      min="0"
                      max="120"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="flex items-center space-x-2 text-sm font-semibold text-gray-700">
                      <Droplets className="h-4 w-4 text-blue-500" />
                      <span>Blood Group</span>
                    </label>
                    <select
                      value={bloodGroup}
                      onChange={(e) => setBloodGroup(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-white"
                    >
                      <option value="">Select Blood Group</option>
                      <option value="A+">A+</option>
                      <option value="A-">A-</option>
                      <option value="B+">B+</option>
                      <option value="B-">B-</option>
                      <option value="AB+">AB+</option>
                      <option value="AB-">AB-</option>
                      <option value="O+">O+</option>
                      <option value="O-">O-</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Patient Medical Details */}
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-100">
                <h3 className="font-bold text-gray-800 text-lg mb-4 flex items-center space-x-2">
                  <AlertTriangle className="h-5 w-5 text-blue-600" />
                  <span>Medical Details</span>
                </h3>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="flex items-center space-x-2 text-sm font-semibold text-gray-700">
                      <Heart className="h-4 w-4 text-blue-500" />
                      <span>Medical History</span>
                    </label>
                    <textarea
                      value={medicalHistory}
                      onChange={(e) => setMedicalHistory(e.target.value)}
                      rows={3}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 resize-none"
                      placeholder="Any past medical conditions, surgeries, or chronic illnesses..."
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="flex items-center space-x-2 text-sm font-semibold text-gray-700">
                      <AlertTriangle className="h-4 w-4 text-blue-500" />
                      <span>Allergies</span>
                    </label>
                    <input
                      type="text"
                      value={allergies}
                      onChange={(e) => setAllergies(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                      placeholder="List any allergies (separated by commas)"
                    />
                  </div>
                </div>
              </div>

              {/* Emergency Contact & Address */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="flex items-center space-x-2 text-sm font-semibold text-gray-700">
                    <Ambulance className="h-4 w-4 text-blue-500" />
                    <span>Emergency Contact</span>
                  </label>
                  <input
                    type="tel"
                    value={emergencyPhone}
                    onChange={(e) => setEmergencyPhone(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                    placeholder="Emergency phone number"
                  />
                </div>

                <div className="space-y-2">
                  <label className="flex items-center space-x-2 text-sm font-semibold text-gray-700">
                    <Home className="h-4 w-4 text-blue-500" />
                    <span>Address</span>
                  </label>
                  <input
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                    placeholder="Your complete address"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Enhanced Action Buttons */}
          <div className="flex space-x-4 pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={() => dispatch(closeModal())}
              className="flex-1 px-8 py-4 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-all duration-200 font-semibold hover:scale-[1.02] active:scale-[0.98]"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl transition-all duration-200 font-semibold shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] hover:from-blue-700 hover:to-blue-800"
            >
              Save Profile
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
