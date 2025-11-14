import React, { useState, useEffect } from "react";
import { 
  Star, 
  MapPin, 
  Award, 
  Clock, 
  Calendar, 
  Shield, 
  Heart, 
  Search,
  Stethoscope,
  Brain,
  Eye,
  Bone,
  Baby,
  HeartPulse
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { fetchDoctorsAll } from "../Features/dashboardslice";
import { addData, openModal } from "../Features/modalSlice";
import { toast } from "react-hot-toast";

const OurDoctors = () => {
  const dispatch = useDispatch();
  const { doctors, loading, error } = useSelector((state) => state.dashboard || {});
  const { user } = useSelector((state) => state.auth);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSpecialization, setSelectedSpecialization] = useState("all");
  const [selectedCountry, setSelectedCountry] = useState("all");

  useEffect(() => {
    dispatch(fetchDoctorsAll());
  }, [dispatch]);

  const specializations = [...new Set(doctors.map(doc => doc.specialization).filter(Boolean))];
  const countries = [...new Set(doctors.map(doc => doc.location?.country).filter(Boolean))];

  const filteredDoctors = doctors.filter(doctor => {
    const matchesSearch = doctor.userId?.userName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doctor.specialization?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doctor.qualification?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesSpecialization = selectedSpecialization === "all" || 
                                 doctor.specialization === selectedSpecialization;
    
    const matchesCountry = selectedCountry === "all" || 
                          doctor.location?.country === selectedCountry;

    return matchesSearch && matchesSpecialization && matchesCountry;
  });

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

  const getSpecializationIcon = (specialization) => {
    const spec = specialization?.toLowerCase();
    if (spec?.includes("cardio")) return <HeartPulse className="h-5 w-5 text-red-500" />;
    if (spec?.includes("neuro")) return <Brain className="h-5 w-5 text-purple-500" />;
    if (spec?.includes("ortho")) return <Bone className="h-5 w-5 text-blue-500" />;
    if (spec?.includes("pediatric")) return <Baby className="h-5 w-5 text-pink-500" />;
    if (spec?.includes("eye") || spec?.includes("ophthal")) return <Eye className="h-5 w-5 text-green-500" />;
    return <Stethoscope className="h-5 w-5 text-gray-500" />;
  };


  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 pt-24 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="h-8 bg-gray-300 rounded-lg w-64 mx-auto mb-4 animate-pulse"></div>
            <div className="h-4 bg-gray-300 rounded-lg w-96 mx-auto"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 animate-pulse">
                <div className="flex justify-center -mt-16 mb-4">
                  <div className="w-24 h-24 bg-gray-300 rounded-full border-4 border-white shadow-lg"></div>
                </div>
                <div className="h-6 bg-gray-300 rounded-lg mb-3"></div>
                <div className="h-4 bg-gray-300 rounded-lg w-3/4 mx-auto mb-4"></div>
                <div className="h-4 bg-gray-300 rounded-lg w-1/2 mx-auto mb-6"></div>
                <div className="h-12 bg-gray-300 rounded-xl"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 pt-24 pb-12 flex items-center justify-center">
        <div className="text-center bg-white rounded-2xl shadow-lg border border-gray-100 p-8 max-w-md">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Shield className="h-8 w-8 text-red-500" />
          </div>
          <h3 className="text-xl font-bold text-gray-800 mb-2">Unable to Load Doctors</h3>
          <p className="text-gray-600 mb-6">{error}</p>
          <button 
            onClick={() => dispatch(fetchDoctorsAll())}
            className="bg-blue-600 text-white px-6 py-3 rounded-xl text-sm font-semibold hover:bg-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 pt-12 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-6">
          <h1 className="text-4xl font-bold text-gray-900 mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Our Medical Specialists
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Connect with our team of certified healthcare professionals dedicated to your well-being
          </p>
        </div>

<div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 mb-8">
  <div className="flex flex-col lg:flex-row justify-between gap-6">
    
    <div className="w-full lg:w-[48%]">
      <label className="block text-sm font-semibold text-gray-700 mb-2">
        Search Doctors
      </label>
      <div className="relative">
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
        <input
          type="text"
          placeholder="Search by name, specialization..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
        />
      </div>
    </div>
    <div className="w-full lg:w-[48%]">
      <label className="block text-sm font-semibold text-gray-700 mb-2">
        Specialization
      </label>
      <select
        value={selectedSpecialization}
        onChange={(e) => setSelectedSpecialization(e.target.value)}
        className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
      >
        <option value="all">All Specializations</option>
        {specializations.map((spec, index) => (
          <option key={index} value={spec}>{spec}</option>
        ))}
      </select>
    </div>
  </div>
</div>


        <div className="flex items-center justify-between mb-6">
          <p className="text-gray-600">
            Showing <span className="font-semibold text-blue-600">{filteredDoctors.length}</span> 
            {filteredDoctors.length === 1 ? ' doctor' : ' doctors'}
            {searchTerm && ` for "${searchTerm}"`}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredDoctors.map((doctor) => (
            <div
              key={doctor._id}
              className="bg-white rounded-2xl shadow-lg border border-gray-100 hover:shadow-2xl transition-all duration-500 overflow-hidden group"
            >
              
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 h-32 relative">
                <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2">
                  <div className="relative">
                    <img
                      src={doctor.profileImg || "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=150&h=150&fit=crop&crop=face"}
                      alt={doctor.userId?.userName}
                      className="w-24 h-24 rounded-full border-4 border-white shadow-xl object-cover bg-white transition-transform duration-300 group-hover:scale-110"
                    />
                    <div className="absolute -bottom-1 -right-1 bg-white rounded-full p-1 shadow-lg">
                      {getSpecializationIcon(doctor.specialization)}
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-14 pb-6 px-6 text-center">
                
                <h3 className="text-xl font-bold text-gray-800 mb-1 group-hover:text-blue-600 transition-colors">
                  Dr. {doctor.userId?.userName}
                </h3>
                <div className="flex items-center justify-center gap-2 mb-2">
                  {getSpecializationIcon(doctor.specialization)}
                  <p className="text-blue-600 font-semibold text-sm">
                    {doctor.specialization || "Medical Specialist"}
                  </p>
                </div>
                
                <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                  {doctor.qualification || "Board Certified Professional"}
                </p>

                <div className="flex items-center justify-center gap-4 mb-4 text-sm">
                  <div className="flex items-center gap-1 bg-yellow-50 px-3 py-1 rounded-full">
                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                    <span className="font-semibold text-gray-700">{doctor.averageRating || "4.5"}</span>
                  </div>
                  <div className="flex items-center gap-1 bg-blue-50 px-3 py-1 rounded-full">
                    <Award className="h-4 w-4 text-blue-500" />
                    <span className="font-medium text-gray-700">{doctor.experience || 5}+ years exp</span>
                  </div>
                </div>


                <div className="flex items-center justify-center gap-2 mb-4 text-gray-600">
                  <MapPin className="h-4 w-4 text-red-500" />
                  <span className="text-sm">{doctor.location?.country || "Available Online"}</span>
                </div>

                <div className="mb-4">
                  <p className="text-xs text-gray-500 font-medium mb-2">AVAILABLE DAYS</p>
                  <div className="flex flex-wrap gap-1 justify-center">
                    {doctor.availableDays?.slice(0, 4).map((day, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-green-50 text-green-700 text-xs font-semibold rounded-lg border border-green-200"
                      >
                        {day.substring(0, 3)}
                      </span>
                    ))}
                    {doctor.availableDays?.length > 4 && (
                      <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs font-medium rounded-lg">
                        +{doctor.availableDays.length - 4}
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex items-center justify-center gap-2 mb-6 text-sm bg-gray-50 py-2 rounded-xl">
                  <Clock className="h-4 w-4 text-purple-500" />
                  <span className="text-gray-600">Consultation:</span>
                  <span className="font-bold text-gray-800">₹{doctor.fees || "800"}</span>
                </div>
                <button
                  onClick={() => handleBookAppointment(doctor)}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:-translate-y-1 shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
                >
                  <Calendar className="h-5 w-5" />
                  Book Appointment
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredDoctors.length === 0 && !loading && (
          <div className="text-center py-16">
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-12 max-w-md mx-auto">
              <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Heart className="h-10 w-10 text-blue-500" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-3">No Doctors Found</h3>
              <p className="text-gray-600 mb-6">
                {searchTerm || selectedSpecialization !== "all" || selectedCountry !== "all"
                  ? "No doctors match your current filters. Try adjusting your search criteria."
                  : "We're currently updating our medical team. Please check back later."}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default OurDoctors;