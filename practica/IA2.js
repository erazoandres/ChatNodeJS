import { HfInference } from "@huggingface/inference";

const hf = new HfInference("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"); // ⚠️ Token expuesto

 async function chatWithAI(Prompt) {
    try {
        console.log("🔍 Enviando solicitud a Hugging Face...");

        const response = await hf.textGeneration({
            // model: "meta-llama/Meta-Llama-3-8B-Instruct", // Modelo gratuito y optimizado
            // model: "tiiuae/falcon-7b-instruct", // Modelo gratuito y optimizado
            model: "meta-llama/Meta-Llama-3-8B-Instruct", // Modelo gratuito y optimizado

            // model: "LenguajeNaturalAI/leniachat-qwen2-1.5B-v0", // Modelo gratuito y optimizado
            // model: "ostorc/Conversational_Spanish_GPT", // Modelo gratuito y optimizado
                        
            inputs: Prompt,
            parameters: { max_new_tokens: 10 }
        });

        console.log("🤖 Respuesta:", response.generated_text);
    } catch (error) {
        console.error("❌ Error en la solicitud:", error);
    }


    return response.generated_text;
}


module.exports = { chatWithAI };