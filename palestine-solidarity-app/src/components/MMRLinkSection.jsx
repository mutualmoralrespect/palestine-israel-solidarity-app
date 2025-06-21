import React from 'react';
import { ExternalLink, Brain, MessageSquare, Sparkles } from 'lucide-react';
import { Button } from './ui/button';

const MMRLinkSection = () => {
  const chatGPTUrl = "https://chatgpt.com/g/g-685474289efc81918c76f395f23d2c3f-mutual-moral-respect-mmr-scan-v1";

  const handleLaunchMMR = () => {
    window.open(chatGPTUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <section id="mmr-section" className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 py-20">
      <div className="container mx-auto px-6">
        
        {/* Option 1: Prominent CTA Button */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center mb-8">
            <Brain className="w-16 h-16 text-blue-600 mr-4" />
            <div>
              <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-2">
                MMR Analysis Ready
              </h2>
              <p className="text-xl text-gray-600 font-medium">
                Multi-Modal Reasoning • Intersectional Analysis • Solidarity-Focused
              </p>
            </div>
          </div>

          <Button
            onClick={handleLaunchMMR}
            className="group relative px-16 py-8 text-2xl font-bold bg-gradient-to-r from-green-600 via-blue-600 to-purple-600 hover:from-green-700 hover:via-blue-700 hover:to-purple-700 text-white rounded-3xl shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300"
          >
            <div className="flex items-center space-x-4">
              <Sparkles className="w-8 h-8" />
              <span>Launch MMR Analysis</span>
              <ExternalLink className="w-8 h-8 group-hover:translate-x-1 transition-transform" />
            </div>
            <div className="absolute inset-0 bg-gradient-to-r from-green-400 via-blue-400 to-purple-400 rounded-3xl opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
          </Button>

          <p className="mt-6 text-lg text-gray-500 max-w-2xl mx-auto">
            Access the advanced ChatGPT-powered MMR analysis tool for comprehensive multi-modal reasoning and intersectional solidarity analysis.
          </p>
        </div>

        {/* Option 2: Card-style Link */}
        <div className="max-w-4xl mx-auto">
          <div 
            onClick={handleLaunchMMR}
            className="group cursor-pointer bg-white rounded-3xl shadow-2xl hover:shadow-3xl transform hover:scale-[1.02] transition-all duration-300 overflow-hidden border border-gray-100"
          >
            {/* Card Header */}
            <div className="bg-gradient-to-r from-green-600 via-blue-600 to-purple-600 p-8 text-white">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
                    <Brain className="w-10 h-10 text-white" />
                  </div>
                  <div>
                    <h3 className="text-3xl font-black mb-2">MMR Scan v1</h3>
                    <p className="text-xl text-white/90 font-medium">Mutual Moral Respect Analysis</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2 text-white/80">
                  <span className="text-sm font-medium">Powered by</span>
                  <div className="bg-white/20 px-3 py-1 rounded-full text-sm font-bold backdrop-blur-sm">
                    ChatGPT
                  </div>
                </div>
              </div>
            </div>

            {/* Card Content */}
            <div className="p-8">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h4 className="text-2xl font-bold text-gray-900 mb-4">Advanced Analysis Features</h4>
                  <ul className="space-y-3 text-gray-700">
                    <li className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span>Multi-modal reasoning across contexts</span>
                    </li>
                    <li className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <span>Intersectional solidarity analysis</span>
                    </li>
                    <li className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                      <span>Palestine-Israel context expertise</span>
                    </li>
                    <li className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                      <span>Real-time comprehensive responses</span>
                    </li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="text-2xl font-bold text-gray-900 mb-4">How It Works</h4>
                  <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center text-green-600 font-bold text-sm">1</div>
                      <div>
                        <p className="font-semibold text-gray-800">Ask Your Question</p>
                        <p className="text-gray-600 text-sm">Submit any topic for MMR analysis</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold text-sm">2</div>
                      <div>
                        <p className="font-semibold text-gray-800">AI Processing</p>
                        <p className="text-gray-600 text-sm">Advanced reasoning and analysis</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center text-purple-600 font-bold text-sm">3</div>
                      <div>
                        <p className="font-semibold text-gray-800">Detailed Response</p>
                        <p className="text-gray-600 text-sm">Comprehensive MMR evaluation</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Call to Action */}
              <div className="mt-8 pt-8 border-t border-gray-100">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-lg font-semibold text-gray-900">Ready to start your analysis?</p>
                    <p className="text-gray-600">Click anywhere on this card to launch the MMR tool</p>
                  </div>
                  <div className="flex items-center space-x-2 text-blue-600 group-hover:text-blue-700 transition-colors">
                    <MessageSquare className="w-6 h-6" />
                    <span className="font-semibold">Launch Now</span>
                    <ExternalLink className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Info */}
        <div className="text-center mt-12">
          <p className="text-gray-500 max-w-3xl mx-auto leading-relaxed">
            This MMR analysis tool provides comprehensive multi-modal reasoning with a focus on intersectional solidarity, 
            particularly in Palestine-Israel contexts. Powered by advanced AI for nuanced, thoughtful analysis.
          </p>
        </div>
      </div>
    </section>
  );
};

export default MMRLinkSection;

