// ============================================
// app/api/messages/route.ts
// ============================================
import { NextResponse } from "next/server";
import { chatService } from "@/lib/services/chatService";

interface MessageRequestBody {
  userId?: string;
  content: string;
}

function getErrorMessage(err: unknown): string {
  if (err instanceof Error) return err.message;
  if (typeof err === "string") return err;
  return "Unknown error";
}

export async function POST(req: Request) {
  try {
    const body: MessageRequestBody = await req.json();
    const { userId, content } = body;

    console.log("=== POST /api/messages ===");
    console.log("Received userId:", userId);
    console.log("Received content:", content);

    if (!content) {
      return NextResponse.json(
        { error: "Missing content" },
        { status: 400 }
      );
    }

    const response = await chatService.sendMessage(userId, content);
    console.log("Success! Returning response");
    return NextResponse.json(response);
  } catch (err: unknown) {
    const message = getErrorMessage(err);
    console.error("=== ERROR in /api/messages POST ===");
    console.error("Error:", err);
    console.error("Error message:", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const userId = url.searchParams.get("userId");

    console.log("=== GET /api/messages ===");
    console.log("userId:", userId);

    if (!userId) {
      return NextResponse.json([], { status: 200 });
    }

    const history = await chatService.getChatHistory(userId);
    console.log("Returning", history.length, "messages");
    return NextResponse.json(history);
  } catch (err: unknown) {
    const message = getErrorMessage(err);
    console.error("=== ERROR in /api/messages GET ===");
    console.error("Error:", err);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}