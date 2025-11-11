import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { sendInvite } from "../Features/authslice";
import { closeModal } from "../Features/modalSlice";
import { toast } from "react-hot-toast";

const InviteModal = () => {
  const dispatch = useDispatch();
  const { loading, error, success } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    email: "",
    salary: "",
    role: "Doctor",
    roomNumber: "",
    invitedDays: [],
    invitedTime: { start: "09:00", end: "17:00" },
  });

  const [formErrors, setFormErrors] = useState({});
  const [activeTab, setActiveTab] = useState("basic");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (formErrors[name]) {
      setFormErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validateForm = () => {
    const errors = {};

    if (!formData.email) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Email is invalid";
    }

    if (!formData.salary) {
      errors.salary = "Salary is required";
    } else if (formData.salary < 0) {
      errors.salary = "Salary cannot be negative";
    }

    if (!formData.roomNumber.trim()) {
      errors.roomNumber = "Room number is required";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleDaysChange = (day) => {
    setFormData((prev) => {
      const exists = prev.invitedDays.includes(day);
      return {
        ...prev,
        invitedDays: exists
          ? prev.invitedDays.filter((d) => d !== day)
          : [...prev.invitedDays, day],
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      toast.error("Please fix the errors before submitting!");
      return;
    }

    try {
      await dispatch(sendInvite(formData)).unwrap();
    } catch (err) {
      console("Failed to send invite:", err);
    }
  };

  useEffect(() => {
    if (success) {
      toast.success("Invitation sent successfully!");
      dispatch(closeModal());
    }
  }, [success]);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

  const getInputClass = (fieldName) => {
    const baseClass = "w-full border rounded-xl px-4 py-3 focus:ring-2 outline-none transition-all duration-200 text-sm";
    const errorClass = "border-red-500 focus:ring-red-400 bg-red-50";
    const normalClass = "border-gray-200 focus:ring-blue-400 focus:border-blue-400 bg-gray-50";
    
    return `${baseClass} ${formErrors[fieldName] ? errorClass : normalClass}`;
  };

  return (
    <div className="w-full max-w-md mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-white">Send Invitation</h2>
            <p className="text-blue-100 text-sm mt-1">Invite team members to join your organization</p>
          </div>
          <button
            onClick={() => dispatch(closeModal())}
            className="text-white hover:bg-white/20 p-2 rounded-lg transition-all duration-200"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        {/* Tabs */}
        <div className="flex gap-4 mt-6">
          <button
            onClick={() => setActiveTab("basic")}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
              activeTab === "basic" 
                ? "bg-white text-blue-600 shadow-md" 
                : "text-blue-100 hover:bg-white/20"
            }`}
          >
            Basic Info
          </button>
          <button
            onClick={() => setActiveTab("schedule")}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
              activeTab === "schedule" 
                ? "bg-white text-blue-600 shadow-md" 
                : "text-blue-100 hover:bg-white/20"
            }`}
          >
            Schedule
          </button>
        </div>
      </div>

      {/* Form Content */}
      <div className="max-h-[400px] overflow-y-auto p-6">
        <form onSubmit={handleSubmit} className="space-y-5">
          
          {/* Basic Info Tab */}
          {activeTab === "basic" && (
            <>
              {/* Email */}
              <div>
                <label className="block text-sm font-semibold mb-2 text-gray-700">
                  Email Address *
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="example@gmail.com"
                  value={formData.email}
                  onChange={handleChange}
                  className={getInputClass("email")}
                />
                {formErrors.email && (
                  <p className="mt-2 text-sm text-red-600 flex items-center gap-2">
                    <span className="w-4 h-4 bg-red-500 rounded-full flex items-center justify-center text-white text-xs">!</span>
                    {formErrors.email}
                  </p>
                )}
              </div>

              {/* Salary and Role Row */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold mb-2 text-gray-700">
                    Salary *
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-sm">
                      ₹
                    </span>
                    <input
                      type="number"
                      name="salary"
                      placeholder="0.00"
                      value={formData.salary}
                      onChange={handleChange}
                      className={`${getInputClass("salary")} pl-10`}
                      min="0"
                    />
                  </div>
                  {formErrors.salary && (
                    <p className="mt-2 text-sm text-red-600 flex items-center gap-2">
                      <span className="w-4 h-4 bg-red-500 rounded-full flex items-center justify-center text-white text-xs">!</span>
                      {formErrors.salary}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2 text-gray-700">
                    Role *
                  </label>
                  <select
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-400 focus:border-blue-400 outline-none transition-all duration-200 text-sm bg-gray-50"
                  >
                    <option value="Doctor">Doctor</option>
                    <option value="Staff">Staff</option>
                    <option value="Receptionist">Receptionist</option>
                  </select>
                </div>
              </div>

              {/* Room Number */}
              <div>
                <label className="block text-sm font-semibold mb-2 text-gray-700">
                  Room Number *
                </label>
                <input
                  type="text"
                  name="roomNumber"
                  placeholder="Enter room number"
                  value={formData.roomNumber}
                  onChange={handleChange}
                  className={getInputClass("roomNumber")}
                />
                {formErrors.roomNumber && (
                  <p className="mt-2 text-sm text-red-600 flex items-center gap-2">
                    <span className="w-4 h-4 bg-red-500 rounded-full flex items-center justify-center text-white text-xs">!</span>
                    {formErrors.roomNumber}
                  </p>
                )}
              </div>
            </>
          )}

          {/* Schedule Tab */}
          {activeTab === "schedule" && (
            <>
              {/* Invited Days */}
              <div>
                <label className="block text-sm font-semibold mb-3 text-gray-700">
                  Working Days
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {days.map((day) => (
                    <button
                      type="button"
                      key={day}
                      onClick={() => handleDaysChange(day)}
                      className={`py-2 rounded-xl border transition-all duration-200 font-medium text-xs ${
                        formData.invitedDays.includes(day)
                          ? "bg-blue-500 text-white border-blue-500 shadow-md transform scale-105"
                          : "border-gray-200 text-gray-600 hover:border-blue-400 hover:text-blue-600 bg-gray-50"
                      }`}
                    >
                      {day}
                    </button>
                  ))}
                </div>
                {formData.invitedDays.length === 0 && (
                  <p className="mt-3 text-sm text-gray-500 text-center bg-gray-50 py-2 rounded-xl">
                    Select working days for the schedule
                  </p>
                )}
              </div>

              {/* Time Range */}
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-4 rounded-xl border border-blue-100">
                <label className="block text-sm font-semibold mb-3 text-gray-700">
                  Working Hours
                </label>
                <div className="flex gap-3 items-center">
                  <div className="flex-1">
                    <label className="block text-xs text-gray-500 mb-2">Start Time</label>
                    <input
                      type="time"
                      value={formData.invitedTime.start}
                      onChange={(e) => 
                        setFormData(prev => ({
                          ...prev,
                          invitedTime: { ...prev.invitedTime, start: e.target.value }
                        }))
                      }
                      className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-400 focus:border-blue-400 outline-none transition-all duration-200 text-sm bg-white"
                    />
                  </div>
                  <div className="pt-4">
                    <span className="text-gray-400">→</span>
                  </div>
                  <div className="flex-1">
                    <label className="block text-xs text-gray-500 mb-2">End Time</label>
                    <input
                      type="time"
                      value={formData.invitedTime.end}
                      onChange={(e) => 
                        setFormData(prev => ({
                          ...prev,
                          invitedTime: { ...prev.invitedTime, end: e.target.value }
                        }))
                      }
                      className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-400 focus:border-blue-400 outline-none transition-all duration-200 text-sm bg-white"
                    />
                  </div>
                </div>
              </div>

              {/* Summary */}
              <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                <h4 className="text-sm font-semibold text-gray-700 mb-2">Schedule Summary</h4>
                <div className="text-xs text-gray-600 space-y-1">
                  <p>Days: {formData.invitedDays.length > 0 ? formData.invitedDays.join(", ") : "Not set"}</p>
                  <p>Time: {formData.invitedTime.start} - {formData.invitedTime.end}</p>
                </div>
              </div>
            </>
          )}
        </form>
      </div>

      {/* Footer */}
      <div className="border-t border-gray-200 bg-gray-50 p-6">
        <div className="flex justify-between items-center">
          <div className="flex gap-2">
            <div className={`w-2 h-2 rounded-full ${activeTab === "basic" ? "bg-blue-500" : "bg-gray-300"}`}></div>
            <div className={`w-2 h-2 rounded-full ${activeTab === "schedule" ? "bg-blue-500" : "bg-gray-300"}`}></div>
          </div>
          
          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => dispatch(closeModal())}
              disabled={loading}
              className="px-6 py-2.5 rounded-xl border border-gray-300 text-gray-700 font-medium hover:bg-white transition-all duration-200 disabled:opacity-50 text-sm"
            >
              Cancel
            </button>
            <button
              type="submit"
              onClick={handleSubmit}
              disabled={loading}
              className={`px-8 py-2.5 rounded-xl text-white font-medium transition-all duration-200 flex items-center gap-2 text-sm ${
                loading
                  ? "bg-blue-400 cursor-not-allowed"
                  : "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-md hover:shadow-lg"
              }`}
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Sending...
                </>
              ) : (
                <>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                  Send Invite
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InviteModal;