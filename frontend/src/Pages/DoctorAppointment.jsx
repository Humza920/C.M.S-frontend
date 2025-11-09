import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchDoctorAppointments } from "../Features/appointmentslice";
import { openModal, addData } from "../Features/modalSlice";

const DoctorAppointments = () => {
  const dispatch = useDispatch();
  const { doctorAppointments, loading, error } = useSelector(
    (state) => state.dashboard
  );
  const { isOpen, modalType, modalData } = useSelector((state) => state.modal);

  useEffect(() => {
    dispatch(fetchDoctorAppointments());
  }, [dispatch]);

  const handleOpenModal = (appt) => {
    dispatch(addData(appt));       // modalData set
    dispatch(openModal("updateAppointment")); // modal type
  };

  if (loading) return <p className="text-center mt-10">Loading appointments...</p>;
  if (error) return <p className="text-center mt-10 text-red-500">{error}</p>;

  const appointments = Array.isArray(doctorAppointments)
    ? doctorAppointments
    : doctorAppointments?.data || [];

  if (!appointments.length)
    return <p className="text-center mt-10">No appointments found.</p>;

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h2 className="text-2xl font-semibold mb-6">My Appointments</h2>
      <div className="space-y-4">
        {appointments.map((appt) => (
          <div
            key={appt._id}
            className="bg-white shadow-md rounded-lg p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center cursor-pointer hover:bg-gray-50"
            onClick={() => handleOpenModal(appt)}
          >
            <div>
              <p>
                <span className="font-semibold">Patient:</span>{" "}
                {appt.patientId?.userName || "N/A"}
              </p>
              <p>
                <span className="font-semibold">Email:</span>{" "}
                {appt.patientId?.emailAddress || "N/A"}
              </p>
              <p>
                <span className="font-semibold">Date:</span>{" "}
                {new Date(appt.appointmentDate).toLocaleDateString()}
              </p>
              <p>
                <span className="font-semibold">Time:</span> {appt.startAt} - {appt.endAt}
              </p>
            </div>
            <div className="mt-2 sm:mt-0">
              <span
                className={`px-3 py-1 rounded-full font-medium ${
                  appt.status === "completed"
                    ? "bg-green-100 text-green-700"
                    : appt.status === "cancelled"
                    ? "bg-red-100 text-red-700"
                    : "bg-yellow-100 text-yellow-700"
                }`}
              >
                {appt.status || "Pending"}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DoctorAppointments;
