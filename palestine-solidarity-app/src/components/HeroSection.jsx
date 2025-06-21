import React from 'react';
import { ChevronDown } from 'lucide-react';
import { Button } from './ui/button';
import '../App.css';

const HeroSection = () => {
  const scrollToMMR = () => {
    const mmrSection = document.getElementById('mmr-section');
    if (mmrSection) {
      mmrSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="hero-section relative overflow-hidden">
      {/* Beautiful Intertwined Flags Banner */}
      <div className="absolute inset-0 z-0">
        <div className="w-full h-full bg-gradient-to-br from-slate-50 via-white to-blue-50">
          <img 
            src="/assets/intertwined-flags-banner.png" 
            alt="Intertwined Palestine and Israel Flags" 
            className="w-full h-full object-cover opacity-30"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/30 to-white/80"></div>
      </div>

      {/* Modern Content Container */}
      <div className="relative z-10 container mx-auto px-6 py-20 min-h-screen flex flex-col justify-center items-center text-center">
        
        {/* Flag Symbols with Modern Styling */}
        <div className="flex items-center justify-center space-x-8 mb-12">
          <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-red-600 rounded-2xl flex items-center justify-center shadow-2xl transform rotate-3 hover:rotate-6 transition-transform duration-300">
            <span className="text-white text-2xl font-bold">🤝</span>
          </div>
          <div className="w-20 h-20 bg-gradient-to-br from-blue-600 to-blue-700 rounded-3xl flex items-center justify-center shadow-2xl transform -rotate-2 hover:-rotate-6 transition-transform duration-300">
            <span className="text-white text-3xl">✡</span>
          </div>
        </div>

        {/* Modern Typography Hierarchy */}
        <div className="space-y-6 max-w-4xl">
          <h1 className="text-7xl md:text-8xl font-black tracking-tight">
            <span className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent">
              SOLIDARITY
            </span>
          </h1>
          
          <h2 className="text-4xl md:text-5xl font-bold text-gray-700">
            WITH
          </h2>
          
          <h3 className="text-5xl md:text-6xl font-black">
            <span className="bg-gradient-to-r from-red-600 via-green-600 to-blue-600 bg-clip-text text-transparent">
              PALESTINE & ISRAEL
            </span>
          </h3>
          
          <p className="text-xl md:text-2xl text-gray-600 font-medium mt-8 leading-relaxed">
            Freedom in Israel, Gaza, and the West Bank
          </p>
        </div>

        {/* Modern CTA Button */}
        <div className="mt-16">
          <Button
            onClick={scrollToMMR}
            className="group relative px-12 py-6 text-lg font-semibold bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white rounded-2xl shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300"
          >
            <span className="relative z-10">LEARN MORE</span>
            <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-blue-400 rounded-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
          </Button>
        </div>

        {/* Modern Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
          <div className="flex flex-col items-center space-y-2 text-gray-500">
            <span className="text-sm font-medium tracking-wide">SCROLL TO EXPLORE</span>
            <ChevronDown className="w-6 h-6 animate-bounce" />
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-red-200 to-red-300 rounded-full opacity-20 blur-xl"></div>
      <div className="absolute bottom-20 right-10 w-40 h-40 bg-gradient-to-br from-blue-200 to-blue-300 rounded-full opacity-20 blur-xl"></div>
      <div className="absolute top-1/2 left-20 w-24 h-24 bg-gradient-to-br from-green-200 to-green-300 rounded-full opacity-20 blur-xl"></div>
    </section>
  );
};

export default HeroSection;

