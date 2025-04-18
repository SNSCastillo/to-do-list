"use client";

import { useState, useEffect } from "react";
import api from "./../lib/axios";
import { useAuth } from "./../context/AuthContext";
import TaskItem from "./TaskItem";
import socket from "./../lib/socket";

type Task = {
    id: string;
    nombre: string;
    descripcion: string;
    fechaCreacion: string;
    fechaLimite: string;
    estado: boolean;
};

export default function TaskList() {
    const { token } = useAuth();
    const [tasks, setTasks] = useState<Task[]>([]);

    const fetchTasks = async () => {
        try {
            const res = await api.get("/tareas", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            setTasks(res.data);
        } catch (err) {
            console.error("Error cargando tareas:", err);
        }
    };

    const handleDelete = async (id: string) => {
        try {
            await api.delete(`/tareas/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            fetchTasks(); // Recarga la lista
        } catch (err) {
            console.error("Error al eliminar tarea:", err);
        }
    };

    useEffect(() => {
        fetchTasks();
        // Escuchar nuevas tareas desde el servidor
        socket.on("tareaCreada", (nuevaTarea) => {
            console.log("Tarea recibida vía socket:", nuevaTarea);
            setTasks((prev) => [nuevaTarea, ...prev]);
        });

        // Limpiar el evento cuando se desmonta el componente
        return () => {
            socket.off("tareaCreada");
        };
    }, []);

    return (
        <div className="space-y-4 mt-6">
            {tasks.map((task) => (
                <TaskItem
                    key={task.id}
                    task={task}
                    onDelete={handleDelete}
                    onUpdate={fetchTasks}
                />
            ))}
        </div>
    );
}
