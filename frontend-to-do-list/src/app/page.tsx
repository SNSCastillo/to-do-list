import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gray-100 px-6">
      <div className="text-center space-y-6">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-800">
          To Do List Fullstack con Nest.js y Next.js
        </h1>
        <p className="text-gray-600 text-lg">
          Gestiona tus tareas en tiempo real con autenticación segura.
        </p>
        <Link
          href="/login"
          className="inline-block bg-blue-600 text-white px-6 py-3 rounded-full text-lg font-medium shadow hover:bg-blue-700 transition"
        >
          Ir al Login
        </Link>
      </div>
    </main>
  );
}
