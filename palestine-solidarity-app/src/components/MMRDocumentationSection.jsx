import React from 'react';
import { Book, Target, Users, Shield, Search, Heart, Eye, CheckCircle } from 'lucide-react';

const MMRDocumentationSection = () => {
  return (
    <div id="mmr-documentation" className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 py-20">
      <div className="container mx-auto px-6">
        
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center mb-6">
            <Book className="w-12 h-12 text-blue-600 mr-4" />
            <h2 className="text-4xl md:text-5xl font-black text-gray-900">
              Understanding MMR
            </h2>
          </div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Mutual Moral Respect is a framework for evaluating civic integrity and fostering dignity-based discourse in complex conflict fields.
          </p>
        </div>

        {/* Main Definition Card */}
        <div className="max-w-5xl mx-auto mb-16">
          <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 border border-gray-100">
            <div className="text-center mb-8">
              <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                What is MMR?
              </h3>
              <div className="w-24 h-1 bg-gradient-to-r from-green-500 to-blue-500 mx-auto rounded-full"></div>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <p className="text-lg text-gray-700 leading-relaxed mb-6">
                  <strong>Mutual Moral Respect (MMR)</strong> is a lens and evaluation framework designed to foster dignity-based civic discourse in the most complex and polarized conflict fields.
                </p>
                <p className="text-lg text-gray-700 leading-relaxed">
                  MMR is designed to <strong>re-center civic moral clarity</strong> and help rewire the public reward systems of global discourse — from polarization toward peace-building.
                </p>
              </div>
              
              <div className="bg-gradient-to-br from-blue-50 to-green-50 rounded-2xl p-6">
                <h4 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                  <Target className="w-6 h-6 text-blue-600 mr-2" />
                  MMR serves to:
                </h4>
                <ul className="space-y-3">
                  <li className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">Elevate dignity and humanization across all groups</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">Foster verified, truthful civic dialogue</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">Shift discourse away from eliminationism and polarization</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">Identify voices that exemplify mutual moral respect</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* MMR Pillars */}
        <div className="max-w-6xl mx-auto mb-16">
          <div className="text-center mb-12">
            <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              The Seven MMR Pillars
            </h3>
            <p className="text-lg text-gray-600">
              Core principles that guide evaluation and foster civic integrity
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: Shield,
                title: "Reject targeting civilians",
                description: "Uphold dignity and respect for human life on all sides",
                color: "from-red-500 to-pink-500"
              },
              {
                icon: Users,
                title: "Accountability for Hamas/Militant Rejectionists",
                description: "Hold militant rejectionist actors accountable for violence",
                color: "from-blue-500 to-cyan-500"
              },
              {
                icon: Users,
                title: "Accountability for Israeli Right/Ultra-Nationalists",
                description: "Hold Israeli extremist and ultra-nationalist actors accountable",
                color: "from-purple-500 to-indigo-500"
              },
              {
                icon: Search,
                title: "Use verified, truthful sources",
                description: "Use honest civic framing and verified information",
                color: "from-green-500 to-emerald-500"
              },
              {
                icon: Heart,
                title: "Humanize both peoples",
                description: "Recognize the humanity and dignity of all groups",
                color: "from-orange-500 to-red-500"
              },
              {
                icon: Eye,
                title: "Reject eliminationism",
                description: "Oppose eliminationist ideologies and rhetoric from all sides",
                color: "from-pink-500 to-purple-500"
              },
              {
                icon: Target,
                title: "Vision for dignity & peace",
                description: "Work toward humanization and peace-building",
                color: "from-teal-500 to-blue-500"
              }
            ].map((pillar, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 border border-gray-100 group hover:scale-105">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${pillar.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <pillar.icon className="w-6 h-6 text-white" />
                </div>
                <h4 className="text-lg font-bold text-gray-900 mb-2">
                  {pillar.title}
                </h4>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {pillar.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* MMR Lens Questions */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-r from-purple-600 via-blue-600 to-green-600 rounded-3xl p-8 md:p-12 text-white">
            <div className="text-center mb-8">
              <h3 className="text-3xl md:text-4xl font-bold mb-4">
                Key MMR Questions
              </h3>
              <p className="text-xl text-white/90">
                The MMR Lens provides a structured way to evaluate public actors and civic voices
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
                  <h4 className="text-xl font-bold mb-3">👉 Dignity & Respect</h4>
                  <p className="text-white/90">Are actors upholding dignity and respect for human life on all sides?</p>
                </div>
                
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
                  <h4 className="text-xl font-bold mb-3">👉 Truthfulness</h4>
                  <p className="text-white/90">Are they using verified sources and honest civic framing?</p>
                </div>
              </div>
              
              <div className="space-y-6">
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
                  <h4 className="text-xl font-bold mb-3">👉 Accountability</h4>
                  <p className="text-white/90">Are they accountable both to their own community and across divides?</p>
                </div>
                
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
                  <h4 className="text-xl font-bold mb-3">👉 Peace-Building</h4>
                  <p className="text-white/90">Are they helping shift public discourse toward humanization and peace?</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Version Info */}
        <div className="text-center mt-12 mb-16">
          <p className="text-gray-500">
            MMR Core Model Library • Version 1.0 — June 2025 • Licensed CC-BY-NC
          </p>
        </div>

        {/* MMR Analysis Examples */}
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              MMR Analysis Examples
            </h3>
            <p className="text-lg text-gray-600">
              See how the MMR framework evaluates real-world political figures
            </p>
          </div>

          <div className="grid lg:grid-cols-1 gap-8">
            {/* Netanyahu Analysis */}
            <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
              <div className="text-center mb-6">
                <h4 className="text-2xl font-bold text-gray-900 mb-2">Benjamin Netanyahu</h4>
                <p className="text-gray-600">Israeli Prime Minister (2009–present)</p>
                <div className="mt-4 inline-flex items-center px-4 py-2 bg-red-100 text-red-800 rounded-full text-sm font-semibold">
                  🏁 Overall MMR Alignment: ❌ Failing
                </div>
              </div>

              <div className="space-y-3 mb-6">
                <details className="group">
                  <summary className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg cursor-pointer hover:bg-yellow-100 transition-colors">
                    <span className="text-sm font-medium">1. Reject targeting civilians</span>
                    <div className="flex items-center space-x-2">
                      <span className="text-yellow-600 font-bold">⚠️ Partial</span>
                      <span className="text-gray-400 group-open:rotate-180 transition-transform">▼</span>
                    </div>
                  </summary>
                  <div className="mt-2 p-3 bg-yellow-25 rounded-lg text-sm text-gray-700">
                    He rhetorically affirms that Israel "does everything to minimize civilian casualties", but his later statements praising military actions described as "tragic mishaps" and the use of scorched-earth metaphors ("children of darkness") weaken the clarity.
                  </div>
                </details>

                <details className="group">
                  <summary className="flex items-center justify-between p-3 bg-green-50 rounded-lg cursor-pointer hover:bg-green-100 transition-colors">
                    <span className="text-sm font-medium">2. Accountability for Hamas/Militant Rejectionists</span>
                    <div className="flex items-center space-x-2">
                      <span className="text-green-600 font-bold">✅ Strong Pass</span>
                      <span className="text-gray-400 group-open:rotate-180 transition-transform">▼</span>
                    </div>
                  </summary>
                  <div className="mt-2 p-3 bg-green-25 rounded-lg text-sm text-gray-700">
                    Repeatedly condemns Hamas's October 7 attack, labels them equivalent to ISIS, and centers his political narrative around defeating them.
                  </div>
                </details>

                <details className="group">
                  <summary className="flex items-center justify-between p-3 bg-red-50 rounded-lg cursor-pointer hover:bg-red-100 transition-colors">
                    <span className="text-sm font-medium">3. Accountability for Israeli Right/Ultra-Nationalists</span>
                    <div className="flex items-center space-x-2">
                      <span className="text-red-600 font-bold">❌ Fail</span>
                      <span className="text-gray-400 group-open:rotate-180 transition-transform">▼</span>
                    </div>
                  </summary>
                  <div className="mt-2 p-3 bg-red-25 rounded-lg text-sm text-gray-700">
                    Enables extremists in coalitions, tolerates anti-Palestinian discourse ("voluntary migration"), and does not publicly condemn Kahanist or settler extremism.
                  </div>
                </details>

                <details className="group">
                  <summary className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg cursor-pointer hover:bg-yellow-100 transition-colors">
                    <span className="text-sm font-medium">4. Use verified, truthful sources</span>
                    <div className="flex items-center space-x-2">
                      <span className="text-yellow-600 font-bold">⚠️ Mixed</span>
                      <span className="text-gray-400 group-open:rotate-180 transition-transform">▼</span>
                    </div>
                  </summary>
                  <div className="mt-2 p-3 bg-yellow-25 rounded-lg text-sm text-gray-700">
                    Often speaks factually (e.g. ICRC, Israeli tactics), but sometimes selectively framed or hyperbolic.
                  </div>
                </details>

                <details className="group">
                  <summary className="flex items-center justify-between p-3 bg-red-50 rounded-lg cursor-pointer hover:bg-red-100 transition-colors">
                    <span className="text-sm font-medium">5. Humanize both peoples</span>
                    <div className="flex items-center space-x-2">
                      <span className="text-red-600 font-bold">❌ Fail</span>
                      <span className="text-gray-400 group-open:rotate-180 transition-transform">▼</span>
                    </div>
                  </summary>
                  <div className="mt-2 p-3 bg-red-25 rounded-lg text-sm text-gray-700">
                    Frames Palestinians collectively as threats or tools of Hamas; almost no empathetic tone towards Palestinian civilians.
                  </div>
                </details>

                <details className="group">
                  <summary className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg cursor-pointer hover:bg-yellow-100 transition-colors">
                    <span className="text-sm font-medium">6. Reject eliminationism</span>
                    <div className="flex items-center space-x-2">
                      <span className="text-yellow-600 font-bold">⚠️ Partial</span>
                      <span className="text-gray-400 group-open:rotate-180 transition-transform">▼</span>
                    </div>
                  </summary>
                  <div className="mt-2 p-3 bg-yellow-25 rounded-lg text-sm text-gray-700">
                    Opposes Hamas eliminationism but tolerates Israeli domestic extremists and conditional on "voluntary migration," undermining the standard.
                  </div>
                </details>

                <details className="group">
                  <summary className="flex items-center justify-between p-3 bg-red-50 rounded-lg cursor-pointer hover:bg-red-100 transition-colors">
                    <span className="text-sm font-medium">7. Vision for dignity & peace</span>
                    <div className="flex items-center space-x-2">
                      <span className="text-red-600 font-bold">❌ Fail</span>
                      <span className="text-gray-400 group-open:rotate-180 transition-transform">▼</span>
                    </div>
                  </summary>
                  <div className="mt-2 p-3 bg-red-25 rounded-lg text-sm text-gray-700">
                    Lacks any public framework for Palestinian dignity or state legitimacy; security-centered, no genuine peace roadmap.
                  </div>
                </details>
              </div>

              <div className="border-t pt-4">
                <p className="text-sm text-gray-600">
                  <strong>Reflection:</strong> Netanyahu consistently rejects Hamas terror but fails to hold Israeli extremists accountable, humanize Palestinians, or articulate a dignified peace model—placing him short of MMR standards.
                </p>
              </div>
            </div>

            {/* Sinwar Analysis */}
            <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
              <div className="text-center mb-6">
                <h4 className="text-2xl font-bold text-gray-900 mb-2">Yahya Sinwar</h4>
                <p className="text-gray-600">Hamas Leader & Architect of October 7th (1962–2024)</p>
                <div className="mt-4 inline-flex items-center px-4 py-2 bg-red-100 text-red-800 rounded-full text-sm font-semibold">
                  🏁 Overall MMR Alignment: ❌ Failing (on all pillars)
                </div>
              </div>

              <div className="space-y-3 mb-6">
                <details className="group">
                  <summary className="flex items-center justify-between p-3 bg-red-50 rounded-lg cursor-pointer hover:bg-red-100 transition-colors">
                    <span className="text-sm font-medium">1. Reject targeting civilians</span>
                    <div className="flex items-center space-x-2">
                      <span className="text-red-600 font-bold">❌ Fails</span>
                      <span className="text-gray-400 group-open:rotate-180 transition-transform">▼</span>
                    </div>
                  </summary>
                  <div className="mt-2 p-3 bg-red-25 rounded-lg text-sm text-gray-700">
                    As Hamas's architect of Oct 7, he explicitly endorsed military violence against civilians. He also justified civilian casualties as "necessary sacrifices".
                  </div>
                </details>

                <details className="group">
                  <summary className="flex items-center justify-between p-3 bg-red-50 rounded-lg cursor-pointer hover:bg-red-100 transition-colors">
                    <span className="text-sm font-medium">2. Accountability for Hamas/Militant Rejectionists</span>
                    <div className="flex items-center space-x-2">
                      <span className="text-red-600 font-bold">❌ Fails</span>
                      <span className="text-gray-400 group-open:rotate-180 transition-transform">▼</span>
                    </div>
                  </summary>
                  <div className="mt-2 p-3 bg-red-25 rounded-lg text-sm text-gray-700">
                    As leader of Hamas, he defends and continues ordering violent campaigns against Israel.
                  </div>
                </details>

                <details className="group">
                  <summary className="flex items-center justify-between p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors">
                    <span className="text-sm font-medium">3. Accountability for Israeli Right/Ultra-Nationalists</span>
                    <div className="flex items-center space-x-2">
                      <span className="text-gray-600 font-bold">⚠️ N/A</span>
                      <span className="text-gray-400 group-open:rotate-180 transition-transform">▼</span>
                    </div>
                  </summary>
                  <div className="mt-2 p-3 bg-gray-25 rounded-lg text-sm text-gray-700">
                    He has not publicly criticized Israeli extremists, only American/European pressure.
                  </div>
                </details>

                <details className="group">
                  <summary className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg cursor-pointer hover:bg-yellow-100 transition-colors">
                    <span className="text-sm font-medium">4. Use verified, truthful sources</span>
                    <div className="flex items-center space-x-2">
                      <span className="text-yellow-600 font-bold">⚠️ Mixed</span>
                      <span className="text-gray-400 group-open:rotate-180 transition-transform">▼</span>
                    </div>
                  </summary>
                  <div className="mt-2 p-3 bg-yellow-25 rounded-lg text-sm text-gray-700">
                    Known for strategic claims (e.g. fluency, tunnel networks), but narrative is inherently ideological.
                  </div>
                </details>

                <details className="group">
                  <summary className="flex items-center justify-between p-3 bg-red-50 rounded-lg cursor-pointer hover:bg-red-100 transition-colors">
                    <span className="text-sm font-medium">5. Humanize both peoples</span>
                    <div className="flex items-center space-x-2">
                      <span className="text-red-600 font-bold">❌ Fails</span>
                      <span className="text-gray-400 group-open:rotate-180 transition-transform">▼</span>
                    </div>
                  </summary>
                  <div className="mt-2 p-3 bg-red-25 rounded-lg text-sm text-gray-700">
                    Dehumanizes Israelis; never expresses empathy for civilians on the other side.
                  </div>
                </details>

                <details className="group">
                  <summary className="flex items-center justify-between p-3 bg-red-50 rounded-lg cursor-pointer hover:bg-red-100 transition-colors">
                    <span className="text-sm font-medium">6. Reject eliminationism</span>
                    <div className="flex items-center space-x-2">
                      <span className="text-red-600 font-bold">❌ Fails</span>
                      <span className="text-gray-400 group-open:rotate-180 transition-transform">▼</span>
                    </div>
                  </summary>
                  <div className="mt-2 p-3 bg-red-25 rounded-lg text-sm text-gray-700">
                    Publicly committed to the eradication of Israel, sees "armed struggle" as the pathway to liberation.
                  </div>
                </details>

                <details className="group">
                  <summary className="flex items-center justify-between p-3 bg-red-50 rounded-lg cursor-pointer hover:bg-red-100 transition-colors">
                    <span className="text-sm font-medium">7. Vision for dignity & peace</span>
                    <div className="flex items-center space-x-2">
                      <span className="text-red-600 font-bold">❌ Fails</span>
                      <span className="text-gray-400 group-open:rotate-180 transition-transform">▼</span>
                    </div>
                  </summary>
                  <div className="mt-2 p-3 bg-red-25 rounded-lg text-sm text-gray-700">
                    Offers no constructive roadmap—only continued militarization, refusal to negotiate, and unwillingness to accept Israel's existence.
                  </div>
                </details>
              </div>

              <div className="border-t pt-4">
                <p className="text-sm text-gray-600">
                  <strong>Reflection:</strong> Sinwar epitomizes violent rejectionist leadership. His ideology, actions, and public statements consistently violate MMR standards. No moral clarity, no empathy, no dignity-driven vision—only eliminationist violence.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-12 text-center">
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8 border border-blue-100">
              <h4 className="text-xl font-bold text-gray-900 mb-4">Understanding MMR Assessments</h4>
              <p className="text-lg text-gray-600 max-w-4xl mx-auto">
                These examples demonstrate how the MMR framework provides nuanced, evidence-based evaluations across all seven pillars. The framework reveals both strengths and critical failures in political leadership, helping identify voices that genuinely advance mutual moral respect versus those that perpetuate cycles of polarization and violence.
              </p>
            </div>
          </div>
        </div>

        {/* Voices of Hope Section */}
        <div className="max-w-6xl mx-auto mb-16">
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-green-500 to-blue-500 rounded-full mb-6">
              <span className="text-2xl">🕊️</span>
            </div>
            <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Voices of Hope
            </h3>
            <p className="text-lg text-gray-600 max-w-4xl mx-auto">
              There are inspiring voices who speak for and advocate for a better path towards freedom, dignity and mutual respect. These Palestinian and Israeli leaders demonstrate that another way is possible.
            </p>
          </div>

          <div className="grid lg:grid-cols-1 gap-8">
            {/* Maoz Inon & Aziz Abu Sara */}
            <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-3xl shadow-xl p-8 border border-green-100">
              <div className="text-center mb-6">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-green-500 to-blue-500 rounded-full mb-4">
                  <span className="text-white text-xl">🕊️</span>
                </div>
                <h4 className="text-2xl font-bold text-gray-900 mb-2">Maoz Inon & Aziz Abu Sara</h4>
                <p className="text-gray-600">Israeli and Palestinian peace duo</p>
                <div className="mt-4 inline-flex items-center px-4 py-2 bg-green-100 text-green-800 rounded-full text-sm font-semibold">
                  🏁 Overall MMR Alignment: ✅ Full Pass — model MMR duo
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4 mb-6">
                <div className="space-y-2">
                  <div className="flex items-center justify-between p-2 bg-green-100 rounded-lg">
                    <span className="text-sm font-medium">1. Reject targeting civilians</span>
                    <span className="text-green-600 font-bold text-sm">✅ Strong Pass</span>
                  </div>
                  <div className="flex items-center justify-between p-2 bg-green-100 rounded-lg">
                    <span className="text-sm font-medium">2. Accountability for Hamas/Militants</span>
                    <span className="text-green-600 font-bold text-sm">✅ Strong Pass</span>
                  </div>
                  <div className="flex items-center justify-between p-2 bg-green-100 rounded-lg">
                    <span className="text-sm font-medium">3. Accountability for Israeli Right</span>
                    <span className="text-green-600 font-bold text-sm">✅ Pass</span>
                  </div>
                  <div className="flex items-center justify-between p-2 bg-green-100 rounded-lg">
                    <span className="text-sm font-medium">4. Use verified sources</span>
                    <span className="text-green-600 font-bold text-sm">✅ Pass</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between p-2 bg-green-100 rounded-lg">
                    <span className="text-sm font-medium">5. Humanize both peoples</span>
                    <span className="text-green-600 font-bold text-sm">✅ Strong Pass</span>
                  </div>
                  <div className="flex items-center justify-between p-2 bg-green-100 rounded-lg">
                    <span className="text-sm font-medium">6. Reject eliminationism</span>
                    <span className="text-green-600 font-bold text-sm">✅ Strong Pass</span>
                  </div>
                  <div className="flex items-center justify-between p-2 bg-green-100 rounded-lg">
                    <span className="text-sm font-medium">7. Vision for dignity & peace</span>
                    <span className="text-green-600 font-bold text-sm">✅ Strong Pass</span>
                  </div>
                </div>
              </div>

              <div className="border-t border-green-200 pt-4">
                <p className="text-sm text-gray-700">
                  <strong>Impact:</strong> Publicly condemned terrorism and Israeli military excess; jointly call for ceasefire and nonviolence. They share personal loss and deep empathy for each other's communities, organizing inclusive peace gatherings and articulating a future with mutual respect.
                </p>
              </div>
            </div>

            {/* Other Voices Grid */}
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              {/* Sulaiman Khatib */}
              <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-shadow">
                <div className="text-center mb-4">
                  <div className="inline-flex items-center justify-center w-10 h-10 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full mb-3">
                    <span className="text-white text-lg">✋</span>
                  </div>
                  <h4 className="text-lg font-bold text-gray-900 mb-1">Sulaiman Khatib</h4>
                  <p className="text-sm text-gray-600">Combatants for Peace, West Bank nonviolent activist</p>
                  <div className="mt-3 inline-flex items-center px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-semibold">
                    ✅ Full Pass — peace movement exemplar
                  </div>
                </div>
                <p className="text-xs text-gray-600">
                  Moved from armed struggle to nonviolence, advocates disarmament and nonviolent resistance. Co-founded binational nonviolent peace group; Nobel-nominated.
                </p>
              </div>

              {/* Gershon Baskin */}
              <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-shadow">
                <div className="text-center mb-4">
                  <div className="inline-flex items-center justify-center w-10 h-10 bg-gradient-to-r from-blue-500 to-teal-500 rounded-full mb-3">
                    <span className="text-white text-lg">🌐</span>
                  </div>
                  <h4 className="text-lg font-bold text-gray-900 mb-1">Gershon Baskin</h4>
                  <p className="text-sm text-gray-600">Israeli mediator, co-founder IPCRI</p>
                  <div className="mt-3 inline-flex items-center px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-semibold">
                    ✅ Full Pass — model mediator
                  </div>
                </div>
                <p className="text-xs text-gray-600">
                  Facilitated hostage negotiations with Hamas to preserve civilian lives. Co-founded Alliance for Two States, IPCRI, and peace NGOs.
                </p>
              </div>

              {/* Sally Abed */}
              <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-shadow">
                <div className="text-center mb-4">
                  <div className="inline-flex items-center justify-center w-10 h-10 bg-gradient-to-r from-green-500 to-yellow-500 rounded-full mb-3">
                    <span className="text-white text-lg">🌱</span>
                  </div>
                  <h4 className="text-lg font-bold text-gray-900 mb-1">Sally Abed</h4>
                  <p className="text-sm text-gray-600">Palestinian-Israeli city councilor, Standing Together</p>
                  <div className="mt-3 inline-flex items-center px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-semibold">
                    ✅ Full Pass — grassroots leader
                  </div>
                </div>
                <p className="text-xs text-gray-600">
                  Advocates ceasefire and defending all civilian lives. Emphasizes "radical empathy" between communities and works toward grassroots political change.
                </p>
              </div>
            </div>

            {/* Detailed MMR Tables for Individual Voices */}
            <div className="space-y-8 mb-8">
              {/* Sulaiman Khatib Detailed Table */}
              <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
                <div className="bg-gradient-to-r from-purple-500 to-blue-500 p-6 text-white">
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mr-4">
                      <span className="text-2xl">✋</span>
                    </div>
                    <div>
                      <h4 className="text-xl font-bold">Sulaiman Khatib - Detailed MMR Assessment</h4>
                      <p className="text-purple-100">Combatants for Peace, West Bank nonviolent activist</p>
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg border border-green-200">
                      <span className="font-medium">1. Reject targeting civilians</span>
                      <span className="text-green-600 font-bold">✅ Strong Pass</span>
                    </div>
                    <p className="text-sm text-gray-600 ml-4">Moved from armed struggle to nonviolence, condemns violence against all civilians.</p>
                    
                    <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg border border-green-200">
                      <span className="font-medium">2. Accountability for Hamas/Militants</span>
                      <span className="text-green-600 font-bold">✅ Strong Pass</span>
                    </div>
                    <p className="text-sm text-gray-600 ml-4">Advocates disarmament and nonviolent resistance, opposes militant approaches.</p>
                    
                    <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg border border-green-200">
                      <span className="font-medium">3. Accountability for Israeli Right</span>
                      <span className="text-green-600 font-bold">✅ Pass</span>
                    </div>
                    <p className="text-sm text-gray-600 ml-4">Works directly with Israelis; holds all parties accountable equally.</p>
                    
                    <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg border border-green-200">
                      <span className="font-medium">4. Use verified sources</span>
                      <span className="text-green-600 font-bold">✅ Pass</span>
                    </div>
                    <p className="text-sm text-gray-600 ml-4">Public, transparent nonviolence movement with documentation.</p>
                    
                    <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg border border-green-200">
                      <span className="font-medium">5. Humanize both peoples</span>
                      <span className="text-green-600 font-bold">✅ Strong Pass</span>
                    </div>
                    <p className="text-sm text-gray-600 ml-4">Emphasizes seeing "human behind the uniform" - profound empathy for all.</p>
                    
                    <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg border border-green-200">
                      <span className="font-medium">6. Reject eliminationism</span>
                      <span className="text-green-600 font-bold">✅ Strong Pass</span>
                    </div>
                    <p className="text-sm text-gray-600 ml-4">Advocates partnership, rejects annihilationist narratives from all sides.</p>
                    
                    <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg border border-green-200">
                      <span className="font-medium">7. Vision for dignity & peace</span>
                      <span className="text-green-600 font-bold">✅ Strong Pass</span>
                    </div>
                    <p className="text-sm text-gray-600 ml-4">Co-founded binational nonviolent peace group; Nobel-nominated for peace work.</p>
                  </div>
                </div>
              </div>

              {/* Gershon Baskin Detailed Table */}
              <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
                <div className="bg-gradient-to-r from-blue-500 to-teal-500 p-6 text-white">
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mr-4">
                      <span className="text-2xl">🌐</span>
                    </div>
                    <div>
                      <h4 className="text-xl font-bold">Gershon Baskin - Detailed MMR Assessment</h4>
                      <p className="text-blue-100">Israeli mediator, co-founder IPCRI</p>
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg border border-green-200">
                      <span className="font-medium">1. Reject targeting civilians</span>
                      <span className="text-green-600 font-bold">✅ Strong Pass</span>
                    </div>
                    <p className="text-sm text-gray-600 ml-4">Facilitated hostage negotiations with Hamas to preserve civilian lives.</p>
                    
                    <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg border border-green-200">
                      <span className="font-medium">2. Accountability for Hamas/Militants</span>
                      <span className="text-green-600 font-bold">✅ Strong Pass</span>
                    </div>
                    <p className="text-sm text-gray-600 ml-4">Negotiates responsibly but does not excuse Hamas; holds Hamas accountable.</p>
                    
                    <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg border border-green-200">
                      <span className="font-medium">3. Accountability for Israeli Right</span>
                      <span className="text-green-600 font-bold">✅ Strong Pass</span>
                    </div>
                    <p className="text-sm text-gray-600 ml-4">Critiques Israeli government's hardline measures and advocates for peace.</p>
                    
                    <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg border border-green-200">
                      <span className="font-medium">4. Use verified sources</span>
                      <span className="text-green-600 font-bold">✅ Strong Pass</span>
                    </div>
                    <p className="text-sm text-gray-600 ml-4">Cites diplomatic reports, negotiation records, transparent documentation.</p>
                    
                    <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg border border-green-200">
                      <span className="font-medium">5. Humanize both peoples</span>
                      <span className="text-green-600 font-bold">✅ Strong Pass</span>
                    </div>
                    <p className="text-sm text-gray-600 ml-4">Brings Israelis and Palestinians together; emphasizes shared humanity.</p>
                    
                    <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg border border-green-200">
                      <span className="font-medium">6. Reject eliminationism</span>
                      <span className="text-green-600 font-bold">✅ Strong Pass</span>
                    </div>
                    <p className="text-sm text-gray-600 ml-4">Supports two-state solution and mutual legitimacy for both peoples.</p>
                    
                    <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg border border-green-200">
                      <span className="font-medium">7. Vision for dignity & peace</span>
                      <span className="text-green-600 font-bold">✅ Strong Pass</span>
                    </div>
                    <p className="text-sm text-gray-600 ml-4">Co-founded Alliance for Two States, IPCRI, and multiple peace NGOs.</p>
                  </div>
                </div>
              </div>

              {/* Sally Abed Detailed Table */}
              <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
                <div className="bg-gradient-to-r from-green-500 to-yellow-500 p-6 text-white">
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mr-4">
                      <span className="text-2xl">🌱</span>
                    </div>
                    <div>
                      <h4 className="text-xl font-bold">Sally Abed - Detailed MMR Assessment</h4>
                      <p className="text-green-100">Palestinian-Israeli city councilor, Standing Together</p>
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg border border-green-200">
                      <span className="font-medium">1. Reject targeting civilians</span>
                      <span className="text-green-600 font-bold">✅ Strong Pass</span>
                    </div>
                    <p className="text-sm text-gray-600 ml-4">Advocates ceasefire and defending all civilian lives equally.</p>
                    
                    <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg border border-green-200">
                      <span className="font-medium">2. Accountability for Hamas/Militants</span>
                      <span className="text-green-600 font-bold">✅ Pass</span>
                    </div>
                    <p className="text-sm text-gray-600 ml-4">Promotes nonviolence in Palestinian activism and political engagement.</p>
                    
                    <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg border border-green-200">
                      <span className="font-medium">3. Accountability for Israeli Right</span>
                      <span className="text-green-600 font-bold">✅ Strong Pass</span>
                    </div>
                    <p className="text-sm text-gray-600 ml-4">Challenges occupation and ultra-nationalist rhetoric through political action.</p>
                    
                    <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg border border-green-200">
                      <span className="font-medium">4. Use verified sources</span>
                      <span className="text-green-600 font-bold">✅ Pass</span>
                    </div>
                    <p className="text-sm text-gray-600 ml-4">Speaks in public forums, documented media coverage of local politics.</p>
                    
                    <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg border border-green-200">
                      <span className="font-medium">5. Humanize both peoples</span>
                      <span className="text-green-600 font-bold">✅ Strong Pass</span>
                    </div>
                    <p className="text-sm text-gray-600 ml-4">Emphasizes "radical empathy" between communities and shared struggles.</p>
                    
                    <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg border border-green-200">
                      <span className="font-medium">6. Reject eliminationism</span>
                      <span className="text-green-600 font-bold">✅ Strong Pass</span>
                    </div>
                    <p className="text-sm text-gray-600 ml-4">Seeks joint narratives and partnership through grassroots organizing.</p>
                    
                    <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg border border-green-200">
                      <span className="font-medium">7. Vision for dignity & peace</span>
                      <span className="text-green-600 font-bold">✅ Strong Pass</span>
                    </div>
                    <p className="text-sm text-gray-600 ml-4">Works toward grassroots political change and two-state solution through Standing Together.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Hope Message */}
            <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-green-600 rounded-3xl p-8 md:p-12 text-white text-center">
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
        </div>
      </div>
    </div>
  );
};

export default MMRDocumentationSection;



        {/* Organizations Section */}
        <div className="max-w-6xl mx-auto mb-16">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-6">
              <Users className="w-10 h-10 text-purple-600 mr-3" />
              <h3 className="text-3xl md:text-4xl font-black text-gray-900">
                Organizations Meeting MMR Criteria
              </h3>
            </div>
            <p className="text-lg text-gray-600 max-w-4xl mx-auto leading-relaxed">
              These Israeli-Palestinian organizations demonstrate that institutional cooperation based on mutual moral respect is not only possible, but actively working to build peace and justice.
            </p>
          </div>

          {/* Organizations Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {/* Combatants for Peace */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-shadow">
              <div className="text-center mb-4">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full mb-3">
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <h4 className="text-lg font-bold text-gray-900 mb-1">Combatants for Peace</h4>
                <p className="text-sm text-gray-600">Ex-combatants (Israeli soldiers & Palestinian fighters)</p>
                <div className="mt-3 inline-flex items-center px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-semibold">
                  ✅ Full Pass — bi-national nonviolent movement
                </div>
              </div>
              <p className="text-xs text-gray-600 mb-3">
                Founded in 2006, challenges the cycle of violence through joint activism and public ceremonies.
              </p>
              <div className="text-xs text-blue-600">
                <p>🌐 cfpeace.org</p>
                <p>🇺🇸 afcfp.org (US support)</p>
              </div>
            </div>

            {/* Standing Together */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-shadow">
              <div className="text-center mb-4">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-green-600 to-blue-600 rounded-full mb-3">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <h4 className="text-lg font-bold text-gray-900 mb-1">Standing Together</h4>
                <p className="text-sm text-gray-600">Israel's largest grassroots Arab-Jewish movement</p>
                <div className="mt-3 inline-flex items-center px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-semibold">
                  ✅ Full Pass — equality & justice movement
                </div>
              </div>
              <p className="text-xs text-gray-600 mb-3">
                Founded in 2015 to promote equality, social justice, and end of occupation through shared civic mobilization.
              </p>
              <div className="text-xs text-blue-600">
                <p>🌐 standing-together.org</p>
                <p>📍 Local chapters in Tel Aviv, Jerusalem, Haifa</p>
              </div>
            </div>

            {/* Musalaha */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-shadow">
              <div className="text-center mb-4">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-yellow-600 to-orange-600 rounded-full mb-3">
                  <Heart className="w-6 h-6 text-white" />
                </div>
                <h4 className="text-lg font-bold text-gray-900 mb-1">Musalaha</h4>
                <p className="text-sm text-gray-600">Faith-based reconciliation NGO</p>
                <div className="mt-3 inline-flex items-center px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-semibold">
                  ✅ Full Pass — reconciliation through faith
                </div>
              </div>
              <p className="text-xs text-gray-600 mb-3">
                Established in 1990, promotes dialogue rooted in shared covenantal values through reconciliation camps.
              </p>
              <div className="text-xs text-blue-600">
                <p>🌐 musalaha.org</p>
                <p>🏕️ Desert Encounters camps</p>
              </div>
            </div>

            {/* Women Wage Peace */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-shadow">
              <div className="text-center mb-4">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-pink-600 to-purple-600 rounded-full mb-3">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <h4 className="text-lg font-bold text-gray-900 mb-1">Women Wage Peace</h4>
                <p className="text-sm text-gray-600">Jewish Israeli & Palestinian women's collaboration</p>
                <div className="mt-3 inline-flex items-center px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-semibold">
                  ✅ Full Pass — women's peace movement
                </div>
              </div>
              <p className="text-xs text-gray-600 mb-3">
                Collaborates with Women of the Sun (Palestinian) for nonviolent peace advocacy, internationally recognized.
              </p>
              <div className="text-xs text-blue-600">
                <p>🌐 via ALLMEP</p>
                <p>🚶‍♀️ Marches & dialogue events</p>
              </div>
            </div>

            {/* Coalition of Women for Peace */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-shadow">
              <div className="text-center mb-4">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-red-600 to-pink-600 rounded-full mb-3">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <h4 className="text-lg font-bold text-gray-900 mb-1">Coalition of Women for Peace</h4>
                <p className="text-sm text-gray-600">Feminist Israeli-Palestinian coalition</p>
                <div className="mt-3 inline-flex items-center px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-semibold">
                  ✅ Full Pass — feminist peace coalition
                </div>
              </div>
              <p className="text-xs text-gray-600 mb-3">
                Founded in 2000, brings together Women in Black, Noga, Machsom Watch for justice and anti-occupation campaigns.
              </p>
              <div className="text-xs text-blue-600">
                <p>🔍 Search: Coalition of Women for Peace</p>
                <p>✊ Peaceful solidarity initiatives</p>
              </div>
            </div>

            {/* Community Peacemaker Teams */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-shadow">
              <div className="text-center mb-4">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-teal-600 to-green-600 rounded-full mb-3">
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <h4 className="text-lg font-bold text-gray-900 mb-1">Community Peacemaker Teams</h4>
                <p className="text-sm text-gray-600">International volunteers in Palestine</p>
                <div className="mt-3 inline-flex items-center px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-semibold">
                  ✅ Full Pass — civilian protection
                </div>
              </div>
              <p className="text-xs text-gray-600 mb-3">
                Active in Hebron and Masafer Yatta since 1994, protecting civilians and supporting nonviolent resistance.
              </p>
              <div className="text-xs text-blue-600">
                <p>🌐 Community Peacemaker Teams</p>
                <p>🤝 Volunteer accompaniment roles</p>
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="text-center">
            <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-2xl p-8 border border-purple-100">
              <h4 className="text-2xl font-bold text-gray-900 mb-4">
                Get Involved with MMR Organizations
              </h4>
              <p className="text-lg text-gray-600 max-w-4xl mx-auto mb-6">
                These organizations prove that Israelis and Palestinians can work together effectively when guided by mutual moral respect. They offer concrete ways to support peace, justice, and dignity for all people in the region.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <div className="bg-white px-4 py-2 rounded-lg border border-gray-200">
                  <span className="text-sm font-medium text-gray-700">🤝 Volunteer</span>
                </div>
                <div className="bg-white px-4 py-2 rounded-lg border border-gray-200">
                  <span className="text-sm font-medium text-gray-700">💰 Donate</span>
                </div>
                <div className="bg-white px-4 py-2 rounded-lg border border-gray-200">
                  <span className="text-sm font-medium text-gray-700">📢 Advocate</span>
                </div>
                <div className="bg-white px-4 py-2 rounded-lg border border-gray-200">
                  <span className="text-sm font-medium text-gray-700">🎓 Educate</span>
                </div>
              </div>
            </div>
          </div>
        </div>

