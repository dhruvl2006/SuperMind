"use client";

import React, { createContext, useContext, useState } from "react";
import { Chat, Message } from "../types";

interface ChatContextType {
  chats: Chat[];
  currentChatId: string | null;
  setCurrentChatId: (id: string | null) => void;
  addChat: (chat: Chat) => void;
  addMessage: (chatId: string, message: Message) => void;
  darkMode: boolean;
  setDarkMode: (mode: boolean) => void;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export const ChatProvider = ({ children }: { children: React.ReactNode }) => {
  const [chats, setChats] = useState<Chat[]>([]);
  const [currentChatId, setCurrentChatId] = useState<string | null>(null);
  const [darkMode, setDarkMode] = useState(false);

  const addChat = (chat: Chat) => {
    setChats((prev) => [...prev, chat]);
    setCurrentChatId(chat.id);
  };

  const addMessage = (chatId: string, message: Message) => {
    setChats((prev) =>
      prev.map((chat) =>
        chat.id === chatId
          ? { ...chat, messages: [...chat.messages, message] }
          : chat
      )
    );
  };

  return (
    <ChatContext.Provider
      value={{
        chats,
        currentChatId,
        setCurrentChatId,
        addChat,
        addMessage,
        darkMode,
        setDarkMode,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = () => {
  const context = useContext(ChatContext);
  if (undefined === context) {
    throw new Error("useChat must be used within a ChatProvider");
  }
  return context;
};
