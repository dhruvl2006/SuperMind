import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Send } from 'lucide-react'

const GEN_API_URL = "http://localhost:5000/api/gen";

type Message = {
  id: number
  content: string
  sender: "user" | "bot"
}

export function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, content: "Hello! How can I help you today?", sender: "bot" },
  ])
  const [input, setInput] = useState("")

  const handleSend = async () => {
    if (input.trim()) {
      const userMessage = input;
      setMessages([...messages, { id: Date.now(), content: input, sender: "user" }])
      setInput("")

      const response = await fetch(GEN_API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userMessage: userMessage }),
      });
      if (!response.ok) {
        const error = await response.json();
        console.error(error.message);
        setMessages((prevMessages) => [
          ...prevMessages,
          { id: Date.now(), content: `Error: ${error.message}`, sender: "bot" },
        ])
        return;
      }
      const agentResponse = await response.json();
      setMessages((prevMessages) => [
        ...prevMessages,
        { id: Date.now(), content: agentResponse.message, sender: "bot" },
      ])
    }
  }

  return (
    <div className="flex flex-1 flex-col">
      <header className="flex items-center justify-between border-b bg-background p-4">
        <div className="w-10" /> {/* Spacer to balance the layout */}
        <h1 className="text-xl font-bold">Chatbot</h1>
        <div className="w-10" /> {/* Spacer to balance the layout */}
      </header>
      <ScrollArea className="flex-1 px-4 py-6">
        <div className="space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`rounded-lg px-4 py-2 ${
                  message.sender === "user" ? "bg-primary text-primary-foreground" : "bg-muted"
                }`}
              >
                {message.content}
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
      <div className="border-t bg-background p-4">
        <div className="flex space-x-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            onKeyPress={(e) => e.key === "Enter" && handleSend()}
            className="flex-1"
          />
          <Button onClick={handleSend}>
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}

