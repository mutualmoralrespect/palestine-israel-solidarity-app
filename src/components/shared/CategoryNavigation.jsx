import React from 'react';
import { Users } from 'lucide-react';

const CategoryNavigation = ({ 
  categoryGroups, 
  activeCategory, 
  onCategoryChange,
  showAllButton = true,
  allButtonLabel = "All Categories",
  totalCount = 0
}) => {
  return (
    <div className="mb-6">
      {/* All Categories Button */}
      {showAllButton && (
        <div className="flex justify-center mb-4">
          <button
            onClick={() => onCategoryChange('All')}
            className={`flex items-center gap-2 px-6 py-3 rounded-lg border-2 transition-all duration-200 ${
              activeCategory === 'All'
                ? 'bg-blue-600 text-white border-blue-600 shadow-lg'
                : 'bg-white text-gray-700 border-gray-300 hover:border-blue-300 hover:bg-blue-50'
            }`}
          >
            <Users size={18} />
            <span className="font-semibold">{allButtonLabel}</span>
            <span className={`text-sm px-2 py-1 rounded-full ${
              activeCategory === 'All'
                ? 'bg-blue-500 text-white'
                : 'bg-gray-100 text-gray-600'
            }`}>
              {totalCount}
            </span>
          </button>
        </div>
      )}

      {/* Category Groups */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {categoryGroups.slice(showAllButton ? 1 : 0).map((group) => {
          const GroupIcon = group.icon;
          const groupTotal = group.categories.reduce((sum, cat) => sum + cat.count, 0);
          const isGroupActive = activeCategory === `group:${group.id}`;
          
          return (
            <div key={group.id} className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
              {/* Clickable Group Header */}
              <button
                onClick={() => onCategoryChange(`group:${group.id}`)}
                className={`w-full flex items-center gap-2 mb-3 p-2 rounded-lg transition-all duration-200 ${
                  isGroupActive
                    ? 'bg-blue-100 text-blue-800 border border-blue-200'
                    : 'hover:bg-gray-50'
                }`}
              >
                <GroupIcon size={16} className={isGroupActive ? "text-blue-600" : "text-gray-600"} />
                <h3 className={`font-semibold text-sm flex-1 text-left ${
                  isGroupActive ? "text-blue-800" : "text-gray-800"
                }`}>
                  {group.label}
                </h3>
                <span className={`text-xs px-2 py-1 rounded-full ${
                  isGroupActive
                    ? 'bg-blue-200 text-blue-800'
                    : 'bg-gray-100 text-gray-600'
                }`}>
                  {groupTotal}
                </span>
              </button>
              
              <div className="space-y-1">
                {group.categories.map((category) => {
                  const Icon = category.icon;
                  const isCategoryActive = activeCategory === category.id;
                  return (
                    <button
                      key={category.id}
                      onClick={() => onCategoryChange(category.id)}
                      className={`w-full flex items-center justify-between px-3 py-2 rounded-md text-sm transition-all duration-200 ${
                        isCategoryActive
                          ? 'bg-blue-100 text-blue-800 border border-blue-200'
                          : 'hover:bg-gray-50 text-gray-700'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <Icon size={14} />
                        <span>{category.label}</span>
                      </div>
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        isCategoryActive
                          ? 'bg-blue-200 text-blue-800'
                          : 'bg-gray-100 text-gray-600'
                      }`}>
                        {category.count}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CategoryNavigation;

