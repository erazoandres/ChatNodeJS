const express = require('express');
const app = express();
app.use(express.json());
const PORT = 3000 ; 


const usuarios = [
    {"nombre": "Elon Musk", "ocupación": "Empresario", "nacionalidad": "Sudafricano/Estadounidense", "dato_destacado": "Fundador de SpaceX y Tesla"},
    {"nombre": "Lionel Messi", "ocupación": "Futbolista", "nacionalidad": "Argentino", "dato_destacado": "Ganador de 8 Balón de Oro"},
    {"nombre": "Cristiano Ronaldo", "ocupación": "Futbolista", "nacionalidad": "Portugués", "dato_destacado": "Máximo goleador de la Champions League"},
    {"nombre": "Bill Gates", "ocupación": "Empresario", "nacionalidad": "Estadounidense", "dato_destacado": "Fundador de Microsoft y filántropo"},
    {"nombre": "Jeff Bezos", "ocupación": "Empresario", "nacionalidad": "Estadounidense", "dato_destacado": "Fundador de Amazon"},
    {"nombre": "Albert Einstein", "ocupación": "Científico", "nacionalidad": "Alemán", "dato_destacado": "Teoría de la relatividad"},
    {"nombre": "Leonardo da Vinci", "ocupación": "Artista/Científico", "nacionalidad": "Italiano", "dato_destacado": "Pintor de la Mona Lisa"},
    {"nombre": "Marie Curie", "ocupación": "Científica", "nacionalidad": "Polaca", "dato_destacado": "Descubridora del radio y polonio"},
    {"nombre": "Barack Obama", "ocupación": "Político", "nacionalidad": "Estadounidense", "dato_destacado": "Primer presidente afroamericano de EE.UU."},
    {"nombre": "Stephen Hawking", "ocupación": "Científico", "nacionalidad": "Británico", "dato_destacado": "Aportaciones a la cosmología y los agujeros negros"}
]

app.get('/' , (req , res) => {
    res.send("Bienvenido a la super API")
});

app.listen(PORT , () => {
    console.log(`Conectado como http://localhost:${PORT}`)
});


app.get('/get_all' ,(req, res) => {
    res.json(usuarios)
});


app.get('/get_user/:nombre', (req, res) => {
    let user = null;
    
    for (let usuario of usuarios) {
        if (usuario.nombre === req.params.nombre) {
            user = usuario;
            break; // Detiene el bucle cuando encuentra el usuario
        }
    }
    
    if (user) {
        res.json(user); // ✅ Envía el usuario encontrado como JSON
    } else {
        res.status(404).json({ msj: "Usuario no encontrado" });
    }
});


app.post("/register_user", (req, res) => {

    const {nombre , ocupacion , nacionalidad} = req.body;

    const nuevo_usuario = {
        nombre :nombre , 
        ocupacion : ocupacion, 
        nacionalidad : nacionalidad
    } ; 

    usuarios.push(nuevo_usuario);
    res.status(201).json(nuevo_usuario);

});


app.put("/update/:nombre" , (req , res) => {

    for(let user of usuarios){
        if (user.nombre === req.body.nombre){
            const tmp = {
                nombre: req.body.nombre, 
                ocupacion:  req.body.ocupacion, 
                nacionalidad:  req.body.nacionalidad, 
             }; 

             console.log("Si lo encontre");

             usuario.nombre = tmp.nombre;
             usuario.edad = tmp.ocupacion;
             res.json(tmp);


             break;
            
        }else{
            res.status(404).json({"aviso:" :" No encontrado"});
        }



    };  
});