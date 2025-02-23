const express = require('express') ; 
const path =require('path');
const app = express();
const PORT  = 3000 ; 

app.use(express.json());

app.use(express.static(path.join(__dirname,'public')));

const database_pokemons = [
    {
        nombre: "Pikachu",
        tipo: "Eléctrico",
        nivel: 25,
        habilidades: ["Impactrueno", "Rayo", "Ataque rápido"],
        evolucion: "Raichu"
    },
    {
        nombre: "Charmander",
        tipo: "Fuego",
        nivel: 12,
        habilidades: ["Ascuas", "Garra dragón", "Lanzallamas"],
        evolucion: "Charmeleon"
    },
    {
        nombre: "Bulbasaur",
        tipo: "Planta/Veneno",
        nivel: 16,
        habilidades: ["Latigazo", "Drenadoras", "Rayo solar"],
        evolucion: "Ivysaur"
    },
    {
        nombre: "Squirtle",
        tipo: "Agua",
        nivel: 14,
        habilidades: ["Pistola agua", "Hidrobomba", "Refugio"],
        evolucion: "Wartortle"
    },
    {
        nombre: "Gengar",
        tipo: "Fantasma/Veneno",
        nivel: 50,
        habilidades: ["Bola sombra", "Lengüetazo", "Hipnosis"],
        evolucion: "Mega Gengar"
    },
    {
        nombre: "Eevee",
        tipo: "Normal",
        nivel: 20,
        habilidades: ["Ataque rápido", "Doble equipo", "Mordisco"],
        evolucion: ["Vaporeon", "Jolteon", "Flareon", "Espeon", "Umbreon", "Leafeon", "Glaceon", "Sylveon"]
    }
]

app.get('/',(req,res)=>{
    res.send("Bienvenido a la API de Andrés Erazo");
});

app.listen(PORT , () => {
    console.log("API funcionando, http://localhost:"+ PORT.toString()) ; 

});

app.get('/get_all' , (req, res) =>{

    if (database_pokemons.length >0 ) {
        res.status(201).json(database_pokemons)
    }else{
        res.status(404).json({"error" : "Base de datos vacia"}) ; 
    }
    
});

app.post('/register' , (req,res)=>{
    const nombre = req.body.nombre;
    const tipo = req.body.tipo;
    const nivel = req.body.nivel;
    const habilidades = req.body.habilidades;
    const evolucion = req.body.evolucion;
    

    

    const data_model = {
        "nombre" : nombre,
        "tipo" : tipo,
        "nivel" : nivel, 
        "habilidades" : habilidades, 
        "evolucion" : evolucion
    } ; 

    database_pokemons.push(data_model) ; 

    res.status(201).json(data_model) ; 

});

app.get('/get_user/:name' , (req, res)=> {

    const name_search = req.params.name ; 

    console.log(name_search);

    for (const user_index of database_pokemons) {
        if (user_index.nombre === name_search){
            
            res.status(200).json(user_index) ; 
            break
            
        }
    }
}); 

app.put("/update_user/", (req, res)=>{

    const {nombre  , tipo , nivel, habilidades , evolucion} = req.body ; 

    for (const user_index of database_pokemons) {
        if (user_index.nombre === nombre) {

            user_index.nombre = nombre ;
            user_index.tipo = tipo ;
            user_index.nivel = nivel ;
            user_index.habilidades = habilidades ;
            user_index.evolucion = evolucion ;


            res.status(200).json(user_index) ; 
            break ; 
        }
    }
}); 

















