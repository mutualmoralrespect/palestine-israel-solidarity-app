import React from 'react';
import { Users, Building, FileText, Scale, BookOpen } from 'lucide-react';

const CategoryNavigation = ({ 
  categories, 
  activeCategory, 
  onCategoryChange,
  className = ""
}) => {
  const categoryIcons = {
    'Peace Advocates': Users,
    'Organizations': Building,
    'Journalists': FileText,
    'Legal Scholars': Scale,
    'Historians': BookOpen,
    'Israeli Politicians': Users,
    'Palestinian Politicians': Users,
    'US Politicians': Users
  };

  const getCategoryColor = (category) => {
    const colors = {
      'Peace Advocates': 'bg-green-500',
      'Organizations': 'bg-blue-500', 
      'Journalists': 'bg-yellow-500',
      'Legal Scholars': 'bg-purple-500',
      'Historians': 'bg-teal-500',
      'Israeli Politicians': 'bg-pink-500',
      'Palestinian Politicians': 'bg-indigo-500',
      'US Politicians': 'bg-orange-500'
    };
    return colors[category] || 'bg-gray-500';
  };

  return (
    <div className={`flex flex-wrap gap-2 mb-6 ${className}`}>
      {Object.entries(categories).map(([category, figures]) => {
        const IconComponent = categoryIcons[category] || Users;
        const isActive = activeCategory === category;
        const colorClass = getCategoryColor(category);
        
        return (
          <button
            key={category}
            onClick={() => onCategoryChange(category)}
            className={`
              flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-200
              ${isActive 
                ? `${colorClass} text-white shadow-lg transform scale-105` 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:shadow-md'
              }
            `}
          >
            <IconComponent size={16} />
            <span>{category}</span>
            <span className={`
              text-xs px-2 py-1 rounded-full font-bold
              ${isActive ? 'bg-white/20 text-white' : `${colorClass} text-white`}
            `}>
              {figures.length}
            </span>
          </button>
        );
      })}
    </div>
  );
};

export default CategoryNavigation;

