import React from 'react';
import { TrendingDown, TrendingUp, CheckCircle } from 'lucide-react';
// import { calculateGroupStatistics } from '../utils/mmrV8Calculations';

const CategoryRollupWidget = ({ categoryName, figures, totalCount }) => {
  // Calculate statistics from status field using the correct 5-level system
  const stats = React.useMemo(() => {
    if (!figures || figures.length === 0) {
      return {
        total: 0,
        pass: 0,
        partial: 0,
        fail: 0,
        passRate: 0
      };
    }

    const counts = {
      total: figures.length,
      pass: 0,
      partial: 0,
      fail: 0
    };

    figures.forEach(figure => {
      const rating = figure.status || "Unknown";
      switch (rating) {
        case "Pass":
          counts.pass++;
          break;
        case "Partial":
          counts.partial++;
          break;
        case "Fail":
          counts.fail++;
          break;
      }
    });

    // Calculate pass rate (Pass only)
    counts.passRate = Math.round((counts.pass / counts.total) * 100);

    return counts;
  }, [figures]);

  // Determine performance level and styling
  const getPerformanceLevel = () => {
    if (stats.passRate >= 70) {
      return { level: 'Strong', color: 'text-green-600', bgColor: 'bg-green-50', icon: TrendingUp };
    } else if (stats.passRate >= 40) {
      return { level: 'Mixed', color: 'text-yellow-600', bgColor: 'bg-yellow-50', icon: CheckCircle };
    } else {
      return { level: 'Needs Improvement', color: 'text-red-600', bgColor: 'bg-red-50', icon: TrendingDown };
    }
  };

  const performance = getPerformanceLevel();
  const Icon = performance.icon;

  return (
    <div className={`rounded-lg border p-4 mb-6 ${performance.bgColor}`}>
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Icon className={`h-5 w-5 ${performance.color}`} />
          <h3 className="text-lg font-semibold text-gray-900">
            {categoryName}
          </h3>
          <span className="text-sm text-gray-500">
            ({totalCount || stats.total} figures)
          </span>
        </div>
        <div className="text-right">
          <div className={`text-lg font-bold ${performance.color}`}>
            {performance.level}
          </div>
          <div className="text-sm text-gray-600">
            {stats.passRate}% passing
          </div>
        </div>
      </div>

      {/* Progress Bar - 3-level system with updated colors */}
      <div className="mb-3">
        <div className="flex h-3 rounded-full overflow-hidden bg-gray-200">
          {/* Fail section (bright red) */}
          {stats.fail > 0 && (
            <div 
              className="bg-red-500" 
              style={{ 
                width: `${(stats.fail / stats.total) * 100}%`,
                backgroundColor: '#dc2626'
              }}
            />
          )}
          {/* Partial section (yellow) */}
          {stats.partial > 0 && (
            <div 
              className="bg-yellow-500" 
              style={{ 
                width: `${(stats.partial / stats.total) * 100}%`,
                backgroundColor: '#eab308'
              }}
            />
          )}
          {/* Pass section (green) */}
          {stats.pass > 0 && (
            <div 
              className="bg-green-500" 
              style={{ 
                width: `${(stats.pass / stats.total) * 100}%`,
                backgroundColor: '#4CAF50'
              }}
            />
          )}
        </div>
      </div>

      {/* Statistics - 3-level system */}
      <div className="grid grid-cols-3 gap-2 text-xs">
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: '#dc2626' }}></div>
          <span>{stats.fail} Fail</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: '#eab308' }}></div>
          <span>{stats.partial} Partial</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: '#4CAF50' }}></div>
          <span>{stats.pass} Pass</span>
        </div>
      </div>
    </div>
  );
};

export default CategoryRollupWidget;

