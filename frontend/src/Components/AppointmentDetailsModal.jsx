import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { closeModal } from "../Features/modalSlice";
import { X, Calendar, Clock, MapPin, Award, Star, Stethoscope } from "lucide-react";

const AppointmentDetailsModal = () => {
  const dispatch = useDispatch();
  const { modalData: appointment } = useSelector((state) => state.modal);

  if (!appointment) return null;

  const handleClose = () => dispatch(closeModal());

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Blur Background */}
      <div 
        className="absolute inset-0 backdrop-blur-sm bg-black/30"
        onClick={handleClose}
      ></div>
      
      {/* Modal Content */}
      <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto relative z-10">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900">Appointment Details</h2>
          <button
            onClick={handleClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="p-6">
          {/* Doctor Information */}
          <div className="bg-blue-50 rounded-lg p-4 mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Doctor Information</h3>
            <div className="flex items-start gap-4">
              <img
                src={appointment.doctorId?.profileImg || "https://cdn-icons-png.flaticon.com/512/847/847969.png"}
                alt={appointment.doctorId?.userId?.userName}
                className="w-16 h-16 rounded-lg object-cover border-2 border-white"
              />
              <div className="flex-1">
                <h4 className="text-xl font-bold text-gray-900 mb-1">
                  Dr. {appointment.doctorId?.userId?.userName}
                </h4>
                <p className="text-blue-600 font-medium mb-2">
                  {appointment.doctorId?.specialization}
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <Award className="h-4 w-4 text-green-500" />
                    <span>{appointment.doctorId?.qualification}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Stethoscope className="h-4 w-4 text-purple-500" />
                    <span>{appointment.doctorId?.experience} years experience</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-red-500" />
                    <span>{appointment.doctorId?.location?.country}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                    <span>Rating: {appointment.doctorId?.averageRating || "Not rated"}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Appointment Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Appointment Details</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Calendar className="h-5 w-5 text-blue-500" />
                  <div>
                    <p className="text-sm text-gray-600">Date</p>
                    <p className="font-medium text-gray-900">
                      {new Date(appointment.appointmentDate).toLocaleDateString('en-US', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Clock className="h-5 w-5 text-purple-500" />
                  <div>
                    <p className="text-sm text-gray-600">Time Slot</p>
                    <p className="font-medium text-gray-900">
                      {appointment.startAt} - {appointment.endAt}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Stethoscope className="h-5 w-5 text-green-500" />
                  <div>
                    <p className="text-sm text-gray-600">Day</p>
                    <p className="font-medium text-gray-900 capitalize">{appointment.day}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Status & Information</h3>
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Appointment Status</p>
                  <span className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium ${
                    appointment.status === "booked" 
                      ? "bg-green-100 text-green-800"
                      : appointment.status === "completed"
                      ? "bg-blue-100 text-blue-800"
                      : "bg-red-100 text-red-800"
                  }`}>
                    <div className={`w-2 h-2 rounded-full ${
                      appointment.status === "booked" ? "bg-green-500" : 
                      appointment.status === "completed" ? "bg-blue-500" : "bg-red-500"
                    }`}></div>
                    {appointment.status}
                  </span>
                </div>

                <div>
                  <p className="text-sm text-gray-600 mb-1">Consultation Fee</p>
                  <p className="font-medium text-gray-900">₹{appointment.doctorId?.fees}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Patient Information */}
          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Appointment Information</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-gray-600">Appointment ID</p>
                <p className="font-medium text-gray-900">{appointment._id}</p>
              </div>
              <div>
                <p className="text-gray-600">Booked On</p>
                <p className="font-medium text-gray-900">
                  {new Date(appointment.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>

          {/* Close Button */}
          <div className="flex justify-end pt-6">
            <button
              onClick={handleClose}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppointmentDetailsModal;