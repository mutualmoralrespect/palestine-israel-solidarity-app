import { Users, Building, FileText, Scale, BookOpen, Heart } from 'lucide-react';
import mmrDatabase from '../data/mmr_complete_database.json';

/**
 * Icon mapping for string-based icon names from JSON
 */
const iconMap = {
  'Users': Users,
  'Building': Building,
  'FileText': FileText,
  'Scale': Scale,
  'BookOpen': BookOpen,
  'Heart': Heart
};

/**
 * Transform database profile format to component format
 */
export const transformProfile = (profile) => {
  // Map overall ratings to status
  // Map JSON overall_rating to display format with updated emojis
  const statusMap = {
    'Full Pass': 'Strong Pass',  // Change Full Pass to Strong Pass in display
    'Strong Pass': 'Strong Pass',
    'Pass': 'Pass',
    'Partial': 'Partial',
    'Mixed': 'Partial',
    'Failing': 'Fail',
    'Fail': 'Fail',
    'Clear Fail': 'Clear Fail'
  };
  
  // Map status to colors
  const colorMap = {
    'Strong Pass': 'green',
    'Pass': 'green',
    'Partial': 'yellow',
    'Fail': 'red',
    'Clear Fail': 'red'
  };
  
  // Map pillar assessments to colors
  const pillarColorMap = {
    'Strong Pass': 'green',
    'Pass': 'green',
    'Partial': 'yellow',
    'Mixed': 'yellow',
    'Fail': 'red',
    'Clear Fail': 'red'
  };
  
  const status = statusMap[profile.overall_rating] || 'Partial';
  const statusColor = colorMap[status] || 'yellow';
  
  // Convert pillars
  const transformedPillars = profile.pillars.map(pillar => ({
    name: pillar.pillar.replace(' / ', '/'),
    status: pillar.assessment,
    color: pillarColorMap[pillar.assessment] || 'yellow',
    evidence: pillar.evidence
  }));
  
  // Calculate pillar score breakdown for sorting only (doesn't affect display)
  const pillarCounts = {
    strongPass: 0,
    pass: 0,
    partial: 0,
    mixed: 0,
    fail: 0,
    clearFail: 0
  };
  
  profile.pillars.forEach(pillar => {
    switch (pillar.assessment) {
      case 'Strong Pass':
        pillarCounts.strongPass++;
        break;
      case 'Pass':
        pillarCounts.pass++;
        break;
      case 'Partial':
        pillarCounts.partial++;
        break;
      case 'Mixed':
        pillarCounts.mixed++;
        break;
      case 'Fail':
        pillarCounts.fail++;
        break;
      case 'Clear Fail':
        pillarCounts.clearFail++;
        break;
    }
  });
  
  // Calculate sorting score using two-tier system: overall rating first, then pillar breakdown
  const calculateSortingScore = () => {
    // Overall rating ranks (primary sort key)
    const overallRank = {
      "Clear Fail": 0,
      "Failing": 1,
      "Fail": 1,
      "Partial": 2,
      "Pass": 3,
      "Full Pass": 4,
      "Strong Pass": 4
    };

    // Get overall rating from JSON and normalize
    let overall = profile.overall_rating;
    if (overall === "Full Pass") overall = "Strong Pass";
    if (overall === "Failing") overall = "Fail";

    const rank = overallRank[overall] !== undefined ? overallRank[overall] : -99;

    // Compute pillar-weighted score (secondary sort key - tiebreaker)
    const pillarScore = (
      3 * pillarCounts.strongPass +
      2 * pillarCounts.pass +
      1 * (pillarCounts.partial + pillarCounts.mixed) +
      (-2) * pillarCounts.fail +
      (-5) * pillarCounts.clearFail
    );

    // Return composite score: rank * 10000 + pillarScore
    // This ensures overall rating dominates, pillar score breaks ties
    return rank * 10000 + pillarScore;
  };
  
  const sortingScore = calculateSortingScore();
  
  // Generate overall assessment text with updated emojis
  const getOverallText = (status) => {
    switch(status) {
      case 'Strong Pass':
        return `🏁 Overall MMR Alignment: ✅ ${status}`;
      case 'Pass':
        return `🏁 Overall MMR Alignment: 🟢 ${status}`;
      case 'Partial':
        return `🏁 Overall MMR Alignment: ⚠️ ${status}`;
      case 'Fail':
        return `🏁 Overall MMR Alignment: ❌ ${status}`;
      case 'Clear Fail':
        return `🏁 Overall MMR Alignment: ❌❌ ${status}`;
      default:
        return `🏁 Overall MMR Alignment: ⚠️ ${status}`;
    }
  };
  
  return {
    name: profile.name,
    title: profile.role,
    status: status,
    statusColor: statusColor,
    icon: Users, // Default icon, can be customized per category
    overall: getOverallText(status),
    reflection: profile.reflection,
    pillars: transformedPillars,
    sortingScore: sortingScore  // For sorting only, doesn't affect display
  };
};

/**
 * Transform database categories to component format
 */
export const transformCategories = () => {
  const figures = {};
  
  // Group profiles by category
  mmrDatabase.profiles.forEach(profile => {
    const category = profile.category;
    if (!figures[category]) {
      figures[category] = [];
    }
    figures[category].push(transformProfile(profile));
  });
  
  return figures;
};

/**
 * Get category statistics from database
 */
export const getCategoryStats = () => {
  return mmrDatabase.statistics.by_category;
};

/**
 * Get overall statistics
 */
export const getOverallStats = () => {
  return mmrDatabase.statistics.overall_performance;
};

/**
 * Get category groups from JSON database with counts and smart filtering
 */
export const getCategoryGroups = (filterByStatus = null) => {
  const stats = getCategoryStats();
  const overallStats = getOverallStats();
  const categoryGroups = mmrDatabase.navigation.category_groups;
  
  // Get actual profile counts based on current data and filtering
  const getActualCounts = () => {
    const figures = transformCategories();
    const actualStats = {};
    let totalCount = 0;
    let unsortedCount = 0;
    
    // Count profiles in each category
    Object.keys(figures).forEach(categoryId => {
      let categoryFigures = figures[categoryId] || [];
      
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
      
      actualStats[categoryId] = categoryFigures.length;
      totalCount += categoryFigures.length;
    });
    
    // Check for unsorted profiles (profiles with categories not in our navigation)
    const allDefinedCategories = new Set();
    categoryGroups.forEach(group => {
      group.categories.forEach(cat => {
        allDefinedCategories.add(cat.id);
      });
    });
    
    // Count profiles in categories not defined in navigation
    Object.keys(figures).forEach(categoryId => {
      if (!allDefinedCategories.has(categoryId)) {
        let categoryFigures = figures[categoryId] || [];
        
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
        
        unsortedCount += categoryFigures.length;
      }
    });
    
    return { actualStats, totalCount, unsortedCount };
  };
  
  const { actualStats, totalCount, unsortedCount } = getActualCounts();
  
  // Transform JSON category groups to component format with smart filtering
  const processedGroups = categoryGroups.map(group => {
    // Special handling for "All Categories" to show total count
    if (group.id === 'all') {
      return {
        id: group.id,
        label: group.label,
        icon: iconMap[group.icon] || Users,
        count: totalCount,
        categories: group.categories
          .map(category => ({
            id: category.id,
            label: category.label,
            icon: iconMap[category.icon] || Users,
            count: actualStats[category.id] || 0
          }))
          .filter(category => category.count > 0) // Hide categories with 0 profiles
      };
    }
    
    // For other groups, calculate total from their categories and filter empty ones
    const filteredCategories = group.categories
      .map(category => ({
        id: category.id,
        label: category.label,
        icon: iconMap[category.icon] || Users,
        count: actualStats[category.id] || 0
      }))
      .filter(category => category.count > 0); // Hide categories with 0 profiles
    
    const groupTotal = filteredCategories.reduce((total, category) => {
      return total + category.count;
    }, 0);
    
    return {
      id: group.id,
      label: group.label,
      icon: iconMap[group.icon] || Users,
      count: groupTotal,
      categories: filteredCategories
    };
  })
  .filter(group => {
    // Hide groups that have no categories with profiles (except "All Categories")
    return group.id === 'all' || group.categories.length > 0;
  });
  
  // Add Unsorted category if there are unsorted profiles
  if (unsortedCount > 0) {
    // Add Unsorted as a standalone category in the "All Categories" group
    const allCategoriesGroup = processedGroups.find(group => group.id === 'all');
    if (allCategoriesGroup) {
      allCategoriesGroup.categories.push({
        id: 'Unsorted',
        label: 'Unsorted Profiles',
        icon: FileText,
        count: unsortedCount
      });
      allCategoriesGroup.count += unsortedCount;
    }
  }
  
  return processedGroups;
};

