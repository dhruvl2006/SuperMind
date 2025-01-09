import Conversation from "@/models/conversation.model";
import { NextResponse } from "next/server";

export async function POST(request:Request){
    const body = await request.json();
    const userId = body.userId;
    if (!userId) {
      return NextResponse.json({ error: 'Missing userId' }, { status: 400 });
    }
    const conversation = new Conversation({ userId:userId });
    await conversation.save();
    return NextResponse.json({ id: conversation._id }, { status: 200 });  
}

export async function GET(request:Request, params:any){
    const userId = params.userId;
    if (!userId) {
      return NextResponse.json({ error: 'Missing userId' }, { status: 400 });
    }
    try {
      const conversations = await Conversation.find({ userId });
      return NextResponse.json({ conversations }, { status: 200 });
    } catch (error:any) {
      console.error("Error: ", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
}