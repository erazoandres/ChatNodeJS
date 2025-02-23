const EventEmitter = require('events'); // Importar módulo de eventos

const emisor = new EventEmitter(); // Crear un emisor de eventos

// Escuchar un evento llamado "mensaje"
emisor.on('mensaje', (nombre) => {
    console.log(`¡Hola, ${nombre}! Evento recibido.`);
});

// Emitir el evento "mensaje"
emisor.emit('mensaje', 'Andrés');
