"use client"

import { useState } from 'react';
import { Camera, Check, X, Star, ThumbsUp, ThumbsDown, ChevronRight, QrCode, Send, AlertTriangle, Heart, CheckCircle2, XCircle, Shield, Car, User, Volume2, Navigation, Smile } from 'lucide-react';
import { JSX } from 'react';
import toast from 'react-hot-toast';
// Proper TypeScript types
type FeedbackCategory = 'safetyIssues' | 'vehicleCondition' | 'driverBehavior' | 'noiseIssues' | 'rideExperience' | 'positivePoints';

interface FeedbackItems {
  safetyIssues: string[];
  vehicleCondition: string[];
  driverBehavior: string[];
  noiseIssues: string[];
  rideExperience: string[];
  positivePoints: string[];
}

interface Step {
  id: number;
  name: string;
  icon: JSX.Element;
}

export default function TASCApp() {
  const [activeStep, setActiveStep] = useState<number>(1);
  const [vehicleNumber, setVehicleNumber] = useState<string>('');
  const [feedbackItems, setFeedbackItems] = useState<FeedbackItems>({
    safetyIssues: [],
    vehicleCondition: [],
    driverBehavior: [],
    noiseIssues: [],
    rideExperience: [],
    positivePoints: []
  });
  const [showQRScanner, setShowQRScanner] = useState<boolean>(false);
  const [photoTaken, setPhotoTaken] = useState<boolean>(false);
  const [additionalComments, setAdditionalComments] = useState<string>('');
  const [activeFeedbackCategory, setActiveFeedbackCategory] = useState<FeedbackCategory | null>(null);
  
  const steps: Step[] = [
    { id: 1, name: "Vehicle Info", icon: <QrCode size={16} /> },
    { id: 2, name: "Feedback", icon: <Star size={16} /> },
    { id: 3, name: "Details", icon: <Camera size={16} /> },
    { id: 4, name: "Submit", icon: <Send size={16} /> }
  ];
  
  const feedbackData = {
    safetyIssues: {
      title: "🚨 Safety Concerns",
      icon: <AlertTriangle className="text-red-500" size={20} />,
      color: "red",
      items: [
        "Rash driving", "Unsafe driving", "Using phone while driving", 
        "Driving under influence", "Not following traffic rules", "Over-speeding",
        "Improper lane changes", "Ignoring traffic signals"
      ]
    },
    vehicleCondition: {
      title: "🚗 Vehicle Condition",
      icon: <XCircle className="text-orange-500" size={20} />,
      color: "orange",
      items: [
        "Poor vehicle condition", "Uncomfortable seating", "Poor shock absorbers", 
        "Cleanliness issues", "AC/ventilation problems", "Seatbelt functionality",
        "Door/window functionality", "Vehicle odor", "Windshield broken"
      ]
    },
    driverBehavior: {
      title: "👤 Driver Behavior",
      icon: <X className="text-purple-500" size={20} />,
      color: "purple",
      items: [
        "Rude communication", "Unnecessary arguments", "Inappropriate comments",
        "Unwanted conversation", "Refusal to follow route preferences", 
        "Pressuring for tips", "Smoking in vehicle", "Name calling", "Spitting on road"
      ]
    },
    noiseIssues: {
      title: "🔊 Noise Issues",
      icon: <X className="text-yellow-500" size={20} />,
      color: "yellow",
      items: [
        "Excessive honking", "Loud music", "Distracting conversations (phone)",
        "Vehicle noise issues"
      ]
    },
    rideExperience: {
      title: "🛣️ Ride Experience",
      icon: <X className="text-pink-500" size={20} />,
      color: "pink",
      items: [
        "Overcharging", "Taking longer routes", "Abrupt stops and starts",
        "Refusing to use meter/app pricing", "Ride cancellation after accepting",
        "Delay in arrival", "Uncomfortable driving style", "Jumping on bumps"
      ]
    },
    positivePoints: {
      title: "✅ Positive Points",
      icon: <Heart className="text-green-500" size={20} />,
      color: "green",
      items: [
        "Professional driving", "Clean vehicle", "Courteous behavior",
        "Good navigation skills", "Comfortable ride", "Punctuality",
        "Safe driving practices", "Helpful with luggage/special needs",
        "Respects privacy", "Follows traffic rules", "Comfortable seats"
      ]
    }
  };
  
  const handleToggleFeedbackItem = (category: FeedbackCategory, item: string): void => {
    setFeedbackItems(prev => {
      const updated = { ...prev };
      if (updated[category].includes(item)) {
        updated[category] = updated[category].filter(i => i !== item);
      } else {
        updated[category] = [...updated[category], item];
      }
      return updated;
    });
  };
  
  const handleScanQR = (): void => {
    setShowQRScanner(true);
    setTimeout(() => {
      setVehicleNumber('UP14 QT 7931');
      setShowQRScanner(false);
    }, 1500);
  };
  
  const handleSubmit = (): void => {
    toast.success('Feedback submitted successfully. Thank you for making rides safer!');
    setActiveStep(1);
    setVehicleNumber('');
    setFeedbackItems({
      safetyIssues: [],
      vehicleCondition: [],
      driverBehavior: [],
      noiseIssues: [],
      rideExperience: [],
      positivePoints: []
    });
    setAdditionalComments('');
    setPhotoTaken(false);
    setActiveFeedbackCategory(null);
  };
  
  const nextStep = (): void => {
    if (activeStep < steps.length) {
      setActiveStep(activeStep + 1);
    }
  };
// button for not proceed next without any review selected
          const nextbutton = (): void => {
      // Ensure at least one feedback item has been selected
            const hasFeedback = Object.values(feedbackItems).some(category => category.length > 0);
    
            if (!hasFeedback) {
                toast.error("Please select atleast one feedback");
                return; // Stop execution if no feedback is selected
            }
    
        // Proceed to the next step only if within valid step range
            if (activeStep < steps.length - 1) {
                setActiveStep(activeStep + 1);
            }
        };
  
  const prevStep = (): void => {
    if (activeStep > 1) {
      setActiveStep(activeStep - 1);
    }
  };
  
  // Icon mapping function
  const getCategoryIcon = (category: FeedbackCategory): JSX.Element => {
    const iconProps = { size: 24, className: "text-white" };
    
    switch (category) {
      case 'safetyIssues':
        return <Shield {...iconProps} />;
      case 'vehicleCondition':
        return <Car {...iconProps} />;
      case 'driverBehavior':
        return <User {...iconProps} />;
      case 'noiseIssues':
        return <Volume2 {...iconProps} />;
      case 'rideExperience':
        return <Navigation {...iconProps} />;
      case 'positivePoints':
        return <Smile {...iconProps} />;
      default:
        return <Star {...iconProps} />;
    }
  };
  
  const totalIssues = (Object.keys(feedbackItems) as FeedbackCategory[])
    .filter(key => key !== 'positivePoints')
    .reduce((acc, key) => acc + feedbackItems[key].length, 0);
  
  const FeedbackCategory = ({ 
    category, 
    data 
  }: { 
    category: FeedbackCategory; 
    data: typeof feedbackData[FeedbackCategory];
  }) => {
    const colorMap = {
      red: 'bg-red-50 border-red-200 hover:bg-red-100',
      orange: 'bg-orange-50 border-orange-200 hover:bg-orange-100',
      purple: 'bg-purple-50 border-purple-200 hover:bg-purple-100',
      yellow: 'bg-yellow-50 border-yellow-200 hover:bg-yellow-100',
      pink: 'bg-pink-50 border-pink-200 hover:bg-pink-100',
      green: 'bg-green-50 border-green-200 hover:bg-green-100'
    };
    
    const selectedColorMap = {
      red: 'bg-red-500 text-white border-red-500',
      orange: 'bg-orange-500 text-white border-orange-500',
      purple: 'bg-purple-500 text-white border-purple-500',
      yellow: 'bg-yellow-500 text-white border-yellow-500',
      pink: 'bg-pink-500 text-white border-pink-500',
      green: 'bg-green-500 text-white border-green-500'
    };
    
    return (
      <div className="mb-8 p-6 bg-white rounded-2xl shadow-sm border border-gray-100">
        <div className="flex items-center gap-3 mb-4">
          {data.icon}
          <h3 className="text-xl font-bold text-gray-800">{data.title}</h3>
          {feedbackItems[category].length > 0 && (
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
              category === 'positivePoints' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
            }`}>
              {feedbackItems[category].length}
            </span>
          )}
        </div>
        <div className="flex flex-wrap gap-3">
          {data.items.map((item) => {
            const isSelected = feedbackItems[category].includes(item);
            return (
              <button
                key={item}
                onClick={() => handleToggleFeedbackItem(category, item)}
                className={`px-4 py-2 rounded-xl text-sm font-medium border-2 transition-all duration-200 transform hover:scale-105 ${
                  isSelected
                    ? selectedColorMap[data.color as keyof typeof selectedColorMap]
                    : `${colorMap[data.color as keyof typeof colorMap]} text-gray-700 border-gray-200`
                }`}
              >
                <span>{item}</span>
                {isSelected && (
                  <CheckCircle2 size={14} className="inline ml-2" />
                )}
              </button>
            );
          })}
        </div>
      </div>
    );
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Modern Header */}
      <header className="bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700 text-white shadow-2xl">
        <div className="max-w-6xl mx-auto px-6 py-8">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
                <span className="text-2xl font-black">T</span>
              </div>
              <div>
                <h1 className="text-4xl font-black tracking-tight">TASC</h1>
                <p className="text-blue-100 font-medium">Thoda Aaram Se Chalaiye</p>
              </div>
            </div>
            <div className="text-right hidden md:block">
              <p className="text-blue-100 text-sm">The Right Ride Way</p>
              <p className="text-xl font-bold">Passenger First</p>
            </div>
          </div>
        </div>
      </header>
      
      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* Beautiful Progress Steps */}
        <div className="mb-12">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-gray-800">Your Feedback Journey</h2>
            <span className="text-sm text-gray-500">Step {activeStep} of {steps.length}</span>
          </div>
          <div className="relative">
            <div className="flex justify-between">
              {steps.map((step, index) => (
                <div key={step.id} className="flex flex-col items-center relative z-10">
                  <div 
                    className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-300 transform ${
                      activeStep >= step.id 
                        ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg scale-110' 
                        : 'bg-white text-gray-400 shadow-md border-2 border-gray-200'
                    }`}
                  >
                    {activeStep > step.id ? <Check size={20} /> : step.icon}
                  </div>
                  <span className={`text-sm mt-3 font-medium transition-colors ${
                    activeStep >= step.id ? 'text-blue-600' : 'text-gray-500'
                  }`}>
                    {step.name}
                  </span>
                </div>
              ))}
            </div>
            {/* Progress Line */}
            <div className="absolute top-7 left-0 right-0 h-1 bg-gray-200 -z-10">
              <div 
                className="h-full bg-gradient-to-r from-blue-500 to-indigo-600 transition-all duration-500 ease-out"
                style={{ width: `${((activeStep - 1) / (steps.length - 1)) * 100}%` }}
              />
            </div>
          </div>
        </div>
      
        {/* Main Content Card */}
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/50 overflow-hidden">
          <div className="p-8">
            {activeStep === 1 && (
              <div>
                <div className="text-center mb-8">
                  <h2 className="text-3xl font-bold text-gray-800 mb-3">Vehicle Information</h2>
                  <p className="text-gray-600 text-lg">
                    Scan the QR code in your vehicle or enter the number manually
                  </p>
                </div>
                
                {showQRScanner ? (
                  <div className="bg-gradient-to-br from-gray-900 to-black rounded-3xl p-8 mb-6 text-center">
                    <div className="w-full h-64 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-2xl flex items-center justify-center text-white mb-4 border-2 border-dashed border-white/30">
                      <div className="text-center">
                        <div className="animate-pulse text-2xl mb-2">📱</div>
                        <div className="animate-pulse text-lg">Scanning QR Code...</div>
                      </div>
                    </div>
                    <button 
                      className="px-6 py-3 bg-red-500 hover:bg-red-600 text-white rounded-2xl font-medium transition-colors"
                      onClick={() => setShowQRScanner(false)}
                    >
                      <X size={16} className="inline mr-2" /> Cancel Scan
                    </button>
                  </div>
                ) : (
                  <div className="max-w-2xl mx-auto">
                    <div className="flex mb-8 shadow-xl rounded-2xl overflow-hidden">
                      <input
                        type="text"
                        placeholder="Vehicle Number (e.g., UP14 QT 7931)"
                        className="flex-1 p-4 text-lg border-0 bg-white focus:outline-none focus:ring-0"
                        value={vehicleNumber}
                        onChange={(e) => setVehicleNumber(e.target.value)}
                      />
                      <button 
                        className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white px-8 font-medium transition-all duration-200 flex items-center gap-3"
                        onClick={handleScanQR}
                      >
                        <QrCode size={20} />
                        Scan QR
                      </button>
                    </div>
                    
                    {vehicleNumber && (
                      <div className="bg-green-50 border border-green-200 rounded-2xl p-4 mb-6">
                        <div className="flex items-center gap-3">
                          <CheckCircle2 className="text-green-500" size={20} />
                          <span className="text-green-700 font-medium">Vehicle number confirmed: {vehicleNumber}</span>
                        </div>
                      </div>
                    )}
                  </div>
                )}
                
                <div className="flex justify-end mt-8">
                  <button
                    className="px-8 py-4 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white rounded-2xl font-medium disabled:from-gray-300 disabled:to-gray-400 disabled:cursor-not-allowed transition-all duration-200 flex items-center gap-2 text-lg"
                    onClick={nextStep}
                    disabled={!vehicleNumber}
                  >
                    Continue <ChevronRight size={20} />
                  </button>
                </div>
              </div>
            )}
            
            {activeStep === 2 && (
              <div>
                <div className="text-center mb-12">
                  <h2 className="text-3xl font-bold text-gray-800 mb-3">Share Your Experience</h2>
                  <p className="text-gray-600 text-lg">
                    Click on any category to share your feedback for vehicle <span className="font-bold text-blue-600">{vehicleNumber}</span>
                  </p>
                </div>
                
                {/* Feedback Category Icons Grid */}
                <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mb-12">
                  {(Object.keys(feedbackData) as FeedbackCategory[]).map((category) => {
                    const data = feedbackData[category];
                    const count = feedbackItems[category].length;
                    const isPositive = category === 'positivePoints';
                    
                    return (
                      <button
                        key={category}
                        onClick={() => setActiveFeedbackCategory(activeFeedbackCategory === category ? null : category)}
                        className={`relative p-6 rounded-3xl border-3 transition-all duration-300 transform hover:scale-105 hover:shadow-xl group ${
                          activeFeedbackCategory === category
                            ? isPositive
                              ? 'bg-gradient-to-br from-green-50 to-emerald-100 border-green-300 shadow-lg'
                              : 'bg-gradient-to-br from-red-50 to-rose-100 border-red-300 shadow-lg'
                            : count > 0
                              ? isPositive
                                ? 'bg-green-50 border-green-200 shadow-md'
                                : 'bg-red-50 border-red-200 shadow-md'
                              : 'bg-white border-gray-200 hover:border-gray-300 shadow-sm'
                        }`}
                      >
                        {/* Category Icon */}
                        <div className={`w-16 h-16 mx-auto mb-4 rounded-2xl flex items-center justify-center transition-all duration-300 ${
                          activeFeedbackCategory === category
                            ? isPositive ? 'bg-green-500 shadow-lg' : 'bg-red-500 shadow-lg'
                            : count > 0
                              ? isPositive ? 'bg-green-400' : 'bg-red-400'
                              : 'bg-gray-300 group-hover:bg-gray-400'
                        }`}>
                          {getCategoryIcon(category)}
                        </div>
                        
                        {/* Category Title */}
                        <h3 className="font-bold text-lg text-gray-800 mb-2 text-center">
                          {data.title.replace(/[🚨🚗👤🔊🛣️✅]/g, '').trim()}
                        </h3>
                        
                        {/* Count Badge */}
                        {count > 0 && (
                          <div className={`absolute -top-2 -right-2 w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold ${
                            isPositive ? 'bg-green-500' : 'bg-red-500'
                          }`}>
                            {count}
                          </div>
                        )}
                        
                        {/* Active Indicator */}
                        {activeFeedbackCategory === category && (
                          <div className={`absolute bottom-3 left-1/2 transform -translate-x-1/2 w-2 h-2 rounded-full ${
                            isPositive ? 'bg-green-500' : 'bg-red-500'
                          } animate-pulse`} />
                        )}
                      </button>
                    );
                  })}
                </div>
                
                {/* Active Feedback Section */}
                {activeFeedbackCategory && (
                  <div className="mb-12">
                    <div className={`p-8 rounded-3xl border-2 transition-all duration-500 transform ${
                      activeFeedbackCategory === 'positivePoints'
                        ? 'bg-gradient-to-br from-green-50 to-emerald-50 border-green-200'
                        : 'bg-gradient-to-br from-red-50 to-rose-50 border-red-200'
                    }`}>
                      <div className="flex items-center gap-4 mb-6">
                        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${
                          activeFeedbackCategory === 'positivePoints' ? 'bg-green-500' : 'bg-red-500'
                        }`}>
                          {getCategoryIcon(activeFeedbackCategory)}
                        </div>
                        <div>
                          <h3 className="text-2xl font-bold text-gray-800">
                            {feedbackData[activeFeedbackCategory].title}
                          </h3>
                          <p className="text-gray-600">
                            Select all that apply to your experience
                          </p>
                        </div>
                        <button
                          onClick={() => setActiveFeedbackCategory(null)}
                          className="ml-auto p-2 hover:bg-white/50 rounded-xl transition-colors"
                        >
                          <X size={24} className="text-gray-500" />
                        </button>
                      </div>
                      
                      {/* Feedback Items */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {feedbackData[activeFeedbackCategory].items.map((item) => {
                          const isSelected = feedbackItems[activeFeedbackCategory].includes(item);
                          const isPositive = activeFeedbackCategory === 'positivePoints';
                          
                          return (
                            <button
                              key={item}
                              onClick={() => handleToggleFeedbackItem(activeFeedbackCategory, item)}
                              className={`p-4 rounded-2xl text-left font-medium transition-all duration-200 transform hover:scale-102 ${
                                isSelected
                                  ? isPositive
                                    ? 'bg-green-500 text-white shadow-lg'
                                    : 'bg-red-500 text-white shadow-lg'
                                  : 'bg-white hover:bg-gray-50 text-gray-700 border-2 border-gray-200 hover:border-gray-300'
                              }`}
                            >
                              <div className="flex items-center justify-between">
                                <span>{item}</span>
                                {isSelected && (
                                  <CheckCircle2 size={20} className="text-white" />
                                )}
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                )}
                
                {/* Summary Stats */}
                <div className="grid grid-cols-2 gap-6 mb-8">
                  <div className="bg-gradient-to-br from-red-50 to-rose-100 p-6 rounded-3xl border-2 border-red-200">
                    <div className="flex items-center gap-3 mb-2">
                      <AlertTriangle className="text-red-500" size={24} />
                      <h3 className="font-bold text-lg text-red-700">Issues Reported</h3>
                    </div>
                    <p className="text-3xl font-black text-red-600">{totalIssues}</p>
                  </div>
                  
                  <div className="bg-gradient-to-br from-green-50 to-emerald-100 p-6 rounded-3xl border-2 border-green-200">
                    <div className="flex items-center gap-3 mb-2">
                      <Heart className="text-green-500" size={24} />
                      <h3 className="font-bold text-lg text-green-700">Positive Points</h3>
                    </div>
                    <p className="text-3xl font-black text-green-600">{feedbackItems.positivePoints.length}</p>
                  </div>
                </div>
                
                <div className="flex justify-between items-center pt-8 border-t border-gray-200">
                  <button
                    className="px-8 py-4 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-2xl font-medium transition-colors flex items-center gap-2"
                    onClick={prevStep}
                  >
                    ← Back
                  </button>
                  <button
                    className="px-8 py-4 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white rounded-2xl font-medium transition-all duration-200 flex items-center gap-2"
                    onClick={nextbutton}
                  >
                    Continue <ChevronRight size={20} />
                  </button>
                </div>
              </div>
            )}
            
            {activeStep === 3 && (
              <div>
                <div className="text-center mb-8">
                  <h2 className="text-3xl font-bold text-gray-800 mb-3">Additional Details</h2>
                  <p className="text-gray-600 text-lg">
                    Add photos and comments to support your feedback
                  </p>
                </div>
                
                <div className="max-w-3xl mx-auto space-y-8">
                  <div>
                    <label className="block text-gray-700 font-semibold mb-4 text-lg">📸 Add Photos (Optional)</label>
                    {!photoTaken ? (
                      <button 
                        className="w-full border-2 border-dashed border-gray-300 hover:border-blue-400 rounded-3xl p-12 flex flex-col items-center justify-center text-gray-500 hover:text-blue-500 hover:bg-blue-50 transition-all duration-200 group"
                        onClick={() => setPhotoTaken(true)}
                      >
                        <Camera size={48} className="mb-4 group-hover:scale-110 transition-transform" />
                        <span className="text-lg font-medium">Take a photo or upload from gallery</span>
                        <span className="text-sm text-gray-400 mt-2">Support your feedback with visual evidence</span>
                      </button>
                    ) : (
                      <div className="relative bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200 rounded-3xl p-8">
                        <div className="text-center">
                          <CheckCircle2 className="mx-auto text-green-500 mb-4" size={48} />
                          <span className="text-green-700 font-medium text-lg">Photo successfully added</span>
                        </div>
                        <button 
                          className="absolute top-4 right-4 bg-red-500 hover:bg-red-600 text-white p-2 rounded-full transition-colors"
                          onClick={() => setPhotoTaken(false)}
                        >
                          <X size={16} />
                        </button>
                      </div>
                    )}
                  </div>
                  
                  <div>
                    <label className="block text-gray-700 font-semibold mb-4 text-lg">💬 Additional Comments</label>
                    <textarea
                      className="w-full border-2 border-gray-200 focus:border-blue-400 focus:ring-4 focus:ring-blue-100 rounded-2xl p-6 h-40 text-lg resize-none transition-all duration-200"
                      placeholder="Share any additional details about your ride experience..."
                      value={additionalComments}
                      onChange={(e) => setAdditionalComments(e.target.value)}
                    />
                  </div>
                </div>
                
                <div className="flex justify-between mt-12 pt-8 border-t border-gray-200">
                  <button
                    className="px-8 py-4 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-2xl font-medium transition-colors"
                    onClick={prevStep}
                  >
                    ← Back
                  </button>
                  <button
                    className="px-8 py-4 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white rounded-2xl font-medium transition-all duration-200 flex items-center gap-2"
                    onClick={nextStep}
                  >
                    Review Feedback <ChevronRight size={20} />
                  </button>
                </div>
              </div>
            )}
            
            {activeStep === 4 && (
              <div>
                <div className="text-center mb-8">
                  <h2 className="text-3xl font-bold text-gray-800 mb-3">Review & Submit</h2>
                  <p className="text-gray-600 text-lg">
                    Please review your feedback before submitting
                  </p>
                </div>
                
                <div className="max-w-4xl mx-auto">
                  <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-3xl p-8 mb-8 border border-blue-200">
                    <div className="grid md:grid-cols-2 gap-6 mb-6">
                      <div className="bg-white rounded-2xl p-6">
                        <h3 className="font-bold text-lg mb-3 text-gray-800">🚗 Vehicle Details</h3>
                        <p className="text-2xl font-bold text-blue-600">{vehicleNumber}</p>
                      </div>
                      
                      <div className="bg-white rounded-2xl p-6">
                        <h3 className="font-bold text-lg mb-3 text-gray-800">📊 Feedback Summary</h3>
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-red-600">Issues:</span>
                            <span className="font-bold text-red-600">{totalIssues}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-green-600">Positive Points:</span>
                            <span className="font-bold text-green-600">{feedbackItems.positivePoints.length}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {(Object.keys(feedbackItems) as FeedbackCategory[]).map(category => (
                      feedbackItems[category].length > 0 && (
                        <div key={category} className="bg-white rounded-2xl p-6 mb-4">
                          <h4 className="font-semibold mb-3 flex items-center gap-2">
                            {feedbackData[category].icon}
                            {feedbackData[category].title}
                            <span className={`px-2 py-1 rounded-full text-xs ${
                              category === 'positivePoints' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                            }`}>
                              {feedbackItems[category].length}
                            </span>
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            {feedbackItems[category].map(item => (
                              <span key={item} className={`px-3 py-1 rounded-xl text-sm ${
                                category === 'positivePoints' 
                                  ? 'bg-green-100 text-green-700' 
                                  : 'bg-red-100 text-red-700'
                              }`}>
                                {item}
                              </span>
                            ))}
                          </div>
                        </div>
                      )
                    ))}
                    
                    {additionalComments && (
                      <div className="bg-white rounded-2xl p-6 mb-4">
                        <h4 className="font-semibold mb-3">💬 Additional Comments</h4>
                        <p className="text-gray-700 bg-gray-50 p-4 rounded-xl">{additionalComments}</p>
                      </div>
                    )}
                    
                    {photoTaken && (
                      <div className="bg-white rounded-2xl p-6">
                        <h4 className="font-semibold mb-3">📸 Photos Attached</h4>
                        <div className="flex items-center gap-2 text-green-600">
                          <CheckCircle2 size={20} />
                          <span>1 photo attached</span>
                        </div>
                      </div>
                    )}
                  </div>
                  
                  <div className="bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200 rounded-3xl p-6 mb-8">
                    <div className="flex items-center gap-4">
                      <Heart className="text-green-500" size={32} />
                      <div>
                        <h3 className="font-bold text-green-800 text-lg">Thank You for Your Feedback!</h3>
                        <p className="text-green-700">Your contribution helps improve passenger safety and ride quality for everyone.</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex justify-between">
                    <button
                      className="px-8 py-4 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-2xl font-medium transition-colors"
                      onClick={prevStep}
                    >
                      ← Back
                    </button>
                    <button
                      className="px-8 py-4 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white rounded-2xl font-medium transition-all duration-200 flex items-center gap-2 text-lg shadow-lg hover:shadow-xl transform hover:scale-105"
                      onClick={handleSubmit}
                    >
                      <Send size={20} />
                      Submit Feedback
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        

      </div>
    </div>
  );
}