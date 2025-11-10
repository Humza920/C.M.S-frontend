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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
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
    if (!formData.email || !formData.salary || !formData.role || !formData.roomNumber) {
      toast.error("Please fill all required fields!");
      return;
    }

    dispatch(sendInvite(formData));
  };

  useEffect(() => {
    if (success) {
      toast.success("Invitation sent successfully!");
      dispatch(closeModal());
    }
    if (error) {
      toast.error(error);
    }
  }, [success, error, dispatch]);

  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  return (
    <div className="w-full">
      <h2 className="text-2xl font-semibold mb-4 text-center">Send Invitation</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Email */}
        <div>
          <label className="block text-sm font-medium mb-1">Email Address *</label>
          <input
            type="email"
            name="email"
            placeholder="example@gmail.com"
            value={formData.email}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-400 outline-none"
          />
        </div>

        {/* Salary */}
        <div>
          <label className="block text-sm font-medium mb-1">Salary *</label>
          <input
            type="number"
            name="salary"
            placeholder="Enter salary"
            value={formData.salary}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-400 outline-none"
          />
        </div>

        {/* Role */}
        <div>
          <label className="block text-sm font-medium mb-1">Role *</label>
          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-400 outline-none"
          >
            <option value="Doctor">Doctor</option>
            <option value="Staff">Staff</option>
            <option value="Receptionist">Receptionist</option>
          </select>
        </div>

        {/* Room Number */}
        <div>
          <label className="block text-sm font-medium mb-1">Room Number *</label>
          <input
            type="text"
            name="roomNumber"
            placeholder="Enter room number"
            value={formData.roomNumber}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-400 outline-none"
          />
        </div>

        {/* Invited Days */}
        <div>
          <label className="block text-sm font-medium mb-2">Invited Days</label>
          <div className="flex flex-wrap gap-2">
            {days.map((day) => (
              <button
                type="button"
                key={day}
                onClick={() => handleDaysChange(day)}
                className={`px-3 py-1 rounded-full border ${
                  formData.invitedDays.includes(day)
                    ? "bg-blue-500 text-white border-blue-500"
                    : "border-gray-300 text-gray-700"
                }`}
              >
                {day}
              </button>
            ))}
          </div>
        </div>

        {/* Time Range */}
        <div className="flex gap-3">
          <div className="flex-1">
            <label className="block text-sm font-medium mb-1">Start Time</label>
            <input
              type="time"
              name="start"
              value={formData.invitedTime.start}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  invitedTime: { ...prev.invitedTime, start: e.target.value },
                }))
              }
              className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-400 outline-none"
            />
          </div>
          <div className="flex-1">
            <label className="block text-sm font-medium mb-1">End Time</label>
            <input
              type="time"
              name="end"
              value={formData.invitedTime.end}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  invitedTime: { ...prev.invitedTime, end: e.target.value },
                }))
              }
              className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-400 outline-none"
            />
          </div>
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-3 mt-5">
          <button
            type="button"
            onClick={() => dispatch(closeModal())}
            className="px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-100 transition"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className={`px-4 py-2 rounded-lg text-white font-medium ${
              loading
                ? "bg-blue-300 cursor-not-allowed"
                : "bg-blue-500 hover:bg-blue-600"
            } transition`}
          >
            {loading ? "Sending..." : "Send Invite"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default InviteModal;
