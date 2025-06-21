import React from 'react';
import { Book, Target, Users, Shield, Search, Heart, Eye, CheckCircle } from 'lucide-react';

const MMRDocumentationSection = () => {
  return (
    <section id="mmr-documentation" className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 py-20">
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
              The Six MMR Pillars
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
                title: "Accountability (own side)",
                description: "Hold your own community accountable for rejectionist actions",
                color: "from-blue-500 to-cyan-500"
              },
              {
                icon: Users,
                title: "Accountability (other side)",
                description: "Fairly assess rejectionist actors across divides",
                color: "from-purple-500 to-indigo-500"
              },
              {
                icon: Search,
                title: "Verified, truthful sources",
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

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Netanyahu Analysis */}
            <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
              <div className="text-center mb-6">
                <h4 className="text-2xl font-bold text-gray-900 mb-2">Benjamin Netanyahu</h4>
                <p className="text-gray-600">Israeli Prime Minister (2009–present)</p>
                <div className="mt-4 inline-flex items-center px-4 py-2 bg-red-100 text-red-800 rounded-full text-sm font-semibold">
                  🏁 Overall MMR Alignment: Failing
                </div>
              </div>

              <div className="space-y-4 mb-6">
                <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                  <span className="text-sm font-medium">1. Reject targeting civilians</span>
                  <span className="text-yellow-600 font-bold">⚠️ Mixed</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                  <span className="text-sm font-medium">2. Accountability (Hamas/PA)</span>
                  <span className="text-green-600 font-bold">✅ Pass</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
                  <span className="text-sm font-medium">3. Accountability (Israeli far-right)</span>
                  <span className="text-red-600 font-bold">❌ Fail</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                  <span className="text-sm font-medium">4. Verified, truthful sources</span>
                  <span className="text-yellow-600 font-bold">⚠️ Mixed</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
                  <span className="text-sm font-medium">5. Humanize both peoples</span>
                  <span className="text-red-600 font-bold">❌ Fail</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
                  <span className="text-sm font-medium">6. Vision for dignity & peace</span>
                  <span className="text-red-600 font-bold">❌ Fail</span>
                </div>
              </div>

              <div className="border-t pt-4">
                <p className="text-sm text-gray-600 mb-2"><strong>Strengths:</strong></p>
                <p className="text-sm text-gray-600 mb-3">✅ Clear moral stance against Hamas terror and rejectionist violence</p>
                <p className="text-sm text-gray-600 mb-2"><strong>Weaknesses:</strong></p>
                <p className="text-sm text-gray-600">❌ Enabling Israeli far-right rhetoric • ❌ Failure to humanize Palestinian civilians • ❌ No constructive vision for peace</p>
              </div>
            </div>

            {/* Sinwar Analysis */}
            <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
              <div className="text-center mb-6">
                <h4 className="text-2xl font-bold text-gray-900 mb-2">Yahya Sinwar</h4>
                <p className="text-gray-600">Hamas Leader & Architect of October 7th (1962–2024)</p>
                <div className="mt-4 inline-flex items-center px-4 py-2 bg-red-100 text-red-800 rounded-full text-sm font-semibold">
                  🏁 Overall MMR Alignment: Failing
                </div>
              </div>

              <div className="space-y-4 mb-6">
                <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
                  <span className="text-sm font-medium">1. Reject targeting civilians</span>
                  <span className="text-red-600 font-bold">❌ Fail</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                  <span className="text-sm font-medium">2. Accountability (violent actors)</span>
                  <span className="text-yellow-600 font-bold">⚠️ Mixed</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                  <span className="text-sm font-medium">3. Accountability (own side)</span>
                  <span className="text-green-600 font-bold">✅ Pass</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                  <span className="text-sm font-medium">4. Verified, truthful sources</span>
                  <span className="text-yellow-600 font-bold">⚠️ Mixed</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
                  <span className="text-sm font-medium">5. Humanize both peoples</span>
                  <span className="text-red-600 font-bold">❌ Fail</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
                  <span className="text-sm font-medium">6. Vision for dignity & peace</span>
                  <span className="text-red-600 font-bold">❌ Fail</span>
                </div>
              </div>

              <div className="border-t pt-4">
                <p className="text-sm text-gray-600 mb-2"><strong>Key Facts:</strong></p>
                <p className="text-sm text-gray-600 mb-3">• Architect of October 7, 2023 attack that killed ~1,200 civilians<br/>• Described Palestinian civilian casualties as "necessary sacrifices"<br/>• Killed by Israeli forces October 16, 2024</p>
                <p className="text-sm text-gray-600 mb-2"><strong>Assessment:</strong></p>
                <p className="text-sm text-gray-600">Displays virtually no MMR alignment. Legacy marked by ruthlessness, strategic embrace of civilian harm, and militant absolutism over mutual respect.</p>
              </div>
            </div>
          </div>

          <div className="mt-12 text-center">
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8 border border-blue-100">
              <h4 className="text-xl font-bold text-gray-900 mb-4">Understanding MMR Assessments</h4>
              <p className="text-gray-700 leading-relaxed max-w-3xl mx-auto">
                These examples demonstrate how the MMR framework provides nuanced, evidence-based evaluations across all six pillars. 
                The framework reveals both strengths and critical failures in political leadership, helping identify voices that 
                genuinely advance mutual moral respect versus those that perpetuate cycles of polarization and violence.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MMRDocumentationSection;

