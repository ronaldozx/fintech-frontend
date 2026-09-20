import { useEffect, useState, type ReactNode } from "react";
import { AuthContext } from "./AuthContext";
import type { AuthContextType, User } from "../../types/Auth";
import apiClient from "../../services/apiClient";

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    async function fetchUser() {
        try {
            const res = await apiClient.get("/auth/me");

            setUser(res.data);
        } catch {
            setUser(null);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchUser();
    }, []);

    function login(userData: User) {
        setUser(userData);
    }   

    function logout() {
        setUser(null);
    }

    const value: AuthContextType = { user, login, logout, loading };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}