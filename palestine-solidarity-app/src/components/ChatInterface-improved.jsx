import React, { useState, useEffect, useRef } from 'react';
import { Send, RotateCcw, Clock, Wifi, WifiOff } from 'lucide-react';
import { Button } from './ui/button';
import '../App.css';

const ChatInterface = () => {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [sessionId] = useState(() => `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`);
  const [startTime, setStartTime] = useState(null);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [retryCount, setRetryCount] = useState(0);
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const messagesEndRef = useRef(null);
  const timerRef = useRef(null);

  // Network status monitoring
  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // Timer for tracking response time
  useEffect(() => {
    if (isLoading && startTime) {
      timerRef.current = setInterval(() => {
        setElapsedTime(Date.now() - startTime);
      }, 100);
    } else {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [isLoading, startTime]);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Load saved messages
  useEffect(() => {
    const savedMessages = localStorage.getItem(`chat_${sessionId}`);
    if (savedMessages) {
      setMessages(JSON.parse(savedMessages));
    }
  }, [sessionId]);

  // Save messages
  useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem(`chat_${sessionId}`, JSON.stringify(messages));
    }
  }, [messages, sessionId]);

  const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

  const makeAPIRequest = async (prompt, attempt = 1) => {
    const maxRetries = 3;
    const baseDelay = 1000; // 1 second base delay
    
    try {
      const response = await fetch('https://g8h3ilc78kvn.manus.space/api/mmr/query', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt: prompt,
          conversationHistory: messages.slice(-5), // Last 5 messages for context
          timestamp: Date.now()
        }),
        // Add timeout
        signal: AbortSignal.timeout(30000) // 30 second timeout
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      return data;
      
    } catch (error) {
      console.error(`API request attempt ${attempt} failed:`, error);
      
      if (attempt < maxRetries) {
        // Exponential backoff: 1s, 2s, 4s
        const delay = baseDelay * Math.pow(2, attempt - 1);
        console.log(`Retrying in ${delay}ms... (attempt ${attempt + 1}/${maxRetries})`);
        
        await sleep(delay);
        return makeAPIRequest(prompt, attempt + 1);
      } else {
        // All retries failed
        throw new Error(`Failed after ${maxRetries} attempts: ${error.message}`);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!inputValue.trim() || isLoading) return;

    if (!isOnline) {
      addErrorMessage("No internet connection. Please check your network and try again.");
      return;
    }

    const userMessage = {
      id: Date.now(),
      text: inputValue,
      sender: 'user',
      timestamp: new Date().toLocaleTimeString()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);
    setStartTime(Date.now());
    setRetryCount(0);

    try {
      const data = await makeAPIRequest(inputValue);
      
      const aiMessage = {
        id: Date.now() + 1,
        text: data.response,
        sender: 'ai',
        timestamp: new Date().toLocaleTimeString(),
        model: data.model || 'MMR',
        responseTime: elapsedTime
      };

      setMessages(prev => [...prev, aiMessage]);
      
    } catch (error) {
      console.error('Error:', error);
      addErrorMessage(`Unable to connect to MMR model: ${error.message}`);
    } finally {
      setIsLoading(false);
      setStartTime(null);
      setElapsedTime(0);
    }
  };

  const addErrorMessage = (errorText) => {
    const errorMessage = {
      id: Date.now(),
      text: errorText,
      sender: 'error',
      timestamp: new Date().toLocaleTimeString(),
      canRetry: true
    };
    setMessages(prev => [...prev, errorMessage]);
  };

  const retryLastMessage = async () => {
    // Find the last user message
    const lastUserMessage = [...messages].reverse().find(msg => msg.sender === 'user');
    if (!lastUserMessage) return;

    // Remove error messages after the last user message
    const lastUserIndex = messages.findIndex(msg => msg.id === lastUserMessage.id);
    const cleanMessages = messages.slice(0, lastUserIndex + 1);
    setMessages(cleanMessages);

    // Retry the request
    setIsLoading(true);
    setStartTime(Date.now());
    setRetryCount(prev => prev + 1);

    try {
      const data = await makeAPIRequest(lastUserMessage.text);
      
      const aiMessage = {
        id: Date.now(),
        text: data.response,
        sender: 'ai',
        timestamp: new Date().toLocaleTimeString(),
        model: data.model || 'MMR',
        responseTime: elapsedTime,
        retryAttempt: retryCount + 1
      };

      setMessages(prev => [...prev, aiMessage]);
      
    } catch (error) {
      console.error('Retry failed:', error);
      addErrorMessage(`Retry failed: ${error.message}`);
    } finally {
      setIsLoading(false);
      setStartTime(null);
      setElapsedTime(0);
    }
  };

  const clearChat = () => {
    setMessages([]);
    localStorage.removeItem(`chat_${sessionId}`);
  };

  const formatElapsedTime = (ms) => {
    const seconds = Math.floor(ms / 1000);
    const milliseconds = Math.floor((ms % 1000) / 100);
    return `${seconds}.${milliseconds}s`;
  };

  const renderMessage = (message) => {
    if (message.sender === 'user') {
      return (
        <div key={message.id} className="flex justify-end mb-4">
          <div className="bg-gradient-to-r from-green-500 to-green-600 text-white p-4 rounded-2xl rounded-br-md max-w-xs md:max-w-md shadow-lg">
            <div className="font-medium">{message.text}</div>
            <div className="text-xs text-green-100 mt-2">{message.timestamp}</div>
          </div>
        </div>
      );
    } else if (message.sender === 'error') {
      return (
        <div key={message.id} className="flex justify-start mb-4">
          <div className="bg-red-50 border border-red-200 text-red-800 p-4 rounded-2xl rounded-bl-md max-w-xs md:max-w-md shadow-lg">
            <div className="flex items-center gap-2 mb-2">
              <WifiOff className="w-4 h-4" />
              <span className="font-medium text-sm">Connection Error</span>
            </div>
            <div className="text-sm">{message.text}</div>
            <div className="flex items-center justify-between mt-3">
              <div className="text-xs text-red-600">{message.timestamp}</div>
              {message.canRetry && (
                <Button
                  onClick={retryLastMessage}
                  size="sm"
                  variant="outline"
                  className="text-red-600 border-red-300 hover:bg-red-50"
                  disabled={isLoading}
                >
                  <RotateCcw className="w-3 h-3 mr-1" />
                  Retry
                </Button>
              )}
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div key={message.id} className="flex justify-start mb-4">
          <div className="bg-white border border-gray-200 p-4 rounded-2xl rounded-bl-md max-w-xs md:max-w-lg shadow-lg">
            <div className="prose prose-sm max-w-none">
              <div dangerouslySetInnerHTML={{ 
                __html: message.text.replace(/\n/g, '<br>').replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/\*(.*?)\*/g, '<em>$1</em>')
              }} />
            </div>
            <div className="flex items-center justify-between mt-3 pt-2 border-t border-gray-100">
              <div className="text-xs text-gray-500">{message.timestamp}</div>
              <div className="flex items-center gap-2 text-xs text-gray-400">
                {message.responseTime && (
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {formatElapsedTime(message.responseTime)}
                  </span>
                )}
                {message.retryAttempt && (
                  <span className="text-orange-500">Retry #{message.retryAttempt}</span>
                )}
                <span>{message.model}</span>
              </div>
            </div>
          </div>
        </div>
      );
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-xl shadow-lg">
      {/* Header */}
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-200">
        <div className="flex items-center gap-3">
          <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
          <span className="text-sm text-gray-600">
            {messages.length} messages • Session: {sessionId.slice(-8)}...
          </span>
        </div>
        <div className="flex items-center gap-3">
          <div className={`flex items-center gap-1 text-xs ${isOnline ? 'text-green-600' : 'text-red-600'}`}>
            {isOnline ? <Wifi className="w-3 h-3" /> : <WifiOff className="w-3 h-3" />}
            {isOnline ? 'Online' : 'Offline'}
          </div>
          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
          <span className="text-xs text-green-600">Context aware</span>
        </div>
      </div>

      {/* Messages */}
      <div className="h-96 overflow-y-auto mb-6 space-y-4">
        {messages.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-white text-2xl">🧠</span>
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Start a conversation with the MMR model</h3>
            <p className="text-gray-600 mb-4">Ask about solidarity, justice, current events, or any topic you'd like to explore with intersectional analysis.</p>
            <div className="space-y-2 text-sm text-gray-500">
              <div className="flex items-center justify-center gap-2">
                <span>💡</span>
                <span>Your messages appear on the right, AI responses on the left</span>
              </div>
              <div className="flex items-center justify-center gap-2">
                <span>🧠</span>
                <span>The AI remembers your recent conversation context</span>
              </div>
            </div>
          </div>
        ) : (
          messages.map(renderMessage)
        )}
        
        {/* Loading indicator */}
        {isLoading && (
          <div className="flex justify-start mb-4">
            <div className="bg-gray-50 border border-gray-200 p-4 rounded-2xl rounded-bl-md max-w-xs shadow-lg">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                <span className="text-sm text-gray-600">MMR is thinking deeply...</span>
              </div>
              {elapsedTime > 0 && (
                <div className="text-xs text-gray-400 mt-2 flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {formatElapsedTime(elapsedTime)} elapsed
                  {retryCount > 0 && <span className="text-orange-500">• Retry #{retryCount}</span>}
                </div>
              )}
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Input form */}
      <form onSubmit={handleSubmit} className="flex gap-3">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Type your message here... (Your message will appear on the right)"
          className="flex-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          disabled={isLoading || !isOnline}
        />
        <Button 
          type="submit" 
          disabled={isLoading || !inputValue.trim() || !isOnline}
          className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-6"
        >
          {isLoading ? (
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
          ) : (
            <Send className="w-4 h-4" />
          )}
        </Button>
      </form>

      {/* Footer */}
      <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100 text-xs text-gray-500">
        <div className="flex items-center gap-4">
          <span>💬 Your messages appear on the right</span>
          <span>🤖 AI responses appear on the left</span>
          <span>❤️ Last {Math.min(messages.filter(m => m.sender === 'user').length, 5)} messages used as context</span>
        </div>
        <Button
          onClick={clearChat}
          variant="outline"
          size="sm"
          className="text-orange-600 border-orange-300 hover:bg-orange-50"
        >
          Clear Chat
        </Button>
      </div>
    </div>
  );
};

export default ChatInterface;

