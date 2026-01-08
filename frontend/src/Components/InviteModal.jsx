import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { sendInvite } from "../Features/authslice";
import { closeModal } from "../Features/modalSlice";

const InviteModal = () => {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.auth);

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
  const [tabsCompleted, setTabsCompleted] = useState({
    basic: false,
    schedule: false,
  });

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

  const validateBasicTab = () => {
    const errors = {};

    if (!formData.email.trim()) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Please enter a valid email address";
    }

    if (!formData.salary) {
      errors.salary = "Salary is required";
    } else if (formData.salary < 0) {
      errors.salary = "Salary cannot be negative";
    } else if (formData.salary > 1000000) {
      errors.salary = "Salary cannot exceed 1,000,000";
    }

    if (!formData.roomNumber.trim()) {
      errors.roomNumber = "Room number is required";
    } else if (formData.roomNumber.length > 20) {
      errors.roomNumber = "Room number is too long";
    }

    setFormErrors(errors);

    const basicTabValid = Object.keys(errors).length === 0;
    setTabsCompleted((prev) => ({ ...prev, basic: basicTabValid }));

    return basicTabValid;
  };

  const validateScheduleTab = () => {
    const errors = {};
    
    if (formData.invitedDays.length === 0) {
      errors.invitedDays = "Please select at least one working day";
    }

    // Validate time format and logic
    const timeRegex = /^([0-1]?[0-9]|2[0-3]):([0-5][0-9])$/;
    
    if (!timeRegex.test(formData.invitedTime.start)) {
      errors.startTime = "Invalid start time format";
    }
    
    if (!timeRegex.test(formData.invitedTime.end)) {
      errors.endTime = "Invalid end time format";
    }

    if (!errors.startTime && !errors.endTime) {
      const start = formData.invitedTime.start.replace(':', '');
      const end = formData.invitedTime.end.replace(':', '');
      
      if (parseInt(start) >= parseInt(end)) {
        errors.timeLogic = "End time must be after start time";
      }
    }

    // Only show schedule error for days selection
    if (errors.invitedDays) {
      setFormErrors(prev => ({ ...prev, invitedDays: errors.invitedDays }));
    }

    const scheduleTabValid = formData.invitedDays.length > 0;
    setTabsCompleted((prev) => ({ ...prev, schedule: scheduleTabValid }));

    return scheduleTabValid;
  };

  const validateForm = () => {
    const basicValid = validateBasicTab();
    const scheduleValid = validateScheduleTab();

    return basicValid && scheduleValid;
  };

  const handleDaysChange = (day) => {
    setFormData((prev) => {
      const exists = prev.invitedDays.includes(day);
      const newDays = exists
        ? prev.invitedDays.filter((d) => d !== day)
        : [...prev.invitedDays, day];

      if (newDays.length > 0) {
        setTabsCompleted((prev) => ({ ...prev, schedule: true }));
        setFormErrors(prev => ({ ...prev, invitedDays: "" }));
      } else {
        setTabsCompleted((prev) => ({ ...prev, schedule: false }));
      }

      return {
        ...prev,
        invitedDays: newDays,
      };
    });
  };

  const handleTabChange = (tab) => {
    if (tab === "schedule") {
      if (!validateBasicTab()) {
        setFormErrors(prev => ({
          ...prev, 
          formError: "Please complete basic information first!"
        }));
        return;
      }
    }
    setActiveTab(tab);
    setFormErrors(prev => ({ ...prev, formError: "" }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Clear previous errors
    setFormErrors({});

    if (!validateForm()) {
      if (!tabsCompleted.basic) {
        setFormErrors({ formError: "Please complete basic information!" });
        setActiveTab("basic");
      } else if (!tabsCompleted.schedule) {
        setFormErrors({ invitedDays: "Please select at least one working day!" });
        setActiveTab("schedule");
      }
      return;
    }

    try {
      const result = await dispatch(sendInvite(formData)).unwrap();
      
      if (result.success) {
        dispatch(closeModal());
      } else {
        // Handle backend validation errors
        if (result.errors) {
          setFormErrors(result.errors);
        } else {
          setFormErrors({ formError: result.message || "Failed to send invitation" });
        }
      }
    } catch (err) {
      console.log("Failed to send invite:", err);
      
      // Handle specific error cases
      if (err.response?.data) {
        const backendErrors = err.response.data;
        
        // Map backend errors to form errors
        const mappedErrors = {};
        if (backendErrors.email) {
          mappedErrors.email = backendErrors.email;
        }
        if (backendErrors.salary) {
          mappedErrors.salary = backendErrors.salary;
        }
        if (backendErrors.roomNumber) {
          mappedErrors.roomNumber = backendErrors.roomNumber;
        }
        if (backendErrors.invitedDays) {
          mappedErrors.invitedDays = backendErrors.invitedDays;
        }
        
        if (Object.keys(mappedErrors).length > 0) {
          setFormErrors(mappedErrors);
          
          // Switch to appropriate tab if error exists there
          if (mappedErrors.email || mappedErrors.salary || mappedErrors.roomNumber) {
            setActiveTab("basic");
          } else if (mappedErrors.invitedDays) {
            setActiveTab("schedule");
          }
        } else {
          setFormErrors({ 
            formError: err.response.data.message || "Failed to send invitation" 
          });
        }
      } else if (err.message) {
        setFormErrors({ formError: err.message });
      } else {
        setFormErrors({ formError: "Failed to send invitation. Please try again." });
      }
    }
  };

  const days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  const getInputClass = (fieldName) => {
    const baseClass =
      "w-full border rounded-xl px-4 py-3 focus:ring-2 outline-none transition-all duration-200 text-sm";
    const errorClass = "border-red-500 focus:ring-red-400 bg-red-50";
    const normalClass =
      "border-gray-200 focus:ring-blue-400 focus:border-blue-400 bg-gray-50";

    return `${baseClass} ${formErrors[fieldName] ? errorClass : normalClass}`;
  };

  return (
    <div className="w-full max-w-md mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-white">Send Invitation</h2>
            <p className="text-blue-100 text-sm mt-1">
              Invite team members to join your organization
            </p>
          </div>
          <button
            onClick={() => dispatch(closeModal())}
            className="text-white hover:bg-white/20 p-2 rounded-lg transition-all duration-200"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <div className="flex gap-4 mt-6">
          <button
            onClick={() => handleTabChange("basic")}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 relative ${
              activeTab === "basic"
                ? "bg-white text-blue-600 shadow-md"
                : "text-blue-100 hover:bg-white/20"
            }`}
          >
            Basic Info
            {tabsCompleted.basic && (
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-white"></span>
            )}
          </button>
          <button
            onClick={() => handleTabChange("schedule")}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 relative ${
              activeTab === "schedule"
                ? "bg-white text-blue-600 shadow-md"
                : "text-blue-100 hover:bg-white/20"
            }`}
          >
            Schedule
            {tabsCompleted.schedule && (
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-white"></span>
            )}
          </button>
        </div>
      </div>

      <div className="max-h-[400px] overflow-y-auto p-6">
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* General Form Error Display */}
          {formErrors.formError && (
            <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-4">
              <div className="flex items-start gap-3">
                <div className="w-5 h-5 bg-red-500 rounded-full flex items-center justify-center text-white text-xs mt-0.5">
                  !
                </div>
                <div>
                  <p className="text-red-600 text-sm font-medium">
                    {formErrors.formError}
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeTab === "basic" && (
            <>
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
                    <span className="w-4 h-4 bg-red-500 rounded-full flex items-center justify-center text-white text-xs">
                      !
                    </span>
                    {formErrors.email}
                  </p>
                )}
              </div>

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
                      max="1000000"
                    />
                  </div>
                  {formErrors.salary && (
                    <p className="mt-2 text-sm text-red-600 flex items-center gap-2">
                      <span className="w-4 h-4 bg-red-500 rounded-full flex items-center justify-center text-white text-xs">
                        !
                      </span>
                      {formErrors.salary}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2 text-gray-700">
                    Role *
                  </label>
                  <input
                    type="text"
                    name="role"
                    value="Doctor"
                    disabled
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm bg-gray-100 text-gray-600 cursor-not-allowed"
                  />
                </div>
              </div>

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
                  maxLength="20"
                />
                {formErrors.roomNumber && (
                  <p className="mt-2 text-sm text-red-600 flex items-center gap-2">
                    <span className="w-4 h-4 bg-red-500 rounded-full flex items-center justify-center text-white text-xs">
                      !
                    </span>
                    {formErrors.roomNumber}
                  </p>
                )}
              </div>
            </>
          )}

          {activeTab === "schedule" && (
            <>
              <div>
                <label className="block text-sm font-semibold mb-3 text-gray-700">
                  Working Days *
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
                {formErrors.invitedDays && (
                  <p className="mt-3 text-sm text-red-500 text-center bg-red-50 py-2 rounded-xl">
                    {formErrors.invitedDays}
                  </p>
                )}
              </div>

              <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-4 rounded-xl border border-blue-100">
                <label className="block text-sm font-semibold mb-3 text-gray-700">
                  Working Hours
                </label>
                <div className="flex gap-3 items-center">
                  <div className="flex-1">
                    <label className="block text-xs text-gray-500 mb-2">
                      Start Time
                    </label>
                    <input
                      type="time"
                      value={formData.invitedTime.start}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          invitedTime: {
                            ...prev.invitedTime,
                            start: e.target.value,
                          },
                        }))
                      }
                      className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-400 focus:border-blue-400 outline-none transition-all duration-200 text-sm bg-white"
                    />
                  </div>
                  <div className="pt-4">
                    <span className="text-gray-400">→</span>
                  </div>
                  <div className="flex-1">
                    <label className="block text-xs text-gray-500 mb-2">
                      End Time
                    </label>
                    <input
                      type="time"
                      value={formData.invitedTime.end}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          invitedTime: {
                            ...prev.invitedTime,
                            end: e.target.value,
                          },
                        }))
                      }
                      className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-400 focus:border-blue-400 outline-none transition-all duration-200 text-sm bg-white"
                    />
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                <h4 className="text-sm font-semibold text-gray-700 mb-2">
                  Schedule Summary
                </h4>
                <div className="text-xs text-gray-600 space-y-1">
                  <p>
                    Days:{" "}
                    {formData.invitedDays.length > 0
                      ? formData.invitedDays.join(", ")
                      : "Not set"}
                  </p>
                  <p>
                    Time: {formData.invitedTime.start} -{" "}
                    {formData.invitedTime.end}
                  </p>
                </div>
              </div>
            </>
          )}
        </form>
      </div>

      <div className="border-t border-gray-200 bg-gray-50 p-6">
        <div className="flex justify-between items-center">
          <div className="flex gap-2">
            <div
              className={`w-2 h-2 rounded-full ${
                tabsCompleted.basic ? "bg-green-500" : "bg-gray-300"
              }`}
            ></div>
            <div
              className={`w-2 h-2 rounded-full ${
                tabsCompleted.schedule ? "bg-green-500" : "bg-gray-300"
              }`}
            ></div>
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
                  ? "bg-gray-400 cursor-not-allowed"
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
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                    />
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