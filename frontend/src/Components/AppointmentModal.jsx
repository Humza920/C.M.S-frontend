import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { closeModal } from "../Features/modalSlice";
import { fetchAvailableSlots, bookAppointment, clearMessages } from "../Features/dashboardslice";
import { X, Calendar, Clock, MapPin, Award, Star, Stethoscope, CheckCircle2 } from "lucide-react";

const AppointmentModal = () => {
  const dispatch = useDispatch();
  const { modalData: doctor } = useSelector((state) => state.modal);
  const { slots, loading, success, error } = useSelector((state) => state.dashboard);

  const [activeTab, setActiveTab] = useState("week");
  const [range, setRange] = useState("week");
  const [selectedSlot, setSelectedSlot] = useState(null);

  useEffect(() => {
    if (doctor) dispatch(fetchAvailableSlots({ doctorId: doctor._id, range }));
  }, [doctor, range, dispatch]);

  useEffect(() => {
    if (success || error) {
      const timer = setTimeout(() => dispatch(clearMessages()), 3000);
      return () => clearTimeout(timer);
    }
  }, [success, error, dispatch]);

  const handleClose = () => dispatch(closeModal());

  const handleBookAppointment = () => {
    if (selectedSlot) {
      dispatch(bookAppointment({
        doctorId: selectedSlot.doctorId,
        date: selectedSlot.date,
        time: selectedSlot.time,
        day: selectedSlot.day
      }));
    }
  };

  if (!doctor) return null;

  return (
    <div className="fixed inset-0 z-[100]">
      {/* Blurry Background */}
      <div
        className="absolute inset-0 backdrop-blur-xl bg-black/40 transition-all duration-300"
        onClick={handleClose}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 mix-blend-overlay"></div>
      </div>

      {/* Modal Container */}
      <div className="relative flex items-center justify-center min-h-screen p-4">
        <div
          className="relative bg-white rounded-3xl shadow-2xl w-full max-w-2xl border border-white/20"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600/90 to-blue-700/90 px-6 py-5 rounded-t-3xl border-b border-white/20 flex items-center justify-between">
            <h2 className="text-2xl font-bold text-white">Book Appointment</h2>
            <button
              onClick={handleClose}
              className="p-2.5 hover:bg-white/20 rounded-xl border border-white/10 hover:border-white/30 transition-all"
            >
              <X className="h-5 w-5 text-white" />
            </button>
          </div>

          <div className="p-6 max-h-[75vh] overflow-y-auto">
            {/* Doctor Info */}
            <div className="flex items-start gap-4 bg-blue-50 p-5 rounded-2xl mb-5">
              <img
                src={doctor.profileImg || "https://cdn-icons-png.flaticon.com/512/847/847969.png"}
                alt={doctor.userId?.userName}
                className="w-20 h-20 rounded-2xl object-cover"
              />
              <div>
                <h3 className="text-xl font-semibold">{doctor.userId?.userName}</h3>
                <p className="text-blue-600">{doctor.specialization || "Specialist"}</p>
                <p className="text-gray-600 text-sm">{doctor.qualification}</p>
                <p className="text-gray-600 text-sm">
                  {doctor.experience}+ yrs • {doctor.location?.country || "Online"}
                </p>
              </div>
            </div>

            {/* Tabs */}
            <div className="flex gap-2 mb-4">
              {["week", "month"].map((type) => (
                <button
                  key={type}
                  onClick={() => { setActiveTab(type); setRange(type); }}
                  className={`flex-1 py-2 rounded-lg font-semibold transition ${
                    activeTab === type ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-700"
                  }`}
                >
                  {type === "week" ? "This Week" : "This Month"}
                </button>
              ))}
            </div>

            {/* Available Slots */}
            <div className="space-y-4">
              {slots.length ? (
                slots.map((daySlot, i) => (
                  <div key={i} className="bg-white border rounded-xl p-4">
                    <h4 className="font-semibold text-gray-800 mb-2">
                      {daySlot.day} - {daySlot.date}
                    </h4>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                      {daySlot.availableSlots.map((slot, idx) => (
                        <button
                          key={idx}
                          onClick={() =>
                            setSelectedSlot({
                              doctorId: doctor._id,
                              date: daySlot.date,
                              day: daySlot.day,
                              time: slot,
                            })
                          }
                          className={`py-2 px-2 border rounded-lg transition ${
                            selectedSlot?.time === slot && selectedSlot?.date === daySlot.date
                              ? "bg-blue-50 border-blue-500 text-blue-600"
                              : "hover:bg-blue-50"
                          }`}
                        >
                          {slot}
                        </button>
                      ))}
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-gray-500 text-center py-6">No slots available</p>
              )}
            </div>

            {/* Confirm Section */}
            <div className="mt-6 flex gap-3">
              <button
                onClick={handleClose}
                className="flex-1 py-2 border rounded-lg text-gray-700 hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                onClick={handleBookAppointment}
                disabled={!selectedSlot || loading}
                className={`flex-1 py-2 rounded-lg font-semibold transition ${
                  selectedSlot
                    ? "bg-blue-600 text-white hover:bg-blue-700"
                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                }`}
              >
                {loading ? "Booking..." : "Confirm Appointment"}
              </button>
            </div>

            {/* Success/Error Message */}
            {success && <p className="text-green-600 mt-3 text-center">{success}</p>}
            {error && <p className="text-red-600 mt-3 text-center">{error}</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppointmentModal;
