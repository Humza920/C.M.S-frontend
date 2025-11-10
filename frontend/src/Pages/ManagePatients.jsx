import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchDashboardData } from "../Features/dashboardslice";
import { toast } from "react-hot-toast";
import { openModal, addData } from "../Features/modalSlice";
import { User, Mail, Phone, MapPin, Calendar, Heart, Stethoscope, Clock, Shield } from 'lucide-react';

const ManagePatients = () => {
  const dispatch = useDispatch();
  const { patients, loading, error } = useSelector((state) => state.dashboard);

  // Fetch patients on mount
  useEffect(() => {
    dispatch(fetchDashboardData());
  }, [dispatch]);

  // Show errors
  useEffect(() => {
    if (error) toast.error(error);
  }, [error]);

  const handleViewDetails = (patient) => {
    // Modal open karo aur patient data bhejo
    dispatch(addData(patient));
    dispatch(openModal("viewDetails"));
    console.log("Patient details:", patient);
  };

  const handleMedicalHistory = (patient) => {
    toast.success(`Opening medical history for ${patient.userId?.userName}`);
    console.log("Medical history:", patient);
  };

  // Helper function to safely display location
  const getLocationDisplay = (location) => {
    if (!location) return "Not specified";
    if (typeof location === 'string') return location;
    if (typeof location === 'object') {
      return location.country || location.city || "Location specified";
    }
    return "Not specified";
  };

  // Format date
  const formatDate = (dateString) => {
    if (!dateString) return "Not specified";
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  // Get age from date of birth
  const getAge = (dob) => {
    if (!dob) return "N/A";
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header Section */}
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between mb-8">
        <div className="mb-4 lg:mb-0">
          <h1 className="text-3xl font-bold text-gray-800">Manage Patients</h1>
          <p className="text-gray-600 mt-2">Manage and view all registered patients</p>
        </div>
        {/* Add Patient button remove kar diya */}
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Total Patients</p>
              <p className="text-3xl font-bold text-gray-800 mt-2">{patients.length}</p>
            </div>
            <div className="p-3 bg-blue-100 rounded-xl">
              <User className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Active Today</p>
              <p className="text-3xl font-bold text-gray-800 mt-2">
                {patients.filter(p => p.lastVisit).length}
              </p>
            </div>
            <div className="p-3 bg-green-100 rounded-xl">
              <Calendar className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">New This Month</p>
              <p className="text-3xl font-bold text-gray-800 mt-2">
                {patients.filter(p => {
                  const created = new Date(p.createdAt);
                  const now = new Date();
                  return created.getMonth() === now.getMonth() && created.getFullYear() === now.getFullYear();
                }).length}
              </p>
            </div>
            <div className="p-3 bg-amber-100 rounded-xl">
              <Heart className="w-6 h-6 text-amber-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Avg. Age</p>
              <p className="text-3xl font-bold text-gray-800 mt-2">
                {patients.length > 0 
                  ? Math.round(patients.reduce((acc, patient) => {
                      const age = getAge(patient.dateOfBirth);
                      return acc + (typeof age === 'number' ? age : 0);
                    }, 0) / patients.length)
                  : "0"
                } yrs
              </p>
            </div>
            <div className="p-3 bg-purple-100 rounded-xl">
              <Stethoscope className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Patients Table */}
      {loading ? (
        <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-600 border-t-transparent mx-auto mb-4"></div>
          <p className="text-blue-600 font-medium text-lg">Loading patients...</p>
        </div>
      ) : patients.length === 0 ? (
        <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
          <User className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-gray-800 mb-2">No Patients Found</h3>
          <p className="text-gray-600 mb-6">No patients are currently registered in the system.</p>
        </div>
      ) : (
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead className="bg-gradient-to-r from-gray-50 to-green-50 border-b border-gray-200">
                <tr>
                  <th className="py-4 px-6 text-left font-semibold text-gray-700">Patient</th>
                  <th className="py-4 px-6 text-left font-semibold text-gray-700">Contact & Location</th>
                  <th className="py-4 px-6 text-left font-semibold text-gray-700">Medical Info</th>
                  <th className="py-4 px-6 text-left font-semibold text-gray-700">Status</th>
                  <th className="py-4 px-6 text-center font-semibold text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {patients.map((patient, idx) => (
                  <tr 
                    key={patient._id}
                    className="hover:bg-gray-50 transition-colors duration-150"
                  >
                    {/* Patient Info */}
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-4">
                        <img
                          src={patient.profileImg || "https://cdn-icons-png.flaticon.com/512/847/847969.png"}
                          alt={patient.userId?.userName}
                          className="w-12 h-12 rounded-xl object-cover border-2 border-gray-200"
                        />
                        <div>
                          <p className="font-semibold text-gray-800">
                            {patient.userId?.userName || "Unnamed"}
                          </p>
                          <p className="text-sm text-gray-600 flex items-center gap-1 mt-1">
                            <User className="w-4 h-4 text-green-500" />
                            Patient
                          </p>
                          <div className="flex items-center gap-2 mt-2">
                            <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs font-medium">
                              {patient.gender || "Not specified"}
                            </span>
                            <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-xs font-medium">
                              {getAge(patient.dateOfBirth)} yrs
                            </span>
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* Contact & Location */}
                    <td className="py-4 px-6">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <Mail className="w-4 h-4 text-gray-400" />
                          <span className="text-sm text-gray-700">{patient.userId?.emailAddress || "-"}</span>
                        </div>
                        {patient.phoneNumber && (
                          <div className="flex items-center gap-2">
                            <Phone className="w-4 h-4 text-gray-400" />
                            <span className="text-sm text-gray-700">{patient.phoneNumber}</span>
                          </div>
                        )}
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4 text-gray-400" />
                          <span className="text-sm text-gray-700">{getLocationDisplay(patient.location)}</span>
                        </div>
                        {patient.address && (
                          <div className="text-xs text-gray-500 bg-gray-50 px-2 py-1 rounded">
                            {patient.address}
                          </div>
                        )}
                      </div>
                    </td>

                    {/* Medical Information */}
                    <td className="py-4 px-6">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <Heart className="w-4 h-4 text-red-500" />
                          <span className="text-sm text-gray-700">
                            Blood Group: {patient.bloodGroup || "Not specified"}
                          </span>
                        </div>
                        {patient.medicalHistory && (
                          <div className="text-sm text-gray-600 bg-red-50 px-2 py-1 rounded">
                            Has medical history
                          </div>
                        )}
                        {patient.allergies && patient.allergies.length > 0 && (
                          <div className="text-sm text-gray-600 bg-amber-50 px-2 py-1 rounded">
                            {patient.allergies.length} allergy(s)
                          </div>
                        )}
                        {patient.emergencyContact && (
                          <div className="text-xs text-gray-500">
                            Emergency: {patient.emergencyContact.phone || "Not set"}
                          </div>
                        )}
                      </div>
                    </td>

                    {/* Status */}
                    <td className="py-4 px-6">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-purple-500" />
                          <span className="text-sm text-gray-700">
                            Joined: {formatDate(patient.createdAt)}
                          </span>
                        </div>
                        {patient.lastVisit && (
                          <div className="text-sm text-gray-600 bg-green-50 px-2 py-1 rounded">
                            Last visit: {formatDate(patient.lastVisit)}
                          </div>
                        )}
                        <div className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
                          patient.status === 'active' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-gray-100 text-gray-800'
                        }`}>
                          <Shield className="w-3 h-3" />
                          {patient.status || 'active'}
                        </div>
                      </div>
                    </td>

                    {/* Actions */}
                    <td className="py-4 px-6">
                      <div className="flex flex-col gap-2">
                        <button
                          onClick={() => handleViewDetails(patient)}
                          className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-4 py-2 rounded-xl font-medium transition-all duration-200 shadow-md flex items-center gap-2 justify-center"
                        >
                          <User className="w-4 h-4" />
                          View Details
                        </button>
                        <button
                          onClick={() => handleMedicalHistory(patient)}
                          className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-4 py-2 rounded-xl font-medium transition-all duration-200 shadow-md flex items-center gap-2 justify-center"
                        >
                          <Stethoscope className="w-4 h-4" />
                          Medical History
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Footer Info */}
      {patients.length > 0 && (
        <div className="mt-6 text-center text-gray-500 text-sm">
          Showing {patients.length} patient{patients.length !== 1 ? 's' : ''} in the system
        </div>
      )}
    </div>
  );
};

export default ManagePatients;