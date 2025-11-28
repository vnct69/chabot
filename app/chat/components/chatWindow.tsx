// ============================================
// app/chat/components/ChatWindow.tsx
// ============================================
"use client";
import { useEffect, useState, useRef } from "react";
import { loadMessagesAction, sendMessageAction } from "../actions";
import MessageBubble from "./MessageBubble";
import ChatInput from "./ChatInput";
import { Message } from "@/types/message";

export default function ChatWindow({ userId }: { userId?: string } = {}) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await loadMessagesAction(userId || "");
        setMessages(data || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [userId]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  async function handleSend(content: string) {
    setSending(true);
    try {
      const result = await sendMessageAction(content, userId);
      setMessages((prev) => [...prev, result.userMessage, result.assistantMessage]);
    } catch (err) {
      console.error("Error sending message:", err);
    } finally {
      setSending(false);
    }
  }

  if (loading) {
    return (
      <div className="w-full max-w-4xl bg-white/10 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/20">
        <div className="flex items-center justify-center space-x-2">
          <div className="w-3 h-3 bg-purple-500 rounded-full animate-bounce"></div>
          <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce animation-delay-200"></div>
          <div className="w-3 h-3 bg-pink-500 rounded-full animate-bounce animation-delay-400"></div>
        </div>
        <p className="text-white/70 text-center mt-4">Loading your conversation...</p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-4xl bg-white/10 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 flex flex-col h-[75vh] overflow-hidden">
      {/* Header */}
      <div className="px-6 py-4 border-b border-white/10 bg-white/5">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-white font-medium">AI Assistant</span>
          </div>
          <div className="text-gray-400 text-sm">
            {messages.length} messages
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
        {messages.length === 0 ? (
          <div className="flex items-center justify-center h-full">
            <div className="text-center space-y-4">
              <div className="text-6xl">💬</div>
              <h3 className="text-xl font-semibold text-white">Start a conversation</h3>
              <p className="text-gray-400">Send a message to begin chatting with AI</p>
            </div>
          </div>
        ) : (
          <>
            {messages.map((msg, idx) => (
              <MessageBubble key={msg.id || idx} message={msg} />
            ))}
            {sending && (
              <div className="flex justify-start">
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl rounded-bl-none px-4 py-3 border border-white/10">
                  <div className="flex space-x-2">
                    <div className="w-2 h-2 bg-white/50 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-white/50 rounded-full animate-bounce animation-delay-200"></div>
                    <div className="w-2 h-2 bg-white/50 rounded-full animate-bounce animation-delay-400"></div>
                  </div>
                </div>
              </div>
            )}
          </>
        )}
        <div ref={bottomRef}></div>
      </div>

      {/* Input */}
      <div className="px-6 py-4 border-t border-white/10 bg-white/5">
        <ChatInput onSend={handleSend} disabled={sending} />
      </div>
    </div>
  );
}
