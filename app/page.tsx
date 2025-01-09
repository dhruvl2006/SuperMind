import ChatInterface from "@/components/ChatInterface";
import { ChatProvider } from "@/context/ChatContext";
import { connectDB } from "@/helper/db";

connectDB();

export default function App() {
  return (
    <ChatProvider>
      <ChatInterface />
    </ChatProvider>
  );
}
