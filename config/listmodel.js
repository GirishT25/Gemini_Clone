import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = "AIzaSyAOSX_UzdUny1l91uVE4J8mRnthYyS_SLg"; // Use your actual API key

async function listAvailableModels() {
  const genAI = new GoogleGenerativeAI(API_KEY);
  const { models } = await genAI.listModels();

  console.log("Available Models:");
  for (const model of models) {
    console.log(`- ${model.name}`);
  }
}

listAvailableModels();