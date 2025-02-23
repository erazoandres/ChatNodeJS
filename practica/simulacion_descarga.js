const EventEmitter = require('events');

const descargador = new EventEmitter();


function iniciarDescarga(path_file){
    console.log("Iniciando Descarga");
    let progreso = 0 ; 

    const intervalo = setInterval(()=>{
        progreso += 20

        descargador.emit('progreso' , progreso) ; 

        if (progreso === 100){
            clearInterval(intervalo) ; 
            descargador.emit('completado', path_file) ; 
        }


    } , 100); 
}

descargador.on('completado' , (archivo) => {
    console.log(`✅ Descarga de ${archivo} completada.`);
}); 

descargador.on('progreso' , (progreso) => {
    console.log(`📊 Progreso: ${progreso}%`);
}); 


iniciarDescarga("archivo.zip"); 