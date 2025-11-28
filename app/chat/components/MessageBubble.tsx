// ============================================
// app/chat/components/MessageBubble.tsx 
// ============================================
import { Message } from "@/types/message";

interface Props {
  message: Message;
}

export default function MessageBubble({ message }: Props) {
  const isUser = message.role === "user";

  return (
    <div className={`flex w-full ${isUser ? "justify-end" : "justify-start"} animate-fadeIn`}>
      <div
        className={`group relative max-w-[75%] px-4 py-3 rounded-2xl transition-all duration-200 ${
          isUser
            ? "bg-linear-to-br from-blue-900 to-blue-600 text-white rounded-br-none shadow-lg hover:shadow-xl"
            : "bg-white/10 backdrop-blur-sm text-gray-100 rounded-bl-none border border-white/10 hover:bg-white/15"
        }`}
      >
        <p className="text-sm leading-relaxed whitespace-pre-wrap wrap-break-words">
          {message.content}
        </p>
        
        {/* Timestamp on hover */}
        {message.created_at && (
          <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-xs mt-1 text-white/50">
            {new Date(message.created_at).toLocaleTimeString([], { 
              hour: '2-digit', 
              minute: '2-digit' 
            })}
          </div>
        )}
      </div>
    </div>
  );
}
