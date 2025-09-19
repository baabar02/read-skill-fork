import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";

dotenv.config();

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
if (!GEMINI_API_KEY) {
  throw new Error("GEMINI_API_KEY is not set in .env file.");
}
const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export const compareTextSimilarity = async (
  originalText: string,
  spokenText: string
): Promise<number> => {
  const prompt = `Compare the following two texts for semantic similarity on a scale of 0 to 100. Provide only the number as the output.
  Text 1 (Original): "${originalText}"
  Text 2 (Spoken): "${spokenText}"`;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text().trim();

    const score = parseInt(text, 10);
    return isNaN(score) ? 0 : score;
  } catch (err) {
    console.error("Gemini API-д хандахад алдаа гарлаа:", err);
    return 0;
  }
};
