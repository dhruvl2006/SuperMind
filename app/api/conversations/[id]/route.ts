import { NextResponse } from "next/server";

export function GET(request:Request, params : any ){
    const { uid, id } = params;
    return NextResponse.json({
      conversationId: id,
      messages: [
        {
          id: "1",
          user: "user",
          text: "Hello",
          timestamp: "2025-01-01T01:00:00"
        },
        {
          id: "2",
          user: "bot",
          text: "Hi",
          stats:[],
          timestamp: "2025-01-01T01:01:00"
        }
      ]
    }, { status: 200 });
}