import { useState } from "react";
import { MessageSquare, Search, Settings, Plus } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useChat } from "@/context/ChatContext";
import { Chat } from "@/types";

interface SidebarProps {
  isOpen: boolean;
}

export const Sidebar = ({ isOpen }: SidebarProps) => {
  const { chats, currentChatId, setCurrentChatId, darkMode, addChat } =
    useChat();
  const [searchTerm, setSearchTerm] = useState("");

  const filteredChats = chats.filter((chat) =>
    chat.title.toLowerCase().includes(searchTerm.toLowerCase())
  );
  // var userId = localStorage.getItem("userId") || "test";
  // if (!userId) {
  //   fetch("/api/users", {
  //     method: "POST",
  //   }).then((res) => res.json()).then((data) => {
  //     userId = data.userId;
  //     localStorage.setItem("userId", userId);
  //   });
  // }
  //
  const handleNewChat = async () => {
    // const response = await fetch("/api/conversations", {
    //   method: "POST",
    //   body: JSON.stringify({ userId: userId }),
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    // });
    // const data = await response.json();
    //
    const newChat: Chat = {
      id: Math.random().toString(6),
      title: "New Conversation",
      date: new Date().toLocaleDateString(),
      messages: [
        {
          id: 1,
          text: "👋 Hello! I'm your AI assistant. How can I help you today?",
          sender: "bot",
          timestamp: new Date(),
        },
      ],
    };
    addChat(newChat);
  };

  return (
    <div
      className={`${isOpen ? "w-80" : "w-0"
        } transition-all duration-300 overflow-hidden border-r
      ${darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"}
      flex flex-col`}
    >
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h2
            className={`font-bold text-xl ${darkMode ? "text-white" : "text-gray-800"
              }`}
          >
            Conversations
          </h2>
          <Settings
            className={`w-5 h-5 ${darkMode ? "text-gray-400" : "text-gray-500"
              } hover:text-gray-600 cursor-pointer`}
          />
        </div>

        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search chats..."
            className={`pl-10 ${darkMode ? "bg-gray-700 text-white border-gray-600" : "bg-gray-50"
              }`}
          />
        </div>

        <ScrollArea className="h-[calc(100vh-240px)]">
          <div className="space-y-2">
            {filteredChats.map((chat) => (
              <div
                key={chat.id}
                onClick={() => setCurrentChatId(chat.id)}
                className={`p-3 rounded-lg cursor-pointer transition-all duration-200
                  ${currentChatId === chat.id
                    ? darkMode
                      ? "bg-gray-700"
                      : "bg-gray-100"
                    : ""
                  }
                  ${darkMode
                    ? "hover:bg-gray-700 text-gray-300"
                    : "hover:bg-gray-100 text-gray-600"
                  }`}
              >
                <div className="flex items-center">
                  <MessageSquare className="w-4 h-4 mr-3" />
                  <div>
                    <p className="font-medium">{chat.title}</p>
                    <p
                      className={`text-xs ${darkMode ? "text-gray-400" : "text-gray-500"
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
        <Button onClick={handleNewChat} className="w-full gap-2">
          <Plus className="w-4 h-4" /> New Chat
        </Button>
      </div>
    </div>
  );
};
