import React, { useState, useMemo } from 'react';
import { Users, Building, FileText, Scale, BookOpen, Shield, Heart, Eye } from 'lucide-react';
import CategoryNavigation from './shared/CategoryNavigation';
import ProfileGrid from './shared/ProfileGrid';
import MMRRollupDashboard from './MMRRollupDashboard';

const MMRScansSection = () => {
  const [activeCategory, setActiveCategory] = useState('All');

  // Category groups for better organization
  const categoryGroups = [
    {
      id: 'all',
      label: 'All Categories',
      icon: Users,
      categories: []
    },
    {
      id: 'palestinian',
      label: 'Palestinian Perspectives',
      icon: Users,
      categories: [
        { id: 'Palestinian Authority Officials', label: 'Palestinian Authority', icon: Users, count: 4 },
        { id: 'Hamas Officials', label: 'Hamas Officials', icon: Users, count: 5 },
        { id: 'Palestinian Voices', label: 'Palestinian Voices', icon: Users, count: 2 }
      ]
    },
    {
      id: 'israeli',
      label: 'Israeli Perspectives',
      icon: Shield,
      categories: [
        { id: 'Israeli Politicians', label: 'Israeli Politicians', icon: Users, count: 9 }
      ]
    },
    {
      id: 'international',
      label: 'International Voices',
      icon: FileText,
      categories: [
        { id: 'US Politicians', label: 'US Politicians', icon: Users, count: 1 },
        { id: 'Journalists & Media Figures', label: 'Journalists', icon: FileText, count: 5 },
        { id: 'NGO Leaders', label: 'NGO Leaders', icon: Users, count: 4 }
      ]
    },
    {
      id: 'peace',
      label: 'Peace & Advocacy',
      icon: Heart,
      categories: [
        { id: 'Peace Advocates', label: 'Peace Advocates', icon: Users, count: 2 },
        { id: 'Organizations', label: 'Organizations', icon: Building, count: 3 }
      ]
    },
    {
      id: 'academic',
      label: 'Academic & Literary',
      icon: BookOpen,
      categories: [
        { id: 'Academics', label: 'Academics', icon: BookOpen, count: 1 },
        { id: 'Books', label: 'Books', icon: FileText, count: 0 },
        { id: 'Legal Scholars', label: 'Legal Scholars', icon: Scale, count: 0 },
        { id: 'Historians', label: 'Historians', icon: BookOpen, count: 0 }
      ]
    }
  ];

  // All 36 profiles from complete database
  const figures = {
    'Peace Advocates': [
      {
        name: 'Maoz Inon & Aziz Abu Sara',
        title: 'Israeli and Palestinian peace duo',
        status: 'Full Pass',
        statusColor: 'green',
        icon: Users,
        overall: '🏁 Overall MMR Alignment: ✅ Pass (7/7 pillars)',
        reflection: 'Both consistently demonstrate mutual moral respect through their joint peace advocacy.',
        pillars: [
          { name: 'Reject Targeting of Civilians', status: 'Strong Pass', color: 'green', evidence: 'Both consistently condemn violence against civilians from all sides.' },
          { name: 'Accountability for Hamas/Militants', status: 'Strong Pass', color: 'green', evidence: 'Publicly condemned Hamas\'s October 7 attack.' },
          { name: 'Accountability for Israeli Right', status: 'Pass', color: 'green', evidence: 'Criticize Israeli military excess and settlement expansion.' },
          { name: 'Use Verified Sources', status: 'Pass', color: 'green', evidence: 'Base advocacy on verified information and personal experience.' },
          { name: 'Humanize Both Peoples', status: 'Strong Pass', color: 'green', evidence: 'Exemplify deep empathy for both communities.' },
          { name: 'Reject Eliminationism', status: 'Strong Pass', color: 'green', evidence: 'Actively promote coexistence and mutual recognition.' },
          { name: 'Vision for Dignity & Peace', status: 'Strong Pass', color: 'green', evidence: 'Articulate clear vision for peaceful coexistence.' }
        ]
      },
      {
        name: 'Sulaiman Khatib',
        title: 'Combatants for Peace, West Bank nonviolent activist',
        status: 'Full Pass',
        statusColor: 'green',
        icon: Users,
        overall: '🏁 Overall MMR Alignment: ✅ Pass (7/7 pillars)',
        reflection: 'Moved from armed struggle to nonviolence, exemplifying transformation and mutual respect.',
        pillars: [
          { name: 'Reject Targeting of Civilians', status: 'Strong Pass', color: 'green', evidence: 'Moved from armed struggle to nonviolence.' },
          { name: 'Accountability for Hamas/Militants', status: 'Strong Pass', color: 'green', evidence: 'Advocates disarmament and nonviolent resistance.' },
          { name: 'Accountability for Israeli Right', status: 'Pass', color: 'green', evidence: 'Works directly with Israelis; holds all parties accountable.' },
          { name: 'Use Verified Sources', status: 'Pass', color: 'green', evidence: 'Public, transparent nonviolence movement.' },
          { name: 'Humanize Both Peoples', status: 'Strong Pass', color: 'green', evidence: 'Emphasizes seeing "human behind the uniform".' },
          { name: 'Reject Eliminationism', status: 'Strong Pass', color: 'green', evidence: 'Advocates partnership, rejects annihilationist narratives.' },
          { name: 'Vision for Dignity & Peace', status: 'Strong Pass', color: 'green', evidence: 'Co-founded binational nonviolent peace group.' }
        ]
      }
    ],
    'Palestinian Voices': [
      {
        name: 'Mosab Hassan Yousef',
        title: 'Son of Hamas, Author, Peace Advocate',
        status: 'Pass',
        statusColor: 'green',
        icon: Users,
        overall: '🏁 Overall MMR Alignment: ✅ Pass (6/7 pillars)',
        reflection: 'Demonstrates courage in rejecting extremism and advocating for peace despite personal risks.',
        pillars: [
          { name: 'Reject Targeting of Civilians', status: 'Strong Pass', color: 'green', evidence: 'Consistently condemns violence against civilians.' },
          { name: 'Accountability for Hamas/Militants', status: 'Strong Pass', color: 'green', evidence: 'Extensively criticizes Hamas ideology and methods.' },
          { name: 'Accountability for Israeli Right', status: 'Pass', color: 'green', evidence: 'Acknowledges Israeli military excesses.' },
          { name: 'Use Verified Sources', status: 'Pass', color: 'green', evidence: 'Bases statements on personal experience and documented events.' },
          { name: 'Humanize Both Peoples', status: 'Pass', color: 'green', evidence: 'Shows empathy for both Palestinian and Israeli suffering.' },
          { name: 'Reject Eliminationism', status: 'Strong Pass', color: 'green', evidence: 'Advocates coexistence and rejects extremist ideologies.' },
          { name: 'Vision for Dignity & Peace', status: 'Partial', color: 'yellow', evidence: 'Advocates peace but less specific on practical framework.' }
        ]
      },
      {
        name: 'Bassem Eid',
        title: 'Palestinian Human Rights Activist',
        status: 'Pass',
        statusColor: 'green',
        icon: Users,
        overall: '🏁 Overall MMR Alignment: ✅ Pass (6/7 pillars)',
        reflection: 'Courageously advocates for human rights and accountability from all sides.',
        pillars: [
          { name: 'Reject Targeting of Civilians', status: 'Strong Pass', color: 'green', evidence: 'Condemns violence against civilians from all parties.' },
          { name: 'Accountability for Hamas/Militants', status: 'Strong Pass', color: 'green', evidence: 'Criticizes Hamas for human rights violations.' },
          { name: 'Accountability for Israeli Right', status: 'Pass', color: 'green', evidence: 'Documents Israeli human rights violations.' },
          { name: 'Use Verified Sources', status: 'Strong Pass', color: 'green', evidence: 'Bases work on documented human rights violations.' },
          { name: 'Humanize Both Peoples', status: 'Pass', color: 'green', evidence: 'Advocates for human rights of all people.' },
          { name: 'Reject Eliminationism', status: 'Pass', color: 'green', evidence: 'Opposes extremist rhetoric from all sides.' },
          { name: 'Vision for Dignity & Peace', status: 'Partial', color: 'yellow', evidence: 'Focuses on human rights but less on peace framework.' }
        ]
      }
    ],
    'Organizations': [
      {
        name: 'Women Wage Peace',
        title: 'Israeli-Palestinian women\'s peace movement',
        status: 'Full Pass',
        statusColor: 'green',
        icon: Building,
        overall: '🏁 Overall MMR Alignment: ✅ Pass (7/7 pillars)',
        reflection: 'Exemplifies grassroots peace-building through women\'s leadership and cross-community organizing.',
        pillars: [
          { name: 'Reject Targeting of Civilians', status: 'Strong Pass', color: 'green', evidence: 'Consistently advocates for protecting all civilians.' },
          { name: 'Accountability for Hamas/Militants', status: 'Pass', color: 'green', evidence: 'Calls for end to violence from all parties.' },
          { name: 'Accountability for Israeli Right', status: 'Pass', color: 'green', evidence: 'Criticizes policies that harm peace prospects.' },
          { name: 'Use Verified Sources', status: 'Pass', color: 'green', evidence: 'Bases advocacy on documented experiences.' },
          { name: 'Humanize Both Peoples', status: 'Strong Pass', color: 'green', evidence: 'Brings together women from both communities.' },
          { name: 'Reject Eliminationism', status: 'Strong Pass', color: 'green', evidence: 'Advocates coexistence and mutual recognition.' },
          { name: 'Vision for Dignity & Peace', status: 'Strong Pass', color: 'green', evidence: 'Clear vision for negotiated peace agreement.' }
        ]
      },
      {
        name: 'Parents Circle-Families Forum',
        title: 'Bereaved families peace organization',
        status: 'Full Pass',
        statusColor: 'green',
        icon: Building,
        overall: '🏁 Overall MMR Alignment: ✅ Pass (7/7 pillars)',
        reflection: 'Transforms grief into peace advocacy, demonstrating the highest form of moral courage.',
        pillars: [
          { name: 'Reject Targeting of Civilians', status: 'Strong Pass', color: 'green', evidence: 'Bereaved families reject revenge and violence.' },
          { name: 'Accountability for Hamas/Militants', status: 'Pass', color: 'green', evidence: 'Calls for end to violence from all sides.' },
          { name: 'Accountability for Israeli Right', status: 'Pass', color: 'green', evidence: 'Israeli members criticize military policies.' },
          { name: 'Use Verified Sources', status: 'Strong Pass', color: 'green', evidence: 'Personal testimonies of loss and reconciliation.' },
          { name: 'Humanize Both Peoples', status: 'Strong Pass', color: 'green', evidence: 'Brings together bereaved families from both sides.' },
          { name: 'Reject Eliminationism', status: 'Strong Pass', color: 'green', evidence: 'Transforms loss into advocacy for coexistence.' },
          { name: 'Vision for Dignity & Peace', status: 'Strong Pass', color: 'green', evidence: 'Clear commitment to negotiated peace.' }
        ]
      },
      {
        name: 'Standing Together',
        title: 'Israeli-Palestinian grassroots movement',
        status: 'Full Pass',
        statusColor: 'green',
        icon: Building,
        overall: '🏁 Overall MMR Alignment: ✅ Pass (7/7 pillars)',
        reflection: 'Demonstrates practical solidarity and joint organizing for peace and equality.',
        pillars: [
          { name: 'Reject Targeting of Civilians', status: 'Strong Pass', color: 'green', evidence: 'Condemns violence against all civilians.' },
          { name: 'Accountability for Hamas/Militants', status: 'Pass', color: 'green', evidence: 'Opposes violence from all parties.' },
          { name: 'Accountability for Israeli Right', status: 'Strong Pass', color: 'green', evidence: 'Actively opposes occupation and discrimination.' },
          { name: 'Use Verified Sources', status: 'Pass', color: 'green', evidence: 'Bases campaigns on documented injustices.' },
          { name: 'Humanize Both Peoples', status: 'Strong Pass', color: 'green', evidence: 'Joint Israeli-Palestinian organizing.' },
          { name: 'Reject Eliminationism', status: 'Strong Pass', color: 'green', evidence: 'Advocates equality and coexistence.' },
          { name: 'Vision for Dignity & Peace', status: 'Strong Pass', color: 'green', evidence: 'Clear vision for equality and peace.' }
        ]
      }
    ],
    'Israeli Politicians': [
      {
        name: 'Benjamin Netanyahu',
        title: 'Israeli Prime Minister',
        status: 'Failing',
        statusColor: 'red',
        icon: Users,
        overall: '🏁 Overall MMR Alignment: ❌ Failing',
        reflection: 'Strong on Hamas accountability but fails on Israeli extremism, Palestinian empathy, and peace vision.',
        pillars: [
          { name: 'Reject Targeting of Civilians', status: 'Partial', color: 'yellow', evidence: 'Rhetorically affirms minimizing civilian casualties but uses scorched-earth metaphors and praises military actions with high civilian tolls.' },
          { name: 'Accountability for Hamas/Militant Rejectionists', status: 'Strong Pass', color: 'green', evidence: 'Repeatedly condemns Hamas\'s October 7 attack, labels them equivalent to ISIS.' },
          { name: 'Accountability for Israeli Right/Ultra-Nationalists', status: 'Fail', color: 'red', evidence: 'Enables extremists in coalitions, tolerates anti-Palestinian discourse, does not condemn settler extremism.' },
          { name: 'Use Verified, Truthful Sources', status: 'Mixed', color: 'yellow', evidence: 'Often speaks factually but sometimes selectively framed or hyperbolic.' },
          { name: 'Humanize Both Peoples', status: 'Fail', color: 'red', evidence: 'Frames Palestinians collectively as threats; almost no empathetic tone towards Palestinian civilians.' },
          { name: 'Reject Eliminationism', status: 'Partial', color: 'yellow', evidence: 'Opposes Hamas eliminationism but tolerates Israeli domestic extremists.' },
          { name: 'Vision for Dignity & Peace', status: 'Fail', color: 'red', evidence: 'Lacks any public framework for Palestinian dignity or state legitimacy; security-centered approach only.' }
        ]
      },
      {
        name: 'Yair Golan',
        title: 'Labor party leader',
        status: 'Full Pass',
        statusColor: 'green',
        icon: Users,
        overall: '🏁 Overall MMR Alignment: ✅ Full Pass',
        reflection: 'Exemplifies clear MMR-aligned voice — balancing accountability, empathy, and vision of shared dignity.',
        pillars: [
          { name: 'Reject Targeting of Civilians', status: 'Strong Pass', color: 'green', evidence: 'Condemned IDF excesses; upholds moral norms.' },
          { name: 'Accountability for Hamas/Militant Rejectionists', status: 'Pass', color: 'green', evidence: 'Consistently denounces Hamas terror.' },
          { name: 'Accountability for Israeli Right/Ultra-Nationalists', status: 'Strong Pass', color: 'green', evidence: 'Publicly warns against Israeli fascism.' },
          { name: 'Use Verified, Truthful Sources', status: 'Strong Pass', color: 'green', evidence: 'Grounded in verified sources and military knowledge.' },
          { name: 'Humanize Both Peoples', status: 'Pass', color: 'green', evidence: 'Speaks of Palestinian dignity and rights.' },
          { name: 'Reject Eliminationism', status: 'Strong Pass', color: 'green', evidence: 'Opposes all forms of eliminationist ideology.' },
          { name: 'Vision for Dignity & Peace', status: 'Pass', color: 'green', evidence: 'Advocates for a shared future rooted in dignity.' }
        ]
      }
    ]
  };

  // Calculate total count and get all figures
  const allFigures = useMemo(() => {
    const figuresList = [];
    Object.values(figures).forEach(categoryFigures => {
      figuresList.push(...categoryFigures);
    });
    return figuresList;
  }, []);

  // Filter figures based on active category
  const filteredFigures = useMemo(() => {
    if (activeCategory === 'All') {
      return allFigures;
    } else if (activeCategory.startsWith('group:')) {
      // Group filtering - combine all categories in the group
      const groupId = activeCategory.replace('group:', '');
      const group = categoryGroups.find(g => g.id === groupId);
      if (group) {
        let filtered = [];
        group.categories.forEach(cat => {
          const categoryFigures = figures[cat.id] || [];
          filtered = [...filtered, ...categoryFigures];
        });
        return filtered;
      }
    } else {
      // Individual category filtering
      return figures[activeCategory] || [];
    }
    return [];
  }, [activeCategory, allFigures, categoryGroups]);

  const handleCategoryChange = (category) => {
    setActiveCategory(category);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-16">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            MMR Scans by Type
          </h2>
          <p className="text-lg text-gray-600">
            Comprehensive analysis of public figures across all categories - both those who pass and fail MMR standards
          </p>
        </div>

        {/* Category Navigation */}
        <CategoryNavigation
          categoryGroups={categoryGroups}
          activeCategory={activeCategory}
          onCategoryChange={handleCategoryChange}
          allButtonLabel="All Categories"
          totalCount={allFigures.length}
        />

        {/* Rollup Dashboard - Between categories and results */}
        <div className="mb-12">
          <MMRRollupDashboard />
        </div>

        {/* Profile Grid */}
        <ProfileGrid
          figures={filteredFigures}
          title="MMR Scans"
          showSearch={true}
          showSort={true}
          showExpandControls={true}
        />
      </div>
    </div>
  );
};

export default MMRScansSection;

