import ChatInterface from "@/components/ChatInterface";
import { ChatProvider } from "@/context/ChatContext";

export default function App() {
  return (
    <ChatProvider>
      <ChatInterface />
    </ChatProvider>
  );
}
