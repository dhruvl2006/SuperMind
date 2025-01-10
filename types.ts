export interface Message {
  id: number;
  text: string;
  stats?: { likes: number[], comments: number[], shares: number[], avg_sentiment_score: number[] };
  sender: "user" | "bot";
  timestamp: Date;
}

export interface Chat {
  id: string;
  title: string;
  date: string;
  messages: Message[];
}
