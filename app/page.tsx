// ============================================
// app/chat/page.tsx 
// ============================================
import ChatWindow from "@/app/chat/components/chatWindow";

export default function ChatPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen p-4">
        {/* Header */}
        <div className="text-center mb-8 space-y-2">
          <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight">
            AI Chat Assistant
          </h1>
          <p className="text-gray-400 text-lg">
            Powered by advanced AI technology
          </p>
        </div>

        {/* Chat Window */}
        <ChatWindow />

        {/* Footer */}
        <div className="mt-8 text-center text-gray-500 text-sm">
          <p>Press Enter to send • Shift + Enter for new line</p>
        </div>
      </div>
    </div>
  );
}