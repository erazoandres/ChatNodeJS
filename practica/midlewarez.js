const express = require('express');
const app = express();

app.use(express.json()) ;

// Middleware que registra cada solicitud
const validarUsuario = (req, res, next) => {
    const {nombre} = req.body;

    if(!nombre){
        console.log(body_data);
        return res.status(400).json({"error" : "Se requiere un nombre de usuario"}) ; 
    }else{
        next(); // Continúa con la siguiente función
        return res.send("Agregado") ;
    }
};

// Ruta principal
app.get('/', (req, res) => {
    res.send('¡Bienvenido!');
});


app.post('/registrar',validarUsuario, (req, res) =>{
    res.send("Registrado") ; 
});

app.listen(3000, () => {
    console.log('Servidor corriendo en http://localhost:3000');
});
