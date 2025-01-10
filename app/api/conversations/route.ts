import Conversation from "@/models/conversation.model";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();
  const userId = body.userId;
  if (!userId) {
    return NextResponse.json({ error: 'Missing userId' }, { status: 400 });
  }
  const conversation = new Conversation({ userId: userId });
  await conversation.save();
  return NextResponse.json({ id: conversation._id }, { status: 200 });
}

export async function GET() {
  const userId = 12;
  if (!userId) {
    return NextResponse.json({ error: 'Missing userId' }, { status: 400 });
  }
  const conversations = await Conversation.find({ userId });
  return NextResponse.json({ conversations }, { status: 200 });

}
