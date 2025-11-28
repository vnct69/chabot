"use client";
import { useState } from "react";
import { authService } from "@/lib/services/authService";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleGuestLogin = async () => {
    setLoading(true);
    try {
      await authService.createGuestUser();
      router.push("/chat");
    } catch (err) {
      console.error("Guest creation failed:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gray-900 text-white">
      <h1 className="text-3xl mb-6">Welcome to AI Chat</h1>
      <button
        onClick={handleGuestLogin}
        className="bg-blue-600 px-6 py-3 rounded text-white"
        disabled={loading}
      >
        {loading ? "Entering chat..." : "Continue as Guest"}
      </button>
    </div>
  );
}
