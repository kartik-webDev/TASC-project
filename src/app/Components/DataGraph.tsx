'use client'
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Star, AlertTriangle, Search, Target, TrendingUp, Users, Shield, Award } from 'lucide-react';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, Area, AreaChart } from 'recharts';

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
  const DataGraph =  () =>{
    return (
      <motion.div
            key="impact"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-7xl mx-auto px-8 mb-20"
          >
            <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-3xl p-12 shadow-xl border border-purple-200">
              <div className="flex items-center gap-4 mb-12">
                <div className="w-12 h-12 bg-gradient-to-r from-teal-500 to-blue-500 rounded-2xl flex items-center justify-center">
                  <Target className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-4xl font-bold text-teal-600">Meaningful Impact</h2>
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
                    className="bg-white rounded-2xl p-6 text-center shadow-lg border border-purple-800"
                  >
                    <stat.icon className="w-8 h-8 text-blue-500 mx-auto mb-3" />
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
             
            </div>
</motion.div>
    )
  }
export default DataGraph