import React from 'react';
import { Heart, Award, Users, Clock, Shield, Star, MapPin, Phone, Mail } from 'lucide-react';

const About = () => {
  const stats = [
    { number: "10,000+", label: "Patients Treated", icon: Users },
    { number: "50+", label: "Expert Doctors", icon: Award },
    { number: "15+", label: "Medical Specialties", icon: Heart },
    { number: "98%", label: "Patient Satisfaction", icon: Star }
  ];

  const features = [
    {
      icon: Shield,
      title: "Trusted Healthcare",
      description: "Providing reliable medical care with proven expertise and cutting-edge technology."
    },
    {
      icon: Clock,
      title: "Convenient Timings",
      description: "Open Monday to Saturday from 10:00 AM to 8:00 PM for your healthcare needs."
    },
    {
      icon: Users,
      title: "Expert Team",
      description: "Highly qualified doctors and medical staff dedicated to your well-being."
    }
  ];

  const team = [
    {
      name: "Dr. Sarah Johnson",
      role: "Chief Medical Officer",
      specialization: "Cardiology",
      experience: "15+ years",
      image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150&h=150&fit=crop&crop=face"
    },
    {
      name: "Dr. Michael Chen",
      role: "Senior Surgeon",
      specialization: "Orthopedics",
      experience: "12+ years",
      image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=150&h=150&fit=crop&crop=face"
    },
    {
      name: "Dr. Priya Sharma",
      role: "Pediatric Specialist",
      specialization: "Pediatrics",
      experience: "10+ years",
      image: "https://images.unsplash.com/photo-1594824947933-d0501ba2fe65?w=150&h=150&fit=crop&crop=face"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 font-[Poppins]">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-600 to-blue-800 text-white py-24">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
            About <span className="text-yellow-300">MediCare</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto leading-relaxed">
            Your trusted partner in healthcare excellence. We combine cutting-edge technology 
            with compassionate care to deliver exceptional medical services.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <div className="bg-white/20 backdrop-blur-sm px-6 py-3 rounded-xl border border-white/30">
              <Clock className="w-5 h-5 inline mr-2" />
              <span className="font-semibold">Mon-Sat: 10:00 AM - 8:00 PM</span>
            </div>
            <div className="bg-yellow-500 text-blue-900 px-6 py-3 rounded-xl font-semibold">
              Emergency: 24/7 Available
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="bg-blue-100 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="w-8 h-8 text-blue-600" />
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">{stat.number}</div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                Our Mission & Vision
              </h2>
              <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                At MediCare, we are committed to providing accessible, high-quality healthcare 
                that puts patients first. Our mission is to transform lives through exceptional 
                medical care and innovative treatment approaches.
              </p>
              <p className="text-lg text-gray-700 mb-8 leading-relaxed">
                We envision a world where everyone has access to premium healthcare services 
                delivered with compassion, expertise, and the latest medical advancements.
              </p>
              <div className="flex flex-wrap gap-4">
                <div className="bg-green-100 text-green-800 px-4 py-2 rounded-full font-semibold">
                  Patient-Centered Care
                </div>
                <div className="bg-blue-100 text-blue-800 px-4 py-2 rounded-full font-semibold">
                  Medical Excellence
                </div>
                <div className="bg-purple-100 text-purple-800 px-4 py-2 rounded-full font-semibold">
                  Innovation Driven
                </div>
              </div>
            </div>
            <div className="bg-blue-600 rounded-2xl p-8 text-white">
              <h3 className="text-2xl font-bold mb-4">Why Choose Us?</h3>
              <ul className="space-y-4">
                <li className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                    <Heart className="w-4 h-4" />
                  </div>
                  <span>Compassionate and personalized care</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                    <Award className="w-4 h-4" />
                  </div>
                  <span>Board-certified medical professionals</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                    <Shield className="w-4 h-4" />
                  </div>
                  <span>State-of-the-art medical facilities</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                    <Clock className="w-4 h-4" />
                  </div>
                  <span>Flexible timing: 10:00 AM - 8:00 PM</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              What Makes Us Different
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              We go beyond traditional healthcare to provide comprehensive medical solutions
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8 text-center hover:shadow-lg transition-all">
                <div className="bg-blue-600 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">{feature.title}</h3>
                <p className="text-gray-700 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Meet Our Expert Team
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Our dedicated medical professionals are here to provide you with the best care
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <div key={index} className="bg-white rounded-2xl p-6 text-center shadow-lg hover:shadow-xl transition-all">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-24 h-24 rounded-full mx-auto mb-4 border-4 border-blue-100"
                />
                <h3 className="text-xl font-bold text-gray-900 mb-2">{member.name}</h3>
                <p className="text-blue-600 font-semibold mb-2">{member.role}</p>
                <p className="text-gray-600 mb-2">{member.specialization}</p>
                <p className="text-gray-500 text-sm">{member.experience} Experience</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Info */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-8">Get in Touch</h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="flex items-center justify-center gap-3">
              <MapPin className="w-6 h-6 text-yellow-300" />
              <div>
                <p className="font-semibold">Location</p>
                <p className="text-blue-100">Medical Center, Healthcare District</p>
              </div>
            </div>
            <div className="flex items-center justify-center gap-3">
              <Phone className="w-6 h-6 text-yellow-300" />
              <div>
                <p className="font-semibold">Emergency</p>
                <p className="text-blue-100">+1 (555) 123-HELP</p>
              </div>
            </div>
            <div className="flex items-center justify-center gap-3">
              <Mail className="w-6 h-6 text-yellow-300" />
              <div>
                <p className="font-semibold">Email</p>
                <p className="text-blue-100">care@medicare.com</p>
              </div>
            </div>
          </div>
          <div className="mt-12 bg-white/10 backdrop-blur-sm rounded-2xl p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold mb-4">Clinic Hours</h3>
            <div className="grid md:grid-cols-2 gap-6 text-lg">
              <div>
                <p className="font-semibold text-yellow-300">Monday - Saturday</p>
                <p>10:00 AM - 8:00 PM</p>
              </div>
              <div>
                <p className="font-semibold text-yellow-300">Sunday</p>
                <p>Emergency Only</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;