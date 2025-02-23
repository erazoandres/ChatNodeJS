const path = require("path"); 

const ruta = path.resolve("/DESARROLLO/DESARROLLO WEB/NODEJS/carpeta/archivo.html");

const name = path.basename(ruta);
const ext = path.extname(ruta);
const ruta_superior = path.resolve(__dirname, "..", "public", "index.html");


console.log(name) ;
console.log(ext) ; 
console.log(ruta_superior) ; 