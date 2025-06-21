import React, { useState, useEffect, useRef } from 'react';
import { Button } from './ui/button';
import { Send, MoreHorizontal, Loader2, Brain, Sparkles, MessageCircle, Clock, CheckCircle2 } from 'lucide-react';
import '../App.css';

const ChatInterface = () => {
  const [messages, setMessages] = useState([]);
  const [currentInput, setCurrentInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isThinking, setIsThinking] = useState(false);
  const [sessionToken, setSessionToken] = useState('');
  const [contextUsed, setContextUsed] = useState([]);
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

  // Enhanced markdown formatting with modern styling
  const formatResponse = (text) => {
    let formatted = text
      .replace(/\*\*(.*?)\*\*/g, '<strong class="font-bold text-gray-900">$1</strong>')
      .replace(/\*(.*?)\*/g, '<em class="italic text-blue-700">$1</em>')
      .replace(/`(.*?)`/g, '<code class="bg-gray-100 px-2 py-1 rounded text-sm font-mono text-red-600">$1</code>')
      .replace(/^### (.*$)/gm, '<h3 class="text-lg font-bold text-green-700 mt-4 mb-2">$1</h3>')
      .replace(/^## (.*$)/gm, '<h2 class="text-xl font-bold text-red-600 mt-6 mb-3 border-b-2 border-red-200 pb-1">$1</h2>')
      .replace(/^# (.*$)/gm, '<h1 class="text-2xl font-bold text-blue-700 mt-6 mb-4 border-b-2 border-blue-200 pb-2">$1</h1>')
      .replace(/^- (.*$)/gm, '<li class="ml-4 mb-1 text-gray-700">$1</li>')
      .replace(/\n\n/g, '</p><p class="mb-3 text-gray-800 leading-relaxed">')
      .replace(/^(.+)$/gm, '<p class="mb-3 text-gray-800 leading-relaxed">$1</p>');

    // Wrap lists with modern styling
    formatted = formatted.replace(/(<li>.*<\/li>)/gs, '<ul class="list-disc list-inside space-y-1 my-3 ml-2">$1</ul>');
    
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

    // Show which previous messages will be used for context
    const contextMessages = messages.slice(-3);
    setContextUsed(contextMessages.map(m => m.id));

    saveConversation(newMessages);

    try {
      // Simulate thinking time for better UX
      await new Promise(resolve => setTimeout(resolve, 1200));
      setIsThinking(false);

      const response = await fetch('https://y0h0i3cylxp3.manus.space/api/mmr/query', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          prompt: userMessage.content,
          sessionToken,
          conversationHistory: contextMessages
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
        model: data.model || 'MMR-Solidarity',
        contextUsed: contextMessages.length
      };

      const finalMessages = [...newMessages, assistantMessage];
      setMessages(finalMessages);
      saveConversation(finalMessages);
      setContextUsed([]);
      
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
      setContextUsed([]);
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
      await new Promise(resolve => setTimeout(resolve, 800));
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
          ? { ...m, content: m.content + '\n\n---\n\n**Continued Analysis:**\n\n' + data.response }
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
    setContextUsed([]);
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

        {/* Modern Chat Container with Clear Flow */}
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 overflow-hidden">
          
          {/* Conversation Status Bar */}
          {messages.length > 0 && (
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 px-6 py-3 border-b border-gray-100">
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center space-x-2">
                  <MessageCircle className="w-4 h-4 text-blue-500" />
                  <span className="text-gray-600 font-medium">
                    {messages.length} messages • Session: {sessionToken.slice(0, 8)}...
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-green-500" />
                  <span className="text-gray-600">Context aware</span>
                </div>
              </div>
            </div>
          )}

          {/* Messages Area with Clear Visual Flow */}
          <div className="h-[600px] overflow-y-auto p-6 space-y-6 bg-gradient-to-b from-white/50 to-gray-50/50">
            
            {/* Welcome State */}
            {messages.length === 0 && (
              <div className="text-center py-16">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Brain className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4">Start a conversation with the MMR model</h3>
                <p className="text-gray-600 max-w-md mx-auto">Ask about solidarity, justice, current events, or any topic you'd like to explore with intersectional analysis.</p>
                <div className="mt-6 text-sm text-gray-500">
                  <p>💡 Your messages appear on the right, AI responses on the left</p>
                  <p>🧠 The AI remembers your recent conversation context</p>
                </div>
              </div>
            )}
            
            {/* Message Flow */}
            {messages.map((message, index) => (
              <div key={message.id} className="fade-in-up">
                
                {/* Context Indicator for AI Messages */}
                {message.type === 'assistant' && message.contextUsed > 0 && (
                  <div className="flex justify-start mb-2">
                    <div className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-xs font-medium flex items-center space-x-1">
                      <Clock className="w-3 h-3" />
                      <span>Used context from {message.contextUsed} previous messages</span>
                    </div>
                  </div>
                )}

                {/* Message Bubble */}
                <div className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-4xl px-6 py-4 rounded-2xl ${
                    message.type === 'user'
                      ? 'chat-bubble-user text-white shadow-lg ml-12'
                      : message.type === 'error'
                      ? 'bg-red-50 text-red-800 border border-red-200 shadow-sm mr-12'
                      : 'chat-bubble-assistant text-gray-800 mr-12'
                  }`}>
                    
                    {/* Message Content */}
                    {message.type === 'assistant' ? (
                      <div>
                        <div 
                          className="markdown-response text-base leading-relaxed"
                          dangerouslySetInnerHTML={{ __html: formatResponse(message.content) }}
                        />
                        
                        {/* AI Message Footer */}
                        <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-100">
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

                {/* Context Usage Indicator */}
                {contextUsed.includes(message.id) && (
                  <div className="flex justify-start mt-2">
                    <div className="bg-yellow-50 text-yellow-700 px-3 py-1 rounded-full text-xs font-medium flex items-center space-x-1">
                      <Brain className="w-3 h-3" />
                      <span>Being used as context for next response</span>
                    </div>
                  </div>
                )}
              </div>
            ))}
            
            {/* Enhanced Loading Indicator with Clear Positioning */}
            {isLoading && (
              <div className="flex justify-start fade-in-up">
                <div className="chat-bubble-assistant max-w-xs mr-12">
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

          {/* Modern Input Area with Clear Instructions */}
          <div className="border-t border-gray-200/50 p-6 bg-white/90 backdrop-blur-sm">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="flex space-x-4">
                <input
                  type="text"
                  value={currentInput}
                  onChange={(e) => setCurrentInput(e.target.value)}
                  placeholder="Type your message here... (Your message will appear on the right)"
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
              </div>
              
              {/* Input Helper Text */}
              <div className="flex justify-between items-center text-sm text-gray-500">
                <div className="flex items-center space-x-4">
                  <span>💬 Your messages appear on the right</span>
                  <span>🤖 AI responses appear on the left</span>
                  {messages.length > 0 && (
                    <span>🧠 Last {Math.min(3, messages.length)} messages used as context</span>
                  )}
                </div>
                {messages.length > 0 && (
                  <Button
                    onClick={clearConversation}
                    variant="ghost"
                    size="sm"
                    className="text-sm h-8 hover:bg-red-50 hover:text-red-600 rounded-xl"
                  >
                    Clear Chat
                  </Button>
                )}
              </div>
            </form>
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

