// components/ViewDetailsModal.jsx
import { useDispatch, useSelector } from 'react-redux';
import { closeModal } from '../Features/modalSlice';
import { User, Mail, Phone, MapPin, Calendar, Award, Stethoscope, Clock, Heart, Shield, Star, X, IndianRupee } from 'lucide-react';

const ViewDetailsModal = () => {
  const dispatch = useDispatch();
  const { modalData } = useSelector((state) => state.modal);
  
  // Check if data is for patient or doctor
  const isPatient = modalData?.userId?.role === 'Patient' || 
                   modalData?.bloodGroup || 
                   modalData?.medicalHistory;

  const isDoctor = modalData?.userId?.role === 'Doctor' || 
                  modalData?.specialization || 
                  modalData?.qualification;

  // Helper functions
  const getLocationDisplay = (location) => {
    if (!location) return "Not specified";
    if (typeof location === 'string') return location;
    if (typeof location === 'object') {
      return location.country || location.city || "Location specified";
    }
    return "Not specified";
  };

  const formatAvailableDays = (days) => {
    if (!Array.isArray(days) || days.length === 0) return "Not specified";
    return days.join(", ");
  };

  const formatAvailableTime = (time) => {
    if (!time || !time.start || !time.end) return "Not specified";
    return `${time.start} - ${time.end}`;
  };

  const getAge = (dob) => {
    if (!dob) return "N/A";
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  if (!modalData) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-2xl p-8 max-w-md w-full mx-4">
          <div className="text-center">
            <User className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-800 mb-2">No Data Found</h3>
            <p className="text-gray-600 mb-6">No user data available to display.</p>
            <button
              onClick={() => dispatch(closeModal())}
              className="bg-blue-600 text-white px-6 py-2 rounded-xl font-semibold hover:bg-blue-700 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0  bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-800">
            {isDoctor ? 'Doctor Details' : 'Patient Details'}
          </h2>
          <button
            onClick={() => dispatch(closeModal())}
            className="p-2 hover:bg-gray-100 rounded-xl transition-colors"
          >
            <X className="w-6 h-6 text-gray-600" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {isDoctor ? (
            /* Doctor Details */
            <div className="space-y-6">
              {/* Profile Header */}
              <div className="flex items-center gap-6">
                <img
                  src={modalData.profileImg || "https://cdn-icons-png.flaticon.com/512/3304/3304567.png"}
                  alt="Profile"
                  className="w-20 h-20 rounded-2xl object-cover border-4 border-blue-200"
                />
                <div>
                  <h3 className="text-2xl font-bold text-gray-800">
                    Dr. {modalData.userId?.userName || "Unnamed"}
                  </h3>
                  <p className="text-blue-600 font-semibold text-lg">
                    {modalData.specialization || "Medical Specialist"}
                  </p>
                  <div className="flex items-center gap-4 mt-2">
                    <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">
                      {modalData.userId?.role}
                    </span>
                    <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium">
                      {modalData.experience || 0} years experience
                    </span>
                  </div>
                </div>
              </div>

              {/* Professional Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-blue-50 rounded-2xl p-4">
                  <div className="flex items-center gap-3 mb-3">
                    <Award className="w-5 h-5 text-blue-600" />
                    <h4 className="font-semibold text-gray-800">Qualification</h4>
                  </div>
                  <p className="text-gray-700">{modalData.qualification || "Not specified"}</p>
                </div>

                <div className="bg-green-50 rounded-2xl p-4">
                  <div className="flex items-center gap-3 mb-3">
                    <Stethoscope className="w-5 h-5 text-green-600" />
                    <h4 className="font-semibold text-gray-800">Specialization</h4>
                  </div>
                  <p className="text-gray-700">{modalData.specialization || "Not specified"}</p>
                </div>

                <div className="bg-purple-50 rounded-2xl p-4">
                  <div className="flex items-center gap-3 mb-3">
                    <Calendar className="w-5 h-5 text-purple-600" />
                    <h4 className="font-semibold text-gray-800">Experience</h4>
                  </div>
                  <p className="text-gray-700">{modalData.experience || 0} years</p>
                </div>

                <div className="bg-amber-50 rounded-2xl p-4">
                  <div className="flex items-center gap-3 mb-3">
                    <IndianRupee className="w-5 h-5 text-amber-600" />
                    <h4 className="font-semibold text-gray-800">Consultation Fee</h4>
                  </div>
                  <p className="text-gray-700">₹{modalData.fees || 0}</p>
                </div>
              </div>

              {/* Availability */}
              <div className="bg-gray-50 rounded-2xl p-6">
                <h4 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                  <Clock className="w-5 h-5 text-blue-600" />
                  Availability
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <p className="text-sm text-gray-600 mb-2">Available Days</p>
                    <div className="flex flex-wrap gap-2">
                      {Array.isArray(modalData.availableDays) && modalData.availableDays.length > 0 ? (
                        modalData.availableDays.map((day, index) => (
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
                    <p className="text-sm text-gray-600 mb-2">Available Time</p>
                    <p className="font-semibold text-gray-800">
                      {formatAvailableTime(modalData.availableTime)}
                    </p>
                  </div>
                </div>
              </div>

              {/* Contact Information */}
              <div className="bg-gray-50 rounded-2xl p-6">
                <h4 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                  <User className="w-5 h-5 text-blue-600" />
                  Contact Information
                </h4>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <Mail className="w-4 h-4 text-gray-600" />
                    <span className="text-gray-700">{modalData.userId?.emailAddress || "Not specified"}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="w-4 h-4 text-gray-600" />
                    <span className="text-gray-700">{modalData.phoneNumber || "Not specified"}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <MapPin className="w-4 h-4 text-gray-600" />
                    <span className="text-gray-700">{getLocationDisplay(modalData.location)}</span>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            /* Patient Details */
            <div className="space-y-6">
              {/* Profile Header */}
              <div className="flex items-center gap-6">
                <img
                  src={modalData.profileImg || "https://cdn-icons-png.flaticon.com/512/847/847969.png"}
                  alt="Profile"
                  className="w-20 h-20 rounded-2xl object-cover border-4 border-green-200"
                />
                <div>
                  <h3 className="text-2xl font-bold text-gray-800">
                    {modalData.userId?.userName || "Unnamed"}
                  </h3>
                  <p className="text-green-600 font-semibold text-lg">Patient</p>
                  <div className="flex items-center gap-4 mt-2">
                    <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium">
                      {modalData.gender || "Not specified"}
                    </span>
                    <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">
                      {getAge(modalData.dateOfBirth)} years old
                    </span>
                  </div>
                </div>
              </div>

              {/* Personal Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-blue-50 rounded-2xl p-4">
                  <div className="flex items-center gap-3 mb-3">
                    <User className="w-5 h-5 text-blue-600" />
                    <h4 className="font-semibold text-gray-800">Personal Info</h4>
                  </div>
                  <div className="space-y-2">
                    <p><span className="text-gray-600">Age:</span> {getAge(modalData.dateOfBirth)} years</p>
                    <p><span className="text-gray-600">Gender:</span> {modalData.gender || "Not specified"}</p>
                    <p><span className="text-gray-600">Blood Group:</span> {modalData.bloodGroup || "Not specified"}</p>
                  </div>
                </div>

                <div className="bg-green-50 rounded-2xl p-4">
                  <div className="flex items-center gap-3 mb-3">
                    <Heart className="w-5 h-5 text-green-600" />
                    <h4 className="font-semibold text-gray-800">Medical Info</h4>
                  </div>
                  <div className="space-y-2">
                    <p><span className="text-gray-600">Medical History:</span> {modalData.medicalHistory ? "Available" : "None"}</p>
                    <p><span className="text-gray-600">Allergies:</span> {modalData.allergies?.length || 0}</p>
                  </div>
                </div>
              </div>

              {/* Contact Information */}
              <div className="bg-gray-50 rounded-2xl p-6">
                <h4 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-blue-600" />
                  Contact & Location
                </h4>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <Mail className="w-4 h-4 text-gray-600" />
                    <span className="text-gray-700">{modalData.userId?.emailAddress || "Not specified"}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="w-4 h-4 text-gray-600" />
                    <span className="text-gray-700">{modalData.phoneNumber || "Not specified"}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <MapPin className="w-4 h-4 text-gray-600" />
                    <span className="text-gray-700">{getLocationDisplay(modalData.location)}</span>
                  </div>
                  {modalData.address && (
                    <div className="flex items-start gap-3">
                      <MapPin className="w-4 h-4 text-gray-600 mt-1" />
                      <span className="text-gray-700">{modalData.address}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Emergency Contact */}
              {modalData.emergencyContact && (
                <div className="bg-red-50 rounded-2xl p-6">
                  <h4 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                    <Shield className="w-5 h-5 text-red-600" />
                    Emergency Contact
                  </h4>
                  <div className="space-y-2">
                    <p><span className="text-gray-600">Name:</span> {modalData.emergencyContact.name || "Not specified"}</p>
                    <p><span className="text-gray-600">Phone:</span> {modalData.emergencyContact.phone || "Not specified"}</p>
                    <p><span className="text-gray-600">Relation:</span> {modalData.emergencyContact.relation || "Not specified"}</p>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 p-6 border-t border-gray-200">
          <button
            onClick={() => dispatch(closeModal())}
            className="bg-gray-500 text-white px-6 py-2 rounded-xl font-semibold hover:bg-gray-600 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ViewDetailsModal;