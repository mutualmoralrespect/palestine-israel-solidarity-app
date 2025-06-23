// MMR v8 Comprehensive Tests with Real Dataset Profiles
// Tests the new 6-level outcome system using actual profiles from the database

import { computeMMROutcome, mapOutcomeToCategory, calculateGroupStatistics } from '../utils/mmrV8Calculations';
import mmrV8Rules from '../data/mmr_v8_rules.json';

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
    name: "Sulaiman Khatib",
    category: "Palestinian Voices",
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
      reflection: "Powerful example of transformation from militancy to nonviolent leadership with full MMR alignment."
    },
    expected: "High Positive Indicators",
    expectedCategory: "Pass",
    description: "Nonviolent activist with 6 Strong Pass + 1 Pass = should be High Positive Indicators"
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
    expected: "Emerging Positive Indicators",
    expectedCategory: "Almost Pass",
    description: "Opposition leader with 0 fails, 1 partial, 6 pass/strong, 2 priority passes = should be Emerging Positive Indicators"
  },
  {
    name: "Mahmoud Abbas",
    category: "Palestinian Authority Officials",
    profile: {
      pillars: [
        { pillar: "Reject Targeting of Civilians", assessment: "Strong Pass" },
        { pillar: "Accountability for Hamas / Militant Rejectionists", assessment: "Strong Pass" },
        { pillar: "Accountability for Israeli Right / Ultra-Nationalists", assessment: "Strong Pass" },
        { pillar: "Use Verified, Truthful Sources", assessment: "Strong Pass" },
        { pillar: "Humanize Both Peoples", assessment: "Partial" },
        { pillar: "Reject Eliminationism", assessment: "Pass" },
        { pillar: "Vision for Dignity & Peace", assessment: "Pass" }
      ],
      reflection: "Demonstrates moral clarity and leadership— condemning civilian harm, rebuking Hamas, asserting international justice, and envisioning Palestinian statehood."
    },
    expected: "Emerging Positive Indicators",
    expectedCategory: "Almost Pass",
    description: "PA President with 0 fails, 1 partial, 6 pass/strong, 3 priority passes = should be Emerging Positive Indicators"
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
  },
  {
    name: "Khaled Meshaal",
    category: "Hamas Officials",
    profile: {
      pillars: [
        { pillar: "Reject Targeting of Civilians", assessment: "Fail" },
        { pillar: "Accountability for Hamas / Militant Rejectionists", assessment: "Fail" },
        { pillar: "Accountability for Israeli Right / Ultra-Nationalists", assessment: "Partial" },
        { pillar: "Use Verified, Truthful Sources", assessment: "Fail" },
        { pillar: "Humanize Both Peoples", assessment: "Fail" },
        { pillar: "Reject Eliminationism", assessment: "Fail" },
        { pillar: "Vision for Dignity & Peace", assessment: "Fail" }
      ],
      reflection: "Embodies eliminationist rhetoric: praising civilian-targeted violence, rejecting mutual recognition, and framing perpetual jihad as the solution."
    },
    expected: "Systemic Fail",
    expectedCategory: "Fail",
    description: "Hamas political leader with 6 fails + 1 partial = should be Systemic Fail (4+ fails rule)"
  },
  {
    name: "Avigdor Lieberman",
    category: "Israeli Politicians",
    profile: {
      pillars: [
        { pillar: "Reject Targeting of Civilians", assessment: "Partial" },
        { pillar: "Accountability for Hamas / Militant Rejectionists", assessment: "Strong Pass" },
        { pillar: "Accountability for Israeli Right / Ultra-Nationalists", assessment: "Partial" },
        { pillar: "Use Verified, Truthful Sources", assessment: "Pass" },
        { pillar: "Humanize Both Peoples", assessment: "Partial" },
        { pillar: "Reject Eliminationism", assessment: "Pass" },
        { pillar: "Vision for Dignity & Peace", assessment: "Partial" }
      ],
      reflection: "Hardline security-focused politician with limited MMR alignment beyond Hamas accountability."
    },
    expected: "Partial Indicators",
    expectedCategory: "Partial",
    description: "Hardline politician with 0 fails, 4 partials, 3 pass = should be Partial Indicators"
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

// Eliminationist flag test cases
const eliminationistTestCases = [
  {
    name: "Eliminationist Flag Test",
    profile: {
      pillars: [
        { pillar: "Reject Targeting of Civilians", assessment: "Strong Pass" },
        { pillar: "Accountability for Hamas / Militant Rejectionists", assessment: "Strong Pass" },
        { pillar: "Accountability for Israeli Right / Ultra-Nationalists", assessment: "Strong Pass" },
        { pillar: "Use Verified, Truthful Sources", assessment: "Strong Pass" },
        { pillar: "Humanize Both Peoples", assessment: "Strong Pass" },
        { pillar: "Reject Eliminationism", assessment: "Strong Pass" },
        { pillar: "Vision for Dignity & Peace", assessment: "Strong Pass" }
      ],
      reflection: "This person advocates for eliminationist policies against the other side."
    },
    expected: "Systemic Fail",
    expectedCategory: "Fail",
    description: "Eliminationist content should trigger Systemic Fail regardless of pillar scores"
  }
];

describe('MMR v8 Outcome System - Real Profile Tests', () => {
  
  describe('Real Dataset Profiles', () => {
    realProfileTestCases.forEach(testCase => {
      test(`${testCase.name} (${testCase.category})`, () => {
        const outcome = computeMMROutcome(testCase.profile, mmrV8Rules);
        const category = mapOutcomeToCategory(outcome);
        
        expect(outcome).toBe(testCase.expected);
        expect(category).toBe(testCase.expectedCategory);
      });
    });
  });

  describe('Priority Pillar Rules', () => {
    priorityPillarTestCases.forEach(testCase => {
      test(testCase.name, () => {
        const outcome = computeMMROutcome(testCase.profile, mmrV8Rules);
        const category = mapOutcomeToCategory(outcome);
        
        expect(outcome).toBe(testCase.expected);
        expect(category).toBe(testCase.expectedCategory);
      });
    });
  });

  describe('Eliminationist Flag', () => {
    eliminationistTestCases.forEach(testCase => {
      test(testCase.name, () => {
        const outcome = computeMMROutcome(testCase.profile, mmrV8Rules);
        const category = mapOutcomeToCategory(outcome);
        
        expect(outcome).toBe(testCase.expected);
        expect(category).toBe(testCase.expectedCategory);
      });
    });
  });

  describe('Group Statistics Calculation', () => {
    test('Peace Advocates Group Statistics', () => {
      const peaceAdvocates = realProfileTestCases.filter(tc => tc.category === "Peace Advocates");
      const stats = calculateGroupStatistics(peaceAdvocates.map(tc => tc.profile));
      
      expect(stats.total).toBe(2);
      expect(stats.pass).toBe(2); // Both should be "Pass" category
      expect(stats.almostPass).toBe(0);
      expect(stats.partial).toBe(0);
      expect(stats.fail).toBe(0);
      expect(stats.passRate).toBe(100);
      expect(stats.level).toBe("Strong");
    });

    test('Israeli Politicians Group Statistics', () => {
      const israeliPoliticians = realProfileTestCases.filter(tc => tc.category === "Israeli Politicians");
      const stats = calculateGroupStatistics(israeliPoliticians.map(tc => tc.profile));
      
      expect(stats.total).toBe(4);
      expect(stats.pass).toBe(1); // Yair Golan
      expect(stats.almostPass).toBe(1); // Yair Lapid  
      expect(stats.partial).toBe(2); // Gantz, Lieberman
      expect(stats.fail).toBe(0);
      expect(stats.passRate).toBe(50); // (1+1)/4 * 100
      expect(stats.level).toBe("Needs Improvement");
    });

    test('Hamas Officials Group Statistics', () => {
      const hamasOfficials = realProfileTestCases.filter(tc => tc.category === "Hamas Officials");
      const stats = calculateGroupStatistics(hamasOfficials.map(tc => tc.profile));
      
      expect(stats.total).toBe(2);
      expect(stats.pass).toBe(0);
      expect(stats.almostPass).toBe(0);
      expect(stats.partial).toBe(0);
      expect(stats.fail).toBe(2); // Both Sinwar and Meshaal
      expect(stats.passRate).toBe(0);
      expect(stats.level).toBe("Needs Improvement");
    });
  });

  describe('Edge Cases and Validation', () => {
    test('Empty profile array', () => {
      const stats = calculateGroupStatistics([]);
      expect(stats.total).toBe(0);
      expect(stats.level).toBe("No Data");
    });

    test('Profile with missing pillars', () => {
      const incompleteProfile = {
        pillars: [
          { pillar: "Reject Targeting of Civilians", assessment: "Pass" },
          { pillar: "Accountability for Hamas / Militant Rejectionists", assessment: "Pass" }
          // Missing 5 pillars
        ],
        reflection: "Incomplete profile for testing."
      };
      
      const outcome = computeMMROutcome(incompleteProfile, mmrV8Rules);
      expect(outcome).toBeDefined();
      expect(typeof outcome).toBe('string');
    });

    test('Profile with invalid assessment values', () => {
      const invalidProfile = {
        pillars: [
          { pillar: "Reject Targeting of Civilians", assessment: "Invalid Assessment" },
          { pillar: "Accountability for Hamas / Militant Rejectionists", assessment: "Pass" },
          { pillar: "Accountability for Israeli Right / Ultra-Nationalists", assessment: "Pass" },
          { pillar: "Use Verified, Truthful Sources", assessment: "Pass" },
          { pillar: "Humanize Both Peoples", assessment: "Pass" },
          { pillar: "Reject Eliminationism", assessment: "Pass" },
          { pillar: "Vision for Dignity & Peace", assessment: "Pass" }
        ],
        reflection: "Profile with invalid assessment for testing."
      };
      
      const outcome = computeMMROutcome(invalidProfile, mmrV8Rules);
      expect(outcome).toBeDefined();
      expect(typeof outcome).toBe('string');
    });
  });
});

// Export test cases for use in other test files
export { realProfileTestCases, priorityPillarTestCases, eliminationistTestCases };

