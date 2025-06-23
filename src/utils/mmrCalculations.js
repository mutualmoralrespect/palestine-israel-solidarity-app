/**
 * MMR Rating Calculation Utilities
 * 
 * This module handles the calculation of overall MMR ratings from individual pillar assessments.
 * Users only need to update the JSON with pillar scores - all overall ratings are calculated dynamically.
 */

/**
 * Convert pillar assessment text to outcome category
 * @param {string} assessment - The pillar assessment (e.g., "Strong Pass", "Fail", etc.)
 * @returns {string} - Outcome category: 'pass', 'partial', or 'fail'
 */
export const getAssessmentOutcome = (assessment) => {
  if (!assessment || typeof assessment !== 'string') return 'fail';
  
  const normalizedAssessment = assessment.toLowerCase().trim();
  
  // Pass outcomes: Strong Pass, Full Pass, Pass
  if (normalizedAssessment.includes('strong pass') || 
      normalizedAssessment.includes('full pass') || 
      normalizedAssessment === 'pass') {
    return 'pass';
  }
  
  // Partial outcomes: Partial, Mixed
  if (normalizedAssessment.includes('partial') || normalizedAssessment.includes('mixed')) {
    return 'partial';
  }
  
  // Fail outcomes: Fail, Failing, Clear Fail
  if (normalizedAssessment.includes('fail')) {
    return 'fail';
  }
  
  // Default to fail for unknown assessments
  return 'fail';
};

/**
 * Calculate overall MMR rating using 4-level logic system
 * @param {Array} pillars - Array of pillar objects with assessment property
 * @returns {Object} - { rating: string, category: string, outcomes: object }
 */
export const calculateOverallRating = (pillars) => {
  if (!pillars || !Array.isArray(pillars) || pillars.length === 0) {
    return { rating: 'No Assessment', category: 'fail', outcomes: { pass: 0, partial: 0, fail: 7 } };
  }
  
  // Count outcomes for each pillar
  const outcomes = { pass: 0, partial: 0, fail: 0 };
  
  pillars.forEach(pillar => {
    const outcome = getAssessmentOutcome(pillar.assessment || '');
    outcomes[outcome]++;
  });
  
  // Apply 6-level logic system
  let rating, category;
  
  if (outcomes.fail > 0) {
    // 🔴 Fail - Any Fails present
    rating = 'Fail';
    category = 'fail';
  } else if (outcomes.pass === 7) {
    // ✅ Pass - All 7 Pass (perfect)
    rating = 'Pass';
    category = 'pass';
  } else if (outcomes.pass === 6 && outcomes.partial === 1) {
    // ✅ Almost Pass - No Fails, 6 Pass, 1 Partial
    rating = 'Almost Pass';
    category = 'almost_pass';
  } else if (outcomes.pass >= 4 && outcomes.pass <= 5) {
    // 🟢 Strong Partial - No Fails, 4-5 Pass, rest Partial
    rating = 'Strong Partial';
    category = 'strong_partial';
  } else if (outcomes.pass >= 2 && outcomes.pass <= 3) {
    // 🟡 Partial - No Fails, 2-3 Pass, rest Partial
    rating = 'Partial';
    category = 'partial';
  } else {
    // 🟠 Weak Partial - No Fails, 0-1 Pass, majority Partial
    rating = 'Weak Partial';
    category = 'weak_partial';
  }
  
  return {
    rating,
    category,
    outcomes
  };
};

/**
 * Calculate statistics for a group of figures using 6-level system
 * @param {Array} figures - Array of figure objects with pillar assessments
 * @returns {Object} - Statistics object with counts for all 6 levels
 */
export const calculateGroupStatistics = (figures) => {
  if (!figures || !Array.isArray(figures) || figures.length === 0) {
    return {
      total: 0,
      pass: 0,
      almost_pass: 0,
      strong_partial: 0,
      partial: 0,
      weak_partial: 0,
      fail: 0,
      passRate: 0
    };
  }
  
  let pass = 0;
  let almost_pass = 0;
  let strong_partial = 0;
  let partial = 0;
  let weak_partial = 0;
  let fail = 0;
  
  figures.forEach(figure => {
    const overallRating = calculateOverallRating(figure.pillars);
    
    if (overallRating.category === 'pass') {
      pass++;
    } else if (overallRating.category === 'almost_pass') {
      almost_pass++;
    } else if (overallRating.category === 'strong_partial') {
      strong_partial++;
    } else if (overallRating.category === 'partial') {
      partial++;
    } else if (overallRating.category === 'weak_partial') {
      weak_partial++;
    } else {
      fail++;
    }
  });
  
  const total = figures.length;
  const passRate = total > 0 ? Math.round(((pass + almost_pass) / total) * 100) : 0;
  
  return {
    total,
    pass,
    almost_pass,
    strong_partial,
    partial,
    weak_partial,
    fail,
    passRate
  };
};

/**
 * Get display rating for a figure (calculated dynamically)
 * @param {Object} figure - Figure object with pillar assessments
 * @returns {string} - Display rating (e.g., "Full Pass", "Failing")
 */
export const getDisplayRating = (figure) => {
  if (!figure || !figure.pillars) {
    return 'No Assessment';
  }
  
  const overallRating = calculateOverallRating(figure.pillars);
  return overallRating.rating;
};

