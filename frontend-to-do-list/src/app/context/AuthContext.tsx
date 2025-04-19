"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import api from "./../lib/axios";

type User = { email: string };
type AuthContextType = {
    user: User | null;
    token: string | null;
    isLoading: boolean;
    login: (email: string, password: string) => Promise<void>;
    logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [token, setToken] = useState<string | null>(null);
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const savedToken = localStorage.getItem("token");
        const savedEmail = localStorage.getItem("email");

        if (savedToken && savedEmail) {
            setToken(savedToken);
            setUser({ email: savedEmail });
        }

        setIsLoading(false);
    }, []);

    const login = async (email: string, password: string) => {
        try {
            const res = await api.post("/auth/login", { email, password });
            const { token, email: userEmail } = res.data;

            localStorage.setItem("token", token);
            localStorage.setItem("email", userEmail);

            setToken(token);
            setUser({ email: userEmail });

            router.push("/todos");
        } catch (err) {
            throw new Error("Error al iniciar sesión");
        }
    };

    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("email");

        setToken(null);
        setUser(null);

        router.push("/login");
    };

    return (
        <AuthContext.Provider value={{ user, token, login, logout, isLoading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error("useAuth debe usarse dentro de <AuthProvider>");
    return context;
};
