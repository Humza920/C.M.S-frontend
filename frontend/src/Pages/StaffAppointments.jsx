import React, { useState } from "react";
import { cancelAppointment } from "../Features/appointmentslice";
import { useDispatch, useSelector } from "react-redux";
import { addData, openModal } from "../Features/modalSlice";
import { Calendar, Clock, MapPin, Eye, Stethoscope } from "lucide-react";
import { fetchDashboardData } from "../Features/dashboardslice";

const StaffAppointments = () => {
  const dispatch = useDispatch();
  const { appointments, loading, error } = useSelector(
    (state) => state.dashboard
  );

  const [filter, setFilter] = useState("all");

  const handleViewDetails = (appointment) => {
    dispatch(addData(appointment));
    dispatch(openModal("appointmentDetails"));
  };

  const handleCancel = (appointmentId) => {
    const confirmCancel = window.confirm(
      "Are you sure you want to cancel this appointment?"
    );
    if (!confirmCancel) return;

    dispatch(cancelAppointment(appointmentId))
      .unwrap()
      .then(() => {
        // Optional: re-fetch appointments after cancel
        dispatch(fetchDashboardData());
      })
      .catch((err) => {
        console.error("Cancel failed:", err);
      });
  };

  const filteredAppointments = appointments?.filter((app) => {
    if (filter === "all") return true;
    return app.status === filter;
  });

  return (
    <div className="min-h-screen bg-gray-50 pt-20 pb-10">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-3">
            All Appointments
          </h1>
          <p className="text-gray-600">
            Manage and track all appointments as Staff
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap gap-2 justify-center mb-8">
          {["all", "booked", "completed"].map((status) => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`px-4 py-2 rounded-lg font-medium text-sm capitalize transition-colors ${
                filter === status
                  ? "bg-blue-600 text-white"
                  : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
              }`}
            >
              {status === "all" ? "All Appointments" : status}
            </button>
          ))}
        </div>

        {/* Loading */}
        {loading && (
          <div className="flex justify-center items-center py-12">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <p className="text-blue-600 font-medium">
                Loading appointments...
              </p>
            </div>
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center max-w-2xl mx-auto">
            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Calendar className="h-6 w-6 text-red-500" />
            </div>
            <h3 className="text-lg font-semibold text-red-800 mb-2">
              Unable to Load Appointments
            </h3>
            <p className="text-red-600 mb-4">{error}</p>
            <button
              onClick={() => dispatch(fetchMyAppointments())}
              className="bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-red-700 transition-colors"
            >
              Try Again
            </button>
          </div>
        )}

        {/* Empty */}
        {!loading && filteredAppointments?.length === 0 && (
          <div className="text-center py-12">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 max-w-md mx-auto">
              <Calendar className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                No Appointments Found
              </h3>
              <p className="text-gray-600 mb-6">
                {filter === "all"
                  ? "No appointments yet."
                  : `No ${filter} appointments.`}
              </p>
            </div>
          </div>
        )}

        {/* Appointments Grid */}
        {!loading && filteredAppointments?.length > 0 && (
          <div className="grid gap-6">
            {filteredAppointments.map((app) => (
              <div
                key={app._id}
                className="bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-all"
              >
                <div className="p-6">
                  {/* Header */}
                  <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4 mb-4">
                    <div className="flex items-start gap-4">
                      <img
                        src={
                          app.doctorId?.profileImg ||
                          "https://cdn-icons-png.flaticon.com/512/847/847969.png"
                        }
                        alt={app.doctorId?.userId?.userName}
                        className="w-16 h-16 rounded-lg object-cover border-2 border-blue-100"
                      />
                      <div>
                        <h2 className="text-xl font-semibold text-gray-900 mb-1">
                          Dr. {app.doctorId?.userId?.userName}
                        </h2>
                        <p className="text-blue-600 font-medium mb-1">
                          {app.doctorId?.specialization || "Specialist"}
                        </p>
                        <p className="text-gray-600 text-sm">
                          {app.doctorId?.qualification}
                        </p>

                        <p className="text-gray-700 text-sm mt-1">
                          Patient: {app.patientId?.userId?.userName || "-"} (
                          {app.patientId?.userId?.emailAddress || "-"})
                        </p>
                      </div>
                    </div>

                    {/* Status */}
                    <div
                      className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium ${
                        app.status === "booked"
                          ? "bg-green-100 text-green-800 border border-green-200"
                          : app.status === "completed"
                          ? "bg-blue-100 text-blue-800 border border-blue-200"
                          : "bg-red-100 text-red-800 border border-red-200"
                      }`}
                    >
                      <div
                        className={`w-2 h-2 rounded-full ${
                          app.status === "booked"
                            ? "bg-green-500"
                            : app.status === "completed"
                            ? "bg-blue-500"
                            : "bg-red-500"
                        }`}
                      ></div>
                      {app.status}
                    </div>
                  </div>

                  {/* Appointment Details */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                    <div className="flex items-center gap-3">
                      <Calendar className="h-5 w-5 text-blue-500" />
                      <div>
                        <p className="text-sm text-gray-600">Date</p>
                        <p className="font-medium text-gray-900">
                          {new Date(app.appointmentDate).toLocaleDateString(
                            "en-US",
                            {
                              weekday: "long",
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            }
                          )}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <Clock className="h-5 w-5 text-purple-500" />
                      <div>
                        <p className="text-sm text-gray-600">Time Slot</p>
                        <p className="font-medium text-gray-900">
                          {app.startAt} - {app.endAt}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <Stethoscope className="h-5 w-5 text-green-500" />
                      <div>
                        <p className="text-sm text-gray-600">Day</p>
                        <p className="font-medium text-gray-900 capitalize">
                          {app.day}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <MapPin className="h-5 w-5 text-red-500" />
                      <div>
                        <p className="text-sm text-gray-600">Location</p>
                        <p className="font-medium text-gray-900">
                          {app.doctorId?.location?.country ||
                            "Online Consultation"}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-3 pt-4 border-t border-gray-200">
                    <button
                      onClick={() => handleViewDetails(app)}
                      className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
                    >
                      <Eye className="h-4 w-4" />
                      View Details
                    </button>

                    {/* Cancel Appointment Button */}
                    {app.status === "booked" && (
                      <button
                        onClick={() => handleCancel(app._id)}
                        className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-red-700 transition-colors"
                      >
                        Cancel Appointment
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default StaffAppointments;
