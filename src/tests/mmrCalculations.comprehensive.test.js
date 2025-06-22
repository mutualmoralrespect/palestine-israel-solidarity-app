/**
 * Comprehensive MMR Calculation Tests
 * Tests the entire pipeline from JSON data to display
 * Includes real data tests, integration tests, and regression tests
 */

import { getAssessmentOutcome, calculateOverallRating, calculateGroupStatistics } from '../utils/mmrCalculations.js';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const mmrDatabase = JSON.parse(readFileSync(join(__dirname, '../data/mmr_complete_database.json'), 'utf8'));

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

console.log(`${colors.blue}🚀 Running Comprehensive MMR Calculation Tests...${colors.reset}`);

// 1. Basic Assessment Outcome Tests
console.log(`${colors.yellow}🧪 Testing Assessment Outcome Mapping...${colors.reset}`);
test('"Strong Pass" → "pass"', () => assertEquals(getAssessmentOutcome('Strong Pass'), 'pass'));
test('"Full Pass" → "pass"', () => assertEquals(getAssessmentOutcome('Full Pass'), 'pass'));
test('"Pass" → "pass"', () => assertEquals(getAssessmentOutcome('Pass'), 'pass'));
test('"Partial" → "partial"', () => assertEquals(getAssessmentOutcome('Partial'), 'partial'));
test('"Mixed" → "partial"', () => assertEquals(getAssessmentOutcome('Mixed'), 'partial'));
test('"Fail" → "fail"', () => assertEquals(getAssessmentOutcome('Fail'), 'fail'));
test('"Failing" → "fail"', () => assertEquals(getAssessmentOutcome('Failing'), 'fail'));
test('"Clear Fail" → "fail"', () => assertEquals(getAssessmentOutcome('Clear Fail'), 'fail'));
test('Empty string → "fail"', () => assertEquals(getAssessmentOutcome(''), 'fail'));
test('Null/undefined → "fail"', () => assertEquals(getAssessmentOutcome(null), 'fail'));

// 2. 4-Level Logic Tests
console.log(`${colors.yellow}🧪 Testing 4-Level Rating Calculation...${colors.reset}`);

// Perfect Pass - All Strong Pass
test('Perfect Pass - All Strong Pass', () => {
  const pillars = Array(7).fill({ assessment: 'Strong Pass' });
  const result = calculateOverallRating(pillars);
  assertEquals(result.rating, 'Pass');
  assertEquals(result.category, 'pass');
  assertObjectEquals(result.outcomes, { pass: 7, partial: 0, fail: 0 });
});

// Perfect Pass - All Pass
test('Perfect Pass - All Pass', () => {
  const pillars = Array(7).fill({ assessment: 'Pass' });
  const result = calculateOverallRating(pillars);
  assertEquals(result.rating, 'Pass');
  assertEquals(result.category, 'pass');
});

// Almost Pass - 6 Pass + 1 Partial
test('Almost Pass - 6 Pass + 1 Partial', () => {
  const pillars = [
    ...Array(6).fill({ assessment: 'Pass' }),
    { assessment: 'Partial' }
  ];
  const result = calculateOverallRating(pillars);
  assertEquals(result.rating, 'Almost Pass');
  assertEquals(result.category, 'almost_pass');
});

// Partial - 2 Partials, no Fails
test('Partial - 2 Partials, no Fails', () => {
  const pillars = [
    ...Array(5).fill({ assessment: 'Pass' }),
    ...Array(2).fill({ assessment: 'Partial' })
  ];
  const result = calculateOverallRating(pillars);
  assertEquals(result.rating, 'Partial');
  assertEquals(result.category, 'partial');
});

// Partial - 1 Fail only
test('Partial - 1 Fail only', () => {
  const pillars = [
    ...Array(6).fill({ assessment: 'Pass' }),
    { assessment: 'Fail' }
  ];
  const result = calculateOverallRating(pillars);
  assertEquals(result.rating, 'Partial');
  assertEquals(result.category, 'partial');
});

// Fail - 2 Fails
test('Fail - 2 Fails', () => {
  const pillars = [
    ...Array(5).fill({ assessment: 'Pass' }),
    ...Array(2).fill({ assessment: 'Fail' })
  ];
  const result = calculateOverallRating(pillars);
  assertEquals(result.rating, 'Fail');
  assertEquals(result.category, 'fail');
});

// Fail - 1 Fail + 2 Partials
test('Fail - 1 Fail + 2 Partials', () => {
  const pillars = [
    ...Array(4).fill({ assessment: 'Pass' }),
    { assessment: 'Fail' },
    ...Array(2).fill({ assessment: 'Partial' })
  ];
  const result = calculateOverallRating(pillars);
  assertEquals(result.rating, 'Fail');
  assertEquals(result.category, 'fail');
});

// 3. Real JSON Data Tests
console.log(`${colors.yellow}🧪 Testing with Real JSON Data...${colors.reset}`);

// Test with Gershon Baskin (should be Pass: 6 Strong Pass + 1 Pass)
test('Gershon Baskin - Should be Pass', () => {
  const gershonProfile = mmrDatabase.profiles.find(p => p.name === 'Gershon Baskin');
  if (!gershonProfile) throw new Error('Gershon Baskin profile not found in JSON');
  
  console.log('Gershon pillars:', gershonProfile.pillars);
  const result = calculateOverallRating(gershonProfile.pillars);
  console.log('Gershon result:', result);
  
  // Should have 6 Strong Pass + 1 Pass = 7 pass, 0 partial, 0 fail
  assertObjectEquals(result.outcomes, { pass: 7, partial: 0, fail: 0 });
  assertEquals(result.rating, 'Pass');
  assertEquals(result.category, 'pass');
});

// Test with Sulaiman Khatib (should be Pass: all Strong Pass)
test('Sulaiman Khatib - Should be Pass', () => {
  const sulaimanProfile = mmrDatabase.profiles.find(p => p.name === 'Sulaiman Khatib');
  if (!sulaimanProfile) throw new Error('Sulaiman Khatib profile not found in JSON');
  
  const result = calculateOverallRating(sulaimanProfile.pillars);
  console.log('Sulaiman result:', result);
  
  // Should be all Strong Pass = 7 pass, 0 partial, 0 fail
  assertObjectEquals(result.outcomes, { pass: 7, partial: 0, fail: 0 });
  assertEquals(result.rating, 'Pass');
  assertEquals(result.category, 'pass');
});

// Test with Benjamin Netanyahu (should be Fail: multiple fails)
test('Benjamin Netanyahu - Should be Fail', () => {
  const netanyahuProfile = mmrDatabase.profiles.find(p => p.name === 'Benjamin Netanyahu');
  if (!netanyahuProfile) throw new Error('Netanyahu profile not found in JSON');
  
  const result = calculateOverallRating(netanyahuProfile.pillars);
  console.log('Netanyahu result:', result);
  
  // Should have multiple fails
  assertEquals(result.category, 'fail');
});

// Test with Yahya Sinwar (should be Clear Fail: multiple fails)
test('Yahya Sinwar - Should be Fail', () => {
  const sinwarProfile = mmrDatabase.profiles.find(p => p.name === 'Yahya Sinwar');
  if (!sinwarProfile) throw new Error('Sinwar profile not found in JSON');
  
  const result = calculateOverallRating(sinwarProfile.pillars);
  console.log('Sinwar result:', result);
  
  // Should have multiple fails
  assertEquals(result.category, 'fail');
});

// 4. Group Statistics Tests
console.log(`${colors.yellow}🧪 Testing Group Statistics Calculation...${colors.reset}`);

// Test with a mixed group
test('Group Statistics - Mixed Results', () => {
  const testFigures = [
    { pillars: Array(7).fill({ assessment: 'Strong Pass' }) }, // Pass
    { pillars: [...Array(6).fill({ assessment: 'Pass' }), { assessment: 'Partial' }] }, // Almost Pass
    { pillars: [...Array(5).fill({ assessment: 'Pass' }), ...Array(2).fill({ assessment: 'Partial' })] }, // Partial
    { pillars: [...Array(5).fill({ assessment: 'Pass' }), ...Array(2).fill({ assessment: 'Fail' })] }, // Fail
  ];
  
  const stats = calculateGroupStatistics(testFigures);
  console.log('Group stats:', stats);
  
  assertEquals(stats.total, 4);
  assertEquals(stats.pass, 1);
  assertEquals(stats.almost_pass, 1);
  assertEquals(stats.partial, 1);
  assertEquals(stats.fail, 1);
  assertEquals(stats.passRate, 50); // (1 pass + 1 almost_pass) / 4 * 100
});

// 5. Edge Cases and Error Handling
console.log(`${colors.yellow}🧪 Testing Edge Cases...${colors.reset}`);

test('Empty pillars array', () => {
  const result = calculateOverallRating([]);
  assertEquals(result.rating, 'No Assessment');
  assertEquals(result.category, 'fail');
});

test('Null pillars', () => {
  const result = calculateOverallRating(null);
  assertEquals(result.rating, 'No Assessment');
  assertEquals(result.category, 'fail');
});

test('Pillars with missing assessment field', () => {
  const pillars = [
    { assessment: 'Pass' },
    { assessment: 'Pass' },
    { pillar: 'Some pillar', evidence: 'Some evidence' }, // Missing assessment
    ...Array(4).fill({ assessment: 'Pass' })
  ];
  const result = calculateOverallRating(pillars);
  // Missing assessment should default to 'fail'
  assertEquals(result.outcomes.fail, 1);
});

// 6. Integration Test - Full Pipeline
console.log(`${colors.yellow}🧪 Testing Full Integration Pipeline...${colors.reset}`);

test('Full Pipeline - Peace Advocates Category', () => {
  const peaceAdvocates = mmrDatabase.profiles.filter(p => p.category === 'Peace Advocates');
  if (peaceAdvocates.length === 0) throw new Error('No Peace Advocates found in JSON');
  
  const stats = calculateGroupStatistics(peaceAdvocates);
  console.log('Peace Advocates stats:', stats);
  
  // Should have some passing profiles
  if (stats.pass === 0 && stats.almost_pass === 0) {
    throw new Error('Peace Advocates should have some passing profiles');
  }
});

// Summary
console.log(`${colors.blue}📊 Test Summary:${colors.reset}`);
if (passedTests === totalTests) {
  console.log(`${colors.green}✅ ALL TESTS PASSED${colors.reset}`);
} else {
  console.log(`${colors.red}❌ ${totalTests - passedTests} TESTS FAILED${colors.reset}`);
}
console.log(`${passedTests}/${totalTests} test suites passed`);

// Export for potential use in other test files
export { test, assertEquals, assertObjectEquals };

