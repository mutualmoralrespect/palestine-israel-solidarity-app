import React, { useState, useMemo } from 'react';
import CategoryNavigation from './shared/CategoryNavigation';
import ProfileGrid from './shared/ProfileGrid';
import MMRRollupDashboard from './MMRRollupDashboard';
import CategoryRollupWidget from './CategoryRollupWidget';
import { transformCategories, getCategoryGroups, getOverallStats } from '../utils/dataTransform';

// Helper function to get display name for category
const getCategoryDisplayName = (activeCategory, categoryGroups) => {
  if (activeCategory === 'All') {
    return 'All Categories';
  } else if (activeCategory.startsWith('group:')) {
    const groupId = activeCategory.replace('group:', '');
    const group = categoryGroups.find(g => g.id === groupId);
    return group ? group.label : 'Category Group';
  } else {
    // Individual category
    for (const group of categoryGroups) {
      const category = group.categories.find(cat => cat.id === activeCategory);
      if (category) {
        return category.label;
      }
    }
    return activeCategory;
  }
};

const MMRScansSection = () => {
  const [activeCategory, setActiveCategory] = useState('All');

  // Load data from JSON file
  const figures = useMemo(() => transformCategories(), []);
  const categoryGroups = useMemo(() => getCategoryGroups(), []);
  const overallStats = useMemo(() => getOverallStats(), []);

  // Calculate total count and get all figures
  const allFigures = useMemo(() => {
    const figuresList = [];
    Object.values(figures).forEach(categoryFigures => {
      figuresList.push(...categoryFigures);
    });
    return figuresList;
  }, [figures]);

  // Filter figures based on active category
  const filteredFigures = useMemo(() => {
    if (activeCategory === 'All') {
      return allFigures;
    } else if (activeCategory.startsWith('group:')) {
      // Group filtering - combine all categories in the group
      const groupId = activeCategory.replace('group:', '');
      const group = categoryGroups.find(g => g.id === groupId);
      if (group) {
        let filtered = [];
        group.categories.forEach(cat => {
          const categoryFigures = figures[cat.id] || [];
          filtered = [...filtered, ...categoryFigures];
        });
        return filtered;
      }
    } else {
      // Individual category filtering
      return figures[activeCategory] || [];
    }
    return [];
  }, [activeCategory, allFigures, categoryGroups, figures]);

  const handleCategoryChange = (category) => {
    setActiveCategory(category);
  };

  return (
    <div className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            MMR Scans by Type
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Comprehensive analysis of public figures across all categories - both those who pass and fail MMR standards
          </p>
        </div>

        {/* Category Navigation */}
        <CategoryNavigation
          categoryGroups={categoryGroups}
          activeCategory={activeCategory}
          onCategoryChange={handleCategoryChange}
          totalCount={allFigures.length}
        />

        {/* MMR Rollup Dashboard - Commented out for later use */}
        {/* 
        <MMRRollupDashboard 
          figures={allFigures}
          overallStats={overallStats}
        />
        */}

        {/* Profile Grid */}
        <ProfileGrid 
          figures={filteredFigures}
          searchPlaceholder="Search MMR assessments..."
          categoryRollupWidget={
            <CategoryRollupWidget 
              categoryName={getCategoryDisplayName(activeCategory, categoryGroups)}
              figures={filteredFigures}
              totalCount={filteredFigures.length}
            />
          }
        />
      </div>
    </div>
  );
};

export default MMRScansSection;

