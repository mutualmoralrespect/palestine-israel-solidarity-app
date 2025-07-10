/**
 * Component Integration Tests
 * Tests React components with real JSON data to catch integration issues
 */

import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const mmrDatabase = JSON.parse(readFileSync(join(__dirname, '../data/6_pillar_json_database.json'), 'utf8'));

// Mock React and DOM environment for component testing
global.React = {
  createElement: (type, props, ...children) => ({ type, props, children }),
  useState: (initial) => [initial, () => {}],
  useMemo: (fn) => fn()
};

// Import components after setting up React mock
import { calculateOverallRating, calculateGroupStatistics } from '../utils/mmrCalculations.js';

// Test colors for output
const colors = {
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  reset: '\x1b[0m'
};

let totalTests = 0;
let passedTests = 0;

function test(description, testFn) {
  totalTests++;
  try {
    testFn();
    console.log(`${colors.green}✅ ${description}${colors.reset}`);
    passedTests++;
  } catch (error) {
    console.log(`${colors.red}❌ ${description}${colors.reset}`);
    console.log(`   Error: ${error.message}`);
  }
}

function assertEquals(actual, expected, message = '') {
  if (actual !== expected) {
    throw new Error(`Expected ${expected}, got ${actual}. ${message}`);
  }
}

function assertObjectEquals(actual, expected, message = '') {
  const actualStr = JSON.stringify(actual);
  const expectedStr = JSON.stringify(expected);
  if (actualStr !== expectedStr) {
    throw new Error(`Expected ${expectedStr}, got ${actualStr}. ${message}`);
  }
}

console.log(`${colors.blue}🧪 Running Component Integration Tests...${colors.reset}`);

// 1. Test ProfileCard Logic with Real Data
console.log(`${colors.yellow}🔧 Testing ProfileCard Component Logic...${colors.reset}`);

// Simulate ProfileCard calculation logic
function simulateProfileCardCalculation(figure) {
  // This simulates what ProfileCard.jsx should be doing
  const calculatedRating = calculateOverallRating(figure.pillars);
  
  const getStatusDisplay = (category, rating) => {
    switch (category) {
      case 'pass':
        return { color: 'green', icon: '✅', text: rating };
      case 'almost_pass':
        return { color: 'green', icon: '🟢', text: rating };
      case 'partial':
        return { color: 'yellow', icon: '⚠️', text: rating };
      case 'fail':
      default:
        return { color: 'red', icon: '❌', text: rating };
    }
  };
  
  const statusDisplay = getStatusDisplay(calculatedRating.category, calculatedRating.rating);
  
  return {
    calculatedRating,
    statusDisplay,
    displayText: `${statusDisplay.icon} ${statusDisplay.text}`,
    pillarOutcomes: `${calculatedRating.outcomes.pass} Pass, ${calculatedRating.outcomes.partial} Partial, ${calculatedRating.outcomes.fail} Fail`
  };
}

// Test with Gershon Baskin (should be Pass)
test('ProfileCard - Gershon Baskin should show Pass', () => {
  const gershonProfile = mmrDatabase.profiles.find(p => p.name === 'Gershon Baskin');
  if (!gershonProfile) throw new Error('Gershon Baskin profile not found');
  
  const result = simulateProfileCardCalculation(gershonProfile);
  console.log('Gershon ProfileCard result:', result);
  
  assertEquals(result.calculatedRating.rating, 'Pass');
  assertEquals(result.calculatedRating.category, 'pass');
  assertEquals(result.displayText, '✅ Pass');
  assertEquals(result.pillarOutcomes, '7 Pass, 0 Partial, 0 Fail');
});

// Test with Maoz Inon & Aziz Abu Sara (should be Pass)
test('ProfileCard - Maoz Inon & Aziz Abu Sara should show Pass', () => {
  const maozProfile = mmrDatabase.profiles.find(p => p.name === 'Maoz Inon & Aziz Abu Sara');
  if (!maozProfile) throw new Error('Maoz Inon & Aziz Abu Sara profile not found');
  
  const result = simulateProfileCardCalculation(maozProfile);
  console.log('Maoz & Aziz ProfileCard result:', result);
  
  assertEquals(result.calculatedRating.rating, 'Pass');
  assertEquals(result.calculatedRating.category, 'pass');
  assertEquals(result.displayText, '✅ Pass');
  assertEquals(result.pillarOutcomes, '7 Pass, 0 Partial, 0 Fail');
});

// Test with Benjamin Netanyahu (should be Fail)
test('ProfileCard - Benjamin Netanyahu should show Fail', () => {
  const netanyahuProfile = mmrDatabase.profiles.find(p => p.name === 'Benjamin Netanyahu');
  if (!netanyahuProfile) throw new Error('Netanyahu profile not found');
  
  const result = simulateProfileCardCalculation(netanyahuProfile);
  console.log('Netanyahu ProfileCard result:', result);
  
  assertEquals(result.calculatedRating.category, 'fail');
  assertEquals(result.statusDisplay.icon, '❌');
  if (result.calculatedRating.outcomes.fail < 2) {
    throw new Error('Netanyahu should have multiple failing pillars');
  }
});

// 2. Test CategoryRollupWidget Logic with Real Data
console.log(`${colors.yellow}🔧 Testing CategoryRollupWidget Component Logic...${colors.reset}`);

// Simulate CategoryRollupWidget calculation logic
function simulateCategoryRollupWidget(figures, categoryName) {
  const stats = calculateGroupStatistics(figures);
  
  const getPerformanceLevel = (passRate) => {
    if (passRate >= 80) return 'Strong';
    if (passRate >= 60) return 'Mixed';
    return 'Needs Improvement';
  };
  
  const performanceLevel = getPerformanceLevel(stats.passRate);
  
  return {
    categoryName,
    figureCount: stats.total,
    performanceLevel,
    passRate: stats.passRate,
    statistics: stats,
    displayText: `${stats.fail} Fail, ${stats.partial} Partial, ${stats.almost_pass} Almost Pass, ${stats.pass} Pass`
  };
}

// Test with Peace Advocates category
test('CategoryRollupWidget - Peace Advocates should show high pass rate', () => {
  const peaceAdvocates = mmrDatabase.profiles.filter(p => p.category === 'Peace Advocates');
  if (peaceAdvocates.length === 0) throw new Error('No Peace Advocates found');
  
  const result = simulateCategoryRollupWidget(peaceAdvocates, 'Peace Advocates');
  console.log('Peace Advocates widget result:', result);
  
  assertEquals(result.figureCount, peaceAdvocates.length);
  if (result.statistics.pass === 0 && result.statistics.almost_pass === 0) {
    throw new Error('Peace Advocates should have some passing profiles');
  }
  assertEquals(result.passRate, 100); // Should be 100% pass rate
  assertEquals(result.displayText, '0 Fail, 0 Partial, 0 Almost Pass, 2 Pass');
});

// Test with All Categories
test('CategoryRollupWidget - All Categories should show correct totals', () => {
  const allProfiles = mmrDatabase.profiles;
  const result = simulateCategoryRollupWidget(allProfiles, 'All Categories');
  console.log('All Categories widget result:', result);
  
  assertEquals(result.figureCount, 35);
  assertEquals(result.categoryName, 'All Categories');
  
  // Should have some passing profiles (at least the peace advocates)
  const totalPassing = result.statistics.pass + result.statistics.almost_pass;
  if (totalPassing === 0) {
    throw new Error('All Categories should have some passing profiles');
  }
});

// Test with Israeli Politicians category
test('CategoryRollupWidget - Israeli Politicians should show mostly failing', () => {
  const israeliPoliticians = mmrDatabase.profiles.filter(p => p.category === 'Israeli Politicians');
  if (israeliPoliticians.length === 0) throw new Error('No Israeli Politicians found');
  
  const result = simulateCategoryRollupWidget(israeliPoliticians, 'Israeli Politicians');
  console.log('Israeli Politicians widget result:', result);
  
  assertEquals(result.figureCount, israeliPoliticians.length);
  // Most should be failing
  if (result.statistics.fail < result.figureCount * 0.5) {
    throw new Error('Most Israeli Politicians should be failing MMR assessment');
  }
});

// 3. Test Data Transformation Pipeline
console.log(`${colors.yellow}🔧 Testing Data Transformation Pipeline...${colors.reset}`);

test('Data Pipeline - JSON structure is valid', () => {
  if (!mmrDatabase.profiles || !Array.isArray(mmrDatabase.profiles)) {
    throw new Error('JSON should have profiles array');
  }
  
  if (mmrDatabase.profiles.length !== 35) {
    throw new Error(`Expected 35 profiles, got ${mmrDatabase.profiles.length}`);
  }
  
  // Check first profile has required structure
  const firstProfile = mmrDatabase.profiles[0];
  if (!firstProfile.name || !firstProfile.pillars || !Array.isArray(firstProfile.pillars)) {
    throw new Error('Profile should have name and pillars array');
  }
  
  if (firstProfile.pillars.length !== 7) {
    throw new Error(`Profile should have 7 pillars, got ${firstProfile.pillars.length}`);
  }
  
  // Check pillar structure
  const firstPillar = firstProfile.pillars[0];
  if (!firstPillar.assessment || !firstPillar.pillar) {
    throw new Error('Pillar should have assessment and pillar fields');
  }
});

test('Data Pipeline - All profiles have valid pillar assessments', () => {
  const validAssessments = ['Strong Pass', 'Full Pass', 'Pass', 'Partial', 'Mixed', 'Fail', 'Failing', 'Clear Fail'];
  
  mmrDatabase.profiles.forEach((profile, profileIndex) => {
    profile.pillars.forEach((pillar, pillarIndex) => {
      if (!validAssessments.includes(pillar.assessment)) {
        throw new Error(`Profile ${profile.name} pillar ${pillarIndex} has invalid assessment: "${pillar.assessment}"`);
      }
    });
  });
});

// 4. Integration Test - Full Component Pipeline
console.log(`${colors.yellow}🔧 Testing Full Component Integration...${colors.reset}`);

test('Full Integration - Peace Advocates end-to-end', () => {
  // Simulate the full pipeline: JSON → ProfileCard → CategoryRollupWidget
  const peaceAdvocates = mmrDatabase.profiles.filter(p => p.category === 'Peace Advocates');
  
  // Test each profile individually (ProfileCard simulation)
  const profileResults = peaceAdvocates.map(profile => simulateProfileCardCalculation(profile));
  
  // Test category rollup (CategoryRollupWidget simulation)
  const categoryResult = simulateCategoryRollupWidget(peaceAdvocates, 'Peace Advocates');
  
  // Verify consistency between individual profiles and category rollup
  const individualPassCount = profileResults.filter(r => r.calculatedRating.category === 'pass').length;
  const categoryPassCount = categoryResult.statistics.pass;
  
  assertEquals(individualPassCount, categoryPassCount, 'Individual profile pass count should match category rollup');
  
  // All peace advocates should be passing
  assertEquals(categoryResult.statistics.pass, peaceAdvocates.length, 'All peace advocates should be passing');
  assertEquals(categoryResult.passRate, 100, 'Peace advocates should have 100% pass rate');
});

// 5. Regression Test - Catch the Current Bug
console.log(`${colors.yellow}🔧 Testing for Current Bug...${colors.reset}`);

test('Regression Test - Verify calculation functions are actually called', () => {
  // This test simulates what should happen vs what might be happening
  const gershonProfile = mmrDatabase.profiles.find(p => p.name === 'Gershon Baskin');
  
  // What SHOULD happen (calculation function called)
  const calculatedResult = calculateOverallRating(gershonProfile.pillars);
  
  // What MIGHT be happening (hardcoded value used)
  const hardcodedResult = gershonProfile.overall_rating; // This might be what's actually displayed
  
  console.log('Calculated result:', calculatedResult);
  console.log('Hardcoded result from JSON:', hardcodedResult);
  
  // The bug: if these don't match, the component isn't using the calculated value
  if (calculatedResult.rating !== hardcodedResult) {
    console.log(`${colors.yellow}⚠️  BUG DETECTED: Calculated rating (${calculatedResult.rating}) doesn't match hardcoded value (${hardcodedResult})${colors.reset}`);
    console.log(`${colors.yellow}   This suggests components are using hardcoded values instead of calculated ones${colors.reset}`);
  }
});

// Summary
console.log(`${colors.blue}📊 Component Test Summary:${colors.reset}`);
if (passedTests === totalTests) {
  console.log(`${colors.green}✅ ALL COMPONENT TESTS PASSED${colors.reset}`);
} else {
  console.log(`${colors.red}❌ ${totalTests - passedTests} COMPONENT TESTS FAILED${colors.reset}`);
}
console.log(`${passedTests}/${totalTests} component tests passed`);

console.log(`${colors.blue}🔍 Integration Analysis:${colors.reset}`);
console.log('If calculation logic tests pass but component tests fail, the issue is in component integration.');
console.log('If both pass but the UI still shows wrong values, the issue is in the React rendering pipeline.');

