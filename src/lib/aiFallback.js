import { GoogleGenerativeAI } from "@google/generative-ai";
import { generateWithOpenRouter } from "./openrouter";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const geminiModel = genAI.getGenerativeModel({
  model: "gemini-2.5-flash", // ✅ safe model
});

export async function generatePlanWithFallback(prompt) {
  try {
    console.log(`Attempting to generate plan with prompt`);
    // 🔹 TRY GEMINI FIRST
    console.log("Generated prompt:", prompt);
    const result = await geminiModel.generateContent(prompt);
    console.log("Gemini response received,", result);
    return result.response.text();
  } catch (err) {
  
    if (err.status === 429 || err.status === 404) {
      console.warn("Gemini failed, switching to OpenRouter...");
      return await generateWithOpenRouter(prompt);
    }

    throw err;
  }
}
