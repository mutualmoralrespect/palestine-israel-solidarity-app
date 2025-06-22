import React, { useState, useMemo } from 'react';
import { Users, Building, FileText, Scale, BookOpen } from 'lucide-react';
import CategoryNavigation from './shared/CategoryNavigation';
import ProfileGrid from './shared/ProfileGrid';

const VoicesOfHopeSection = () => {
  const [activeCategory, setActiveCategory] = useState('All');

  const categories = [
    { id: 'Peace Advocates', label: 'Peace Advocates', icon: Users, count: 4 },
    { id: 'Organizations', label: 'Organizations', icon: Building, count: 6 },
    { id: 'Journalists', label: 'Journalists', icon: FileText, count: 2 },
    { id: 'Legal Scholars', label: 'Legal Scholars', icon: Scale, count: 2 },
    { id: 'Historians', label: 'Historians', icon: BookOpen, count: 4 },
    { id: 'Politicians', label: 'Politicians', icon: Users, count: 1 }
  ];

  // Only figures who pass or nearly pass MMR
  const figures = {
    'Peace Advocates': [
      {
        name: 'Maoz Inon & Aziz Abu Sara',
        title: 'Israeli and Palestinian peace duo',
        status: 'Full Pass',
        statusColor: 'green',
        icon: '🕊️',
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
        icon: '✋',
        pillars: [
          { name: 'Reject targeting civilians', status: 'Strong Pass', color: 'green', evidence: 'Moved from armed struggle to nonviolence, condemns violence against all civilians.' },
          { name: 'Accountability for Hamas/Militants', status: 'Strong Pass', color: 'green', evidence: 'Advocates disarmament and nonviolent resistance, opposes militant approaches.' },
          { name: 'Accountability for Israeli Right', status: 'Pass', color: 'green', evidence: 'Works directly with Israelis; holds all parties accountable equally.' },
          { name: 'Use verified sources', status: 'Pass', color: 'green', evidence: 'Public, transparent nonviolence movement with documentation.' },
          { name: 'Humanize both peoples', status: 'Strong Pass', color: 'green', evidence: 'Emphasizes seeing "human behind the uniform" - profound empathy for all.' },
          { name: 'Embrace coexistence', status: 'Strong Pass', color: 'green', evidence: 'Advocates partnership, rejects annihilationist narratives from all sides.' },
          { name: 'Vision for dignity & peace', status: 'Strong Pass', color: 'green', evidence: 'Co-founded binational nonviolent peace group; Nobel-nominated for peace work.' }
        ]
      },
      {
        name: 'Gershon Baskin',
        title: 'Israeli mediator, co-founder IPCRI',
        status: 'Full Pass',
        statusColor: 'green',
        icon: '🌐',
        pillars: [
          { name: 'Reject targeting civilians', status: 'Strong Pass', color: 'green', evidence: 'Facilitated hostage negotiations with Hamas to preserve civilian lives.' },
          { name: 'Accountability for Hamas/Militants', status: 'Strong Pass', color: 'green', evidence: 'Negotiates responsibly but does not excuse Hamas; holds Hamas accountable.' },
          { name: 'Accountability for Israeli Right', status: 'Strong Pass', color: 'green', evidence: 'Critiques Israeli government\'s hardline measures and advocates for peace.' },
          { name: 'Use verified sources', status: 'Strong Pass', color: 'green', evidence: 'Cites diplomatic reports, negotiation records, transparent documentation.' },
          { name: 'Humanize both peoples', status: 'Strong Pass', color: 'green', evidence: 'Brings Israelis and Palestinians together; emphasizes shared humanity.' },
          { name: 'Embrace coexistence', status: 'Strong Pass', color: 'green', evidence: 'Supports two-state solution and mutual legitimacy for both peoples.' },
          { name: 'Vision for dignity & peace', status: 'Strong Pass', color: 'green', evidence: 'Co-founded Alliance for Two States, IPCRI, and multiple peace NGOs.' }
        ]
      },
      {
        name: 'Sally Abed',
        title: 'Palestinian-Israeli city councilor, Standing Together',
        status: 'Full Pass',
        statusColor: 'green',
        icon: '🌱',
        pillars: [
          { name: 'Reject targeting civilians', status: 'Strong Pass', color: 'green', evidence: 'Advocates ceasefire and defending all civilian lives equally.' },
          { name: 'Accountability for Hamas/Militants', status: 'Pass', color: 'green', evidence: 'Promotes nonviolence in Palestinian activism and political engagement.' },
          { name: 'Accountability for Israeli Right', status: 'Strong Pass', color: 'green', evidence: 'Challenges occupation and ultra-nationalist rhetoric through political action.' },
          { name: 'Use verified sources', status: 'Pass', color: 'green', evidence: 'Speaks in public forums, documented media coverage of local politics.' },
          { name: 'Humanize both peoples', status: 'Strong Pass', color: 'green', evidence: 'Emphasizes "radical empathy" between communities and shared struggles.' },
          { name: 'Embrace coexistence', status: 'Strong Pass', color: 'green', evidence: 'Seeks joint narratives and partnership through grassroots organizing.' },
          { name: 'Vision for dignity & peace', status: 'Strong Pass', color: 'green', evidence: 'Works toward grassroots political change and two-state solution through Standing Together.' }
        ]
      }
    ],
    'Organizations': [
      {
        name: 'Combatants for Peace',
        title: 'Ex-combatants (Israeli soldiers & Palestinian fighters)',
        status: 'Full Pass',
        statusColor: 'green',
        icon: '🛡️',
        pillars: [
          { name: 'Reject targeting civilians', status: 'Strong Pass', color: 'green', evidence: 'Founded on principle of nonviolence and civilian protection.' },
          { name: 'Accountability for Hamas/Militants', status: 'Strong Pass', color: 'green', evidence: 'Palestinian members reject militant approaches, advocate nonviolence.' },
          { name: 'Accountability for Israeli Right', status: 'Strong Pass', color: 'green', evidence: 'Israeli members critique military occupation and extremism.' },
          { name: 'Use verified sources', status: 'Pass', color: 'green', evidence: 'Transparent documentation of activities and member testimonies.' },
          { name: 'Humanize both peoples', status: 'Strong Pass', color: 'green', evidence: 'Brings together former enemies to share stories and build empathy.' },
          { name: 'Embrace coexistence', status: 'Strong Pass', color: 'green', evidence: 'Core mission is coexistence and mutual recognition.' },
          { name: 'Vision for dignity & peace', status: 'Strong Pass', color: 'green', evidence: 'Bi-national nonviolent movement working toward peace and justice.' }
        ]
      },
      {
        name: 'Standing Together',
        title: 'Israel\'s largest grassroots Arab-Jewish movement',
        status: 'Full Pass',
        statusColor: 'green',
        icon: '👥',
        pillars: [
          { name: 'Reject targeting civilians', status: 'Strong Pass', color: 'green', evidence: 'Advocates for civilian protection and opposes violence against all civilians.' },
          { name: 'Accountability for Hamas/Militants', status: 'Pass', color: 'green', evidence: 'Opposes militant violence while focusing on systemic change.' },
          { name: 'Accountability for Israeli Right', status: 'Strong Pass', color: 'green', evidence: 'Actively campaigns against occupation and ultra-nationalist policies.' },
          { name: 'Use verified sources', status: 'Pass', color: 'green', evidence: 'Transparent grassroots organizing with documented activities.' },
          { name: 'Humanize both peoples', status: 'Strong Pass', color: 'green', evidence: 'Brings Arabs and Jews together for shared political action.' },
          { name: 'Embrace coexistence', status: 'Strong Pass', color: 'green', evidence: 'Core mission is equality and coexistence within shared society.' },
          { name: 'Vision for dignity & peace', status: 'Strong Pass', color: 'green', evidence: 'Works toward equality, social justice, and end of occupation.' }
        ]
      },
      {
        name: 'Musalaha',
        title: 'Faith-based reconciliation NGO',
        status: 'Full Pass',
        statusColor: 'green',
        icon: '❤️',
        pillars: [
          { name: 'Reject targeting civilians', status: 'Strong Pass', color: 'green', evidence: 'Faith-based commitment to protecting all human life.' },
          { name: 'Accountability for Hamas/Militants', status: 'Pass', color: 'green', evidence: 'Promotes peaceful resolution over militant approaches.' },
          { name: 'Accountability for Israeli Right', status: 'Pass', color: 'green', evidence: 'Challenges extremism through faith-based dialogue.' },
          { name: 'Use verified sources', status: 'Pass', color: 'green', evidence: 'Documented reconciliation programs and testimonies.' },
          { name: 'Humanize both peoples', status: 'Strong Pass', color: 'green', evidence: 'Brings together people of faith for mutual understanding.' },
          { name: 'Embrace coexistence', status: 'Strong Pass', color: 'green', evidence: 'Rooted in shared covenantal values and reconciliation.' },
          { name: 'Vision for dignity & peace', status: 'Strong Pass', color: 'green', evidence: 'Faith-based vision of reconciliation and shared dignity.' }
        ]
      },
      {
        name: 'Women Wage Peace',
        title: 'Jewish Israeli & Palestinian women\'s collaboration',
        status: 'Full Pass',
        statusColor: 'green',
        icon: '👩',
        pillars: [
          { name: 'Reject targeting civilians', status: 'Strong Pass', color: 'green', evidence: 'Women-led advocacy for civilian protection and peace.' },
          { name: 'Accountability for Hamas/Militants', status: 'Pass', color: 'green', evidence: 'Advocates nonviolent approaches to conflict resolution.' },
          { name: 'Accountability for Israeli Right', status: 'Pass', color: 'green', evidence: 'Challenges militaristic approaches and occupation policies.' },
          { name: 'Use verified sources', status: 'Pass', color: 'green', evidence: 'Transparent women\'s movement with documented activities.' },
          { name: 'Humanize both peoples', status: 'Strong Pass', color: 'green', evidence: 'Brings together women across ethnic and religious lines.' },
          { name: 'Embrace coexistence', status: 'Strong Pass', color: 'green', evidence: 'Collaborates across communities for shared peace vision.' },
          { name: 'Vision for dignity & peace', status: 'Strong Pass', color: 'green', evidence: 'Women-led peace movement with international recognition.' }
        ]
      },
      {
        name: 'Coalition of Women for Peace',
        title: 'Feminist Israeli-Palestinian coalition',
        status: 'Full Pass',
        statusColor: 'green',
        icon: '✊',
        pillars: [
          { name: 'Reject targeting civilians', status: 'Strong Pass', color: 'green', evidence: 'Feminist commitment to protecting all civilian lives.' },
          { name: 'Accountability for Hamas/Militants', status: 'Pass', color: 'green', evidence: 'Advocates peaceful resistance over militant approaches.' },
          { name: 'Accountability for Israeli Right', status: 'Strong Pass', color: 'green', evidence: 'Active anti-occupation campaigns and accountability work.' },
          { name: 'Use verified sources', status: 'Pass', color: 'green', evidence: 'Documented feminist peace activism and solidarity work.' },
          { name: 'Humanize both peoples', status: 'Strong Pass', color: 'green', evidence: 'Feminist solidarity across ethnic and national lines.' },
          { name: 'Embrace coexistence', status: 'Strong Pass', color: 'green', evidence: 'Coalition work based on equality and mutual recognition.' },
          { name: 'Vision for dignity & peace', status: 'Strong Pass', color: 'green', evidence: 'Feminist vision of justice, equality, and peace.' }
        ]
      },
      {
        name: 'Community Peacemaker Teams',
        title: 'International volunteers in Palestine',
        status: 'Full Pass',
        statusColor: 'green',
        icon: '🛡️',
        pillars: [
          { name: 'Reject targeting civilians', status: 'Strong Pass', color: 'green', evidence: 'Dedicated to nonviolent protection of civilians.' },
          { name: 'Accountability for Hamas/Militants', status: 'Pass', color: 'green', evidence: 'Promotes nonviolent resistance over militant approaches.' },
          { name: 'Accountability for Israeli Right', status: 'Strong Pass', color: 'green', evidence: 'Documents and challenges occupation and settler violence.' },
          { name: 'Use verified sources', status: 'Strong Pass', color: 'green', evidence: 'Rigorous documentation and witness testimony.' },
          { name: 'Humanize both peoples', status: 'Pass', color: 'green', evidence: 'Works to humanize Palestinians while maintaining nonviolence.' },
          { name: 'Embrace coexistence', status: 'Pass', color: 'green', evidence: 'Supports peaceful coexistence through protective presence.' },
          { name: 'Vision for dignity & peace', status: 'Strong Pass', color: 'green', evidence: 'International solidarity for nonviolent peace and justice.' }
        ]
      }
    ],
    'Politicians': [
      {
        name: 'Rep. Ritchie Torres',
        title: 'U.S. Representative (D-NY)',
        status: 'Strong Pass',
        statusColor: 'green',
        icon: '🇺🇸',
        pillars: [
          { name: 'Reject targeting civilians', status: 'Strong Pass', color: 'green', evidence: 'Torres consistently condemns Hamas\'s October 7 terror attacks as "crimes against humanity" and emphasizes the centrality of protecting civilians. He supports Israel\'s right to self-defense but stresses that Palestinian civilian life is no less sacred than Israeli life.' },
          { name: 'Accountability for Hamas/Militants', status: 'Strong Pass', color: 'green', evidence: 'Clear and repeated moral condemnation of Hamas, calling them a genocidal terrorist organization. Criticizes Palestinian Authority\'s glorification of violence and failure to embrace peaceful state-building. Explicit that Palestinian leadership bears responsibility for rejectionist stances.' },
          { name: 'Accountability for Israeli Right', status: 'Strong Pass', color: 'green', evidence: 'One of the few vocal American politicians calling out Israeli ultranationalist figures (e.g., Ben-Gvir, Smotrich). Warns against annexation, creeping authoritarianism, and erosion of democratic norms in Netanyahu\'s coalition. Calls for holding Israeli extremists accountable.' },
          { name: 'Use verified sources', status: 'Strong Pass', color: 'green', evidence: 'Relies on verified reporting, direct sourcing from human rights organizations (e.g., Amnesty), and clear fact-based Congressional speeches. Avoids conspiracy or inflammatory sourcing — presents grounded, empirically-supported positions.' },
          { name: 'Humanize both peoples', status: 'Pass', color: 'green', evidence: 'Strong on recognizing Israeli civilian trauma post–October 7 and antisemitism globally; also speaks on the need for Palestinian dignity and human rights. Explicitly states that "both Israeli and Palestinian lives matter equally" — demonstrates empathy across both populations.' },
          { name: 'Embrace coexistence', status: 'Pass', color: 'green', evidence: 'Advocates a realistic two-state solution and a future of mutual security and dignity. Frames peace as requiring compromise and humanization on all sides.' },
          { name: 'Vision for dignity & peace', status: 'Pass', color: 'green', evidence: 'Advocates a realistic two-state solution and a future of mutual security and dignity. Frames peace as requiring compromise and humanization on all sides. Publicly supports Palestinian statehood while condemning Hamas. Offers an emotionally resonant dignity-based vision.' }
        ]
      }
    ],
    'Journalists': [
      {
        name: 'Christiane Amanpour',
        title: 'CNN Chief International Correspondent',
        status: 'Pass with Nuance',
        statusColor: 'green',
        icon: '📺',
        pillars: [
          { name: 'Reject targeting civilians', status: 'Strong Pass', color: 'green', evidence: 'Consistently reports on civilian casualties with empathy for all victims.' },
          { name: 'Accountability for Hamas/Militants', status: 'Pass', color: 'green', evidence: 'Reports on Hamas attacks and terrorism while maintaining journalistic objectivity.' },
          { name: 'Accountability for Israeli Right', status: 'Pass', color: 'green', evidence: 'Reports critically on Israeli military actions and settlement policies.' },
          { name: 'Use verified sources', status: 'Strong Pass', color: 'green', evidence: 'Maintains high journalistic standards with verified reporting.' },
          { name: 'Humanize both peoples', status: 'Strong Pass', color: 'green', evidence: 'Consistently humanizes both Israeli and Palestinian experiences.' },
          { name: 'Embrace coexistence', status: 'Pass', color: 'green', evidence: 'Supports peaceful resolution and mutual recognition.' },
          { name: 'Vision for dignity & peace', status: 'Pass', color: 'green', evidence: 'Advocates for diplomatic solutions and human rights for all.' }
        ]
      },
      {
        name: 'Amira Hass',
        title: 'Haaretz correspondent in Palestinian territories',
        status: 'Pass with Nuance',
        statusColor: 'green',
        icon: '✍️',
        pillars: [
          { name: 'Reject targeting civilians', status: 'Pass', color: 'green', evidence: 'Reports on civilian suffering with deep empathy and moral clarity.' },
          { name: 'Accountability for Hamas/Militants', status: 'Partial', color: 'yellow', evidence: 'Critical of militant tactics but focuses primarily on structural issues.' },
          { name: 'Accountability for Israeli Right', status: 'Strong Pass', color: 'green', evidence: 'Extensively documents and critiques occupation policies and settler violence.' },
          { name: 'Use verified sources', status: 'Strong Pass', color: 'green', evidence: 'Rigorous on-ground reporting with verified sources and documentation.' },
          { name: 'Humanize both peoples', status: 'Pass', color: 'green', evidence: 'Deeply humanizes Palestinian experience while maintaining empathy for Israelis.' },
          { name: 'Embrace coexistence', status: 'Pass', color: 'green', evidence: 'Supports peaceful coexistence and mutual recognition.' },
          { name: 'Vision for dignity & peace', status: 'Pass', color: 'green', evidence: 'Advocates for justice and dignity for all people in the region.' }
        ]
      }
    ],
    'Legal Scholars': [
      {
        name: 'Michael Lynk',
        title: 'Former UN Special Rapporteur on Palestine',
        status: 'Pass with Nuance',
        statusColor: 'green',
        icon: '⚖️',
        pillars: [
          { name: 'Reject targeting civilians', status: 'Strong Pass', color: 'green', evidence: 'Consistently condemns attacks on civilians and advocates for civilian protection.' },
          { name: 'Accountability for Hamas/Militants', status: 'Pass', color: 'green', evidence: 'Acknowledges Hamas violations while focusing on legal accountability.' },
          { name: 'Accountability for Israeli Right', status: 'Strong Pass', color: 'green', evidence: 'Extensively documents Israeli violations of international law.' },
          { name: 'Use verified sources', status: 'Strong Pass', color: 'green', evidence: 'Uses rigorous legal analysis and verified documentation.' },
          { name: 'Humanize both peoples', status: 'Pass', color: 'green', evidence: 'Focuses on human rights and dignity for all people.' },
          { name: 'Embrace coexistence', status: 'Pass', color: 'green', evidence: 'Supports legal frameworks for peaceful coexistence.' },
          { name: 'Vision for dignity & peace', status: 'Pass', color: 'green', evidence: 'Advocates for justice-based peace and human rights for all.' }
        ]
      },
      {
        name: 'Eyal Benvenisti',
        title: 'International law professor, Cambridge University',
        status: 'Pass',
        statusColor: 'green',
        icon: '🎓',
        pillars: [
          { name: 'Reject targeting civilians', status: 'Strong Pass', color: 'green', evidence: 'Strong advocate for civilian protection under international law.' },
          { name: 'Accountability for Hamas/Militants', status: 'Pass', color: 'green', evidence: 'Applies international law consistently to all parties.' },
          { name: 'Accountability for Israeli Right', status: 'Pass', color: 'green', evidence: 'Critiques Israeli policies that violate international law.' },
          { name: 'Use verified sources', status: 'Strong Pass', color: 'green', evidence: 'Rigorous academic scholarship with verified legal analysis.' },
          { name: 'Humanize both peoples', status: 'Pass', color: 'green', evidence: 'Focuses on human rights and dignity under law.' },
          { name: 'Embrace coexistence', status: 'Pass', color: 'green', evidence: 'Supports legal frameworks for peaceful coexistence.' },
          { name: 'Vision for dignity & peace', status: 'Pass', color: 'green', evidence: 'Advocates for rule of law and peaceful resolution.' }
        ]
      }
    ],
    'Historians': [
      {
        name: 'Avi Shlaim',
        title: 'Israeli historian, Oxford University',
        status: 'Full Pass',
        statusColor: 'green',
        icon: '📚',
        pillars: [
          { name: 'Reject targeting civilians', status: 'Strong Pass', color: 'green', evidence: 'Explicitly condemns violence by both sides.' },
          { name: 'Accountability for Hamas/Militants', status: 'Pass', color: 'green', evidence: 'Recognizes terror as obstacle; critiques Hamas rejectionism.' },
          { name: 'Accountability for Israeli Right', status: 'Strong Pass', color: 'green', evidence: 'Leading critic of Zionist expansionist practices.' },
          { name: 'Use verified sources', status: 'Strong Pass', color: 'green', evidence: 'Archives-based, multiple works acclaimed.' },
          { name: 'Humanize both peoples', status: 'Strong Pass', color: 'green', evidence: 'Consistently acknowledges both Israeli and Palestinian narratives.' },
          { name: 'Embrace coexistence', status: 'Strong Pass', color: 'green', evidence: 'Advocates recognition of dual national rights.' },
          { name: 'Vision for dignity & peace', status: 'Strong Pass', color: 'green', evidence: 'Supports two-state vision and peaceful coexistence.' }
        ]
      },
      {
        name: 'Tom Segev',
        title: 'Israeli historian and journalist',
        status: 'Full Pass',
        statusColor: 'green',
        icon: '📖',
        pillars: [
          { name: 'Reject targeting civilians', status: 'Strong Pass', color: 'green', evidence: 'Emphasizes tragedy of all civilian deaths.' },
          { name: 'Accountability for Hamas/Militants', status: 'Pass', color: 'green', evidence: 'Critiques Hamas\'s role in perpetuating conflict.' },
          { name: 'Accountability for Israeli Right', status: 'Strong Pass', color: 'green', evidence: 'Strong critique of nationalist myths.' },
          { name: 'Use verified sources', status: 'Strong Pass', color: 'green', evidence: 'Rigorous historian, primary documents based.' },
          { name: 'Humanize both peoples', status: 'Strong Pass', color: 'green', evidence: 'Deeply humanizes both Jewish and Palestinian experience.' },
          { name: 'Embrace coexistence', status: 'Strong Pass', color: 'green', evidence: 'Advocates dual recognition.' },
          { name: 'Vision for dignity & peace', status: 'Strong Pass', color: 'green', evidence: 'Supports diplomatic resolution.' }
        ]
      },
      {
        name: 'Benny Morris',
        title: 'Israeli historian, Ben-Gurion University',
        status: 'Pass',
        statusColor: 'green',
        icon: '🏛️',
        pillars: [
          { name: 'Reject targeting civilians', status: 'Pass', color: 'green', evidence: 'Condemns violence; acknowledges Palestinian victimhood.' },
          { name: 'Accountability for Hamas/Militants', status: 'Pass', color: 'green', evidence: 'Critical of Hamas terrorism.' },
          { name: 'Accountability for Israeli Right', status: 'Partial', color: 'yellow', evidence: 'Historically critical; more defensive in recent interviews.' },
          { name: 'Use verified sources', status: 'Strong Pass', color: 'green', evidence: 'Leading archival scholar on 1948 history.' },
          { name: 'Humanize both peoples', status: 'Strong Pass', color: 'green', evidence: 'Acknowledges both Jewish and Palestinian traumas.' },
          { name: 'Embrace coexistence', status: 'Strong Pass', color: 'green', evidence: 'Supports Jewish and Palestinian rights.' },
          { name: 'Vision for dignity & peace', status: 'Pass', color: 'green', evidence: 'Still supports two-state outcome, though more pessimistic tone.' }
        ]
      },
      {
        name: 'Norman Finkelstein',
        title: 'Political scientist and author',
        status: 'Pass with Nuance',
        statusColor: 'yellow',
        icon: '📝',
        pillars: [
          { name: 'Reject targeting civilians', status: 'Pass', color: 'green', evidence: 'Condemns targeting of civilians by all parties.' },
          { name: 'Accountability for Hamas/Militants', status: 'Partial', color: 'yellow', evidence: 'Critical but contextualizes within broader conflict dynamics.' },
          { name: 'Accountability for Israeli Right', status: 'Strong Pass', color: 'green', evidence: 'Extensive critique of Israeli policies and actions.' },
          { name: 'Use verified sources', status: 'Strong Pass', color: 'green', evidence: 'Rigorous documentation and fact-checking.' },
          { name: 'Humanize both peoples', status: 'Partial', color: 'yellow', evidence: 'Strong on Palestinian suffering, less on Israeli civilian experience.' },
          { name: 'Embrace coexistence', status: 'Pass', color: 'green', evidence: 'Supports two-state solution and mutual recognition.' },
          { name: 'Vision for dignity & peace', status: 'Pass', color: 'green', evidence: 'Advocates for justice-based peace and international law.' }
        ]
      }
    ]
  };

  const getStatusBadge = (status, color) => {
    const colorClasses = {
      green: 'bg-green-100 text-green-800',
      yellow: 'bg-yellow-100 text-yellow-800',
      red: 'bg-red-100 text-red-800'
    };

    return (
      <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold ${colorClasses[color]}`}>
        {status === 'Full Pass' && '✅ Full Pass — All 7 Pillars'}
        {status === 'Strong Pass' && '✅ Strong Pass'}
        {status === 'Pass' && '✅ Pass'}
        {status === 'Pass with Nuance' && '✅ Pass with Nuance'}
      </div>
    );
  };

  const getPillarColor = (status) => {
    if (status.includes('Strong Pass') || status.includes('Pass')) return 'green';
    if (status.includes('Partial') || status.includes('Mixed') || status.includes('Thin') || status.includes('N/A')) return 'yellow';
    if (status.includes('Fail')) return 'red';
    return 'green';
  };

  const getPillarBg = (color) => {
    const bgClasses = {
      green: 'bg-green-50 border-green-200',
      yellow: 'bg-yellow-50 border-yellow-200',
      red: 'bg-red-50 border-red-200'
    };
    return bgClasses[color];
  };

  return (
    <div className="max-w-6xl mx-auto mb-16">
      <div className="text-center mb-12">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-green-500 to-blue-500 rounded-full mb-6">
          <span className="text-2xl">💜</span>
        </div>
        <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          Voices of Hope
        </h3>
        <p className="text-lg text-gray-600 max-w-4xl mx-auto">
          These voices prove that Palestinians and Israelis can work together with mutual moral respect, dignity, and a shared vision for peace. They demonstrate that beyond the cycle of violence and polarization, there exists a path toward freedom, justice, and coexistence for all.
        </p>
      </div>

      {/* Category Navigation */}
      <div className="flex flex-wrap justify-center gap-2 mb-8">
        {categories.map((category) => {
          const Icon = category.icon;
          return (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                activeCategory === category.id
                  ? 'bg-purple-600 text-white shadow-lg'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{category.label}</span>
              <span className="bg-white/20 px-2 py-0.5 rounded-full text-xs">
                {category.count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Figures Display */}
      <div className="space-y-6">
        {figures[activeCategory]?.map((figure, index) => (
          <div key={index} className="bg-gradient-to-r from-green-50 to-blue-50 rounded-3xl shadow-xl border border-green-100 overflow-hidden">
            <div className="p-6 border-b border-green-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="text-3xl">{figure.icon}</div>
                  <div>
                    <h4 className="text-xl font-bold text-gray-900">{figure.name}</h4>
                    <p className="text-gray-600">{figure.title}</p>
                  </div>
                </div>
                {getStatusBadge(figure.status, figure.statusColor)}
              </div>
            </div>

            <div className="p-6">
              <div className="space-y-3">
                {figure.pillars.map((pillar, pillarIndex) => (
                  <details key={pillarIndex} className="group">
                    <summary className={`flex items-center justify-between p-3 rounded-lg cursor-pointer transition-colors ${getPillarBg(pillar.color)} border`}>
                      <span className="text-sm font-medium">{pillarIndex + 1}. {pillar.name}</span>
                      <div className="flex items-center space-x-2">
                        <span className={`font-bold text-sm ${
                          pillar.color === 'green' ? 'text-green-600' : 
                          pillar.color === 'yellow' ? 'text-yellow-600' : 'text-red-600'
                        }`}>
                          {pillar.status.includes('Strong Pass') && '✅ Strong Pass'}
                          {pillar.status === 'Pass' && '✅ Pass'}
                          {pillar.status.includes('Partial') && '⚠️ Partial'}
                          {pillar.status.includes('Mixed') && '⚠️ Mixed'}
                          {pillar.status.includes('Thin') && '⚠️ Thin'}
                          {pillar.status.includes('N/A') && '⚠️ N/A'}
                          {pillar.status.includes('Fail') && '❌ Fails'}
                        </span>
                        <ChevronDown className="w-4 h-4 text-gray-400 group-open:rotate-180 transition-transform" />
                      </div>
                    </summary>
                    <div className="mt-2 p-3 bg-green-25 rounded-lg text-sm text-gray-700">
                      {pillar.evidence}
                    </div>
                  </details>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Hope Message */}
      <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-green-600 rounded-3xl p-8 md:p-12 text-white text-center mt-12">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-full mb-6">
          <span className="text-3xl">💫</span>
        </div>
        <h4 className="text-2xl md:text-3xl font-bold mb-4">
          Another Path is Possible
        </h4>
        <p className="text-lg md:text-xl leading-relaxed max-w-4xl mx-auto">
          These voices prove that Palestinians and Israelis can work together with mutual moral respect, dignity, and a shared vision for peace. They demonstrate that beyond the cycle of violence and polarization, there exists a path toward freedom, justice, and coexistence for all.
        </p>
      </div>
    </div>
  );
};

export default VoicesOfHopeSection;

