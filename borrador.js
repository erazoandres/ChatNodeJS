let x = await chatWithAI(text);
        console.log(x);
        
        if (socket.username !== "BOT"){
            io.emit("msg" ,{user :  socket.username , data : x}) ;
            // Respuesta del bot}
        }else{
            setTimeout(() => {
                io.emit("msg", { user: "BOT", data: x });
            }, 1000); // Simula un pequeño delay para realismo
        } ;