import  { useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { openModal } from "../Features/modalSlice";
import { Calendar, Clock, Users, Award, ArrowRight } from "lucide-react";


const Home = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (user && !user.userId.isProfileComplete) {
      dispatch(openModal("completeProfile"));
    }
  }, [user]);

  const features = [
    { icon: <Calendar className="h-8 w-8" />, title: "Easy Appointments", description: "Book your appointments online in just a few clicks." },
    { icon: <Clock className="h-8 w-8" />, title: "24/7 Availability", description: "Online booking available anytime, anywhere." },
    { icon: <Users className="h-8 w-8" />, title: "Expert Doctors", description: "Highly qualified and experienced medical professionals." },
    { icon: <Award className="h-8 w-8" />, title: "Quality Care", description: "Committed to providing the best medical care." },
  ];

  return (
    <div className="font-[Poppins] bg-gray-50 text-gray-800 min-h-screen">

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-32 px-6 text-center mt-16">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-5xl sm:text-6xl font-bold mb-6 leading-tight">
            Your Health is Our <span className="text-yellow-300">Priority</span>
          </h1>
          <p className="text-lg sm:text-xl mb-10 max-w-2xl mx-auto opacity-90">
            Book appointments with top specialists — Quality healthcare made simple and accessible.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/services" className="bg-white text-blue-700 font-semibold px-8 py-3 rounded-xl shadow hover:bg-gray-100 transition-all flex items-center justify-center">
              View Services <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
            <Link to="/our-doctors" className="border-2 border-white text-white px-8 py-3 rounded-xl font-semibold hover:bg-white hover:text-blue-700 transition-all">
              Book Appointment
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto text-center mb-14">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-gray-900">
            Why Choose <span className="text-blue-600">Our Clinic?</span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            We provide comprehensive healthcare services with a patient-centered approach.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {features.map((feature, index) => (
            <div key={index} className="bg-white p-8 rounded-2xl shadow-md hover:shadow-xl transition-all text-center">
              <div className="text-blue-600 mb-4 flex justify-center">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600 text-sm">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
