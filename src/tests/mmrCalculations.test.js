/**
 * Automated Tests for MMR Calculation Logic
 * 
 * These tests verify that the 4-level calculation system works correctly
 * and ensure consistency when the logic criteria change.
 */

import { getAssessmentOutcome, calculateOverallRating, calculateGroupStatistics } from '../utils/mmrCalculations.js';

// Test data for different pillar combinations
const testCases = [
  {
    name: "Perfect Pass - All Strong Pass",
    pillars: [
      { assessment: "Strong Pass" },
      { assessment: "Strong Pass" },
      { assessment: "Strong Pass" },
      { assessment: "Strong Pass" },
      { assessment: "Strong Pass" },
      { assessment: "Strong Pass" },
      { assessment: "Strong Pass" }
    ],
    expected: { rating: "Pass", category: "pass" }
  },
  {
    name: "Perfect Pass - All Pass",
    pillars: [
      { assessment: "Pass" },
      { assessment: "Pass" },
      { assessment: "Pass" },
      { assessment: "Pass" },
      { assessment: "Pass" },
      { assessment: "Pass" },
      { assessment: "Pass" }
    ],
    expected: { rating: "Pass", category: "pass" }
  },
  {
    name: "Almost Pass - 6 Pass + 1 Partial",
    pillars: [
      { assessment: "Strong Pass" },
      { assessment: "Pass" },
      { assessment: "Pass" },
      { assessment: "Pass" },
      { assessment: "Partial" },
      { assessment: "Pass" },
      { assessment: "Pass" }
    ],
    expected: { rating: "Almost Pass", category: "almost_pass" }
  },
  {
    name: "Partial - 2 Partials, no Fails",
    pillars: [
      { assessment: "Pass" },
      { assessment: "Pass" },
      { assessment: "Partial" },
      { assessment: "Pass" },
      { assessment: "Partial" },
      { assessment: "Pass" },
      { assessment: "Pass" }
    ],
    expected: { rating: "Partial", category: "partial" }
  },
  {
    name: "Partial - 1 Fail only",
    pillars: [
      { assessment: "Pass" },
      { assessment: "Pass" },
      { assessment: "Pass" },
      { assessment: "Fail" },
      { assessment: "Pass" },
      { assessment: "Pass" },
      { assessment: "Pass" }
    ],
    expected: { rating: "Partial", category: "partial" }
  },
  {
    name: "Fail - 2 Fails",
    pillars: [
      { assessment: "Pass" },
      { assessment: "Fail" },
      { assessment: "Pass" },
      { assessment: "Fail" },
      { assessment: "Pass" },
      { assessment: "Pass" },
      { assessment: "Pass" }
    ],
    expected: { rating: "Fail", category: "fail" }
  },
  {
    name: "Fail - 1 Fail + 2 Partials",
    pillars: [
      { assessment: "Pass" },
      { assessment: "Fail" },
      { assessment: "Partial" },
      { assessment: "Partial" },
      { assessment: "Pass" },
      { assessment: "Pass" },
      { assessment: "Pass" }
    ],
    expected: { rating: "Fail", category: "fail" }
  },
  {
    name: "Edge Case - 3 Partials, no Fails (should be Partial)",
    pillars: [
      { assessment: "Pass" },
      { assessment: "Partial" },
      { assessment: "Partial" },
      { assessment: "Partial" },
      { assessment: "Pass" },
      { assessment: "Pass" },
      { assessment: "Pass" }
    ],
    expected: { rating: "Partial", category: "partial" }
  }
];

// Test assessment outcome mapping
function testAssessmentOutcome() {
  console.log("🧪 Testing Assessment Outcome Mapping...");
  
  const assessmentTests = [
    { input: "Strong Pass", expected: "pass" },
    { input: "Full Pass", expected: "pass" },
    { input: "Pass", expected: "pass" },
    { input: "Partial", expected: "partial" },
    { input: "Mixed", expected: "partial" },
    { input: "Fail", expected: "fail" },
    { input: "Failing", expected: "fail" },
    { input: "Clear Fail", expected: "fail" },
    { input: "", expected: "fail" },
    { input: null, expected: "fail" }
  ];
  
  let passed = 0;
  let failed = 0;
  
  assessmentTests.forEach(test => {
    const result = getAssessmentOutcome(test.input);
    if (result === test.expected) {
      console.log(`✅ "${test.input}" → "${result}"`);
      passed++;
    } else {
      console.log(`❌ "${test.input}" → "${result}" (expected "${test.expected}")`);
      failed++;
    }
  });
  
  console.log(`Assessment Outcome Tests: ${passed} passed, ${failed} failed\n`);
  return failed === 0;
}

// Test overall rating calculation
function testOverallRating() {
  console.log("🧪 Testing Overall Rating Calculation...");
  
  let passed = 0;
  let failed = 0;
  
  testCases.forEach(testCase => {
    const result = calculateOverallRating(testCase.pillars);
    
    if (result.rating === testCase.expected.rating && result.category === testCase.expected.category) {
      console.log(`✅ ${testCase.name}: ${result.rating} (${result.category})`);
      passed++;
    } else {
      console.log(`❌ ${testCase.name}: Got ${result.rating} (${result.category}), expected ${testCase.expected.rating} (${testCase.expected.category})`);
      console.log(`   Outcomes: Pass=${result.outcomes.pass}, Partial=${result.outcomes.partial}, Fail=${result.outcomes.fail}`);
      failed++;
    }
  });
  
  console.log(`Overall Rating Tests: ${passed} passed, ${failed} failed\n`);
  return failed === 0;
}

// Test group statistics calculation
function testGroupStatistics() {
  console.log("🧪 Testing Group Statistics Calculation...");
  
  // Create test figures with different ratings
  const testFigures = [
    { pillars: testCases[0].pillars }, // Pass
    { pillars: testCases[1].pillars }, // Pass  
    { pillars: testCases[2].pillars }, // Almost Pass
    { pillars: testCases[3].pillars }, // Partial
    { pillars: testCases[4].pillars }, // Partial
    { pillars: testCases[5].pillars }, // Fail
    { pillars: testCases[6].pillars }  // Fail
  ];
  
  const stats = calculateGroupStatistics(testFigures);
  
  const expected = {
    total: 7,
    pass: 2,
    almost_pass: 1,
    partial: 2,
    fail: 2,
    passRate: 43 // (2 pass + 1 almost_pass) / 7 * 100 = 42.86 ≈ 43
  };
  
  let allCorrect = true;
  
  Object.keys(expected).forEach(key => {
    if (stats[key] === expected[key]) {
      console.log(`✅ ${key}: ${stats[key]}`);
    } else {
      console.log(`❌ ${key}: Got ${stats[key]}, expected ${expected[key]}`);
      allCorrect = false;
    }
  });
  
  console.log(`Group Statistics Test: ${allCorrect ? 'PASSED' : 'FAILED'}\n`);
  return allCorrect;
}

// Run all tests
function runAllTests() {
  console.log("🚀 Running MMR Calculation Tests...\n");
  
  const results = [
    testAssessmentOutcome(),
    testOverallRating(),
    testGroupStatistics()
  ];
  
  const allPassed = results.every(result => result === true);
  
  console.log("📊 Test Summary:");
  console.log(`${allPassed ? '✅ ALL TESTS PASSED' : '❌ SOME TESTS FAILED'}`);
  console.log(`${results.filter(r => r).length}/${results.length} test suites passed`);
  
  return allPassed;
}

// Export for use in browser console or Node.js
if (typeof window !== 'undefined') {
  // Browser environment
  window.runMMRTests = runAllTests;
  console.log("MMR Tests loaded. Run 'runMMRTests()' in console to execute.");
} else {
  // Node.js environment
  runAllTests();
}

export { runAllTests, testAssessmentOutcome, testOverallRating, testGroupStatistics };

