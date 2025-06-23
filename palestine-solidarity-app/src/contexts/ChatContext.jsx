import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';

const ChatContext = createContext();

export const useChat = () => {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error('useChat must be used within a ChatProvider');
  }
  return context;
};

export const ChatProvider = ({ children }) => {
  const { user } = useAuth();
  const [chats, setChats] = useState([]);
  const [activeChat, setActiveChat] = useState(null);

  useEffect(() => {
    if (user) {
      loadUserChats();
    } else {
      setChats([]);
      setActiveChat(null);
    }
  }, [user]);

  const loadUserChats = () => {
    const savedChats = localStorage.getItem(`chats_${user.email}`);
    if (savedChats) {
      const parsedChats = JSON.parse(savedChats);
      setChats(parsedChats);
      if (parsedChats.length > 0) {
        setActiveChat(parsedChats[0].id);
      }
    }
  };

  const saveChats = (updatedChats) => {
    if (user) {
      localStorage.setItem(`chats_${user.email}`, JSON.stringify(updatedChats));
    }
  };

  const createNewChat = (title = null) => {
    const newChat = {
      id: `chat_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      title: title || `Chat ${chats.length + 1}`,
      messages: [],
      createdAt: new Date().toISOString(),
      lastActivity: new Date().toISOString()
    };

    const updatedChats = [newChat, ...chats];
    setChats(updatedChats);
    setActiveChat(newChat.id);
    saveChats(updatedChats);
    return newChat.id;
  };

  const updateChatMessages = (chatId, messages) => {
    const updatedChats = chats.map(chat => 
      chat.id === chatId 
        ? { ...chat, messages, lastActivity: new Date().toISOString() }
        : chat
    );
    setChats(updatedChats);
    saveChats(updatedChats);
  };

  const updateChatTitle = (chatId, title) => {
    const updatedChats = chats.map(chat => 
      chat.id === chatId ? { ...chat, title } : chat
    );
    setChats(updatedChats);
    saveChats(updatedChats);
  };

  const deleteChat = (chatId) => {
    const updatedChats = chats.filter(chat => chat.id !== chatId);
    setChats(updatedChats);
    saveChats(updatedChats);
    
    if (activeChat === chatId) {
      setActiveChat(updatedChats.length > 0 ? updatedChats[0].id : null);
    }
  };

  const getCurrentChat = () => {
    return chats.find(chat => chat.id === activeChat);
  };

  const value = {
    chats,
    activeChat,
    setActiveChat,
    createNewChat,
    updateChatMessages,
    updateChatTitle,
    deleteChat,
    getCurrentChat
  };

  return (
    <ChatContext.Provider value={value}>
      {children}
    </ChatContext.Provider>
  );
};

