import React, { useState } from 'react';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Loader2 } from 'lucide-react';
import '../App.css';

const MMRInterface = () => {
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!prompt.trim()) return;

    setIsLoading(true);
    
    try {
      const response = await fetch('https://mzhyi8cqvz5e.manus.space/api/mmr/query', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt: prompt.trim() }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setResponse(data.response);
    } catch (error) {
      console.error('Error querying MMR model:', error);
      setResponse(`Error: Unable to connect to MMR model. ${error.message}\n\nPlease check your internet connection and try again.`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section id="mmr-section" className="min-h-screen bg-palestine-light-gray py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <div className="w-full h-2 bg-palestine-red mb-8"></div>
            <h2 className="text-4xl md:text-6xl font-bold palestine-black mb-4">
              MMR Model Query System
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Interact with our MMR (Multi-Modal Reasoning) model to explore intersectional perspectives 
              and solidarity-focused insights. Ask questions, seek understanding, and engage with AI 
              that centers justice and liberation.
            </p>
          </div>

          <Card className="bg-white shadow-lg border-0">
            <CardHeader>
              <CardTitle className="text-2xl palestine-black">Query Interface</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="prompt" className="block text-lg font-medium palestine-black mb-2">
                    Prompt
                  </label>
                  <Textarea
                    id="prompt"
                    placeholder="Enter your prompt here... Ask about solidarity, intersectionality, justice, or any topic you'd like to explore through a liberation-focused lens."
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    className="min-h-[120px] text-base border-2 focus:border-palestine-red"
                    disabled={isLoading}
                  />
                </div>
                
                <Button 
                  type="submit" 
                  disabled={!prompt.trim() || isLoading}
                  className="w-full bg-palestine-green hover:bg-green-700 text-white text-lg py-3"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    'Submit Query'
                  )}
                </Button>
              </form>

              {(response || isLoading) && (
                <div>
                  <label className="block text-lg font-medium palestine-black mb-2">
                    Response
                  </label>
                  <div className="min-h-[200px] p-4 border-2 border-gray-200 rounded-md bg-gray-50">
                    {isLoading ? (
                      <div className="flex items-center justify-center h-full">
                        <Loader2 className="h-8 w-8 animate-spin palestine-green" />
                      </div>
                    ) : (
                      <pre className="whitespace-pre-wrap text-sm text-gray-800 font-mono">
                        {response}
                      </pre>
                    )}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          <div className="mt-12 text-center">
            <p className="text-sm text-gray-500">
              This interface connects to an MMR model designed with intersectional solidarity principles. 
              All interactions are processed with respect for human dignity and liberation.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MMRInterface;

