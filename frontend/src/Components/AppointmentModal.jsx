import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { closeModal } from "../Features/modalSlice";
import { fetchAvailableSlots, bookAppointment, clearMessages } from "../Features/appointmentslice";
import { 
  X, 
  Calendar, 
  Clock, 
  MapPin, 
  Award, 
  Star, 
  Stethoscope, 
  CheckCircle2, 
  User,
  Shield,
  Sparkles,
  BadgeCheck
} from "lucide-react";
import toast, { Toaster } from "react-hot-toast";

const AppointmentModal = () => {
  const dispatch = useDispatch();
  const { modalData: doctor } = useSelector((state) => state.modal);
  const { slots, loading, success, error } = useSelector((state) => state.appointment);
  const { user , role} = useSelector((state) => state.auth); // ✅ user info from auth slice

  const [activeTab, setActiveTab] = useState("week");
  const [range, setRange] = useState("week");
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [bookingStep, setBookingStep] = useState(1); // 1: Select slot, 2: Confirm details

  // ✅ Fetch Slots
  useEffect(() => {
    if (doctor) dispatch(fetchAvailableSlots({ doctorId: doctor._id, range }));
  }, [doctor, range, dispatch]);

  // ✅ Handle Toasts for Success & Error
  useEffect(() => {
    if (success) {
      toast.success(success, { duration: 4000, position: "top-center" });
      setTimeout(() => dispatch(clearMessages()), 5000);
    }
    if (error) {
      toast.error(error, { duration: 4000, position: "top-center" });
      setTimeout(() => dispatch(clearMessages()), 5000);
    }
  }, [success, error, dispatch]);

  const handleClose = () => {
    dispatch(closeModal());
    setBookingStep(1);
    setSelectedSlot(null);
  };

  // ✅ Booking Handler with Patient Check
  const handleBookAppointment = () => {
    if (!user) {
      toast.error("Please login first to book an appointment.", {
        position: "top-center",
      });
      return;
    }

    if (role !== "Patient") {
      toast.error("Only patients can book an appointment.", {
        position: "top-center",
      });
      return;
    }

    if (selectedSlot) {
      dispatch(
        bookAppointment({
          doctorId: selectedSlot.doctorId,
          date: selectedSlot.date,
          time: selectedSlot.time,
          day: selectedSlot.day,
        })
      );
    } else {
      toast.error("Please select a slot first!", { position: "bottom-center" });
    }
  };

  const handleSlotSelect = (slotData) => {
    setSelectedSlot(slotData);
    setBookingStep(2);
  };

  const handleBackToSlots = () => {
    setBookingStep(1);
  };

  if (!doctor) return null;

  return (
    <div className="fixed inset-0 z-[100]">
      {/* Premium Blur Background */}
      <div
        className="absolute inset-0 backdrop-blur-2xl bg-black/50 transition-all duration-500"
        onClick={handleClose}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-purple-600/20 mix-blend-overlay"></div>
      </div>

      {/* Modal Container */}
      <div className="relative flex items-center justify-center min-h-screen p-4">
        <div
          className="relative bg-white rounded-3xl shadow-2xl w-full max-w-4xl border border-white/20 overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-700 via-blue-600 to-purple-600 px-8 py-6 border-b border-white/20">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-white/20 rounded-xl backdrop-blur-sm">
                  <Calendar className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white">Book Your Appointment</h2>
                  <p className="text-blue-100 text-sm">Secure your consultation with our specialist</p>
                </div>
              </div>
              <button
                onClick={handleClose}
                className="p-3 hover:bg-white/20 rounded-xl border border-white/10 hover:border-white/30 transition-all duration-300 hover:scale-110"
              >
                <X className="h-5 w-5 text-white" />
              </button>
            </div>
          </div>

          <div className="p-8 max-h-[80vh] overflow-y-auto">
            {/* Progress Steps */}
            <div className="flex items-center justify-center mb-8">
              <div className="flex items-center">
                <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
                  bookingStep === 1 ? 'bg-blue-600 border-blue-600 text-white' : 'bg-green-500 border-green-500 text-white'
                }`}>
                  {bookingStep === 1 ? '1' : <CheckCircle2 className="h-5 w-5" />}
                </div>
                <div className={`w-20 h-1 ${
                  bookingStep === 1 ? 'bg-gray-300' : 'bg-green-500'
                }`}></div>
                <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
                  bookingStep === 1 ? 'bg-gray-100 border-gray-300 text-gray-400' : 'bg-blue-600 border-blue-600 text-white'
                }`}>
                  2
                </div>
              </div>
            </div>

            {/* Doctor Premium Card */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-6 mb-8 border border-blue-100 shadow-sm">
              <div className="flex items-start gap-6">
                <div className="relative">
                  <img
                    src={doctor.profileImg || "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=150&h=150&fit=crop&crop=face"}
                    alt={doctor.userId?.userName}
                    className="w-24 h-24 rounded-2xl object-cover border-4 border-white shadow-lg"
                  />
                  <div className="absolute -bottom-2 -right-2 bg-green-500 text-white p-1.5 rounded-full shadow-lg">
                    <BadgeCheck className="h-4 w-4" />
                  </div>
                </div>
                
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-1">Dr. {doctor.userId?.userName}</h3>
                      <p className="text-blue-600 font-semibold text-lg mb-2">{doctor.specialization || "Medical Specialist"}</p>
                      
                      <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                        <div className="flex items-center gap-1">
                          <Award className="h-4 w-4 text-amber-500" />
                          <span>{doctor.qualification}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4 text-purple-500" />
                          <span>{doctor.experience}+ years experience</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <MapPin className="h-4 w-4 text-red-500" />
                          <span>{doctor.location?.country || "Online Consultation"}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <div className="flex items-center gap-1 bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
                        <Star className="h-4 w-4 text-amber-500 fill-amber-500" />
                        <span className="font-semibold text-amber-700">4.9</span>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">Patient Rating</p>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    <div className="flex items-center gap-1 bg-green-50 px-3 py-1 rounded-full border border-green-200">
                      <Shield className="h-3 w-3 text-green-600" />
                      <span className="text-xs font-medium text-green-700">Verified Doctor</span>
                    </div>
                    <div className="flex items-center gap-1 bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
                      <Sparkles className="h-3 w-3 text-blue-600" />
                      <span className="text-xs font-medium text-blue-700">Premium Specialist</span>
                    </div>
                    <div className="flex items-center gap-1 bg-purple-50 px-3 py-1 rounded-full border border-purple-200">
                      <Stethoscope className="h-3 w-3 text-purple-600" />
                      <span className="text-xs font-medium text-purple-700">Expert Care</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {bookingStep === 1 ? (
              /* Step 1: Slot Selection */
              <div className="space-y-6">
                {/* Time Range Tabs */}
                <div className="bg-gray-50 rounded-2xl p-1.5 inline-flex">
                  {["week", "month"].map((type) => (
                    <button
                      key={type}
                      onClick={() => { setActiveTab(type); setRange(type); }}
                      className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                        activeTab === type 
                          ? "bg-white text-blue-600 shadow-lg border border-blue-100" 
                          : "text-gray-600 hover:text-gray-800"
                      }`}
                    >
                      {type === "week" ? "This Week" : "This Month"}
                    </button>
                  ))}
                </div>

                {/* Available Slots */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                    <Clock className="h-5 w-5 text-blue-600" />
                    Available Time Slots
                  </h3>
                  
                  {loading ? (
                    <div className="text-center py-12">
                      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                      <p className="text-blue-600 font-semibold">Loading available slots...</p>
                      <p className="text-gray-500 text-sm">Please wait while we fetch the schedule</p>
                    </div>
                  ) : slots.length > 0 ? (
                    <div className="grid gap-4">
                      {slots.map((daySlot, i) => (
                        <div key={i} className="bg-white border border-gray-200 rounded-2xl p-5 hover:shadow-lg transition-all duration-300">
                          <div className="flex items-center gap-3 mb-4">
                            <Calendar className="h-5 w-5 text-blue-600" />
                            <h4 className="font-semibold text-gray-800 text-lg">
                              {daySlot.day}, {new Date(daySlot.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric' })}
                            </h4>
                          </div>
                          
                          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                            {daySlot.availableSlots.map((slot, idx) => (
                              <button
                                key={idx}
                                onClick={() => handleSlotSelect({
                                  doctorId: doctor._id,
                                  date: daySlot.date,
                                  day: daySlot.day,
                                  time: slot,
                                })}
                                className="group py-3 px-4 bg-white border-2 border-gray-200 rounded-xl hover:border-blue-500 hover:bg-blue-50 transition-all duration-300 text-center"
                              >
                                <div className="font-semibold text-gray-700 group-hover:text-blue-600">{slot}</div>
                                <div className="text-xs text-gray-500 group-hover:text-blue-500 mt-1">Available</div>
                              </button>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-300">
                      <Calendar className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                      <h4 className="text-lg font-semibold text-gray-600 mb-2">No Available Slots</h4>
                      <p className="text-gray-500 max-w-sm mx-auto">
                        Dr. {doctor.userId?.userName} doesn't have available slots for the selected period.
                      </p>
                      <button 
                        onClick={() => setRange(range === 'week' ? 'month' : 'week')}
                        className="mt-4 text-blue-600 font-semibold hover:text-blue-700 transition-colors"
                      >
                        Try {range === 'week' ? 'This Month' : 'This Week'}
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              /* Step 2: Confirmation */
              <div className="space-y-6">
                <div className="bg-green-50 border border-green-200 rounded-2xl p-6 text-center">
                  <CheckCircle2 className="h-16 w-16 text-green-500 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-green-800 mb-2">Appointment Selected!</h3>
                  <p className="text-green-600">Please review your appointment details below</p>
                </div>

                {/* Appointment Summary */}
                <div className="bg-white border border-gray-200 rounded-2xl p-6">
                  <h4 className="text-lg font-semibold text-gray-900 mb-4">Appointment Summary</h4>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-xl">
                        <User className="h-5 w-5 text-blue-600" />
                        <div>
                          <p className="text-sm text-gray-600">Doctor</p>
                          <p className="font-semibold text-gray-900">Dr. {doctor.userId?.userName}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-3 p-3 bg-purple-50 rounded-xl">
                        <Stethoscope className="h-5 w-5 text-purple-600" />
                        <div>
                          <p className="text-sm text-gray-600">Specialization</p>
                          <p className="font-semibold text-gray-900">{doctor.specialization}</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <div className="flex items-center gap-3 p-3 bg-green-50 rounded-xl">
                        <Calendar className="h-5 w-5 text-green-600" />
                        <div>
                          <p className="text-sm text-gray-600">Date & Day</p>
                          <p className="font-semibold text-gray-900">
                            {selectedSlot?.date} ({selectedSlot?.day})
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-3 p-3 bg-amber-50 rounded-xl">
                        <Clock className="h-5 w-5 text-amber-600" />
                        <div>
                          <p className="text-sm text-gray-600">Time Slot</p>
                          <p className="font-semibold text-gray-900">{selectedSlot?.time}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-4 pt-4">
                  <button
                    onClick={handleBackToSlots}
                    className="flex-1 py-4 border-2 border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-all duration-300"
                  >
                    Back to Slots
                  </button>
                  <button
                    onClick={handleBookAppointment}
                    disabled={loading}
                    className="flex-1 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? (
                      <div className="flex items-center justify-center gap-2">
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                        Processing Booking...
                      </div>
                    ) : (
                      "Confirm & Book Appointment"
                    )}
                  </button>
                </div>
              </div>
            )}

            {/* Success/Error Messages */}
            {success && (
              <div className="mt-6 bg-green-50 border border-green-200 rounded-2xl p-4 animate-in fade-in duration-500">
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="h-5 w-5 text-green-600" />
                  <div>
                    <p className="font-semibold text-green-800">Appointment Booked Successfully!</p>
                    <p className="text-green-600 text-sm">{success}</p>
                  </div>
                </div>
              </div>
            )}

            {error && (
              <div className="mt-6 bg-red-50 border border-red-200 rounded-2xl p-4 animate-in fade-in duration-500">
                <div className="flex items-center gap-3">
                  <X className="h-5 w-5 text-red-600" />
                  <div>
                    <p className="font-semibold text-red-800">Booking Failed</p>
                    <p className="text-red-600 text-sm">{error}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppointmentModal;