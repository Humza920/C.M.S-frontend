import { useDispatch, useSelector } from "react-redux";
import { closeModal } from "../Features/modalSlice";
// import { updateAppointmentStatus, addAppointmentNotes } from "../Features/dashboardslice";
import { useState } from "react";

export default function UpdateAppointmentModal() {
  const dispatch = useDispatch();
  const { modalData } = useSelector((state) => state.modal);
  console.log("Modal Data:", modalData);
  
  const { 
    _id, 
    patientId, 
    doctorId, 
    appointmentDate, 
    startAt, 
    endAt, 
    status, 
    day 
  } = modalData || {};

  const [notes, setNotes] = useState("");

  if (!modalData) return null;

  const handleComplete = () => {
    // dispatch(updateAppointmentStatus({ appointmentId: _id, status: "completed" }));
    dispatch(closeModal());
  };

  const handleCheckedIn = () => {
    // dispatch(updateAppointmentStatus({ appointmentId: _id, status: "checked-in" }));
    dispatch(closeModal());
  };

  const handleAddNotes = () => {
    if (!notes.trim()) return;
    // dispatch(addAppointmentNotes({ appointmentId: _id, notes }));
    setNotes("");
    dispatch(closeModal());
  };

  // Extract patient and doctor data from the nested structure
  const patient = patientId?.userId || {};
  const doctor = doctorId?.userId || {};

  return (
    <div className="p-6 max-w-4xl mx-auto bg-white rounded-lg shadow-xl">
      <h2 className="text-3xl font-bold mb-6 text-center text-gray-800 border-b pb-4">
        Appointment Details
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Left Column - Patient & Doctor Information */}
        <div className="space-y-6">
          {/* Patient Information */}
          <div className="bg-blue-50 p-5 rounded-xl border border-blue-200">
            <h3 className="font-bold text-xl mb-4 text-blue-800 flex items-center gap-2">
              👤 Patient Information
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="font-semibold text-gray-700">Full Name:</span>
                <span className="text-gray-900">{patient?.fullName || patient?.userName || "N/A"}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold text-gray-700">Email:</span>
                <span className="text-gray-900">{patient?.email || "N/A"}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold text-gray-700">Phone:</span>
                <span className="text-gray-900">{patientId?.phoneNumber || "N/A"}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold text-gray-700">Age:</span>
                <span className="text-gray-900">{patientId?.age || "N/A"}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold text-gray-700">Gender:</span>
                <span className="text-gray-900">{patientId?.gender || "N/A"}</span>
              </div>
            </div>
          </div>

          {/* Doctor Information */}
          <div className="bg-green-50 p-5 rounded-xl border border-green-200">
            <h3 className="font-bold text-xl mb-4 text-green-800 flex items-center gap-2">
              🩺 Doctor Information
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="font-semibold text-gray-700">Doctor Name:</span>
                <span className="text-gray-900">{doctor?.fullName || doctor?.userName || "N/A"}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold text-gray-700">Email:</span>
                <span className="text-gray-900">{doctor?.email || "N/A"}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold text-gray-700">Specialization:</span>
                <span className="text-gray-900">{doctorId?.specialization || "N/A"}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold text-gray-700">Gender:</span>
                <span className="text-gray-900">{doctorId?.gender || "N/A"}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Appointment Details & Actions */}
        <div className="space-y-6">
          {/* Appointment Details */}
          <div className="bg-purple-50 p-5 rounded-xl border border-purple-200">
            <h3 className="font-bold text-xl mb-4 text-purple-800 flex items-center gap-2">
              📅 Appointment Details
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="font-semibold text-gray-700">Date:</span>
                <span className="text-gray-900">
                  {new Date(appointmentDate).toLocaleDateString('en-US', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold text-gray-700">Day:</span>
                <span className="text-gray-900">{day}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold text-gray-700">Time:</span>
                <span className="text-gray-900 font-mono">{startAt} - {endAt}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-semibold text-gray-700">Status:</span>
                <span
                  className={`px-3 py-1 rounded-full font-semibold text-sm ${
                    status === "completed"
                      ? "bg-green-100 text-green-700 border border-green-300"
                      : status === "checked-in"
                      ? "bg-blue-100 text-blue-700 border border-blue-300"
                      : status === "booked"
                      ? "bg-yellow-100 text-yellow-700 border border-yellow-300"
                      : "bg-red-100 text-red-700 border border-red-300"
                  }`}
                >
                  {status?.toUpperCase() || "N/A"}
                </span>
              </div>
            </div>
          </div>

          {/* Notes Section */}
          <div className="bg-orange-50 p-5 rounded-xl border border-orange-200">
            <h3 className="font-bold text-xl mb-4 text-orange-800 flex items-center gap-2">
              📝 Add Notes
            </h3>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Write your clinical notes, observations, or recommendations here..."
              className="w-full border border-gray-300 rounded-lg p-4 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent resize-none"
              rows="5"
            />
          </div>

          {/* Action Buttons */}
          <div className="bg-gray-50 p-5 rounded-xl border border-gray-200">
            <h3 className="font-bold text-xl mb-4 text-gray-800 flex items-center gap-2">
              ⚡ Quick Actions
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <button
                className="bg-blue-500 text-white px-4 py-3 rounded-lg hover:bg-blue-600 transition font-semibold shadow-md flex items-center justify-center gap-2"
                onClick={handleCheckedIn}
              >
                ✅ Checked-in
              </button>
              
              <button
                className="bg-green-500 text-white px-4 py-3 rounded-lg hover:bg-green-600 transition font-semibold shadow-md flex items-center justify-center gap-2"
                onClick={handleComplete}
              >
                ✅ Complete
              </button>
              
              <button
                className={`px-4 py-3 rounded-lg transition font-semibold shadow-md flex items-center justify-center gap-2 ${
                  notes.trim() 
                    ? "bg-purple-500 text-white hover:bg-purple-600" 
                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                }`}
                onClick={handleAddNotes}
                disabled={!notes.trim()}
              >
                📝 Add Notes
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Close Button */}
      <div className="text-center mt-8 pt-4 border-t">
        <button
          className="text-gray-600 hover:text-gray-800 font-semibold hover:bg-gray-100 px-6 py-2 rounded-lg transition border border-gray-300"
          onClick={() => dispatch(closeModal())}
        >
          ✕ Close Window
        </button>
      </div>
    </div>
  );
}