// gemini.js
import {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} from "@google/generative-ai";

const API_KEY = "YOUR_API_KEY";

async function runChat(prompt) {
  const genAI = new GoogleGenerativeAI(API_KEY);

  // **** IMPORTANT: Change this line to use a Flash model ****
  const MODEL_NAME = "gemini-1.5-flash-latest"; // Recommended starting point
  // Or try:
  // const MODEL_NAME = "gemini-2.5-flash-latest";
  // Or for potentially highest free tier:
  // const MODEL_NAME = "gemini-2.5-flash-lite";

  const model = await genAI.getGenerativeModel({ model: MODEL_NAME });

  const generationConfig = {
    temperature: 0.5,
    topK: 1,
    topP: 1,
    maxOutputTokens: 2048,
  };

  const safetySettings = [
    {
      category: HarmCategory.HARM_CATEGORY_HARASSMENT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
  ];

  const chat = await model.startChat({
    generationConfig,
    safetySettings,
    history: [],
  });

  try {
    const result = await chat.sendMessage(prompt);
    const response = result.response;
    console.log("AI Response:", response.text());
    return response.text();
  } catch (error) {
    console.error("Error during chat message:", error);
    if (error.message.includes("429")) {
      console.error("Quota Exceeded: You've made too many requests or hit daily/minute limits for this model.");
      console.error("Consider switching to a 'flash' or 'flash-lite' model, or wait for your quota to reset.");
      console.error("More info: https://ai.google.dev/gemini-api/docs/rate-limits");
    } else {
      console.error("An unexpected error occurred:", error.message);
    }
  }
}

export default runChat;
