const express = require('express'); 
const path = require('path');
const http = require('http');
const { Server } = require('socket.io') ; 
const { Groq } = require('groq-sdk');
// const { HfInference } = require("@huggingface/inference");
// const { type } = require('os');
// const hf = new HfInference("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"); // ⚠️ Token expuesto


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

        // Prompt += "Porfavor dame respuestas muy cortas de maximo 20 palabras y en español colombiano, y quiero que tu primera respuesta sea en que puedes ayudarme " ;


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

        const prompt = `Responde brevemente a: "${text}"`;
        let x =  await chatWithAI(prompt);

        io.emit("msg", { user: "BOT", data: x });
    });

});



server.listen(3000 , ()=>{
    console.log("Conectado y ecuchando en el puerto http://localhost:3000");
});