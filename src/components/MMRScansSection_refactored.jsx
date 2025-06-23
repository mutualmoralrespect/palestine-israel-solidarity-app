import React from 'react';
import MMRProfilesSection from './MMRProfilesSection';

const MMRScansSection = () => {
  return (
    <MMRProfilesSection
      title="MMR Scans by Type"
      description="Comprehensive analysis of public figures across all categories - both those who pass and fail MMR standards"
      showRollup={true}
      filterByStatus={null}
      bgColor="bg-gray-50"
    />
  );
};

export default MMRScansSection;

