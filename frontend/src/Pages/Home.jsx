import { useEffect } from "react";
import { Link , useNavigate} from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { openModal } from "../Features/modalSlice";
import { Calendar, Clock, Users, Award, ArrowRight, Star, Shield, Heart, MapPin, Phone } from "lucide-react";

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const { user , role } = useSelector((state) => state.auth);

  useEffect(() => {

      if (user && role !== "Patient") {
    navigate("/dashboard");
  }

    if (user && !user.userId?.isProfileComplete) {
      dispatch(openModal("completeProfile"));
    }
  }, [user]);

  const features = [
    { 
      icon: <Calendar className="h-10 w-10" />, 
      title: "Easy Booking", 
      description: "Seamless online appointment scheduling with instant confirmation" 
    },
    { 
      icon: <Clock className="h-10 w-10" />, 
      title: "Flexible Timings", 
      description: "Open Monday to Saturday, 10:00 AM - 8:00 PM for your convenience" 
    },
    { 
      icon: <Users className="h-10 w-10" />, 
      title: "Expert Specialists", 
      description: "Highly qualified doctors with years of medical expertise" 
    },
    { 
      icon: <Shield className="h-10 w-10" />, 
      title: "Safe & Secure", 
      description: "Your health data is protected with enterprise-grade security" 
    },
  ];

  const stats = [
    { number: "10K+", label: "Patients Treated" },
    { number: "50+", label: "Expert Doctors" },
    { number: "15+", label: "Medical Specialties" },
    { number: "98%", label: "Patient Satisfaction" },
  ];

  return (
    <div className="font-[Poppins] bg-gradient-to-br from-gray-50 to-blue-50 text-gray-900 min-h-screen">

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-700 via-blue-800 to-purple-900 text-white py-32 px-6 text-center overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-20 h-20 bg-white rounded-full"></div>
          <div className="absolute top-40 right-20 w-16 h-16 bg-white rounded-full"></div>
          <div className="absolute bottom-20 left-1/4 w-24 h-24 bg-white rounded-full"></div>
        </div>
        
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="inline-flex items-center bg-blue-600/20 backdrop-blur-sm px-4 py-2 rounded-full border border-blue-400/30 mb-6">
            <Star className="h-4 w-4 mr-2 fill-yellow-400 text-yellow-400" />
            <span className="text-sm font-medium">Trusted by 10,000+ Patients</span>
          </div>
          
          <h1 className="text-5xl sm:text-7xl font-bold mb-6 leading-tight">
            Your Health, 
            <span className="block bg-gradient-to-r from-yellow-400 to-amber-400 bg-clip-text text-transparent">
              Our Commitment
            </span>
          </h1>
          
          <p className="text-xl sm:text-2xl mb-10 max-w-3xl mx-auto opacity-95 leading-relaxed">
            Experience premium healthcare with our expert medical team. 
            <span className="block text-blue-200 font-semibold mt-2">
              Open Monday to Saturday • 10:00 AM - 8:00 PM
            </span>
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link 
              to="/our-doctors" 
              className="group bg-gradient-to-r from-amber-500 to-yellow-500 text-white font-bold px-10 py-4 rounded-2xl shadow-2xl hover:shadow-amber-500/25 hover:scale-105 transition-all duration-300 flex items-center justify-center text-lg"
            >
              Book Appointment
              <ArrowRight className="ml-3 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            
            <Link 
              to="/about" 
              className="group border-2 border-white/30 bg-white/10 backdrop-blur-sm text-white px-10 py-4 rounded-2xl font-bold hover:bg-white hover:text-blue-900 transition-all duration-300 text-lg"
            >
              Learn More
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white relative -mt-10">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center p-6 rounded-2xl bg-gradient-to-br from-blue-50 to-white shadow-lg border border-blue-100">
                <div className="text-3xl lg:text-4xl font-bold text-blue-800 mb-2">{stat.number}</div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold mb-4">
              Why Choose <span className="text-blue-700">Our Clinic?</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              We combine medical excellence with compassionate care to deliver the best healthcare experience
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index} 
                className="group bg-white p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-gray-100"
              >
                <div className="text-blue-600 mb-6 flex justify-center">
                  <div className="p-4 bg-blue-50 rounded-2xl group-hover:bg-blue-100 transition-colors">
                    {feature.icon}
                  </div>
                </div>
                <h3 className="text-2xl font-bold mb-4 text-center text-gray-900">{feature.title}</h3>
                <p className="text-gray-600 text-center leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Clinic Hours Banner */}
      <section className="py-16 px-6 bg-gradient-to-r from-blue-600 to-purple-700 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full border border-white/30 mb-6">
            <Clock className="h-5 w-5 mr-2" />
            <span className="font-semibold">Clinic Hours</span>
          </div>
          
          <h3 className="text-3xl sm:text-4xl font-bold mb-6">
            We're Here When You Need Us
          </h3>
          
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 max-w-2xl mx-auto border border-white/20">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-lg">
              <div className="text-center">
                <div className="font-bold text-2xl text-yellow-300">10:00 AM - 8:00 PM</div>
                <div className="text-blue-100">Monday to Saturday</div>
              </div>
              <div className="text-center">
                <div className="font-bold text-2xl text-yellow-300">Closed</div>
                <div className="text-blue-100">Sunday & Public Holidays</div>
              </div>
            </div>
            
            <div className="mt-6 pt-6 border-t border-white/20">
              <div className="flex items-center justify-center gap-4 text-blue-100">
                <Phone className="h-5 w-5" />
                <span>Emergency Contact: +1 (555) 123-HELP</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-12 shadow-2xl">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
              Ready to Take Care of Your Health?
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Book your appointment today and experience healthcare that puts you first
            </p>
            <Link 
              to="/our-doctors" 
              className="inline-flex items-center bg-white text-blue-700 font-bold px-12 py-4 rounded-2xl hover:bg-gray-100 hover:scale-105 transition-all duration-300 text-lg shadow-lg"
            >
              Get Started Now
              <ArrowRight className="ml-3 h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;