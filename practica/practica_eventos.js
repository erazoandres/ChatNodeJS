const express = require('express');
const myEmmiter = require('events');
const PORT = 3000 ; 

const app = express() ; 
app.use(express.json());
const emisor = new myEmmiter() ; 


emisor.on('visit' , (route)=>{
    console.log("Se visito la ruta: " , route ) ; 
});

emisor.on('registered' , ({nombre, email}) =>{
    console.log("Registrado " , nombre) ; 
});

app.get('/', (req,res,  next) =>{

    res.sendFile(__dirname + '/public/archivo.html');
    emisor.emit('visit',req.path);
    // res.send("Bienvenidos a la API") ;
    next(); 
});

app.get('/get_users', (req,res,  next) =>{
    emisor.emit('visit',req.path);
    res.status(200).json({"usuario" : "Erazo"});
    next(); 
});


app.listen(PORT , () =>{
    console.log("Conectado");
});


app.post('/register', (req, res) =>{
    const {nombre  , email} = req.body ; 
    emisor.emit("registered" , {nombre, email}) ; 
});