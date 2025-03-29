# Proyecto de Chat en Tiempo Real con IA

## Descripción
Este proyecto es una aplicación de chat en tiempo real utilizando **Node.js**, **Express**, **Socket.io** y la API de **Groq** para generar respuestas automáticas mediante IA. Permite la comunicación entre usuarios y un bot que responde con base en información personalizada.

## Tecnologías Utilizadas
- **Node.js** - Entorno de ejecución de JavaScript.
- **Express** - Framework para la creación del servidor web.
- **Socket.io** - Biblioteca para la comunicación en tiempo real.
- **Groq SDK** - Cliente para interactuar con modelos de inteligencia artificial.

## Instalación
Para ejecutar el proyecto en tu máquina local, sigue estos pasos:

1. Clonar el repositorio:
   ```sh
   git clone <URL_DEL_REPOSITORIO>
   cd <NOMBRE_DEL_PROYECTO>
   ```
2. Instalar las dependencias:
   ```sh
   npm install
   ```
3. Ejecutar el servidor:
   ```sh
   node server.js
   ```
4. Acceder a la aplicación desde el navegador en:
   ```sh
   http://localhost:3000
   ```

## Funcionamiento
1. Un usuario se conecta al chat e ingresa su nombre.
2. Puede enviar mensajes que serán visibles para todos los participantes.
3. El bot responde automáticamente a los mensajes utilizando IA.
4. Se utilizan sockets para la comunicación en tiempo real.

## Estructura del Proyecto
```
├── public/              # Archivos estáticos (HTML, CSS, JS del frontend)
├── server.js            # Servidor principal con Express y Socket.io
├── package.json         # Dependencias y configuración del proyecto
└── README.md            # Documentación del proyecto
```

## API de IA
El bot usa la API de **Groq** para generar respuestas automáticas. Se debe proporcionar una clave de API válida para su funcionamiento.

```js
const client = new Groq({
    apiKey : "TU_CLAVE_API",
});
```

## Contribución
Si deseas contribuir al proyecto:
1. Realiza un fork del repositorio.
2. Crea una rama con tu mejora (`git checkout -b feature/nueva-funcionalidad`).
3. Realiza tus cambios y súbelos (`git commit -m 'Descripción del cambio'`).
4. Sube la rama (`git push origin feature/nueva-funcionalidad`).
5. Crea un Pull Request para revisión.

## Autor
**Andrés Erazo** - Desarrollo y mantenimiento del proyecto.

## Licencia
Este proyecto está bajo la licencia **MIT**.
