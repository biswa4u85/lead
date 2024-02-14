import { successResponse, errorResponse } from "@/libs/utility";
import { NextRequest } from "next/server";
import { sendEmail } from "./index"

export async function POST(request: NextRequest) {
    const data = await request.json();
    // sendEmail(data)
}