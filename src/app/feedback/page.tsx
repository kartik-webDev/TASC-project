"use client"

import React, { useState } from 'react';
import { 
  Camera, Check, X, Star, ThumbsUp, ThumbsDown, ChevronRight, QrCode, Send,
  AlertTriangle, Car, User, Volume2, Navigation, ShieldAlert, 
  ChevronDown, ChevronUp
} from 'lucide-react';
import { JSX } from 'react';
import toast from 'react-hot-toast';


interface FeedbackItems {
  safetyIssues: string[];
  vehicleCondition: string[];
  driverBehavior: string[];
  noiseIssues: string[];
  rideExperience: string[];
  positivePoints: string[];
}

interface FeedbackCategory {
  key: keyof FeedbackItems;
  title: string;
  icon: React.ReactNode;
  items: string[];
  color: string;
}


export default function TASCApp(): JSX.Element {
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
  const [expandedCategories, setExpandedCategories] = useState<Set<keyof FeedbackItems>>(new Set());
  
  const steps = [
    { id: 1, name: "Vehicle Info" },
    { id: 2, name: "Feedback" },
    { id: 3, name: "Additional Details" },
    { id: 4, name: "Submit" }
  ];
  
  const feedbackCategories: FeedbackCategory[] = [
    {
      key: 'safetyIssues',
      title: 'Safety Issues',
      icon: <AlertTriangle size={20} />,
      color: 'red',
      items: [
        "Rash driving", "Unsafe driving", "Using phone while driving", 
        "Driving under influence", "Not following traffic rules", "Over-speeding",
        "Improper lane changes", "Ignoring traffic signals"
      ]
    },
    {
      key: 'vehicleCondition',
      title: 'Vehicle Condition',
      icon: <Car size={20} />,
      color: 'orange',
      items: [
        "Poor vehicle condition", "Uncomfortable seating", "Poor shock absorbers", 
        "Cleanliness issues", "AC/ventilation problems", "Seatbelt functionality",
        "Door/window functionality", "Vehicle odor", "Windshield broken"
      ]
    },
    {
      key: 'driverBehavior',
      title: 'Driver Behavior',
      icon: <User size={20} />,
      color: 'purple',
      items: [
        "Rude communication", "Unnecessary arguments", "Inappropriate comments",
        "Unwanted conversation", "Refusal to follow route preferences", 
        "Pressuring for tips", "Smoking in vehicle", "Name calling", "Spitting on road"
      ]
    },
    {
      key: 'noiseIssues',
      title: 'Noise Issues',
      icon: <Volume2 size={20} />,
      color: 'yellow',
      items: [
        "Excessive honking", "Loud music", "Distracting conversations (phone)",
        "Vehicle noise issues"
      ]
    },
    {
      key: 'rideExperience',
      title: 'Ride Experience',
      icon: <Navigation size={20} />,
      color: 'blue',
      items: [
        "Overcharging", "Taking longer routes", "Abrupt stops and starts",
        "Refusing to use meter/app pricing", "Ride cancellation after accepting",
        "Delay in arrival", "Uncomfortable driving style", "Jumping on bumps"
      ]
    },
    {
      key: 'positivePoints',
      title: 'Positive Points',
      icon: <ShieldAlert size={20} />,
      color: 'green',
      items: [
        "Professional driving", "Clean vehicle", "Courteous behavior",
        "Good navigation skills", "Comfortable ride", "Punctuality",
        "Safe driving practices", "Helpful with luggage/special needs",
        "Respects privacy", "Follows traffic rules", "Comfortable seats"
      ]
    }
  ];

  const handleToggleFeedbackItem = (category: keyof FeedbackItems, item: string): void => {
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
  
  const toggleCategoryExpansion = (category: keyof FeedbackItems): void => {
    setExpandedCategories(prev => {
      const newSet = new Set(prev);
      if (newSet.has(category)) {
        newSet.delete(category);
      } else {
        newSet.add(category);
      }
      return newSet;
    });
  };
  
  const handleScanQR = (): void => {
    setShowQRScanner(true);
    // Simulate QR scan
    setTimeout(() => {
      setVehicleNumber('UP14 QT 7931');
      setShowQRScanner(false);
    }, 1500);
  };
  
  const handleSubmit = (): void => {
    // In a real app, this would send the data to your backend
    
    toast.success('Feedback submitted successfully. Thank you for making rides safer!');
    // Reset form
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
    setExpandedCategories(new Set());
  };
  
  const nextStep = (): void => {

    
    if (activeStep < steps.length) {
      setActiveStep(activeStep + 1);
    }
  };

//  new button 

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
  
  const totalIssues = Object.values(feedbackItems).flat().length - feedbackItems.positivePoints.length;
  
  const getColorClasses = (color: string, isSelected: boolean = false): string => {
    const colorMap = {
      red: isSelected ? 'bg-red-600 text-white' : 'border-red-300 hover:bg-red-50',
      orange: isSelected ? 'bg-orange-600 text-white' : 'border-orange-300 hover:bg-orange-50',
      purple: isSelected ? 'bg-purple-600 text-white' : 'border-purple-300 hover:bg-purple-50',
      yellow: isSelected ? 'bg-yellow-600 text-white' : 'border-yellow-300 hover:bg-yellow-50',
      blue: isSelected ? 'bg-blue-600 text-white' : 'border-blue-300 hover:bg-blue-50',
      green: isSelected ? 'bg-green-600 text-white' : 'border-green-300 hover:bg-green-50'
    };
    return colorMap[color as keyof typeof colorMap] || 'border-gray-300 hover:bg-gray-50';
  };
  
  const FeedbackCategoryComponent: React.FC<{ category: FeedbackCategory }> = ({ category }) => {
    const isExpanded = expandedCategories.has(category.key);
    const selectedCount = feedbackItems[category.key].length;
    
    return (
      <div className="mb-4 border border-gray-200 rounded-lg overflow-hidden">
        <button
          onClick={() => toggleCategoryExpansion(category.key)}
          className={`w-full p-4 text-left transition-colors duration-200 ${
            selectedCount > 0 
              ? category.key === 'positivePoints' 
                ? 'bg-green-50 border-green-200' 
                : 'bg-red-50 border-red-200'
              : 'bg-gray-50 hover:bg-gray-100'
          }`}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className={`p-2 rounded-lg ${
                selectedCount > 0 
                  ? category.key === 'positivePoints' 
                    ? 'bg-green-100 text-green-600' 
                    : 'bg-red-100 text-red-600'
                  : 'bg-gray-100 text-gray-600'
              }`}>
                {category.icon}
              </div>
              <div>
                <h3 className="font-semibold text-lg">{category.title}</h3>
                {selectedCount > 0 && (
                  <p className="text-sm text-gray-600">
                    {selectedCount} feedback{selectedCount !== 1 ? 's' : ''} selected
                  </p>
                )}
              </div>
            </div>
            <div className="flex items-center space-x-2">
              {selectedCount > 0 && (
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  category.key === 'positivePoints' 
                    ? 'bg-green-200 text-green-800' 
                    : 'bg-red-200 text-red-800'
                }`}>
                  {selectedCount}
                </span>
              )}
              {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
            </div>
          </div>
        </button>
        
        {isExpanded && (
          <div className="p-4 bg-white border-t border-gray-200">
            <div className="flex flex-wrap gap-2">
              {category.items.map((item) => {
                const isSelected = feedbackItems[category.key].includes(item);
                return (
                  <button
                    key={item}
                    onClick={() => handleToggleFeedbackItem(category.key, item)}
                    className={`px-3 py-2 rounded-lg text-sm border transition-all duration-200 ${
                      isSelected
                        ? getColorClasses(category.color, true)
                        : `bg-white ${getColorClasses(category.color, false)}`
                    }`}
                  >
                    {item}
                    {isSelected && (
                      <span className="ml-2">
                        <Check size={14} className="inline" />
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>
    );
  };
  
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-blue-600 text-white py-4 px-4 shadow-md">
        <div className="max-w-3xl mx-auto flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">TASC</h1>
            <p className="text-sm opacity-80">Thoda Aaram Se Chalaiye</p>
          </div>
          <div className="text-right">
            <p className="text-xs opacity-80">The Right Ride Way</p>
            <p className="text-sm font-medium">Passenger First</p>
          </div>
        </div>
      </header>
      
      {/* Progress Steps */}
      <div className="max-w-3xl mx-auto px-4 py-4 mt-25">
        <div className="flex justify-between mb-8">
          {steps.map((step) => (
            <div key={step.id} className="flex flex-col items-center">
              <div 
                className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  activeStep >= step.id 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-200 text-gray-600'
                }`}
              >
                {activeStep > step.id ? <Check size={16} /> : step.id}
              </div>
              <span className={`text-xs mt-1 ${activeStep >= step.id ? 'text-blue-600' : 'text-gray-500'}`}>
                {step.name}
              </span>
            </div>
          ))}
        </div>
      
        {/* Main Content */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          {activeStep === 1 && (
            <div>
              <h2 className="text-xl font-bold mb-4">Vehicle Information</h2>
              <p className="mb-4 text-gray-600">
                Please scan the QR code displayed in the vehicle or enter the vehicle number manually.
              </p>
              
              {showQRScanner ? (
                <div className="bg-gray-100 rounded-lg p-4 mb-4 text-center">
                  <div className="w-full h-48 bg-black rounded-lg flex items-center justify-center text-white mb-2">
                    <div className="animate-pulse">Scanning QR Code...</div>
                  </div>
                  <button 
                    className="px-4 py-2 bg-red-500 text-white rounded-lg"
                    onClick={() => setShowQRScanner(false)}
                  >
                    <X size={16} className="inline mr-1" /> Cancel
                  </button>
                </div>
              ) : (
                <div className="flex mb-6">
                  <input
                    type="text"
                    placeholder="Vehicle Number (e.g., UP14 QT 7931)"
                    className="flex-1 p-3 border rounded-l-lg"
                    value={vehicleNumber}
                    onChange={(e) => setVehicleNumber(e.target.value)}
                  />
                  <button 
                    className="bg-blue-600 text-white p-3 rounded-r-lg"
                    onClick={handleScanQR}
                  >
                    <QrCode size={20} className="inline mr-2" />
                    Scan QR
                  </button>
                </div>
              )}
              
              <div className="flex justify-end mt-6">
                <button
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg disabled:bg-gray-300"
                  onClick={nextStep}
                  disabled={!vehicleNumber}
                >
                  Next <ChevronRight size={16} className="inline ml-1" />
                </button>
              </div>
            </div>
          )}
          
          {activeStep === 2 && (
            <div>
              <h2 className="text-xl font-bold mb-4">Ride Feedback</h2>
              <p className="mb-4 text-gray-600">
                Please select all the issues you experienced during your ride with <strong>{vehicleNumber}</strong>.
              </p>
              
              <div className="mb-6">
                {feedbackCategories.map((category) => (
                  <FeedbackCategoryComponent key={category.key} category={category} />
                ))}
              </div>
              
              <div className="flex justify-between mt-6">
                <button
                  className="px-6 py-2 bg-gray-300 text-gray-700 rounded-lg"
                  onClick={prevStep}
                >
                  Back
                </button>
                <button
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg"
                  onClick={nextbutton}
                >
                  Next <ChevronRight size={16} className="inline ml-1" />
                </button>
              </div>
            </div>
          )}
          
          {activeStep === 3 && (
            <div>
              <h2 className="text-xl font-bold mb-4">Additional Details</h2>
              
              <div className="mb-6">
                <label className="block text-gray-700 mb-2">Add Photos (Optional)</label>
                {!photoTaken ? (
                  <button 
                    className="w-full border-2 border-dashed border-gray-300 rounded-lg p-8 flex flex-col items-center justify-center text-gray-500 hover:bg-gray-50"
                    onClick={() => setPhotoTaken(true)}
                  >
                    <Camera size={36} className="mb-2" />
                    <span>Take a photo or upload from gallery</span>
                  </button>
                ) : (
                  <div className="relative">
                    <div className="bg-gray-200 rounded-lg h-48 flex items-center justify-center">
                      <span className="text-gray-500">Photo added</span>
                    </div>
                    <button 
                      className="absolute top-2 right-2 bg-red-600 text-white p-1 rounded-full"
                      onClick={() => setPhotoTaken(false)}
                    >
                      <X size={16} />
                    </button>
                  </div>
                )}
              </div>
              
              <div className="mb-6">
                <label className="block text-gray-700 mb-2">Additional Comments</label>
                <textarea
                  className="w-full border border-gray-300 rounded-lg p-3 h-32"
                  placeholder="Please provide any additional details about your experience..."
                  value={additionalComments}
                  onChange={(e) => setAdditionalComments(e.target.value)}
                ></textarea>
              </div>
              
              <div className="flex justify-between mt-6">
                <button
                  className="px-6 py-2 bg-gray-300 text-gray-700 rounded-lg"
                  onClick={prevStep}
                >
                  Back
                </button>
                <button
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg"
                  onClick={nextStep}
                >
                  Review <ChevronRight size={16} className="inline ml-1" />
                </button>
              </div>
            </div>
          )}
          
          {activeStep === 4 && (
            <div>
              <h2 className="text-xl font-bold mb-4">Review & Submit</h2>
              
              <div className="bg-gray-50 p-4 rounded-lg mb-6">
                <div className="flex justify-between mb-4">
                  <span className="font-semibold">Vehicle Number:</span>
                  <span>{vehicleNumber}</span>
                </div>
                
                <div className="mb-4">
                  <h3 className="font-semibold mb-2">Issues Reported: {totalIssues}</h3>
                  <div className="space-y-2">
                    {(['safetyIssues', 'vehicleCondition', 'driverBehavior', 'noiseIssues', 'rideExperience'] as Array<keyof FeedbackItems>).map(category => (
                      feedbackItems[category].length > 0 && (
                        <div key={category} className="text-sm">
                          <span className="text-gray-600 capitalize">{category.replace(/([A-Z])/g, ' $1').trim()}:</span>
                          <span className="ml-2">{feedbackItems[category].join(', ')}</span>
                        </div>
                      )
                    ))}

                  </div>
                </div>
                
                {feedbackItems.positivePoints.length > 0 && (
                  <div className="mb-4">
                    <h3 className="font-semibold mb-2">Positive Points: {feedbackItems.positivePoints.length}</h3>
                    <div className="text-sm">
                      {feedbackItems.positivePoints.join(', ')}
                    </div>
                  </div>
                )}
                
                {additionalComments && (
                  <div className="mb-4">
                    <h3 className="font-semibold mb-2">Additional Comments:</h3>
                    <div className="text-sm bg-white p-2 rounded border border-gray-200">
                      {additionalComments}
                    </div>
                  </div>
                )}
                
                {photoTaken && (
                  <div className="mb-4">
                    <h3 className="font-semibold mb-2">Photos Attached: 1</h3>
                  </div>
                )}
              </div>
              
              <div className="mb-6 bg-blue-50 p-4 rounded-lg border border-blue-100">
                <p className="text-sm text-blue-800">
                  <span className="font-bold">Thank you for your feedback!</span> Your contribution helps improve passenger safety and ride quality for everyone.
                </p>
              </div>
              
              <div className="flex justify-between mt-6">
                <button
                  className="px-6 py-2 bg-gray-300 text-gray-700 rounded-lg"
                  onClick={prevStep}
                >
                  Back
                </button>
                <button
                  className="px-6 py-2 bg-green-600 text-white rounded-lg flex items-center"
                  onClick={handleSubmit}
                >
                  <Send size={16} className="mr-2" />
                  Submit Feedback
                </button>
              </div>
            </div>
          )}
        </div>
        

      </div>
    </div>
  );
}