'use client'
import { useEffect, useRef, useState } from 'react';
import { Camera, Eye, ArrowLeft, RotateCw, Trash2, Play, ChevronLeft, ChevronRight, X } from 'lucide-react';

export default function CameraUI() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const [stream, setStream] = useState<MediaStream | null>(null);
  const [facingMode, setFacingMode] = useState<'user' | 'environment'>('environment');
  const [capturedImages, setCapturedImages] = useState<string[]>([]);
  const [isCameraOn, setIsCameraOn] = useState(false);
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const [isCapturing, setIsCapturing] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);

  const startCamera = async () => {
    try {
      const media = await navigator.mediaDevices.getUserMedia({
        video: { 
          facingMode,
          width: { ideal: 1280 },
          height: { ideal: 720 }
        },
        audio: false,
      });
      if (videoRef.current) {
        videoRef.current.srcObject = media;
        videoRef.current.play();
      }
      setStream(media);
    } catch (err) {
      console.error('Camera error:', err);
    }
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
    setIsCameraOn(false);
  };

  const flipCamera = () => {
    stopCamera();
    setFacingMode(prev => (prev === 'user' ? 'environment' : 'user'));
    setTimeout(() => {
      setIsCameraOn(true);
    }, 300);
  };

  const capturePhoto = () => {
    if (!videoRef.current || !canvasRef.current) return;

    if (capturedImages.length >= 4) {
      // Show a nicer alert
      return;
    }

    setIsCapturing(true);
    
    setTimeout(() => {
      const canvas = canvasRef.current;
      const video = videoRef.current;

      if (!canvas || !video) return;

      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;

      const ctx = canvas.getContext('2d');
      if (ctx) ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

      const imgUrl = canvas.toDataURL('image/jpeg', 0.9);
      setCapturedImages(prev => [...prev, imgUrl]);
      setIsCapturing(false);
    }, 150);
  };

  useEffect(() => {
    if (isCameraOn) {
      startCamera();
    }
    return () => {
      if (stream) stopCamera();
    };
  }, [facingMode, isCameraOn]);

  const handleViewPhotos = () => {
    stopCamera();
    setIsPreviewMode(true);
  };

  const handleBackToCamera = () => {
    setIsPreviewMode(false);
    setIsCameraOn(true);
  };

  const deleteImage = (index: number) => {
    setCapturedImages(prev => prev.filter((_, i) => i !== index));
    // Close modal if deleting the currently viewed image
    if (selectedImageIndex === index) {
      setSelectedImage(null);
      setSelectedImageIndex(null);
    }
  };

  const openImageModal = (img: string, index: number) => {
    setSelectedImage(img);
    setSelectedImageIndex(index);
  };

  const closeImageModal = () => {
    setSelectedImage(null);
    setSelectedImageIndex(null);
  };

  const navigateToNextImage = () => {
    if (selectedImageIndex !== null && selectedImageIndex < capturedImages.length - 1) {
      const nextIndex = selectedImageIndex + 1;
      setSelectedImageIndex(nextIndex);
      setSelectedImage(capturedImages[nextIndex]);
    }
  };

  const navigateToPrevImage = () => {
    if (selectedImageIndex !== null && selectedImageIndex > 0) {
      const prevIndex = selectedImageIndex - 1;
      setSelectedImageIndex(prevIndex);
      setSelectedImage(capturedImages[prevIndex]);
    }
  };

  // Touch/swipe handling
  const [touchStartX, setTouchStartX] = useState<number>(0);
  const [touchEndX, setTouchEndX] = useState<number>(0);

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEndX(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStartX || !touchEndX) return;
    
    const distance = touchStartX - touchEndX;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      navigateToNextImage();
    }
    if (isRightSwipe) {
      navigateToPrevImage();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white">
      {/* Welcome Screen */}
      {!isCameraOn && !isPreviewMode && capturedImages.length === 0 && (
        <div className="flex bg-white flex-col items-center justify-center min-h-10 p-6">
      
          
         
          <p className="text-gray-400 text-center mb-8 max-w-sm">
            Take photos
          </p>
          
          <button
            className="group relative px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 rounded-2xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-2xl"
            onClick={() => setIsCameraOn(true)}
          >
            <div className="flex items-center space-x-3">
              <Play className="w-6 h-6" />
              <span>Start Camera</span>
            </div>
            <div className="absolute inset-0 bg-white/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </button>
        </div>
      )}

      {/* Camera Interface */}
      {isCameraOn && !isPreviewMode && (
        <div className="flex flex-col h-screen">
          {/* Header */}
          <div className="flex items-center justify-between p-4 bg-black/50 backdrop-blur-md">
          
            <h2 className="text-lg font-semibold">Camera</h2>
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-300">{capturedImages.length}/4</span>
            </div>
          </div>

          {/* Camera View */}
          <div className="flex-1 relative overflow-hidden">
            <video
              ref={videoRef}
              playsInline
              autoPlay
              muted
              className="w-full h-full object-cover"
            />
            
            {/* Capture Flash Effect */}
            {isCapturing && (
              <div className="absolute inset-0 bg-white opacity-70 animate-ping"></div>
            )}

            {/* Camera Grid Lines */}
            <div className="absolute inset-0 pointer-events-none opacity-30">
              <div className="absolute top-1/3 left-0 right-0 h-px bg-white"></div>
              <div className="absolute top-2/3 left-0 right-0 h-px bg-white"></div>
              <div className="absolute left-1/3 top-0 bottom-0 w-px bg-white"></div>
              <div className="absolute left-2/3 top-0 bottom-0 w-px bg-white"></div>
            </div>

            {/* Photo Counter */}
            {capturedImages.length >= 4 && (
              <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-red-500/90 backdrop-blur-sm px-4 py-2 rounded-full">
                <span className="text-sm font-medium">Maximum photos reached</span>
              </div>
            )}
          </div>

          {/* Controls */}
          <div className="bg-black/80 backdrop-blur-md p-6">
            <div className="flex items-center justify-between max-w-sm mx-auto">
              {/* View Photos Button */}
              <button
                className={`p-4 rounded-full transition-all duration-300 ${
                  capturedImages.length > 0
                    ? 'bg-green-600 hover:bg-green-500 hover:scale-110 shadow-lg'
                    : 'bg-gray-700 opacity-50 cursor-not-allowed'
                }`}
                onClick={handleViewPhotos}
                disabled={capturedImages.length === 0}
              >
                <Eye className="w-6 h-6" />
              </button>

              {/* Capture Button */}
              <button
                className={`relative p-6 rounded-full transition-all duration-300 transform ${
                  capturedImages.length >= 4
                    ? 'bg-gray-600 cursor-not-allowed'
                    : 'bg-white hover:bg-gray-100 hover:scale-110 shadow-2xl'
                }`}
                onClick={capturePhoto}
                disabled={capturedImages.length >= 4 || isCapturing}
              >
                <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center">
                  <Camera className="w-5 h-5 text-white" />
                </div>
                {isCapturing && (
                  <div className="absolute inset-0 bg-blue-500 rounded-full animate-ping"></div>
                )}
              </button>

              {/* Flip Camera Button */}
              <button
                className="p-4 rounded-full bg-gray-700 hover:bg-gray-600 transition-all duration-300 hover:scale-110 shadow-lg"
                onClick={flipCamera}
              >
                <RotateCw className="w-6 h-6" />
              </button>
            </div>

            {/* Photo Thumbnails */}
            {capturedImages.length > 0 && (
              <div className="flex justify-center mt-4 space-x-2">
                {capturedImages.slice(-3).map((_, index) => (
                  <div
                    key={index}
                    className="w-2 h-2 bg-blue-500 rounded-full opacity-60"
                  ></div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Preview Mode */}
      {isPreviewMode && (
        <div className="flex flex-col h-screen">
          {/* Header */}
          <div className="flex items-center justify-between p-4 bg-black/90 backdrop-blur-md">
            <button
              className="p-2 rounded-full bg-gray-700 hover:bg-gray-600 transition-colors"
              onClick={handleBackToCamera}
            >
              <ArrowLeft className="w-6 h-6" />
            </button>
            <h2 className="text-lg font-semibold">Photos ({capturedImages.length})</h2>
            <button
              className="p-2 rounded-full bg-red-600 hover:bg-red-500 transition-colors"
              onClick={() => {
                setCapturedImages([]);
                setIsPreviewMode(false);
              }}
            >
              <Trash2 className="w-6 h-6" />
            </button>
          </div>

          {/* Photos Grid */}
          <div className="flex-1 p-4 overflow-y-auto">
            {capturedImages.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-gray-400">
                <Camera className="w-16 h-16 mb-4 opacity-50" />
                <p>No photos captured yet</p>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-4">
                {capturedImages.map((img, index) => (
                  <div
                    key={index}
                    className="relative group rounded-2xl overflow-hidden bg-gradient-to-br from-gray-800 to-gray-900 shadow-xl cursor-pointer"
                    onClick={() => openImageModal(img, index)}
                  >
                    <img
                      src={img}
                      alt={`Captured ${index + 1}`}
                      className="w-full aspect-square object-cover"
                    />
                    <div className="absolute top-2 right-2 bg-black/70 px-2 py-1 rounded-full text-xs">
                      {index + 1}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Bottom Actions */}
          <div className="bg-black/90 backdrop-blur-md p-4">
            <div className="flex justify-center space-x-4">
              <button
                className="flex items-center space-x-2 px-6 py-3 bg-blue-600 hover:bg-blue-500 rounded-xl transition-colors"
                onClick={handleBackToCamera}
              >
                <Camera className="w-5 h-5" />
                <span>Take More</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Full Size Image Modal */}
      {selectedImage && (
        <div className="fixed inset-0 bg-black/95 backdrop-blur-sm z-50 flex items-center justify-center">
          <div 
            className="relative w-full h-full flex items-center justify-center p-4"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            {/* Navigation Arrows */}
            {selectedImageIndex !== null && selectedImageIndex > 0 && (
              <button
                className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 p-3 bg-black/70 rounded-full hover:bg-black/90 transition-colors"
                onClick={navigateToPrevImage}
              >
                <ChevronLeft className="w-6 h-6 text-white" />
              </button>
            )}
            
            {selectedImageIndex !== null && selectedImageIndex < capturedImages.length - 1 && (
              <button
                className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 p-3 bg-black/70 rounded-full hover:bg-black/90 transition-colors"
                onClick={navigateToNextImage}
              >
                <ChevronRight className="w-6 h-6 text-white" />
              </button>
            )}

            <img
              src={selectedImage}
              alt={`Photo ${selectedImageIndex! + 1}`}
              className="max-w-full max-h-full object-contain rounded-lg select-none"
              draggable={false}
            />
            
            {/* Close Button */}
            <button
              className="absolute top-4 right-4 p-2 bg-black/70 rounded-full hover:bg-black/90 transition-colors z-10"
              onClick={closeImageModal}
            >
              <X className="w-6 h-6 text-white" />
            </button>
            
            {/* Delete Button */}
            <button
              className="absolute bottom-4 right-4 p-3 bg-red-600 rounded-full hover:bg-red-500 transition-colors shadow-lg z-10"
              onClick={() => deleteImage(selectedImageIndex!)}
            >
              <Trash2 className="w-6 h-6 text-white" />
            </button>
            
            {/* Image Info & Navigation Dots */}
            <div className="absolute bottom-4 left-4 z-10">
              <div className="bg-black/70 px-3 py-2 rounded-full mb-2">
                <span className="text-white text-sm">Photo {selectedImageIndex! + 1} of {capturedImages.length}</span>
              </div>
              
              {/* Navigation Dots */}
              {capturedImages.length > 1 && (
                <div className="flex space-x-1">
                  {capturedImages.map((_, index) => (
                    <button
                      key={index}
                      className={`w-2 h-2 rounded-full transition-all duration-200 ${
                        index === selectedImageIndex
                          ? 'bg-white scale-125'
                          : 'bg-white/50 hover:bg-white/75'
                      }`}
                      onClick={() => {
                        setSelectedImageIndex(index);
                        setSelectedImage(capturedImages[index]);
                      }}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Swipe Indicator */}
            {capturedImages.length > 1 && (
              <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-black/70 px-3 py-1 rounded-full z-10">
              </div>
            )}
          </div>
          
          {/* Click outside to close */}
          <div 
            className="absolute inset-0 -z-10"
            onClick={closeImageModal}
          ></div>
        </div>
      )}

      <canvas ref={canvasRef} className="hidden" />
    </div>
  );
}