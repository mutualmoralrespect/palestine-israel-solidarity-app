import React, { useState, useMemo } from 'react';
import { TrendingUp, TrendingDown, Minus, Filter, Eye, ArrowLeft } from 'lucide-react';

const MMRRollupDashboard = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [viewMode, setViewMode] = useState('overview'); // 'overview' or 'detailed'

  // Sample data structure - this would come from props in real implementation
  const sampleData = {
    'Israeli Politicians': {
      name: 'Israeli Politicians',
      totalCount: 3,
      passCount: 0,
      partialCount: 1,
      failCount: 2,
      figures: ['Netanyahu', 'Ben-Gvir', 'Smotrich'],
      pillarStats: {
        'Reject targeting civilians': { pass: 0, partial: 1, fail: 2 },
        'Accountability for Hamas/Militants': { pass: 2, partial: 0, fail: 1 },
        'Accountability for Israeli Right': { pass: 0, partial: 0, fail: 3 },
        'Use verified sources': { pass: 1, partial: 1, fail: 1 },
        'Humanize both peoples': { pass: 0, partial: 0, fail: 3 },
        'Embrace coexistence': { pass: 0, partial: 1, fail: 2 },
        'Vision for dignity & peace': { pass: 0, partial: 0, fail: 3 }
      }
    },
    'US Politicians': {
      name: 'US Politicians',
      totalCount: 1,
      passCount: 1,
      partialCount: 0,
      failCount: 0,
      figures: ['Rep. Ritchie Torres'],
      pillarStats: {
        'Reject targeting civilians': { pass: 1, partial: 0, fail: 0 },
        'Accountability for Hamas/Militants': { pass: 1, partial: 0, fail: 0 },
        'Accountability for Israeli Right': { pass: 1, partial: 0, fail: 0 },
        'Use verified sources': { pass: 1, partial: 0, fail: 0 },
        'Humanize both peoples': { pass: 1, partial: 0, fail: 0 },
        'Embrace coexistence': { pass: 1, partial: 0, fail: 0 },
        'Vision for dignity & peace': { pass: 1, partial: 0, fail: 0 }
      }
    },
    'Peace Advocates': {
      name: 'Peace Advocates',
      totalCount: 4,
      passCount: 4,
      partialCount: 0,
      failCount: 0,
      figures: ['Maoz Inon & Aziz Abu Sara', 'Women Wage Peace', 'Parents Circle', 'Standing Together'],
      pillarStats: {
        'Reject targeting civilians': { pass: 4, partial: 0, fail: 0 },
        'Accountability for Hamas/Militants': { pass: 3, partial: 1, fail: 0 },
        'Accountability for Israeli Right': { pass: 4, partial: 0, fail: 0 },
        'Use verified sources': { pass: 4, partial: 0, fail: 0 },
        'Humanize both peoples': { pass: 4, partial: 0, fail: 0 },
        'Embrace coexistence': { pass: 4, partial: 0, fail: 0 },
        'Vision for dignity & peace': { pass: 4, partial: 0, fail: 0 }
      }
    },
    'Historians': {
      name: 'Historians',
      totalCount: 7,
      passCount: 1,
      partialCount: 2,
      failCount: 4,
      figures: ['Norman Finkelstein', 'Ilan Pappé', 'Rashid Khalidi', 'Benny Morris', 'Avi Shlaim', 'Tom Segev', 'Efraim Karsh'],
      pillarStats: {
        'Reject targeting civilians': { pass: 3, partial: 2, fail: 2 },
        'Accountability for Hamas/Militants': { pass: 2, partial: 1, fail: 4 },
        'Accountability for Israeli Right': { pass: 5, partial: 1, fail: 1 },
        'Use verified sources': { pass: 6, partial: 1, fail: 0 },
        'Humanize both peoples': { pass: 2, partial: 2, fail: 3 },
        'Embrace coexistence': { pass: 1, partial: 3, fail: 3 },
        'Vision for dignity & peace': { pass: 1, partial: 2, fail: 4 }
      }
    }
  };

  const CategoryOverviewCard = ({ category }) => {
    const passPercentage = Math.round((category.passCount / category.totalCount) * 100);
    const partialPercentage = Math.round((category.partialCount / category.totalCount) * 100);
    const failPercentage = Math.round((category.failCount / category.totalCount) * 100);
    
    const getTrendIcon = () => {
      if (passPercentage >= 70) return <TrendingUp className="text-green-500" size={20} />;
      if (passPercentage >= 40) return <Minus className="text-yellow-500" size={20} />;
      return <TrendingDown className="text-red-500" size={20} />;
    };

    const getOverallStatus = () => {
      if (passPercentage >= 70) return { text: 'Strong Performance', color: 'text-green-600' };
      if (passPercentage >= 40) return { text: 'Mixed Performance', color: 'text-yellow-600' };
      return { text: 'Needs Improvement', color: 'text-red-600' };
    };

    const status = getOverallStatus();

    return (
      <div 
        className="bg-white rounded-lg shadow-md p-6 cursor-pointer hover:shadow-lg transition-all duration-200 border-l-4 border-blue-500"
        onClick={() => {
          setSelectedCategory(category.name);
          setViewMode('detailed');
        }}
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-800">{category.name}</h3>
          <div className="flex items-center gap-2">
            {getTrendIcon()}
            <span className="text-sm text-gray-500">({category.totalCount} figures)</span>
          </div>
        </div>
        
        <div className="space-y-3">
          <div className="flex items-center justify-between text-sm">
            <span className={`font-medium ${status.color}`}>{status.text}</span>
            <span className="font-medium">{passPercentage}% passing</span>
          </div>
          
          <div className="w-full bg-gray-200 rounded-full h-4">
            <div className="flex h-4 rounded-full overflow-hidden">
              <div 
                className="bg-green-500 transition-all duration-500" 
                style={{ width: `${passPercentage}%` }}
                title={`${category.passCount} passing (${passPercentage}%)`}
              ></div>
              <div 
                className="bg-yellow-500 transition-all duration-500" 
                style={{ width: `${partialPercentage}%` }}
                title={`${category.partialCount} partial (${partialPercentage}%)`}
              ></div>
              <div 
                className="bg-red-500 transition-all duration-500" 
                style={{ width: `${failPercentage}%` }}
                title={`${category.failCount} failing (${failPercentage}%)`}
              ></div>
            </div>
          </div>
          
          <div className="flex justify-between text-xs text-gray-500">
            <span className="flex items-center gap-1">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              {category.passCount} Pass
            </span>
            <span className="flex items-center gap-1">
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              {category.partialCount} Partial
            </span>
            <span className="flex items-center gap-1">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              {category.failCount} Fail
            </span>
          </div>
        </div>
      </div>
    );
  };

  const PillarBreakdownView = ({ category }) => {
    const pillarData = Object.entries(category.pillarStats).map(([pillar, stats]) => {
      const total = stats.pass + stats.partial + stats.fail;
      return {
        pillar: pillar.replace(/^(\\d+\\.\\s*)?/, ''), // Remove numbering
        pass: total > 0 ? Math.round((stats.pass / total) * 100) : 0,
        partial: total > 0 ? Math.round((stats.partial / total) * 100) : 0,
        fail: total > 0 ? Math.round((stats.fail / total) * 100) : 0,
        passCount: stats.pass,
        partialCount: stats.partial,
        failCount: stats.fail,
        total
      };
    });

    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <button 
              onClick={() => setViewMode('overview')}
              className="text-blue-600 hover:text-blue-800 mb-2 flex items-center gap-2 transition-colors"
            >
              <ArrowLeft size={16} />
              Back to Overview
            </button>
            <h2 className="text-2xl font-bold text-gray-800">{category.name} - Pillar Analysis</h2>
            <p className="text-gray-600">Detailed breakdown across all MMR pillars ({category.totalCount} figures analyzed)</p>
          </div>
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <div className="text-2xl font-bold text-green-600">{category.passCount}</div>
            <div className="text-sm text-green-700">Figures Passing MMR</div>
          </div>
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <div className="text-2xl font-bold text-yellow-600">{category.partialCount}</div>
            <div className="text-sm text-yellow-700">Partial Compliance</div>
          </div>
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <div className="text-2xl font-bold text-red-600">{category.failCount}</div>
            <div className="text-sm text-red-700">Failing MMR Standards</div>
          </div>
        </div>

        {/* Detailed Pillar Breakdown */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold mb-6">Pillar-by-Pillar Performance</h3>
          <div className="space-y-6">
            {pillarData.map((pillar, index) => (
              <div key={index} className="space-y-3">
                <div className="flex justify-between items-center">
                  <h4 className="font-medium text-gray-800 text-sm md:text-base">{pillar.pillar}</h4>
                  <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded">
                    {pillar.passCount}/{pillar.total} passing
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-6">
                  <div className="flex h-6 rounded-full overflow-hidden">
                    <div 
                      className="bg-green-500 transition-all duration-700 flex items-center justify-center" 
                      style={{ width: `${pillar.pass}%` }}
                    >
                      {pillar.pass > 15 && <span className="text-xs text-white font-medium">{pillar.pass}%</span>}
                    </div>
                    <div 
                      className="bg-yellow-500 transition-all duration-700 flex items-center justify-center" 
                      style={{ width: `${pillar.partial}%` }}
                    >
                      {pillar.partial > 15 && <span className="text-xs text-white font-medium">{pillar.partial}%</span>}
                    </div>
                    <div 
                      className="bg-red-500 transition-all duration-700 flex items-center justify-center" 
                      style={{ width: `${pillar.fail}%` }}
                    >
                      {pillar.fail > 15 && <span className="text-xs text-white font-medium">{pillar.fail}%</span>}
                    </div>
                  </div>
                </div>
                <div className="flex justify-between text-xs text-gray-600">
                  <span className="flex items-center gap-1">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    {pillar.passCount} Pass ({pillar.pass}%)
                  </span>
                  <span className="flex items-center gap-1">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                    {pillar.partialCount} Partial ({pillar.partial}%)
                  </span>
                  <span className="flex items-center gap-1">
                    <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                    {pillar.failCount} Fail ({pillar.fail}%)
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Key Insights */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-blue-800 mb-3">Key Insights for {category.name}</h3>
          <div className="space-y-2 text-sm text-blue-700">
            {pillarData
              .sort((a, b) => a.pass - b.pass)
              .slice(0, 2)
              .map((pillar, index) => (
                <div key={index} className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                  <span><strong>Weakest area:</strong> {pillar.pillar} ({pillar.pass}% passing)</span>
                </div>
              ))}
            {pillarData
              .sort((a, b) => b.pass - a.pass)
              .slice(0, 1)
              .map((pillar, index) => (
                <div key={index} className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span><strong>Strongest area:</strong> {pillar.pillar} ({pillar.pass}% passing)</span>
                </div>
              ))}
          </div>
        </div>
      </div>
    );
  };

  if (viewMode === 'detailed' && selectedCategory && sampleData[selectedCategory]) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <PillarBreakdownView category={sampleData[selectedCategory]} />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="space-y-6">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">MMR Category Performance Dashboard</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Comprehensive analysis of public figures across all categories. Click on any category to explore detailed pillar breakdowns and identify systemic patterns.
          </p>
        </div>

        {/* Category Overview Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
          {Object.values(sampleData).map((category, index) => (
            <CategoryOverviewCard key={index} category={category} />
          ))}
        </div>

        {/* Overall Summary */}
        <div className="bg-white rounded-lg shadow-md p-6 mt-8">
          <h3 className="text-lg font-semibold mb-4">Overall MMR Landscape Summary</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">
                {Object.values(sampleData).reduce((sum, cat) => sum + cat.totalCount, 0)}
              </div>
              <div className="text-sm text-gray-600">Total Figures Analyzed</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">
                {Object.values(sampleData).reduce((sum, cat) => sum + cat.passCount, 0)}
              </div>
              <div className="text-sm text-gray-600">Passing MMR Standards</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-yellow-600">
                {Object.values(sampleData).reduce((sum, cat) => sum + cat.partialCount, 0)}
              </div>
              <div className="text-sm text-gray-600">Partial Compliance</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-red-600">
                {Object.values(sampleData).reduce((sum, cat) => sum + cat.failCount, 0)}
              </div>
              <div className="text-sm text-gray-600">Failing Standards</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MMRRollupDashboard;

