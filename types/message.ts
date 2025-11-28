export interface Message {
  id: string;               // uuid
  user_id: string | null;   // nullable
  topic: string | null;     // optional
  content: string;
  extension?: string | null; // optional
  role: "user" | "assistant";
  created_at: string | null;
  payload?: Record<string, unknown> | null;
  event?: string | null;
  private?: boolean | null;
  updated_at: string | null;
}

// For inserts
export interface MessageInsert {
  user_id: string | null;
  topic?: string;
  content: string;
  extension?: string;
  role: "user" | "assistant";
  payload?: Record<string, unknown>;
  event?: string;
  private?: boolean;
}
