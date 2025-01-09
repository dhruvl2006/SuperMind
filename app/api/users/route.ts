import { NextRequest, NextResponse } from "next/server";
import { v4 as uuidv4 } from 'uuid';

export function POST(request:NextRequest){
    const uuid = uuidv4();
    return NextResponse.json({userId: uuid});
}