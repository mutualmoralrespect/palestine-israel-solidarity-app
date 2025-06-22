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
  const statusMap = {
    'Full Pass': 'Full Pass',
    'Pass': 'Pass', 
    'Partial': 'Partial',
    'Failing': 'Failing',
    'Clear Fail': 'Clear Fail'
  };
  
  // Map status to colors
  const colorMap = {
    'Full Pass': 'green',
    'Pass': 'green',
    'Partial': 'yellow', 
    'Failing': 'red',
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
  
  // Generate overall assessment text
  const getOverallText = (status) => {
    switch(status) {
      case 'Full Pass':
      case 'Pass':
        return `🏁 Overall MMR Alignment: ✅ ${status}`;
      case 'Partial':
        return `🏁 Overall MMR Alignment: ⚠️ ${status}`;
      default:
        return `🏁 Overall MMR Alignment: ❌ ${status}`;
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
    pillars: transformedPillars
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
 * Get category groups from JSON database with counts
 */
export const getCategoryGroups = () => {
  const stats = getCategoryStats();
  const categoryGroups = mmrDatabase.navigation.category_groups;
  
  // Transform JSON category groups to component format with counts and icons
  return categoryGroups.map(group => ({
    id: group.id,
    label: group.label,
    icon: iconMap[group.icon] || Users,
    categories: group.categories.map(category => ({
      id: category.id,
      label: category.label,
      icon: iconMap[category.icon] || Users,
      count: stats[category.id]?.total || 0
    }))
  }));
};

