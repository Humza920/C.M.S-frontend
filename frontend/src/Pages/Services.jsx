import React from 'react';
import { Heart, Eye, Brain, Bone, Stethoscope, Smile } from 'lucide-react';

const Services = () => {
  const services = [
    {
      icon: <Heart className="h-8 w-8" />,
      title: "Cardiology",
      description: "Comprehensive heart care and cardiovascular treatments",
      details: ["ECG", "Echocardiography", "Cardiac Consultation"]
    },
    {
      icon: <Eye className="h-8 w-8" />,
      title: "Ophthalmology",
      description: "Complete eye care and vision correction services",
      details: ["Eye Checkup", "Cataract Surgery", "Glaucoma Treatment"]
    },
    {
      icon: <Brain className="h-8 w-8" />,
      title: "Neurology",
      description: "Expert care for neurological disorders and conditions",
      details: ["EEG", "Neurological Consultation", "Headache Treatment"]
    },
    {
      icon: <Bone className="h-8 w-8" />,
      title: "Orthopedics",
      description: "Bone and joint care with advanced treatment options",
      details: ["Fracture Care", "Joint Replacement", "Sports Medicine"]
    },
    {
      icon: <Stethoscope className="h-8 w-8" />,
      title: "General Medicine",
      description: "Primary healthcare for all your medical needs",
      details: ["Health Checkups", "Chronic Disease Management", "Preventive Care"]
    },
    {
      icon: <Smile className="h-8 w-8" />,
      title: "Dentistry",
      description: "Complete dental care and oral health services",
      details: ["Dental Checkup", "Teeth Cleaning", "Root Canal Treatment"]
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Our Medical Services</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            We offer a wide range of specialized medical services to meet all your healthcare needs. 
            Our expert doctors are here to provide you with the best possible care.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6">
              <div className="text-blue-600 mb-4">
                {service.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">{service.title}</h3>
              <p className="text-gray-600 mb-4">{service.description}</p>
              <ul className="space-y-2">
                {service.details.map((detail, idx) => (
                  <li key={idx} className="text-gray-700 flex items-center">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                    {detail}
                  </li>
                ))}
              </ul>
              <button className="mt-6 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium">
                Book Appointment
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Services;