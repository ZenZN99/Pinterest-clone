"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { IUser } from "@/app/models/User";
import { me } from "@/app/libs/actions";
import { useRouter } from "next/navigation";

interface AuthContextType {
  user: IUser | null;
  loading: boolean;
  refreshUser: () => Promise<void>;
  logout: () => void;
  setUser: (user: IUser | null) => void; 
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<IUser | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const refreshUser = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setUser(null);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const res = await me(token);
      setUser(res);
      localStorage.setItem("user", JSON.stringify(res));
    } catch {
      logout();
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    router.push("/login");
  };

  useEffect(() => {
    refreshUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, refreshUser, logout, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be inside AuthProvider");
  return ctx;
};
