import { Users, Building, FileText, Scale, BookOpen, Heart } from 'lucide-react';
import mmrDatabase from '../data/6_pillar_json_database.json';
import categoryNavigation from '../data/category_navigation.json';

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
  // Map JSON overall_rating to display values with updated colors
  const statusMap = {
    'Full Pass': 'Strong Pass',
    'Strong Pass': 'Strong Pass',
    'Pass': 'Pass',
    'Strong': 'Strong Pass', // Map 'Strong' to 'Strong Pass'
    'Partial': 'Partial',
    'Mixed': 'Partial',
    'Failing': 'Fail',
    'Fail': 'Fail',
    'Strong Fail': 'Strong Fail',
    'Weak': 'Partial' // Optionally treat 'Weak' as Partial
  };

  // Updated 3-level color mapping
  const colorMap = {
    'Pass': '#4CAF50',           // Green
    'Partial': '#FFC107',        // Gold/Amber
    'Fail': '#fde8e8'            // Light red background for fail
  };
  
  // Map pillar assessments to colors
  const pillarColorMap = {
    'Pass': 'green',
    'Partial': 'yellow',
    'Fail': 'red'
  };
  
  // Clean and normalize overall rating
  let overall = profile.overall_rating || profile.overall_alignment || '';
  overall = overall.replace(/[^a-zA-Z ]/g, '').trim().toLowerCase();
  let status = 'Partial';
  if (overall.includes('fail')) status = 'Fail';
  else if (overall.includes('partial') || overall.includes('mixed') || overall.includes('weak')) status = 'Partial';
  else if (overall.includes('pass') || overall.includes('strong')) status = 'Pass';
  const statusColor = colorMap[status] || 'yellow';
  
  // Convert pillars
  const cleanAssessment = (assessment) => {
    // Remove emojis and extra whitespace, keep only the text
    return (assessment || '').replace(/[^a-zA-Z ]/g, '').trim().toLowerCase();
  };
  const transformedPillars = profile.pillars.map(pillar => {
    let cleanStatus = cleanAssessment(pillar.assessment);
    if (cleanStatus === 'strong pass') cleanStatus = 'pass';
    if (cleanStatus === 'strong fail' || cleanStatus === 'clear fail') cleanStatus = 'fail';
    return {
      name: pillar.pillar.replace(' / ', '/'),
      status: cleanStatus.charAt(0).toUpperCase() + cleanStatus.slice(1),
      color: pillarColorMap[cleanStatus.charAt(0).toUpperCase() + cleanStatus.slice(1)] || 'yellow',
      evidence: pillar.evidence
    };
  });
  
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
      "Fail": 1,
      "Partial": 2,
      "Pass": 3
    };

    // Use normalized status for sorting
    const rank = overallRank[status] !== undefined ? overallRank[status] : -99;

    // Compute pillar-weighted score (secondary sort key - tiebreaker)
    const pillarScore = (
      2 * pillarCounts.pass +
      1 * pillarCounts.partial +
      (-2) * pillarCounts.fail
    );

    // Return composite score: rank * 10000 + pillarScore
    // This ensures overall rating dominates, pillar score breaks ties
    return rank * 10000 + pillarScore;
  };
  
  const sortingScore = calculateSortingScore();
  
  // Generate overall assessment text with updated emojis
  const getOverallText = (status) => {
    switch(status) {
      case 'Pass':
        return `🏁 Overall MMR Alignment: 🟢 ${status}`;
      case 'Partial':
        return `🏁 Overall MMR Alignment: ⚠️ ${status}`;
      case 'Fail':
        return `🏁 Overall MMR Alignment: ❌ ${status}`;
      default:
        return `🏁 Overall MMR Alignment: ⚠️ ${status}`;
    }
  };
  
  return {
    name: profile.subject,
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
  mmrDatabase.forEach(profile => {
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
 * Get overall statistics dynamically from the database
 */
export const getOverallStats = () => {
  const total_profiles = mmrDatabase.length;
  let passing = 0;
  let partial = 0;
  let failing = 0;

  mmrDatabase.forEach(profile => {
    // Normalize status field (may be 'overall_alignment', 'status', etc.)
    const status = (profile.overall_alignment || profile.status || '').toLowerCase();
    if (status.includes('pass')) {
      passing++;
    } else if (status.includes('partial') || status.includes('mixed')) {
      partial++;
    } else if (status.includes('fail')) {
      failing++;
    }
  });

  const pass_rate = total_profiles > 0 ? `${Math.round((passing / total_profiles) * 100)}%` : '0%';

  return {
    total_profiles,
    passing,
    partial,
    failing,
    pass_rate
  };
};

/**
 * Get category groups from separate category_navigation.json file with counts and smart filtering
 */
export const getCategoryGroups = (filterByStatus = null) => {
  // Use the new category navigation JSON
  const categoryGroups = categoryNavigation.category_groups;

  // Get actual profile counts based on current data and filtering
  const getActualCounts = () => {
    const figures = transformCategories();
    const actualStats = {};
    let totalCount = 0;
    let unsortedCount = 0;
    let unsortedProfiles = [];

    // Build a set of all defined categories from the navigation
    const allDefinedCategories = new Set();
    categoryGroups.forEach(group => {
      group.categories.forEach(cat => {
        allDefinedCategories.add(cat.id);
      });
    });

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

      if (!allDefinedCategories.has(categoryId)) {
        unsortedCount += categoryFigures.length;
        unsortedProfiles.push(...categoryFigures);
      } else {
        actualStats[categoryId] = categoryFigures.length;
        totalCount += categoryFigures.length;
      }
    });

    return { actualStats, totalCount, unsortedCount, unsortedProfiles };
  };

  const { actualStats, totalCount, unsortedCount, unsortedProfiles } = getActualCounts();

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

  // Add 'Other' group if there are unsorted profiles
  if (unsortedCount > 0) {
    // Group unsorted profiles by their actual category name
    const otherCategoriesMap = {};
    unsortedProfiles.forEach(profile => {
      const cat = profile.category || 'Uncategorized';
      if (!otherCategoriesMap[cat]) otherCategoriesMap[cat] = [];
      otherCategoriesMap[cat].push(profile);
    });
    const otherCategories = Object.entries(otherCategoriesMap).map(([cat, profiles]) => ({
      id: cat,
      label: cat,
      icon: FileText,
      count: profiles.length,
      profiles
    }));
    processedGroups.push({
      id: 'other',
      label: 'Other',
      icon: FileText,
      count: unsortedCount,
      categories: otherCategories
    });
  }

  return processedGroups;
};

