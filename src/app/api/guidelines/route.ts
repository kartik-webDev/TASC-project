import { NextResponse } from "next/server";
import guideline from '@/guideline.json'

export async function GET(request: Request) {
 
  return  NextResponse.json(guideline)
}