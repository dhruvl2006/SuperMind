"use client";

import React, { useState, useRef, useEffect } from "react";
import {
  MessageSquare,
  Menu,
  Send,
  X,
  Plus,
  Search,
  Settings,
  Moon,
  Sun,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Toggle } from "@/components/ui/toggle";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface Message {
  id: number;
  text: string;
  sender: "user" | "bot";
  timestamp: Date;
}

const ChatInterface = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "👋 Hello! I'm your AI assistant. How can I help you today?",
      sender: "bot",
      timestamp: new Date(),
    },
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [darkMode, setDarkMode] = useState(false);
  const [isTyping, setIsTyping] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (inputMessage.trim()) {
      const newMessage: Message = {
        id: messages.length + 1,
        text: inputMessage,
        sender: "user",
        timestamp: new Date(),
      };

      setMessages([...messages, newMessage]);
      setInputMessage("");
      setIsTyping(true);

      setTimeout(() => {
        const botResponse: Message = {
          id: messages.length + 2,
          text: "I understand your message. This is a demonstration response that shows typing indicators and smooth animations.",
          sender: "bot",
          timestamp: new Date(),
        };
        setIsTyping(false);
        setMessages((prev) => [...prev, botResponse]);
      }, 2000);
    }
  };

  const previousChats = [
    { title: "Website Development Discussion", date: "Today" },
    { title: "AI Implementation Strategy", date: "Yesterday" },
    { title: "Product Design Review", date: "2 days ago" },
  ];

  return (
    <div
      className={`h-screen flex ${
        darkMode ? "dark bg-gray-900" : "bg-gray-50"
      }`}
    >
      {/* Sidebar */}
      <div
        className={`
          ${sidebarOpen ? "w-80" : "w-0"}
          transition-all duration-300 
          overflow-hidden
          border-r
          ${
            darkMode
              ? "bg-gray-800 border-gray-700"
              : "bg-white border-gray-200"
          }
          flex flex-col
        `}
      >
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2
              className={`font-bold text-xl ${
                darkMode ? "text-white" : "text-gray-800"
              }`}
            >
              Conversations
            </h2>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <Settings
                    className={`w-5 h-5 ${
                      darkMode ? "text-gray-400" : "text-gray-500"
                    } hover:text-gray-600`}
                  />
                </TooltipTrigger>
                <TooltipContent>Settings</TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>

          <div className="relative mb-6">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              placeholder="Search chats..."
              className={`pl-10 ${
                darkMode
                  ? "bg-gray-700 text-white border-gray-600"
                  : "bg-gray-50"
              }`}
            />
          </div>

          <ScrollArea className="h-[calc(100vh-240px)]">
            <div className="space-y-2">
              {previousChats.map((chat, index) => (
                <div
                  key={index}
                  className={`
                    p-3 rounded-lg cursor-pointer
                    transition-all duration-200
                    ${
                      darkMode
                        ? "hover:bg-gray-700 text-gray-300"
                        : "hover:bg-gray-100 text-gray-600"
                    }
                  `}
                >
                  <div className="flex items-center">
                    <MessageSquare className="w-4 h-4 mr-3" />
                    <div>
                      <p className="font-medium">{chat.title}</p>
                      <p
                        className={`text-xs ${
                          darkMode ? "text-gray-400" : "text-gray-500"
                        }`}
                      >
                        {chat.date}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </div>

        <div className="mt-auto p-6">
          <Button
            className="w-full gap-2"
            // variant={darkMode ? "outline" : "default"}
          >
            <Plus className="w-4 h-4" /> New Chat
          </Button>
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div
          className={`
            p-4 border-b flex justify-between items-center
            ${
              darkMode
                ? "bg-gray-800 border-gray-700"
                : "bg-white border-gray-200"
            }
          `}
        >
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className={darkMode ? "text-white hover:text-gray-200" : ""}
          >
            {sidebarOpen ? <X /> : <Menu />}
          </Button>

          <Toggle
            pressed={darkMode}
            onPressedChange={setDarkMode}
            aria-label="Toggle dark mode"
            className="gap-2"
          >
            {darkMode ? (
              <Sun className="w-4 h-4" />
            ) : (
              <Moon className="w-4 h-4" />
            )}
          </Toggle>
        </div>

        {/* Messages Area */}
        <ScrollArea className="flex-1 p-6">
          <div className="space-y-6 max-w-3xl mx-auto">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${
                  message.sender === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <Card
                  className={`
                    max-w-[80%]
                    ${
                      message.sender === "user"
                        ? darkMode
                          ? "bg-blue-600 border-blue-500"
                          : "bg-blue-500 border-blue-400"
                        : darkMode
                        ? "bg-gray-700 border-gray-600"
                        : "bg-white"
                    }
                    shadow-lg
                  `}
                >
                  <CardContent className="p-4">
                    <p
                      className={`
                        text-base
                        ${
                          message.sender === "user"
                            ? "text-white"
                            : darkMode
                            ? "text-gray-200"
                            : "text-gray-800"
                        }
                      `}
                    >
                      {message.text}
                    </p>
                    <span
                      className={`
                        text-xs mt-2 block
                        ${
                          message.sender === "user"
                            ? "text-blue-200"
                            : darkMode
                            ? "text-gray-400"
                            : "text-gray-500"
                        }
                      `}
                    >
                      {message.timestamp.toLocaleTimeString()}
                    </span>
                  </CardContent>
                </Card>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <Card
                  className={`max-w-[80%] ${
                    darkMode ? "bg-gray-700 border-gray-600" : "bg-white"
                  }`}
                >
                  <CardContent className="p-4">
                    <div className="flex space-x-2">
                      <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" />
                      <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce delay-100" />
                      <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce delay-200" />
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </ScrollArea>

        {/* Input Area */}
        <div
          className={`
            p-6 border-t
            ${
              darkMode
                ? "bg-gray-800 border-gray-700"
                : "bg-white border-gray-200"
            }
          `}
        >
          <div className="max-w-3xl mx-auto flex space-x-4">
            <Input
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
              placeholder="Type your message..."
              className={`
                ${darkMode ? "bg-gray-700 text-white border-gray-600" : ""}
                text-base
              `}
            />
            <Button
              onClick={handleSendMessage}
              size="icon"
              className={darkMode ? "bg-blue-600 hover:bg-blue-700" : ""}
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;
