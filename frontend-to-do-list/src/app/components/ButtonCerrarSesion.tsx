"use client";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
    const { user, logout } = useAuth();

    return (
        <nav className="bg-gray-100 p-4 flex justify-between items-center" >
            <span>Hola, {user?.email} </span>
            < button onClick={logout} className="bg-red-600 text-white px-4 py-1" >
                Cerrar sesión
            </button>
        </nav>
    );
}
