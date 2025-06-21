import React, { useState, useEffect, useRef } from 'react';
import { Button } from './ui/button';
import { Send, MoreHorizontal } from 'lucide-react';
import '../App.css';

const ChatInterface = () => {
  const [messages, setMessages] = useState([]);
  const [currentInput, setCurrentInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [sessionToken, setSessionToken] = useState('');
  const messagesEndRef = useRef(null);

  // Generate session token on component mount
  useEffect(() => {
    const token = crypto.randomUUID();
    setSessionToken(token);
    
    // Restore conversation from localStorage
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
        // Only restore if less than 24 hours old
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

  // Format response with markdown-like styling
  const formatResponse = (text) => {
    // Simple markdown-like formatting
    let formatted = text
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/`(.*?)`/g, '<code>$1</code>')
      .replace(/^### (.*$)/gm, '<h3>$1</h3>')
      .replace(/^## (.*$)/gm, '<h2>$1</h2>')
      .replace(/^# (.*$)/gm, '<h1>$1</h1>')
      .replace(/^- (.*$)/gm, '<li>$1</li>')
      .replace(/\n\n/g, '</p><p>')
      .replace(/^(.+)$/gm, '<p>$1</p>');

    // Wrap lists
    formatted = formatted.replace(/(<li>.*<\/li>)/gs, '<ul>$1</ul>');
    
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

    // Save conversation immediately
    saveConversation(newMessages);

    try {
      const response = await fetch('https://mzhyi8cqvz5e.manus.space/api/mmr/query', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          prompt: userMessage.content,
          sessionToken,
          conversationHistory: messages.slice(-5) // Send last 5 messages for context
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
    }
  };

  const clearConversation = () => {
    setMessages([]);
    localStorage.removeItem('mmr-conversation');
  };

  const continueResponse = async (messageId) => {
    const message = messages.find(m => m.id === messageId);
    if (!message) return;

    setIsLoading(true);
    
    try {
      const response = await fetch('https://mzhyi8cqvz5e.manus.space/api/mmr/query', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          prompt: "Please continue your previous response with more details.",
          sessionToken,
          conversationHistory: messages.slice(-3),
          continueFrom: message.content
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      
      // Update the existing message with continued content
      const updatedMessages = messages.map(m => 
        m.id === messageId 
          ? { ...m, content: m.content + '\n\n' + data.response }
          : m
      );
      
      setMessages(updatedMessages);
      saveConversation(updatedMessages);
      
    } catch (error) {
      console.error('Error continuing response:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section id="mmr-section" className="min-h-screen bg-gray-50 py-8">
      {/* Header */}
      <div className="w-full h-2 bg-palestine-red mb-8"></div>
      
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-black mb-4">
            MMR Conversation Interface
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Engage in meaningful dialogue with our MMR model designed for intersectional solidarity and justice-centered responses.
          </p>
        </div>

        {/* Chat Container */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          {/* Messages Area */}
          <div className="h-96 overflow-y-auto p-4 space-y-4 bg-gray-50">
            {messages.length === 0 && (
              <div className="text-center text-gray-500 py-8">
                <p>Start a conversation with the MMR model...</p>
                <p className="text-sm mt-2">Ask about solidarity, justice, current events, or any topic you'd like to explore.</p>
              </div>
            )}
            
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-xs lg:max-w-md px-4 py-3 rounded-lg ${
                    message.type === 'user'
                      ? 'bg-palestine-green text-white'
                      : message.type === 'error'
                      ? 'bg-red-100 text-red-800 border border-red-200'
                      : 'bg-white text-gray-800 border border-gray-200 shadow-sm'
                  }`}
                >
                  {message.type === 'assistant' ? (
                    <div>
                      <div 
                        className="markdown-response text-sm leading-relaxed"
                        dangerouslySetInnerHTML={{ __html: formatResponse(message.content) }}
                      />
                      <div className="flex items-center justify-between mt-3 pt-2 border-t border-gray-100">
                        <span className="text-xs text-gray-500">
                          {message.model}
                        </span>
                        <Button
                          onClick={() => continueResponse(message.id)}
                          disabled={isLoading}
                          variant="ghost"
                          size="sm"
                          className="text-xs h-6 px-2"
                        >
                          <MoreHorizontal className="w-3 h-3 mr-1" />
                          Continue
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <p className="text-sm">{message.content}</p>
                  )}
                  
                  <div className="text-xs opacity-70 mt-1">
                    {new Date(message.timestamp).toLocaleTimeString()}
                  </div>
                </div>
              </div>
            ))}
            
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white border border-gray-200 rounded-lg px-4 py-3 shadow-sm">
                  <div className="flex items-center space-x-2">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-palestine-green"></div>
                    <span className="text-sm text-gray-600">MMR is thinking...</span>
                  </div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="border-t border-gray-200 p-4 bg-white">
            <form onSubmit={handleSubmit} className="flex space-x-3">
              <input
                type="text"
                value={currentInput}
                onChange={(e) => setCurrentInput(e.target.value)}
                placeholder="Ask about solidarity, current events, or any topic..."
                className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-palestine-green focus:border-transparent"
                disabled={isLoading}
              />
              <Button
                type="submit"
                disabled={isLoading || !currentInput.trim()}
                className="bg-palestine-green hover:bg-green-700 text-white px-4 py-2"
              >
                <Send className="w-4 h-4" />
              </Button>
            </form>
            
            {messages.length > 0 && (
              <div className="flex justify-between items-center mt-3 text-xs text-gray-500">
                <span>Session: {sessionToken.slice(0, 8)}...</span>
                <Button
                  onClick={clearConversation}
                  variant="ghost"
                  size="sm"
                  className="text-xs h-6"
                >
                  Clear Chat
                </Button>
              </div>
            )}
          </div>
        </div>

        <div className="text-center mt-6 text-gray-600 text-sm">
          <p>
            This interface connects to an MMR model designed with intersectional solidarity principles. 
            All conversations are processed with respect for human dignity and liberation.
          </p>
        </div>
      </div>
    </section>
  );
};

export default ChatInterface;

