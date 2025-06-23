// MMR v8 Comprehensive Tests with Real Dataset Profiles (CommonJS version)
// Tests the new 6-level outcome system using actual profiles from the database

const fs = require('fs');
const path = require('path');

// Load the MMR v8 rules
const mmrV8Rules = JSON.parse(fs.readFileSync(path.join(__dirname, '../data/mmr_v8_rules.json'), 'utf8'));

// MMR v8 Calculation Functions (CommonJS version)
function computeMMROutcome(profile, rules = mmrV8Rules) {
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

  // Debug logging for Maoz Inon & Aziz Abu Sara
  if (profile.pillars.some(p => p.pillar === "Reject Targeting of Civilians" && p.assessment === "Strong Pass")) {
    console.log(`Debug for profile: counts = ${JSON.stringify(counts)}`);
  }

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

    // Debug logging for High Positive Indicators
    if (level.rating === "High Positive Indicators") {
      console.log(`Checking High Positive Indicators: min_strong_pass=${cond.min_strong_pass}, actual=${counts.num_strong_pass}, min_pass_or_strong=${cond.min_pass_or_strong}, actual=${counts.num_pass_or_strong}`);
    }

    return level.rating;
  }

  return "Unknown";
}

function mapOutcomeToCategory(outcome) {
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

function calculateGroupStatistics(figures) {
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

// Real profile test cases from the current dataset
const realProfileTestCases = [
  {
    name: "Maoz Inon & Aziz Abu Sara",
    category: "Peace Advocates",
    profile: {
      pillars: [
        { pillar: "Reject Targeting of Civilians", assessment: "Strong Pass" },
        { pillar: "Accountability for Hamas / Militant Rejectionists", assessment: "Strong Pass" },
        { pillar: "Accountability for Israeli Right / Ultra-Nationalists", assessment: "Strong Pass" },
        { pillar: "Use Verified, Truthful Sources", assessment: "Pass" },
        { pillar: "Humanize Both Peoples", assessment: "Strong Pass" },
        { pillar: "Reject Eliminationism", assessment: "Strong Pass" },
        { pillar: "Vision for Dignity & Peace", assessment: "Strong Pass" }
      ],
      reflection: "Exemplary MMR leadership through personal transformation of grief into bridge-building."
    },
    expected: "High Positive Indicators",
    expectedCategory: "Pass",
    description: "Peace advocates with 6 Strong Pass + 1 Pass = should be High Positive Indicators"
  },
  {
    name: "Gershon Baskin",
    category: "Peace Advocates", 
    profile: {
      pillars: [
        { pillar: "Reject Targeting of Civilians", assessment: "Strong Pass" },
        { pillar: "Accountability for Hamas / Militant Rejectionists", assessment: "Pass" },
        { pillar: "Accountability for Israeli Right / Ultra-Nationalists", assessment: "Strong Pass" },
        { pillar: "Use Verified, Truthful Sources", assessment: "Pass" },
        { pillar: "Humanize Both Peoples", assessment: "Strong Pass" },
        { pillar: "Reject Eliminationism", assessment: "Strong Pass" },
        { pillar: "Vision for Dignity & Peace", assessment: "Strong Pass" }
      ],
      reflection: "Veteran peace mediator with decades of bridge-building experience and consistent MMR alignment."
    },
    expected: "High Positive Indicators",
    expectedCategory: "Pass",
    description: "Peace mediator with 5 Strong Pass + 2 Pass = should be High Positive Indicators"
  },
  {
    name: "Yair Golan",
    category: "Israeli Politicians",
    profile: {
      pillars: [
        { pillar: "Reject Targeting of Civilians", assessment: "Strong Pass" },
        { pillar: "Accountability for Hamas / Militant Rejectionists", assessment: "Pass" },
        { pillar: "Accountability for Israeli Right / Ultra-Nationalists", assessment: "Strong Pass" },
        { pillar: "Use Verified, Truthful Sources", assessment: "Strong Pass" },
        { pillar: "Humanize Both Peoples", assessment: "Pass" },
        { pillar: "Reject Eliminationism", assessment: "Strong Pass" },
        { pillar: "Vision for Dignity & Peace", assessment: "Pass" }
      ],
      reflection: "Exemplifies clear MMR-aligned voice — balancing accountability, empathy, and vision of shared dignity."
    },
    expected: "High Positive Indicators",
    expectedCategory: "Pass",
    description: "Labor leader with 4 Strong Pass + 3 Pass = should be High Positive Indicators"
  },
  {
    name: "Benny Gantz",
    category: "Israeli Politicians",
    profile: {
      pillars: [
        { pillar: "Reject Targeting of Civilians", assessment: "Partial" },
        { pillar: "Accountability for Hamas / Militant Rejectionists", assessment: "Pass" },
        { pillar: "Accountability for Israeli Right / Ultra-Nationalists", assessment: "Pass" },
        { pillar: "Use Verified, Truthful Sources", assessment: "Pass" },
        { pillar: "Humanize Both Peoples", assessment: "Partial" },
        { pillar: "Reject Eliminationism", assessment: "Pass" },
        { pillar: "Vision for Dignity & Peace", assessment: "Partial" }
      ],
      reflection: "Pragmatic centrist with some MMR alignment but falls short on civilian protection standards and Palestinian empathy."
    },
    expected: "Partial Indicators",
    expectedCategory: "Partial",
    description: "Centrist with 0 fails, 3 partials, 4 pass = should be Partial Indicators"
  },
  {
    name: "Yair Lapid",
    category: "Israeli Politicians",
    profile: {
      pillars: [
        { pillar: "Reject Targeting of Civilians", assessment: "Pass" },
        { pillar: "Accountability for Hamas / Militant Rejectionists", assessment: "Strong Pass" },
        { pillar: "Accountability for Israeli Right / Ultra-Nationalists", assessment: "Strong Pass" },
        { pillar: "Use Verified, Truthful Sources", assessment: "Strong Pass" },
        { pillar: "Humanize Both Peoples", assessment: "Pass" },
        { pillar: "Reject Eliminationism", assessment: "Pass" },
        { pillar: "Vision for Dignity & Peace", assessment: "Partial" }
      ],
      reflection: "Centrist leader with strong accountability standards but limited on comprehensive peace vision."
    },
    expected: "High Positive Indicators", // Updated: 3 Strong Pass + 6 total pass/strong qualifies for High Positive
    expectedCategory: "Pass", // Updated accordingly
    description: "Opposition leader with 0 fails, 1 partial, 6 pass/strong, 3 strong pass = should be High Positive Indicators"
  },
  {
    name: "Yahya Sinwar",
    category: "Hamas Officials",
    profile: {
      pillars: [
        { pillar: "Reject Targeting of Civilians", assessment: "Fail" },
        { pillar: "Accountability for Hamas / Militant Rejectionists", assessment: "Fail" },
        { pillar: "Accountability for Israeli Right / Ultra-Nationalists", assessment: "Fail" },
        { pillar: "Use Verified, Truthful Sources", assessment: "Fail" },
        { pillar: "Humanize Both Peoples", assessment: "Fail" },
        { pillar: "Reject Eliminationism", assessment: "Fail" },
        { pillar: "Vision for Dignity & Peace", assessment: "Fail" }
      ],
      reflection: "Represents eliminationist militancy with complete failure across all MMR pillars."
    },
    expected: "Systemic Fail",
    expectedCategory: "Fail",
    description: "Hamas leader with 7 fails = should be Systemic Fail (4+ fails rule)"
  }
];

// Priority pillar test cases
const priorityPillarTestCases = [
  {
    name: "Priority Fail Rule Test",
    profile: {
      pillars: [
        { pillar: "Reject Targeting of Civilians", assessment: "Fail" }, // Priority pillar fail
        { pillar: "Accountability for Hamas / Militant Rejectionists", assessment: "Strong Pass" },
        { pillar: "Accountability for Israeli Right / Ultra-Nationalists", assessment: "Strong Pass" },
        { pillar: "Use Verified, Truthful Sources", assessment: "Strong Pass" },
        { pillar: "Humanize Both Peoples", assessment: "Strong Pass" },
        { pillar: "Reject Eliminationism", assessment: "Strong Pass" },
        { pillar: "Vision for Dignity & Peace", assessment: "Strong Pass" }
      ],
      reflection: "Test case for priority pillar fail rule."
    },
    expected: "Failing",
    expectedCategory: "Fail",
    description: "Priority pillar fail should cap at Failing despite 6 Strong Pass"
  },
  {
    name: "Priority Cap Rule Test",
    profile: {
      pillars: [
        { pillar: "Reject Targeting of Civilians", assessment: "Partial" }, // Priority pillar partial
        { pillar: "Accountability for Hamas / Militant Rejectionists", assessment: "Strong Pass" },
        { pillar: "Accountability for Israeli Right / Ultra-Nationalists", assessment: "Strong Pass" },
        { pillar: "Use Verified, Truthful Sources", assessment: "Strong Pass" },
        { pillar: "Humanize Both Peoples", assessment: "Partial" }, // Priority pillar partial
        { pillar: "Reject Eliminationism", assessment: "Strong Pass" },
        { pillar: "Vision for Dignity & Peace", assessment: "Strong Pass" }
      ],
      reflection: "Test case for priority pillar cap rule."
    },
    expected: "Partial Indicators",
    expectedCategory: "Partial",
    description: "2+ priority partials should cap positive ratings to Partial Indicators"
  }
];

// Test runner
function runTests() {
  console.log('🧪 MMR v8 Comprehensive Tests with Real Dataset Profiles\n');
  
  let totalTests = 0;
  let passedTests = 0;
  let failedTests = [];

  // Test real profiles
  console.log('📊 Testing Real Dataset Profiles:');
  realProfileTestCases.forEach(testCase => {
    totalTests++;
    const outcome = computeMMROutcome(testCase.profile, mmrV8Rules);
    const category = mapOutcomeToCategory(outcome);
    
    if (outcome === testCase.expected && category === testCase.expectedCategory) {
      console.log(`✅ ${testCase.name}: ${outcome} (${category})`);
      passedTests++;
    } else {
      console.log(`❌ ${testCase.name}: Expected ${testCase.expected} (${testCase.expectedCategory}), got ${outcome} (${category})`);
      failedTests.push({
        name: testCase.name,
        expected: testCase.expected,
        actual: outcome,
        expectedCategory: testCase.expectedCategory,
        actualCategory: category,
        description: testCase.description
      });
    }
  });

  // Test priority pillar rules
  console.log('\n🎯 Testing Priority Pillar Rules:');
  priorityPillarTestCases.forEach(testCase => {
    totalTests++;
    const outcome = computeMMROutcome(testCase.profile, mmrV8Rules);
    const category = mapOutcomeToCategory(outcome);
    
    if (outcome === testCase.expected && category === testCase.expectedCategory) {
      console.log(`✅ ${testCase.name}: ${outcome} (${category})`);
      passedTests++;
    } else {
      console.log(`❌ ${testCase.name}: Expected ${testCase.expected} (${testCase.expectedCategory}), got ${outcome} (${category})`);
      failedTests.push({
        name: testCase.name,
        expected: testCase.expected,
        actual: outcome,
        expectedCategory: testCase.expectedCategory,
        actualCategory: category,
        description: testCase.description
      });
    }
  });

  // Test group statistics
  console.log('\n📈 Testing Group Statistics:');
  const peaceAdvocates = realProfileTestCases.filter(tc => tc.category === "Peace Advocates");
  const peaceStats = calculateGroupStatistics(peaceAdvocates.map(tc => tc.profile));
  
  totalTests++;
  if (peaceStats.total === 2 && peaceStats.pass === 2 && peaceStats.passRate === 100) {
    console.log(`✅ Peace Advocates Group: ${peaceStats.pass} Pass, ${peaceStats.almostPass} Almost Pass, ${peaceStats.partial} Partial, ${peaceStats.fail} Fail (${peaceStats.passRate}% pass rate)`);
    passedTests++;
  } else {
    console.log(`❌ Peace Advocates Group: Expected 2 Pass, 100% pass rate, got ${peaceStats.pass} Pass, ${peaceStats.passRate}% pass rate`);
    failedTests.push({
      name: "Peace Advocates Group Statistics",
      expected: "2 Pass, 100% pass rate",
      actual: `${peaceStats.pass} Pass, ${peaceStats.passRate}% pass rate`
    });
  }

  // Summary
  console.log(`\n📋 Test Summary:`);
  console.log(`Total Tests: ${totalTests}`);
  console.log(`Passed: ${passedTests}`);
  console.log(`Failed: ${failedTests.length}`);
  
  if (failedTests.length > 0) {
    console.log('\n❌ Failed Tests:');
    failedTests.forEach(test => {
      console.log(`  - ${test.name}: Expected ${test.expected}, got ${test.actual}`);
      if (test.description) {
        console.log(`    ${test.description}`);
      }
    });
  } else {
    console.log('\n🎉 All tests passed!');
  }

  return { totalTests, passedTests, failedTests };
}

// Run the tests
runTests();

