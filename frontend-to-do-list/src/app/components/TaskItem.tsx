"use client";

import { useState } from "react";
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
    const [nombre, SetNombre] = useState(task.nombre);
    const [descripcion, SetDescripcion] = useState(task.descripcion);
    const [fechaLimite, SetFechaLimite] = useState(task.fechaLimite);
    const [estado, SetEstado] = useState(task.estado);
    const [isEditing, setIsEditing] = useState(false);

    const toggleEstado = async () => {
        try {
            setLoading(true);
            await api.patch(
                `/tareas/${task.id}/estado`,
                {
                    "estado": !estado,
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

    const onUpdateTask = async () => {
        try {
            setLoading(true);

            await api.patch(
                `/tareas/${task.id}`,
                {
                    nombre: nombre,
                    descripcion: descripcion,
                    fechaLimite: fechaLimite,
                    estado: estado,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            setIsEditing(false);
            onUpdate();
        } catch (error) {
            console.error("Error al actualizar la tarea:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-white border rounded p-3 shadow-sm space-y-1">
            {isEditing ? (
                <>
                    <div>
                        <label className="block text-sm font-medium">Nombre</label>
                        <input
                            type="text"
                            value={nombre}
                            onChange={(e) => SetNombre(e.target.value)}
                            className="mt-1 p-2 border rounded w-full"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium">Descripción</label>
                        <textarea
                            value={descripcion}
                            onChange={(e) => SetDescripcion(e.target.value)}
                            className="mt-1 p-2 border rounded w-full"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium">Fecha Límite</label>
                        <input
                            type="date"
                            value={fechaLimite}
                            onChange={(e) => SetFechaLimite(e.target.value)}
                            className="mt-1 p-2 border rounded w-full"
                        />
                    </div>
                    <div className="flex items-center gap-2 mt-2">
                        <label>
                            Estado:
                            <input
                                type="checkbox"
                                checked={estado}
                                onChange={(e) => SetEstado(e.target.checked)}
                                className="ml-2"
                            />
                            {estado ? "Completada" : "Pendiente"}
                        </label>
                    </div>

                    <div className="mt-2">
                        <button
                            onClick={onUpdateTask}
                            className="text-green-600 hover:underline mr-2"
                            disabled={loading}
                        >
                            {loading ? "Actualizando..." : "Actualizar Tarea"}
                        </button>
                        <button
                            onClick={() => setIsEditing(false)}
                            className="text-gray-600 hover:underline"
                        >
                            Cancelar
                        </button>
                    </div>
                </>
            ) : (
                <>
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
                        <button
                            onClick={() => setIsEditing(true)}
                            className="text-blue-600 hover:underline"
                        >
                            Editar
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
                </>
            )}
        </div>
    );
}
