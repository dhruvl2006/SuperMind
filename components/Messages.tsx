import { useEffect, useRef } from "react";
import ReactMarkdown from "react-markdown";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useChat } from "../context/ChatContext";

interface MessagesProps {
  isTyping: boolean;
}

export const Messages = ({ isTyping }: MessagesProps) => {
  const { chats, currentChatId, darkMode } = useChat();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const currentChat = chats.find((chat) => chat.id === currentChatId);
  const messages = currentChat?.messages || [];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  return (
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
              className={`max-w-[80%] ${
                message.sender === "user"
                  ? darkMode
                    ? "bg-blue-600 border-blue-500"
                    : "bg-blue-500 border-blue-400"
                  : darkMode
                  ? "bg-gray-700 border-gray-600"
                  : "bg-white"
              } shadow-lg`}
            >
              <CardContent className="p-4">
                <ReactMarkdown
                  className={`text-base ${
                    message.sender === "user"
                      ? "text-white"
                      : darkMode
                      ? "text-gray-200"
                      : "text-gray-800"
                  }`}
                >
                  {message.text}
                </ReactMarkdown>
                <span
                  className={`text-xs mt-2 block ${
                    message.sender === "user"
                      ? "text-blue-200"
                      : darkMode
                      ? "text-gray-400"
                      : "text-gray-500"
                  }`}
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
  );
};
