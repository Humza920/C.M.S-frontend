import React from 'react';
import { Star, Award } from 'lucide-react';

const OurDoctors = () => {
  const doctors = [
    {
      name: "Dr. Sarah Johnson",
      specialization: "Cardiologist",
      experience: "15+ years",
      education: "MD, Harvard Medical School",
      image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=400&fit=crop&crop=face",
      rating: 4.9,
      specialties: ["Heart Surgery", "Cardiac Rehabilitation", "Preventive Cardiology"]
    },
    {
      name: "Dr. Michael Chen",
      specialization: "Neurologist",
      experience: "12+ years",
      education: "MD, Johns Hopkins University",
      image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&h=400&fit=crop&crop=face",
      rating: 4.8,
      specialties: ["Epilepsy", "Stroke Treatment", "Headache Disorders"]
    },
    {
      name: "Dr. Emily Rodriguez",
      specialization: "Pediatrician",
      experience: "10+ years",
      education: "MD, Stanford University",
      image: "https://images.unsplash.com/photo-1594824947933-d0501ba2fe65?w=400&h=400&fit=crop&crop=face",
      rating: 4.9,
      specialties: ["Child Development", "Vaccinations", "Pediatric Care"]
    },
    {
      name: "Dr. James Wilson",
      specialization: "Orthopedic Surgeon",
      experience: "18+ years",
      education: "MD, Mayo Clinic",
      image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=400&h=400&fit=crop&crop=face",
      rating: 4.7,
      specialties: ["Joint Replacement", "Sports Medicine", "Fracture Care"]
    },
    {
      name: "Dr. Priya Patel",
      specialization: "Dermatologist",
      experience: "8+ years",
      education: "MD, UC San Francisco",
      image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=400&fit=crop&crop=face",
      rating: 4.8,
      specialties: ["Skin Cancer", "Cosmetic Dermatology", "Acne Treatment"]
    },
    {
      name: "Dr. Robert Brown",
      specialization: "Ophthalmologist",
      experience: "14+ years",
      education: "MD, Yale School of Medicine",
      image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&h=400&fit=crop&crop=face",
      rating: 4.9,
      specialties: ["Cataract Surgery", "Retinal Diseases", "LASIK Surgery"]
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Meet Our Doctors</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Our team of highly qualified and experienced medical professionals is dedicated 
            to providing you with the best possible healthcare experience.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {doctors.map((doctor, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow overflow-hidden">
              <div className="h-48 bg-gradient-to-r from-blue-500 to-blue-600 relative">
                <img
                  src={doctor.image}
                  alt={doctor.name}
                  className="w-24 h-24 rounded-full border-4 border-white absolute -bottom-12 left-1/2 transform -translate-x-1/2 object-cover"
                />
              </div>
              
              <div className="pt-16 pb-6 px-6 text-center">
                <h3 className="text-xl font-semibold text-gray-800 mb-1">{doctor.name}</h3>
                <p className="text-blue-600 font-medium mb-2">{doctor.specialization}</p>
                <p className="text-gray-600 text-sm mb-3">{doctor.education}</p>
                
                <div className="flex items-center justify-center mb-4">
                  <div className="flex items-center">
                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                    <span className="ml-1 text-sm font-medium text-gray-700">{doctor.rating}</span>
                  </div>
                  <span className="mx-2 text-gray-300">•</span>
                  <span className="text-sm text-gray-600">{doctor.experience} experience</span>
                </div>

                <div className="mb-6">
                  <h4 className="text-sm font-semibold text-gray-700 mb-2">Specialties:</h4>
                  <div className="flex flex-wrap justify-center gap-2">
                    {doctor.specialties.map((specialty, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-1 bg-blue-50 text-blue-600 text-xs rounded-full"
                      >
                        {specialty}
                      </span>
                    ))}
                  </div>
                </div>

                <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium">
                  Book Appointment
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OurDoctors;