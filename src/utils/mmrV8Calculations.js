// MMR v8 Calculation System
// Implements the new 6-level outcome system with priority pillars and sophisticated rules

import mmrV8Rules from '../data/mmr_v8_rules.json';

/**
 * Computes the MMR outcome using the v8 scoring system
 * @param {Object} profile - Profile object with pillars array
 * @param {Object} rules - MMR v8 rules (optional, defaults to imported rules)
 * @returns {string} - The computed MMR outcome rating
 */
export function computeMMROutcome(profile, rules = mmrV8Rules) {
  const bands = rules.pillar_bands;
  const priorityPillars = rules.priority_pillars;
  const levels = rules.outcome_levels.sort((a, b) => b.priority - a.priority); // Sort descending to check higher ratings first

  const counts = {
    num_fails: 0,
    num_partial_or_mixed: 0,
    num_pass_or_strong: 0,
    num_strong_pass: 0,
    priority_pass: 0,
    priority_partial: 0,
    priority_fails: 0,
    eliminationist_flag: false
  };

  // Count assessments across all pillars
  profile.pillars.forEach(p => {
    const assessment = p.assessment;
    const pillarName = p.pillar;
    
    if (bands["Fail Indicators"].includes(assessment)) counts.num_fails++;
    if (bands["Partial Indicators"].includes(assessment)) counts.num_partial_or_mixed++;
    if (bands["Positive Indicators"].includes(assessment)) counts.num_pass_or_strong++;
    if (assessment === "Strong Pass") counts.num_strong_pass++;
    
    // Track priority pillar performance
    if (priorityPillars.includes(pillarName)) {
      if (bands["Fail Indicators"].includes(assessment)) counts.priority_fails++;
      if (bands["Partial Indicators"].includes(assessment)) counts.priority_partial++;
      if (bands["Positive Indicators"].includes(assessment)) counts.priority_pass++;
    }
  });

  // Check for eliminationist content in reflection
  counts.eliminationist_flag = /eliminationis/i.test(profile.reflection || "");

  // Check for Systemic Fail conditions first (highest priority)
  if (counts.eliminationist_flag) return "Systemic Fail";
  if (counts.num_fails >= 4) return "Systemic Fail";

  // Apply priority fail rule: Any priority pillar fail → caps at "Failing"
  if (counts.priority_fails >= 1) return "Failing";

  // Apply priority cap rule: 2+ priority partials → caps positive ratings to "Partial Indicators"
  const hasPriorityPartialCap = counts.priority_partial >= 2;

  // Evaluate levels in priority order
  for (const level of levels) {
    const cond = level.conditions;
    
    // Check eliminationist flag condition
    if (cond.eliminationist_flag !== undefined) {
      if (cond.eliminationist_flag && !counts.eliminationist_flag) continue;
      if (!cond.eliminationist_flag && counts.eliminationist_flag) continue;
    }
    
    // Check fail count conditions
    if (cond.min_fails !== undefined && counts.num_fails < cond.min_fails) continue;
    if (cond.max_fails !== undefined && counts.num_fails > cond.max_fails) continue;
    
    // Check partial/mixed conditions
    if (cond.min_partial_or_mixed !== undefined && counts.num_partial_or_mixed < cond.min_partial_or_mixed) continue;
    if (cond.max_partial_or_mixed !== undefined && counts.num_partial_or_mixed > cond.max_partial_or_mixed) continue;
    
    // Check pass/strong conditions
    if (cond.min_pass_or_strong !== undefined && counts.num_pass_or_strong < cond.min_pass_or_strong) continue;
    if (cond.min_strong_pass !== undefined && counts.num_strong_pass < cond.min_strong_pass) continue;
    
    // Check priority pass conditions
    if (cond.min_priority_pass !== undefined && counts.priority_pass < cond.min_priority_pass) continue;

    // Apply priority cap rule for positive ratings
    if (hasPriorityPartialCap && ["High Positive Indicators", "Positive Indicators", "Emerging Positive Indicators"].includes(level.rating)) {
      return "Partial Indicators";
    }

    return level.rating;
  }

  return "Unknown";
}

/**
 * Maps MMR v8 outcomes to simplified categories for statistics
 * @param {string} outcome - The MMR v8 outcome rating
 * @returns {string} - Simplified category (Pass, Almost Pass, Partial, Fail)
 */
export function mapOutcomeToCategory(outcome) {
  switch (outcome) {
    case "High Positive Indicators":
      return "Pass";
    case "Positive Indicators":
    case "Emerging Positive Indicators":
      return "Almost Pass";
    case "Partial Indicators":
      return "Partial";
    case "Failing":
    case "Systemic Fail":
      return "Fail";
    default:
      return "Unknown";
  }
}

/**
 * Maps MMR v8 outcomes to 6-level categories for detailed statistics
 * @param {string} outcome - The MMR v8 outcome rating
 * @returns {string} - 6-level category
 */
export function mapOutcomeTo6Level(outcome) {
  switch (outcome) {
    case "High Positive Indicators":
      return "High Positive";
    case "Positive Indicators":
      return "Positive";
    case "Emerging Positive Indicators":
      return "Emerging Positive";
    case "Partial Indicators":
      return "Partial";
    case "Failing":
      return "Failing";
    case "Systemic Fail":
      return "Systemic Fail";
    default:
      return "Unknown";
  }
}

/**
 * Gets the display color for an MMR v8 outcome
 * @param {string} outcome - The MMR v8 outcome rating
 * @returns {string} - CSS color class or hex color
 */
export function getOutcomeColor(outcome) {
  switch (outcome) {
    case "High Positive Indicators":
      return "#16a34a"; // Dark green
    case "Positive Indicators":
      return "#22c55e"; // Green
    case "Emerging Positive Indicators":
      return "#84cc16"; // Light green
    case "Partial Indicators":
      return "#f59e0b"; // Orange
    case "Failing":
      return "#ef4444"; // Red
    case "Systemic Fail":
      return "#dc2626"; // Dark red
    default:
      return "#6b7280"; // Gray
  }
}

/**
 * Gets the display icon for an MMR v8 outcome
 * @param {string} outcome - The MMR v8 outcome rating
 * @returns {string} - Icon symbol
 */
export function getOutcomeIcon(outcome) {
  switch (outcome) {
    case "High Positive Indicators":
      return "✅";
    case "Positive Indicators":
      return "🟢";
    case "Emerging Positive Indicators":
      return "🟡";
    case "Partial Indicators":
      return "🟠";
    case "Failing":
      return "🔴";
    case "Systemic Fail":
      return "❌";
    default:
      return "❓";
  }
}

/**
 * Calculate group statistics using MMR v8 outcomes
 * @param {Array} figures - Array of profile objects
 * @returns {Object} - Statistics object with counts and percentages
 */
export function calculateGroupStatistics(figures) {
  if (!figures || figures.length === 0) {
    return {
      total: 0,
      pass: 0,
      almostPass: 0,
      partial: 0,
      fail: 0,
      passRate: 0,
      level: "No Data"
    };
  }

  const stats = {
    total: figures.length,
    pass: 0,
    almostPass: 0,
    partial: 0,
    fail: 0
  };

  figures.forEach(figure => {
    const outcome = computeMMROutcome(figure);
    const category = mapOutcomeToCategory(outcome);
    
    switch (category) {
      case "Pass":
        stats.pass++;
        break;
      case "Almost Pass":
        stats.almostPass++;
        break;
      case "Partial":
        stats.partial++;
        break;
      case "Fail":
        stats.fail++;
        break;
    }
  });

  // Calculate pass rate (Pass + Almost Pass)
  stats.passRate = Math.round(((stats.pass + stats.almostPass) / stats.total) * 100);

  // Determine overall level
  if (stats.passRate >= 80) {
    stats.level = "Strong";
  } else if (stats.passRate >= 60) {
    stats.level = "Mixed";
  } else {
    stats.level = "Needs Improvement";
  }

  return stats;
}

// Legacy compatibility function - maps old 4-level system to new outcomes
export function calculateOverallRating(pillars) {
  const profile = { pillars };
  const outcome = computeMMROutcome(profile);
  return mapOutcomeToCategory(outcome);
}

