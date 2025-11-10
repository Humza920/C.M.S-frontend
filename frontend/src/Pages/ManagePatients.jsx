import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchDashboardData } from "../Features/dashboardslice";
import { toast } from "react-hot-toast";

const ManagePatients = () => {
  const dispatch = useDispatch();
  const { patients, loading, error } = useSelector((state) => state.dashboard);

  // Fetch patients on mount
  useEffect(() => {
    dispatch(fetchDashboardData()); // dashboard data me patients bhi aa rahe hain
  }, [dispatch]);

  // Show errors
  useEffect(() => {
    if (error) toast.error(error);
  }, [error]);

  // Placeholder actions
  const handleEdit = (patientId) => {
    toast("Edit functionality coming soon!");
    console.log("Edit patient:", patientId);
  };

  const handleDelete = (patientId) => {
    toast("Delete functionality coming soon!");
    console.log("Delete patient:", patientId);
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-semibold mb-6">Manage Patients</h1>

      {loading ? (
        <div className="text-center py-10">Loading patients...</div>
      ) : patients.length === 0 ? (
        <div className="text-center py-10 text-gray-500">
          No patients found.
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
                <th className="py-3 px-4 text-center font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {patients.map((patient, idx) => (
                <tr
                  key={patient._id}
                  className={idx % 2 === 0 ? "bg-white" : "bg-gray-50"}
                >
                  <td className="py-3 px-4">{idx + 1}</td>
                  <td className="py-3 px-4">{patient.userId?.userName || "-"}</td>
                  <td className="py-3 px-4">{patient.userId?.emailAddress || "-"}</td>
                  <td className="py-3 px-4">{patient.userId?.role || "-"}</td>
                  <td className="py-3 px-4 flex justify-center gap-3">
                    <button
                      onClick={() => handleEdit(patient._id)}
                      className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600 transition"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(patient._id)}
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

export default ManagePatients;
