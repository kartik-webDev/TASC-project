'use client';

import React, { useEffect, useRef } from 'react';
import { motion, useAnimation, useInView } from 'framer-motion';
import { Router } from 'next/router';
import Link from 'next/link';


// Types
interface FloatingElementProps {
  delay: number;
  size: number;
  position: { top?: string; bottom?: string; left?: string; right?: string };
}

interface LocationPinProps {
  color: 'red' | 'blue' | 'green' | 'yellow';
  position: { top?: string; bottom?: string; left?: string; right?: string };
  delay: number;
}

// Floating Circle Component
const FloatingCircle: React.FC<FloatingElementProps> = ({ delay, size, position }) => (
  <motion.div
    className="absolute rounded-full bg-white/10 pointer-events-none"
    style={{
      width: size,
      height: size,
      ...position,
    }}
    animate={{
      y: [-10, 10, -10],
      rotate: [0, 180, 360],
      opacity: [0.3, 0.7, 0.3],
    }}
    transition={{
      duration: 6,
      repeat: Infinity,
      ease: "easeInOut",
      delay,
    }}
  />
);

// Location Pin Component
const LocationPin: React.FC<LocationPinProps> = ({ color, position, delay }) => {
  const colorClasses = {
    red: 'bg-gradient-to-br from-red-400 to-red-600',
    blue: 'bg-gradient-to-br from-blue-400 to-blue-600',
    green: 'bg-gradient-to-br from-green-400 to-green-600',
    yellow: 'bg-gradient-to-br from-yellow-400 to-yellow-600',
  };

  return (
    <motion.div
      className={`absolute w-5 h-5 rounded-full ${colorClasses[color]} transform rotate-45`}
      style={{
        borderRadius: '50% 50% 50% 0',
        transform: 'rotate(-45deg)',
        ...position,
      }}
      animate={{
        scale: [1, 1.3, 1],
        rotate: [-45, -45, -45],
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut",
        delay,
      }}
    />
  );
};

// Car Component
const AnimatedCar: React.FC = () => (
  <motion.div
    className="absolute top-1/2 left-1/2 w-48 h-28"
    style={{ transform: 'translate(-50%, -50%)' }}
    animate={{
      x: [-10, 10, -10],
      y: [-5, 5, -5],
      scale: [1, 1.02, 1],
    }}
    transition={{
      duration: 4,
      repeat: Infinity,
      ease: "easeInOut",
    }}
  >
    {/* Car Body */}
    <div className="relative mx-auto w-40 h-20 bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-2xl shadow-2xl">
      {/* Car Top */}
      <div className="absolute -top-6 left-8 w-24 h-12 bg-gradient-to-br from-gray-700 to-gray-900 rounded-t-xl rounded-b-md" />
      
      {/* Car Windows */}
      <div className="absolute top-2 left-10 w-20 h-8 bg-gradient-to-br from-blue-200 to-blue-300 rounded-lg opacity-80" />
      
      {/* Headlights */}
      <div className="absolute top-6 -left-1 w-3 h-6 bg-white rounded-full shadow-lg" />
      <div className="absolute bottom-2 -left-1 w-3 h-6 bg-red-500 rounded-full shadow-lg" />
      
      {/* Wheels */}
      <motion.div
        className="absolute -bottom-3 left-4 w-6 h-6 bg-gradient-to-br from-gray-800 to-black rounded-full border-2 border-gray-600"
        animate={{ rotate: 360 }}
        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
      />
      <motion.div
        className="absolute -bottom-3 right-4 w-6 h-6 bg-gradient-to-br from-gray-800 to-black rounded-full border-2 border-gray-600"
        animate={{ rotate: 360 }}
        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
      />
    </div>
    
    {/* vehicle Sign */}
    <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 w-12 h-6 bg-yellow-300 rounded text-xs flex items-center justify-center font-bold text-black">
      Vehicle
    </div>
  </motion.div>
);

// Phone Component
const AnimatedPhone: React.FC = () => (
  <motion.div
    className="relative w-60 h-96 bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-3xl shadow-2xl"
    style={{
      transform: 'perspective(1000px) rotateY(-15deg) rotateX(5deg)',
      boxShadow: '0 25px 80px rgba(0,0,0,0.3), inset 0 2px 0 rgba(255,255,255,0.3)',
    }}
    animate={{
      y: [0, -10, 0],
    }}
    transition={{
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut",
    }}
  >
    {/* Phone Notch */}
    <div className="absolute top-4 left-1/2 transform -translate-x-1/2 w-16 h-1.5 bg-black/20 rounded-full" />
    
    {/* Screen */}
    <div className="absolute top-8 left-4 right-4 bottom-8 bg-gradient-to-br from-gray-900 to-black rounded-2xl overflow-hidden">
      {/* App Interface */}
      <div className="p-4 space-y-4">
        <div className="h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg" />
        <div className="space-y-2">
          <div className="h-4 bg-gray-700 rounded w-3/4" />
          <div className="h-4 bg-gray-700 rounded w-1/2" />
        </div>
      </div>
      
      {/* Map Area */}
      <div className="absolute bottom-4 left-4 right-4 h-32 bg-gradient-to-br from-green-400 to-blue-500 rounded-lg opacity-80" />
    </div>
    
    <AnimatedCar />
  </motion.div>
);

// Main Banner Component
const TASCBanner: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start('visible');
    }
  }, [isInView, controls]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };
  
  return (
    <section 
      ref={ref}
      className="relative min-h-screen overflow-hidden bg-gradient-to-br from-teal-600 via-blue-600 to-purple-600"
      style={{
        backgroundSize: '400% 400%',
        animation: 'gradientShift 8s ease infinite',
      }}
    >
      {/* CSS Animation Keyframes */}
      <style jsx>{`
        @keyframes gradientShift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        
        @keyframes titleGradient {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        
        .title-gradient {
          background: linear-gradient(45deg, #00c9ff, #92fe9d, #ffd700, #ff6b6b);
          background-size: 300% 300%;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: titleGradient 3s ease infinite;
        }
      `}</style>

      {/* Floating Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <FloatingCircle
          delay={0}
          size={60}
          position={{ top: '10%', left: '10%' }}
        />
        <FloatingCircle
          delay={2}
          size={40}
          position={{ top: '70%', right: '15%' }}
        />
        <FloatingCircle
          delay={4}
          size={80}
          position={{ bottom: '20%', left: '5%' }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
        <motion.div
          className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center min-h-screen py-12"
          variants={containerVariants}
          initial="hidden"
          animate={controls}
        >
          {/* Content Section */}
          <motion.div variants={itemVariants} className="text-white space-y-8">
            <motion.h1 
              className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight title-gradient"
              variants={itemVariants}
            >
              Thoda Aaram Se Chalaiye
            </motion.h1>
            
            <motion.p 
              className="text-lg sm:text-xl leading-relaxed text-white/90 max-w-2xl"
              variants={itemVariants}
            >
              TASC is a web application dedicated to prioritizing passenger safety, 
              comfort, and choice in ride services. The application empowers passengers 
              to provide comprehensive feedback on their ride experiences, which directly 
              impacts driver ratings. This passenger-centric approach aims to improve 
              overall ride quality and safety standards across the transportation ecosystem.
            </motion.p>
            
            <motion.div variants={itemVariants}>
              <Link href='/guidelines' >
              <motion.button
              
                className="group relative px-8 py-4 bg-gradient-to-r from-red-500 to-teal-500 text-white font-semibold text-lg rounded-full shadow-2xl transition-all duration-300 overflow-hidden"
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: '0 20px 40px rgba(0,0,0,0.4)'
                }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="relative z-10">Start Your Safe Journey</span>
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent"
                  initial={{ x: '-100%' }}
                  whileHover={{ x: '100%' }}
                  transition={{ duration: 0.5 }}
                />
              </motion.button>
              </Link>
            </motion.div>
          </motion.div>

          {/* Visual Section */}
          <motion.div 
            variants={itemVariants}
            className="relative flex justify-center items-center h-96 lg:h-[500px]"
          >
            <AnimatedPhone />
            
            {/* Location Pins */}
            <div className="absolute inset-0">
              <LocationPin 
                color="red" 
                position={{ top: '20%', right: '30%' }} 
                delay={0} 
              />
              <LocationPin 
                color="blue" 
                position={{ bottom: '30%', left: '20%' }} 
                delay={0.5} 
              />
              <LocationPin 
                color="green" 
                position={{ top: '60%', right: '10%' }} 
                delay={1} 
              />
              <LocationPin 
                color="yellow" 
                position={{ bottom: '15%', left: '45%' }} 
                delay={1.5} 
              />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default TASCBanner;