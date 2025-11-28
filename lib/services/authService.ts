import { userRepo } from "@/lib/repositories/userRepo";

export const authService = {
  async createGuestUser() {
    // Optional: generate a random username
    const username = `Guest${Math.floor(Math.random() * 10000)}`;
    const user = await userRepo.createUser(username, true);
    // Store in localStorage for session
    localStorage.setItem("currentUserId", user.id);
    return user;
  },

  getCurrentUserId(): string | null {
    return localStorage.getItem("currentUserId");
  },
};
