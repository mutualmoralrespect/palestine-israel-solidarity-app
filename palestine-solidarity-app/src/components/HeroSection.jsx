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
      <div className="geometric-pattern absolute inset-0"></div>
      <div className="container mx-auto px-4 text-center relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-center mb-8 space-x-8">
            <div className="w-16 h-16 bg-palestine-red flex items-center justify-center">
              <div className="grid grid-cols-2 gap-1">
                <div className="w-2 h-2 bg-palestine-black transform rotate-45"></div>
                <div className="w-2 h-2 bg-palestine-black transform rotate-45"></div>
                <div className="w-2 h-2 bg-palestine-black transform rotate-45"></div>
                <div className="w-2 h-2 bg-palestine-black transform rotate-45"></div>
              </div>
            </div>
            <div className="w-16 h-16 bg-palestine-green transform rotate-45 flex items-center justify-center">
              <div className="grid grid-cols-3 gap-1 transform -rotate-45">
                <div className="w-1 h-1 bg-palestine-black"></div>
                <div className="w-1 h-1 bg-palestine-black"></div>
                <div className="w-1 h-1 bg-palestine-black"></div>
                <div className="w-1 h-1 bg-palestine-black"></div>
                <div className="w-1 h-1 bg-palestine-black"></div>
                <div className="w-1 h-1 bg-palestine-black"></div>
                <div className="w-1 h-1 bg-palestine-black"></div>
                <div className="w-1 h-1 bg-palestine-black"></div>
                <div className="w-1 h-1 bg-palestine-black"></div>
              </div>
            </div>
          </div>
          
          <h1 className="text-6xl md:text-8xl font-bold mb-6 palestine-black">
            SOLIDARITY
          </h1>
          <h2 className="text-6xl md:text-8xl font-bold mb-8 palestine-black">
            WITH
          </h2>
          <h3 className="text-6xl md:text-8xl font-bold mb-12 palestine-black">
            PALESTINE
          </h3>
          
          <Button 
            onClick={scrollToMMR}
            variant="outline" 
            size="lg"
            className="border-2 border-palestine-black text-palestine-black hover:bg-palestine-black hover:text-white text-lg px-8 py-4"
          >
            LEARN MORE
          </Button>
        </div>
      </div>
      
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
        <ChevronDown 
          className="w-8 h-8 palestine-black scroll-indicator cursor-pointer" 
          onClick={scrollToMMR}
        />
      </div>
    </section>
  );
};

export default HeroSection;

