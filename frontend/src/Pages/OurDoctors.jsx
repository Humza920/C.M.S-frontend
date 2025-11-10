import React, { useState, useEffect } from "react";
import { Star, MapPin, Award, Clock, Calendar, Shield, Sparkles, Heart } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { fetchDoctorsAll } from "../Features/dashboardslice";
import { addData, openModal } from "../Features/modalSlice";
import { toast } from "react-hot-toast";

const OurDoctors = () => {
  const dispatch = useDispatch();
  const { doctors, loading, error } = useSelector((state) => state.dashboard || {});
  const { user } = useSelector((state) => state.auth);
console.log(doctors);

  useEffect(() => {
    dispatch(fetchDoctorsAll());
  }, [dispatch]);

  const handleBookAppointment = (doctor) => {
    if (!user) {
      toast.error("Please login first to book an appointment!", {
        duration: 4000,
        position: "top-center",
        style: {
          background: '#dc2626',
          color: 'white',
          borderRadius: '10px',
          fontSize: '14px',
          fontWeight: '600',
        }
      });
      return;
    }

    if (user.role === 'Doctor' || user.role === 'Staff') {
      toast.error("Doctors and staff cannot book appointments!", {
        duration: 4000,
        position: "top-center",
        style: {
          background: '#d97706',
          color: 'white',
          borderRadius: '10px',
          fontSize: '14px',
          fontWeight: '600',
        }
      });
      return;
    }

    dispatch(addData(doctor));
    dispatch(openModal("appointment"));
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 pt-24 pb-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <div className="h-8 bg-gray-200 rounded w-64 mx-auto mb-4 animate-pulse"></div>
            <div className="h-4 bg-gray-200 rounded w-96 mx-auto"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, index) => (
              <div key={index} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 animate-pulse">
                <div className="flex justify-center -mt-16 mb-4">
                  <div className="w-24 h-24 bg-gray-200 rounded-full border-4 border-white"></div>
                </div>
                <div className="h-6 bg-gray-200 rounded mb-3"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4 mx-auto mb-4"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto mb-6"></div>
                <div className="h-10 bg-gray-200 rounded"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 pt-24 pb-12 flex items-center justify-center">
        <div className="text-center bg-white rounded-lg shadow-sm border border-gray-200 p-8 max-w-md">
          <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Shield className="h-6 w-6 text-red-500" />
          </div>
          <h3 className="text-lg font-semibold text-gray-800 mb-2">Unable to Load Doctors</h3>
          <p className="text-gray-600 mb-4 text-sm">{error}</p>
          <button 
            onClick={() => dispatch(fetchDoctorsAll())}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-3">Our Specialist Doctors</h1>
          <p className="text-gray-600 max-w-2xl mx-auto text-sm">
            Meet our team of highly qualified medical professionals dedicated to your health and well-being.
          </p>
        </div>

        {/* Doctors Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {doctors.map((doctor) => (
            <div
              key={doctor._id}
              className="bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow overflow-hidden"
            >
              {/* Doctor Header */}
              <div className="bg-gradient-to-r from-blue-600 to-blue-700 h-32 relative">
                <img
                  src={doctor.profileImg || "https://cdn-icons-png.flaticon.com/512/847/847969.png"}
                  alt={doctor.userId?.userName}
                  className="w-20 h-20 rounded-full border-4 border-white absolute -bottom-10 left-1/2 transform -translate-x-1/2 object-cover bg-white"
                />
              </div>

              {/* Doctor Info */}
              <div className="pt-12 pb-6 px-6 text-center">
                <h3 className="text-lg font-semibold text-gray-800 mb-1">
                  Dr. {doctor.userId?.userName}
                </h3>
                <p className="text-blue-600 font-medium text-sm mb-2">
                  {doctor.specialization || "Specialist"}
                </p>
                <p className="text-gray-600 text-xs mb-3">
                  {doctor.qualification || "Qualified Professional"}
                </p>

                {/* Rating and Experience */}
                <div className="flex items-center justify-center gap-4 mb-4 text-xs">
                  <div className="flex items-center gap-1">
                    <Star className="h-3 w-3 text-yellow-400 fill-current" />
                    <span className="font-medium text-gray-700">{doctor.averageRating || 0}</span>
                  </div>
                  <div className="w-px h-3 bg-gray-300"></div>
                  <div className="flex items-center gap-1 text-gray-600">
                    <Award className="h-3 w-3 text-blue-500" />
                    <span>{doctor.experience || 0} yrs exp</span>
                  </div>
                  <div className="w-px h-3 bg-gray-300"></div>
                  <div className="flex items-center gap-1 text-gray-600">
                    <MapPin className="h-3 w-3 text-red-500" />
                    <span>{doctor.location?.country || "Online"}</span>
                  </div>
                </div>

                {/* Available Days */}
                <div className="mb-4">
                  <div className="flex flex-wrap gap-1 justify-center">
                    {doctor.availableDays?.slice(0, 3).map((day, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-blue-50 text-blue-700 text-xs font-medium rounded border border-blue-200"
                      >
                        {day.substring(0, 3)}
                      </span>
                    ))}
                    {doctor.availableDays?.length > 3 && (
                      <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs font-medium rounded border border-gray-200">
                        +{doctor.availableDays.length - 3} more
                      </span>
                    )}
                  </div>
                </div>

                {/* Consultation Fee */}
                <div className="flex items-center justify-center gap-2 mb-4 text-sm">
                  <Clock className="h-4 w-4 text-purple-500" />
                  <span className="text-gray-600">Consultation:</span>
                  <span className="font-semibold text-gray-800">₹{doctor.fees || "N/A"}</span>
                </div>

                {/* Book Button */}
                <button
                  onClick={() => handleBookAppointment(doctor)}
                  className="w-full bg-blue-600 text-white py-2.5 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
                >
                  <Calendar className="h-4 w-4" />
                  Book Appointment
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {doctors.length === 0 && !loading && (
          <div className="text-center py-12">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 max-w-md mx-auto">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="h-8 w-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">No Doctors Available</h3>
              <p className="text-gray-600 text-sm mb-4">
                We're currently updating our medical team. Please check back later.
              </p>
              <button 
                onClick={() => dispatch(fetchDoctorsAll())}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
              >
                Refresh
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default OurDoctors;