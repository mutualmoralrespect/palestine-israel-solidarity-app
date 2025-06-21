import React from 'react';
import { Shield, Users, Heart, Scale } from 'lucide-react';

const MMRDocumentationSection = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="container mx-auto px-4 py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full mb-6">
            <Scale className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-gray-900 mb-6">
            Mutual Moral Respect
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            A framework for evaluating moral consistency in discourse about Palestine and Israel
          </p>
        </div>

        {/* Seven Pillars */}
        <div className="max-w-6xl mx-auto mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              The Seven Pillars of MMR
            </h2>
            <p className="text-lg text-gray-600">
              A comprehensive framework for moral evaluation
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {/* Pillar 1 */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-shadow">
              <div className="text-center mb-4">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-red-500 to-pink-500 rounded-full mb-3">
                  <span className="text-white text-xl">🛡️</span>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">1. Reject Targeting Civilians</h3>
                <p className="text-sm text-gray-600">
                  Condemn attacks on civilians regardless of perpetrator
                </p>
              </div>
            </div>

            {/* Pillar 2 */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-shadow">
              <div className="text-center mb-4">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-full mb-3">
                  <span className="text-white text-xl">⚖️</span>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">2. Accountability for Hamas/Militants</h3>
                <p className="text-sm text-gray-600">
                  Hold Palestinian militant groups accountable for violence
                </p>
              </div>
            </div>

            {/* Pillar 3 */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-shadow">
              <div className="text-center mb-4">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full mb-3">
                  <span className="text-white text-xl">🏛️</span>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">3. Accountability for Israeli Right</h3>
                <p className="text-sm text-gray-600">
                  Hold Israeli extremists and policies accountable
                </p>
              </div>
            </div>

            {/* Pillar 4 */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-shadow">
              <div className="text-center mb-4">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-green-500 to-teal-500 rounded-full mb-3">
                  <span className="text-white text-xl">📊</span>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">4. Use Verified Sources</h3>
                <p className="text-sm text-gray-600">
                  Base arguments on credible, verified information
                </p>
              </div>
            </div>

            {/* Pillar 5 */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-shadow">
              <div className="text-center mb-4">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mb-3">
                  <span className="text-white text-xl">❤️</span>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">5. Humanize Both Peoples</h3>
                <p className="text-sm text-gray-600">
                  Recognize the humanity and suffering of all people
                </p>
              </div>
            </div>

            {/* Pillar 6 */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-shadow">
              <div className="text-center mb-4">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mb-3">
                  <span className="text-white text-xl">🤝</span>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">6. Embrace Coexistence</h3>
                <p className="text-sm text-gray-600">
                  Reject eliminationist rhetoric from all sides
                </p>
              </div>
            </div>

            {/* Pillar 7 */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-shadow">
              <div className="text-center mb-4">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-indigo-500 to-blue-500 rounded-full mb-3">
                  <span className="text-white text-xl">🕊️</span>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">7. Vision for Dignity & Peace</h3>
                <p className="text-sm text-gray-600">
                  Articulate a constructive path toward peace
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Trademark Notice */}
        <div className="max-w-4xl mx-auto mb-16">
          <div className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-2xl p-8 border border-gray-200">
            <div className="text-center">
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Mutual Moral Respect Foundation™
              </h3>
              <p className="text-gray-600 mb-6">
                The MMR framework is a trademark of the Mutual Moral Respect Foundation, dedicated to promoting principled discourse and moral consistency in discussions of complex conflicts.
              </p>
              <p className="text-sm text-gray-500">
                To participate, make suggestions, sponsor collaborative initiatives, or help train the model, contact mutualmoralrespectmodel@gmail.com
              </p>
            </div>
          </div>
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
                <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-blue-600 to-blue-800 rounded-full mb-4">
                  <span className="text-white text-xl">🇮🇱</span>
                </div>
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
                    <span className="text-sm font-medium">2. Accountability for Hamas/Militants</span>
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
                    <span className="text-sm font-medium">3. Accountability for Israeli Right</span>
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
                    <span className="text-sm font-medium">4. Use verified sources</span>
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
                    <span className="text-sm font-medium">6. Embrace coexistence</span>
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

              <div className="border-t border-gray-200 pt-4">
                <p className="text-sm text-gray-700">
                  <strong>Assessment:</strong> Netanyahu demonstrates strong accountability for Hamas but fails on multiple other pillars, particularly humanization, accountability for Israeli extremism, and vision for peace.
                </p>
              </div>
            </div>

            {/* Sinwar Analysis */}
            <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
              <div className="text-center mb-6">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-green-600 to-red-600 rounded-full mb-4">
                  <span className="text-white text-xl">🇵🇸</span>
                </div>
                <h4 className="text-2xl font-bold text-gray-900 mb-2">Yahya Sinwar</h4>
                <p className="text-gray-600">Former Hamas leader in Gaza (deceased)</p>
                <div className="mt-4 inline-flex items-center px-4 py-2 bg-red-100 text-red-800 rounded-full text-sm font-semibold">
                  🏁 Overall MMR Alignment: ❌ Clear Fail
                </div>
              </div>

              <div className="space-y-3 mb-6">
                <details className="group">
                  <summary className="flex items-center justify-between p-3 bg-red-50 rounded-lg cursor-pointer hover:bg-red-100 transition-colors">
                    <span className="text-sm font-medium">1. Reject targeting civilians</span>
                    <div className="flex items-center space-x-2">
                      <span className="text-red-600 font-bold">❌ Fail</span>
                      <span className="text-gray-400 group-open:rotate-180 transition-transform">▼</span>
                    </div>
                  </summary>
                  <div className="mt-2 p-3 bg-red-25 rounded-lg text-sm text-gray-700">
                    Orchestrated October 7 attack targeting civilians; explicitly justifies targeting Israeli civilians as legitimate resistance.
                  </div>
                </details>

                <details className="group">
                  <summary className="flex items-center justify-between p-3 bg-red-50 rounded-lg cursor-pointer hover:bg-red-100 transition-colors">
                    <span className="text-sm font-medium">2. Accountability for Hamas/Militants</span>
                    <div className="flex items-center space-x-2">
                      <span className="text-red-600 font-bold">❌ Fail</span>
                      <span className="text-gray-400 group-open:rotate-180 transition-transform">▼</span>
                    </div>
                  </summary>
                  <div className="mt-2 p-3 bg-red-25 rounded-lg text-sm text-gray-700">
                    As Hamas leader, takes no accountability for civilian casualties caused by Hamas; justifies all actions as resistance.
                  </div>
                </details>

                <details className="group">
                  <summary className="flex items-center justify-between p-3 bg-green-50 rounded-lg cursor-pointer hover:bg-green-100 transition-colors">
                    <span className="text-sm font-medium">3. Accountability for Israeli Right</span>
                    <div className="flex items-center space-x-2">
                      <span className="text-green-600 font-bold">✅ Pass</span>
                      <span className="text-gray-400 group-open:rotate-180 transition-transform">▼</span>
                    </div>
                  </summary>
                  <div className="mt-2 p-3 bg-green-25 rounded-lg text-sm text-gray-700">
                    Consistently condemns Israeli military actions and settlement expansion, though through militant lens.
                  </div>
                </details>

                <details className="group">
                  <summary className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg cursor-pointer hover:bg-yellow-100 transition-colors">
                    <span className="text-sm font-medium">4. Use verified sources</span>
                    <div className="flex items-center space-x-2">
                      <span className="text-yellow-600 font-bold">⚠️ Mixed</span>
                      <span className="text-gray-400 group-open:rotate-180 transition-transform">▼</span>
                    </div>
                  </summary>
                  <div className="mt-2 p-3 bg-yellow-25 rounded-lg text-sm text-gray-700">
                    Uses some factual information about Israeli actions but frames through propaganda and eliminationist rhetoric.
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
                    Dehumanizes Israelis as occupiers and colonizers; shows no empathy for Israeli civilian suffering.
                  </div>
                </details>

                <details className="group">
                  <summary className="flex items-center justify-between p-3 bg-red-50 rounded-lg cursor-pointer hover:bg-red-100 transition-colors">
                    <span className="text-sm font-medium">6. Embrace coexistence</span>
                    <div className="flex items-center space-x-2">
                      <span className="text-red-600 font-bold">❌ Fail</span>
                      <span className="text-gray-400 group-open:rotate-180 transition-transform">▼</span>
                    </div>
                  </summary>
                  <div className="mt-2 p-3 bg-red-25 rounded-lg text-sm text-gray-700">
                    Explicitly rejects coexistence; advocates for elimination of Israeli state and Jewish presence.
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
                    No vision for peaceful coexistence; advocates continued armed resistance until total victory.
                  </div>
                </details>
              </div>

              <div className="border-t border-gray-200 pt-4">
                <p className="text-sm text-gray-700">
                  <strong>Assessment:</strong> Sinwar represents the antithesis of MMR principles, failing on nearly all pillars through advocacy of violence against civilians and eliminationist ideology.
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
      </div>
    </div>
  );
};

export default MMRDocumentationSection;

