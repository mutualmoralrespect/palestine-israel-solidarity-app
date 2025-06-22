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
  
  // Apply 4-level logic system
  let rating, category;
  
  // 🔴 Fail: If 2+ Fails, or 1 Fail + 2+ Partials, or any red-critical category
  if (outcomes.fail >= 2 || (outcomes.fail >= 1 && outcomes.partial >= 2)) {
    rating = 'Fail';
    category = 'fail';
  }
  // 🟡 Partial: If 1 Fail only, or 2+ Partials with no Fails
  else if (outcomes.fail === 1 || (outcomes.fail === 0 && outcomes.partial >= 2)) {
    rating = 'Partial';
    category = 'partial';
  }
  // 🟢 Almost Pass: If no Fails, and exactly 1 Partial (all other pillars must be Pass)
  else if (outcomes.fail === 0 && outcomes.partial === 1) {
    rating = 'Almost Pass';
    category = 'almost_pass';
  }
  // ✅ Pass: If no Fails, and 0 Partials (all 7 pillars must be Pass)
  else if (outcomes.fail === 0 && outcomes.partial === 0) {
    rating = 'Pass';
    category = 'pass';
  }
  // Fallback
  else {
    rating = 'Fail';
    category = 'fail';
  }
  
  return {
    rating,
    category,
    outcomes
  };
};

/**
 * Calculate statistics for a group of figures using 4-level system
 * @param {Array} figures - Array of figure objects with pillar assessments
 * @returns {Object} - Statistics object with counts for all 4 levels
 */
export const calculateGroupStatistics = (figures) => {
  if (!figures || !Array.isArray(figures) || figures.length === 0) {
    return {
      total: 0,
      pass: 0,
      almost_pass: 0,
      partial: 0,
      fail: 0,
      passRate: 0
    };
  }
  
  let pass = 0;
  let almost_pass = 0;
  let partial = 0;
  let fail = 0;
  
  figures.forEach(figure => {
    const overallRating = calculateOverallRating(figure.pillars);
    
    if (overallRating.category === 'pass') {
      pass++;
    } else if (overallRating.category === 'almost_pass') {
      almost_pass++;
    } else if (overallRating.category === 'partial') {
      partial++;
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
    partial,
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

