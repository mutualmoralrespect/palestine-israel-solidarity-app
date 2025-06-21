import React from 'react';
import { ChevronDown } from 'lucide-react';
import { Button } from './ui/button';
import '../App.css';

const HeroSection = () => {
  const scrollToMMR = () => {
    document.getElementById('mmr-section').scrollIntoView({ 
      behavior: 'smooth' 
    });
  };

  return (
    <section className="hero-section flex items-center justify-center relative">
      {/* New intertwined flags background */}
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-15"
        style={{
          backgroundImage: 'url("./src/assets/intertwined-flags-banner.png")',
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      />
      
      {/* Unity geometric pattern overlay */}
      <div className="unity-pattern absolute inset-0"></div>
      
      <div className="container mx-auto px-4 text-center relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* Updated flag elements representing both flags */}
          <div className="flex items-center justify-center mb-8 space-x-6">
            {/* Palestine flag elements */}
            <div className="w-16 h-16 bg-palestine-red flex items-center justify-center rounded-lg shadow-lg">
              <div className="grid grid-cols-2 gap-1">
                <div className="w-2 h-2 bg-palestine-black transform rotate-45"></div>
                <div className="w-2 h-2 bg-palestine-black transform rotate-45"></div>
                <div className="w-2 h-2 bg-palestine-black transform rotate-45"></div>
                <div className="w-2 h-2 bg-palestine-black transform rotate-45"></div>
              </div>
            </div>
            
            {/* Unity symbol */}
            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center border-4 border-gray-300 shadow-lg">
              <span className="text-2xl">🤝</span>
            </div>
            
            {/* Israel flag elements */}
            <div className="w-16 h-16 bg-israel-blue flex items-center justify-center rounded-lg shadow-lg">
              <div className="text-white text-2xl font-bold">✡</div>
            </div>
          </div>
          
          <h1 className="text-6xl md:text-8xl font-bold mb-6 palestine-black">
            SOLIDARITY
          </h1>
          <h2 className="text-6xl md:text-8xl font-bold mb-4 palestine-black">
            WITH
          </h2>
          <h3 className="text-5xl md:text-7xl font-bold mb-6 palestine-black">
            PALESTINE & ISRAEL
          </h3>
          
          <p className="text-xl md:text-2xl text-gray-700 mb-8 font-medium">
            Freedom in Israel, Gaza, and the West Bank
          </p>
          
          <Button 
            onClick={scrollToMMR}
            variant="outline" 
            size="lg"
            className="border-2 border-peace-green text-peace-green hover:bg-peace-green hover:text-white text-lg px-8 py-4 transition-all duration-300"
          >
            LEARN MORE
          </Button>
        </div>
      </div>
      
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
        <ChevronDown 
          className="w-8 h-8 palestine-black scroll-indicator cursor-pointer animate-bounce" 
          onClick={scrollToMMR}
        />
      </div>
    </section>
  );
};

export default HeroSection;

