export interface Message {
  id: number;
  text: string;
  sender: "user" | "bot";
  timestamp: Date;
}

export interface Chat {
  id: string;
  title: string;
  date: string;
  messages: Message[];
}
