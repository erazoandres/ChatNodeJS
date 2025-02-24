const express = require('express'); 
const path = require('path');
const http = require('http');
const { Server } = require('socket.io') ; 



const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static(path.resolve(__dirname  , "public")));


io.on("connection" , (socket)=>{


    socket.on("join" , (user_name)=>{
        socket.username = user_name;
        console.log("Usuario conectado:[",user_name,"]") ; 
        io.emit('msg' , {user :  user_name , data : " Se ah unido "}) ; 
    });



    socket.on("get_msg", (text)=>{
        io.emit("msg" ,{user :  socket.username , data : text}) ;
    });

});

server.listen(3000 , ()=>{
    console.log("Conectado y ecuchando en el puerto http://localhost:3000");
});