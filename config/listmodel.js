import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = "YOUR_API_KEY"; // Use your actual API key

async function listAvailableModels() {
  const genAI = new GoogleGenerativeAI(API_KEY);
  const { models } = await genAI.listModels();

  console.log("Available Models:");
  for (const model of models) {
    console.log(`- ${model.name}`);
  }
}

listAvailableModels();
