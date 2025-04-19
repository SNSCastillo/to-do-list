"use client";

import { useAuth } from "./../context/AuthContext";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function ProtectedLayout({ children }: { children: React.ReactNode }) {
    const { user, token, isLoading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!isLoading && (!user || !token)) {
            router.push("/login");
        }
    }, [user, token, isLoading, router]);

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <p className="text-gray-500">Verificando sesión...</p>
            </div>
        );
    }

    return <>{children}</>;
}
