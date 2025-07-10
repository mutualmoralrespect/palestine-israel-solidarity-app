import React from 'react';
import { ChevronDown } from 'lucide-react';
// import { computeMMROutcome, getOutcomeColor, getOutcomeIcon, mapOutcomeToCategory } from '../../utils/mmrV8Calculations';

const ProfileCard = ({ 
  figure, 
  index, 
  isExpanded, 
  onToggleExpansion 
}) => {
  // Use status from transformed data instead of overall_rating from raw JSON
  const overallRating = figure.status || "Unknown";
  
  // Determine status display with updated colors
  const getStatusDisplay = (rating) => {
    switch (rating) {
      case 'Pass':
        return { color: 'green', icon: '🟢', text: 'Pass', hexColor: '#4CAF50', bgColor: '#f0fdf4' };
      case 'Partial':
        return { color: 'yellow', icon: '⚠️', text: 'Partial', hexColor: '#eab308', bgColor: '#fef9c3' };
      case 'Fail':
        return { color: 'red', icon: '❌', text: 'Fail', hexColor: '#dc2626', bgColor: '#fde8e8' };
      default:
        return { color: 'gray', icon: '❓', text: 'Unknown', hexColor: '#6b7280', bgColor: '#f3f4f6' };
    }
  };
  
  const statusDisplay = getStatusDisplay(overallRating);

  return (
    <div className="bg-white rounded-lg shadow-md border-l-4 border-blue-500">
      {/* Card Header - Always Visible */}
      <div 
        className="p-6 cursor-pointer hover:bg-gray-50 transition-colors"
        onClick={() => onToggleExpansion(index)}
      >
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
            {figure.icon && typeof figure.icon === 'string' ? (
              <span className="text-2xl">{figure.icon}</span>
            ) : (
              <figure.icon className="text-blue-600" size={24} />
            )}
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-semibold text-gray-800">{figure.name}</h3>
            <p className="text-gray-600">
              {figure.role || figure.title}
              {figure.affiliation && (
                <span className="text-gray-400 italic"> &middot; {figure.affiliation}</span>
              )}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <div 
              className="px-3 py-1 rounded-full text-sm font-medium"
              style={{ backgroundColor: statusDisplay.bgColor, color: statusDisplay.hexColor }}
            >
              {statusDisplay.icon} {statusDisplay.text}
            </div>
            <ChevronDown 
              className={`transition-transform text-gray-400 ${isExpanded ? 'rotate-180' : ''}`} 
              size={20} 
            />
          </div>
        </div>
      </div>

      {/* Card Details - Collapsible */}
      {isExpanded && (
        <div className="px-6 pb-6 border-t border-gray-100">
          {/* Overall Assessment Section - COMMENTED OUT (redundant with header display)
             Uncomment for debugging when changing scoring algorithms 
          <div className="mt-4 mb-6 p-4 bg-gray-50 rounded-lg border">
            <h4 className="font-semibold text-gray-800 mb-2">Overall MMR Assessment</h4>
            <div className={`text-lg font-medium ${
              statusDisplay.color === 'green' ? 'text-green-700' :
              statusDisplay.color === 'yellow' ? 'text-yellow-700' :
              'text-red-700'
            }`}>
              {statusDisplay.icon} {statusDisplay.text}
            </div>
            <div className="text-sm text-gray-600 mt-1">
              Simplified 3-level system | Original: {overallRating}
            </div>
          </div>
          */}

          {/* Reflection Section */}
          {figure.reflection && (
            <div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
              <h4 className="font-semibold text-gray-800 mb-2">Analysis & Reflection</h4>
              <p className="text-gray-700 text-sm leading-relaxed">{figure.reflection}</p>
            </div>
          )}

          {/* Detailed Pillar Breakdown */}
          <div className="space-y-2">
            <h4 className="font-semibold text-gray-800 mb-3">Detailed Pillar Analysis</h4>
            {figure.pillars && figure.pillars.map((pillar, pillarIndex) => {
              const assessment = pillar.assessment || pillar.status || 'Unknown';
              const isPass = assessment.includes('Pass') || assessment === 'Strong';
              const isPartial = assessment.includes('Partial') || assessment.includes('Mixed');
              const isFail = !isPass && !isPartial;
              const borderColor = isPass ? 'border-green-500 bg-green-50' : 
                                 isPartial ? 'border-yellow-500 bg-yellow-50' : 
                                 'border-red-500';
              const textColor = isPass ? 'text-green-600' : 
                               isPartial ? 'text-yellow-600' : 
                               'text-red-600';
              const icon = isPass ? '✅' : isPartial ? '⚠️' : '❌';
              const bgColor = isFail ? 'bg-[#fde8e8]' : isPartial ? 'bg-yellow-50' : isPass ? 'bg-green-50' : '';
              return (
                <div key={pillarIndex} className={`p-3 rounded-lg border-l-4 ${borderColor} ${bgColor}`}>
                  {/* Top line: Pillar title and score */}
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-gray-800">{pillar.pillar || pillar.title || pillar.name}</span>
                    <span className={`text-sm font-medium ${textColor}`}>
                      {icon} {assessment}
                    </span>
                  </div>
                  {/* Second line: Evidence text */}
                  <p className="text-gray-700 text-sm leading-relaxed">{pillar.evidence}</p>
                </div>
              );
            })}
            {/* 
            NOTE: Expand/collapse functionality removed as all pillar information is now visible.
            If additional detailed information is added to individual pillars in the future,
            consider restoring the <details>/<summary> structure with ChevronDown icons
            to allow users to expand/collapse for more detailed pillar analysis.
            */}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileCard;

