import React from 'react';
import HeroSection from './components/HeroSection';
import MMRDocumentationSection from './components/MMRDocumentationSection';
import MMRScansSection from './components/MMRScansSection_refactored';
import VoicesOfHopeSection from './components/VoicesOfHopeSection';
import MMRLinkSection from './components/MMRLinkSection';
import './App.css';

function App() {
  return (
    <div className="App">
      <HeroSection />
      <MMRDocumentationSection />
      <MMRScansSection />
      <VoicesOfHopeSection />
      <MMRLinkSection />
    </div>
  );
}

export default App;
