import React, { useState } from 'react';
import { Users, Building, FileText, Scale, BookOpen, ChevronDown, Shield, Search, Heart, Handshake, Bird } from 'lucide-react';

const MMRScansSection = () => {
  const [activeCategory, setActiveCategory] = useState('Peace Advocates');

  const categories = [
    { id: 'Peace Advocates', label: 'Peace Advocates', icon: Users, count: 4 },
    { id: 'Organizations', label: 'Organizations', icon: Building, count: 6 },
    { id: 'Journalists', label: 'Journalists', icon: FileText, count: 2 },
    { id: 'Legal Scholars', label: 'Legal Scholars', icon: Scale, count: 2 },
    { id: 'Historians', label: 'Historians', icon: BookOpen, count: 7 },
    { id: 'Israeli Politicians', label: 'Israeli Politicians', icon: Users, count: 3 },
    { id: 'Palestinian Politicians', label: 'Palestinian Politicians', icon: Users, count: 1 },
    { id: 'US Politicians', label: 'US Politicians', icon: Users, count: 1 }
  ];

  const figures = {
    'Peace Advocates': [
      {
        name: 'Maoz Inon & Aziz Abu Sara',
        title: 'Israeli and Palestinian peace duo',
        status: 'Full Pass',
        statusColor: 'green',
        icon: Bird,
        pillars: [
          { name: 'Reject targeting civilians', status: 'Strong Pass', color: 'green', evidence: 'Both consistently condemn violence against civilians from all sides and advocate for protecting innocent lives.' },
          { name: 'Accountability for Hamas/Militants', status: 'Strong Pass', color: 'green', evidence: 'Publicly condemned Hamas\'s October 7 attack and consistently oppose militant violence.' },
          { name: 'Accountability for Israeli Right', status: 'Pass', color: 'green', evidence: 'Criticize Israeli military excess and settlement expansion while maintaining focus on peace.' },
          { name: 'Use verified sources', status: 'Pass', color: 'green', evidence: 'Base their advocacy on verified information and personal experience rather than propaganda.' },
          { name: 'Humanize both peoples', status: 'Strong Pass', color: 'green', evidence: 'Exemplify deep empathy for both communities, sharing personal loss and building bridges.' },
          { name: 'Embrace coexistence', status: 'Strong Pass', color: 'green', evidence: 'Actively promote coexistence and mutual recognition of both peoples\' rights.' },
          { name: 'Vision for dignity & peace', status: 'Strong Pass', color: 'green', evidence: 'Articulate a clear vision for peaceful coexistence with dignity for both peoples.' }
        ]
      },
      {
        name: 'Sulaiman Khatib',
        title: 'Combatants for Peace, West Bank nonviolent activist',
        status: 'Full Pass',
        statusColor: 'green',
        icon: Handshake,
        pillars: [
          { name: 'Reject targeting civilians', status: 'Strong Pass', color: 'green', evidence: 'Moved from armed struggle to nonviolence, condemns violence against all civilians.' },
          { name: 'Accountability for Hamas/Militants', status: 'Strong Pass', color: 'green', evidence: 'Advocates disarmament and nonviolent resistance, opposes militant approaches.' },
          { name: 'Accountability for Israeli Right', status: 'Pass', color: 'green', evidence: 'Works directly with Israelis; holds all parties accountable equally.' },
          { name: 'Use verified sources', status: 'Pass', color: 'green', evidence: 'Public, transparent nonviolence movement with documentation.' },
          { name: 'Humanize both peoples', status: 'Strong Pass', color: 'green', evidence: 'Emphasizes seeing "human behind the uniform" - profound empathy for all.' },
          { name: 'Embrace coexistence', status: 'Strong Pass', color: 'green', evidence: 'Advocates partnership, rejects annihilationist narratives from all sides.' },
          { name: 'Vision for dignity & peace', status: 'Strong Pass', color: 'green', evidence: 'Co-founded binational nonviolent peace group; Nobel-nominated for peace work.' }
        ]
      }
    ],
    'Israeli Politicians': [
      {
        name: 'Benjamin Netanyahu',
        title: 'Israeli Prime Minister (2009–present)',
        status: 'Failing',
        statusColor: 'red',
        icon: Users,
        pillars: [
          { name: 'Reject targeting civilians', status: 'Partial', color: 'yellow', evidence: 'He rhetorically affirms that Israel "does everything to minimize civilian casualties", but his later statements praising military actions described as "tragic mishaps" and the use of scorched-earth metaphors ("children of darkness") weaken the clarity.' },
          { name: 'Accountability for Hamas/Militants', status: 'Strong Pass', color: 'green', evidence: 'Repeatedly condemns Hamas\'s October 7 attack, labels them equivalent to ISIS, and centers his political narrative around defeating them.' },
          { name: 'Accountability for Israeli Right', status: 'Fail', color: 'red', evidence: 'Enables extremists in coalitions, tolerates anti-Palestinian discourse ("voluntary migration"), and does not publicly condemn Kahanist or settler extremism.' },
          { name: 'Use verified sources', status: 'Mixed', color: 'yellow', evidence: 'Often speaks factually (e.g. ICRC, Israeli tactics), but sometimes selectively framed or hyperbolic.' },
          { name: 'Humanize both peoples', status: 'Fail', color: 'red', evidence: 'Frames Palestinians collectively as threats or tools of Hamas; almost no empathetic tone towards Palestinian civilians.' },
          { name: 'Embrace coexistence', status: 'Partial', color: 'yellow', evidence: 'Opposes Hamas eliminationism but tolerates Israeli domestic extremists and conditional on "voluntary migration," undermining the standard.' },
          { name: 'Vision for dignity & peace', status: 'Fail', color: 'red', evidence: 'Lacks any public framework for Palestinian dignity or state legitimacy; security-centered, no genuine peace roadmap.' }
        ]
      },
      {
        name: 'Itamar Ben-Gvir',
        title: 'Israeli National Security Minister',
        status: 'Clear Fail',
        statusColor: 'red',
        icon: Users,
        pillars: [
          { name: 'Reject targeting civilians', status: 'Fail', color: 'red', evidence: 'Publicly called for the town of Huwara to be "wiped out." Defends settler violence. Promotes military actions with disregard for civilian consequences.' },
          { name: 'Accountability for Hamas/Militants', status: 'Pass', color: 'green', evidence: 'Strong condemnation of Hamas; clear that they are genocidal.' },
          { name: 'Accountability for Israeli Right', status: 'Fail', color: 'red', evidence: 'He is a core far-right figure. No critique of settler violence or ultra-nationalist terrorism. In fact, promotes it.' },
          { name: 'Use verified sources', status: 'Mixed', color: 'yellow', evidence: 'Occasionally uses verified events but distorts framing with supremacist ideology and incitement.' },
          { name: 'Humanize both peoples', status: 'Fail', color: 'red', evidence: 'Dehumanizes Palestinians repeatedly. Publicly questions their national identity and rights. No meaningful empathy expressed.' },
          { name: 'Embrace coexistence', status: 'Fail', color: 'red', evidence: 'Explicitly opposes Palestinian statehood. Advocates permanent control and subjugation. No dignity-based or peace-oriented vision.' },
          { name: 'Vision for dignity & peace', status: 'Fail', color: 'red', evidence: 'Explicitly opposes Palestinian statehood. Advocates permanent control and subjugation. No dignity-based or peace-oriented vision.' }
        ]
      },
      {
        name: 'Bezalel Smotrich',
        title: 'Israeli Finance Minister',
        status: 'Clear Fail',
        statusColor: 'red',
        icon: Users,
        pillars: [
          { name: 'Reject targeting civilians', status: 'Fail', color: 'red', evidence: 'Publicly called for the town of Huwara to be "wiped out." Defends settler violence. Promotes military actions with disregard for civilian consequences.' },
          { name: 'Accountability for Hamas/Militants', status: 'Pass', color: 'green', evidence: 'Strong condemnation of Hamas; clear that they are genocidal.' },
          { name: 'Accountability for Israeli Right', status: 'Fail', color: 'red', evidence: 'He is a core far-right figure. No critique of settler violence or ultra-nationalist terrorism. In fact, promotes it.' },
          { name: 'Use verified sources', status: 'Mixed', color: 'yellow', evidence: 'Occasionally uses verified events but distorts framing with supremacist ideology and incitement.' },
          { name: 'Humanize both peoples', status: 'Fail', color: 'red', evidence: 'Dehumanizes Palestinians repeatedly. Publicly questions their national identity and rights. No meaningful empathy expressed.' },
          { name: 'Embrace coexistence', status: 'Fail', color: 'red', evidence: 'Explicitly opposes Palestinian statehood. Advocates permanent control and subjugation. No dignity-based or peace-oriented vision.' },
          { name: 'Vision for dignity & peace', status: 'Fail', color: 'red', evidence: 'Explicitly opposes Palestinian statehood. Advocates permanent control and subjugation. No dignity-based or peace-oriented vision.' }
        ]
      }
    ],
    'Palestinian Politicians': [
      {
        name: 'Yahya Sinwar',
        title: 'Former Hamas leader in Gaza (deceased)',
        status: 'Clear Fail',
        statusColor: 'red',
        icon: Users,
        pillars: [
          { name: 'Reject targeting civilians', status: 'Fail', color: 'red', evidence: 'Orchestrated October 7 attack targeting civilians; explicitly justifies targeting Israeli civilians as legitimate resistance.' },
          { name: 'Accountability for Hamas/Militants', status: 'Fail', color: 'red', evidence: 'As Hamas leader, takes no accountability for civilian casualties caused by Hamas; justifies all actions as resistance.' },
          { name: 'Accountability for Israeli Right', status: 'Pass', color: 'green', evidence: 'Consistently condemns Israeli military actions and settlement expansion, though through militant lens.' },
          { name: 'Use verified sources', status: 'Mixed', color: 'yellow', evidence: 'Uses some factual information about Israeli actions but frames through propaganda and eliminationist rhetoric.' },
          { name: 'Humanize both peoples', status: 'Fail', color: 'red', evidence: 'Dehumanizes Israelis as occupiers and colonizers; shows no empathy for Israeli civilian suffering.' },
          { name: 'Embrace coexistence', status: 'Fail', color: 'red', evidence: 'Explicitly rejects coexistence; advocates for elimination of Israeli state and Jewish presence.' },
          { name: 'Vision for dignity & peace', status: 'Fail', color: 'red', evidence: 'No vision for peaceful coexistence; advocates continued armed resistance until total victory.' }
        ]
      }
    ],
    'US Politicians': [
      {
        name: 'Rep. Ritchie Torres',
        title: 'U.S. Representative (D-NY)',
        status: 'Strong Pass',
        statusColor: 'green',
        icon: Users,
        pillars: [
          { name: 'Reject targeting civilians', status: 'Strong Pass', color: 'green', evidence: 'Torres consistently condemns Hamas\'s October 7 terror attacks as "crimes against humanity" and emphasizes the centrality of protecting civilians. He supports Israel\'s right to self-defense but stresses that Palestinian civilian life is no less sacred than Israeli life.' },
          { name: 'Accountability for Hamas/Militants', status: 'Strong Pass', color: 'green', evidence: 'Clear and repeated moral condemnation of Hamas, calling them a genocidal terrorist organization. Criticizes Palestinian Authority\'s glorification of violence and failure to embrace peaceful state-building. Explicit that Palestinian leadership bears responsibility for rejectionist stances.' },
          { name: 'Accountability for Israeli Right', status: 'Strong Pass', color: 'green', evidence: 'One of the few vocal American politicians calling out Israeli ultranationalist figures (e.g., Ben-Gvir, Smotrich). Warns against annexation, creeping authoritarianism, and erosion of democratic norms in Netanyahu\'s coalition. Calls for holding Israeli extremists accountable.' },
          { name: 'Use verified sources', status: 'Strong Pass', color: 'green', evidence: 'Relies on verified reporting, direct sourcing from human rights organizations (e.g., Amnesty), and clear fact-based Congressional speeches. Avoids conspiracy or inflammatory sourcing — presents grounded, evidence-based positions.' },
          { name: 'Humanize both peoples', status: 'Strong Pass', color: 'green', evidence: 'Explicitly acknowledges Palestinian suffering and dignity while also recognizing Israeli trauma and security concerns. Speaks of both peoples as deserving of safety, freedom, and self-determination.' },
          { name: 'Embrace coexistence', status: 'Strong Pass', color: 'green', evidence: 'Supports two-state solution and mutual recognition. Rejects eliminationist rhetoric from all sides. Advocates for policies that recognize both peoples\' legitimate national aspirations.' },
          { name: 'Vision for dignity & peace', status: 'Strong Pass', color: 'green', evidence: 'Articulates a clear vision for two-state solution with security for Israel and dignity/sovereignty for Palestinians. Supports constructive U.S. engagement to facilitate peace negotiations.' }
        ]
      }
    ],
    'Organizations': [],
    'Journalists': [],
    'Legal Scholars': [],
    'Historians': []
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Full Pass':
      case 'Strong Pass':
        return 'text-green-600 bg-green-50 border-green-200';
      case 'Pass':
        return 'text-green-600 bg-green-50 border-green-200';
      case 'Partial':
      case 'Mixed':
        return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'Fail':
      case 'Failing':
      case 'Clear Fail':
        return 'text-red-600 bg-red-50 border-red-200';
      default:
        return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getPillarColor = (color) => {
    switch (color) {
      case 'green':
        return 'text-green-600 bg-green-50 border-green-200';
      case 'yellow':
        return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'red':
        return 'text-red-600 bg-red-50 border-red-200';
      default:
        return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-16">
      <div className="max-w-6xl mx-auto px-4">
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
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {categories.map((category) => {
            const IconComponent = category.icon;
            return (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  activeCategory === category.id
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
                }`}
              >
                <IconComponent className="w-4 h-4" />
                {category.label}
                <span className="bg-gray-200 text-gray-700 px-2 py-0.5 rounded-full text-xs">
                  {category.count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Figures Display */}
        <div className="space-y-6">
          {figures[activeCategory]?.map((figure, index) => {
            const IconComponent = figure.icon;
            return (
              <div key={index} className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
                {/* Figure Header */}
                <div className="p-6 border-b border-gray-100">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                        <IconComponent className="w-6 h-6 text-white" />
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-900 mb-1">{figure.name}</h3>
                      <p className="text-gray-600 mb-3">{figure.title}</p>
                      <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(figure.status)}`}>
                        ✅ {figure.status}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Pillars */}
                <div className="p-6">
                  <div className="space-y-3">
                    {figure.pillars.map((pillar, pillarIndex) => (
                      <details key={pillarIndex} className="group">
                        <summary className={`flex items-center justify-between p-3 rounded-lg border cursor-pointer hover:bg-gray-50 ${getPillarColor(pillar.color)}`}>
                          <span className="font-medium">{pillarIndex + 1}. {pillar.name}</span>
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-medium">{pillar.status}</span>
                            <ChevronDown className="w-4 h-4 transition-transform group-open:rotate-180" />
                          </div>
                        </summary>
                        <div className="mt-2 p-3 bg-gray-50 rounded-lg">
                          <p className="text-sm text-gray-700">{pillar.evidence}</p>
                        </div>
                      </details>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
          
          {figures[activeCategory]?.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500">No figures available in this category yet.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MMRScansSection;

