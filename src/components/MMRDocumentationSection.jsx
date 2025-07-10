import React, { useRef, useEffect, useState } from 'react';
import { Shield, Users, Building, BarChart3, Heart, Sprout, Eye, Scale } from 'lucide-react';
import ProfileCard from './shared/ProfileCard';
import mmrDatabase from '../data/6_pillar_json_database.json';
import { transformProfile } from '../utils/dataTransform';

const MMRDocumentationSection = () => {
  // Find Netanyahu's profile from the database
  const netanyahuProfile = mmrDatabase.find(profile => 
    profile.subject === 'Benjamin Netanyahu'
  );
  
  // Transform the profile for the ProfileCard component
  const transformedNetanyahu = netanyahuProfile ? transformProfile(netanyahuProfile) : null;

  // Find Yahya Sinwar's profile from the database
  const sinwarProfile = mmrDatabase.find(profile => 
    profile.subject === 'Yahya Sinwar'
  );
  // Transform the profile for the ProfileCard component
  const transformedSinwar = sinwarProfile ? transformProfile(sinwarProfile) : null;

  // State for ProfileCard expansion
  const [expandedCards, setExpandedCards] = useState(new Set([0, 1]));
  
  const handleToggleExpansion = (index) => {
    const newExpanded = new Set(expandedCards);
    if (newExpanded.has(index)) {
      newExpanded.delete(index);
    } else {
      newExpanded.add(index);
    }
    setExpandedCards(newExpanded);
  };

  // const sectionRef = useRef(null);
  // const [scrollY, setScrollY] = useState(0);

  // useEffect(() => {
  //   const handleScroll = () => {
  //     if (!sectionRef.current) return;
  //     const rect = sectionRef.current.getBoundingClientRect();
  //     const offset = Math.max(0, -rect.top);
  //     setScrollY(offset);
  //   };
  //   window.addEventListener('scroll', handleScroll, { passive: true });
  //   return () => window.removeEventListener('scroll', handleScroll);
  // }, []);

  // // Title slides up only (never fades out)
  // const headerStyle = {
  //   transform: `translateY(-${Math.min(scrollY, 10)}px)`,
  //   opacity: 1,
  //   transition: 'transform 0.2s',
  //   willChange: 'transform',
  //   marginBottom: scrollY > 10 ? '2rem' : '4rem', // reduce space as you scroll
  // };

  // const headerHasMoved = scrollY > 0;

  // ---
  // LEARNINGS:
  // - We liked: pillars appearing instantly when the section is near the top or as soon as the header moves, and syncing with header movement.
  // - We did NOT like: delayed fade-in, laggy transitions, or any empty space before content appears.
  // - For future: if using animation, keep it extremely fast/subtle and always ensure content is visible as soon as the section is in view.
  // ---
  // const isSectionNearTop =
  //   scrollY > 0 ||
  //   (sectionRef.current && sectionRef.current.getBoundingClientRect().top < 30);

  // // Pillars appear instantly (no fade, no slide)
  // const pillarsStyle = {
  //   opacity: isSectionNearTop ? 1 : 0,
  //   transform: 'none',
  //   transition: 'none',
  //   willChange: 'opacity, transform',
  //   pointerEvents: isSectionNearTop ? 'auto' : 'none',
  // };

  return (
    <div id="mmr-documentation" className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="container mx-auto px-4 py-16">
        {/* Header */}
        <div className="text-center mb-16" >
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
              The Six Pillars of MMR
            </h2>
            <p className="text-lg text-gray-600">
              A comprehensive framework for moral evaluation
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {[
              {
                icon: Shield,
                title: "Reject Targeting Civilians",
                description: "Condemn attacks on civilians regardless of perpetrator.  Unprovoked attacks of any kind are unacceptable.",
                color: "from-pink-500 to-red-500",
                iconBg: "bg-gradient-to-r from-pink-500 to-red-500"
              },
              {
                icon: Scale,
                title: "Accountability for Hamas/Militants",
                description: "Hold Palestinian militant groups accountable for violence.  Holds Palestinian factions like Hamas, accountable for violence, ideological rejectionism, and martyrdom culture.",
                color: "from-orange-500 to-red-500",
                iconBg: "bg-gradient-to-r from-orange-500 to-red-500"
              },
              {
                icon: Building,
                title: "Accountability for Israeli Far Right",
                description: "Hold Israeli extremists and policies accountable.  Includes critique of Israeli leaders, IDF military actions, settler violence, annexationist policies, and Jewish supremacist rhetoric.",
                color: "from-yellow-500 to-orange-500",
                iconBg: "bg-gradient-to-r from-yellow-500 to-orange-500"
              },
              {
                icon: BarChart3,
                title: "Use Verified Sources",
                description: "Base arguments on credible, verified information.  Prioritizes transparent, evidence-based documentation over conspiracy or tribal narratives.",
                color: "from-green-500 to-emerald-500",
                iconBg: "bg-gradient-to-r from-green-500 to-emerald-500"
              },
              {
                icon: Heart,
                title: "Humanize Both Peoples",
                description: "Recognize the humanity and suffering of all people.  Expresses grief, empathy, and respect for civilian suffering on both sides.",
                color: "from-orange-500 to-pink-500",
                iconBg: "bg-gradient-to-r from-orange-500 to-pink-500"
              },
              // {
              //   icon: Sprout,
              //   title: "Embrace Coexistence",
              //   description: "Reject eliminationist rhetoric from all sides.",
              //   color: "from-purple-500 to-pink-500",
              //   iconBg: "bg-gradient-to-r from-purple-500 to-pink-500"
              // },
              {
                icon: Eye,
                title: "Vision for Coexistence, Dignity & Peace",
                description: "Articulate a constructive path toward peace rooted in coexistence.  Articulates political, ethical, or structural frameworks for a safety and peace with equal dignity.",
                color: "from-blue-500 to-cyan-500",
                iconBg: "bg-gradient-to-r from-blue-500 to-cyan-500"
              }
            ].map((pillar, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 border border-gray-100 group hover:scale-105 flex flex-col items-center text-center">
                <div className={`w-14 h-14 ${pillar.iconBg} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 rounded-full`}>
                  <pillar.icon className="w-7 h-7 text-white" />
                </div>
                <h4 className="text-lg font-bold text-gray-900 mb-2">
                  {index + 1}. {pillar.title}
                </h4>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {pillar.description}
                </p>
              </div>
            ))}
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
            {transformedNetanyahu && (
              <ProfileCard
                figure={transformedNetanyahu}
                index={0}
                isExpanded={expandedCards.has(0)}
                onToggleExpansion={handleToggleExpansion}
              />
            )}

            

            {/* Sinwar Analysis */}
            {transformedSinwar && (
              <ProfileCard
                figure={transformedSinwar}
                index={1}
                isExpanded={expandedCards.has(1)}
                onToggleExpansion={handleToggleExpansion}
              />
            )}
          </div>

          <div className="mt-12 text-center">
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8 border border-blue-100">
              <h4 className="text-xl font-bold text-gray-900 mb-4">Understanding MMR Assessments</h4>
              <p className="text-lg text-gray-600 max-w-4xl mx-auto">
                These examples demonstrate how the MMR framework provides nuanced, evidence-based evaluations across all six pillars. The framework reveals both strengths and critical failures in political leadership, helping identify voices that genuinely advance mutual moral respect versus those that perpetuate cycles of polarization and violence.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MMRDocumentationSection;

