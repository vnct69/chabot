// ============================================
// lib/repositories/userRepo.ts
// ============================================
import { supabase } from "../supabase";
import type { Database } from "@/types/database.types";

type User = Database["public"]["Tables"]["users"]["Row"];
type UserInsert = Database["public"]["Tables"]["users"]["Insert"];

export const userRepo = {
  async createUser(username?: string, is_guest = true): Promise<User> {
    const insertData: UserInsert = { 
      username: username ?? null, 
      is_guest 
    };
    
    const { data, error } = await supabase
      .from("users")
      .insert(insertData)
      .select()
      .single();

    if (error) {
      console.error("Error creating user:", error);
      throw error;
    }
    
    if (!data) {
      throw new Error("No data returned from insert");
    }
    
    return data;
  },

  async getUserById(id: string): Promise<User | null> {
    const { data, error } = await supabase
      .from("users")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      console.log("User not found:", id);
      return null;
    }
    
    return data;
  },
};

export async function ensureUserExists(userId?: string): Promise<string> {
  if (!userId) {
    console.log("No userId provided, creating new guest user");
    try {
      const newUser = await userRepo.createUser(undefined, true);
      console.log("✅ Successfully created new user:", newUser.id);
      
      // Verify the user was actually created
      const verify = await userRepo.getUserById(newUser.id);
      if (!verify) {
        console.error("❌ User was created but can't be found!");
        throw new Error("User creation verification failed");
      }
      console.log("✅ Verified user exists in database");
      
      return newUser.id;
    } catch (error) {
      console.error("❌ Failed to create user:", error);
      throw error;
    }
  }

  try {
    const existingUser = await userRepo.getUserById(userId);
    
    if (existingUser) {
      console.log("Found existing user:", existingUser.id);
      return existingUser.id;
    }
    
    console.log("User ID provided but doesn't exist, creating new user");
    const newUser = await userRepo.createUser(undefined, true);
    console.log("✅ Successfully created new user:", newUser.id);
    return newUser.id;
  } catch (error) {
    console.error("Error in ensureUserExists:", error);
    throw error;
  }
}