import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Clock, Users, Award, ArrowRight } from 'lucide-react';

const Home = () => {
  const features = [
    {
      icon: <Calendar className="h-8 w-8" />,
      title: "Easy Appointments",
      description: "Book your appointments online in just a few clicks"
    },
    {
      icon: <Clock className="h-8 w-8" />,
      title: "24/7 Availability",
      description: "Online booking available anytime, anywhere"
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: "Expert Doctors",
      description: "Highly qualified and experienced medical professionals"
    },
    {
      icon: <Award className="h-8 w-8" />,
      title: "Quality Care",
      description: "Committed to providing the best medical care"
    }
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-6">Your Health is Our Priority</h1>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Book appointments with top medical specialists. Quality healthcare made simple and accessible.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/services"
              className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors flex items-center justify-center"
            >
              View Services <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
            <Link
              to="/signup"
              className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors"
            >
              Book Appointment
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Why Choose Our Clinic?</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We provide comprehensive healthcare services with a patient-centered approach.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center p-6 rounded-lg hover:shadow-lg transition-shadow">
                <div className="text-blue-600 mb-4 flex justify-center">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gray-100">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Ready to Take Care of Your Health?
          </h2>
          <p className="text-gray-600 mb-8">
            Join thousands of satisfied patients who trust us with their healthcare needs.
          </p>
          <Link
            to="/signup"
            className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors inline-flex items-center"
          >
            Get Started Today <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;