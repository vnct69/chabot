// // ============================================
// // lib/services/chatService.ts
// // ============================================
// import { messageRepo } from "../repositories/messageRepo";
// import { ensureUserExists } from "../repositories/userRepo";

// export const chatService = {
//   async sendMessage(userId: string | undefined, content: string) {
//     console.log("=== chatService.sendMessage called ===");
//     console.log("Input userId:", userId);
//     console.log("Content:", content);
    
//     const validUserId = await ensureUserExists(userId);
//     console.log("Valid userId after ensureUserExists:", validUserId);

//     console.log("Creating user message...");
//     const userMessage = await messageRepo.createMessage({
//       user_id: validUserId,
//       content,
//       extension: "text",
//       role: "user"
//     });
//     console.log("User message created:", userMessage.id);

//     console.log("Creating assistant message...");
//     const assistantMessage = await messageRepo.createMessage({
//       user_id: validUserId,
//       content: `You said: "${content}"`,
//       extension: "text",
//       role: "assistant"
//     });
//     console.log("Assistant message created:", assistantMessage.id);

//     return { userMessage, assistantMessage };
//   },

//   async getChatHistory(userId: string) {
//     console.log("=== chatService.getChatHistory called ===");
//     console.log("userId:", userId);
//     return await messageRepo.getMessagesByUser(userId);
//   }
// };



// ============================================
// lib/services/chatService.ts - Updated with AI
// ============================================
import { messageRepo } from "../repositories/messageRepo";
import { ensureUserExists } from "../repositories/userRepo";
import { aiService } from "./aiService";

export const chatService = {
  async sendMessage(userId: string | undefined, content: string) {
    const validUserId = await ensureUserExists(userId);

    // Create user message
    const userMessage = await messageRepo.createMessage({
      user_id: validUserId,
      content,
      extension: "text",
      role: "user",
    });

    // Get conversation history for context
    const history = await messageRepo.getMessagesByUser(validUserId);

    // Generate AI response using Groq
    const aiResponse = await aiService.generateResponse(content, history);

    // Create assistant message
    const assistantMessage = await messageRepo.createMessage({
      user_id: validUserId,
      content: aiResponse,
      extension: "text",
      role: "assistant",
    });

    return { userMessage, assistantMessage };
  },

  async getChatHistory(userId: string) {
    return await messageRepo.getMessagesByUser(userId);
  },
};