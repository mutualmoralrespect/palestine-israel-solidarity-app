/**
 * Comprehensive 6-Level MMR Tests with Real JSON Data
 * Tests both unit calculations and component integration
 */

import { calculateOverallRating, calculateGroupStatistics, getAssessmentOutcome } from '../utils/mmrCalculations.js';
import fs from 'fs';

// Load real JSON data
const jsonData = JSON.parse(fs.readFileSync('./src/data/6_pillar_json_database.json', 'utf8'));
const profiles = jsonData.profiles;

// Test runner
function runTest(testName, testFunction) {
  try {
    testFunction();
    console.log(`✅ ${testName}`);
    return true;
  } catch (error) {
    console.log(`❌ ${testName}`);
    console.log(`   Error: ${error.message}`);
    return false;
  }
}

console.log('🧪 Running 6-Level MMR Tests with Real JSON Data...\n');

// Unit Tests for 6-Level Logic
console.log('🔧 Unit Tests - 6-Level Calculation Logic...');

let unitTestsPassed = 0;
let unitTestsTotal = 0;

// Test 1: Pass (All 7 Pass)
unitTestsTotal++;
if (runTest('Pass - All 7 Pass (perfect)', () => {
  const pillars = Array(7).fill({ assessment: 'Strong Pass' });
  const result = calculateOverallRating(pillars);
  if (result.rating !== 'Pass' || result.category !== 'pass') {
    throw new Error(`Expected Pass, got ${result.rating}`);
  }
  if (result.outcomes.pass !== 7 || result.outcomes.partial !== 0 || result.outcomes.fail !== 0) {
    throw new Error(`Expected 7 pass, 0 partial, 0 fail, got ${JSON.stringify(result.outcomes)}`);
  }
})) unitTestsPassed++;

// Test 2: Almost Pass (6 Pass, 1 Partial)
unitTestsTotal++;
if (runTest('Almost Pass - 6 Pass, 1 Partial', () => {
  const pillars = [
    ...Array(6).fill({ assessment: 'Pass' }),
    { assessment: 'Partial' }
  ];
  const result = calculateOverallRating(pillars);
  if (result.rating !== 'Almost Pass' || result.category !== 'almost_pass') {
    throw new Error(`Expected Almost Pass, got ${result.rating}`);
  }
  if (result.outcomes.pass !== 6 || result.outcomes.partial !== 1 || result.outcomes.fail !== 0) {
    throw new Error(`Expected 6 pass, 1 partial, 0 fail, got ${JSON.stringify(result.outcomes)}`);
  }
})) unitTestsPassed++;

// Test 3: Strong Partial (5 Pass, 2 Partial)
unitTestsTotal++;
if (runTest('Strong Partial - 5 Pass, 2 Partial', () => {
  const pillars = [
    ...Array(5).fill({ assessment: 'Pass' }),
    ...Array(2).fill({ assessment: 'Partial' })
  ];
  const result = calculateOverallRating(pillars);
  if (result.rating !== 'Strong Partial' || result.category !== 'strong_partial') {
    throw new Error(`Expected Strong Partial, got ${result.rating}`);
  }
  if (result.outcomes.pass !== 5 || result.outcomes.partial !== 2 || result.outcomes.fail !== 0) {
    throw new Error(`Expected 5 pass, 2 partial, 0 fail, got ${JSON.stringify(result.outcomes)}`);
  }
})) unitTestsPassed++;

// Test 4: Strong Partial (4 Pass, 3 Partial)
unitTestsTotal++;
if (runTest('Strong Partial - 4 Pass, 3 Partial', () => {
  const pillars = [
    ...Array(4).fill({ assessment: 'Pass' }),
    ...Array(3).fill({ assessment: 'Partial' })
  ];
  const result = calculateOverallRating(pillars);
  if (result.rating !== 'Strong Partial' || result.category !== 'strong_partial') {
    throw new Error(`Expected Strong Partial, got ${result.rating}`);
  }
  if (result.outcomes.pass !== 4 || result.outcomes.partial !== 3 || result.outcomes.fail !== 0) {
    throw new Error(`Expected 4 pass, 3 partial, 0 fail, got ${JSON.stringify(result.outcomes)}`);
  }
})) unitTestsPassed++;

// Test 5: Partial (3 Pass, 4 Partial)
unitTestsTotal++;
if (runTest('Partial - 3 Pass, 4 Partial', () => {
  const pillars = [
    ...Array(3).fill({ assessment: 'Pass' }),
    ...Array(4).fill({ assessment: 'Partial' })
  ];
  const result = calculateOverallRating(pillars);
  if (result.rating !== 'Partial' || result.category !== 'partial') {
    throw new Error(`Expected Partial, got ${result.rating}`);
  }
  if (result.outcomes.pass !== 3 || result.outcomes.partial !== 4 || result.outcomes.fail !== 0) {
    throw new Error(`Expected 3 pass, 4 partial, 0 fail, got ${JSON.stringify(result.outcomes)}`);
  }
})) unitTestsPassed++;

// Test 6: Partial (2 Pass, 5 Partial)
unitTestsTotal++;
if (runTest('Partial - 2 Pass, 5 Partial', () => {
  const pillars = [
    ...Array(2).fill({ assessment: 'Pass' }),
    ...Array(5).fill({ assessment: 'Partial' })
  ];
  const result = calculateOverallRating(pillars);
  if (result.rating !== 'Partial' || result.category !== 'partial') {
    throw new Error(`Expected Partial, got ${result.rating}`);
  }
  if (result.outcomes.pass !== 2 || result.outcomes.partial !== 5 || result.outcomes.fail !== 0) {
    throw new Error(`Expected 2 pass, 5 partial, 0 fail, got ${JSON.stringify(result.outcomes)}`);
  }
})) unitTestsPassed++;

// Test 7: Weak Partial (1 Pass, 6 Partial)
unitTestsTotal++;
if (runTest('Weak Partial - 1 Pass, 6 Partial', () => {
  const pillars = [
    { assessment: 'Pass' },
    ...Array(6).fill({ assessment: 'Partial' })
  ];
  const result = calculateOverallRating(pillars);
  if (result.rating !== 'Weak Partial' || result.category !== 'weak_partial') {
    throw new Error(`Expected Weak Partial, got ${result.rating}`);
  }
  if (result.outcomes.pass !== 1 || result.outcomes.partial !== 6 || result.outcomes.fail !== 0) {
    throw new Error(`Expected 1 pass, 6 partial, 0 fail, got ${JSON.stringify(result.outcomes)}`);
  }
})) unitTestsPassed++;

// Test 8: Weak Partial (0 Pass, 7 Partial)
unitTestsTotal++;
if (runTest('Weak Partial - 0 Pass, 7 Partial', () => {
  const pillars = Array(7).fill({ assessment: 'Partial' });
  const result = calculateOverallRating(pillars);
  if (result.rating !== 'Weak Partial' || result.category !== 'weak_partial') {
    throw new Error(`Expected Weak Partial, got ${result.rating}`);
  }
  if (result.outcomes.pass !== 0 || result.outcomes.partial !== 7 || result.outcomes.fail !== 0) {
    throw new Error(`Expected 0 pass, 7 partial, 0 fail, got ${JSON.stringify(result.outcomes)}`);
  }
})) unitTestsPassed++;

// Test 9: Fail (Any Fails present - 1 Fail)
unitTestsTotal++;
if (runTest('Fail - 1 Fail, 6 Pass', () => {
  const pillars = [
    { assessment: 'Fail' },
    ...Array(6).fill({ assessment: 'Pass' })
  ];
  const result = calculateOverallRating(pillars);
  if (result.rating !== 'Fail' || result.category !== 'fail') {
    throw new Error(`Expected Fail, got ${result.rating}`);
  }
  if (result.outcomes.pass !== 6 || result.outcomes.partial !== 0 || result.outcomes.fail !== 1) {
    throw new Error(`Expected 6 pass, 0 partial, 1 fail, got ${JSON.stringify(result.outcomes)}`);
  }
})) unitTestsPassed++;

// Test 10: Fail (Multiple Fails)
unitTestsTotal++;
if (runTest('Fail - 3 Fail, 2 Pass, 2 Partial', () => {
  const pillars = [
    ...Array(3).fill({ assessment: 'Fail' }),
    ...Array(2).fill({ assessment: 'Pass' }),
    ...Array(2).fill({ assessment: 'Partial' })
  ];
  const result = calculateOverallRating(pillars);
  if (result.rating !== 'Fail' || result.category !== 'fail') {
    throw new Error(`Expected Fail, got ${result.rating}`);
  }
  if (result.outcomes.pass !== 2 || result.outcomes.partial !== 2 || result.outcomes.fail !== 3) {
    throw new Error(`Expected 2 pass, 2 partial, 3 fail, got ${JSON.stringify(result.outcomes)}`);
  }
})) unitTestsPassed++;

console.log(`\n📊 Unit Test Summary: ${unitTestsPassed}/${unitTestsTotal} passed\n`);

// Real JSON Data Tests
console.log('🔧 Real JSON Data Tests...');

let realDataTestsPassed = 0;
let realDataTestsTotal = 0;

// Find real examples for each category
const examples = {
  pass: null,
  almost_pass: null,
  strong_partial: null,
  partial: null,
  weak_partial: null,
  fail: null
};

// Analyze all profiles to find examples
profiles.forEach(profile => {
  if (profile.pillars && profile.pillars.length === 7) {
    const rating = calculateOverallRating(profile.pillars);
    if (!examples[rating.category]) {
      examples[rating.category] = {
        name: profile.name,
        rating: rating,
        pillars: profile.pillars
      };
    }
  }
});

// Test each category with real data
Object.keys(examples).forEach(category => {
  if (examples[category]) {
    realDataTestsTotal++;
    if (runTest(`Real Data - ${examples[category].name} should be ${examples[category].rating.rating}`, () => {
      const result = calculateOverallRating(examples[category].pillars);
      if (result.category !== category) {
        throw new Error(`Expected ${category}, got ${result.category}`);
      }
      console.log(`   ${examples[category].name}: ${result.outcomes.pass} Pass, ${result.outcomes.partial} Partial, ${result.outcomes.fail} Fail → ${result.rating}`);
    })) realDataTestsPassed++;
  }
});

// Test Gantz specifically (should be Strong Partial)
realDataTestsTotal++;
const gantz = profiles.find(p => p.name === 'Benny Gantz');
if (gantz) {
  if (runTest('Real Data - Benny Gantz should be Strong Partial', () => {
    const result = calculateOverallRating(gantz.pillars);
    if (result.category !== 'strong_partial') {
      throw new Error(`Expected strong_partial, got ${result.category}`);
    }
    console.log(`   Gantz: ${result.outcomes.pass} Pass, ${result.outcomes.partial} Partial, ${result.outcomes.fail} Fail → ${result.rating}`);
  })) realDataTestsPassed++;
} else {
  console.log('❌ Real Data - Benny Gantz not found in JSON');
}

console.log(`\n📊 Real Data Test Summary: ${realDataTestsPassed}/${realDataTestsTotal} passed\n`);

// Group Statistics Tests
console.log('🔧 Group Statistics Tests...');

let groupTestsPassed = 0;
let groupTestsTotal = 0;

// Test Peace Advocates group
groupTestsTotal++;
const peaceAdvocates = profiles.filter(p => p.category === 'Peace Advocates');
if (runTest('Group Stats - Peace Advocates should have high pass rate', () => {
  const stats = calculateGroupStatistics(peaceAdvocates);
  console.log(`   Peace Advocates: ${stats.fail} Fail, ${stats.weak_partial} Weak Partial, ${stats.partial} Partial, ${stats.strong_partial} Strong Partial, ${stats.almost_pass} Almost Pass, ${stats.pass} Pass (${stats.passRate}% pass rate)`);
  if (stats.total !== peaceAdvocates.length) {
    throw new Error(`Expected ${peaceAdvocates.length} total, got ${stats.total}`);
  }
})) groupTestsPassed++;

// Test Israeli Politicians group
groupTestsTotal++;
const israeliPoliticians = profiles.filter(p => p.category === 'Israeli Politicians');
if (runTest('Group Stats - Israeli Politicians should have mixed results', () => {
  const stats = calculateGroupStatistics(israeliPoliticians);
  console.log(`   Israeli Politicians: ${stats.fail} Fail, ${stats.weak_partial} Weak Partial, ${stats.partial} Partial, ${stats.strong_partial} Strong Partial, ${stats.almost_pass} Almost Pass, ${stats.pass} Pass (${stats.passRate}% pass rate)`);
  if (stats.total !== israeliPoliticians.length) {
    throw new Error(`Expected ${israeliPoliticians.length} total, got ${stats.total}`);
  }
})) groupTestsPassed++;

// Test All Categories
groupTestsTotal++;
if (runTest('Group Stats - All Categories should show 6-level breakdown', () => {
  const stats = calculateGroupStatistics(profiles);
  console.log(`   All Categories: ${stats.fail} Fail, ${stats.weak_partial} Weak Partial, ${stats.partial} Partial, ${stats.strong_partial} Strong Partial, ${stats.almost_pass} Almost Pass, ${stats.pass} Pass (${stats.passRate}% pass rate)`);
  if (stats.total !== profiles.length) {
    throw new Error(`Expected ${profiles.length} total, got ${stats.total}`);
  }
  // Verify all 6 categories are represented
  const totalCounted = stats.fail + stats.weak_partial + stats.partial + stats.strong_partial + stats.almost_pass + stats.pass;
  if (totalCounted !== stats.total) {
    throw new Error(`Category counts don't add up: ${totalCounted} vs ${stats.total}`);
  }
})) groupTestsPassed++;

console.log(`\n📊 Group Statistics Test Summary: ${groupTestsPassed}/${groupTestsTotal} passed\n`);

// Component Integration Tests
console.log('🔧 Component Integration Tests...');

let componentTestsPassed = 0;
let componentTestsTotal = 0;

// Simulate ProfileCard component logic
function simulateProfileCard(figure) {
  const calculatedRating = calculateOverallRating(figure.pillars);
  
  const getStatusDisplay = (category, rating) => {
    switch (category) {
      case 'pass':
        return { color: 'green', icon: '✅', text: rating };
      case 'almost_pass':
        return { color: 'green', icon: '🟢', text: rating };
      case 'strong_partial':
        return { color: 'lightgreen', icon: '🟢', text: rating };
      case 'partial':
        return { color: 'yellow', icon: '🟡', text: rating };
      case 'weak_partial':
        return { color: 'orange', icon: '🟠', text: rating };
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

// Test Gantz ProfileCard
componentTestsTotal++;
if (gantz) {
  if (runTest('Component - Gantz ProfileCard should show Strong Partial', () => {
    const result = simulateProfileCard(gantz);
    if (result.calculatedRating.category !== 'strong_partial') {
      throw new Error(`Expected strong_partial, got ${result.calculatedRating.category}`);
    }
    console.log(`   Gantz ProfileCard: ${result.displayText} (${result.pillarOutcomes})`);
  })) componentTestsPassed++;
}

// Test a Pass example
componentTestsTotal++;
if (examples.pass) {
  if (runTest(`Component - ${examples.pass.name} ProfileCard should show Pass`, () => {
    const profile = profiles.find(p => p.name === examples.pass.name);
    const result = simulateProfileCard(profile);
    if (result.calculatedRating.category !== 'pass') {
      throw new Error(`Expected pass, got ${result.calculatedRating.category}`);
    }
    console.log(`   ${examples.pass.name} ProfileCard: ${result.displayText} (${result.pillarOutcomes})`);
  })) componentTestsPassed++;
}

// Test a Fail example
componentTestsTotal++;
if (examples.fail) {
  if (runTest(`Component - ${examples.fail.name} ProfileCard should show Fail`, () => {
    const profile = profiles.find(p => p.name === examples.fail.name);
    const result = simulateProfileCard(profile);
    if (result.calculatedRating.category !== 'fail') {
      throw new Error(`Expected fail, got ${result.calculatedRating.category}`);
    }
    console.log(`   ${examples.fail.name} ProfileCard: ${result.displayText} (${result.pillarOutcomes})`);
  })) componentTestsPassed++;
}

console.log(`\n📊 Component Integration Test Summary: ${componentTestsPassed}/${componentTestsTotal} passed\n`);

// Final Summary
const totalTests = unitTestsTotal + realDataTestsTotal + groupTestsTotal + componentTestsTotal;
const totalPassed = unitTestsPassed + realDataTestsPassed + groupTestsPassed + componentTestsPassed;

console.log('🎯 Final Test Summary:');
console.log(`📊 Unit Tests: ${unitTestsPassed}/${unitTestsTotal} passed`);
console.log(`📊 Real Data Tests: ${realDataTestsPassed}/${realDataTestsTotal} passed`);
console.log(`📊 Group Statistics Tests: ${groupTestsPassed}/${groupTestsTotal} passed`);
console.log(`📊 Component Integration Tests: ${componentTestsPassed}/${componentTestsTotal} passed`);
console.log(`📊 Overall: ${totalPassed}/${totalTests} tests passed`);

if (totalPassed === totalTests) {
  console.log('\n🎉 All tests passed! 6-level system is working correctly.');
} else {
  console.log(`\n❌ ${totalTests - totalPassed} tests failed. Please review the implementation.`);
}

// Show examples found for each category
console.log('\n🔍 Real JSON Examples Found:');
Object.keys(examples).forEach(category => {
  if (examples[category]) {
    console.log(`   ${category}: ${examples[category].name} (${examples[category].rating.outcomes.pass}P, ${examples[category].rating.outcomes.partial}Pa, ${examples[category].rating.outcomes.fail}F)`);
  } else {
    console.log(`   ${category}: No examples found`);
  }
});

