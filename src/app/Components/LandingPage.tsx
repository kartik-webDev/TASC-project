"use client"
import React, {  useEffect } from 'react'
import  {useAppContext } from '@/context/AppContext';
import {motion} from 'framer-motion'
import Image from 'next/image'
import { Shield, MessageSquare, TrendingUp, CheckCircle, StarIcon } from 'lucide-react';
import { JSX } from "react";
import TASCBanner from './TascBanner';
import SafteyNav from './SafteyNav';
import WhyTASC from './WhyTasc';
import FlowChart from './FlowChart';
import DataGraph from './DataGraph';

  interface ImageData {
    src: string,
    alt: string,
    jsxType: string
  }
  
  // why tasc component

  // const WhyTASC: React.FC = ()=> <div>
  //       <div className='mt-60 mb-30'>

  //         <div className='max-w-6xl mx-auto px-8 md:mt-45 mt-15'>
  //           <h2 className="text-5xl font-bold text-teal-800 mb-4 text-center">Why TASC?</h2>

  //           <motion.div
  //               className="bg-white rounded-3xl p-10 shadow-lg border-l-4 border-red-500 mt-20"
  //               initial={{ opacity: 0, x: -30 }}
  //               whileInView={{ opacity: 1, x: 0 }}
  //               transition={{ duration: 0.6 }}
  //               viewport={{ once: false }}
  //           >
  //               <h3 className="text-3xl font-semibold text-red-600 mb-6 flex items-center gap-3">
  //                   <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center">
  //                       ⚠️
  //                   </div>
  //                   The Problem
  //               </h3>
  //               <p className="text-xl mb-6 text-gray-700">
  //                   Ride services today often prioritize speed, pricing, or driver availability — but overlook the actual ride experience from the passenger's point of view.
  //               </p>
  //               <div className="grid md:grid-cols-2 gap-4">
  //                   {[
  //                       "Unsafe driving practices (rash driving, phone use, ignoring traffic rules)",
  //                       "Poor vehicle condition (broken seats, bad smell, no seatbelts)",
  //                       "Unprofessional behavior (rudeness, inappropriate comments, pressure for tips)",
  //                       "Noise discomfort (honking, loud music, loud phone calls)",
  //                       "Route manipulation or overcharging"
  //                   ].map((issue, index) => (
  //                       <motion.div
  //                           key={index}
  //                           className="flex items-start gap-3 p-3 bg-red-50 rounded-lg"
  //                           initial={{ opacity: 0 }}
  //                           whileInView={{ opacity: 1 }}
  //                           transition={{ duration: 0.4, delay: index * 0.1 }}
  //                           viewport={{ once: true }}
  //                       >
  //                           <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
  //                           <p className="text-gray-700">{issue}</p>
  //                       </motion.div>
  //                   ))}
  //               </div>
  //               <p className="text-xl mt-6 text-gray-700">
  //                   These issues may seem "minor" individually — but collectively, they erode trust, dignity, and safety in everyday commuting.
  //               </p>
  //           </motion.div>
  //         </div>
         
  //       {/* the gap section */}
          
  //         <div className='max-w-6xl mx-auto px-8 md:mt-45 mt-15'>

  //           <motion.div
  //               className="bg-white rounded-3xl p-10 shadow-lg border-l-4 border-yellow-600 mt-20"
  //               initial={{ opacity: 0, x: -30 }}
  //               whileInView={{ opacity: 1, x: 0 }}
  //               transition={{ duration: 0.6 }}
  //               viewport={{ once: false }}
  //           >
  //               <h3 className="text-3xl font-semibold text-yellow-600 mb-6 flex items-center gap-3">
  //                   <div className="w-8 h-8 bg-yellow-100 rounded-lg flex items-center justify-center">
  //                       🔍
  //                   </div>
  //                   The Gap
  //               </h3>
  //               <p className="text-xl mb-6 text-gray-700">
  //                   Current ride platforms often offer limited or general feedback options that:
  //               </p>
  //               <div className="space-y-3">
  //                   {[
  //                       "Don’t capture the specific issue",
  //                       "Don’t allow for evidence (photos, voice notes)",
  //                       "Don’t show real impact (passenger feedback goes into a void)",
                
  //                   ].map((issue, index) => (
  //                       <motion.div
  //                           key={index}
  //                           className="flex items-start gap-3 p-3 bg-yellow-50 rounded-lg"
  //                           initial={{ opacity: 0 }}
  //                           whileInView={{ opacity: 1 }}
  //                           transition={{ duration: 0.4, delay: index * 0.1 }}
  //                           viewport={{ once: true }}
  //                       >
  //                           <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2 flex-shrink-0"></div>
  //                           <p className="text-gray-700">{issue}</p>
  //                       </motion.div>
  //                   ))}
  //               </div>
  //               <p className="text-xl mt-6 text-gray-700">
  //                   As a result, passengers feel disempowered, and the system fails to correct repeat offenders or recognize great
  //             drivers.
  //               </p>
  //           </motion.div>
  //         </div>

  //       {/* the solution section */}

  //       <div className='max-w-6xl mx-auto px-8 md:mt-45 mt-15'>

  //         <motion.div
  //           initial={{ opacity: 0, x: -30 }}
  //           whileInView={{ opacity: 1, x: 0 }}
  //           transition={{ duration: 0.6 }}
  //           viewport={{ once: false }}
  //         className='bg-gradient-to-r from-green-50 to-teal-50 rounded-3xl p-10 shadow-lg border-l-4 border-green-600'>

  //           <h3 className='text-3xl font-semibold mb-6 text-green-600 flex items-center gap-3'>
  //           <div className='w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center'>
  //               ✅
  //           </div>
  //           The TASC Solution
  //         </h3>
  //         <p className='text-xl mb-6 text-gray-700'>
  //           TASC flips the narrative:
  //         </p>
  //         <div className='space-y-3'>
  //           {[
  //             "It puts passengers first by enabling detailed, actionable feedback",
  //             "It gives every rider a voice that matter",
  //             "It allows both criticism and appreciation — creating a balanced ecosystem"
  //           ].map((solution, index)=> (
  //             <motion.div
  //             key={index}
  //             className='flex items-center gap-3 p-3 bg-white rounded-lg shadow-sm'
  //             initial={{ opacity:0 }}
  //             whileInView={{opacity:1}}
  //             transition={{duration:0.6, delay: index * 0.1}}
  //             viewport={{once: false}}
  //             >
  //                 <CheckCircle className='w-5 h-5 text-green-500 flex shrink-0'/>
  //                 <p className='text-gray-700'>{solution}.</p>
  //             </motion.div>
  //           ))}
  //         </div>

  //         </motion.div>
  //       </div>

  //       {/* the outcome section */}

  //       <div className='max-w-6xl mx-auto px-8 md:mt-45 mt-15'>

  //         <motion.div
  //         initial={{ opacity: 0, x: -30 }}
  //         whileInView={{ opacity: 1, x: 0 }}
  //         transition={{ duration: 0.6 }}
  //         viewport={{ once: false }} 
  //         className='bg-gradient-to-r from-blue-50 to-purple-50 rounded-3xl p-10 shadow-lg border-l-4 border-purple-500'
  //         >
  //           <h3 className='text-3xl font-semibold text-purple-600 mb-6 flex items-center gap-3'>
  //             <div className='w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center'>
  //               🎯
  //             </div>
  //             Meaningful Outcome
  //           </h3>
  //           <div className='space-y-3'>

  //             {[
  //               "Unsafe drivers are flagged more quickly",
  //               "Great drivers are rewarded and encouraged",
  //               "Passenger communities gain power to influence service standards",
  //               "Data-driven improvements help ride companies improve training and maintenance"
  //             ].map((outcome, index)=> (
  //               <motion.div
  //               key={index}
  //               className="flex items-center gap-3 p-4 bg-white rounded-lg"
  //               initial={{ opacity: 0 }}
  //               whileInView={{ opacity: 1 }}
  //               transition={{ duration: 0.6, delay: index * 0.1 }}
  //               viewport={{ once: true }}
  //               >
  //                 <StarIcon className='w-5 h-5 text-purple-500 flex shrink-0'/>
  //                 <p className='text-gray-700'>{outcome}</p>
  //               </motion.div>
  //             ))}

  //           </div>

  //         </motion.div>

  //       </div>
  //       </div>
  // </div>


  // how tasc component

  const HowTASC: React.FC = ()=> (
    <div>

      <section className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-8">
        <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
        >
            <h2 className="text-3xl md:text-5xl font-bold text-teal-800 mb-8">How TASC Works?</h2>
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

    </div>
  )


    // jsx component mapping

    const componentMap: { [key: string]: JSX.Element } ={
      WhyTASC: <WhyTASC/>,
      HowTASC : <HowTASC />
    }


  const images : ImageData [] = [
    {src: '/saftey.png', alt: "saftey", jsxType: "WhyTASC" },
    { src: '/how_tasc.png', alt: "how", jsxType: "HowTASC" },
  ]

const LandingPage: React.FC = () => {

const {router, setSelectedImage, selectedImage} = useAppContext();


// make sure always scolled to top whenever state changes....
  useEffect(() => {
    return () => {
      window.scrollTo(0,0)
    };
  }, [selectedImage])


    const itemVariants = {
      hidden: { opacity: 0, y: 30 },
      visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.6, ease: "easeOut" }
      }
  }



    const guideline = ()=>{
        router.push('/guidelines')
    }

  return (

    <div>
      
        {/* saftey nav bar  */}

        <SafteyNav />

        {! selectedImage ? (<div className='overflow-hidden space-y-10 mt-15 md:mt-36'>


                {/* main banner component */}

                <TASCBanner/>

              {/* what TASC is card section */}

              <section>
                <div className="max-w-6xl mx-auto px-8">
                  <div className='text-center mb-16'>
                    <h2 className='flex flex-col gap-5 text-2xl md:text-5xl font-bold bg-gradient-to-r from-teal-600 to-blue-600 bg-clip-text text-transparent mb-6'>Welcome to TASC — Thoda Aaram Se Chalaiye</h2>
                    <h3 className='text-2xl md:text-4xl font-bold text-teal-800 mb-8'>What TASC is?</h3>
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
                        className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl shadow-black/50 transition-all duration-300 border border-gray-100"
                        >
                          <div className='w-12 h-12 bg-gradient-to-r from-teal-500 to-blue-500 rounded-xl flex items-center justify-center mb-6'>
                            <item.icon className='w-6 h-- text-white' />
                          </div>
                          <h4 className='text-xl font-bold text-gray-800 mb-4'>{item.title}</h4>
                          <p className='text-gray-600 text-justify tracking-tight'>{item.content}</p>
                        </div>
                      ))
                      
                    }
                  </div>
                </div>
              </section>
        
        
              <section>
                {/* dynamic image mapping using json object with type saftey */}
                    <div className='flex flex-col md:gap-40 gap-20 justify-center items-center mt-25 mb-25'>
                    
                    {images.map((img, i)=> (
                      <Image
                      key={i}
                      src={img.src}
                      width={800}
                      height={500}
                      alt={img.alt}
                      className='block cursor-pointer shadow-2xl hover:shadow-amber-400 rounded-2xl'
                      onClick={()=> setSelectedImage(img.jsxType)}
                      />
                    ))}    
                    </div>
                </section>


  

                            <DataGraph />

                
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

       ): (
          <div className='mt-50'>
            {componentMap[selectedImage]}
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
      )}
    </div>
  )
}

export default LandingPage