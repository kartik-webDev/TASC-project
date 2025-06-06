// "use client"
// import React, { useState } from 'react'
// import { motion, useScroll, useTransform } from 'framer-motion'
// import { Car, Shield, Star, Users, CheckCircle, ArrowRight, MessageSquare, TrendingUp } from 'lucide-react'

// const LandingPage = () => {
//     const [hoveredIcon, setHoveredIcon] = useState(null)
//     const { scrollY } = useScroll()
//     const y1 = useTransform(scrollY, [0, 300], [0, -50])
//     const y2 = useTransform(scrollY, [0, 300], [0, 25])

//     const iconMap = {
//         'car': Car,
//         'decision': Users,
//         'drive': Shield,
//         'honk': MessageSquare
//     }
// // button 
<<<<<<< HEAD
    //     const nextbutton = (): void => {
    //   // Ensure at least one feedback item has been selected
    //         const hasFeedback = Object.values(feedbackItems).some(category => category.length > 0);
    
    //         if (!hasFeedback) {
    //             toast.error("Please select atleast one feedback");
    //             return; // Stop execution if no feedback is selected
    //         }
    
    //     // Proceed to the next step only if within valid step range
    //         if (activeStep < steps.length - 1) {
    //             setActiveStep(activeStep + 1);
    //         }
    //     };
=======
//     //     const nextbutton = (): void => {
//     //   // Ensure at least one feedback item has been selected
//     //         const hasFeedback = Object.values(feedbackItems).some(category => category.length > 0);
    
//     //         if (!hasFeedback) {
//     //             toast.error("Please select atleast one feedback");
//     //             return; // Stop execution if no feedback is selected
//     //         }
    
//     //     // Proceed to the next step only if within valid step range
//     //         if (activeStep < steps.length - 1) {
//     //             setActiveStep(activeStep + 1);
//     //         }
//     //     };
>>>>>>> 8626a11cdb54d1a198f66c0f37ca1a6af2e98c9e

//     category: keyof FeedbackItems, item: string)
    
//     interface FeedbackItems {
//       safetyIssues: string[];
//       vehicleCondition: string[];
//       driverBehavior: string[];
//       noiseIssues: string[];
//       rideExperience: string[];
//       positivePoints: string[];
//     }
    
//     interface FeedbackCategory {
//       key: keyof FeedbackItems;
//       title: string;
//       icon: React.ReactNode;
//       items: string[];
//       color: string;
//     }
    
    
//     const containerVariants = {
//         hidden: { opacity: 0 },
//         visible: {
//             opacity: 1,
//             transition: {
//                 staggerChildren: 0.2,
//                 duration: 0.6
//             }
//         }
//     }

//     const itemVariants = {
//         hidden: { opacity: 0, y: 30 },
//         visible: {
//             opacity: 1,
//             y: 0,
//             transition: { duration: 0.6, ease: "easeOut" }
//         }
//     }

//     const floatingVariants = {
//         animate: {
//             y: [-10, 10, -10],
//             transition: {
//                 duration: 4,
//                 repeat: Infinity,
//                 ease: "easeInOut"
//             }
//         }
//     }

//     return (
//         <div className='min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 overflow-hidden'>
//             {/* Hero Section */}
//             <motion.div 
//                 className="relative min-h-screen flex items-center justify-center"
//                 initial="hidden"
//                 animate="visible"
//                 variants={containerVariants}
//             >
//                 {/* Animated Background Elements */}
//                 <div className="absolute inset-0 overflow-hidden">
//                     <motion.div 
//                         className="absolute top-20 left-20 w-72 h-72 bg-gradient-to-r from-amber-200/30 to-orange-200/30 rounded-full blur-xl"
//                         style={{ y: y1 }}
//                     />
//                     <motion.div 
//                         className="absolute bottom-20 right-20 w-96 h-96 bg-gradient-to-r from-teal-200/30 to-blue-200/30 rounded-full blur-xl"
//                         style={{ y: y2 }}
//                     />
//                 </div>

//                 {/* Main Hero Content */}
//                 <div className="relative z-10 max-w-7xl mx-auto px-8 grid lg:grid-cols-2 gap-12 items-center">
//                     <motion.div className="space-y-8" variants={itemVariants}>
//                         <motion.div
//                             className="inline-block px-4 py-2 bg-gradient-to-r from-amber-100 to-orange-100 rounded-full text-amber-800 font-medium"
//                             whileHover={{ scale: 1.05 }}
//                         >
//                             ✨ Passenger-First Transportation
//                         </motion.div>
                        
//                         <motion.h1 
//                             className="text-6xl lg:text-7xl font-bold bg-gradient-to-r from-teal-600 via-blue-600 to-purple-600 bg-clip-text text-transparent leading-tight"
//                             variants={itemVariants}
//                         >
//                             Thoda Aaram Se
//                             <br />
//                             <span className="text-amber-500">Chalaiye</span>
//                         </motion.h1>
                        
//                         <motion.p 
//                             className="text-xl text-gray-600 leading-relaxed max-w-2xl"
//                             variants={itemVariants}
//                         >
//                             TASC is a web application dedicated to prioritizing passenger safety, comfort, and choice in ride services. 
//                             The application empowers passengers to provide comprehensive feedback on their ride experiences, which directly 
//                             impacts driver ratings. This passenger-centric approach aims to improve overall ride quality and safety standards 
//                             across the transportation ecosystem.
//                         </motion.p>
                        
//                         <motion.button 
//                             className="group bg-gradient-to-r from-teal-600 to-blue-600 text-white px-8 py-4 rounded-2xl text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-3"
//                             whileHover={{ scale: 1.05, y: -2 }}
//                             whileTap={{ scale: 0.95 }}
//                             variants={itemVariants}
//                         >
//                             Explore Guidelines
//                             <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
//                         </motion.button>
//                     </motion.div>

//                     {/* Interactive Icons Section */}
//                     <motion.div 
//                         className="relative h-96"
//                         variants={itemVariants}
//                     >
//                         <div className="absolute inset-0 bg-gradient-to-br from-white/80 to-white/40 backdrop-blur-sm rounded-3xl border border-white/50 shadow-2xl">
//                             {[
//                                 { icon: 'car', position: 'top-8 right-16', color: 'from-blue-500 to-blue-600', label: 'Vehicle' },
//                                 { icon: 'decision', position: 'top-32 right-16', color: 'from-purple-500 to-purple-600', label: 'Behavior' },
//                                 { icon: 'drive', position: 'top-6 right-32', color: 'from-green-500 to-green-600', label: 'Safety' },
//                                 { icon: 'honk', position: 'top-32 right-36', color: 'from-orange-500 to-orange-600', label: 'Comfort' }
//                             ].map((item, index) => {
//                                 const IconComponent = iconMap[item.icon]
//                                 return (
//                                     <motion.div
//                                         key={item.icon}
//                                         className={`absolute ${item.position} cursor-pointer`}
//                                         variants={floatingVariants}
//                                         animate="animate"
//                                         style={{ animationDelay: `${index * 0.5}s` }}
//                                         whileHover={{ scale: 1.2 }}
//                                         onHoverStart={() => setHoveredIcon(item.icon)}
//                                         onHoverEnd={() => setHoveredIcon(null)}
//                                     >
//                                         <div className={`w-16 h-16 bg-gradient-to-r ${item.color} rounded-2xl flex items-center justify-center shadow-lg`}>
//                                             <IconComponent className="w-8 h-8 text-white" />
//                                         </div>
//                                         {hoveredIcon === item.icon && (
//                                             <motion.div
//                                                 initial={{ opacity: 0, y: 10 }}
//                                                 animate={{ opacity: 1, y: 0 }}
//                                                 className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-black text-white px-3 py-1 rounded-lg text-sm whitespace-nowrap"
//                                             >
//                                                 {item.label}
//                                             </motion.div>
//                                         )}
//                                     </motion.div>
//                                 )
//                             })}
//                         </div>
//                     </motion.div>
//                 </div>
//             </motion.div>

//             {/* What TASC Is Section */}
//             <motion.section 
//                 className="py-20 bg-white/50 backdrop-blur-sm"
//                 initial={{ opacity: 0 }}
//                 whileInView={{ opacity: 1 }}
//                 transition={{ duration: 0.8 }}
//                 viewport={{ once: true }}
//             >
//                 <div className="max-w-6xl mx-auto px-8">
//                     <motion.div
//                         className="text-center mb-16"
//                         initial={{ opacity: 0, y: 30 }}
//                         whileInView={{ opacity: 1, y: 0 }}
//                         transition={{ duration: 0.6 }}
//                         viewport={{ once: true }}
//                     >
//                         <h2 className="text-5xl font-bold bg-gradient-to-r from-teal-600 to-blue-600 bg-clip-text text-transparent mb-6">
//                             Welcome to TASC — Thoda Aaram Se Chalaiye
//                         </h2>
//                         <h3 className="text-4xl font-bold text-teal-800 mb-8">What TASC is?</h3>
//                     </motion.div>

//                     <div className="grid md:grid-cols-3 gap-8">
//                         {[
//                             {
//                                 icon: Shield,
//                                 title: "Safety First",
//                                 content: "TASC is a web platform built to prioritize passenger safety, comfort, and choice in everyday ride services. Whether it's a cab, auto, or shared ride, TASC empowers you—the passenger—to share honest feedback about your experience."
//                             },
//                             {
//                                 icon: MessageSquare,
//                                 title: "Your Voice Matters",
//                                 content: "Through a quick feedback interface, TASC makes it easy for riders to report issues, appreciate good service, and help build a more respectful and reliable transportation ecosystem."
//                             },
//                             {
//                                 icon: TrendingUp,
//                                 title: "Better Together",
//                                 content: "TASC is part of a movement to make rides safer, smoother, and more human—because your voice matters and directly impacts driver ratings and improves ride standards for everyone."
//                             }
//                         ].map((item, index) => (
//                             <motion.div
//                                 key={index}
//                                 className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100"
//                                 initial={{ opacity: 0, y: 30 }}
//                                 whileInView={{ opacity: 1, y: 0 }}
//                                 transition={{ duration: 0.6, delay: index * 0.2 }}
//                                 viewport={{ once: true }}
//                                 whileHover={{ y: -5 }}
//                             >
//                                 <div className="w-12 h-12 bg-gradient-to-r from-teal-500 to-blue-500 rounded-xl flex items-center justify-center mb-6">
//                                     <item.icon className="w-6 h-6 text-white" />
//                                 </div>
//                                 <h4 className="text-xl font-bold text-gray-800 mb-4">{item.title}</h4>
//                                 <p className="text-gray-600 leading-relaxed">{item.content}</p>
//                             </motion.div>
//                         ))}
//                     </div>
//                 </div>
//             </motion.section>

//             {/* Why TASC Section */}
//             <section className="py-20 bg-gradient-to-br from-slate-50 to-blue-50">
//                 <div className="max-w-6xl mx-auto px-8">
//                     <motion.div
//                         className="text-center mb-16"
//                         initial={{ opacity: 0, y: 30 }}
//                         whileInView={{ opacity: 1, y: 0 }}
//                         transition={{ duration: 0.6 }}
//                         viewport={{ once: true }}
//                     >
//                         <h2 className="text-5xl font-bold text-teal-800 mb-4">Why TASC?</h2>
//                         <p className="text-2xl text-gray-600">
//                             Because passengers deserve more than just a ride. They deserve <strong className="text-teal-600">respect, safety, and comfort.</strong>
//                         </p>
//                     </motion.div>

//                     <div className="space-y-16">
//                         {/* Problem Section */}
//                         <motion.div
//                             className="bg-white rounded-3xl p-10 shadow-lg border-l-4 border-red-500"
//                             initial={{ opacity: 0, x: -30 }}
//                             whileInView={{ opacity: 1, x: 0 }}
//                             transition={{ duration: 0.6 }}
//                             viewport={{ once: true }}
//                         >
//                             <h3 className="text-3xl font-semibold text-red-600 mb-6 flex items-center gap-3">
//                                 <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center">
//                                     ⚠️
//                                 </div>
//                                 The Problem
//                             </h3>
//                             <p className="text-xl mb-6 text-gray-700">
//                                 Ride services today often prioritize speed, pricing, or driver availability — but overlook the actual ride experience from the passenger's point of view.
//                             </p>
//                             <div className="grid md:grid-cols-2 gap-4">
//                                 {[
//                                     "Unsafe driving practices (rash driving, phone use, ignoring traffic rules)",
//                                     "Poor vehicle condition (broken seats, bad smell, no seatbelts)",
//                                     "Unprofessional behavior (rudeness, inappropriate comments, pressure for tips)",
//                                     "Noise discomfort (honking, loud music, loud phone calls)",
//                                     "Route manipulation or overcharging"
//                                 ].map((issue, index) => (
//                                     <motion.div
//                                         key={index}
//                                         className="flex items-start gap-3 p-3 bg-red-50 rounded-lg"
//                                         initial={{ opacity: 0 }}
//                                         whileInView={{ opacity: 1 }}
//                                         transition={{ duration: 0.4, delay: index * 0.1 }}
//                                         viewport={{ once: true }}
//                                     >
//                                         <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
//                                         <p className="text-gray-700">{issue}</p>
//                                     </motion.div>
//                                 ))}
//                             </div>
//                             <p className="text-xl mt-6 text-gray-700">
//                                 These issues may seem "minor" individually — but collectively, they erode trust, dignity, and safety in everyday commuting.
//                             </p>
//                         </motion.div>

//                         {/* Gap Section */}
//                         <motion.div
//                             className="bg-white rounded-3xl p-10 shadow-lg border-l-4 border-yellow-500"
//                             initial={{ opacity: 0, x: 30 }}
//                             whileInView={{ opacity: 1, x: 0 }}
//                             transition={{ duration: 0.6 }}
//                             viewport={{ once: true }}
//                         >
//                             <h3 className="text-3xl font-semibold text-yellow-600 mb-6 flex items-center gap-3">
//                                 <div className="w-8 h-8 bg-yellow-100 rounded-lg flex items-center justify-center">
//                                     🔍
//                                 </div>
//                                 The Gap
//                             </h3>
//                             <p className="text-xl mb-6 text-gray-700">
//                                 Current ride platforms often offer limited or general feedback options that:
//                             </p>
//                             <div className="space-y-3">
//                                 {[
//                                     "Don't capture the specific issue",
//                                     "Don't allow for evidence (photos, voice notes)",
//                                     "Don't show real impact (passenger feedback goes into a void)"
//                                 ].map((gap, index) => (
//                                     <motion.div
//                                         key={index}
//                                         className="flex items-center gap-3 p-3 bg-yellow-50 rounded-lg"
//                                         initial={{ opacity: 0 }}
//                                         whileInView={{ opacity: 1 }}
//                                         transition={{ duration: 0.4, delay: index * 0.1 }}
//                                         viewport={{ once: true }}
//                                     >
//                                         <div className="w-2 h-2 bg-yellow-500 rounded-full flex-shrink-0"></div>
//                                         <p className="text-gray-700">{gap}</p>
//                                     </motion.div>
//                                 ))}
//                             </div>
//                             <p className="text-xl mt-6 text-gray-700">
//                                 As a result, passengers feel disempowered, and the system fails to correct repeat offenders or recognize great drivers.
//                             </p>
//                         </motion.div>

//                         {/* Solution Section */}
//                         <motion.div
//                             className="bg-gradient-to-r from-green-50 to-teal-50 rounded-3xl p-10 shadow-lg border-l-4 border-green-500"
//                             initial={{ opacity: 0, x: -30 }}
//                             whileInView={{ opacity: 1, x: 0 }}
//                             transition={{ duration: 0.6 }}
//                             viewport={{ once: true }}
//                         >
//                             <h3 className="text-3xl font-semibold text-green-600 mb-6 flex items-center gap-3">
//                                 <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
//                                     ✅
//                                 </div>
//                                 The TASC Solution
//                             </h3>
//                             <p className="text-xl mb-6 text-gray-700">
//                                 TASC (Thoda Aaram Se Chalaiye) flips the narrative:
//                             </p>
//                             <div className="space-y-3">
//                                 {[
//                                     "It puts passengers first by enabling detailed, actionable feedback",
//                                     "It gives every rider a voice that matters",
//                                     "It allows both criticism and appreciation — creating a balanced ecosystem"
//                                 ].map((solution, index) => (
//                                     <motion.div
//                                         key={index}
//                                         className="flex items-center gap-3 p-3 bg-white rounded-lg shadow-sm"
//                                         initial={{ opacity: 0 }}
//                                         whileInView={{ opacity: 1 }}
//                                         transition={{ duration: 0.4, delay: index * 0.1 }}
//                                         viewport={{ once: true }}
//                                     >
//                                         <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
//                                         <p className="text-gray-700">{solution}</p>
//                                     </motion.div>
//                                 ))}
//                             </div>
//                         </motion.div>

//                         {/* Outcomes Section */}
//                         <motion.div
//                             className="bg-white rounded-3xl p-10 shadow-lg border-l-4 border-blue-500"
//                             initial={{ opacity: 0, x: 30 }}
//                             whileInView={{ opacity: 1, x: 0 }}
//                             transition={{ duration: 0.6 }}
//                             viewport={{ once: true }}
//                         >
//                             <h3 className="text-3xl font-semibold text-blue-600 mb-6 flex items-center gap-3">
//                                 <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
//                                     🎯
//                                 </div>
//                                 Meaningful Outcomes
//                             </h3>
//                             <div className="grid md:grid-cols-2 gap-4">
//                                 {[
//                                     "Unsafe drivers are flagged more quickly",
//                                     "Great drivers are rewarded and encouraged",
//                                     "Passenger communities gain power to influence service standards",
//                                     "Data-driven improvements help ride companies improve training and maintenance"
//                                 ].map((outcome, index) => (
//                                     <motion.div
//                                         key={index}
//                                         className="flex items-center gap-3 p-4 bg-blue-50 rounded-lg"
//                                         initial={{ opacity: 0 }}
//                                         whileInView={{ opacity: 1 }}
//                                         transition={{ duration: 0.4, delay: index * 0.1 }}
//                                         viewport={{ once: true }}
//                                     >
//                                         <Star className="w-5 h-5 text-blue-500 flex-shrink-0" />
//                                         <p className="text-gray-700">{outcome}</p>
//                                     </motion.div>
//                                 ))}
//                             </div>
//                         </motion.div>
//                     </div>
//                 </div>
//             </section>

//             {/* How TASC Works Section */}
//     <section className="py-20 bg-white">
//         <div className="max-w-6xl mx-auto px-8">
//             <motion.div
//                 className="text-center mb-16"
//                 initial={{ opacity: 0, y: 30 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.6 }}
//                 viewport={{ once: true }}
//             >
//                 <h2 className="text-5xl font-bold text-teal-800 mb-8">How TASC Works?</h2>
//             </motion.div>

//             <div className="space-y-6">
//                 {[
//                     "After a ride, passengers can rate their experience and highlight safety concerns, vehicle conditions, driver behavior, and overall ride quality.",
//                     "Users can check the rating before choosing the driver, TASC help them to achieve comfort, secure and safe ride.",
//                     "Instead of just giving a star rating, users can provide detailed feedback, helping ride-hailing services identify issues more precisely.",
//                     "Feedback is aggregated and used to adjust driver scores, encouraging better driving practices and enhancing passenger trust.",
//                     "Passengers can report issues anonymously, ensuring safety and honest feedback without fear of repercussions."
//                 ].map((step, index) => (
//                     <motion.div
//                         key={index}
//                         className="flex items-start gap-6 p-6 bg-gradient-to-r from-gray-50 to-blue-50 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300"
//                         initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
//                         whileInView={{ opacity: 1, x: 0 }}
//                         transition={{ duration: 0.6, delay: index * 0.1 }}
//                         viewport={{ once: true }}
//                         whileHover={{ scale: 1.02 }}
//                     >
//                         <div className="w-10 h-10 bg-gradient-to-r from-teal-500 to-blue-500 text-white rounded-full flex items-center justify-center font-bold text-lg flex-shrink-0">
//                             {index + 1}
//                         </div>
//                         <p className="text-lg text-gray-700 leading-relaxed">{step}</p>
//                     </motion.div>
//                 ))}
//             </div>
//         </div>
//     </section>

//             {/* Guidelines CTA Section */}
//             <section className="py-20 bg-gradient-to-br from-teal-600 via-blue-600 to-purple-600">
//                 <div className="max-w-4xl mx-auto px-8 text-center">
//                     <motion.div
//                         initial={{ opacity: 0, y: 30 }}
//                         whileInView={{ opacity: 1, y: 0 }}
//                         transition={{ duration: 0.6 }}
//                         viewport={{ once: true }}
//                     >
//                         <h2 className="text-4xl font-bold text-white mb-4">Passenger Guidelines</h2>
//                         <p className="text-xl text-white/90 mb-8">Here are the complete passenger guidelines</p>
//                         <motion.button 
//                             className="bg-white text-gray-800 px-10 py-4 rounded-2xl text-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:bg-gray-50"
//                             whileHover={{ scale: 1.05, y: -2 }}
//                             whileTap={{ scale: 0.95 }}
//                         >
//                             View Guidelines
//                         </motion.button>
//                     </motion.div>
//                 </div>
//             </section>
//         </div>
//     )
// }

// export default LandingPage