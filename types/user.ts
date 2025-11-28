export interface User {
  id: string;          // uuid
  username?: string;
  is_guest: boolean;
  created_at?: string | null;
}

export interface UserInsert {
  username?: string;
  is_guest: boolean;
}
