'use client'
import React, { useState, useEffect } from 'react';

const TASCPieChart = ({ 
  size = 300, 
  animationDuration = 1000,
  showLegend = true,
  title = "TASC Program Distribution"
}) => {
  const [animationProgress, setAnimationProgress] = useState(0);
  const [hoveredSegment, setHoveredSegment] = useState<any | null>(null);

  // TASC program data
  const data = [
    { label: 'Academic Support', value: 35, color: '#3B82F6', description: 'Homework help & tutoring' },
    { label: 'Arts & Culture', value: 25, color: '#EF4444', description: 'Creative expression programs' },
    { label: 'Sports & Recreation', value: 20, color: '#10B981', description: 'Physical activities & sports' },
    { label: 'STEM Programs', value: 15, color: '#F59E0B', description: 'Science & technology activities' },
    { label: 'Life Skills', value: 5, color: '#8B5CF6', description: 'Personal development & leadership' }
  ];

  const total = data.reduce((sum, item) => sum + item.value, 0);
  const radius = size / 2 - 20;
  const centerX = size / 2;
  const centerY = size / 2;

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimationProgress(1);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  const createPath = (startAngle: any, endAngle: any, animatedEndAngle: any) => {
    const start = polarToCartesian(centerX, centerY, radius, animatedEndAngle);
    const end = polarToCartesian(centerX, centerY, radius, startAngle);
    const largeArcFlag = animatedEndAngle - startAngle <= 180 ? "0" : "1";
    
    if (animatedEndAngle - startAngle < 0.1) return "";
    
    return [
      "M", centerX, centerY,
      "L", end.x, end.y,
      "A", radius, radius, 0, largeArcFlag, 0, start.x, start.y,
      "Z"
    ].join(" ");
  };

  const polarToCartesian = (centerX: any, centerY: any, radius: any, angleInDegrees: any) => {
    const angleInRadians = (angleInDegrees - 90) * Math.PI / 180.0;
    return {
      x: centerX + (radius * Math.cos(angleInRadians)),
      y: centerY + (radius * Math.sin(angleInRadians))
    };
  };

  const getLabelPosition = (startAngle: any, endAngle: any) => {
    const midAngle = (startAngle + endAngle) / 2;
    const labelRadius = radius * 0.75;
    return polarToCartesian(centerX, centerY, labelRadius, midAngle);
  };

  let currentAngle = 0;
  const segments = data.map((item, index) => {
    const startAngle = currentAngle;
    const segmentAngle = (item.value / total) * 360;
    const endAngle = currentAngle + segmentAngle;
    const animatedEndAngle = startAngle + (segmentAngle * animationProgress);
    
    const path = createPath(startAngle, endAngle, animatedEndAngle);
    const labelPos = getLabelPosition(startAngle, animatedEndAngle);
    const isHovered = hoveredSegment === index;
    
    currentAngle = endAngle;

    return (
      <g key={index}>
        <path
          d={path}
          fill={item.color}
          stroke="white"
          strokeWidth="2"
          style={{
            cursor: 'pointer',
            filter: isHovered ? 'brightness(1.1)' : 'none',
            transform: isHovered ? 'scale(1.02)' : 'scale(1)',
            transformOrigin: `${centerX}px ${centerY}px`,
            transition: 'all 0.2s ease'
          }}
          onMouseEnter={() => setHoveredSegment(index)}
          onMouseLeave={() => setHoveredSegment(null)}
        />
        {animationProgress > 0.5 && (
          <text
            x={labelPos.x}
            y={labelPos.y}
            textAnchor="middle"
            dominantBaseline="middle"
            fill="white"
            fontSize="12"
            fontWeight="bold"
            style={{
              opacity: animationProgress,
              transition: `opacity ${animationDuration}ms ease`
            }}
          >
            {item.value}%
          </text>
        )}
      </g>
    );
  });

  return (
    <div className="flex flex-col items-center p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">{title}</h2>
      
      <div className="flex flex-col lg:flex-row items-center gap-8">
        <svg
          width={size}
          height={size}
          className="drop-shadow-md"
          style={{
            transition: `transform ${animationDuration}ms ease`,
            transform: `scale(${0.8 + 0.2 * animationProgress})`
          }}
        >
          {segments}
          
          {/* Center circle for donut effect */}
          <circle
            cx={centerX}
            cy={centerY}
            r={radius * 0.4}
            fill="white"
            stroke="#e5e7eb"
            strokeWidth="2"
          />
          
          {/* Center text */}
          <text
            x={centerX}
            y={centerY - 10}
            textAnchor="middle"
            dominantBaseline="middle"
            fontSize="16"
            fontWeight="bold"
            fill="#374151"
          >
            TASC
          </text>
          <text
            x={centerX}
            y={centerY + 10}
            textAnchor="middle"
            dominantBaseline="middle"
            fontSize="12"
            fill="#6b7280"
          >
            Programs
          </text>
        </svg>

        {showLegend && (
          <div className="space-y-3">
            {data.map((item, index) => (
              <div
                key={index}
                className={`flex items-center space-x-3 p-2 rounded-lg cursor-pointer transition-all duration-200 ${
                  hoveredSegment === index ? 'bg-gray-100 transform scale-105' : ''
                }`}
                onMouseEnter={() => setHoveredSegment(index)}
                onMouseLeave={() => setHoveredSegment(null)}
                style={{
                  opacity: animationProgress,
                  transform: `translateX(${20 * (1 - animationProgress)}px)`,
                  transition: `opacity ${animationDuration}ms ease ${index * 100}ms, transform ${animationDuration}ms ease ${index * 100}ms`
                }}
              >
                <div
                  className="w-4 h-4 rounded-full shadow-sm"
                  style={{ backgroundColor: item.color }}
                />
                <div className="flex-1">
                  <div className="font-medium text-gray-800">{item.label}</div>
                  <div className="text-sm text-gray-600">{item.description}</div>
                </div>
                <div className="font-bold text-gray-700">{item.value}%</div>
              </div>
            ))}
          </div>
        )}
      </div>
      
      {hoveredSegment !== null && (
        <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
          <p className="text-sm text-blue-800">
            <strong>{data[hoveredSegment].label}:</strong> {data[hoveredSegment].value}% - {data[hoveredSegment].description}
          </p>
        </div>
      )}
    </div>
  );
};

// Example usage with different configurations
const FlowChart = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Default configuration */}
        <TASCPieChart />
        
        {/* Compact version without legend */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-xl font-semibold mb-4">Compact Version</h3>
          <TASCPieChart 
            size={200} 
            showLegend={false} 
            title="TASC Overview"
          />
        </div>
        
        {/* Usage instructions */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-xl font-semibold mb-4">Usage</h3>
          <div className="space-y-2 text-gray-700">
            <p><strong>Props:</strong></p>
            <ul className="list-disc list-inside space-y-1 ml-4">
              <li><code>size</code>: Chart diameter (default: 300)</li>
              <li><code>animationDuration</code>: Animation time in ms (default: 1000)</li>
              <li><code>showLegend</code>: Show/hide legend (default: true)</li>
              <li><code>title</code>: Chart title (default: "TASC Program Distribution")</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlowChart;