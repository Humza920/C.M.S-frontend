import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchDoctorAppointments } from "../Features/appointmentslice";
import { openModal, addData } from "../Features/modalSlice";

const DoctorAppointments = () => {
  const dispatch = useDispatch();
  const { appointments, loading, error } = useSelector(
    (state) => state.appointment
  );
  const [filter, setFilter] = useState("all");
  const [filteredAppointments, setFilteredAppointments] = useState([]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchDoctorAppointments());
  }, [dispatch]);

  useEffect(() => {
    if (appointments) {
      const appointmentList = Array.isArray(appointments)
        ? appointments
        : appointments?.data || [];

      let filtered = appointmentList;

      const today = new Date();
      const yesterday = new Date(today);
      yesterday.setDate(yesterday.getDate() - 1);
      
      const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
      const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);

      switch (filter) {
        case "today":
          filtered = appointmentList.filter(appt => {
            const apptDate = new Date(appt.appointmentDate);
            return apptDate.toDateString() === today.toDateString();
          });
          break;
        
        case "yesterday":
          filtered = appointmentList.filter(appt => {
            const apptDate = new Date(appt.appointmentDate);
            return apptDate.toDateString() === yesterday.toDateString();
          });
          break;
        
        case "thisMonth":
          filtered = appointmentList.filter(appt => {
            const apptDate = new Date(appt.appointmentDate);
            return apptDate >= startOfMonth && apptDate <= endOfMonth;
          });
          break;
        
        case "completed":
          filtered = appointmentList.filter(appt => appt.status === 'completed');
          break;
        
        default:
          filtered = appointmentList;
      }

      setFilteredAppointments(filtered);
    }
  }, [appointments, filter]);

  const handleOpenModal = (appt) => {
    dispatch(addData(appt));
    dispatch(openModal("updateAppointment"));
  };

  const getFilterCounts = () => {
    const appointmentList = Array.isArray(appointments)
      ? appointments
      : appointments?.data || [];

    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    
    const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);

    return {
      all: appointmentList.length,
      today: appointmentList.filter(appt => 
        new Date(appt.appointmentDate).toDateString() === today.toDateString()
      ).length,
      yesterday: appointmentList.filter(appt => 
        new Date(appt.appointmentDate).toDateString() === yesterday.toDateString()
      ).length,
      thisMonth: appointmentList.filter(appt => {
        const apptDate = new Date(appt.appointmentDate);
        return apptDate >= startOfMonth && apptDate <= endOfMonth;
      }).length,
      completed: appointmentList.filter(appt => appt.status === 'completed').length,
    };
  };

  const filterCounts = appointments ? getFilterCounts() : {};

  const filterOptions = [
    { value: "all", label: "All Appointments", count: filterCounts.all },
    { value: "today", label: "Today's Appointments", count: filterCounts.today },
    { value: "yesterday", label: "Yesterday's Appointments", count: filterCounts.yesterday },
    { value: "thisMonth", label: "This Month", count: filterCounts.thisMonth },
    { value: "completed", label: "Completed", count: filterCounts.completed },
  ];

  if (loading) return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <p className="text-gray-600 text-lg">Loading appointments...</p>
      </div>
    </div>
  );

  if (error) return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <div className="bg-white rounded-xl shadow-lg p-8 max-w-md w-full text-center">
        <div className="text-red-500 text-4xl mb-4">⚠️</div>
        <h3 className="text-xl font-semibold text-gray-800 mb-2">Error Loading Appointments</h3>
        <p className="text-gray-600 mb-6">{error}</p>
        <button 
          onClick={() => dispatch(fetchDoctorAppointments())}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
        >
          Try Again
        </button>
      </div>
    </div>
  );

  const appointmentList = Array.isArray(appointments)
    ? appointments
    : appointments?.data || [];

  if (!appointmentList.length) return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <div className="text-gray-400 text-6xl mb-6">📅</div>
        <h3 className="text-2xl font-semibold text-gray-700 mb-2">No Appointments Scheduled</h3>
        <p className="text-gray-500">You don't have any appointments yet.</p>
      </div>
    </div>
  );

  const getStatusStyles = (status) => {
    const styles = {
      completed: "bg-green-50 text-green-700 border border-green-200",
      cancelled: "bg-red-50 text-red-700 border border-red-200",
      booked: "bg-blue-50 text-blue-700 border border-blue-200",
      pending: "bg-yellow-50 text-yellow-700 border border-yellow-200",
      confirmed: "bg-emerald-50 text-emerald-700 border border-emerald-200"
    };
    return styles[status] || styles.pending;
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return {
      full: date.toLocaleDateString('en-US', { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      }),
      short: date.toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric',
        year: 'numeric'
      })
    };
  };

  const getCurrentFilterLabel = () => {
    return filterOptions.find(option => option.value === filter)?.label || "All Appointments";
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div className="mb-4 sm:mb-0">
              <h1 className="text-3xl font-bold text-gray-900">Appointments</h1>
              <p className="text-gray-600 mt-2">Manage your patient appointments and schedule</p>
            </div>
            
            {/* Filter Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsFilterOpen(!isFilterOpen)}
                className="flex items-center gap-3 px-4 py-2.5 bg-white border border-gray-300 rounded-lg shadow-sm hover:bg-gray-50 transition-colors duration-200"
              >
                <span className="text-gray-700">{getCurrentFilterLabel()}</span>
                <svg className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${isFilterOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {isFilterOpen && (
                <div className="absolute right-0 mt-2 w-72 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                  <div className="p-2">
                    {filterOptions.map((option) => (
                      <button
                        key={option.value}
                        onClick={() => {
                          setFilter(option.value);
                          setIsFilterOpen(false);
                        }}
                        className={`flex items-center justify-between w-full px-3 py-2.5 text-left rounded-md transition-colors duration-150 ${
                          filter === option.value
                            ? 'bg-blue-50 text-blue-700'
                            : 'text-gray-700 hover:bg-gray-50'
                        }`}
                      >
                        <span className="font-medium">{option.label}</span>
                        <span className={`px-2 py-1 text-xs rounded-full ${
                          filter === option.value
                            ? 'bg-blue-100 text-blue-700'
                            : 'bg-gray-100 text-gray-600'
                        }`}>
                          {option.count}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total</p>
                <p className="text-2xl font-bold text-gray-900">{appointmentList.length}</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Completed</p>
                <p className="text-2xl font-bold text-gray-900">{filterCounts.completed}</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Today</p>
                <p className="text-2xl font-bold text-gray-900">{filterCounts.today}</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">This Month</p>
                <p className="text-2xl font-bold text-gray-900">{filterCounts.thisMonth}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Appointments List */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
          {/* Header */}
          <div className="border-b border-gray-200 px-6 py-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold text-gray-900">{getCurrentFilterLabel()}</h2>
                <p className="text-sm text-gray-600 mt-1">
                  {filteredAppointments.length} of {appointmentList.length} appointments
                </p>
              </div>
            </div>
          </div>

          {/* Appointments */}
          <div className="divide-y divide-gray-200">
            {filteredAppointments.map((appt) => {
              const formattedDate = formatDate(appt.appointmentDate);
              
              return (
                <div
                  key={appt._id}
                  className="px-6 py-4 hover:bg-gray-50 transition-colors duration-150 cursor-pointer"
                  onClick={() => handleOpenModal(appt)}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-start space-x-4">
                        <div className="flex-shrink-0">
                          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center text-white font-semibold text-lg">
                            {appt.patientId?.userId?.userName?.charAt(0) || "P"}
                          </div>
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center space-x-3 mb-2">
                            <h3 className="text-lg font-semibold text-gray-900 truncate">
                              {appt.patientId?.userId?.userName || "N/A"}
                            </h3>
                            <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${getStatusStyles(appt.status)}`}>
                              {appt.status?.charAt(0).toUpperCase() + appt.status?.slice(1) || "Pending"}
                            </span>
                          </div>
                          
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600 mb-3">
                            <div className="flex items-center space-x-2">
                              <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                              </svg>
                              <span className="truncate">{appt.patientId?.userId?.emailAddress || "N/A"}</span>
                            </div>
                            
                            <div className="flex items-center space-x-2">
                              <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                              </svg>
                              <span>{appt.patientId?.phoneNumber || "N/A"}</span>
                            </div>
                            
                            <div className="flex items-center space-x-2">
                              <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                              </svg>
                              <span>{appt.patientId?.gender || "N/A"} • {appt.patientId?.age || "N/A"} yrs</span>
                            </div>
                          </div>

                          <div className="flex items-center space-x-6 text-sm text-gray-500">
                            <div className="flex items-center space-x-2">
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                              </svg>
                              <span>{formattedDate.full}</span>
                            </div>
                            
                            <div className="flex items-center space-x-2">
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                              </svg>
                              <span>{appt.startAt} - {appt.endAt}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center space-x-4">
                      <button className="text-blue-600 hover:text-blue-700 font-medium text-sm transition-colors duration-150">
                        View Details
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Empty State */}
          {filteredAppointments.length === 0 && (
            <div className="text-center py-12">
              <div className="text-gray-400 text-5xl mb-4">📅</div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No appointments found</h3>
              <p className="text-gray-500">No appointments match your current filter selection.</p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-500">
            Showing {filteredAppointments.length} of {appointmentList.length} appointments • 
            Last updated: {new Date().toLocaleTimeString()}
          </p>
        </div>
      </div>
    </div>
  );
};

export default DoctorAppointments;