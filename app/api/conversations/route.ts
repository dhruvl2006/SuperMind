import { NextResponse } from "next/server";

// interface PostRequestBody {
//     uid: string;
// }

// interface GetRequestBody {
//     uid: string;
//     token: string;
// }

export function POST(request:Request){
    // const { uid } = request.body as PostRequestBody;
    return NextResponse.json({ id: '1234567890'}, { status: 200 });  
}

export function GET(request:Request, params:any){
    const { uid, token } = params;
    // TODO: get conversation history from database
    return NextResponse.json({ 
      conversations: [
        {
          id: "1",
          title:"",
          timestamp: "2025-01-01T01:00:00"
        }
      ]
    }, { status: 200 });  
}