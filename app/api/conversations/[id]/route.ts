import Conversation from "@/models/conversation.model";
import Message from "@/models/message.modle";
import { NextResponse } from "next/server";

export async function GET(request:Request, params : any){
    const { userId, conversationId } = params;
    const conversation = await Conversation.findById(conversationId);
    if (!conversation) {
        return NextResponse.json({ error: 'Conversation not found' }, { status: 404 });
    }
    try {
      const messages = await Message.find({ conversationId });
      return NextResponse.json({ 
        conversationId: conversation._id,
        userId: conversation.userId,
        messages: messages,
       }, { status: 200 });
    } catch (error:any) {
      console.error("Error: ", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
}