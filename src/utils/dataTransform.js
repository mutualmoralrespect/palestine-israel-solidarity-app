import { Users, Building, FileText, Scale, BookOpen } from 'lucide-react';
import mmrDatabase from '../data/mmr_complete_database.json';

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
 * Get category groups with correct counts from database
 */
export const getCategoryGroups = () => {
  const stats = getCategoryStats();
  
  return [
    {
      id: 'all',
      label: 'All Categories',
      icon: Users,
      categories: []
    },
    {
      id: 'palestinian',
      label: 'Palestinian Perspectives',
      icon: Users,
      categories: [
        { id: 'Palestinian Authority', label: 'Palestinian Authority', icon: Users, count: stats['Palestinian Authority']?.total || 0 },
        { id: 'Hamas Officials', label: 'Hamas Officials', icon: Users, count: stats['Hamas Officials']?.total || 0 },
        { id: 'Palestinian Voices', label: 'Palestinian Voices', icon: Users, count: stats['Palestinian Voices']?.total || 0 }
      ]
    },
    {
      id: 'israeli',
      label: 'Israeli Perspectives',
      icon: Users,
      categories: [
        { id: 'Israeli Politicians', label: 'Israeli Politicians', icon: Users, count: stats['Israeli Politicians']?.total || 0 }
      ]
    },
    {
      id: 'international',
      label: 'International Voices',
      icon: FileText,
      categories: [
        { id: 'US Politicians', label: 'US Politicians', icon: Users, count: stats['US Politicians']?.total || 0 },
        { id: 'Journalists', label: 'Journalists', icon: FileText, count: stats['Journalists']?.total || 0 },
        { id: 'NGO Leaders', label: 'NGO Leaders', icon: Users, count: stats['NGO Leaders']?.total || 0 }
      ]
    },
    {
      id: 'peace',
      label: 'Peace & Advocacy',
      icon: Users,
      categories: [
        { id: 'Peace Advocates', label: 'Peace Advocates', icon: Users, count: stats['Peace Advocates']?.total || 0 },
        { id: 'Organizations', label: 'Organizations', icon: Building, count: stats['Organizations']?.total || 0 }
      ]
    },
    {
      id: 'academic',
      label: 'Academic & Literary',
      icon: BookOpen,
      categories: [
        { id: 'Academics', label: 'Academics', icon: BookOpen, count: 0 }, // Not in current database
        { id: 'Books', label: 'Books', icon: FileText, count: 0 },
        { id: 'Legal Scholars', label: 'Legal Scholars', icon: Scale, count: 0 },
        { id: 'Historians', label: 'Historians', icon: BookOpen, count: 0 }
      ]
    }
  ];
};

