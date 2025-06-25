'use client'
import React, { useState, useEffect } from 'react';
import { 
  Camera, Check, X, Star, ChevronRight, QrCode, Send, 
  Shield, Car, User, Heart, Clock, ThumbsUp, ThumbsDown, 
  CheckCircle2, Volume2,SendHorizonal,
  AlertTriangle
} from 'lucide-react';
import type { JSX } from 'react';
import toast from 'react-hot-toast';

import { getTotalFeedbackCount } from '../lib/utils';

// Types



interface FeedbackCategory {
  id: string;
  name: string;
  icon: string;
  color: string;
  positive: string[];
  negative: string[];
}


interface AppConfig {

  steps: Step[];
  feedbackCategories: FeedbackCategory[];
  ui: {
    colors: Record<string, string>;
    messages: Record<string, string>;
  };
}

interface FeedbackData {
  [key: string]: {
    positive: string[];
    negative: string[];
  };
}


// Icon component mapper
const IconComponent: React.FC<{ name: string; size?: number; className?: string }> = ({ 
  name, size = 20, className = "" 
}) => {
  const icons: Record<string, any> = {
    shield: Shield,
    car: Car,
    user: User,
    volume2: Volume2,
    clock: Send,
    star: Star,
    camera: Camera,
    check: Check,
    x: X,
    qrcode: QrCode,
    send: Send,
    chevronright: ChevronRight,
    thumbsup: ThumbsUp,
    thumbsdown: ThumbsDown
  };
  
  const Icon = icons[name.toLowerCase()] || Star;
  return <Icon size={size} className={className} />;
};

  interface Step {
  id: number;
  name: string;
  icon: JSX.Element;
}

  const steps: Step[] = [
    { id: 1, name: "Vehicle Info", icon: <QrCode size={16} /> },
    { id: 2, name: "Feedback", icon: <Star size={16} /> },
    { id: 3, name: "Details", icon: <Camera size={16} /> },
    { id: 4, name: "Submit", icon: <Send size={16} /> }
  ];

// API service for database operations
class APIService {
  static async submitFeedback(data: {
    vehicleNumber: string;
    feedbackData: FeedbackData;
    additionalComments?: string;
    photoUrl?: string;
    hasPhoto?: boolean;
  }) {
    try {
      // backend url for feedback
      const response = await fetch("api/feedback", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      
      if (!response.ok) {
        throw new Error('Failed to submit feedback');
      }
      
      return await response.json();
    } catch (error) {
      console.error('API Error:', error);
      
      return { success: true, id: Date.now() };
    }
  }
}

export default function TASCApp(): JSX.Element {

  const [activeStep, setActiveStep] = useState<number>(1);
  const [vehicleNumber, setVehicleNumber] = useState<string>('');
  const [feedbackData, setFeedbackData] = useState<FeedbackData>({});
  const [activeFeedbackCategory, setActiveFeedbackCategory] = useState<string | null>(null);
  const [showQRScanner, setShowQRScanner] = useState<boolean>(false);
  const [photoTaken, setPhotoTaken] = useState<boolean>(false);
  const [additionalComments, setAdditionalComments] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [config, setConfig] = useState<AppConfig | null>(null);
  const [loading, setLoading] = useState(true);
  

  //  calling api to map the Data on frontend

    useEffect(() => {
    const fetchConfig = async () => {
      try {
        const response = await fetch(" http://localhost:3000/api/config");
        if (!response.ok) {
          throw new Error('Failed to fetch configuration');
        }
        const data = await response.json();
        const configData = data;
        console.log('Fetched config:', configData);
        setConfig(configData);
        
        // Initialize category feedback state
        const initialFeedback: Record<string, { positive: string[]; negative: string[] }> = {};
        configData.feedbackCategories.forEach((category: FeedbackCategory) => {
          initialFeedback[category.id] = { positive: [], negative: [] };
        });
        setFeedbackData(initialFeedback);
      } catch (error) {
        console.error('Error fetching configuration:', error);
        // You might want to show an error message to the user
      } finally {
        setLoading(false);
      }
    };

    fetchConfig();
  }, []);

  // function for select & deselect review button

  const handleToggleFeedbackItem = (
    categoryId: string,
    item: string,
    type: 'positive' | 'negative'
  ) => {
    setFeedbackData((prev) => {
      const existingCategory = prev[categoryId] || { positive: [], negative: [] };
      const items = existingCategory[type];

      const isSelected = items.includes(item);
      const updatedItems = isSelected
        ? items.filter((i) => i !== item)
        : [...items, item];

      return {
        ...prev,
        [categoryId]: {
          ...existingCategory,
          [type]: updatedItems
        }
      };
    });
  };
  

  const handleScanQR = () => {
    setShowQRScanner(true);
    setTimeout(() => {
      setVehicleNumber('UP14 QT 7931');
      setShowQRScanner(false);
    }, 1500);
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    
     if (!config) return;
    
    try {
      const result = await APIService.submitFeedback({
        vehicleNumber,
        feedbackData,
        additionalComments,
        hasPhoto: photoTaken,
        photoUrl: photoTaken ? 'mock-photo-url.jpg' : undefined
      });
      
      if (result.success) {
        toast.success(config.ui.messages.submitSuccess);
        resetForm();
      } else {
        alert('Failed to submit feedback. Please try again.');
      }
    } catch (error) {
      console.error('Submit error:', error);
      toast.error('An error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setActiveStep(1);
    setVehicleNumber('');
    setFeedbackData({});
    setActiveFeedbackCategory(null);
    setAdditionalComments('');
    setPhotoTaken(false);
  };

  const nextStep = () => {
    if (!config) return;
    if (activeStep < config.steps.length) {
      setActiveStep(activeStep + 1);
    }
  };

  // button for not proceed next without any review selected
  const nextbutton = (): void => {
      // Ensure at least one feedback item has been selected
    const hasFeedback = Object.values(feedbackData).some(({ positive, negative }) => positive.length > 0 || negative.length > 0);

    if (!hasFeedback) {
        toast.error("Please select atleast one feedback");
        return; // Stop execution if no feedback is selected
    }

    if (activeStep < steps.length - 1) {
        setActiveStep(activeStep + 1);
    }
};


  const prevStep = () => {
    if (activeStep > 1) {
      setActiveStep(activeStep - 1);
    }
  };

  const getTotalPositiveCount = () => {
  return Object.values(feedbackData).reduce((total, category) => {
    return total + category.positive.length;
  }, 0);
};
  const getTotalNegativeCount = () => {
  return Object.values(feedbackData).reduce((total, category) => {
    return total + category.negative.length;
  }, 0);
};

  const getOverallTotalCount = (): number => {
    return Object.values(feedbackData).reduce(
      (total, category) => total + category.positive.length + category.negative.length,
      0
    );
  };


  const getColorClass = (color: string, type: 'bg' | 'text' | 'border' = 'bg') => {
    const colorMap: Record<string, Record<string, string>> = {
      bg: {
        blue: 'bg-blue-500',
        green: 'bg-green-500',
        purple: 'bg-purple-500',
        pink: 'bg-pink-500',
        orange: 'bg-orange-500'
      },
      text: {
        blue: 'text-blue-600',
        green: 'text-green-600',
        purple: 'text-purple-600',
        pink: 'text-pink-600',
        orange: 'text-orange-600'
      },
      border: {
        blue: 'border-blue-300',
        green: 'border-green-300',
        purple: 'border-purple-300',
        pink: 'border-pink-300',
        orange: 'border-orange-300'
      }
    };
    
    return colorMap[type]?.[color] ?? colorMap[type]?.blue ?? '';
  };

  const FeedbackCategoryButton: React.FC<{
    category: FeedbackCategory;
    isActive: boolean;
    onClick: () => void;
  }> = ({ category, isActive, onClick }) => {
    const positiveCount = feedbackData[category.id]?.positive.length || 0;
    const negativeCount = feedbackData[category.id]?.negative.length || 0;
    const totalCount = positiveCount + negativeCount;

    return (
      <div className="relative group transition-transform duration-300 hover:scale-[1.060] active:scale-[0.97]">
        <button
          onClick={onClick}
          className={`w-full h-36 rounded-2xl border-2 transition-all duration-300 ease-in-out shadow-sm ${
            isActive
              ? `${getColorClass(category.color, 'border')} bg-white bg-opacity-10`
              : 'border-gray-200 hover:border-gray-300 hover:shadow-md'
          }`}
        >
          <div className="flex flex-col items-center justify-center h-full p-4 transition-all duration-300 group-hover:translate-y-[-1px]">
            <IconComponent
              name={category.icon}
              size={36}
              className={`transition-colors duration-300 ${
                isActive
                  ? getColorClass(category.color, 'text')
                  : 'text-gray-400 group-hover:text-gray-600'
              }`}
            />
            <span
              className={`text-sm font-semibold mt-2 tracking-wide transition-colors duration-300 ${
                isActive ? getColorClass(category.color, 'text') : 'text-gray-700'
              }`}
            >
              {category.name}
            </span>
            
              {totalCount > 0 && (
                <div className="absolute -top-2 -right-2 flex gap-1">
                  {positiveCount > 0 && (
                    <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center text-white text-xs font-bold">
                      {positiveCount}
                    </div>
                  )}
                  {negativeCount > 0 && (
                    <div className="w-6 h-6 rounded-full bg-red-500 flex items-center justify-center text-white text-xs font-bold">
                      {negativeCount}
                    </div>
                  )}
                </div>
              )}
          </div>
        </button>
      </div>
    );
  };

 const FeedbackSection: React.FC<{
  category: FeedbackCategory;
  type: 'positive' | 'negative';
}> = ({ category, type }) => {
  const items = category[type];
  const selectedItems = feedbackData[category.id]?.[type] || [];

  const styles = {
    positive: {
      bg: 'bg-green-50',
      border: 'border-green-200',
      text: 'text-green-700',
      active: 'bg-green-600',
    },
    negative: {
      bg: 'bg-red-50',
      border: 'border-red-200',
      text: 'text-red-700',
      active: 'bg-red-600',
    },

    
  };

  const { bg, border, text, active } = styles[type];

  return (
    <div className={`${bg} ${border} border rounded-xl p-5 shadow-sm h-full`}>
      <div className="flex items-center mb-4">
        <IconComponent
          name={type === 'positive' ? 'thumbsup' : 'thumbsdown'}
          size={20}
          className={text}
        />
        <h4 className={`ml-2 font-semibold text-base ${text}`}>
          {type === 'positive' ? 'Good Points' : 'Issues'}
        </h4>
      </div>

      <div className="space-y-2 overflow-y-auto max-h-auto pr-1">
        {items.map((item) => {
          const isSelected = selectedItems.includes(item);
          return (
            <button
              key={item}
              onClick={() => handleToggleFeedbackItem(category.id, item, type)}
              className={`w-full px-4 py-2 rounded-md text-sm flex justify-between items-center transition-all duration-200 ease-in-out ${
                isSelected
                  ? `${active} text-white shadow hover:brightness-105`
                  : 'bg-white border border-gray-200 text-gray-800 hover:bg-gray-50 hover:shadow-sm active:scale-[0.98]'
              }`}
            >
              <span className="truncate">{item}</span>
              {isSelected && (
                <IconComponent name="check" size={16} className="text-white ml-2" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};


  // loading circle
    if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading TASC...</p>
        </div>
      </div>
    );
  }

  // check things up before rendering for extera saftey

  if (!config) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600">Failed to load configuration. Please try again.</p>
        </div>
      </div>
    );
  }

  //  main UI
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      
      <div className="max-w-6xl mx-auto px-6 py-8">
       
      {/* Progress Steps */}
      
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

        {/* Main Content */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
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
              <h2 className="text-xl font-bold mb-4">Ride Feedback</h2>
              <p className="mb-6 text-gray-600">
                Select a category to provide feedback about your ride with <strong>{vehicleNumber}</strong>.
              </p>
              
              {/* Category Icons */}
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 mb-8">
                {config.feedbackCategories.map((category) => (
                  <FeedbackCategoryButton
                    key={category.id}
                    category={category}
                    isActive={activeFeedbackCategory === category.id}
                    onClick={() => setActiveFeedbackCategory(
                      activeFeedbackCategory === category.id ? null : category.id
                    )}
                  />
                ))}
              </div>
              
              {/* Feedback Details */}
              {activeFeedbackCategory && (
                <div className="mb-6">
                  {config.feedbackCategories
                    .filter(cat => cat.id === activeFeedbackCategory)
                    .map(category => (
                      <div key={category.id} className="space-y-4">
                        <h3 className="text-lg font-semibold mb-4 flex items-center">
                          <IconComponent 
                            name={category.icon} 
                            size={24} 
                            className={getColorClass(category.color, 'text')} 
                          />
                          <span className="ml-2">{category.name} Feedback</span>
                        </h3>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <FeedbackSection category={category} type="positive" />
                          <FeedbackSection category={category} type="negative" />
                        </div>

                        

                      </div>
                    ))}
                </div>
              )}
              {/* summary stats */}

              <div className="grid grid-cols-2 gap-6 mb-8 mt-10">

                <div className="bg-gradient-to-br from-green-50 to-emerald-100 p-6 rounded-3xl border-2 border-green-200">
                  <div className="flex items-center gap-3 mb-2">
                    <Heart className="text-green-500" size={24} />
                    <h3 className="font-bold text-lg text-green-700">Positive Points</h3>
                  </div>
                  <p className="text-3xl font-black text-green-600">{getTotalPositiveCount()}</p>
                </div>

                <div className="bg-gradient-to-br from-red-50 to-rose-100 p-6 rounded-3xl border-2 border-red-200">
                  <div className="flex items-center gap-3 mb-2">
                    <AlertTriangle className="text-red-500" size={24} />
                    <h3 className="font-bold text-lg text-red-700">Issues Reported</h3>
                  </div>
                  <p className="text-3xl font-black text-red-600">{getTotalNegativeCount()}</p>
                </div>
              </div>
              
              <div className="flex justify-between mt-8">
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
                  <h3 className="font-semibold mb-2">Total Feedback Items: {getTotalFeedbackCount(feedbackData)}</h3>
                  
                  {config.feedbackCategories.map(category => {
                    const positive = feedbackData[category.id]?.positive || [];
                    const negative = feedbackData[category.id]?.negative || [];
                    
                    if (positive.length === 0 && negative.length === 0) return null;
                    
                    return (
                      <div key={category.id} className="mb-4 p-3 bg-white rounded-lg border">
                        <h4 className="font-medium mb-2 flex items-center">
                          <IconComponent 
                            name={category.icon} 
                            size={20} 
                            className={getColorClass(category.color, 'text')} 
                          />
                          <span className="ml-2">{category.name}</span>
                        </h4>
                        
                        {positive.length > 0 && (
                          <div className="mb-2">
                            <span className="text-green-600 font-medium text-sm">Positive ({positive.length}):</span>
                            <div className="flex flex-wrap gap-1 mt-1">
                              {positive.map(item => (
                                <span key={item} className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">
                                  {item}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                        
                        {negative.length > 0 && (
                          <div>
                            <span className="text-red-600 font-medium text-sm">Issues ({negative.length}):</span>
                            <div className="flex flex-wrap gap-1 mt-1">
                              {negative.map(item => (
                                <span key={item} className="px-2 py-1 bg-red-100 text-red-800 rounded-full text-xs">
                                  {item}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
                
                {additionalComments && (
                  <div className="mb-4">
                    <h3 className="font-semibold mb-2">Additional Comments:</h3>
                    <div className="text-sm bg-white p-3 rounded border border-gray-200">
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
                  {config.ui.messages.reviewThankYou}
                </p>
              </div>
              
              <div className="flex justify-between mt-6">
                <button
                  className="px-6 py-2 bg-gray-300 text-gray-700 rounded-lg"
                  onClick={prevStep}
                  disabled={isSubmitting}
                >
                  Back
                </button>
                <button
                  className="px-6 py-2 bg-green-600 text-white rounded-lg flex items-center disabled:bg-gray-400"
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Submitting...
                    </>
                  ) : (
                    <>
                      <Send size={16} className="mr-2" />
                      Submit Feedback
                    </>
                  )}
                </button>
              </div>
            </div>
          )}
        </div>
        
       
      </div>
    </div>
  );
}