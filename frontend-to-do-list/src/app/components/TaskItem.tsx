"use client";

import { useState, } from "react";
import api from "./../lib/axios";
import { useAuth } from "./../context/AuthContext";

type Props = {
    task: {
        id: string;
        nombre: string;
        descripcion: string;
        fechaCreacion: string;
        fechaLimite: string;
        estado: boolean;
    };
    onDelete: (id: string) => void;
    onUpdate: () => void;
};

export default function TaskItem({ task, onDelete, onUpdate }: Props) {
    const { token } = useAuth();
    const [loading, setLoading] = useState(false);

    const toggleEstado = async () => {
        try {
            setLoading(true);

            await api.patch(
                `/tareas/${task.id}/estado`,
                {
                    "estado": true
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            onUpdate();
        } catch (error) {
            console.error("Error al cambiar el estatus:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-white border rounded p-3 shadow-sm space-y-1">
            <p><strong>Nombre:</strong> {task.nombre}</p>
            <p><strong>Descripción:</strong> {task.descripcion}</p>
            <p><strong>Creación:</strong> {task.fechaCreacion}</p>
            <p><strong>Finalización:</strong> {task.fechaLimite}</p>
            <p><strong>Estado:</strong> {task.estado ? "Completada" : "Pendiente"}</p>

            <div className="flex items-center justify-between mt-2">
                <button
                    onClick={() => onDelete(task.id)}
                    className="text-red-600 hover:underline"
                >
                    Eliminar
                </button>

                <label className="flex items-center gap-2 text-sm">
                    <input
                        type="checkbox"
                        checked={task.estado}
                        onChange={toggleEstado}
                        disabled={loading}
                    />
                    {task.estado ? "Completada" : "Pendiente"}
                </label>
            </div>
        </div>
    );
}
