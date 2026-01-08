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
  AlertCircle,
  Fingerprint,
} from "lucide-react";

export default function CompleteProfile() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const role = user?.userId?.role;

  // Form states
  const [gender, setGender] = useState("Other");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [cnic, setCnic] = useState("");
  const [profileImg, setProfileImg] = useState("");
  const [previewImg, setPreviewImg] = useState("");
  const [age, setAge] = useState("");
  const [medicalHistory, setMedicalHistory] = useState("");
  const [allergies, setAllergies] = useState("");
  const [emergencyPhone, setEmergencyPhone] = useState("");
  const [bloodGroup, setBloodGroup] = useState("");
  const [address, setAddress] = useState("");
  const [specialization, setSpecialization] = useState("");
  const [qualification, setQualification] = useState("");
  const [experience, setExperience] = useState(0);
  const [about, setAbout] = useState("");
  const [fees, setFees] = useState(0);
  const [availableDays, setAvailableDays] = useState("");
  const [availableTime, setAvailableTime] = useState("");
  const [location, setLocation] = useState("");

  // Validation states
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Validation functions
  const validatePhone = (phone) => {
    if (!phone.trim()) return false;
    const digitsOnly = phone.replace(/\D/g, '');
    return /^\d{11}$/.test(digitsOnly);
  };

  const validateCNIC = (cnic) => {
    if (!cnic.trim()) return false;
    const digitsOnly = cnic.replace(/\D/g, '');
    return /^\d{14}$/.test(digitsOnly);
  };

  const validateTimeFormat = (time) => {
    if (!time.trim()) return true;
    const timeRegex = /^([0-1]?[0-9]|2[0-3]):([0-5][0-9])-([0-1]?[0-9]|2[0-3]):([0-5][0-9])$/;
    if (!timeRegex.test(time)) return false;
    
    const [start, end] = time.split('-');
    const startTime = parseInt(start.replace(':', ''));
    const endTime = parseInt(end.replace(':', ''));
    return startTime < endTime;
  };

  const validateDays = (days) => {
    if (!days.trim()) return true;
    const validDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    const enteredDays = days.split(',').map(d => d.trim());
    
    return enteredDays.every(day => 
      validDays.some(validDay => 
        day.toLowerCase() === validDay.toLowerCase()
      )
    );
  };

  const validateAllergies = (allergiesStr) => {
    if (!allergiesStr.trim()) return true;
    const allergyList = allergiesStr.split(',').map(a => a.trim());
    return allergyList.every(allergy => allergy.length > 0 && allergy.length <= 30);
  };

  const validateForm = () => {
    const newErrors = {};

    // Common validations for all users
    if (!phoneNumber.trim()) {
      newErrors.phoneNumber = "Phone number is required";
    } else if (!validatePhone(phoneNumber)) {
      newErrors.phoneNumber = "Phone number must be exactly 11 digits";
    }

    if (!cnic.trim()) {
      newErrors.cnic = "CNIC is required";
    } else if (!validateCNIC(cnic)) {
      newErrors.cnic = "CNIC must be exactly 14 digits";
    }

    if (role === "Doctor") {
      // Doctor validations
      if (!specialization.trim()) {
        newErrors.specialization = "Specialization is required";
      } else if (specialization.length < 2) {
        newErrors.specialization = "Specialization must be at least 2 characters";
      } else if (specialization.length > 50) {
        newErrors.specialization = "Specialization cannot exceed 50 characters";
      }

      if (!qualification.trim()) {
        newErrors.qualification = "Qualification is required";
      } else if (qualification.length > 100) {
        newErrors.qualification = "Qualification cannot exceed 100 characters";
      }

      if (experience < 0) {
        newErrors.experience = "Experience cannot be negative";
      } else if (experience > 50) {
        newErrors.experience = "Experience cannot exceed 50 years";
      }

      if (fees < 0) {
        newErrors.fees = "Fees cannot be negative";
      } else if (fees > 10000) {
        newErrors.fees = "Fees cannot exceed $10,000";
      }

      if (availableDays.trim() && !validateDays(availableDays)) {
        newErrors.availableDays = "Please enter valid days (e.g., Monday, Wednesday, Friday)";
      }

      if (availableTime.trim() && !validateTimeFormat(availableTime)) {
        newErrors.availableTime = "Please enter time in format HH:MM-HH:MM (start before end)";
      }

      if (!location.trim()) {
        newErrors.location = "Location is required";
      } else if (location.length > 50) {
        newErrors.location = "Location cannot exceed 50 characters";
      }

      if (about.length > 500) {
        newErrors.about = "About section cannot exceed 500 characters";
      }
    } else {
      // Patient validations
      if (!age) {
        newErrors.age = "Age is required";
      } else if (age < 0) {
        newErrors.age = "Age cannot be negative";
      } else if (age > 120) {
        newErrors.age = "Age must be less than 120";
      }

      if (bloodGroup && !['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'].includes(bloodGroup)) {
        newErrors.bloodGroup = "Please select a valid blood group";
      }

      if (medicalHistory.length > 1000) {
        newErrors.medicalHistory = "Medical history cannot exceed 1000 characters";
      }

      if (allergies.trim() && !validateAllergies(allergies)) {
        newErrors.allergies = "Each allergy must be 1-30 characters, separated by commas";
      }

      if (emergencyPhone.trim() && !validatePhone(emergencyPhone)) {
        newErrors.emergencyPhone = "Emergency phone must be exactly 11 digits";
      }

      if (!address.trim()) {
        newErrors.address = "Address is required";
      } else if (address.length < 5) {
        newErrors.address = "Address must be at least 5 characters";
      } else if (address.length > 200) {
        newErrors.address = "Address cannot exceed 200 characters";
      }
    }

    // Image validation
    if (profileImg && profileImg instanceof File) {
      const validTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
      const maxSize = 2 * 1024 * 1024;
      
      if (!validTypes.includes(profileImg.type)) {
        newErrors.profileImg = "Only JPEG, PNG, GIF, or WebP images are allowed";
      } else if (profileImg.size > maxSize) {
        newErrors.profileImg = "Image size must be less than 2MB";
      }
    }

    return newErrors;
  };

  // Handle field blur
  const handleBlur = (field) => {
    setTouched(prev => ({ ...prev, [field]: true }));
    const newErrors = validateForm();
    setErrors(prev => ({ ...prev, [field]: newErrors[field] }));
  };

  // Handle image change
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const validTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
      const maxSize = 2 * 1024 * 1024;
      
      if (!validTypes.includes(file.type)) {
        setErrors(prev => ({ ...prev, profileImg: "Only JPEG, PNG, GIF, or WebP images are allowed" }));
        return;
      }
      
      if (file.size > maxSize) {
        setErrors(prev => ({ ...prev, profileImg: "Image size must be less than 2MB" }));
        return;
      }
      
      setProfileImg(file);
      setPreviewImg(URL.createObjectURL(file));
      setErrors(prev => ({ ...prev, profileImg: null }));
    }
  };

  // Format phone number input
  const handlePhoneChange = (e, setter) => {
    const value = e.target.value.replace(/\D/g, '');
    if (value.length <= 11) {
      setter(value);
    }
  };

  // Format CNIC input
  const handleCNICChange = (e) => {
    const value = e.target.value.replace(/\D/g, '');
    if (value.length <= 14) {
      setCnic(value);
    }
  };

  useEffect(() => {
    if (!user) return;

    setGender(user.gender || "Other");
    setPhoneNumber(user.phoneNumber || "");
    setCnic(user.cnic || "");
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Mark all required fields as touched
    const requiredFields = role === "Doctor" 
      ? ['phoneNumber', 'cnic', 'specialization', 'qualification', 'location']
      : ['phoneNumber', 'cnic', 'age', 'address'];
    
    const touchedFields = {};
    requiredFields.forEach(field => touchedFields[field] = true);
    setTouched(touchedFields);
    
    // Validate form
    const newErrors = validateForm();
    setErrors(newErrors);
    
    // Check if form is valid
    if (Object.keys(newErrors).length > 0) {
      const firstErrorField = Object.keys(newErrors)[0];
      const element = document.querySelector(`[name="${firstErrorField}"]`);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
        element.focus();
      }
      return;
    }

    setIsSubmitting(true);

    const formData = new FormData();
    formData.append("gender", gender);
    formData.append("phoneNumber", phoneNumber);
    formData.append("cnic", cnic);

    if (profileImg && profileImg instanceof File) {
      formData.append("profileimg", profileImg);
    }

    if (role === "Doctor") {
      formData.append("specialization", specialization);
      formData.append("qualification", qualification);
      formData.append("experience", experience);
      formData.append("about", about);
      formData.append("fees", fees);
      formData.append(
        "availableDays",
        JSON.stringify(
          availableDays
            .split(",")
            .map((d) => d.trim())
            .filter((d) => d)
        )
      );
      const [start, end] = availableTime.split("-");
      formData.append(
        "availableTime",
        JSON.stringify({
          start: start?.trim() || "",
          end: end?.trim() || "",
        })
      );
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
      setErrors(prev => ({ ...prev, submit: "Failed to update profile. Please try again." }));
    } finally {
      setIsSubmitting(false);
    }
  };

  // Helper to check if field has error
  const isFieldInvalid = (field) => {
    return touched[field] && errors[field];
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
      <div className="absolute inset-0 bg-black/30 backdrop-blur-sm pointer-events-none"></div>
      <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-4xl max-h-[95vh] overflow-y-auto z-10">
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
                  <span className="ml-3 bg-green-500 text-white text-xs px-2 py-1 rounded-full animate-pulse">
                    COMPLETE
                  </span>
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
          {/* Profile Photo Section */}
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-100 relative">
            <div className="absolute -top-2 -right-2 bg-green-500 text-white text-xs px-3 py-1 rounded-full animate-pulse">
              REQUIRED
            </div>
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
                  Upload a professional photo for better identification and trust (Max 2MB)
                </p>
                {errors.profileImg && (
                  <div className="flex items-center space-x-2 mt-2 text-red-500 text-sm">
                    <AlertCircle className="h-4 w-4" />
                    <span>{errors.profileImg}</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Basic Information Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative">
            <div className="absolute -top-2 -right-2 bg-green-500 text-white text-xs px-3 py-1 rounded-full animate-pulse">
              REQUIRED
            </div>
            <div className="space-y-2">
              <label className="flex items-center space-x-2 text-sm font-semibold text-gray-700">
                <User className="h-4 w-4 text-blue-500" />
                <span>Gender *</span>
              </label>
              <select
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                onBlur={() => handleBlur('gender')}
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
                <span>Phone Number *</span>
              </label>
              <input
                type="tel"
                name="phoneNumber"
                value={phoneNumber}
                onChange={(e) => handlePhoneChange(e, setPhoneNumber)}
                onBlur={() => handleBlur('phoneNumber')}
                className={`w-full px-4 py-3 border ${isFieldInvalid('phoneNumber') ? 'border-red-300 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'} rounded-xl focus:ring-2 focus:border-transparent transition-all duration-200`}
                placeholder="03123456789 (Exactly 11 digits)"
                maxLength="11"
              />
              {errors.phoneNumber && (
                <div className="flex items-center space-x-2 text-red-500 text-sm">
                  <AlertCircle className="h-4 w-4" />
                  <span>{errors.phoneNumber}</span>
                </div>
              )}
            </div>

            <div className="space-y-2">
              <label className="flex items-center space-x-2 text-sm font-semibold text-gray-700">
                <Fingerprint className="h-4 w-4 text-blue-500" />
                <span>CNIC *</span>
              </label>
              <input
                type="text"
                name="cnic"
                value={cnic}
                onChange={handleCNICChange}
                onBlur={() => handleBlur('cnic')}
                className={`w-full px-4 py-3 border ${isFieldInvalid('cnic') ? 'border-red-300 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'} rounded-xl focus:ring-2 focus:border-transparent transition-all duration-200`}
                placeholder="42101123456789 (Exactly 14 digits)"
                maxLength="14"
              />
              {errors.cnic && (
                <div className="flex items-center space-x-2 text-red-500 text-sm">
                  <AlertCircle className="h-4 w-4" />
                  <span>{errors.cnic}</span>
                </div>
              )}
            </div>
          </div>

          {role === "Doctor" ? (
            <div className="space-y-6">
              {/* Professional Information Section */}
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-100 relative">
                <div className="absolute -top-2 -right-2 bg-green-500 text-white text-xs px-3 py-1 rounded-full animate-pulse">
                  REQUIRED
                </div>
                <h3 className="font-bold text-gray-800 text-lg mb-4 flex items-center space-x-2">
                  <BriefcaseMedical className="h-5 w-5 text-blue-600" />
                  <span>Professional Information</span>
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="flex items-center space-x-2 text-sm font-semibold text-gray-700">
                      <Stethoscope className="h-4 w-4 text-blue-500" />
                      <span>Specialization *</span>
                    </label>
                    <input
                      type="text"
                      name="specialization"
                      value={specialization}
                      onChange={(e) => setSpecialization(e.target.value)}
                      onBlur={() => handleBlur('specialization')}
                      className={`w-full px-4 py-3 border ${isFieldInvalid('specialization') ? 'border-red-300 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'} rounded-xl focus:ring-2 focus:border-transparent transition-all duration-200`}
                      placeholder="Cardiology, Neurology, etc."
                    />
                    {errors.specialization && (
                      <div className="flex items-center space-x-2 text-red-500 text-sm">
                        <AlertCircle className="h-4 w-4" />
                        <span>{errors.specialization}</span>
                      </div>
                    )}
                  </div>

                  <div className="space-y-2">
                    <label className="flex items-center space-x-2 text-sm font-semibold text-gray-700">
                      <GraduationCap className="h-4 w-4 text-blue-500" />
                      <span>Qualification *</span>
                    </label>
                    <input
                      type="text"
                      name="qualification"
                      value={qualification}
                      onChange={(e) => setQualification(e.target.value)}
                      onBlur={() => handleBlur('qualification')}
                      className={`w-full px-4 py-3 border ${isFieldInvalid('qualification') ? 'border-red-300 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'} rounded-xl focus:ring-2 focus:border-transparent transition-all duration-200`}
                      placeholder="MD, MBBS, PhD, etc."
                    />
                    {errors.qualification && (
                      <div className="flex items-center space-x-2 text-red-500 text-sm">
                        <AlertCircle className="h-4 w-4" />
                        <span>{errors.qualification}</span>
                      </div>
                    )}
                  </div>

                  <div className="space-y-2">
                    <label className="flex items-center space-x-2 text-sm font-semibold text-gray-700">
                      <Calendar className="h-4 w-4 text-blue-500" />
                      <span>Experience (Years) *</span>
                    </label>
                    <input
                      type="number"
                      name="experience"
                      value={experience}
                      onChange={(e) => setExperience(e.target.value)}
                      onBlur={() => handleBlur('experience')}
                      className={`w-full px-4 py-3 border ${isFieldInvalid('experience') ? 'border-red-300 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'} rounded-xl focus:ring-2 focus:border-transparent transition-all duration-200`}
                      min="0"
                      max="50"
                      placeholder="0-50 years"
                    />
                    {errors.experience && (
                      <div className="flex items-center space-x-2 text-red-500 text-sm">
                        <AlertCircle className="h-4 w-4" />
                        <span>{errors.experience}</span>
                      </div>
                    )}
                  </div>

                  <div className="space-y-2">
                    <label className="flex items-center space-x-2 text-sm font-semibold text-gray-700">
                      <DollarSign className="h-4 w-4 text-blue-500" />
                      <span>Consultation Fees ($) *</span>
                    </label>
                    <input
                      type="number"
                      name="fees"
                      value={fees}
                      onChange={(e) => setFees(e.target.value)}
                      onBlur={() => handleBlur('fees')}
                      className={`w-full px-4 py-3 border ${isFieldInvalid('fees') ? 'border-red-300 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'} rounded-xl focus:ring-2 focus:border-transparent transition-all duration-200`}
                      min="0"
                      max="10000"
                      placeholder="0-10000"
                    />
                    {errors.fees && (
                      <div className="flex items-center space-x-2 text-red-500 text-sm">
                        <AlertCircle className="h-4 w-4" />
                        <span>{errors.fees}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Availability Section */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative">
                <div className="absolute -top-2 -right-2 bg-green-500 text-white text-xs px-3 py-1 rounded-full animate-pulse">
                  REQUIRED
                </div>
                <div className="space-y-2">
                  <label className="flex items-center space-x-2 text-sm font-semibold text-gray-700">
                    <Calendar className="h-4 w-4 text-blue-500" />
                    <span>Available Days *</span>
                  </label>
                  <input
                    type="text"
                    name="availableDays"
                    value={availableDays}
                    onChange={(e) => setAvailableDays(e.target.value)}
                    onBlur={() => handleBlur('availableDays')}
                    className={`w-full px-4 py-3 border ${isFieldInvalid('availableDays') ? 'border-red-300 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'} rounded-xl focus:ring-2 focus:border-transparent transition-all duration-200`}
                    placeholder="Monday, Wednesday, Friday"
                  />
                  {errors.availableDays && (
                    <div className="flex items-center space-x-2 text-red-500 text-sm">
                      <AlertCircle className="h-4 w-4" />
                      <span>{errors.availableDays}</span>
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <label className="flex items-center space-x-2 text-sm font-semibold text-gray-700">
                    <Clock className="h-4 w-4 text-blue-500" />
                    <span>Available Time *</span>
                  </label>
                  <input
                    type="text"
                    name="availableTime"
                    value={availableTime}
                    onChange={(e) => setAvailableTime(e.target.value)}
                    onBlur={() => handleBlur('availableTime')}
                    className={`w-full px-4 py-3 border ${isFieldInvalid('availableTime') ? 'border-red-300 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'} rounded-xl focus:ring-2 focus:border-transparent transition-all duration-200`}
                    placeholder="17:00-20:00 (HH:MM-HH:MM)"
                  />
                  {errors.availableTime && (
                    <div className="flex items-center space-x-2 text-red-500 text-sm">
                      <AlertCircle className="h-4 w-4" />
                      <span>{errors.availableTime}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Location Section */}
              <div className="space-y-2 relative">
                <div className="absolute -top-2 -right-2 bg-green-500 text-white text-xs px-3 py-1 rounded-full animate-pulse">
                  REQUIRED
                </div>
                <label className="flex items-center space-x-2 text-sm font-semibold text-gray-700">
                  <MapPin className="h-4 w-4 text-blue-500" />
                  <span>Location (Country) *</span>
                </label>
                <input
                  type="text"
                  name="location"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  onBlur={() => handleBlur('location')}
                  className={`w-full px-4 py-3 border ${isFieldInvalid('location') ? 'border-red-300 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'} rounded-xl focus:ring-2 focus:border-transparent transition-all duration-200`}
                  placeholder="United States"
                />
                {errors.location && (
                  <div className="flex items-center space-x-2 text-red-500 text-sm">
                    <AlertCircle className="h-4 w-4" />
                    <span>{errors.location}</span>
                  </div>
                )}
              </div>

              {/* About Section */}
              <div className="space-y-2 relative">
                <div className="absolute -top-2 -right-2 bg-green-500 text-white text-xs px-3 py-1 rounded-full animate-pulse">
                  REQUIRED
                </div>
                <label className="flex items-center space-x-2 text-sm font-semibold text-gray-700">
                  <User className="h-4 w-4 text-blue-500" />
                  <span>About Yourself *</span>
                  <span className={`text-xs font-normal ${about.length > 500 ? 'text-red-500' : 'text-gray-400'}`}>
                    ({about.length}/500)
                  </span>
                </label>
                <textarea
                  name="about"
                  value={about}
                  onChange={(e) => setAbout(e.target.value)}
                  onBlur={() => handleBlur('about')}
                  rows={4}
                  className={`w-full px-4 py-3 border ${isFieldInvalid('about') ? 'border-red-300 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'} rounded-xl focus:ring-2 focus:border-transparent transition-all duration-200 resize-none`}
                  placeholder="Tell patients about your expertise, approach, and experience..."
                />
                {errors.about && (
                  <div className="flex items-center space-x-2 text-red-500 text-sm">
                    <AlertCircle className="h-4 w-4" />
                    <span>{errors.about}</span>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Health Information Section */}
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-100 relative">
                <div className="absolute -top-2 -right-2 bg-green-500 text-white text-xs px-3 py-1 rounded-full animate-pulse">
                  REQUIRED
                </div>
                <h3 className="font-bold text-gray-800 text-lg mb-4 flex items-center space-x-2">
                  <Heart className="h-5 w-5 text-blue-600" />
                  <span>Health Information</span>
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="flex items-center space-x-2 text-sm font-semibold text-gray-700">
                      <Calendar className="h-4 w-4 text-blue-500" />
                      <span>Age *</span>
                    </label>
                    <input
                      type="number"
                      name="age"
                      value={age}
                      onChange={(e) => setAge(e.target.value)}
                      onBlur={() => handleBlur('age')}
                      className={`w-full px-4 py-3 border ${isFieldInvalid('age') ? 'border-red-300 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'} rounded-xl focus:ring-2 focus:border-transparent transition-all duration-200`}
                      placeholder="Enter your age (0-120)"
                      min="0"
                      max="120"
                    />
                    {errors.age && (
                      <div className="flex items-center space-x-2 text-red-500 text-sm">
                        <AlertCircle className="h-4 w-4" />
                        <span>{errors.age}</span>
                      </div>
                    )}
                  </div>

                  <div className="space-y-2">
                    <label className="flex items-center space-x-2 text-sm font-semibold text-gray-700">
                      <Droplets className="h-4 w-4 text-blue-500" />
                      <span>Blood Group *</span>
                    </label>
                    <select
                      value={bloodGroup}
                      onChange={(e) => setBloodGroup(e.target.value)}
                      onBlur={() => handleBlur('bloodGroup')}
                      className={`w-full px-4 py-3 border ${isFieldInvalid('bloodGroup') ? 'border-red-300 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'} rounded-xl focus:ring-2 focus:border-transparent transition-all duration-200 bg-white`}
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
                    {errors.bloodGroup && (
                      <div className="flex items-center space-x-2 text-red-500 text-sm">
                        <AlertCircle className="h-4 w-4" />
                        <span>{errors.bloodGroup}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Medical Details Section */}
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-100 relative">
                <div className="absolute -top-2 -right-2 bg-green-500 text-white text-xs px-3 py-1 rounded-full animate-pulse">
                  REQUIRED
                </div>
                <h3 className="font-bold text-gray-800 text-lg mb-4 flex items-center space-x-2">
                  <AlertTriangle className="h-5 w-5 text-blue-600" />
                  <span>Medical Details</span>
                </h3>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="flex items-center space-x-2 text-sm font-semibold text-gray-700">
                      <Heart className="h-4 w-4 text-blue-500" />
                      <span>Medical History *</span>
                      <span className={`text-xs font-normal ${medicalHistory.length > 1000 ? 'text-red-500' : 'text-gray-400'}`}>
                        ({medicalHistory.length}/1000)
                      </span>
                    </label>
                    <textarea
                      name="medicalHistory"
                      value={medicalHistory}
                      onChange={(e) => setMedicalHistory(e.target.value)}
                      onBlur={() => handleBlur('medicalHistory')}
                      rows={3}
                      className={`w-full px-4 py-3 border ${isFieldInvalid('medicalHistory') ? 'border-red-300 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'} rounded-xl focus:ring-2 focus:border-transparent transition-all duration-200 resize-none`}
                      placeholder="Any past medical conditions, surgeries, or chronic illnesses..."
                    />
                    {errors.medicalHistory && (
                      <div className="flex items-center space-x-2 text-red-500 text-sm">
                        <AlertCircle className="h-4 w-4" />
                        <span>{errors.medicalHistory}</span>
                      </div>
                    )}
                  </div>

                  <div className="space-y-2">
                    <label className="flex items-center space-x-2 text-sm font-semibold text-gray-700">
                      <AlertTriangle className="h-4 w-4 text-blue-500" />
                      <span>Allergies *</span>
                    </label>
                    <input
                      type="text"
                      name="allergies"
                      value={allergies}
                      onChange={(e) => setAllergies(e.target.value)}
                      onBlur={() => handleBlur('allergies')}
                      className={`w-full px-4 py-3 border ${isFieldInvalid('allergies') ? 'border-red-300 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'} rounded-xl focus:ring-2 focus:border-transparent transition-all duration-200`}
                      placeholder="List any allergies (separated by commas)"
                    />
                    {errors.allergies && (
                      <div className="flex items-center space-x-2 text-red-500 text-sm">
                        <AlertCircle className="h-4 w-4" />
                        <span>{errors.allergies}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Contact & Address Section */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative">
                <div className="absolute -top-2 -right-2 bg-green-500 text-white text-xs px-3 py-1 rounded-full animate-pulse">
                  REQUIRED
                </div>
                <div className="space-y-2">
                  <label className="flex items-center space-x-2 text-sm font-semibold text-gray-700">
                    <Ambulance className="h-4 w-4 text-blue-500" />
                    <span>Emergency Contact *</span>
                  </label>
                  <input
                    type="tel"
                    name="emergencyPhone"
                    value={emergencyPhone}
                    onChange={(e) => handlePhoneChange(e, setEmergencyPhone)}
                    onBlur={() => handleBlur('emergencyPhone')}
                    className={`w-full px-4 py-3 border ${isFieldInvalid('emergencyPhone') ? 'border-red-300 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'} rounded-xl focus:ring-2 focus:border-transparent transition-all duration-200`}
                    placeholder="Emergency phone (Exactly 11 digits)"
                    maxLength="11"
                  />
                  {errors.emergencyPhone && (
                    <div className="flex items-center space-x-2 text-red-500 text-sm">
                      <AlertCircle className="h-4 w-4" />
                      <span>{errors.emergencyPhone}</span>
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <label className="flex items-center space-x-2 text-sm font-semibold text-gray-700">
                    <Home className="h-4 w-4 text-blue-500" />
                    <span>Address *</span>
                  </label>
                  <input
                    type="text"
                    name="address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    onBlur={() => handleBlur('address')}
                    className={`w-full px-4 py-3 border ${isFieldInvalid('address') ? 'border-red-300 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'} rounded-xl focus:ring-2 focus:border-transparent transition-all duration-200`}
                    placeholder="Your complete address"
                  />
                  {errors.address && (
                    <div className="flex items-center space-x-2 text-red-500 text-sm">
                      <AlertCircle className="h-4 w-4" />
                      <span>{errors.address}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Submit Buttons Section */}
          <div className="flex space-x-4 pt-6 border-t border-gray-200 relative">
            <div className="absolute -top-2 -right-2 bg-blue-500 text-white text-xs px-3 py-1 rounded-full animate-pulse">
              UPDATE YOUR PROFILE
            </div>
            {errors.submit && (
              <div className="col-span-2 flex items-center space-x-2 text-red-500 text-sm mb-4 bg-red-50 p-3 rounded-xl">
                <AlertCircle className="h-5 w-5" />
                <span>{errors.submit}</span>
              </div>
            )}
            <button
              type="button"
              onClick={() => dispatch(closeModal())}
              className="flex-1 px-8 py-4 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-all duration-200 font-semibold hover:scale-[1.02] active:scale-[0.98]"
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl transition-all duration-200 font-semibold shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] hover:from-blue-700 hover:to-blue-800 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              {isSubmitting ? (
                <div className="flex items-center justify-center space-x-2">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Saving...</span>
                </div>
              ) : (
                "Save Profile"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}