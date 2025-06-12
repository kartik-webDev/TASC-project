"use client"

import { useRef, useState } from 'react';
import { Camera, Check, X, Star, ThumbsUp, ThumbsDown, ChevronRight, QrCode, Send, AlertTriangle, Heart, CheckCircle2, XCircle, Shield, Car, User, Volume2, Navigation, Smile, MessageSquare, Aperture } from 'lucide-react';
import { JSX } from 'react';
import toast from 'react-hot-toast';
// Proper TypeScript types
type FeedbackCategory = 'safetyIssues' | 'vehicleCondition' | 'driverBehavior' | 'noiseIssues' | 'rideExperience';
interface FeedbackItems {
  safetyIssues: { positive: string[]; negative: string[] };
  vehicleCondition: { positive: string[]; negative: string[] };
  driverBehavior: { positive: string[]; negative: string[] };
  noiseIssues: { positive: string[]; negative: string[] };
  rideExperience: { positive: string[]; negative: string[] };
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
  safetyIssues: { positive: [], negative: [] },
  vehicleCondition: { positive: [], negative: [] },
  driverBehavior: { positive: [], negative: [] },
  noiseIssues: { positive: [], negative: [] },
  rideExperience: { positive: [], negative: [] }
});
  const [showQRScanner, setShowQRScanner] = useState<boolean>(false);
  const [photoTaken, setPhotoTaken] = useState<boolean>(false);
  const [additionalComments, setAdditionalComments] = useState<string>('');
  const [activeFeedbackCategory, setActiveFeedbackCategory] = useState<FeedbackCategory | null>(null);

     const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [photo, setPhoto] = useState<string | null>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);

  const startCamera = async () => {
    try {
      const videoStream = await navigator.mediaDevices.getUserMedia({ video: true });
      setStream(videoStream);
      if (videoRef.current) {
        videoRef.current.srcObject = videoStream;
        videoRef.current.play();
      }
      setPhoto(null); // Clear previous photo when restarting camera
    } catch (error) {
      console.error('Error accessing camera:', error);
    }
  };

  const capturePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const context = canvasRef.current.getContext('2d');
      if (context) {
        context.drawImage(videoRef.current, 0, 0, 320, 240);
        const imageData = canvasRef.current.toDataURL('image/jpeg');
        setPhoto(imageData);
        stopCamera(); // Turn off camera after capturing
      }
    }
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
      setStream(null);
    }
  };

  const retakePhoto = () => {
    setPhoto(null); // Remove captured image
    startCamera(); // Restart the camera immediately
  };
  
  const steps: Step[] = [
    { id: 1, name: "Vehicle Info", icon: <QrCode size={16} /> },
    { id: 2, name: "Feedback", icon: <Star size={16} /> },
    { id: 3, name: "Details", icon: <Camera size={16} /> },
    { id: 4, name: "Submit", icon: <Send size={16} /> }
  ];
  
const feedbackData = {
  safetyIssues: {
    title: "🚨 Safety",
    icon: <AlertTriangle className="text-red-500" size={20} />,
    color: "red",
    items: {
      negative: [
        "Rash driving", "Unsafe driving", "Using phone while driving",
        "Driving under influence", "Not following traffic rules", "Over-speeding",
        "Improper lane changes", "Ignoring traffic signals"
      ],
      positive: [
        "Safe driving practices", "Follows traffic rules", "Maintains safe speed",
        "Professional lane changes", "Respects traffic signals", "Defensive driving"
      ]
    }
  },
  vehicleCondition: {
    title: "🚗 Vehicle Condition",
    icon: <XCircle className="text-orange-500" size={20} />,
    color: "orange",
    items: {
      negative: [
        "Poor vehicle condition", "Uncomfortable seating", "Poor shock absorbers",
        "Cleanliness issues", "AC/ventilation problems", "Seatbelt functionality",
        "Door/window functionality", "Vehicle odor", "Windshield broken"
      ],
      positive: [
        "Clean vehicle", "Comfortable seats", "Good shock absorbers",
        "Excellent cleanliness", "Perfect AC/ventilation", "All safety features working",
        "Well-maintained interior", "Pleasant vehicle condition"
      ]
    }
  },
  driverBehavior: {
    title: "👤 Driver Behavior",
    icon: <X className="text-purple-500" size={20} />,
    color: "purple",
    items: {
      negative: [
        "Rude communication", "Unnecessary arguments", "Inappropriate comments",
        "Unwanted conversation", "Refusal to follow route preferences",
        "Pressuring for tips", "Smoking in vehicle", "Name calling", "Spitting on road"
      ],
      positive: [
        "Courteous behavior", "Professional communication", "Respects privacy",
        "Helpful with luggage/special needs", "Polite and friendly", "Maintains boundaries",
        "Good conversation skills", "Respectful attitude"
      ]
    }
  },
  noiseIssues: {
    title: "🔊 Noise Issues",
    icon: <X className="text-yellow-500" size={20} />,
    color: "yellow",
    items: {
      negative: [
        "Excessive honking", "Loud music", "Distracting conversations (phone)",
        "Vehicle noise issues", "Disturbing sounds", "Too much talking"
      ],
      positive: [
        "Appropriate music volume", "Minimal honking", "Quiet vehicle operation",
        "Pleasant audio environment", "Respectful phone usage", "Comfortable noise levels"
      ]
    }
  },
  rideExperience: {
    title: "🛣️ Ride Experience",
    icon: <X className="text-pink-500" size={20} />,
    color: "pink",
    items: {
      negative: [
        "Overcharging", "Taking longer routes", "Abrupt stops and starts",
        "Refusing to use meter/app pricing", "Ride cancellation after accepting",
        "Delay in arrival", "Uncomfortable driving style", "Jumping on bumps"
      ],
      positive: [
        "Good navigation skills", "Comfortable ride", "Punctuality",
        "Smooth driving style", "Efficient route selection", "Fair pricing",
        "Timely arrival", "Professional service"
      ]
    }
  }
};

// conuts positive negative values for step 4

const getTotalPositiveCount = () => {
  return Object.values(feedbackItems).reduce((total, category) => {
    return total + category.positive.length;
  }, 0);
};

const getTotalNegativeCount = () => {
  return Object.values(feedbackItems).reduce((total, category) => {
    return total + category.negative.length;
  }, 0);
};

const getOverallTotalCount = (): number => {
  return Object.values(feedbackItems).reduce(
    (total, category) => total + category.positive.length + category.negative.length,
    0
  );
};
const getCategoryTotalCount = (category: keyof FeedbackItems): number => {
  return feedbackItems[category]?.positive.length + feedbackItems[category]?.negative.length || 0;
};
  
const handleToggleFeedbackItem = (category: FeedbackCategory, item: string, type: 'positive' | 'negative') => {
  setFeedbackItems(prev => {
    const categoryItems = prev[category][type];
    const isSelected = categoryItems.includes(item);
    
    return {
      ...prev,
      [category]: {
        ...prev[category],
        [type]: isSelected 
          ? categoryItems.filter(i => i !== item)
          : [...categoryItems, item]
      }
    };
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
    safetyIssues: { positive: [], negative: [] },
    vehicleCondition: { positive: [], negative: [] },
    driverBehavior: { positive: [], negative: [] },
    noiseIssues: { positive: [], negative: [] },
    rideExperience: { positive: [], negative: [] }
  });

  setAdditionalComments('');
  setPhotoTaken(false);
  setActiveFeedbackCategory(null);

  // remove photo from state after full submission
  setPhoto(null)
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
     
      default:
        return <Star {...iconProps} />;
    }
  };
  
 const getCategoryPositiveCount = (category: keyof FeedbackItems): number => {
  return feedbackItems[category]?.positive.length || 0;
};

const getCategoryNegativeCount = (category: keyof FeedbackItems): number => {
  return feedbackItems[category]?.negative.length || 0;
};
  
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
          
        </div>

      </div>
    );
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">

      
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
        const positiveCount = feedbackItems[category].positive.length;
        const negativeCount = feedbackItems[category].negative.length;
        const totalCount = positiveCount + negativeCount;
        
        return (
          <button
            key={category}
            onClick={() => setActiveFeedbackCategory(activeFeedbackCategory === category ? null : category)}
            className={`relative p-6 rounded-3xl border-3 transition-all duration-300 transform hover:scale-105 hover:shadow-xl group ${
              activeFeedbackCategory === category
                ? 'bg-gradient-to-br from-blue-50 to-indigo-100 border-blue-300 shadow-lg'
                : totalCount > 0
                  ? 'bg-blue-50 border-blue-200 shadow-md'
                  : 'bg-white border-gray-200 hover:border-gray-300 shadow-sm'
            }`}
          >
            {/* Category Icon */}
            <div className={`w-16 h-16 mx-auto mb-4 rounded-2xl flex items-center justify-center transition-all duration-300 ${
              activeFeedbackCategory === category
                ? 'bg-blue-500 shadow-lg'
                : totalCount > 0
                  ? 'bg-blue-400'
                  : 'bg-gray-300 group-hover:bg-gray-400'
            }`}>
              {getCategoryIcon(category)}
            </div>
            
            {/* Category Title */}
            <h3 className="font-bold text-lg text-gray-800 mb-2 text-center">
              {data.title.replace(/[🚨🚗👤🔊🛣️]/g, '').trim()}
            </h3>
            
            {/* Count Badges */}
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
            
            {/* Active Indicator */}
            {activeFeedbackCategory === category && (
              <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
            )}
          </button>
        );
      })}
    </div>
    
    {/* Active Feedback Section */}
    {activeFeedbackCategory && (
      <div className="mb-12">
        <div className="p-8 rounded-3xl border-2 bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200 transition-all duration-500 transform">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 rounded-2xl flex items-center justify-center bg-blue-500">
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
          
          {/* Positive Feedback Section */}
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <Heart size={20} className="text-green-500" />
              <h4 className="text-lg font-bold text-green-700">What went well?</h4>
              {feedbackItems[activeFeedbackCategory].positive.length > 0 && (
                <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                  {feedbackItems[activeFeedbackCategory].positive.length}
                </span>
              )}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {feedbackData[activeFeedbackCategory].items.positive.map((item) => {
                const isSelected = feedbackItems[activeFeedbackCategory].positive.includes(item);
                
                return (
                  <button
                    key={item}
                    onClick={() => handleToggleFeedbackItem(activeFeedbackCategory, item, 'positive')}
                    className={`p-4 rounded-2xl text-left font-medium transition-all duration-200 transform hover:scale-102 ${
                      isSelected
                        ? 'bg-green-500 text-white shadow-lg'
                        : 'bg-white hover:bg-green-50 text-gray-700 border-2 border-gray-200 hover:border-green-300'
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
          
          {/* Negative Feedback Section */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <AlertTriangle size={20} className="text-red-500" />
              <h4 className="text-lg font-bold text-red-700">What needs improvement?</h4>
              {feedbackItems[activeFeedbackCategory].negative.length > 0 && (
                <span className="px-2 py-1 bg-red-100 text-red-700 rounded-full text-xs font-medium">
                  {feedbackItems[activeFeedbackCategory].negative.length}
                </span>
              )}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {feedbackData[activeFeedbackCategory].items.negative.map((item) => {
                const isSelected = feedbackItems[activeFeedbackCategory].negative.includes(item);
                
                return (
                  <button
                    key={item}
                    onClick={() => handleToggleFeedbackItem(activeFeedbackCategory, item, 'negative')}
                    className={`p-4 rounded-2xl text-left font-medium transition-all duration-200 transform hover:scale-102 ${
                      isSelected
                        ? 'bg-red-500 text-white shadow-lg'
                        : 'bg-white hover:bg-red-50 text-gray-700 border-2 border-gray-200 hover:border-red-300'
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
      </div>
    )}
    
    {/* Summary Stats */}
    <div className="grid grid-cols-2 gap-6 mb-8">
      <div className="bg-gradient-to-br from-red-50 to-rose-100 p-6 rounded-3xl border-2 border-red-200">
        <div className="flex items-center gap-3 mb-2">
          <AlertTriangle className="text-red-500" size={24} />
          <h3 className="font-bold text-lg text-red-700">Issues Reported</h3>
        </div>
        <p className="text-3xl font-black text-red-600">{getTotalNegativeCount()}</p>
      </div>
      
      <div className="bg-gradient-to-br from-green-50 to-emerald-100 p-6 rounded-3xl border-2 border-green-200">
        <div className="flex items-center gap-3 mb-2">
          <Heart className="text-green-500" size={24} />
          <h3 className="font-bold text-lg text-green-700">Positive Points</h3>
        </div>
        <p className="text-3xl font-black text-green-600">{getTotalPositiveCount()}</p>
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
        onClick={nextStep}
      >
        Continue <ChevronRight size={20} />
      </button>
    </div>
  </div>
)}


   {/* photos and comment section step-3 */}
  {activeStep === 3 && (
  <div className="p-10">
    <div className="text-center mb-8">
      <h2 className="text-3xl font-bold text-gray-800 mb-3">Additional Details</h2>
      <p className="text-gray-600 text-lg">
        Add photos and comments to support your feedback
      </p>
    </div>

    <div className="max-w-3xl mx-auto space-y-8">
      {/* Photo Capture Section */}
      <div>
        <label className="block text-gray-700 font-semibold mb-4 text-lg">
          📸 Add Photos (Optional)
        </label>
        {!photo ? (
          <div className="w-full border-2 border-dashed border-gray-300 hover:border-blue-400 rounded-3xl p-12 flex flex-col items-center justify-center text-gray-500 hover:text-blue-500 hover:bg-blue-50 transition-all duration-200 group">
            <video ref={videoRef} width="320" height="240" autoPlay muted className="border rounded-lg" />
            <canvas ref={canvasRef} width="320" height="240" style={{ display: "none" }} />
  <div className="flex space-x-4">
  {/* Start Camera Button */}
  <button
    onClick={startCamera}
    className="p-3 bg-blue-600 hover:bg-blue-700 text-white rounded-full transition-all duration-200 shadow-md hover:shadow-lg flex items-center justify-center"
  >
    <Camera className="w-6 h-6" />
  </button>

  {/* Capture Photo Button */}
  <button
    onClick={capturePhoto}
    className="p-3 bg-green-600 hover:bg-green-700 text-white rounded-full transition-all duration-200 shadow-md hover:shadow-lg flex items-center justify-center"
  >
    <Aperture className="w-6 h-6" />
  </button>
</div>

          </div>
        ) : (
          <div className="relative bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200 rounded-3xl p-8 flex flex-col items-center">
            <img src={photo} alt="Captured" width="320" height="240" className="border rounded-lg" />
            <div className="text-center mt-4">
              <CheckCircle2 className="mx-auto text-green-500 mb-4" size={48} />
              <span className="text-green-700 font-medium text-lg">Photo successfully added</span>
            </div>
            <button
              className="absolute top-4 right-4 bg-red-500 hover:bg-red-600 text-white p-2 rounded-full transition-colors"
              onClick={retakePhoto}
            >
              <X size={16} />
            </button>
          </div>
        )}
      </div>

      {/* Additional Comments Section */}
      <div>
        <label className="block text-gray-700 font-semibold mb-4 text-lg">
          💬 Additional Comments
        </label>
        <textarea
          className="w-full border-2 border-gray-200 focus:border-blue-400 focus:ring-4 focus:ring-blue-100 rounded-2xl p-6 h-40 text-lg resize-none transition-all duration-200"
          placeholder="Share any additional details about your ride experience..."
          value={additionalComments}
          onChange={(e) => setAdditionalComments(e.target.value)}
        />
      </div>
    </div>

    {/* Navigation Buttons */}
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


  {/* final step */}

  {activeStep === 4 && (
  <div>
    <div className="text-center mb-12">
      <h2 className="text-3xl font-bold text-gray-800 mb-3">Feedback Summary</h2>
      <p className="text-gray-600 text-lg">
        Review your feedback for vehicle <span className="font-bold text-blue-600">{vehicleNumber}</span>
      </p>
    </div>

    {/* Overall Stats Cards */}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
      <div className="bg-gradient-to-br from-blue-50 to-indigo-100 p-8 rounded-3xl border-2 border-blue-200 text-center">
        <div className="w-16 h-16 mx-auto mb-4 bg-blue-500 rounded-2xl flex items-center justify-center">
          <MessageSquare className="text-white" size={32} />
        </div>
        <h3 className="font-bold text-2xl text-blue-700 mb-2">Total Feedback</h3>
        <p className="text-4xl font-black text-blue-600">{getOverallTotalCount()}</p>
        <p className="text-blue-600 text-sm mt-2">Items Selected</p>
      </div>

      <div className="bg-gradient-to-br from-green-50 to-emerald-100 p-8 rounded-3xl border-2 border-green-200 text-center">
        <div className="w-16 h-16 mx-auto mb-4 bg-green-500 rounded-2xl flex items-center justify-center">
          <ThumbsUp className="text-white" size={32} />
        </div>
        <h3 className="font-bold text-2xl text-green-700 mb-2">Positive Points</h3>
        <p className="text-4xl font-black text-green-600">{getTotalPositiveCount()}</p>
        <p className="text-green-600 text-sm mt-2">Things Done Well</p>
      </div>

      <div className="bg-gradient-to-br from-red-50 to-rose-100 p-8 rounded-3xl border-2 border-red-200 text-center">
        <div className="w-16 h-16 mx-auto mb-4 bg-red-500 rounded-2xl flex items-center justify-center">
          <AlertTriangle className="text-white" size={32} />
        </div>
        <h3 className="font-bold text-2xl text-red-700 mb-2">Issues Reported</h3>
        <p className="text-4xl font-black text-red-600">{getTotalNegativeCount()}</p>
        <p className="text-red-600 text-sm mt-2">Areas for Improvement</p>
      </div>
    </div>

    {/* Category Breakdown */}
    <div className="mb-12">
      <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">Category Breakdown</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {(Object.keys(feedbackData) as FeedbackCategory[]).map((category) => {
          const data = feedbackData[category];
          const positiveCount = getCategoryPositiveCount(category);
          const negativeCount = getCategoryNegativeCount(category);
          const totalCount = getCategoryTotalCount(category);
          
          if (totalCount === 0) return null; // Don't show categories with no feedback
          
          return (
            <div key={category} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <div className="flex items-center gap-3 mb-4">
                {data.icon}
                <h4 className="font-bold text-lg text-gray-800">
                  {data.title.replace(/[🚨🚗👤🔊🛣️]/g, '').trim()}
                </h4>
              </div>
              
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Total Feedback:</span>
                  <span className="font-bold text-gray-800">{totalCount}</span>
                </div>
                
                {positiveCount > 0 && (
                  <div className="flex justify-between items-center">
                    <span className="text-green-600 flex items-center gap-1">
                      <ThumbsUp size={16} />
                      Positive:
                    </span>
                    <span className="font-bold text-green-600">{positiveCount}</span>
                  </div>
                )}
                
                {negativeCount > 0 && (
                  <div className="flex justify-between items-center">
                    <span className="text-red-600 flex items-center gap-1">
                      <AlertTriangle size={16} />
                      Issues:
                    </span>
                    <span className="font-bold text-red-600">{negativeCount}</span>
                  </div>
                )}
                
                {/* Progress bar */}
                <div className="mt-4">
                  <div className="flex text-xs text-gray-500 mb-1">
                    <span>Feedback Distribution</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2 flex overflow-hidden">
                    {positiveCount > 0 && (
                      <div 
                        className="bg-green-500 h-2"
                        style={{ width: `${(positiveCount / totalCount) * 100}%` }}
                      />
                    )}
                    {negativeCount > 0 && (
                      <div 
                        className="bg-red-500 h-2"
                        style={{ width: `${(negativeCount / totalCount) * 100}%` }}
                      />
                    )}
                  </div>
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>{positiveCount > 0 ? `${Math.round((positiveCount / totalCount) * 100)}% Positive` : ''}</span>
                    <span>{negativeCount > 0 ? `${Math.round((negativeCount / totalCount) * 100)}% Issues` : ''}</span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>

    {/* Detailed Feedback Lists */}
    {(getTotalPositiveCount() > 0 || getTotalNegativeCount() > 0) && (
      <div className="mb-12">
        <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">Detailed Feedback</h3>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Positive Feedback */}
          {getTotalPositiveCount() > 0 && (
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-2xl border-2 border-green-200">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-green-500 rounded-xl flex items-center justify-center">
                  <Heart className="text-white" size={20} />
                </div>
                <h4 className="text-xl font-bold text-green-700">What Went Well</h4>
                <span className="px-3 py-1 bg-green-500 text-white rounded-full text-sm font-bold">
                  {getTotalPositiveCount()}
                </span>
              </div>
              
              <div className="space-y-4">
                {(Object.keys(feedbackData) as FeedbackCategory[]).map((category) => {
                  const positiveItems = feedbackItems[category].positive;
                  if (positiveItems.length === 0) return null;
                  
                  return (
                    <div key={category}>
                      <h5 className="font-semibold text-green-800 mb-2">
                        {feedbackData[category].title.replace(/[🚨🚗👤🔊🛣️]/g, '').trim()}:
                      </h5>
                      <div className="flex flex-wrap gap-2">
                        {positiveItems.map((item, index) => (
                          <span key={index} className="px-3 py-1 bg-green-100 text-green-700 rounded-lg text-sm">
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
          
          {/* Negative Feedback */}
          {getTotalNegativeCount() > 0 && (
            <div className="bg-gradient-to-br from-red-50 to-rose-50 p-6 rounded-2xl border-2 border-red-200">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-red-500 rounded-xl flex items-center justify-center">
                  <AlertTriangle className="text-white" size={20} />
                </div>
                <h4 className="text-xl font-bold text-red-700">Issues to Address</h4>
                <span className="px-3 py-1 bg-red-500 text-white rounded-full text-sm font-bold">
                  {getTotalNegativeCount()}
                </span>
              </div>
              
              <div className="space-y-4">
                {(Object.keys(feedbackData) as FeedbackCategory[]).map((category) => {
                  const negativeItems = feedbackItems[category].negative;
                  if (negativeItems.length === 0) return null;
                  
                  return (
                    <div key={category}>
                      <h5 className="font-semibold text-red-800 mb-2">
                        {feedbackData[category].title.replace(/[🚨🚗👤🔊🛣️]/g, '').trim()}:
                      </h5>
                      <div className="flex flex-wrap gap-2">
                        {negativeItems.map((item, index) => (
                          <span key={index} className="px-3 py-1 bg-red-100 text-red-700 rounded-lg text-sm">
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    )}

    {/* Navigation */}
    <div className="flex justify-between items-center pt-8 border-t border-gray-200">
      <button
        className="px-8 py-4 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-2xl font-medium transition-colors flex items-center gap-2"
        onClick={prevStep}
      >
        ← Back to Feedback
      </button>
      <button
        className="px-8 py-4 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white rounded-2xl font-medium transition-all duration-200 flex items-center gap-2"
        onClick={handleSubmit}
      >
        Submit Feedback <Send size={20} />
      </button>
    </div>
  </div>
)}
            
            
      </div>
    </div>
        

      </div>
    </div>
  );
}