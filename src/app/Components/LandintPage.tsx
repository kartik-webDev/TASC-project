"use client"
import React, { useContext } from 'react'
import { AppContext } from '@/context/AppContext';
import GuidelinesPage from '../guidelines/page';
import {motion} from 'framer-motion'
import Image from 'next/image'
import { Shield, MessageSquare, TrendingUp, CheckCircle, StarIcon } from 'lucide-react';
const LandingPage = () => {


    const itemVariants = {
      hidden: { opacity: 0, y: 30 },
      visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.6, ease: "easeOut" }
      }
  }

    const context = useContext(AppContext);

    if(!context){
        throw new Error("Some context nedded")
    }

    const {router} =context

    const guideline = ()=>{
        router.push('/guidelines')
    }

    const ride =()=>{
        location.href='#ride'
    }

    const vehicleCon =()=>{
        location.href= '#vehicle-con'
    }

    const behavior =()=>{
        location.href = '#behavior'
    }

    const honk = ()=>{
        location.href = '#honk'
    }

  return (
  <div className='overflow-hidden flex flex-col space-y-10 mb-50'>
    <div className="relative w-full">
            {/* Text on top of the image */}
            <div className="absolute inset-0 flex flex-col justify-start items-start px-2 sm:px-4 md:px-6 lg:px-8 pt-2 sm:pt-4 md:pt-6 lg:pt-8 text-xs sm:text-sm md:text-base lg:text-lg">
                <h1 
                    className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold bg-gradient-to-r from-teal-600 via-blue-600 to-purple-600 bg-clip-text text-transparent leading-snug sm:leading-tight"
                >
                    Thoda Aaram Se
                    <br />
                    <span className="text-amber-500">Chalaiye</span>
                </h1>
                
                <p 
                    className="text-base sm:text-lg md:text-xl font-semibold bg-gradient-to-r from-teal-600 via-blue-600 to-purple-600 bg-clip-text text-transparent leading-relaxed max-w-sm sm:max-w-md md:max-w-2xl text-justify mt-3 sm:mt-4"
                >
                    TASC is a web application dedicated to prioritizing passenger safety, comfort, and choice in ride services. 
                    The application empowers passengers to provide comprehensive feedback on their ride experiences, which directly 
                    impacts driver ratings. This passenger-centric approach aims to improve overall ride quality and safety standards 
                    across the transportation ecosystem.
                </p>

                <motion.div className="space-y-6 sm:space-y-8 mt-4 sm:mt-6" variants={itemVariants}>
                    <motion.button 
                        onClick={guideline}
                        className="group bg-gradient-to-r from-teal-600 to-blue-600 text-white px-4 sm:px-6 md:px-8 py-2 sm:py-3 md:py-4 rounded-lg sm:rounded-xl md:rounded-2xl text-sm sm:text-base md:text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2 sm:gap-3"
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                        variants={itemVariants}
                    >
                        Explore Guidelines
                    </motion.button>
                </motion.div>
            </div>

            {/* Image as the background */}
            <Image 
                className="w-full h-auto object-cover" 
                src="/banner.jpg" 
                height={30} 
                width={2000} 
                alt="banner"
            />
        </div>


    {/* what tasc is  */}

    <section>
      <div className="max-w-6xl mx-auto px-8">
        <div className='text-center mb-16'>
          <h2 className='flex flex-col gap-5 text-5xl font-bold bg-gradient-to-r from-teal-600 to-blue-600 bg-clip-text text-transparent mb-6'>Welcome to TASC — Thoda Aaram Se Chalaiye</h2>
          <h3 className='text-4xl font-bold text-teal-800 mb-8'>What TASC is?</h3>
        </div>

        <div className='grid md:grid-cols-3 gap-8 px-10'>
          {[
            {
                icon: Shield,
                title: "Safety First",
                content: "TASC is a web platform built to prioritize passenger safety, comfort, and choice in everyday ride services. Whether it's a cab, auto, or shared ride, TASC empowers you—the passenger—to share honest feedback about your experience."
            },
            {
                icon: MessageSquare,
                title: "Your Voice Matters",
                content: "Through a quick feedback interface, TASC makes it easy for riders to report issues, appreciate good service, and help build a more respectful and reliable transportation ecosystem."
            },
            {
                icon: TrendingUp,
                title: "Better Together",
                content: "TASC is part of a movement to make rides safer, smoother, and more human—because your voice matters and directly impacts driver ratings and improves ride standards for everyone."
            }
          ].map((item, index)=> (
              <div
              key={index}
              className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100"
              >
                <div className='w-12 h-12 bg-gradient-to-r from-teal-500 to-blue-500 rounded-xl flex items-center justify-center mb-6'>
                  <item.icon className='w-6 h-- text-white' />
                </div>
                <h4 className='text-xl font-bold text-gray-800 mb-4'>{item.title}</h4>
                <p className='text-gray-600'>{item.content}</p>
              </div>
            ))
            
          }
        </div>
      </div>
    </section>
    



    
    <section>

   {/* why  tasc */}

      <div className='max-w-6xl mx-auto px-8 mt-15'>
        <h2 className="text-5xl font-bold text-teal-800 mb-4 text-center">Why TASC?</h2>

        <motion.div
            className="bg-white rounded-3xl p-10 shadow-lg border-l-4 border-red-500 mt-20"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: false }}
        >
            <h3 className="text-3xl font-semibold text-red-600 mb-6 flex items-center gap-3">
                <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center">
                    ⚠️
                </div>
                The Problem
            </h3>
            <p className="text-xl mb-6 text-gray-700">
                Ride services today often prioritize speed, pricing, or driver availability — but overlook the actual ride experience from the passenger's point of view.
            </p>
            <div className="grid md:grid-cols-2 gap-4">
                {[
                    "Unsafe driving practices (rash driving, phone use, ignoring traffic rules)",
                    "Poor vehicle condition (broken seats, bad smell, no seatbelts)",
                    "Unprofessional behavior (rudeness, inappropriate comments, pressure for tips)",
                    "Noise discomfort (honking, loud music, loud phone calls)",
                    "Route manipulation or overcharging"
                ].map((issue, index) => (
                    <motion.div
                        key={index}
                        className="flex items-start gap-3 p-3 bg-red-50 rounded-lg"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 0.4, delay: index * 0.1 }}
                        viewport={{ once: true }}
                    >
                        <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                        <p className="text-gray-700">{issue}</p>
                    </motion.div>
                ))}
            </div>
            <p className="text-xl mt-6 text-gray-700">
                These issues may seem "minor" individually — but collectively, they erode trust, dignity, and safety in everyday commuting.
            </p>
        </motion.div>
      </div>

    {/* the gap section */}
      
      <div className='max-w-6xl mx-auto px-8 mt-15'>

        <motion.div
            className="bg-white rounded-3xl p-10 shadow-lg border-l-4 border-yellow-600 mt-20"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: false }}
        >
            <h3 className="text-3xl font-semibold text-yellow-600 mb-6 flex items-center gap-3">
                <div className="w-8 h-8 bg-yellow-100 rounded-lg flex items-center justify-center">
                    🔍
                </div>
                The Gap
            </h3>
            <p className="text-xl mb-6 text-gray-700">
                Current ride platforms often offer limited or general feedback options that:
            </p>
            <div className="space-y-3">
                {[
                    "Don’t capture the specific issue",
                    "Don’t allow for evidence (photos, voice notes)",
                    "Don’t show real impact (passenger feedback goes into a void)",
            
                ].map((issue, index) => (
                    <motion.div
                        key={index}
                        className="flex items-start gap-3 p-3 bg-yellow-50 rounded-lg"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 0.4, delay: index * 0.1 }}
                        viewport={{ once: true }}
                    >
                        <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2 flex-shrink-0"></div>
                        <p className="text-gray-700">{issue}</p>
                    </motion.div>
                ))}
            </div>
            <p className="text-xl mt-6 text-gray-700">
                 As a result, passengers feel disempowered, and the system fails to correct repeat offenders or recognize great
          drivers.
            </p>
        </motion.div>
      </div>

    {/* the solution section */}

    <div className='max-w-6xl mx-auto px-8 mt-15'>

      <motion.div
        initial={{ opacity: 0, x: -30 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: false }}
       className='bg-gradient-to-r from-green-50 to-teal-50 rounded-3xl p-10 shadow-lg border-l-4 border-green-600'>

        <h3 className='text-3xl font-semibold mb-6 text-green-600 flex items-center gap-3'>
        <div className='w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center'>
            ✅
        </div>
        The TASC Solution
      </h3>
      <p className='text-xl mb-6 text-gray-700'>
        TASC flips the narrative:
      </p>
      <div className='space-y-3'>
        {[
          "It puts passengers first by enabling detailed, actionable feedback",
          "It gives every rider a voice that matter",
          "It allows both criticism and appreciation — creating a balanced ecosystem"
        ].map((solution, index)=> (
          <motion.div
          key={index}
          className='flex items-center gap-3 p-3 bg-white rounded-lg shadow-sm'
          initial={{ opacity:0 }}
          whileInView={{opacity:1}}
          transition={{duration:0.6, delay: index * 0.1}}
          viewport={{once: false}}
          >
              <CheckCircle className='w-5 h-5 text-green-500 flex shrink-0'/>
              <p className='text-gray-700'>{solution}.</p>
          </motion.div>
        ))}
      </div>

      </motion.div>
    </div>

    {/* the outcome section */}

    <div className='max-w-6xl mx-auto px-8 mt-15'>

      <motion.div
      initial={{ opacity: 0, x: -30 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: false }} 
      className='bg-gradient-to-r from-blue-50 to-purple-50 rounded-3xl p-10 shadow-lg border-l-4 border-purple-500'
      >
        <h3 className='text-3xl font-semibold text-purple-600 mb-6 flex items-center gap-3'>
          <div className='w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center'>
            🎯
          </div>
          Meaningful Outcome
        </h3>
        <div className='space-y-3'>

          {[
            "Unsafe drivers are flagged more quickly",
            "Great drivers are rewarded and encouraged",
            "Passenger communities gain power to influence service standards",
            "Data-driven improvements help ride companies improve training and maintenance"
          ].map((outcome, index)=> (
            <motion.div
            key={index}
            className="flex items-center gap-3 p-4 bg-white rounded-lg"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            viewport={{ once: true }}
            >
              <StarIcon className='w-5 h-5 text-purple-500 flex shrink-0'/>
              <p className='text-gray-700'>{outcome}</p>
            </motion.div>
          ))}

        </div>

      </motion.div>

    </div>

    </section>

    {/* how tasc works */}

    <section className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-8">
        <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
        >
            <h2 className="text-5xl font-bold text-teal-800 mb-8">How TASC Works?</h2>
        </motion.div>

        <div className="space-y-6">
            {[
                "After a ride, passengers can rate their experience and highlight safety concerns, vehicle conditions, driver behavior, and overall ride quality.",
                "Users can check the rating before choosing the driver, TASC help them to achieve comfort, secure and safe ride.",
                "Instead of just giving a star rating, users can provide detailed feedback, helping ride-hailing services identify issues more precisely.",
                "Feedback is aggregated and used to adjust driver scores, encouraging better driving practices and enhancing passenger trust.",
                "Passengers can report issues anonymously, ensuring safety and honest feedback without fear of repercussions."
            ].map((step, index) => (
                <motion.div
                    key={index}
                    className="flex items-start gap-6 p-6 bg-gradient-to-r from-gray-50 to-blue-50 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300"
                    initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    whileHover={{ scale: 1.02 }}
                >
                    <div className="w-10 h-10 bg-gradient-to-r from-teal-500 to-blue-500 text-white rounded-full flex items-center justify-center font-bold text-lg flex-shrink-0">
                        {index + 1}
                    </div>
                    <p className="text-lg text-gray-700 leading-relaxed">{step}</p>
                </motion.div>
              ))}
          </div>
      </div>
    </section>



    {/* guidelines */}

    <section className="py-20 bg-gradient-to-br from-teal-600 via-blue-600 to-purple-600">
      <div className="max-w-4xl mx-auto px-8 text-center">
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: false }}
        >
            <h2 className="text-4xl font-bold text-white mb-4">Passenger Guidelines</h2>
            <p className="text-xl text-white/90 mb-8">Here are the complete passenger guidelines</p>
            <motion.button 
                onClick={guideline}
                className="bg-white text-gray-800 px-10 py-4 rounded-2xl text-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:bg-gray-50 cursor-pointer"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.90 }}
            >
                View Guidelines
            </motion.button>
        </motion.div>
      </div>
    </section>

  </div>

  )
}

export default LandingPage