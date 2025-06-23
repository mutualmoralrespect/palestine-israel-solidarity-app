import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';
import '../App.css';

const MMRInterface = () => {
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [sessionToken, setSessionToken] = useState('');

  // Generate session token on component mount
  useEffect(() => {
    const token = crypto.randomUUID();
    setSessionToken(token);
    
    // Restore state from localStorage
    restoreState();
    
    // Restore state from URL parameters
    restoreFromURL();
  }, []);

  // Save state to localStorage
  const saveState = (promptText, responseText, loading) => {
    const state = {
      prompt: promptText,
      response: responseText,
      isLoading: loading,
      sessionToken,
      timestamp: Date.now()
    };
    localStorage.setItem('mmr-app-state', JSON.stringify(state));
  };

  // Restore state from localStorage
  const restoreState = () => {
    try {
      const saved = localStorage.getItem('mmr-app-state');
      if (saved) {
        const state = JSON.parse(saved);
        // Only restore if less than 1 hour old
        if (Date.now() - state.timestamp < 3600000) {
          setPrompt(state.prompt || '');
          setResponse(state.response || '');
          setIsLoading(state.isLoading || false);
          if (state.sessionToken) {
            setSessionToken(state.sessionToken);
          }
        }
      }
    } catch (error) {
      console.error('Error restoring state:', error);
    }
  };

  // Save state to URL parameters
  const updateURL = (promptText, responseText) => {
    const params = new URLSearchParams();
    if (promptText) params.set('q', btoa(encodeURIComponent(promptText)));
    if (responseText) params.set('r', btoa(encodeURIComponent(responseText)));
    if (sessionToken) params.set('s', sessionToken);
    
    const newURL = params.toString() ? `?${params.toString()}` : window.location.pathname;
    window.history.replaceState({}, '', newURL);
  };

  // Restore state from URL parameters
  const restoreFromURL = () => {
    try {
      const params = new URLSearchParams(window.location.search);
      const encodedPrompt = params.get('q');
      const encodedResponse = params.get('r');
      const urlSessionToken = params.get('s');

      if (encodedPrompt) {
        const decodedPrompt = decodeURIComponent(atob(encodedPrompt));
        setPrompt(decodedPrompt);
      }
      
      if (encodedResponse) {
        const decodedResponse = decodeURIComponent(atob(encodedResponse));
        setResponse(decodedResponse);
      }

      if (urlSessionToken) {
        setSessionToken(urlSessionToken);
      }
    } catch (error) {
      console.error('Error restoring from URL:', error);
    }
  };

  // Enhanced submit handler with state persistence
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!prompt.trim()) return;

    setIsLoading(true);
    setResponse('');
    
    // Save state immediately when starting request
    saveState(prompt, '', true);
    updateURL(prompt, '');
    
    try {
      const response = await fetch('https://mzhyi8cqvz5e.manus.space/api/mmr/query', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          prompt,
          sessionToken // Include session token for backend tracking
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      const responseText = data.response;
      
      setResponse(responseText);
      
      // Save final state
      saveState(prompt, responseText, false);
      updateURL(prompt, responseText);
      
    } catch (error) {
      console.error('Error querying MMR model:', error);
      const errorMessage = `Error: Unable to connect to MMR model. ${error.message}\n\nPlease check your internet connection and try again.`;
      setResponse(errorMessage);
      
      // Save error state
      saveState(prompt, errorMessage, false);
      updateURL(prompt, errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  // Clear state function
  const clearState = () => {
    setPrompt('');
    setResponse('');
    setIsLoading(false);
    localStorage.removeItem('mmr-app-state');
    window.history.replaceState({}, '', window.location.pathname);
  };

  // Auto-save prompt as user types
  useEffect(() => {
    if (prompt) {
      saveState(prompt, response, isLoading);
    }
  }, [prompt]);

  return (
    <section id="mmr-section" className="min-h-screen bg-gray-50 py-16">
      {/* Red accent bar */}
      <div className="w-full h-2 bg-palestine-red mb-8"></div>
      
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-black mb-6">
            MMR Model Query System
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Interact with our MMR (Multi-Modal Reasoning) model to explore 
            intersectional perspectives and solidarity-focused insights. Ask questions, 
            seek understanding, and engage with AI that centers justice and liberation.
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="prompt" className="block text-sm font-medium text-gray-700 mb-2">
                Prompt
              </label>
              <textarea
                id="prompt"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Enter your prompt here... Ask about solidarity, intersectionality, justice, or any topic you'd like to explore through a liberation-focused lens."
                className="w-full h-32 p-4 border border-gray-300 rounded-md focus:ring-2 focus:ring-palestine-green focus:border-transparent resize-none"
                disabled={isLoading}
              />
            </div>

            <div className="flex gap-4">
              <Button 
                type="submit" 
                disabled={isLoading || !prompt.trim()}
                className="flex-1 bg-palestine-green hover:bg-green-700 text-white py-3 text-lg font-semibold disabled:opacity-50"
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Processing...
                  </div>
                ) : (
                  'Submit Query'
                )}
              </Button>
              
              {(prompt || response) && (
                <Button 
                  type="button"
                  onClick={clearState}
                  variant="outline"
                  className="px-6 py-3 border-gray-300 text-gray-700 hover:bg-gray-50"
                >
                  Clear
                </Button>
              )}
            </div>
          </form>

          {(response || isLoading) && (
            <div className="mt-8">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Response
              </label>
              <div className="bg-gray-50 border border-gray-200 rounded-md p-6 min-h-[200px]">
                {isLoading ? (
                  <div className="flex items-center justify-center h-32">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-palestine-green"></div>
                  </div>
                ) : (
                  <div className="whitespace-pre-wrap text-gray-800 leading-relaxed">
                    {response}
                  </div>
                )}
              </div>
            </div>
          )}

          {sessionToken && (
            <div className="mt-4 text-xs text-gray-500 text-center">
              Session: {sessionToken.slice(0, 8)}... | State automatically saved
            </div>
          )}
        </div>

        <div className="text-center mt-8 text-gray-600">
          <p>
            This interface connects to an MMR model designed with intersectional solidarity principles. 
            All interactions are processed with respect for human dignity and liberation.
          </p>
        </div>
      </div>
    </section>
  );
};

export default MMRInterface;

