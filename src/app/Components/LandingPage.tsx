'use client'
import React, { useState } from 'react';
import { 
  Target, Calendar, Cog, ArrowRight, CheckCircle, Users, 
  BarChart3, Camera,MessageSquare,Shield, Car ,Eye, TrendingUp,
  Award, ChevronRight
} from 'lucide-react';
import Image from 'next/image';

import {motion} from "framer-motion"
import Link from 'next/link';

export default function RideFeedbackHomepage() {


    const [activeFeature, setActiveFeature] = useState(0);
  
    const features = [
      {
        title: "Real-Time Feedback System",
        description: "Comprehensive feedback collection with detailed categories and evidence attachment",
        icon: <CheckCircle className="w-8 h-8" />,
        image: "/pass_feed.jpg"
      },
      {
        title: "Driver Accountability",
        description: "Track driver performance and maintain service quality standards",
        icon: <Users className="w-8 h-8" />,
        image: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=400&h=300&fit=crop"
      },
      {
        title: "Safety First",
        description: "Enhanced safety protocols with incident reporting and prevention",
        icon: <Shield className="w-8 h-8" />,
        image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=400&h=300&fit=crop"
      }
    ];
  

  const problems = [
    {
      title: "Limited Feedback",
      description: "Generic rating systems don't capture specific issues",
      icon: "📊",
      problems: ["1-5 star ratings only", "No detailed categories", "No context provided"]
    },
    {
      title: "No Evidence",
      description: "Unable to attach photos or voice recordings",
      icon: "📷",
      problems: ["Claims can't be verified", "He-said-she-said disputes", "No visual proof"]
    },
    {
      title: "Feedback Void",
      description: "Passenger complaints disappear without action",
      icon: "🕳️",
      problems: ["No follow-up", "No visible impact", "Repeated offenders persist"]
    }
  ];

  const solutions = [
    "Detailed, categorized feedback system",
    "Evidence attachment (photos)",
    "Community-driven accountability",
    "Recognition for excellent drivers"
  ];

    const flowSteps = [
    { id: 1, title: 'Issue Occurs', icon: '🚨', description: 'Passenger experiences a problem during ride' },
    { id: 2, title: 'Report via TASC', icon: '📱', description: 'Quick, detailed feedback with evidence' },
    { id: 3, title: 'Action Taken', icon: '⚡', description: 'Driver coaching or recognition' },
    { id: 4, title: 'Improvement', icon: '📈', description: 'Better service quality for everyone' }
  ];
  return (
    <div className="min-h-screen bg-white">
     

      {/* Hero Section */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Transform Ride Feedback
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              TASC provides comprehensive feedback systems for ride-sharing platforms, ensuring accountability, safety, and quality service for both drivers and passengers.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">

              <Link href='/feedback'>
              <button className="bg-gray-900 text-white px-8 py-4 rounded-md text-lg font-medium hover:bg-gray-800 transition-colors flex items-center justify-center">
                Start Rating Rides
                <ArrowRight className="ml-2 h-5 w-5" />
              </button>
              </Link>
          
            </div>
          </div>
        </div>
      </section>


      <div className="text-center mb-16 mt-16">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Platform Overview</h2>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          TASC addresses critical gaps in current ride-sharing feedback systems through innovative evidence collection and transparent accountability measures.
        </p>
      </div>

      

      <section id="features" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Key Features</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Comprehensive solutions designed to improve transportation service quality and user experience
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              {features.map((feature, index) => (
                <div 
                  key={index}
                  className={`p-6 rounded-lg border-2 transition-all cursor-pointer ${
                    activeFeature === index 
                      ? 'border-gray-900 bg-white shadow-lg' 
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                  onClick={() => setActiveFeature(index)}
                >
                  <div className="flex items-start space-x-4">
                    <div className={`p-2 rounded-lg ${
                      activeFeature === index ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-600'
                    }`}>
                      {feature.icon}
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
                      <p className="text-gray-600">{feature.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="relative">
              <img 
                src={features[activeFeature].image} 
                alt={features[activeFeature].title}
                className="rounded-lg shadow-xl w-full h-96 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-lg"></div>
            </div>
          </div>
        </div>
      </section>



      {/* passenger and how tasc works */}

       <section className="w-full px-6 py-16 bg-white">
        <div className="max-w-6xl mx-auto flex flex-col gap-24">

          {/* passenger feedback image */}
          <div className="flex flex-col lg:flex-row-reverse items-stretch gap-10">
            <div className="w-full lg:w-1/2 flex justify-center items-center">
              <Image
                src="/pass_feed.jpg"
                alt="Passenger Feedback"
                width={370}
                height={370}
                className="w-full max-w-md lg:max-w-sm h-auto border-b-4 border-r-8 border-amber-600 rounded-2xl"
              />
            </div>
            <div className="w-full lg:w-1/2 flex flex-col justify-center lg:items-start text-center lg:text-left">
              <h3 className="text-4xl lg:text-6xl font-bold mb-6 text-gray-900">
                Passenger Feedback System
              </h3>
              <p className="text-lg lg:text-2xl text-gray-700 leading-relaxed mb-6">
                TASC gives passengers a voice that matters. Riders can share honest feedback based on their ride experience — easily and expressively.
              </p>

              <Link href='/feedback'>
                <div className="flex items-center gap-2 text-blue-600 hover:text-blue-800 cursor-pointer text-lg lg:text-xl font-semibold">
                  <span>Know More</span>
                  <ChevronRight size={24} />
                </div>
              </Link>
            </div>
          </div>

          {/* how it works image */}
          <div className="flex flex-col lg:flex-row items-stretch lg:gap-50 gap-10">
            <div className="w-full lg:w-1/2 flex justify-center items-center">
              <Image
                src="/how_it_works.png"
                alt="how-it-works"
                width={370}
                height={370}
                className="w-full max-w-md lg:max-w-sm h-auto"
              />
            </div>
            <div className="w-full lg:w-1/2 flex flex-col justify-center lg:items-start text-center lg:text-left">
              <h3 className="text-4xl lg:text-6xl font-bold mb-6 text-gray-900">
                How <br /> TASC Works
              </h3>
              <p className="text-lg lg:text-2xl text-gray-700 leading-relaxed mb-6">
                TASC transforms feedback into a delightful journey — users share thoughts, upload visuals, and interact with intuitive UI.
              </p>
              <Link href='#how'>
                <div className="flex items-center gap-2 text-blue-600 hover:text-blue-800 cursor-pointer text-lg lg:text-xl font-semibold">
                  <span>Know More</span>
                  <ChevronRight size={24} />
                </div>
              </Link>
            </div>
          </div>

        </div>
      </section>

      {/* Why Section */}
      <section id="why" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center mb-6">
                <Target className="w-8 h-8 text-gray-900 mr-3" />
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Why TASC?</h2>
              </div>
              <div className="space-y-6">
                <div className="bg-white rounded-lg p-6 border border-gray-200">
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">Transportation Accountability Crisis</h3>
                  <p className="text-gray-600">
                    Current ride-sharing platforms rely on simplistic rating systems that fail to capture specific safety, comfort, and service issues. Passengers have no way to provide detailed feedback or evidence of problems.
                  </p>
                </div>
                
                <div className="bg-white rounded-lg p-6 border border-gray-200">
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">Evidence-Based Safety</h3>
                  <p className="text-gray-600">
                    Without proper documentation capabilities, passenger complaints become "he-said-she-said" disputes. Photo and audio evidence collection ensures transparency and helps verify legitimate concerns about driver behavior or vehicle conditions.
                  </p>
                </div>
                
                <div className="bg-white rounded-lg p-6 border border-gray-200">
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">Community-Driven Transportation Quality</h3>
                  <p className="text-gray-600">
                    By creating a transparent feedback ecosystem, excellent drivers receive recognition while problematic behavior is addressed. This builds trust and improves overall transportation quality for everyone.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="lg:pl-8">
              <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200">
                <div className="space-y-6">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                      <Car className="w-6 h-6 text-gray-700" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Driver Performance Tracking</h4>
                      <p className="text-sm text-gray-600">Real-time analytics for driving quality and passenger satisfaction</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                      <Camera className="w-6 h-6 text-gray-700" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Trip Evidence Collection</h4>
                      <p className="text-sm text-gray-600">Photo and audio documentation of ride conditions</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                      <Shield className="w-6 h-6 text-gray-700" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Passenger Safety Network</h4>
                      <p className="text-sm text-gray-600">Community-driven safety reporting and verification</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* When Section */}
      <section id="when" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center mb-6">
              <Calendar className="w-8 h-8 text-gray-900 mr-3" />
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900">When to Use TASC</h2>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20">
            
            {/* Use Cases */}
            <div className="flex flex-col justify-center">
              <h3 className="text-2xl font-bold text-gray-900 mb-8">Perfect Use Cases</h3>
              <div className="space-y-6">
                <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                  <div className="flex items-center mb-3">
                    <Eye className="w-5 h-5 text-gray-700 mr-2" />
                    <h4 className="font-semibold text-gray-900">Safety Concerns</h4>
                  </div>
                  <p className="text-gray-600 text-sm">
                    When you need to document unsafe driving, vehicle conditions, or inappropriate behavior with evidence
                  </p>
                </div>

                <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                  <div className="flex items-center mb-3">
                    <Award className="w-5 h-5 text-gray-700 mr-2" />
                    <h4 className="font-semibold text-gray-900">Exceptional Service</h4>
                  </div>
                  <p className="text-gray-600 text-sm">
                    When drivers go above and beyond, providing detailed recognition and specific examples of excellence
                  </p>
                </div>

                <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                  <div className="flex items-center mb-3">
                    <TrendingUp className="w-5 h-5 text-gray-700 mr-2" />
                    <h4 className="font-semibold text-gray-900">Service Quality Issues</h4>
                  </div>
                  <p className="text-gray-600 text-sm">
                    When standard ratings don't capture specific issues like vehicle cleanliness, navigation problems, or communication barriers
                  </p>
                </div>
              </div>
            </div>

            {/* Right Side Image */}
            <div className="flex justify-center items-center">
              <Image
                src="/use_cases.png"
                alt="Tasc use cases"
                width={345}
                height={200}
                className="rounded-xl w-full max-w-sm object-contain"
              />
            </div>
          </div>
        </div>
      </section>

      {/* How Section */}
      <section id="how" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center mb-6">
              <Cog className="w-8 h-8 text-gray-900 mr-3" />
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900">How It Works</h2>
            </div>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              A comprehensive approach combining mobile technology, community verification, and transportation industry partnerships.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8 mb-16">
            <div className="bg-white rounded-lg p-8 border border-gray-200">
              <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mb-6">
                <Camera className="w-6 h-6 text-gray-700" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Trip Evidence Collection</h3>
              <p className="text-gray-600 mb-4">
                Passengers can document their ride experience with photos of vehicle conditions, audio recordings of interactions, and location-verified evidence.
              </p>
              <ul className="text-sm text-gray-500 space-y-2">
                <li>• Vehicle interior/exterior photos</li>
                <li>• Audio recording of interactions</li>
                <li>• GPS-verified trip documentation</li>
                <li>• Time-stamped evidence collection</li>
              </ul>
            </div>
            
            <div className="bg-white rounded-lg p-8 border border-gray-200">
              <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mb-6">
                <MessageSquare className="w-6 h-6 text-gray-700" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Detailed Feedback Categories</h3>
              <p className="text-gray-600 mb-4">
                Multi-dimensional rating system covering safety, comfort, communication, vehicle condition, and navigation skills with specific contextual feedback.
              </p>
              <ul className="text-sm text-gray-500 space-y-2">
                <li>• Safety and driving behavior</li>
                <li>• Vehicle cleanliness and comfort</li>
                <li>• Communication and professionalism</li>
                <li>• Navigation and route efficiency</li>
              </ul>
            </div>
            
            <div className="bg-white rounded-lg p-8 border border-gray-200">
              <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mb-6">
                <BarChart3 className="w-6 h-6 text-gray-700" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Community Impact Tracking</h3>
              <p className="text-gray-600 mb-4">
                Real-time dashboard showing how feedback leads to concrete improvements, driver recognition, and overall transportation quality enhancement.
              </p>
              <ul className="text-sm text-gray-500 space-y-2">
                <li>• Driver improvement metrics</li>
                <li>• Community safety scores</li>
                <li>• Feedback resolution tracking</li>
                <li>• Excellence recognition system</li>
              </ul>
            </div>
          </div>

          {/* <div className="bg-white rounded-2xl p-8 border border-gray-200">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Platform Implementation</h3>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h4 className="text-lg font-semibold text-gray-900 mb-4">Mobile App Features</h4>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-gray-600">Real-time ride tracking and evidence collection interface</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-gray-600">One-tap photo/audio evidence submission with automatic metadata</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-gray-600">Detailed feedback forms with category-specific questions</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-gray-600">Driver recognition and appreciation features</p>
                  </div>
                </div>
              </div>
              
              <div>
                <h4 className="text-lg font-semibold text-gray-900 mb-4">Community & Verification</h4>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-gray-600">Peer verification system for feedback authenticity</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-gray-600">Public driver profiles with verified feedback history</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-gray-600">Anonymous reporting with privacy protection</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-gray-600">Integration with existing ride-sharing platforms</p>
                  </div>
                </div>
              </div>
            </div>
          </div> */}
        </div>
      </section>

      {/* how tasc work a proper work flow */}

      <div className="w-full bg-gray-50 px-6 py-16  flex justify-center ">
        <div className="w-full max-w-7xl bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-2xl border border-gray-300">
          <h3 className="text-2xl font-bold text-gray-800 mb-8 text-center">TASC Process Flow</h3>
          
          <div className="space-y-6">
            {flowSteps.map((step, index) => (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.2 }}
                className="relative"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-sky-500 to-indigo-500 rounded-2xl flex items-center justify-center text-white font-bold shadow-lg">
                    {step.id}
                  </div>
                  <div className="flex-1">
                    <div className="bg-gradient-to-r from-sky-50 to-indigo-50 rounded-xl p-4 border border-sky-200">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-2xl">{step.icon}</span>
                        <h4 className="font-bold text-gray-800">{step.title}</h4>
                      </div>
                      <p className="text-gray-600 text-sm">{step.description}</p>
                    </div>
                  </div>
                </div>
                {index < flowSteps.length - 1 && (
                  <div className="w-0.5 h-6 bg-gradient-to-b from-sky-500 to-indigo-500 ml-6 rounded-full"></div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      
            {/* Project Overview */}
      <section id="overview" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">


          {/* Current Problems */}
          <div className="mb-16">
            <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">Current Problems in Ride Feedback</h3>
            <div className="grid md:grid-cols-3 gap-8">
              {problems.map((problem, index) => (
                <div key={index} className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                  <div className="text-4xl mb-4">{problem.icon}</div>
                  <h4 className="text-xl font-semibold text-gray-900 mb-2">{problem.title}</h4>
                  <p className="text-gray-600 mb-4">{problem.description}</p>
                  <ul className="space-y-2">
                    {problem.problems.map((item, idx) => (
                      <li key={idx} className="text-sm text-gray-500 flex items-center">
                        <div className="w-2 h-2 bg-gray-400 rounded-full mr-3"></div>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Our Solutions */}
          <div className="bg-gray-900 rounded-2xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-6 text-center">Our Transportation Solutions</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {solutions.map((solution, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <CheckCircle className="w-6 h-6 text-green-400 flex-shrink-0" />
                  <span className="text-gray-100">{solution}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>


   
    </div>
  );
}