import { createContext, useContext } from "react";
import type { User } from "./types/user";

type AuthContextType = {
  user: User | null;
  setUser: (u: User | null) => void;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
};

export const AuthContext = createContext<AuthContextType | null>(null);

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be inside AuthProvider");
  return ctx;
}
