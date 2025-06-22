import React from 'react';
import { ChevronDown } from 'lucide-react';

const ProfileCard = ({ 
  figure, 
  index, 
  isExpanded, 
  onToggleExpansion 
}) => {
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
            <p className="text-gray-600">{figure.title}</p>
          </div>
          <div className="flex items-center gap-3">
            <div className={`px-3 py-1 rounded-full text-sm font-medium ${
              figure.statusColor === 'green' ? 'bg-green-100 text-green-800' :
              figure.statusColor === 'yellow' ? 'bg-yellow-100 text-yellow-800' :
              'bg-red-100 text-red-800'
            }`}>
              {figure.statusColor === 'green' ? '✅' : 
               figure.statusColor === 'yellow' ? '⚠️' : '❌'} {figure.status}
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
          {/* Overall Assessment Section */}
          {figure.overall && (
            <div className="mt-4 mb-6 p-4 bg-gray-50 rounded-lg border">
              <h4 className="font-semibold text-gray-800 mb-2">Overall MMR Assessment</h4>
              <div className="text-lg font-medium text-gray-700">{figure.overall}</div>
            </div>
          )}

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
            {figure.pillars.map((pillar, pillarIndex) => (
              <details key={pillarIndex} className="group">
                <summary className={`cursor-pointer p-3 rounded-lg border-l-4 ${
                  (pillar.assessment || pillar.status)?.includes('Pass') || (pillar.assessment || pillar.status) === 'Strong' ? 'border-green-500 bg-green-50' :
                  (pillar.assessment || pillar.status)?.includes('Partial') || (pillar.assessment || pillar.status)?.includes('Mixed') ? 'border-yellow-500 bg-yellow-50' :
                  'border-red-500 bg-red-50'
                } hover:shadow-sm transition-shadow duration-200`}>
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-gray-800">{pillar.title || pillar.name}</span>
                    <span className={`text-sm font-medium ${
                      (pillar.assessment || pillar.status)?.includes('Pass') || (pillar.assessment || pillar.status) === 'Strong' ? 'text-green-600' :
                      (pillar.assessment || pillar.status)?.includes('Partial') || (pillar.assessment || pillar.status)?.includes('Mixed') ? 'text-yellow-600' :
                      'text-red-600'
                    }`}>
                      {(pillar.assessment || pillar.status)?.includes('Pass') || (pillar.assessment || pillar.status) === 'Strong' ? '✅' :
                       (pillar.assessment || pillar.status)?.includes('Partial') || (pillar.assessment || pillar.status)?.includes('Mixed') ? '⚠️' : '❌'} {pillar.assessment || pillar.status}
                      <ChevronDown className="inline ml-1 group-open:rotate-180 transition-transform duration-200" size={16} />
                    </span>
                  </div>
                </summary>
                <div className="mt-2 p-3 bg-white rounded border-l-4 border-gray-200">
                  <p className="text-gray-700 text-sm">{pillar.evidence}</p>
                </div>
              </details>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileCard;

