import React, { useState, useMemo } from 'react';
import { Search, X, ChevronDown } from 'lucide-react';
import ProfileCard from './ProfileCard';

const ProfileGrid = ({ 
  figures, 
  title = "Profiles",
  showSearch = true,
  showSort = true,
  showExpandControls = true 
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState('none');
  const [expandedCards, setExpandedCards] = useState(new Set());
  const [allExpanded, setAllExpanded] = useState(false);

  // Calculate score for sorting
  const calculateScore = (pillars) => {
    if (!pillars || pillars.length === 0) return 0;
    
    let totalScore = 0;
    pillars.forEach(pillar => {
      const assessment = pillar.assessment || pillar.status || '';
      if (assessment.includes('Strong Pass') || assessment === 'Strong') {
        totalScore += 2;
      } else if (assessment.includes('Pass')) {
        totalScore += 1;
      } else if (assessment.includes('Partial') || assessment.includes('Mixed')) {
        totalScore += 0.5;
      }
    });
    
    return totalScore / pillars.length;
  };

  // Process figures with search and sort
  const processedFigures = useMemo(() => {
    let filtered = figures;
    
    // Apply search filter
    if (searchTerm.trim()) {
      const searchLower = searchTerm.toLowerCase();
      filtered = filtered.filter(figure => 
        figure.name.toLowerCase().includes(searchLower) ||
        figure.title.toLowerCase().includes(searchLower) ||
        (figure.category && figure.category.toLowerCase().includes(searchLower))
      );
    }
    
    // Apply sorting
    if (sortOrder !== 'none') {
      filtered = [...filtered].sort((a, b) => {
        const scoreA = calculateScore(a.pillars);
        const scoreB = calculateScore(b.pillars);
        
        if (sortOrder === 'high-to-low') {
          return scoreB - scoreA;
        } else if (sortOrder === 'low-to-high') {
          return scoreA - scoreB;
        }
        return 0;
      });
    }
    
    return filtered;
  }, [figures, searchTerm, sortOrder]);

  // Toggle individual card expansion
  const toggleCardExpansion = (index) => {
    const newExpanded = new Set(expandedCards);
    if (newExpanded.has(index)) {
      newExpanded.delete(index);
    } else {
      newExpanded.add(index);
    }
    setExpandedCards(newExpanded);
  };

  // Toggle all cards expansion
  const toggleAllCards = (totalCount) => {
    if (allExpanded) {
      setExpandedCards(new Set());
      setAllExpanded(false);
    } else {
      const allIndices = Array.from({ length: totalCount }, (_, i) => i);
      setExpandedCards(new Set(allIndices));
      setAllExpanded(true);
    }
  };

  // Clear search
  const clearSearch = () => {
    setSearchTerm('');
  };

  return (
    <div className="space-y-6">
      {/* Search and Sort Controls */}
      {(showSearch || showSort) && (
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          {/* Search Input */}
          {showSearch && (
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search profiles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-10 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent w-64"
              />
              {searchTerm && (
                <button
                  onClick={clearSearch}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <X size={16} />
                </button>
              )}
            </div>
          )}

          {/* Sort Dropdown */}
          {showSort && (
            <div className="relative">
              <select
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value)}
                className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-8 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="none">Default Order</option>
                <option value="high-to-low">High to Low Score</option>
                <option value="low-to-high">Low to High Score</option>
              </select>
              <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" size={16} />
            </div>
          )}
        </div>
      )}

      {/* Expand/Collapse All Controls */}
      {showExpandControls && processedFigures.length > 0 && (
        <div className="flex justify-center gap-4">
          <button
            onClick={() => toggleAllCards(processedFigures.length)}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            {allExpanded ? 'Collapse All' : 'Expand All'}
            <ChevronDown className={`transition-transform ${allExpanded ? 'rotate-180' : ''}`} size={16} />
          </button>
          <div className="text-sm text-gray-600 flex items-center">
            Showing {processedFigures.length} profile{processedFigures.length !== 1 ? 's' : ''}
          </div>
        </div>
      )}

      {/* Figures Display */}
      <div className="space-y-6">
        {processedFigures.map((figure, index) => (
          <ProfileCard
            key={index}
            figure={figure}
            index={index}
            isExpanded={expandedCards.has(index)}
            onToggleExpansion={toggleCardExpansion}
          />
        ))}
      </div>

      {/* No Results Message */}
      {processedFigures.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">
            {searchTerm.trim() ? 
              `No profiles found matching "${searchTerm}"` : 
              'No profiles found.'}
          </p>
        </div>
      )}
    </div>
  );
};

export default ProfileGrid;

