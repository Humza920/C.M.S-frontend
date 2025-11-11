import { useDispatch, useSelector } from "react-redux";
import { closeModal } from "../Features/modalSlice";
import { useState, useEffect } from "react";
import { fetchDoctorAppointments, updateAppointmentStatus } from "../Features/appointmentslice";

export default function UpdateAppointmentModal() {
  const dispatch = useDispatch();
  const { modalData } = useSelector((state) => state.modal);
  const [activeTab, setActiveTab] = useState("details");
  const [currentStatus, setCurrentStatus] = useState("");
  
  // Form states for completion
  const [diagnosis, setDiagnosis] = useState("");
  const [prescription, setPrescription] = useState("");
  const [notes, setNotes] = useState("");
  const [followUpDate, setFollowUpDate] = useState("");

  useEffect(() => {
    if (modalData) {
      setCurrentStatus(modalData.status);
    }
  }, [modalData]);

  if (!modalData) return null;

  const { 
    _id, 
    patientId, 
    doctorId, 
    appointmentDate, 
    startAt, 
    endAt, 
    status, 
    day 
  } = modalData;

  const handleCheckedIn = () => {
    dispatch(updateAppointmentStatus({ 
      appointmentId: _id, 
      status: "checkin"  // Backend expects "checkin" not "checked-in"
    }));
    setCurrentStatus("checked in");
  };

  const handleComplete = () => {
    if (!diagnosis.trim()) {
      alert("Diagnosis is required to complete appointment");
      return;
    }

    const completionData = {
      appointmentId: _id,
      status: "completed",
      diagnosis: diagnosis.trim(),
      prescription: prescription.trim(),
      notes: notes.trim(),
      followUpDate: followUpDate || undefined
    };

    dispatch(updateAppointmentStatus(completionData));
    setCurrentStatus("completed");
    dispatch(fetchDoctorAppointments())
    dispatch(closeModal());

  };

  const patient = patientId?.userId || {};
  const doctor = doctorId?.userId || {};

  const getStatusColor = (status) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800 border-green-200";
      case "checked in":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "booked":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "cancelled":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  // Check if appointment can be marked as completed
  const canMarkCompleted = currentStatus === "checked in";
  // Check if appointment can be marked as checked-in
  const canMarkCheckedIn = currentStatus === "booked";

  return (
    <div className="fixed inset-0  bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-white">Appointment Management</h2>
              <p className="text-blue-100 text-sm mt-1">
                {new Date(appointmentDate).toLocaleDateString('en-US', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </p>
            </div>
            <button
              onClick={() => dispatch(closeModal())}
              className="text-white hover:bg-blue-500 p-2 rounded-lg transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Progress Steps */}
        <div className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between max-w-2xl mx-auto">
            <div className="flex flex-col items-center">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                currentStatus === "booked" || currentStatus === "checked in" || currentStatus === "completed" 
                  ? "bg-blue-600 text-white" 
                  : "bg-gray-200 text-gray-500"
              }`}>
                1
              </div>
              <span className="text-xs mt-1 text-gray-600">Booked</span>
            </div>
            
            <div className="flex-1 h-1 bg-gray-200 mx-2">
              <div className={`h-full transition-all duration-300 ${
                currentStatus === "checked in" || currentStatus === "completed" 
                  ? "bg-blue-600" 
                  : "bg-gray-200"
              }`}></div>
            </div>
            
            <div className="flex flex-col items-center">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                currentStatus === "checked in" || currentStatus === "completed" 
                  ? "bg-blue-600 text-white" 
                  : "bg-gray-200 text-gray-500"
              }`}>
                2
              </div>
              <span className="text-xs mt-1 text-gray-600">Checked-in</span>
            </div>
            
            <div className="flex-1 h-1 bg-gray-200 mx-2">
              <div className={`h-full transition-all duration-300 ${
                currentStatus === "completed" 
                  ? "bg-blue-600" 
                  : "bg-gray-200"
              }`}></div>
            </div>
            
            <div className="flex flex-col items-center">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                currentStatus === "completed" 
                  ? "bg-blue-600 text-white" 
                  : "bg-gray-200 text-gray-500"
              }`}>
                3
              </div>
              <span className="text-xs mt-1 text-gray-600">Completed</span>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200">
          <div className="flex px-6">
            <button
              onClick={() => setActiveTab("details")}
              className={`px-4 py-3 font-medium text-sm border-b-2 transition-colors ${
                activeTab === "details"
                  ? "border-blue-600 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
            >
              Appointment Details
            </button>
            <button
              onClick={() => setActiveTab("patient")}
              className={`px-4 py-3 font-medium text-sm border-b-2 transition-colors ${
                activeTab === "patient"
                  ? "border-blue-600 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
            >
              Patient Information
            </button>
            <button
              onClick={() => setActiveTab("completion")}
              className={`px-4 py-3 font-medium text-sm border-b-2 transition-colors ${
                activeTab === "completion"
                  ? "border-blue-600 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
            >
              Completion Details
            </button>
          </div>
        </div>

        <div className="overflow-y-auto max-h-[calc(90vh-200px)]">
          {/* Content */}
          <div className="p-6">
            {activeTab === "details" && (
              <div className="space-y-6">
                {/* Status Card */}
                <div className="bg-white border border-gray-200 rounded-lg p-5 shadow-sm">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">Appointment Status</h3>
                      <p className="text-gray-600 text-sm">Current appointment status</p>
                    </div>
                    <span className={`px-4 py-2 rounded-full text-sm font-medium border ${getStatusColor(currentStatus)}`}>
                      {currentStatus?.charAt(0).toUpperCase() + currentStatus?.slice(1) || "Pending"}
                    </span>
                  </div>
                </div>

                {/* Appointment Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-gray-50 rounded-lg p-5">
                    <h4 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                      <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      Schedule Details
                    </h4>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Date</span>
                        <span className="font-medium text-gray-900">
                          {new Date(appointmentDate).toLocaleDateString()}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Day</span>
                        <span className="font-medium text-gray-900">{day}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Time</span>
                        <span className="font-medium text-gray-900">{startAt} - {endAt}</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-5">
                    <h4 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                      <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                      Doctor Information
                    </h4>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Name</span>
                        <span className="font-medium text-gray-900">{doctor?.userName || "N/A"}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Specialization</span>
                        <span className="font-medium text-gray-900">{doctorId?.specialization || "N/A"}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Experience</span>
                        <span className="font-medium text-gray-900">{doctorId?.experience || "N/A"} years</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="bg-white border border-gray-200 rounded-lg p-5 shadow-sm">
                  <h4 className="font-semibold text-gray-900 mb-4">Appointment Workflow</h4>
                  <div className="flex flex-wrap gap-3">
                    <button
                      onClick={handleCheckedIn}
                      disabled={!canMarkCheckedIn}
                      className={`flex items-center gap-2 px-4 py-2.5 rounded-lg transition-colors font-medium text-sm ${
                        canMarkCheckedIn
                          ? "bg-blue-600 text-white hover:bg-blue-700"
                          : "bg-gray-300 text-gray-500 cursor-not-allowed"
                      }`}
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      {currentStatus === "checked in" ? "Already Checked-in" : "Mark as Checked-in"}
                    </button>
                    
                    <button
                      onClick={() => setActiveTab("completion")}
                      disabled={!canMarkCompleted}
                      className={`flex items-center gap-2 px-4 py-2.5 rounded-lg transition-colors font-medium text-sm ${
                        canMarkCompleted
                          ? "bg-green-600 text-white hover:bg-green-700"
                          : "bg-gray-300 text-gray-500 cursor-not-allowed"
                      }`}
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {currentStatus === "completed" ? "Appointment Completed" : "Complete Appointment"}
                    </button>
                  </div>
                  
                  {/* Status Instructions */}
                  <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
                    <p className="text-sm text-blue-700">
                      {currentStatus === "booked" && "Patient has arrived? Click 'Mark as Checked-in' to begin the appointment."}
                      {currentStatus === "checked in" && "Appointment in progress. Click 'Complete Appointment' to finish and add to case history."}
                      {currentStatus === "completed" && "Appointment successfully completed and added to patient history."}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "patient" && (
              <div className="space-y-6">
                {/* Patient Basic Info */}
                <div className="bg-white border border-gray-200 rounded-lg p-5 shadow-sm">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Patient Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div>
                        <label className="text-sm font-medium text-gray-600">Full Name</label>
                        <p className="text-gray-900 font-medium mt-1">{patient?.userName || "N/A"}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-600">Email Address</label>
                        <p className="text-gray-900 font-medium mt-1">{patient?.emailAddress || "N/A"}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-600">Phone Number</label>
                        <p className="text-gray-900 font-medium mt-1">{patientId?.phoneNumber || "N/A"}</p>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div>
                        <label className="text-sm font-medium text-gray-600">Age</label>
                        <p className="text-gray-900 font-medium mt-1">{patientId?.age || "N/A"} years</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-600">Gender</label>
                        <p className="text-gray-900 font-medium mt-1">{patientId?.gender || "N/A"}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-600">Blood Group</label>
                        <p className="text-gray-900 font-medium mt-1">{patientId?.bloodGroup || "N/A"}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Medical Information */}
                <div className="bg-white border border-gray-200 rounded-lg p-5 shadow-sm">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Medical Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="text-sm font-medium text-gray-600">Allergies</label>
                      <div className="mt-2">
                        {patientId?.allergies?.length > 0 ? (
                          <div className="flex flex-wrap gap-2">
                            {patientId.allergies.map((allergy, index) => (
                              <span key={index} className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm">
                                {allergy}
                              </span>
                            ))}
                          </div>
                        ) : (
                          <p className="text-gray-500 text-sm">No allergies reported</p>
                        )}
                      </div>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600">Emergency Contact</label>
                      <p className="text-gray-900 font-medium mt-2">
                        {patientId?.emergencyContact?.phone || "N/A"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "completion" && (
              <div className="space-y-6">
                <div className="bg-white border border-gray-200 rounded-lg p-5 shadow-sm">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Complete Appointment</h3>
                  <p className="text-gray-600 mb-6">Fill in the medical details to complete this appointment and add to case history.</p>
                  
                  <div className="space-y-6">
                    {/* Diagnosis - Required */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Diagnosis *
                      </label>
                      <textarea
                        value={diagnosis}
                        onChange={(e) => setDiagnosis(e.target.value)}
                        placeholder="Enter primary diagnosis and medical findings..."
                        className="w-full border border-gray-300 rounded-lg p-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                        rows="4"
                        required
                      />
                      <p className="text-sm text-gray-500 mt-1">Diagnosis is required to complete appointment</p>
                    </div>

                    {/* Prescription */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Prescription
                      </label>
                      <textarea
                        value={prescription}
                        onChange={(e) => setPrescription(e.target.value)}
                        placeholder="Enter prescribed medications, dosage, and instructions..."
                        className="w-full border border-gray-300 rounded-lg p-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                        rows="3"
                      />
                    </div>

                    {/* Clinical Notes */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Clinical Notes
                      </label>
                      <textarea
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        placeholder="Additional clinical observations, treatment notes, or recommendations..."
                        className="w-full border border-gray-300 rounded-lg p-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                        rows="3"
                      />
                    </div>

                    {/* Follow-up Date */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Follow-up Date
                      </label>
                      <input
                        type="date"
                        value={followUpDate}
                        onChange={(e) => setFollowUpDate(e.target.value)}
                        className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        min={new Date().toISOString().split('T')[0]}
                      />
                    </div>

                    {/* Complete Button */}
                    <div className="flex justify-end space-x-3 pt-4">
                      <button
                        onClick={() => setActiveTab("details")}
                        className="px-6 py-2.5 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors"
                      >
                        Back
                      </button>
                      <button
                        onClick={handleComplete}
                        disabled={!diagnosis.trim()}
                        className={`px-6 py-2.5 rounded-lg font-medium transition-colors ${
                          diagnosis.trim()
                            ? "bg-green-600 text-white hover:bg-green-700"
                            : "bg-gray-300 text-gray-500 cursor-not-allowed"
                        }`}
                      >
                        Complete Appointment & Save to History
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}