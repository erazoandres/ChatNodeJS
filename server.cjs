const express = require('express'); 
const path = require('path');
const http = require('http');
const { Server } = require('socket.io') ; 
const { Groq } = require('groq-sdk');


const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static(path.resolve(__dirname  , "public")));

const client = new Groq({
    apiKey : "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",
})
        
async function chatWithAI(Prompt) {
    try {
        console.log("🔍 Enviando solicitud Groq...");


        const chat_completion = await client.chat.completions.create({
            model: "llama3-70b-8192", // Ajusta el modelo si es necesario
            messages: [
                {
                    role: "user",
                    content: Prompt
                }
            ]
        });

        if (chat_completion && chat_completion.choices[0].message.content) {
            // console.log("🤖 Respuesta:", response.generated_text);
            const data =  String(chat_completion.choices[0].message.content).trim() ;
            return data;
        } else {
            console.error("⚠️ No se recibió una respuesta válida.");
            return null;
        }
    } catch (error) {
        console.error("❌ Error en la solicitud:", error);
        return null;
    }
}

io.on("connection" , (socket)=>{


    socket.on("join", async (user_name) => {
        socket.username = user_name;
        console.log("Usuario conectado:[", user_name, "]"); 
        io.emit('msg', { user: user_name, data: " Se ha unido " }); 
        
        // const text = "Bienvenido al chat"; // Define un texto inicial o ajusta según sea necesario
        // let x = await chatWithAI(text);
        // console.log(x);
        // io.emit("msg", { user: "BOT", data: x });
    });


    socket.on("get_msg_user", async(text)=>{
                
        console.log("Mensaje recibido: ",text);
        io.emit("msg" ,{user :  socket.username , data : text}) ;

        const prompt = `Porfavor ten esta informacion en cuenta y Responde brevemente:# Perfil de Andrés Erazo
            ## Información Personal y Profesional
            Andrés Erazo trabaja como auxiliar de sistemas en la empresa Comunet Ltda. Su enfoque está en la tecnología, la programación y la automatización de procesos. Además, imparte cursos de programación y está en constante aprendizaje sobre diversas herramientas y lenguajes de desarrollo.

            ## Experiencia en Programación
            ### Tecnologías y Lenguajes
            - **Python:** Tiene experiencia en el desarrollo de scripts y aplicaciones en Python. Actualmente, enseña este lenguaje en un curso de Python Pro en Kodland, dirigido a padres y estudiantes.
            - **Node.js:** Se encuentra en proceso de aprendizaje de este entorno para el desarrollo backend.
            - **Automatización con Selenium:** Utiliza Selenium con Python para automatizar tareas en el backoffice de Kodland, específicamente en la calificación de tareas.
            - **Desarrollo de Bots:** Está creando un bot para Discord en Python, añadiendo funciones divertidas e interactivas.
            - **Firebase:** Maneja bases de datos en Firebase para almacenar información de clientes y pedidos.
            - **Git y GitHub:** Posee dos repositorios con claves RSA configuradas para enviar cambios desde su PC con Windows.

            ## Experiencia en Enseñanza
            - **Kodland:** Imparte un curso de Python Pro en el que enseña fundamentos básicos de programación.
            - **Modificación de Juegos:** Trabaja con un grupo de estudiantes en la implementación de modificaciones en videojuegos.
            - **Metodología:** Se enfoca en explicar de manera clara y sencilla, facilitando el aprendizaje de sus alumnos.

            ## Proyectos y Actividades Recientes
            - **Creación de un bot para Discord** que incorpora comandos y respuestas interactivas.
            - **Automatización de calificación de tareas** en Kodland, abriendo tareas en nuevas pestañas y calificándolas de manera eficiente.
            - **Desarrollo de una página web para un jardín infantil**, organizando el contenido en una estructura responsiva y funcional con formularios de contacto y Google Maps.

            ## Gustos e Intereses
            - **Tecnología:** Disfruta explorando nuevas herramientas y frameworks para desarrollo de software.
            - **Programación:** Tiene un gran interés en mejorar sus habilidades en Python, Node.js y automatización.
            - **Videojuegos:** Le gusta jugar y modificar juegos, lo cual también ha integrado en su enseñanza.
            - **Aprendizaje continuo:** Siempre está buscando mejorar sus conocimientos en programación y nuevas tecnologías.
            - **Música:** Le gusta escuchar música mientras trabaja o estudia.
            - **Cine y series:** Disfruta ver series y películas, especialmente de ciencia ficción y tecnología.
            - **Comida:** Le gustan las golosinas, aunque le cuesta subir de peso.
            - **Automatización:** Le apasiona optimizar procesos mediante scripts y herramientas.
            - **Interacción social:** Disfruta enseñar y compartir conocimientos con otros, especialmente en su trabajo y en Kodland.
            - **Curiosidad por la ciencia:** Tiene interés en aprender sobre ciencia y tecnología en general.

            ## Datos Adicionales
            - Tiene dificultades para subir de peso y ha consumido muchas golosinas a lo largo de su vida.
            - Nunca se ha purgado.
            - Prefiere que los mensajes a los padres de estudiantes incluyan preguntas sobre su experiencia en el curso.
            - Su nombre de usuario en Windows es 'Andres Erazo'.

            ## Contacto y Registro de Datos
            - **Correo electrónico:** erazoandres14@gmail.com
            - **Registros en Firebase:** Maneja un documento llamado 'pedidos' donde almacena información como dirección, nombre del cliente, total, resumen y teléfono.

            ## Objetivos de Aprendizaje
            - Profundizar su conocimiento en **algoritmos lineales**.
            - Mejorar sus habilidades en **Node.js**.
            - Seguir explorando nuevas herramientas para la **automatización y desarrollo de software**.

            ## Conclusión
            Andrés Erazo es un profesional en crecimiento dentro del mundo de la tecnología, con experiencia en automatización, desarrollo de bots y enseñanza de programación. Su constante interés por aprender y mejorar sus habilidades lo hace destacar en su campo.

            "${text}"`;
        let x =  await chatWithAI(prompt);

        io.emit("msg", { user: "BOT", data: x });
    });

});



server.listen(3000 , ()=>{
    console.log("Conectado y ecuchando en el puerto http://localhost:3000");
});