// ============================================
// lib/services/aiService.ts - AI chat logic
// ============================================
import { groq } from "../groq";
import { messageRepo } from "../repositories/messageRepo";
import type { Database } from "@/types/database.types";

type Message = Database["public"]["Tables"]["messages"]["Row"];

export const aiService = {
  async generateResponse(
    userMessage: string,
    conversationHistory: Message[] = []
  ): Promise<string> {
    try {
      // Format conversation history for Groq
      const messages = [
        {
          role: "system" as const,
          content: "You are a helpful AI assistant. Be concise and friendly.",
        },
        // Add previous conversation context (last 10 messages for context)
        ...conversationHistory.slice(-10).map((msg) => ({
          role: msg.role as "user" | "assistant",
          content: msg.content,
        })),
        // Add current user message
        {
          role: "user" as const,
          content: userMessage,
        },
      ];

      const completion = await groq.chat.completions.create({
        messages,
        model: "llama-3.3-70b-versatile", // Fast and good quality
        temperature: 0.7,
        max_tokens: 1024,
        top_p: 1,
        stream: false,
      });

      return completion.choices[0]?.message?.content || "I apologize, but I couldn't generate a response.";
    } catch (error) {
      console.error("Groq API error:", error);
      throw new Error("Failed to generate AI response");
    }
  },
};
