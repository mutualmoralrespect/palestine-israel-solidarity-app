import React, { useState, useMemo, useRef, useEffect } from 'react';
import CategoryNavigation from './shared/CategoryNavigation';
import ProfileGrid from './shared/ProfileGrid';
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

const MMRProfilesSection = ({ 
  title = "MMR Scans by Type",
  description = "Comprehensive analysis of public figures across all categories - both those who pass and fail MMR standards",
  showRollup = true,
  filterByStatus = null, // null = show all, 'Pass' = show only passing profiles, etc.
  bgColor = "bg-gray-50"
}) => {
  const [activeCategory, setActiveCategory] = useState('All');
  const profileGridRef = useRef(null);

  // Load data from JSON file
  const figures = useMemo(() => transformCategories(), []);
  const categoryGroups = useMemo(() => getCategoryGroups(filterByStatus), [filterByStatus]);
  const overallStats = useMemo(() => getOverallStats(), []);

  // Calculate total count and get all figures
  const allFigures = useMemo(() => {
    const figuresList = [];
    Object.values(figures).forEach(categoryFigures => {
      figuresList.push(...categoryFigures);
    });
    
    // Apply status filter if specified
    if (filterByStatus) {
      // Helper function to map status to simplified 3-level system
      const getSimplifiedRating = (rating) => {
        switch (rating) {
          case 'Full Pass':
          case 'Strong Pass':
          case 'Pass':
            return 'Pass';
          case 'Mixed':
          case 'Partial':
            return 'Partial';
          case 'Failing':
          case 'Clear Fail':
          case 'Fail':
            return 'Fail';
          default:
            return 'Unknown';
        }
      };
      
      return figuresList.filter(figure => {
        const simplified = getSimplifiedRating(figure.status);
        return simplified === filterByStatus;
      });
    }
    
    return figuresList;
  }, [figures, filterByStatus]);

  // Filter figures based on active category
  const filteredFigures = useMemo(() => {
    if (activeCategory === 'All') {
      return allFigures;
    } else if (activeCategory === 'other') {
      // Show all profiles in the 'Other' group (uncategorized + unmatched)
      let otherProfiles = [];
      categoryGroups.forEach(group => {
        if (group.id === 'other') {
          group.categories.forEach(cat => {
            if (cat.id === 'other' && cat.profiles) {
              otherProfiles = cat.profiles;
            }
          });
        }
      });
      return otherProfiles;
    } else if (activeCategory.startsWith('group:')) {
      // Group filtering - combine all categories in the group
      const groupId = activeCategory.replace('group:', '');
      const group = categoryGroups.find(g => g.id === groupId);
      if (group) {
        let filtered = [];
        group.categories.forEach(cat => {
          const categoryFigures = figures[cat.id] || [];
          
          // Apply status filter if specified
          let categoryFilteredFigures = categoryFigures;
          if (filterByStatus) {
            const getSimplifiedRating = (rating) => {
              switch (rating) {
                case 'Full Pass':
                case 'Strong Pass':
                case 'Pass':
                  return 'Pass';
                case 'Mixed':
                case 'Partial':
                  return 'Partial';
                case 'Failing':
                case 'Clear Fail':
                case 'Fail':
                  return 'Fail';
                default:
                  return 'Unknown';
              }
            };
            
            categoryFilteredFigures = categoryFigures.filter(figure => {
              const simplified = getSimplifiedRating(figure.status);
              return simplified === filterByStatus;
            });
          }
          
          filtered = [...filtered, ...categoryFilteredFigures];
        });
        return filtered;
      }
    } else {
      // Individual category filtering
      let categoryFigures = figures[activeCategory] || [];
      
      // Apply status filter if specified
      if (filterByStatus) {
        const getSimplifiedRating = (rating) => {
          switch (rating) {
            case 'Full Pass':
            case 'Strong Pass':
            case 'Pass':
              return 'Pass';
            case 'Mixed':
            case 'Partial':
              return 'Partial';
            case 'Failing':
            case 'Clear Fail':
            case 'Fail':
              return 'Fail';
            default:
              return 'Unknown';
          }
        };
        
        categoryFigures = categoryFigures.filter(figure => {
          const simplified = getSimplifiedRating(figure.status);
          return simplified === filterByStatus;
        });
      }
      
      return categoryFigures;
    }
    return [];
  }, [activeCategory, allFigures, categoryGroups, figures, filterByStatus]);

  const handleCategoryChange = (category) => {
    setActiveCategory(category);
    
    // Scroll to profile grid after a short delay to allow state update
    setTimeout(() => {
      if (profileGridRef.current) {
        profileGridRef.current.scrollIntoView({ 
          behavior: 'smooth', 
          block: 'start' 
        });
      }
    }, 100);
  };

  // Create category rollup widget if showing rollup
  const categoryRollupWidget = showRollup ? (
    <CategoryRollupWidget
      categoryName={getCategoryDisplayName(activeCategory, categoryGroups)}
      figures={filteredFigures}
      totalCount={filteredFigures.length}
    />
  ) : null;

  return (
    <div className={`py-16 ${bgColor}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            {title}
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            {description}
          </p>
        </div>

        {/* Category Navigation */}
        <CategoryNavigation
          categoryGroups={categoryGroups}
          activeCategory={activeCategory}
          onCategoryChange={handleCategoryChange}
          totalCount={allFigures.length}
        />

        {/* Profile Grid with optional rollup */}
        <div ref={profileGridRef}>
          <ProfileGrid
            figures={filteredFigures}
            title={getCategoryDisplayName(activeCategory, categoryGroups)}
            categoryRollupWidget={categoryRollupWidget}
          />
        </div>
      </div>
    </div>
  );
};

export default MMRProfilesSection;

