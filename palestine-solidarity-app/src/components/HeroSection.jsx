import React from 'react';
import { ChevronDown, ExternalLink } from 'lucide-react';
import { Button } from './ui/button';
import '../App.css';

const HeroSection = () => {
  const scrollToDocumentation = () => {
    const docSection = document.getElementById('mmr-documentation');
    if (docSection) {
      docSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="hero-section relative overflow-hidden">
      {/* Full-Width Intertwined Flags Banner Image */}
      <div className="w-full h-96 md:h-[500px] relative">
        <img 
          src="/intertwined-flags-banner.png" 
          alt="Intertwined Palestine and Israel Flags" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-white/90"></div>
        
        {/* Content Overlay on Banner */}
        <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-4 sm:px-6">
          {/* Modern Typography Hierarchy */}
          <div className="space-y-3 sm:space-y-4 max-w-4xl">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight">
              <span className="text-white drop-shadow-[0_4px_8px_rgba(0,0,0,0.8)] [text-shadow:_2px_2px_4px_rgb(0_0_0_/_80%)]">
                SOLIDARITY
              </span>
            </h1>
            
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold drop-shadow-[0_3px_6px_rgba(0,0,0,0.7)]">
              <span className="text-white [text-shadow:_2px_2px_4px_rgb(0_0_0_/_70%)]">
                WITH
              </span>
            </h2>
            
            <h3 className="text-3xl sm:text-4xl md:text-5xl font-black">
              <span className="text-white drop-shadow-[0_4px_8px_rgba(0,0,0,0.8)] [text-shadow:_2px_2px_4px_rgb(0_0_0_/_80%)]">
                PALESTINE & ISRAEL
              </span>
            </h3>
            
            <div className="mt-4 sm:mt-6 bg-black/60 backdrop-blur-sm rounded-xl sm:rounded-2xl px-4 sm:px-6 py-3 sm:py-4 border border-white/20 mx-auto max-w-lg">
              <p className="text-base sm:text-lg md:text-xl text-white font-bold leading-relaxed drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                Freedom in Israel, Gaza, and the West Bank
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Content Section Below Banner */}
      <div className="bg-gradient-to-br from-slate-50 via-white to-blue-50 py-20">
        <div className="container mx-auto px-6 text-center">
          {/* Modern CTA Button */}
          <div className="mb-16">
            <Button
              onClick={scrollToDocumentation}
              className="group relative px-12 py-6 text-lg font-semibold bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white rounded-2xl shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300"
            >
              <div className="flex items-center space-x-3">
                <span className="relative z-10">LEARN MORE</span>
                <ChevronDown className="w-5 h-5 group-hover:translate-y-1 transition-transform" />
              </div>
              <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-blue-400 rounded-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
            </Button>
            <p className="mt-4 text-sm text-gray-600 max-w-md mx-auto">
              Explore the complete MMR framework and methodology
            </p>
          </div>

          {/* Modern Scroll Indicator */}
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

