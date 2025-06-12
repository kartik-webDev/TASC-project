'use client'
import React from 'react';
import { useRouter } from 'next/navigation';
import { Shield, AlertTriangle, Car, UserCheck, MessageSquare, CheckCircle, XCircle, Eye, Phone, MapPin } from 'lucide-react';

const GuidelinesPage = () => {
  const router = useRouter();

  const feedbackBtn = () => {
    router.push('/feedback');
  };

  const guidelines = [
    {
      id: 1,
      title: "Getting Started with Your Ride",
      image: "https://orangecitycabs.com/wp-content/uploads/2024/04/airport_img_1.png",
      icon: <UserCheck className="w-8 h-8" />,
      color: "from-green-500 to-emerald-600",
      bgColor: "bg-green-50",
      points: [
        { icon: <Eye className="w-4 h-4" />, text: "Verify vehicle and driver details" },
        { icon: <UserCheck className="w-4 h-4" />, text: "Confirm your name before boarding" },
        { icon: <MapPin className="w-4 h-4" />, text: "Board from curbside safely" },
        { icon: <Shield className="w-4 h-4" />, text: "Always wear your seatbelt" },
        { icon: <CheckCircle className="w-4 h-4" />, text: "Rate your trip afterwards" }
      ]
    },
    {
      id: 2,
      title: "Identifying Unsafe Drivers",
      image: "https://gpscompany.ae/wp-content/uploads/2024/12/Driver-Behavior-Monitor-1024x1024.webp",
      icon: <AlertTriangle className="w-8 h-8" />,
      color: "from-red-500 to-rose-600",
      bgColor: "bg-red-50",
      points: [
        { icon: <XCircle className="w-4 h-4" />, text: "Rude or aggressive behavior" },
        { icon: <AlertTriangle className="w-4 h-4" />, text: "Signs of intoxication" },
        { icon: <UserCheck className="w-4 h-4" />, text: "Improper attire and hygiene" },
        { icon: <Car className="w-4 h-4" />, text: "Reckless driving practices" },
        { icon: <XCircle className="w-4 h-4" />, text: "Failure to follow protocols" }
      ]
    },
    {
      id: 3,
      title: "Recognizing Unmaintained Vehicles",
      image: "/man.jpg",
      icon: <Car className="w-8 h-8" />,
      color: "from-orange-500 to-amber-600",
      bgColor: "bg-orange-50",
      points: [
        { icon: <AlertTriangle className="w-4 h-4" />, text: "Cracked windshields or broken lights" },
        { icon: <Car className="w-4 h-4" />, text: "Unusual engine noises or smells" },
        { icon: <XCircle className="w-4 h-4" />, text: "Stained or torn interior" },
        { icon: <Shield className="w-4 h-4" />, text: "Missing safety features" },
        { icon: <AlertTriangle className="w-4 h-4" />, text: "Dashboard warning lights" }
      ]
    },
    {
      id: 4,
      title: "Making Safe Choices",
      image: "./indian_man.jpg",
      icon: <Shield className="w-8 h-8" />,
      color: "from-blue-500 to-indigo-600",
      bgColor: "bg-blue-50",
      points: [
        { icon: <XCircle className="w-4 h-4" />, text: "End ride if you feel unsafe" },
        { icon: <Phone className="w-4 h-4" />, text: "Use in-app safety tools" },
        { icon: <MapPin className="w-4 h-4" />, text: "Avoid isolated drop-offs at night" },
        { icon: <Shield className="w-4 h-4" />, text: "Don't share personal information" },
        { icon: <CheckCircle className="w-4 h-4" />, text: "Trust your instincts" }
      ]
    },
    {
      id: 5,
      title: "Reporting & Feedback",
      image: "/woman.jpeg",
      icon: <MessageSquare className="w-8 h-8" />,
      color: "from-purple-500 to-violet-600",
      bgColor: "bg-purple-50",
      points: [
        { icon: <AlertTriangle className="w-4 h-4" />, text: "Report unsafe behavior immediately" },
        { icon: <MessageSquare className="w-4 h-4" />, text: "Provide detailed feedback" },
        { icon: <CheckCircle className="w-4 h-4" />, text: "Follow up on serious incidents" },
        { icon: <Shield className="w-4 h-4" />, text: "Help protect future riders" },
        { icon: <Phone className="w-4 h-4" />, text: "Use app reporting features" }
      ]
    }
  ];

  const safetyStats = [
    { number: "99.9%", label: "Safe Rides", icon: <Shield className="w-6 h-6" /> },
    { number: "24/7", label: "Support", icon: <Phone className="w-6 h-6" /> },
    { number: "100%", label: "Verified Drivers", icon: <UserCheck className="w-6 h-6" /> },
    { number: "Easy-Use", label: "Easy To use", icon: <MapPin className="w-6 h-6" /> }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-10 -right-10 w-72 h-72 bg-gradient-to-br from-teal-200/30 to-blue-200/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-10 -left-10 w-96 h-96 bg-gradient-to-tr from-purple-200/30 to-pink-200/30 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-yellow-200/20 to-orange-200/20 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      <div className="relative z-10 px-6 py-12">
        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-teal-500 to-blue-600 rounded-2xl shadow-2xl mb-6 transform hover:scale-110 transition-all duration-300">
            <Shield className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-5xl font-bold bg-gradient-to-r from-teal-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent mb-4">
            Safety Guidelines
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Your comprehensive guide to safe, comfortable, and reliable ride experiences
          </p>
        </div>

        {/* Safety Stats */}
        <div className="max-w-4xl mx-auto mb-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {safetyStats.map((stat, index) => (
              <div key={index} className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 text-center shadow-lg border border-white/20 hover:shadow-xl transition-all duration-300">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-teal-500 to-blue-600 rounded-xl mb-3 text-white">
                  {stat.icon}
                </div>
                <div className="text-2xl font-bold text-gray-800 mb-1">{stat.number}</div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Feedback Button */}
        <div className="flex justify-center mb-16">
          <button 
            onClick={feedbackBtn} 
            className="group bg-gradient-to-r from-teal-600 to-blue-700 hover:from-teal-700 hover:to-blue-800 text-white text-xl px-10 py-5 rounded-2xl shadow-2xl transform hover:scale-105 transition-all duration-300 flex items-center gap-3"
          >
            <MessageSquare className="w-6 h-6 group-hover:rotate-12 transition-transform duration-300" />
            Share Your Feedback
          </button>
        </div>

        {/* Guidelines Cards */}
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {guidelines.map((guideline, index) => (
              <div 
                key={guideline.id}
                className={`group bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl hover:shadow-3xl transform hover:-translate-y-3 transition-all duration-500 overflow-hidden border border-white/30 ${
                  index === 2 ? 'lg:col-span-1 lg:mx-auto lg:max-w-sm' : ''
                }`}
                style={{
                  animationDelay: `${index * 0.1}s`
                }}
              >
                {/* Card Header */}
                <div className={`relative h-48 ${guideline.bgColor} overflow-hidden`}>
                  <img
                    src={guideline.image}
                    alt={guideline.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-t ${guideline.color} opacity-20 group-hover:opacity-30 transition-opacity duration-300`}></div>
                  
                  {/* Icon Overlay */}
                  <div className={`absolute top-4 right-4 w-14 h-14 bg-gradient-to-r ${guideline.color} rounded-2xl flex items-center justify-center text-white shadow-lg transform group-hover:scale-110 transition-all duration-300`}>
                    {guideline.icon}
                  </div>

                  {/* Card Number */}
                  <div className="absolute bottom-4 left-4 w-10 h-10 bg-white/90 rounded-full flex items-center justify-center font-bold text-gray-800 shadow-lg">
                    {guideline.id}
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-8">
                  <h3 className="text-xl font-bold text-gray-800 mb-6 text-center group-hover:text-teal-700 transition-colors duration-300">
                    {guideline.title}
                  </h3>
                  
                  <ul className="space-y-4">
                    {guideline.points.map((point, pointIndex) => (
                      <li key={pointIndex} className="flex items-start group/item">
                        <div className={`w-8 h-8 bg-gradient-to-r ${guideline.color} rounded-lg flex items-center justify-center text-white mr-3 flex-shrink-0 group-hover/item:scale-110 transition-transform duration-200`}>
                          {point.icon}
                        </div>
                        <span className="text-gray-700 text-sm leading-relaxed group-hover/item:text-gray-900 transition-colors duration-200">
                          {point.text}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Card Footer */}
                <div className="px-8 pb-8">
                  <div className={`w-full h-2 bg-gradient-to-r ${guideline.color} rounded-full shadow-inner`}></div>
                </div>
              </div>
            ))}
          </div>
        </div>


        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl p-10 max-w-3xl mx-auto border border-white/30">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-teal-500 to-blue-600 rounded-2xl mb-6">
              <Shield className="w-8 h-8 text-white" />
            </div>
            <h4 className="text-3xl font-bold bg-gradient-to-r from-teal-600 to-blue-600 bg-clip-text text-transparent mb-4">
              Stay Safe, Stay Informed
            </h4>
            <p className="text-gray-600 text-lg mb-8 leading-relaxed">
              Your safety is our highest priority. Always trust your instincts and don't hesitate to report any concerns.
            </p>
            <button 
              onClick={feedbackBtn}
              className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white px-8 py-4 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-3 mx-auto"
            >
              <AlertTriangle className="w-5 h-5" />
              Report an Issue
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GuidelinesPage;