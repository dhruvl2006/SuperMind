import { NextResponse } from "next/server";
import { v4 as uuidv4 } from 'uuid';

export function POST() {
  const uuid = uuidv4();
  return NextResponse.json({ userId: uuid });
}
