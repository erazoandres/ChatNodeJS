const express = require('express'); 
const path = require('path');
const http = require('http');
const { Server } = require('socket.io') ; 

const { HfInference } = require("@huggingface/inference");
const { type } = require('os');
const hf = new HfInference("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"); // ⚠️ Token expuesto


const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static(path.resolve(__dirname  , "public")));



async function chatWithAI(Prompt) {
    try {
        console.log("🔍 Enviando solicitud a Hugging Face...");

        const response = await hf.textGeneration({
            model: "meta-llama/Meta-Llama-3-8B-Instruct", // Modelo gratuito y optimizado
            inputs: Prompt,
            parameters: { max_new_tokens: 50 } // Aumenté el límite de tokens para respuestas más completas
        });

        if (response && response.generated_text) {
            // console.log("🤖 Respuesta:", response.generated_text);
            const data =  String(response.generated_text).trim() ;
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


    socket.on("join" , (user_name)=>{
        socket.username = user_name;
        console.log("Usuario conectado:[",user_name,"]") ; 
        io.emit('msg' , {user :  user_name , data : " Se ah unido "}) ; 
    });



    socket.on("get_msg", async(text)=>{
        console.log("Mensaje recibido: ",text);
        
        let x = await chatWithAI(text);
        console.log(x);
        io.emit("msg" ,{user :  socket.username , data : x}) ;
    });
});

server.listen(3000 , ()=>{
    console.log("Conectado y ecuchando en el puerto http://localhost:3000");
});