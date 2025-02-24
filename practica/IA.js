// Importar Hugging Face y dotenv
import { HfInference } from "@huggingface/inference";
import dotenv from "dotenv";

// Cargar variables de entorno
dotenv.config();

console.log("Iniciando la ejecución del script...");

// Crear instancia de Hugging Face con el token
const hf = new HfInference("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");

async function run() {
    try {
        console.log("Enviando solicitud a Hugging Face...");
        
        const response = await hf.textGeneration({
            model: "mistralai/Mistral-7B-Instruct-v0.1",
            inputs: "Explica qué es la inteligencia artificial en términos simples.",
            parameters: { max_new_tokens: 100, temperature: 0.7 }
        });
        
        console.log(response.generated_text);
        

    } catch (error) {
        console.error("Error en la API:", error);
    }
}

// Ejecutar la función
run();
