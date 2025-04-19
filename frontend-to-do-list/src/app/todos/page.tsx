"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "./../context/AuthContext";
import Navbar from "../components/ButtonCerrarSesion";
import TaskForm from "../components/TaskForm";
import TaskList from "../components/TaskList";

export default function TodosPage() {
    const { user, token } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!user || !token) {
            router.push("/login");
        }
    }, [user, token]);

    if (!user || !token) {
        return <div>Verificando sesión...</div>;
    }

    return (
        <div className="min-h-screen p-6 bg-gray-50 text-black">
            <Navbar />
            <div className="max-w-2xl mx-auto mt-10 space-y-6 text-cyan-800">
                <h1 className="text-3xl font-bold">Tus tareas</h1>
                <TaskForm />
                <TaskList />
            </div>
        </div>
    );

}
