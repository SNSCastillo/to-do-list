const { io } = require("socket.io-client");

const socket = io("http://localhost:4000/");

socket.on("connect", () => {
    console.log("🟢 Conectado al servidor WebSocket");
});

socket.on("tareaCreada", (data) => {
    console.log("📌 Nueva tarea creada:", data);
});

socket.on("tareaActualizada", (data) => {
    console.log("✏️ Tarea actualizada:", data);
});

socket.on("tareaEliminada", ({ id }) => {
    console.log("❌ Tarea eliminada con ID:", id);
});

socket.on("disconnect", () => {
    console.log("🔴 Desconectado del servidor");
});
