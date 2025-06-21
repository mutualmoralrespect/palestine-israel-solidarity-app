import React from 'react';
import HeroSection from './components/HeroSection';
import MMRDocumentationSection from './components/MMRDocumentationSection';
import MMRLinkSection from './components/MMRLinkSection';
import './App.css';

function App() {
  return (
    <div className="App">
      <HeroSection />
      <MMRDocumentationSection />
      <MMRLinkSection />
    </div>
  );
}

export default App;
