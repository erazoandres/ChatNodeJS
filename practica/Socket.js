const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const path = require("path");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

const port = 3000;

// Servir archivos estáticos (HTML, CSS, JS)
app.use(express.static(path.resolve(__dirname , ".." , "public")));

// Manejar conexiones de usuarios
io.on("connection", (socket) => {
    console.log("🟢 Un usuario se ha conectado");

    // Manejar cuando un usuario se une con su nombre
    socket.on("joinChat", (username) => {
        socket.username = username;
        io.emit("message", { user: "Sistema", text: `${username} se ha unido al chat` });
    });

    // Manejar mensajes de chat
    socket.on("chatMessage", (msg) => {
        io.emit("message", { user: socket.username, text: msg });
    });

    // Notificar cuando un usuario está escribiendo'
    socket.on("typing", () => {
        io.emit("typing", socket.username);
    });

    socket.on("stopTyping", () => {
        io.emit("stopTyping");
    });

    // Manejar desconexión de usuario
    socket.on("disconnect", () => {
        console.log("🔴 Un usuario se ha desconectado");
        io.emit("message", { user: "Sistema", text: `${socket.username} ha salido del chat` });
    });
});

// Iniciar el servidor
server.listen(port, () => {
    console.log(`🚀 Servidor corriendo en http://localhost:${port}`);
});
