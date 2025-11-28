
// ============================================
// lib/repositories/messageRepo.ts
// ============================================
import { supabase } from "../supabase";
import type { Database } from "@/types/database.types";

type Message = Database["public"]["Tables"]["messages"]["Row"];
type MessageInsert = Database["public"]["Tables"]["messages"]["Insert"];

export const messageRepo = {
  async getMessagesByUser(userId: string): Promise<Message[]> {
    const { data, error } = await supabase
      .from("messages")
      .select("*")
      .eq("user_id", userId)
      .order("created_at", { ascending: true });

    if (error) throw error;
    return data ?? [];
  },

  async createMessage(insertData: MessageInsert): Promise<Message> {
    const { data, error } = await supabase
      .from("messages")
      .insert(insertData)
      .select()
      .single();

    if (error) {
      console.error("Supabase insert error:", error);
      throw error;
    }

    if (!data) {
      throw new Error("No data returned from insert");
    }

    return data;
  },
};