import Message from "@/models/message.modle";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { userId, conversationId, userMessage } = body;
  if (!userId) {
    return NextResponse.json(
      { message: "User ID is required!" },
      { status: 400 }
    );
  }
  if (!conversationId) {
    return NextResponse.json(
      { message: "Conversation ID is required!" },
      { status: 400 }
    );
  }
  if (!userMessage) {
    return NextResponse.json(
      { message: "Message is required!" },
      { status: 400 }
    );
  }
  new Message({
    userId,
    conversationId,
    sender: "user",
    text: userMessage,
  }).save();
  const analysis = await generateAnalysis(userMessage);
  const messageId = "";
  if (!analysis.error) {
    const message = new Message({
      userId,
      conversationId,
      sender: "bot",
      text: analysis.text,
      stats: analysis.stats,
    });
    await message.save();
  }
  const statusCode = analysis.error ? 500 : 200;
  return NextResponse.json(
    {
      ...analysis,
      _id: messageId,
      conversationId,
    },
    { status: statusCode }
  );
}

const generateAnalysis = async (inputValue: string) => {
  const stream = false;
  const endpoint = `/lf/${process.env.LANGFLOW_ID}/api/v1/run/${process.env.FLOW_ID}?stream=${stream}`;
  const baseURL = "https://api.langflow.astra.datastax.com";
  const url = `${baseURL}${endpoint}`;
  const tweaks = {
    "ChatInput-KxWBy": {},
    "ChatOutput-U8492": {},
    "Prompt-voioz": {},
    "Agent-dodTI": {},
    "GoogleGenerativeAIModel-1cQoY": {},
    "AstraDBToolComponent-i8Tw8": {},
  };
  const body = {
    input_value: inputValue,
    input_type: "text",
    output_type: "chat",
    tweaks: tweaks,
    sender: "client-user",
    sender_name: "client-user",
  };
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${process.env.APPLICATION_TOKEN}`,
  };
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: headers,
      body: JSON.stringify(body),
    });

    const responseContent = await response.json();
    if (!response.ok) {
      throw new Error(
        `${response.status} ${response.statusText} - ${JSON.stringify(
          responseContent
        )}`
      );
    }
    type StatsBlock = {
      data: {
        likes: number;
        shares: number;
        comments: number;
        avg_sentiment_score: number;
      };
    };

    console.log(JSON.stringify(responseContent));
    const responseMessage = responseContent.outputs[0].outputs[0].results.message;
    const stats_blocks = responseMessage.content_blocks[0].contents[1];
    const likes: number[] = [],
      shares: number[] = [],
      comments: number[] = [],
      avg_sentiment_scores: number[] = [];
    stats_blocks.output.forEach((block: StatsBlock) => {
      likes.push(block.data.likes);
      shares.push(block.data.shares);
      comments.push(block.data.comments);
      avg_sentiment_scores.push(block.data.avg_sentiment_score);
    });
    return {
      error: false,
      text: responseMessage.text,
      post_type: stats_blocks.tool_input.post_type,
      stats: {
        likes: likes,
        shares: shares,
        comments: comments,
        avg_sentiment_score: avg_sentiment_scores,
      },
    };
  } catch {
    console.error("Request Error:");
    return {
      error: true,
    };
  }
};
