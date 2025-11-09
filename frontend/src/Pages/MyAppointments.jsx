import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMyAppointments } from "../Features/dashboardslice";

const MyAppointments = () => {
  const dispatch = useDispatch();
  const { appointments, loading, error } = useSelector((state) => state.dashboard);

  useEffect(() => {
    dispatch(fetchMyAppointments());
  }, [dispatch]);

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-semibold text-gray-800 mb-6 text-center">
          My Appointments
        </h1>

        {/* Loading State */}
        {loading && (
          <div className="text-center text-blue-600 font-medium">Loading...</div>
        )}

        {/* Error State */}
        {error && (
          <div className="text-center text-red-600 font-medium">{error}</div>
        )}

        {/* Empty State */}
        {!loading && appointments?.length === 0 && (
          <div className="text-center text-gray-500 mt-10">
            You have no appointments yet.
          </div>
        )}

        {/* Appointments List */}
        <div className="grid gap-4">
          {appointments?.map((app) => (
            <div
              key={app._id}
              className="bg-white p-5 rounded-2xl shadow-md border border-gray-100 hover:shadow-lg transition"
            >
              <div className="flex items-center gap-4">
                {/* Doctor Image */}
                <img
                  src={
                    app.doctorId?.profileImg ||
                    "https://cdn-icons-png.flaticon.com/512/847/847969.png"
                  }
                  alt={app.doctorId?.userId?.userName || "Doctor"}
                  className="w-16 h-16 rounded-full border-2 border-blue-600"
                />

                {/* Doctor Info */}
                <div>
                  <h2 className="text-lg font-semibold text-gray-800">
                    Dr. {app.doctorId?.userId?.userName || "Unknown"}
                  </h2>
                  <p className="text-blue-600 text-sm font-medium">
                    {app.doctorId?.specialization || "Specialist"}
                  </p>
                  <p className="text-gray-500 text-sm">
                    {app.doctorId?.qualification || "No Qualification Info"}
                  </p>
                  <p className="text-gray-500 text-sm">
                    {app.doctorId?.location?.country || "Unknown"}
                  </p>
                </div>
              </div>

              <hr className="my-4 border-gray-200" />

              {/* Appointment Info */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-sm text-gray-700">
                <p>
                  <span className="font-semibold">Date:</span>{" "}
                  {new Date(app.appointmentDate).toLocaleDateString()}
                </p>
                <p>
                  <span className="font-semibold">Day:</span> {app.day}
                </p>
                <p>
                  <span className="font-semibold">Time:</span>{" "}
                  {app.startAt} - {app.endAt}
                </p>
                <p>
                  <span className="font-semibold">Status:</span>{" "}
                  <span
                    className={`font-semibold ${
                      app.status === "booked"
                        ? "text-green-600"
                        : app.status === "cancelled"
                        ? "text-red-600"
                        : "text-gray-600"
                    }`}
                  >
                    {app.status}
                  </span>
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MyAppointments;
