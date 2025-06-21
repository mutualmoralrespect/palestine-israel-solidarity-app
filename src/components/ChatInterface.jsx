import React, { useState, useEffect, useRef } from 'react';
import { Button } from './ui/button';
import { Send, MoreHorizontal, Loader2, Brain, Sparkles } from 'lucide-react';
import '../App.css';

const ChatInterface = () => {
  const [messages, setMessages] = useState([]);
  const [currentInput, setCurrentInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isThinking, setIsThinking] = useState(false);
  const [sessionToken, setSessionToken] = useState('');
  const messagesEndRef = useRef(null);

  // Generate session token on component mount
  useEffect(() => {
    const token = crypto.randomUUID();
    setSessionToken(token);
    restoreConversation();
  }, []);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Save conversation to localStorage
  const saveConversation = (newMessages) => {
    const conversationData = {
      messages: newMessages,
      sessionToken,
      timestamp: Date.now()
    };
    localStorage.setItem('mmr-conversation', JSON.stringify(conversationData));
  };

  // Restore conversation from localStorage
  const restoreConversation = () => {
    try {
      const saved = localStorage.getItem('mmr-conversation');
      if (saved) {
        const data = JSON.parse(saved);
        if (Date.now() - data.timestamp < 86400000) {
          setMessages(data.messages || []);
          if (data.sessionToken) {
            setSessionToken(data.sessionToken);
          }
        }
      }
    } catch (error) {
      console.error('Error restoring conversation:', error);
    }
  };

  // Enhanced markdown formatting with modern styling and better colors
  const formatResponse = (text) => {
    let formatted = text
      // Headers with coding-inspired colors
      .replace(/^# (.*$)/gm, '<h1 class="text-3xl font-bold text-blue-800 mt-8 mb-6 border-b-4 border-blue-200 pb-3">$1</h1>')
      .replace(/^## (.*$)/gm, '<h2 class="text-2xl font-bold text-green-700 mt-6 mb-4 border-b-2 border-green-200 pb-2">$1</h2>')
      .replace(/^### (.*$)/gm, '<h3 class="text-xl font-semibold text-purple-700 mt-5 mb-3">$1</h3>')
      .replace(/^#### (.*$)/gm, '<h4 class="text-lg font-semibold text-red-600 mt-4 mb-2">$1</h4>')
      
      // Bold and italic with better contrast
      .replace(/\*\*(.*?)\*\*/g, '<strong class="font-bold text-gray-900 bg-yellow-50 px-1 rounded">$1</strong>')
      .replace(/\*(.*?)\*/g, '<em class="italic text-blue-700 font-medium">$1</em>')
      
      // Code blocks with syntax highlighting colors
      .replace(/`(.*?)`/g, '<code class="bg-gray-800 text-green-400 px-2 py-1 rounded text-sm font-mono border">$1</code>')
      
      // Lists with better spacing
      .replace(/^- (.*$)/gm, '<li class="ml-6 mb-2 text-gray-800 leading-relaxed">• $1</li>')
      
      // Paragraphs with better typography
      .replace(/\n\n/g, '</p><p class="mb-4 text-gray-800 leading-relaxed text-lg">')
      .replace(/^(.+)$/gm, '<p class="mb-4 text-gray-800 leading-relaxed text-lg">$1</p>');

    // Wrap lists with modern styling
    formatted = formatted.replace(/(<li>.*<\/li>)/gs, '<ul class="list-none space-y-2 my-6 ml-4 border-l-4 border-blue-200 pl-6">$1</ul>');
    
    // Add section dividers
    formatted = formatted.replace(/---/g, '<hr class="my-8 border-t-2 border-gray-200" />');
    
    return formatted;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!currentInput.trim() || isLoading) return;

    const userMessage = {
      id: Date.now(),
      type: 'user',
      content: currentInput.trim(),
      timestamp: new Date().toISOString()
    };

    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setCurrentInput('');
    setIsLoading(true);
    setIsThinking(true);

    saveConversation(newMessages);

    try {
      // Simulate thinking time for better UX
      await new Promise(resolve => setTimeout(resolve, 800));
      setIsThinking(false);

      const response = await fetch('https://y0h0i3cylxp3.manus.space/api/mmr/query', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          prompt: userMessage.content,
          sessionToken,
          conversationHistory: messages.slice(-5)
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      
      const assistantMessage = {
        id: Date.now() + 1,
        type: 'assistant',
        content: data.response,
        timestamp: new Date().toISOString(),
        model: data.model || 'MMR-Solidarity'
      };

      const finalMessages = [...newMessages, assistantMessage];
      setMessages(finalMessages);
      saveConversation(finalMessages);
      
    } catch (error) {
      console.error('Error querying MMR model:', error);
      const errorMessage = {
        id: Date.now() + 1,
        type: 'error',
        content: `Unable to connect to MMR model: ${error.message}`,
        timestamp: new Date().toISOString()
      };
      
      const finalMessages = [...newMessages, errorMessage];
      setMessages(finalMessages);
      saveConversation(finalMessages);
    } finally {
      setIsLoading(false);
      setIsThinking(false);
    }
  };

  const continueResponse = async (messageId) => {
    const message = messages.find(m => m.id === messageId);
    if (!message) return;

    setIsLoading(true);
    setIsThinking(true);
    
    try {
      // Enhanced continue prompt for deeper reasoning
      await new Promise(resolve => setTimeout(resolve, 600));
      setIsThinking(false);

      const response = await fetch('https://y0h0i3cylxp3.manus.space/api/mmr/query', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          prompt: `Please continue your previous analysis with deeper insights, additional perspectives, and more detailed examination. Expand on the key points and provide further context that would be valuable for understanding this topic more comprehensively.`,
          sessionToken,
          conversationHistory: messages.slice(-3),
          continueFrom: message.content
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      
      const updatedMessages = messages.map(m => 
        m.id === messageId 
          ? { ...m, content: m.content + '\n\n---\n\n' + data.response }
          : m
      );
      
      setMessages(updatedMessages);
      saveConversation(updatedMessages);
      
    } catch (error) {
      console.error('Error continuing response:', error);
    } finally {
      setIsLoading(false);
      setIsThinking(false);
    }
  };

  const clearConversation = () => {
    setMessages([]);
    localStorage.removeItem('mmr-conversation');
  };

  return (
    <section id="mmr-section" className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 py-16">
      {/* Modern Header with Gradient */}
      <div className="w-full h-1 bg-gradient-to-r from-red-500 via-green-500 to-blue-500 mb-12"></div>
      
      <div className="container mx-auto px-6 max-w-6xl">
        {/* Modern Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-5xl md:text-6xl font-black bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-6">
            MMR Conversation Interface
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Engage in meaningful dialogue with our MMR model designed for intersectional solidarity and justice-centered responses.
          </p>
        </div>

        {/* Modern Chat Container with Glassmorphism */}
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 overflow-hidden">
          {/* Messages Area with Modern Styling */}
          <div className="h-[600px] overflow-y-auto p-8 space-y-6 bg-gradient-to-b from-white/50 to-gray-50/50">
            {messages.length === 0 && (
              <div className="text-center py-16">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Brain className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4">Start a conversation with the MMR model</h3>
                <p className="text-gray-600 max-w-md mx-auto">Ask about solidarity, justice, current events, or any topic you'd like to explore with intersectional analysis.</p>
              </div>
            )}
            
            {messages.map((message) => (
              <div key={message.id} className="w-full">
                {message.type === 'user' ? (
                  // User message - compact on right
                  <div className="flex justify-end mb-6">
                    <div className="max-w-2xl px-6 py-4 rounded-2xl bg-gradient-to-r from-green-500 to-green-600 text-white shadow-lg">
                      <p className="text-base font-medium">{message.content}</p>
                      <div className="text-xs opacity-70 mt-3 font-medium">
                        {new Date(message.timestamp).toLocaleTimeString()}
                      </div>
                    </div>
                  </div>
                ) : (
                  // Assistant message - full width for markdown
                  <div className="w-full mb-8">
                    <div className={`w-full px-8 py-6 rounded-2xl ${
                      message.type === 'error'
                        ? 'bg-red-50 text-red-800 border border-red-200 shadow-sm'
                        : 'bg-white text-gray-800 border border-gray-100 shadow-lg'
                    }`}>
                      {message.type === 'assistant' ? (
                        <div>
                          <div 
                            className="markdown-response prose prose-lg max-w-none"
                            dangerouslySetInnerHTML={{ __html: formatResponse(message.content) }}
                          />
                          <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-100">
                            <div className="flex items-center space-x-2">
                              <Sparkles className="w-4 h-4 text-blue-500" />
                              <span className="text-sm text-gray-500 font-medium">
                                {message.model}
                              </span>
                              <span className="text-xs text-gray-400">
                                {new Date(message.timestamp).toLocaleTimeString()}
                              </span>
                            </div>
                            <Button
                              onClick={() => continueResponse(message.id)}
                              disabled={isLoading}
                              variant="ghost"
                              size="sm"
                              className="text-sm h-8 px-4 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-xl"
                            >
                              <MoreHorizontal className="w-4 h-4 mr-2" />
                              Continue Analysis
                            </Button>
                          </div>
                        </div>
                      ) : (
                        <div>
                          <p className="text-base font-medium">{message.content}</p>
                          <div className="text-xs opacity-70 mt-3 font-medium">
                            {new Date(message.timestamp).toLocaleTimeString()}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            ))}
            
            {/* Enhanced Loading Indicator */}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white border border-gray-200 rounded-2xl px-6 py-4 shadow-lg max-w-xs">
                  <div className="flex items-center space-x-3">
                    {isThinking ? (
                      <>
                        <Brain className="w-5 h-5 text-purple-500 animate-pulse" />
                        <span className="text-sm text-gray-600 font-medium">MMR is thinking deeply...</span>
                      </>
                    ) : (
                      <>
                        <Loader2 className="w-5 h-5 text-blue-500 animate-spin" />
                        <span className="text-sm text-gray-600 font-medium">Generating response...</span>
                      </>
                    )}
                  </div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          {/* Modern Input Area */}
          <div className="border-t border-gray-200/50 p-6 bg-white/90 backdrop-blur-sm">
            <form onSubmit={handleSubmit} className="flex space-x-4">
              <input
                type="text"
                value={currentInput}
                onChange={(e) => setCurrentInput(e.target.value)}
                placeholder="Ask about solidarity, current events, or any topic..."
                className="flex-1 border border-gray-300 rounded-2xl px-6 py-4 text-base focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white/80 backdrop-blur-sm"
                disabled={isLoading}
              />
              <Button
                type="submit"
                disabled={isLoading || !currentInput.trim()}
                className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-8 py-4 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <Send className="w-5 h-5" />
              </Button>
            </form>
            
            {messages.length > 0 && (
              <div className="flex justify-between items-center mt-4 text-sm text-gray-500">
                <span className="font-medium">Session: {sessionToken.slice(0, 8)}...</span>
                <Button
                  onClick={clearConversation}
                  variant="ghost"
                  size="sm"
                  className="text-sm h-8 hover:bg-red-50 hover:text-red-600 rounded-xl"
                >
                  Clear Chat
                </Button>
              </div>
            )}
          </div>
        </div>

        <div className="text-center mt-8 text-gray-600">
          <p className="text-base leading-relaxed max-w-3xl mx-auto">
            This interface connects to an MMR model designed with intersectional solidarity principles. 
            All conversations are processed with respect for human dignity and liberation.
          </p>
        </div>
      </div>
    </section>
  );
};

export default ChatInterface;

