import dotenv from "dotenv";
import { ChatGroq } from "@langchain/groq";
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";

dotenv.config({ path: new URL("../.env", import.meta.url) });

console.log("GROQ API KEY:", process.env.GROQ_API_KEY ? "FOUND" : "MISSING");

console.log(
  "GOOGLE API KEY:",
  process.env.GOOGLE_API_KEY ? "FOUND" : "MISSING",
);

const groq = new ChatGroq({
  model: "openai/gpt-oss-120b",
  temperature: 0,
  maxTokens: undefined,
  maxRetries: 2,
});

const gemini = new ChatGoogleGenerativeAI({
  model: "gemini-2.5-flash",
  temperature: 0,
  maxRetries: 2,
});

export const getModel = async (agent) => {
  switch (agent) {
    case "chat":
      return groq;

    case "search":
      return groq;

    case "coding":
      return gemini;

    default:
      return groq;
  }
};
