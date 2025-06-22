import React from 'react';
import { TrendingDown, TrendingUp } from 'lucide-react';

const CategoryRollupWidget = ({ categoryName, figures, totalCount }) => {
  // Calculate statistics from the filtered figures
  const stats = React.useMemo(() => {
    console.log('=== CategoryRollupWidget Debug ===');
    console.log('Figures received:', figures);
    console.log('Figures length:', figures?.length);
    
    if (!figures || figures.length === 0) {
      console.log('No figures provided');
      return {
        total: 0,
        passing: 0,
        partial: 0,
        failing: 0,
        passRate: 0
      };
    }

    let passing = 0;
    let partial = 0;
    let failing = 0;

    figures.forEach((figure, index) => {
      const rating = figure.overall_rating;
      console.log(`Figure ${index}: ${figure.name} - Rating: "${rating}"`);
      
      if (rating === 'Full Pass' || rating === 'Pass') {
        passing++;
        console.log(`  -> Counted as PASSING`);
      } else if (rating === 'Partial' || rating === 'Mixed') {
        partial++;
        console.log(`  -> Counted as PARTIAL`);
      } else if (rating === 'Failing' || rating === 'Clear Fail' || rating === 'Fail') {
        failing++;
        console.log(`  -> Counted as FAILING`);
      } else {
        console.log(`  -> UNKNOWN RATING: "${rating}"`);
      }
    });

    console.log('Final counts - Passing:', passing, 'Partial:', partial, 'Failing:', failing);

    const total = figures.length;
    const passRate = total > 0 ? Math.round((passing / total) * 100) : 0;

    return {
      total,
      passing,
      partial,
      failing,
      passRate
    };
  }, [figures]);

  // Determine performance level and styling
  const getPerformanceLevel = () => {
    if (stats.passRate >= 70) {
      return {
        level: 'Strong Performance',
        color: 'text-green-600',
        bgColor: 'bg-green-50',
        borderColor: 'border-green-200',
        icon: TrendingUp,
        iconColor: 'text-green-500'
      };
    } else if (stats.passRate >= 40) {
      return {
        level: 'Mixed Performance',
        color: 'text-yellow-600',
        bgColor: 'bg-yellow-50',
        borderColor: 'border-yellow-200',
        icon: TrendingUp,
        iconColor: 'text-yellow-500'
      };
    } else {
      return {
        level: 'Needs Improvement',
        color: 'text-red-600',
        bgColor: 'bg-red-50',
        borderColor: 'border-red-200',
        icon: TrendingDown,
        iconColor: 'text-red-500'
      };
    }
  };

  const performance = getPerformanceLevel();
  const Icon = performance.icon;

  // Calculate percentages for progress bar
  const passingPercent = stats.total > 0 ? (stats.passing / stats.total) * 100 : 0;
  const partialPercent = stats.total > 0 ? (stats.partial / stats.total) * 100 : 0;
  const failingPercent = stats.total > 0 ? (stats.failing / stats.total) * 100 : 0;

  if (stats.total === 0) {
    return (
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 mb-6">
        <div className="text-center text-gray-500">
          <h3 className="text-lg font-semibold mb-2">{categoryName}</h3>
          <p>No profiles found in this category</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`${performance.bgColor} border ${performance.borderColor} rounded-lg p-6 mb-6`}>
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <Icon className={`${performance.iconColor}`} size={24} />
          <div>
            <h3 className="text-lg font-semibold text-gray-900">{categoryName}</h3>
            <p className="text-sm text-gray-600">({stats.total} figures)</p>
          </div>
        </div>
        <div className="text-right">
          <div className={`text-lg font-semibold ${performance.color}`}>
            {performance.level}
          </div>
          <div className="text-sm text-gray-600">
            {stats.passRate}% passing
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mb-4">
        <div className="flex h-3 bg-gray-200 rounded-full overflow-hidden">
          {/* Failing section - LEFT */}
          {failingPercent > 0 && (
            <div 
              className="bg-red-500 transition-all duration-300"
              style={{ width: `${failingPercent}%` }}
            />
          )}
          {/* Partial section - MIDDLE */}
          {partialPercent > 0 && (
            <div 
              className="bg-yellow-500 transition-all duration-300"
              style={{ width: `${partialPercent}%` }}
            />
          )}
          {/* Passing section - RIGHT */}
          {passingPercent > 0 && (
            <div 
              className="bg-green-500 transition-all duration-300"
              style={{ width: `${passingPercent}%` }}
            />
          )}
        </div>
      </div>

      {/* Statistics */}
      <div className="flex justify-between items-center text-sm">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-red-500 rounded-full"></div>
          <span className="text-gray-700">{stats.failing} Fail</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
          <span className="text-gray-700">{stats.partial} Partial</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
          <span className="text-gray-700">{stats.passing} Pass</span>
        </div>
      </div>
    </div>
  );
};

export default CategoryRollupWidget;

