// app/chat/actions.ts
import { Message } from "@/types/message";

export async function loadMessagesAction(userId: string): Promise<Message[]> {
  const res = await fetch(`/api/messages?userId=${userId}`);
  if (!res.ok) throw new Error("Failed to load messages");
  return res.json();
}

export async function sendMessageAction(
  content: string,
  userId?: string
): Promise<{ userMessage: Message; assistantMessage: Message }> {
  const res = await fetch("/api/messages", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ content, userId }),
  });

  if (!res.ok) throw new Error("Failed to send message");
  return res.json();
}
