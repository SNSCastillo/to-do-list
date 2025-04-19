"use client";

import { useState } from "react";
import { useAuth } from "./../context/AuthContext";
import api from "./../lib/axios";

export default function TaskForm() {
    const { token } = useAuth();
    const [nombre, setNombre] = useState("");
    const [descripcion, setDescripcion] = useState("");
    const [fechaLimite, setFechaLimite] = useState("");
    const [estado, setEstado] = useState(false); // Por defecto false

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!nombre.trim() || !descripcion.trim() || !fechaLimite) return;

        try {
            const nuevaTarea = {
                nombre,
                descripcion,
                fechaLimite: new Date(fechaLimite),
                estado,
            };

            await api.post("/tareas", nuevaTarea, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            setNombre("");
            setDescripcion("");
            setFechaLimite("");
            setEstado(false);

        } catch (err) {
            console.error("Error al crear tarea:", err);
        }
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-w-screen-xl w-full"
        >
            <input
                type="text"
                placeholder="Nombre"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                className="border border-gray-300 px-3 py-2 rounded w-full"
            />
            <input
                type="text"
                placeholder="Descripción"
                value={descripcion}
                onChange={(e) => setDescripcion(e.target.value)}
                className="border border-gray-300 px-3 py-2 rounded w-full"
            />
            <input
                type="date"
                value={fechaLimite}
                onChange={(e) => setFechaLimite(e.target.value)}
                className="border border-gray-300 px-3 py-2 rounded w-full"
            />
            <label className="flex items-center gap-2 border border-gray-300 px-3 py-2 rounded w-full">
                <input
                    type="checkbox"
                    checked={estado}
                    onChange={(e) => setEstado(e.target.checked)}
                />
                ¿Completado?
            </label>
            <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded w-full"
            >
                Agregar
            </button>
        </form>
    );
}
