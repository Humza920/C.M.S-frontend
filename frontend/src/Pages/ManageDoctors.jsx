import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchDoctorsAll } from "../Features/dashboardslice";
import { toast } from "react-hot-toast";
import { addData, openModal } from "../Features/modalSlice";
import { User, Mail, Phone, MapPin, Calendar, Award, Stethoscope, Clock, Star, IndianRupee } from 'lucide-react';

const ManageDoctors = () => {
  const dispatch = useDispatch();
  const { doctors, loading, error } = useSelector((state) => state.dashboard);
  console.log(doctors);

  useEffect(() => {
    dispatch(fetchDoctorsAll());
  }, [dispatch]);

  useEffect(() => {
    if (error) toast.error(error);
  }, [error]);

  const handleViewDetails = (doctor) => {
    dispatch(addData(doctor))
    dispatch(openModal("viewDetails"))
  };

  const handleInviteClick = () => {
    dispatch(openModal("invitemodal"));
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

  // Format available days
  const formatAvailableDays = (days) => {
    if (!Array.isArray(days) || days.length === 0) return "Not specified";
    return days.join(", ");
  };

  // Format available time
  const formatAvailableTime = (time) => {
    if (!time || !time.start || !time.end) return "Not specified";
    return `${time.start} - ${time.end}`;
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header Section */}
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between mb-8">
        <div className="mb-4 lg:mb-0">
          <h1 className="text-3xl font-bold text-gray-800">Manage Doctors</h1>
          <p className="text-gray-600 mt-2">Manage and view all registered doctors</p>
        </div>
        <button
          onClick={handleInviteClick}
          className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-6 py-3 rounded-xl font-semibold shadow-lg transition-all duration-200 flex items-center gap-2"
        >
          <User className="w-5 h-5" />
          Invite Doctor
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Total Doctors</p>
              <p className="text-3xl font-bold text-gray-800 mt-2">{doctors.length}</p>
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
              <p className="text-3xl font-bold text-gray-800 mt-2">{doctors.length}</p>
            </div>
            <div className="p-3 bg-green-100 rounded-xl">
              <Calendar className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Avg. Rating</p>
              <p className="text-3xl font-bold text-gray-800 mt-2">
                {doctors.length > 0 
                  ? (doctors.reduce((acc, doc) => acc + (doc.averageRating || 0), 0) / doctors.length).toFixed(1)
                  : "0.0"
                }
              </p>
            </div>
            <div className="p-3 bg-amber-100 rounded-xl">
              <Star className="w-6 h-6 text-amber-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Total Rooms</p>
              <p className="text-3xl font-bold text-gray-800 mt-2">
                {new Set(doctors.map(doc => doc.roomId?._id)).size}
              </p>
            </div>
            <div className="p-3 bg-purple-100 rounded-xl">
              <MapPin className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Doctors Table */}
      {loading ? (
        <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-600 border-t-transparent mx-auto mb-4"></div>
          <p className="text-blue-600 font-medium text-lg">Loading doctors...</p>
        </div>
      ) : doctors.length === 0 ? (
        <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
          <User className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-gray-800 mb-2">No Doctors Found</h3>
          <p className="text-gray-600 mb-6">No doctors are currently registered in the system.</p>
          <button
            onClick={handleInviteClick}
            className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-xl font-semibold transition-colors"
          >
            Invite First Doctor
          </button>
        </div>
      ) : (
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead className="bg-gradient-to-r from-gray-50 to-blue-50 border-b border-gray-200">
                <tr>
                  <th className="py-4 px-6 text-left font-semibold text-gray-700">Doctor</th>
                  <th className="py-4 px-6 text-left font-semibold text-gray-700">Contact</th>
                  <th className="py-4 px-6 text-left font-semibold text-gray-700">Professional</th>
                  <th className="py-4 px-6 text-left font-semibold text-gray-700">Availability</th>
                  <th className="py-4 px-6 text-left font-semibold text-gray-700">Room & Fees</th>
                  <th className="py-4 px-6 text-center font-semibold text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {doctors.map((doctor, idx) => (
                  <tr 
                    key={doctor._id}
                    className="hover:bg-gray-50 transition-colors duration-150"
                  >
                    {/* Doctor Info */}
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-4">
                        <img
                          src={doctor.profileImg || "https://cdn-icons-png.flaticon.com/512/3304/3304567.png"}
                          alt={doctor.userId?.userName}
                          className="w-12 h-12 rounded-xl object-cover border-2 border-gray-200"
                        />
                        <div>
                          <p className="font-semibold text-gray-800">
                            Dr. {doctor.userId?.userName || "Unnamed"}
                          </p>
                          <p className="text-sm text-gray-600 flex items-center gap-1 mt-1">
                            <Stethoscope className="w-4 h-4 text-blue-500" />
                            {doctor.specialization || "Not specified"}
                          </p>
                          <div className="flex items-center gap-2 mt-2">
                            <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-xs font-medium">
                              {doctor.userId?.role || "Doctor"}
                            </span>
                            <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs font-medium">
                              {doctor.experience || 0} yrs exp
                            </span>
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* Contact Info */}
                    <td className="py-4 px-6">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <Mail className="w-4 h-4 text-gray-400" />
                          <span className="text-sm text-gray-700">{doctor.userId?.emailAddress || "-"}</span>
                        </div>
                        {doctor.phoneNumber && (
                          <div className="flex items-center gap-2">
                            <Phone className="w-4 h-4 text-gray-400" />
                            <span className="text-sm text-gray-700">{doctor.phoneNumber}</span>
                          </div>
                        )}
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4 text-gray-400" />
                          <span className="text-sm text-gray-700">{getLocationDisplay(doctor.location)}</span>
                        </div>
                      </div>
                    </td>

                    {/* Professional Details */}
                    <td className="py-4 px-6">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <Award className="w-4 h-4 text-green-500" />
                          <span className="text-sm text-gray-700">{doctor.qualification || "Not specified"}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-purple-500" />
                          <span className="text-sm text-gray-700">{doctor.experience || 0} years experience</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Star className="w-4 h-4 text-amber-500" />
                          <span className="text-sm text-gray-700">
                            Rating: {doctor.averageRating || "No ratings"}
                          </span>
                        </div>
                      </div>
                    </td>

                    {/* Availability */}
                    <td className="py-4 px-6">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4 text-blue-500" />
                          <span className="text-sm text-gray-700">{formatAvailableDays(doctor.availableDays)}</span>
                        </div>
                        <div className="text-sm text-gray-700 bg-blue-50 px-3 py-1 rounded-lg">
                          {formatAvailableTime(doctor.availableTime)}
                        </div>
                      </div>
                    </td>

                    {/* Room & Fees */}
                    <td className="py-4 px-6">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4 text-purple-500" />
                          <span className="text-sm font-medium text-gray-800">
                            Room: {doctor.roomId?.roomNumber || "Not assigned"}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <IndianRupee className="w-4 h-4 text-green-500" />
                          <span className="text-sm font-medium text-gray-800">
                            Fees: ₹{doctor.fees || 0}
                          </span>
                        </div>
                        {doctor.salary && (
                          <div className="text-sm text-gray-600">
                            Salary: ₹{doctor.salary.toLocaleString()}
                          </div>
                        )}
                      </div>
                    </td>

                    {/* Actions */}
                    <td className="py-4 px-6">
                      <div className="flex justify-center">
                        <button
                          onClick={() => handleViewDetails(doctor)}
                          className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-4 py-2 rounded-xl font-medium transition-all duration-200 shadow-md flex items-center gap-2"
                        >
                          <User className="w-4 h-4" />
                          View Details
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
      {doctors.length > 0 && (
        <div className="mt-6 text-center text-gray-500 text-sm">
          Showing {doctors.length} doctor{doctors.length !== 1 ? 's' : ''} in the system
        </div>
      )}
    </div>
  );
};

export default ManageDoctors;