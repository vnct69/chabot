// app/chat/components/ChatWindow.tsx
"use client";
import { useEffect, useState, useRef } from "react";
import { loadMessagesAction, sendMessageAction } from "../actions";
import MessageBubble from "./MessageBubble";
import ChatInput from "./ChatInput";
import { Message } from "@/types/message";

export default function ChatWindow({ userId }: { userId?: string }) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const bottomRef = useRef<HTMLDivElement>(null);

  const messagesRef = useRef<Message[]>([]);
  messagesRef.current = messages;

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
    try {
      const result = await sendMessageAction(content, userId);
      setMessages((prev) => [...prev, result.userMessage, result.assistantMessage]);
    } catch (err) {
      console.error("Error sending message:", err);
    }
  }

  if (loading) return <div className="text-white">Loading chat...</div>;

  return (
    <div className="w-full max-w-2xl bg-gray-800 rounded-xl p-4 shadow-lg flex flex-col h-[80vh]">
      <div className="flex-1 overflow-y-auto space-y-3 mb-3 scrollbar-thin scrollbar-thumb-gray-700">
        {messages.map((msg) => (
          <MessageBubble key={msg.id} message={msg} />
        ))}
        <div ref={bottomRef}></div>
      </div>
      <ChatInput onSend={handleSend} />
    </div>
  );
}
