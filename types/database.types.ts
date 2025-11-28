// ============================================
// types/database.types.ts - REMOVE topic field
// ============================================
export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export type Database = {
  public: {
    Tables: {
      messages: {
        Row: {
          id: string;
          user_id: string | null;
          content: string;
          extension: string | null;
          role: "user" | "assistant";
          payload: Json | null;
          event: string | null;
          private: boolean | null;
          created_at: string | null;
          updated_at: string | null;
        };
        Insert: {
          id?: string;
          user_id?: string | null;
          content: string;
          extension?: string | null;
          role: "user" | "assistant";
          payload?: Json | null;
          event?: string | null;
          private?: boolean | null;
          created_at?: string | null;
          updated_at?: string | null;
        };
        Update: {
          id?: string;
          user_id?: string | null;
          content?: string;
          extension?: string | null;
          role?: "user" | "assistant";
          payload?: Json | null;
          event?: string | null;
          private?: boolean | null;
          created_at?: string | null;
          updated_at?: string | null;
        };
        Relationships: [];
      };
      users: {
        Row: {
          id: string;
          username: string | null;
          is_guest: boolean | null;
          created_at: string | null;
        };
        Insert: {
          id?: string;
          username?: string | null;
          is_guest?: boolean | null;
          created_at?: string | null;
        };
        Update: {
          id?: string;
          username?: string | null;
          is_guest?: boolean | null;
          created_at?: string | null;
        };
        Relationships: [];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};