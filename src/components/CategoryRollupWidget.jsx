import React from 'react';
import { TrendingDown, TrendingUp, CheckCircle } from 'lucide-react';
import { calculateGroupStatistics } from '../utils/mmrV8Calculations';

const CategoryRollupWidget = ({ categoryName, figures, totalCount }) => {
  // Calculate statistics from the filtered figures using MMR v8 dynamic rating calculation
  const stats = React.useMemo(() => {
    return calculateGroupStatistics(figures);
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

      {/* Progress Bar */}
      <div className="mb-3">
        <div className="flex h-3 rounded-full overflow-hidden bg-gray-200">
          {/* Fail section (red, leftmost) */}
          {stats.fail > 0 && (
            <div 
              className="bg-red-500" 
              style={{ width: `${(stats.fail / stats.total) * 100}%` }}
            />
          )}
          {/* Partial section (yellow) */}
          {stats.partial > 0 && (
            <div 
              className="bg-yellow-500" 
              style={{ width: `${(stats.partial / stats.total) * 100}%` }}
            />
          )}
          {/* Almost Pass section (light green) */}
          {stats.almostPass > 0 && (
            <div 
              className="bg-green-400" 
              style={{ width: `${(stats.almostPass / stats.total) * 100}%` }}
            />
          )}
          {/* Pass section (dark green, rightmost) */}
          {stats.pass > 0 && (
            <div 
              className="bg-green-600" 
              style={{ width: `${(stats.pass / stats.total) * 100}%` }}
            />
          )}
        </div>
      </div>

      {/* Statistics */}
      <div className="flex justify-between text-sm">
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 bg-red-500 rounded-full"></div>
          <span>{stats.fail} Fail</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
          <span>{stats.partial} Partial</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 bg-green-400 rounded-full"></div>
          <span>{stats.almostPass} Almost Pass</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 bg-green-600 rounded-full"></div>
          <span>{stats.pass} Pass</span>
        </div>
      </div>
    </div>
  );
};

export default CategoryRollupWidget;

