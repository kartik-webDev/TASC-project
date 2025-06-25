import { NextResponse } from "next/server";
import feedback from "@/feedback.json"

export async function GET() {

    const data = feedback

    return NextResponse.json(data)
}