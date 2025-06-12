'use client'
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Star, AlertTriangle, Search, Target, TrendingUp, Users, Shield, Award } from 'lucide-react';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, Area, AreaChart } from 'recharts';

const WhyTASC: React.FC = () => {
  const [activeTab, setActiveTab] = useState('problems');

  // Sample data for charts
  const problemsData = [
    { name: 'Unsafe Driving', value: 35, color: '#ef4444' },
    { name: 'Poor Vehicle Condition', value: 25, color: '#f97316' },
    { name: 'Unprofessional Behavior', value: 20, color: '#eab308' },
    { name: 'Noise Issues', value: 15, color: '#a855f7' },
    { name: 'Route Manipulation', value: 5, color: '#ec4899' }
  ];

  const satisfactionData = [
    { platform: 'Traditional Platforms', before: 2.8, after: 2.9 },
    { platform: 'TASC-Enabled', before: 2.8, after: 4.6 }
  ];

  const impactData = [
    { month: 'Month 1', incidents: 45, resolved: 12 },
    { month: 'Month 2', incidents: 42, resolved: 28 },
    { month: 'Month 3', incidents: 35, resolved: 31 },
    { month: 'Month 4', incidents: 28, resolved: 26 },
    { month: 'Month 5', incidents: 20, resolved: 18 },
    { month: 'Month 6', incidents: 15, resolved: 14 }
  ];

  const flowSteps = [
    { id: 1, title: 'Issue Occurs', icon: '🚨', description: 'Passenger experiences a problem during ride' },
    { id: 2, title: 'Report via TASC', icon: '📱', description: 'Quick, detailed feedback with evidence' },
    { id: 3, title: 'Action Taken', icon: '⚡', description: 'Driver coaching or recognition' },
    { id: 4, title: 'Improvement', icon: '📈', description: 'Better service quality for everyone' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <div className="pt-20 pb-20">
        
        {/* Hero Section */}
        <div className="max-w-7xl mx-auto px-8 mb-20">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-6xl font-bold bg-gradient-to-r from-teal-600 to-blue-600 bg-clip-text text-transparent mb-6">
              Why TASC?
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Transforming ride experiences through intelligent feedback and community-driven accountability
            </p>
          </motion.div>
        </div>

        {/* Navigation Tabs */}
        <div className="max-w-7xl mx-auto px-8 mb-16">
          <div className="flex justify-center space-x-4 bg-white/70 backdrop-blur-sm rounded-2xl p-2 shadow-lg">
            {[
              { id: 'problems', label: 'The Problem', icon: AlertTriangle },
              { id: 'gap', label: 'The Gap', icon: Search },
              { id: 'solution', label: 'Our Solution', icon: CheckCircle },
              { id: 'impact', label: 'The Impact', icon: Target }
            ].map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setActiveTab(id)}
                className={`flex items-center gap-2 px-6 py-3 rounded-xl transition-all duration-300 ${
                  activeTab === id
                    ? 'bg-gradient-to-r from-teal-500 to-blue-500 text-white shadow-lg'
                    : 'text-gray-600 hover:bg-white/80'
                }`}
              >
                <Icon className="w-5 h-5" />
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Problems Section */}
        {activeTab === 'problems' && (
          <motion.div
            key="problems"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-7xl mx-auto px-8 mb-20"
          >
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              
              {/* Content */}
              <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-10 shadow-xl border border-red-200">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-12 h-12 bg-gradient-to-r from-red-500 to-pink-500 rounded-2xl flex items-center justify-center">
                    <AlertTriangle className="w-6 h-6 text-white" />
                  </div>
                  <h2 className="text-4xl font-bold text-red-600">The Problem</h2>
                </div>
                
                <p className="text-xl mb-8 text-gray-700 leading-relaxed">
                  Current ride services prioritize speed and pricing while overlooking passenger experience and safety.
                </p>

                <div className="space-y-4">
                  {[
                    { issue: "Unsafe driving practices", severity: "High", icon: "🚗" },
                    { issue: "Poor vehicle condition", severity: "Medium", icon: "🔧" },
                    { issue: "Unprofessional behavior", severity: "High", icon: "😤" },
                    { issue: "Noise discomfort", severity: "Medium", icon: "🔊" },
                    { issue: "Route manipulation", severity: "Low", icon: "🗺️" }
                  ].map((item, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center justify-between p-4 bg-gradient-to-r from-red-50 to-pink-50 rounded-xl border border-red-100"
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{item.icon}</span>
                        <span className="font-medium text-gray-800">{item.issue}</span>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                        item.severity === 'High' ? 'bg-red-100 text-red-700' :
                        item.severity === 'Medium' ? 'bg-yellow-100 text-yellow-700' :
                        'bg-gray-100 text-gray-700'
                      }`}>
                        {item.severity}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Chart */}
              <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl">
                <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">Problem Distribution</h3>
                <ResponsiveContainer width="100%" height={350}>
                  <PieChart>
                    <Pie
                      data={problemsData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={120}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {problemsData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value: any) => [`${value}%`, 'Percentage']} />
                  </PieChart>
                </ResponsiveContainer>
                <div className="flex flex-wrap justify-center gap-4 mt-4">
                  {problemsData.map((item, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                      <span className="text-sm text-gray-600">{item.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Gap Section */}
        {activeTab === 'gap' && (
          <motion.div
            key="gap"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-7xl mx-auto px-8 mb-20"
          >
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-12 shadow-xl border border-yellow-200">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-2xl flex items-center justify-center">
                  <Search className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-4xl font-bold text-yellow-600">The Gap</h2>
              </div>

              <div className="grid md:grid-cols-3 gap-8 mb-12">
                {[
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
                ].map((gap, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.2 }}
                    className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-2xl p-6 border border-yellow-200"
                  >
                    <div className="text-4xl mb-4">{gap.icon}</div>
                    <h3 className="text-xl font-bold text-gray-800 mb-3">{gap.title}</h3>
                    <p className="text-gray-600 mb-4">{gap.description}</p>
                    <ul className="space-y-2">
                      {gap.problems.map((problem, i) => (
                        <li key={i} className="flex items-center gap-2 text-sm text-gray-600">
                          <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                          {problem}
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                ))}
              </div>

              <div className="bg-gradient-to-r from-yellow-100 to-orange-100 rounded-2xl p-8 text-center">
                <h3 className="text-2xl font-bold text-gray-800 mb-4">The Result?</h3>
                <p className="text-xl text-gray-700">
                  Passengers feel disempowered, problems persist, and service quality stagnates
                </p>
              </div>
            </div>
          </motion.div>
        )}

        {/* Solution Section */}
        {activeTab === 'solution' && (
          <motion.div
            key="solution"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-7xl mx-auto px-8 mb-20"
          >
            <div className="grid lg:grid-cols-2 gap-12 items-start">
              
              {/* Content */}
              <div className="bg-gradient-to-br from-green-50 to-teal-50 rounded-3xl p-10 shadow-xl border border-green-200">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-teal-500 rounded-2xl flex items-center justify-center">
                    <CheckCircle className="w-6 h-6 text-white" />
                  </div>
                  <h2 className="text-4xl font-bold text-green-600">The TASC Solution</h2>
                </div>

                <p className="text-xl mb-8 text-gray-700 leading-relaxed">
                  TASC empowers passengers with detailed, actionable feedback mechanisms that create real change.
                </p>

                <div className="space-y-4 mb-8">
                  {[
                    "Detailed, categorized feedback system",
                    "Evidence attachment (photos, audio)",
                    "Real-time impact tracking",
                    "Community-driven accountability",
                    "Recognition for excellent drivers"
                  ].map((feature, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center gap-3 p-4 bg-white rounded-xl shadow-sm border border-green-100"
                    >
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                      <span className="text-gray-700 font-medium">{feature}</span>
                    </motion.div>
                  ))}
                </div>

                <div className="bg-gradient-to-r from-green-100 to-teal-100 rounded-2xl p-6">
                  <h3 className="text-lg font-bold text-gray-800 mb-2">Key Innovation</h3>
                  <p className="text-gray-700">
                    TASC transforms one-way complaints into a two-way dialogue that benefits both passengers and drivers.
                  </p>
                </div>
              </div>

              {/* Flow Chart */}
              <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl">
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
                        <div className="w-12 h-12 bg-gradient-to-r from-teal-500 to-blue-500 rounded-2xl flex items-center justify-center text-white font-bold shadow-lg">
                          {step.id}
                        </div>
                        <div className="flex-1">
                          <div className="bg-gradient-to-r from-teal-50 to-blue-50 rounded-xl p-4 border border-teal-200">
                            <div className="flex items-center gap-3 mb-2">
                              <span className="text-2xl">{step.icon}</span>
                              <h4 className="font-bold text-gray-800">{step.title}</h4>
                            </div>
                            <p className="text-gray-600 text-sm">{step.description}</p>
                          </div>
                        </div>
                      </div>
                      {index < flowSteps.length - 1 && (
                        <div className="w-0.5 h-6 bg-gradient-to-b from-teal-500 to-blue-500 ml-6 rounded-full"></div>
                      )}
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Impact Section */}
        {activeTab === 'impact' && (
          <motion.div
            key="impact"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-7xl mx-auto px-8 mb-20"
          >
            <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-3xl p-12 shadow-xl border border-purple-200">
              <div className="flex items-center gap-4 mb-12">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-blue-500 rounded-2xl flex items-center justify-center">
                  <Target className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-4xl font-bold text-purple-600">Meaningful Impact</h2>
              </div>

              {/* Stats Grid */}
              <div className="grid md:grid-cols-4 gap-6 mb-12">
                {[
                  { icon: Shield, label: "Safety Incidents", value: "67%", change: "Reduction" },
                  { icon: Users, label: "User Satisfaction", value: "4.6/5", change: "Average Rating" },
                  { icon: Award, label: "Driver Recognition", value: "2.3x", change: "Increase" },
                  { icon: TrendingUp, label: "Response Rate", value: "94%", change: "Issue Resolution" }
                ].map((stat, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white rounded-2xl p-6 text-center shadow-lg border border-purple-100"
                  >
                    <stat.icon className="w-8 h-8 text-purple-500 mx-auto mb-3" />
                    <div className="text-3xl font-bold text-gray-800 mb-1">{stat.value}</div>
                    <div className="text-sm text-gray-600 font-medium">{stat.change}</div>
                    <div className="text-xs text-gray-500 mt-1">{stat.label}</div>
                  </motion.div>
                ))}
              </div>

              {/* Charts Grid */}
              <div className="grid lg:grid-cols-2 gap-8">
                
                {/* Satisfaction Improvement */}
                <div className="bg-white rounded-2xl p-6 shadow-lg">
                  <h3 className="text-xl font-bold text-gray-800 mb-4">Satisfaction Improvement</h3>
                  <ResponsiveContainer width="100%" height={250}>
                    <BarChart data={satisfactionData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="platform" />
                      <YAxis domain={[0, 5]} />
                      <Tooltip />
                      <Bar dataKey="before" fill="#e5e7eb" name="Before" />
                      <Bar dataKey="after" fill="#8b5cf6" name="After" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>

                {/* Impact Timeline */}
                <div className="bg-white rounded-2xl p-6 shadow-lg">
                  <h3 className="text-xl font-bold text-gray-800 mb-4">Impact Over Time</h3>
                  <ResponsiveContainer width="100%" height={250}>
                    <AreaChart data={impactData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Area type="monotone" dataKey="incidents" stackId="1" stroke="#ef4444" fill="#fecaca" name="Incidents" />
                      <Area type="monotone" dataKey="resolved" stackId="2" stroke="#10b981" fill="#bbf7d0" name="Resolved" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Key Outcomes */}
              <div className="mt-12 grid md:grid-cols-2 gap-8">
                {[
                  {
                    title: "For Passengers",
                    outcomes: [
                      "Safer, more comfortable rides",
                      "Voice that creates real change",
                      "Transparent feedback process",
                      "Community-driven improvements"
                    ],
                    color: "blue"
                  },
                  {
                    title: "For Drivers",
                    outcomes: [
                      "Recognition for excellent service",
                      "Constructive feedback for improvement",
                      "Protected from false accusations",
                      "Career development opportunities"
                    ],
                    color: "green"
                  }
                ].map((section, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 + index * 0.2 }}
                    className={`bg-gradient-to-br ${
                      section.color === 'blue' ? 'from-blue-50 to-indigo-50 border-blue-200' : 'from-green-50 to-emerald-50 border-green-200'
                    } rounded-2xl p-6 border`}
                  >
                    <h3 className={`text-xl font-bold mb-4 ${
                      section.color === 'blue' ? 'text-blue-600' : 'text-green-600'
                    }`}>
                      {section.title}
                    </h3>
                    <div className="space-y-3">
                      {section.outcomes.map((outcome, i) => (
                        <div key={i} className="flex items-center gap-3">
                          <Star className={`w-4 h-4 ${
                            section.color === 'blue' ? 'text-blue-500' : 'text-green-500'
                          }`} />
                          <span className="text-gray-700">{outcome}</span>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default WhyTASC;