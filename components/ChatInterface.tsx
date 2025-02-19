"use client";

import React, { useState } from "react";
import { Menu, Send, X, Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Toggle } from "@/components/ui/toggle";
import { Sidebar } from "./Sidebar";
import { Messages } from "./Messages";
import { useChat } from "../context/ChatContext";

const GEN_API_URL = "/api/gen";

const ChatInterface = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [inputMessage, setInputMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const { currentChatId, addMessage, darkMode, setDarkMode } = useChat();
  const userId = "test-user";

  const handleSendMessage = async () => {
    if (inputMessage.trim() && currentChatId) {
      const newMessage = {
        id: Date.now(),
        text: inputMessage,
        sender: "user" as const,
        timestamp: new Date(),
      };

      addMessage(currentChatId, newMessage);
      setInputMessage("");
      setIsTyping(true);

      const response = await fetch(GEN_API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ conversationId: currentChatId, userId: userId, userMessage: newMessage.text }),
      });

      const botResponse = {
        id: Date.now() + 1,
        text: "",
        sender: "bot" as const,
        timestamp: new Date(),
        stats: undefined,
      }

      if (!response.ok) {
        const error = await response.json();
        console.error(error.message);
        botResponse.text = `Error: ${error.message}`;
        addMessage(currentChatId, botResponse);
        setIsTyping(false);
        return;
      }

      const agentResponse = await response.json();
      botResponse.text = agentResponse.text;
      botResponse.stats = agentResponse.stats;
      // TODO: use agentResponse.stats to show graphs/charts
      addMessage(currentChatId, botResponse);
      setIsTyping(false);
    }
  };

  return (
    <div
      className={`h-screen flex ${darkMode ? "dark bg-gray-900" : "bg-gray-50"
        }`}
    >
      <Sidebar isOpen={sidebarOpen} />

      <div className="flex-1 flex flex-col">
        <div
          className={`p-4 border-b flex justify-between items-center
            ${darkMode
              ? "bg-gray-800 border-gray-700"
              : "bg-white border-gray-200"
            }`}
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

        <Messages isTyping={isTyping} />

        <div
          className={`p-6 border-t
            ${darkMode
              ? "bg-gray-800 border-gray-700"
              : "bg-white border-gray-200"
            }`}
        >
          <div className="max-w-3xl mx-auto flex space-x-4">
            <Input
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
              placeholder="Type your message..."
              className={`${darkMode ? "bg-gray-700 text-white border-gray-600" : ""
                } text-base `}
            />
            <Button
              onClick={handleSendMessage}
              size="icon"
              className={darkMode ? "bg-blue-600 hover:bg-blue-700" : ""}
              disabled={!currentChatId || !inputMessage.trim()}
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
