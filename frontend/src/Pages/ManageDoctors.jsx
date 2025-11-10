import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchDoctorsAll } from "../Features/dashboardslice";
import { toast } from "react-hot-toast";

const ManageDoctors = () => {
  const dispatch = useDispatch();
  const { doctors, loading, error } = useSelector((state) => state.dashboard);
console.log(doctors);

  // Fetch doctors on component mount
  useEffect(() => {
    dispatch(fetchDoctorsAll());
  }, [dispatch]);

  // Show errors if any
  useEffect(() => {
    if (error) toast.error(error);
  }, [error]);

  // Placeholder functions for edit/delete
  const handleEdit = (doctorId) => {
    toast("Edit functionality coming soon!");
    console.log("Edit doctor:", doctorId);
  };

  const handleDelete = (doctorId) => {
    toast("Delete functionality coming soon!");
    console.log("Delete doctor:", doctorId);
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-semibold mb-6">Manage Doctors</h1>

      {loading ? (
        <div className="text-center py-10">Loading doctors...</div>
      ) : doctors.length === 0 ? (
        <div className="text-center py-10 text-gray-500">
          No doctors found.
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-200 rounded-lg">
            <thead className="bg-gray-100">
              <tr>
                <th className="py-3 px-4 text-left font-medium">#</th>
                <th className="py-3 px-4 text-left font-medium">Name</th>
                <th className="py-3 px-4 text-left font-medium">Email</th>
                <th className="py-3 px-4 text-left font-medium">Role</th>
                <th className="py-3 px-4 text-left font-medium">Room</th>
                <th className="py-3 px-4 text-center font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {doctors.map((doctor, idx) => (
                <tr
                  key={doctor._id}
                  className={idx % 2 === 0 ? "bg-white" : "bg-gray-50"}
                >
                  <td className="py-3 px-4">{idx + 1}</td>
                  <td className="py-3 px-4">{doctor.userId?.userName || "-"}</td>
                  <td className="py-3 px-4">{doctor.userId?.emailAddress || "-"}</td>
                  <td className="py-3 px-4">{doctor.userId?.role || "-"}</td>
                  <td className="py-3 px-4">{doctor.roomId?.roomNumber || "-"}</td>
                  <td className="py-3 px-4 flex justify-center gap-3">
                    <button
                      onClick={() => handleEdit(doctor._id)}
                      className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600 transition"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(doctor._id)}
                      className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 transition"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ManageDoctors;
